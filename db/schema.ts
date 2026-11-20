import { pgTable, serial, text, integer, timestamp, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
export const reviews = pgTable('reviews', {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  orderReference: text('order_reference').notNull(),
  rating: integer().notNull(),
  body: text().notNull(),
  status: text().notNull().default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, table => [check('rating_range', sql`${table.rating} BETWEEN 1 AND 5`), check('review_status', sql`${table.status} IN ('pending', 'approved', 'rejected')`)]);
