# CLAUDE.md — CBF Textildruck & Bestickung website

Rebuild of www.cbf24.de for **Fa. CBF Textildruck & Bestickung**, a textile embroidery and printing business in Oberhaching near Munich. The site is in German and addresses visitors formally ("Sie").

The approved design is in `design/`: `index.html`, `leistungen.html` and `kontakt.html`. These are static mockups with inline styles. Treat them as the source of truth for layout, spacing, typography and copy. Rebuild them as clean components; do not ship them unchanged.

## Goal

The site should do three things:

1. Show the work through photos, process videos, Instagram posts and examples.
2. Explain the two services, Stickerei and Druckerei, including their process, types and prices.
3. Turn visitors into enquiries via the contact form, phone or WhatsApp, and send them to the textile catalogue.

## Tech stack (decided by the owner: React on Vercel)

| Area | Choice | Why |
|---|---|---|
| Framework | **Next.js 16 (App Router), React 19, TypeScript** | React on Vercel; every page is prerendered statically |
| Styling | Plain CSS with custom properties (`src/app/globals.css` + CSS Modules per component) | Design is simple; no Tailwind needed |
| Blog | Markdown in `content/blog/*.md` (gray-matter + marked), statically generated | Owner can add posts as Markdown |
| Forms | Route Handler `src/app/api/anfrage/route.ts` sends the enquiry via SMTP (nodemailer) to info@cbf24.de, Reply-To = customer, file attached. Env vars in `.env.example` | Mail goes through the company's own mailbox; no third-party form service |
| Hosting | **Vercel** | |
| Fonts | **Self-hosted** Poppins (500/600/700) + Jost (400/500) via `@fontsource` | GDPR: no Google Fonts CDN in Germany |
| Redirects | `next.config.ts`; `/DATENSCHUTZ` lives in `src/proxy.ts` because Next matches redirect sources case-insensitively (would loop on `/datenschutz`) | |

Next 16 notes: `params` in pages are a Promise (`await params`); middleware is called `proxy.ts`.

## Sitemap

| Route | Template | Content |
|---|---|---|
| `/` | `design/index.html` | Hero, 4-service strip, photo/video collage, Stickerei and Druckerei teaser cards, Textilangebot banner, Instagram grid, 3 latest blog posts, footer |
| `/leistungen` | `design/leistungen.html` | Tabs/anchors `#stickerei`, `#druckerei`, `#applikationen`; each with intro, process video, process steps, examples gallery, prices |
| `/kontakt` | `design/kontakt.html` | Enquiry form with file upload, address/phone/mail/hours, map, WhatsApp, Textilangebot banner |
| `/blog`, `/blog/[slug]` | derive from the blog cards on `/` | Post list and post page in the same card style |
| `/impressum`, `/datenschutz`, `/agb` | simple text pages | Legal pages. **Required.** Copy the existing texts from cbf24.de and have the owner confirm them |
| External | `https://cbf24-textil.de/` | Textile catalogue run by the supplier. We can't change it, only link to it. Open it in a new tab with an ↗ icon |
| External | `https://hakro.com/` | Hakro workwear collection |

The nav order is Start · Stickerei · Druckerei · Kontakt, followed by a black pill button labelled "Textilangebot ↗". The Stickerei and Druckerei nav items link to `/leistungen#stickerei` and `/leistungen#druckerei`.

## Design rules (decided — do not change without asking)

- **Black, white and grey only.** Colour comes from the photos. A blue accent was tried and rejected.
- **No illustrations or decorative icons**, such as needles or scissors. A needle animation was tried and rejected. Use only functional line icons: arrow ↗, phone, mail, map pin, clock, Instagram, play and chat.
- **Tokens:**
  - Page background `#F4F4F4`
  - Cards `#FFFFFF`
  - Text `#1C1C1C`
  - Secondary text `#444`, `#555` and `#777`
  - Borders `#D8D8D8` and `#E4E4E4`
  - Dark blocks `#1C1C1C`
  - Video placeholders `#2B2B2B`
