import { getContext } from '@netlify/server';
import { getUser } from '@netlify/identity';
import { eq, desc, and, gt } from 'drizzle-orm';
import { db } from '../../db/index.ts';
import { reviews } from '../../db/schema.ts';

export const config = { path: '/api/*' };
const json = (value, status = 200) => Response.json(value, { status, headers: { 'Cache-Control': 'private, no-store' } });
export default async function handler(request) {
  const path = new URL(request.url).pathname;
  try {
    if (path === '/api/country' && request.method === 'GET') {
      return json({ country: getContext().geo?.country?.code || null });
    }
    if (path.startsWith('/api/admin/')) {
      const user = await getUser();
      if (!user?.appMetadata?.roles?.includes('admin')) return json({ error: 'Sign in with an administrator account.' }, 403);
      if (path === '/api/admin/reviews' && request.method === 'GET') return json(await db.select().from(reviews).orderBy(desc(reviews.createdAt)).limit(200));
      if (path === '/api/admin/reviews' && request.method === 'PATCH') {
        if (request.headers.get('origin') !== new URL(request.url).origin) return json({ error: 'Invalid origin.' }, 403);
        const { id, status } = await request.json();
        if (!Number.isInteger(id) || !['approved', 'rejected', 'pending'].includes(status)) return json({ error: 'Invalid review update.' }, 400);
        await db.update(reviews).set({ status }).where(eq(reviews.id, id));
        return json({ success: true });
      }
    }
    if (path === '/api/reviews' && request.method === 'GET') {
      return json(await db.select({ id: reviews.id, name: reviews.name, rating: reviews.rating, body: reviews.body }).from(reviews).where(eq(reviews.status, 'approved')).orderBy(desc(reviews.createdAt)).limit(100));
    }
    if (path === '/api/reviews' && request.method === 'POST') {
      if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ error: 'Use JSON.' }, 415);
      const raw = await request.text();
      if (raw.length > 10000) return json({ error: 'Review too long.' }, 413);
      const value = JSON.parse(raw);
      if (value.website) return json({ success: true }, 201);
      const { name, email, orderReference, rating, body, consent } = value;
      if (typeof name !== 'string' || name.trim().length < 2 || name.length > 100 || typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof orderReference !== 'string' || !orderReference.trim() || orderReference.length > 100 || !Number.isInteger(rating) || rating < 1 || rating > 5 || typeof body !== 'string' || body.trim().length < 10 || body.length > 2000 || consent !== true) return json({ error: 'Please complete all review fields correctly.' }, 400);
      const recent = await db.select({ id: reviews.id }).from(reviews).where(and(eq(reviews.email, email.trim().toLowerCase()), gt(reviews.createdAt, new Date(Date.now() - 86400000)))).limit(1);
      if (recent.length) return json({ error: 'A review was already submitted with this email today. Please try again tomorrow.' }, 429);
      await db.insert(reviews).values({ name: name.trim(), email: email.trim().toLowerCase(), orderReference: orderReference.trim(), rating, body: body.trim() });
      return json({ success: true }, 201);
    }
    return json({ error: 'Not found.' }, 404);
  } catch { return json({ error: 'This service is temporarily unavailable. Please try again shortly.' }, 503); }
}
