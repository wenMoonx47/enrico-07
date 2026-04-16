# Enrico Perania — Portfolio

Senior Software Engineer portfolio with terminal/developer aesthetic. Built with Next.js 16, Tailwind CSS v4, next-intl (ES/EN), Framer Motion, shadcn/ui.

**Live:** [enricoperania.dev](https://enricoperania.dev)

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| i18n | next-intl (Spanish default, English secondary) |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Command palette | cmdk |
| Toasts | sonner |
| Fonts | JetBrains Mono + Geist Sans |
| Deployment | Vercel (primary) / Docker (portable) |

---

## Quick start

```bash
# 1. Clone
git clone https://github.com/ethhandy/enrico-portfolio.git
cd enrico-portfolio

# 2. Install
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local — see Environment Variables section below

# 4. Run dev server
npm run dev
# Open http://localhost:3000  (redirects to /es by default)

# 5. Build for production
npm run build && npm start
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
# Resend API key — get one at https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email that receives contact form submissions
CONTACT_EMAIL_TO=enricoperania@gmail.com

# "From" address (must be verified in your Resend account)
CONTACT_EMAIL_FROM=noreply@enricoperania.dev

# Public site URL (no trailing slash)
NEXT_PUBLIC_SITE_URL=https://enricoperania.dev
```

> **Note:** If `RESEND_API_KEY` is not configured, contact form submissions are logged to the console instead of sent — safe for local development.

---

## Deploy to Vercel (recommended)

1. Push the repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) → import the repo.
3. Add environment variables in the Vercel dashboard (same keys as `.env.example`).
4. Click Deploy — Vercel detects Next.js automatically.

**Custom domain:** Add `enricoperania.dev` in Vercel → Domains, then update `NEXT_PUBLIC_SITE_URL`.

No Docker or special configuration needed for Vercel.

---

## Deploy with Docker

The Dockerfile uses Next.js **standalone** output for a minimal production image.

### Local Docker build

```bash
# 1. Configure environment
cp .env.example .env.local && nano .env.local

# 2. Build image
docker build -t enrico-portfolio .

# 3. Run container
docker run -p 3000:3000 --env-file .env.local enrico-portfolio
# Open http://localhost:3000
```

### Docker Compose

```bash
cp .env.example .env.local && nano .env.local

docker compose up -d
# Open http://localhost:3000

docker compose logs -f portfolio   # view logs
docker compose down                # stop
```

### Deploy to Railway / Fly.io / AWS ECS

```bash
docker build -t your-registry/enrico-portfolio:latest .
docker push your-registry/enrico-portfolio:latest
```
Set the environment variables in your platform's dashboard and map port `3000`.

---

## Adding a new case study

1. Open [`lib/data/case-studies.ts`](lib/data/case-studies.ts).
2. Add a new `CaseStudy` object following the existing schema (all fields with `{ es, en }` shapes).
3. Set `featured: true` to show it on the home page (keep max 3 featured).
4. Add the company logo SVG to `public/images/companies/<company>.svg`.
5. (Optional) Add a product screenshot to `public/images/products/<company>.webp`.
6. The `/work/[slug]` page generates automatically — no routing changes needed.

---

## Updating translations

| File | Locale |
|---|---|
| [`messages/es.json`](messages/es.json) | Spanish (default) |
| [`messages/en.json`](messages/en.json) | English |

Rules:
- Every key in `es.json` must exist in `en.json` with the same structure.
- Long-form content (bio, case study body text) lives in `lib/data/*.ts` as `{ es, en }` typed objects.
- Run `npm run build` after editing to catch missing keys.

---

## Project structure

```
app/
├── [locale]/           # All pages under locale prefix (/es, /en)
│   ├── page.tsx        # Home (8 sections)
│   ├── work/[slug]/    # Case study deep dives
│   ├── uses/           # Tools & setup page
│   └── resume/         # CV viewer + download
├── api/
│   ├── contact/        # POST → sends email via Resend
│   └── og/             # Dynamic OG image (1200x630)
├── sitemap.ts
└── robots.ts

components/
├── sections/           # Hero, About, Services, CaseStudies, Timeline, TechStack, Contact
├── terminal/           # TerminalWindow, TerminalPrompt, TerminalCursor
├── providers/          # CommandPalette context + Sonner Toaster
├── motion/             # FadeUp scroll-reveal
├── icons/              # Brand SVGs (GitHub, LinkedIn, Twitter/X, WhatsApp)
├── ui/                 # shadcn/ui components
├── Navbar.tsx
├── Footer.tsx
├── StatusBar.tsx
├── CommandPalette.tsx
└── LanguageToggle.tsx

lib/
├── data/               # profile, experience, case-studies, tech-stack, services, uses
├── i18n/               # routing + typed navigation helpers
└── utils.ts

messages/
├── es.json             # Spanish (default locale)
└── en.json             # English

public/
├── images/companies/   # Company logo SVGs — replace placeholders with real logos
├── images/products/    # Product screenshots — add real .webp files
├── resume/             # Add cv-es.pdf and cv-en.pdf here
└── og/                 # Optional static OG images
```

---

## Commands

```bash
npm run dev      # Dev server → http://localhost:3000
npm run build    # Production build
npm start        # Serve production build
npm run lint     # ESLint
```

---

## Pre-launch checklist

- [ ] Add CVs: `public/resume/cv-es.pdf` and `public/resume/cv-en.pdf`
- [ ] Replace company logo SVG placeholders in `public/images/companies/`
- [ ] Add product screenshots in `public/images/products/`
- [ ] Add profile photo at `public/images/profile.jpg`
- [ ] Verify your domain in Resend and set `CONTACT_EMAIL_FROM`
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your live domain
- [ ] Configure custom domain in Vercel

---

Built with Next.js in Lima 🇵🇪
