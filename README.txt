WOODIFY — React + TypeScript website starter

WHAT THIS IS
- A responsive React + TypeScript website built with Vite.
- Netlify build settings are included in netlify.toml.
- The website is a front-end starter, not a complete order-management backend.

IMPORTANT BEFORE LAUNCH
1. The WhatsApp number is intentionally a placeholder in src/App.tsx:
   REPLACE_WITH_WOODIFY_NUMBER
   It must be replaced with the official WhatsApp Business number in international format, digits only.
2. The logo file picker currently selects a file in the browser only. It does NOT upload/store it.
3. Orders, secure logo storage, admin login/dashboard, product management and review moderation need a backend service (for example Supabase) and must be connected before taking real orders.
4. Do not publish fake reviews or sample customer photos as real testimonials.

NETLIFY DEPLOYMENT
Recommended route: connect a GitHub repository to Netlify.
- Build command: npm run build
- Publish directory: dist
These values are already in netlify.toml.
A Node.js environment is needed to install dependencies and build this project.

LOCAL PREVIEW (if Node.js is installed)
  npm install
  npm run dev

BUILD
  npm run build

The generated site is placed in the dist folder.
