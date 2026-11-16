WOODIFY — Craft. Connect. Personalize.

React, TypeScript and Vite storefront.

npm ci       Install the locked dependencies.
npm run dev  Run Vite locally.
npm run build  Type-check and produce dist/ (the deployment platform runs this automatically).

The application entry point is src/main.tsx. Brand contact destinations are
configured in src/brand.ts. The supplied WhatsApp number was normalized to
international format by removing the domestic leading zero after +94.
Instagram and Facebook URLs can be supplied later; unverified social links are hidden.

Orders are enquiries, with no checkout or payment collection. The React form
posts multipart data to public/__forms.html using Netlify Forms. The matching
static form and Forms feature marker must remain in place for deploy detection.
Logo files accept PNG/JPEG up to 5 MB. The live preview is illustrative, and
pricing, delivery, NFC destination and artwork require confirmation.

Submissions are available through the site's Netlify Forms dashboard after
deployment. Notification recipients are not configured by this application.
Verify a real enquiry after deployment; local transport tests do not establish
live receipt. No customer reviews or unverified product credentials are included.

Photography: wood texture by FWStudio, Pexels photo 172289, served locally.
Product compositions are custom CSS illustrations. Fonts: Manrope and
Cormorant Garamond via Google Fonts. UI icons: Lucide.