- **Type:** Poppins 600 for headings (H1 56px, section H2 30–38px, card H3 16–24px). Jost 400/500 for body text (15–18px, line-height 1.6). Small labels are 12px uppercase with 0.14em letter-spacing in `#777`.
- **Shapes:** large sections 28–32px radius, cards 18–22px, buttons are pills (999px radius, min-height 44–48px). Use a soft shadow `0 8px 30px rgba(0,0,0,.05)`.
- **Motion:** only the hover lift on cards (`translateY(-6px)` plus a stronger shadow, 0.25s). Respect `prefers-reduced-motion`. Optional extra: a subtle fade-up on scroll, nothing more.
- **Layout:** content max-width is 1120px with a 16px side gutter. Mobile must work at 360px: grids collapse to 1 column, the nav becomes a menu button, and the price table scrolls horizontally inside its box.

## Content — facts from the current site (use verbatim, do not invent)

**Company contact details:**

- Fa. CBF Textildruck & Bestickung, Bajuwarenring 17a, 82041 Oberhaching
- Tel +49 89 61469280 · Mobil +49 176 40064461 · Fax 089 61469281 · info@cbf24.de

**Stickerei:**

- The site calls embroidery the highest-quality and most durable way to decorate textiles; it survives industrial washing.
- Every design needs a stitch program (punch), made to fit the design, the machine and the fabric.
- Stitch files can be scaled by at most about 10%. Vector files make them faster and cheaper to produce.
- Stitch files are archived, so repeat orders carry no new setup cost.

**Stickerei prices** (stitch program, one-off, plus VAT):

| Item | Price |
|---|---|
| Standardschriften | 10 € |
| Brustlogo bis 12 cm Breite | 45 € |
| Großes Logo bis 28 cm | ab 60 € |

**Druckerei:**

| Method | Facts |
|---|---|
| Offset-Transferdruck | CMYK, gradients possible, light and dark fabrics, wash-resistant |
| Siebdruck | Direct or as a transfer, gradients possible, recommended from about 100 pieces |
| Flexdruck | Up to 2 colours, no gradients, stays visible on dark fabrics |
| Flockdruck | Velvet surface, fully opaque, coarse graphics only, no gradients, does not stick to silicone-coated textiles |

**Applikationen:** patches in three types: gestickt, gewebt and sublimiert.

**Textilien:** T-Shirts, Polos, Frottee, Winterparkas and workwear for Freizeit, Verein, Gastro and Industrie. Target groups are trades, clubs, schools (school uniforms), hen and stag parties (JGA), promotion and private customers.

## Open placeholders — ask the owner, never fill with made-up values

Anything in `[BRACKETS]` in the templates is missing data:

- `[PREIS]` / `[RABATT]`: the print price table (motif size × method) and quantity discounts
- `[PREIS je Stichzahl]`: the per-piece embroidery price
- `[ÖFFNUNGSZEITEN]`: opening hours
- `[X] Werktage`: response time for quotes
- The Grafikservice text from cbf24.de/Grafikservice-und-Tipps, which could not be loaded
- All `[Foto: …]` / `[Video: …]` boxes: real images and videos from the owner. Ask for a folder of originals.

## Features — implementation notes

**Images and video**

- Use `next/image` (AVIF/WebP configured in `next.config.ts`); lazy loading is the default.
- Process videos should be self-hosted MP4/WebM, `muted autoplay loop playsinline`, under 3 MB, with a poster image.
- **Do not embed YouTube without consent** (GDPR).

