# LedgerSmith Bookkeeping — website

A static site (plain HTML, CSS and a little JavaScript). No build step.

```
index.html      Home page
services.html   Services page
contact.html    Contact page with consultation form
404.html        Not-found page
styles.css      All styles (brand colors are at the top)
forms.js        Sends forms to Formspree without leaving the page
vercel.json     Clean URLs (/services instead of /services.html)
assets/         Logo, favicon
```

## Deploy to Vercel

**Option A — drag and drop**
1. Sign in at vercel.com → **Add New… → Project**.
2. Choose to deploy without Git (or use the Vercel CLI: run `npx vercel` inside this folder).
3. Framework preset: **Other**. Build command: *none*. Output directory: `.` (this folder).

**Option B — GitHub**
1. Put this folder in a GitHub repository.
2. In Vercel: **Add New… → Project → Import** that repo. Framework preset **Other**, no build command.
3. Every push to the main branch redeploys the site.

Then add your domain in the project's **Settings → Domains**.

## Before going live

1. **Forms — done.** All 4 forms (2 in index.html, 1 in services.html, 1 in contact.html)
   post to the Formspree form "LedgerSmith website" (`https://formspree.io/f/xqpqqwqo`),
   which emails submissions to hello@ledgersmithbookkeeping.com. Each submission includes
   a hidden `form` field saying which page it came from.
2. **Testimonials.** Replace the [bracketed] quotes on the home page with real client quotes
   (with their permission), or delete that section.
3. **Phone number.** Replace `[Your phone number]` in contact.html.
4. **Email.** Confirm `hello@ledgersmithbookkeeping.com` (contact.html and forms.js).