**Instagram** (account: @cbf24.de, https://www.instagram.com/cbf24.de/)

- Simplest option: a static grid of 4–8 curated posts that link to the account.
- Live-feed option: Behold.so or the Instagram Graph API, fetched at build time.
- Either way, load nothing from Meta in the browser without cookie consent.

**Price tables**

- Prices live in one data file (`src/data/preise.ts`) so the owner edits one place.
- Show "zzgl. MwSt." on every table.

**Contact form**

- Fields: name, Firma/Verein, email, phone, Leistung (select), Stückzahl, message, file upload (AI, EPS, PDF, SVG, PNG; max 4 MB, because Vercel Functions accept at most 4.5 MB per request. For 10 MB, switch to Vercel Blob client uploads) and a required privacy checkbox.
- Add honeypot spam protection. Show a success message in place, without reloading the page.

**Chatbot**

- The template shows the chat button and panel; this is phase 2.
- Phase 1 option: the button opens WhatsApp (`https://wa.me/4917640064461`) or scrolls to the form.
- Phase 2 option: a small LLM assistant answering from an FAQ, the price data and the process texts. It must never quote prices that are not in `preise.ts` and must offer "Anfrage senden".
- Needs a privacy notice and consent.

**Map**

- Implemented in `src/components/MapEmbed.tsx`: two-click embed. Google Maps loads only after "Karte anzeigen" (optionally remembered in localStorage); "Route planen" opens Google Maps directions. The Datenschutz page must mention Google Maps.

**Cookie consent**

- Required if the site uses Instagram, maps, video embeds or analytics. Use a lightweight GDPR-compliant banner such as `vanilla-cookieconsent`.

**SEO**

- Set a title and meta description for each page in German.
- Add `LocalBusiness` JSON-LD (address, phone, geo, hours), Open Graph images, `sitemap.xml` and `robots.txt`.
- Target keywords: Stickerei München, Textildruck Oberhaching, Arbeitskleidung besticken, Vereinskleidung bedrucken, T-Shirts bedrucken München.
- Redirect the old URLs with 301s: `/Stickerei`, `/Bedrucken`, `/Applikationen` and `/Grafikservice-und-Tipps` go to the matching anchors on `/leistungen`; `/Textilangebot` goes to the external catalogue; `/DATENSCHUTZ` and `/AGB-s` go to the new legal pages.

**Accessibility**

- Use real `<a>`, `<button>`, `<label>` and `<input>` elements. Every image gets German alt text.
- Text contrast must be at least 4.5:1, and focus states must be visible.

## Structure

```
src/
  app/layout.tsx  globals.css  page.tsx            # root layout: Nav, Footer, ChatButton, LocalBusiness JSON-LD
  app/leistungen/  app/kontakt/  app/blog/[slug]/  app/impressum|datenschutz|agb/
  app/sitemap.ts  robots.ts  opengraph-image.tsx  not-found.tsx  icon.png
  app/api/anfrage/route.ts                          # contact form → SMTP → info@cbf24.de
  proxy.ts                                          # case-sensitive /DATENSCHUTZ redirect
  components/  Nav  Footer  ChatButton  Media (Foto, VideoBlock)  PriceTable  SectionTabs
               TextilangebotBanner  BlogCard  ContactForm  MapEmbed  ExternalLink  Icon  Platzhalter
  data/preise.ts  kontakt.ts  medien.ts              # single source for prices, contact data, photos/videos
  lib/blog.ts
content/blog/*.md
public/media/                                       # owner's photos & videos (set `src` in data/medien.ts)
public/brand/logo-schwarz.png  logo-weiss.png       # logo cut out from design/logo.png (transparent); ask owner for a vector file
```

`null` in `data/*.ts` means "missing, ask the owner"; it renders as a visible `[PLATZHALTER]`.

## Working rules for Claude Code

- **Build:** run `npm run build` after each change; all routes should stay static (○/●).
- **Match the templates closely.** If a template choice breaks on mobile, fix it and note what changed.
- **Never invent** prices, opening hours, reviews, customer logos or statistics. Leave `[PLATZHALTER]` and list them in the PR or summary.
- **Keep German copy** exactly as in the templates unless asked. Use German UI strings throughout, such as error messages and form states.
- **Respect the "do not change" design rules.** Ask before adding colours, illustrations or new animations.