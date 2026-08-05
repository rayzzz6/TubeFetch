# TubeFetch

A modern, mobile-first web app for pasting a YouTube URL and previewing/downloading
video (MP4) or audio (MP3) at multiple qualities. Built as a **production-ready
demo**: the full frontend, backend architecture, security, and UX are real —
the media-analysis step returns **mock data** by design (see
[Important: mock backend](#important-mock-backend) below).

```
tubefetch/
├── frontend/     Next.js 15 + TypeScript + Tailwind + Framer Motion
├── backend/      Node.js + Express + TypeScript API
└── README.md     You are here
```

---

## Important: mock backend

`POST /api/analyze` and the download endpoints **do not contact YouTube or
extract real media streams.** They return deterministic, fabricated metadata
so the full product — UI, validation, quality selection, progress states,
history — works end-to-end.

Ripping/downloading YouTube streams without authorization typically violates
YouTube's Terms of Service and can facilitate copyright infringement of
content the user doesn't own. This project deliberately stops short of that.

To go live with a **lawful** media source (e.g. content you own and self-host,
or a properly licensed provider API), implement the same interface as
`backend/src/services/mockYoutube.service.ts` against that source, and update
the import in `backend/src/controllers/analyze.controller.ts`. Every
`REPLACE-ME` comment in the codebase marks a seam intended for this swap.

---

## Stack

**Frontend** — Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion,
lucide-react icons. Dark-mode-only glassmorphism UI, PWA-installable, SEO
metadata, sitemap/robots, accessible (keyboard nav, focus states, reduced-motion
support).

**Backend** — Express + TypeScript. Zod validation, Helmet security headers,
CORS allow-list, per-route rate limiting (`express-rate-limit`), structured
JSON logging, in-memory caching (`node-cache`), and a mock job queue that
simulates async download processing.

---

## Local development

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev        # starts on http://localhost:4000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local     # NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
npm install
npm run dev        # starts on http://localhost:3000
```

Open http://localhost:3000 — paste any valid-looking YouTube URL
(e.g. `https://www.youtube.com/watch?v=dQw4w9WgXcQ`) on the **Analyze** page.

### Type checking & linting

```bash
# in either folder
npm run typecheck
npm run lint        # frontend only
```

---

## API

See [`backend/API_DOCS.md`](./backend/API_DOCS.md) for full endpoint
documentation (`/api/analyze`, `/api/download`, `/api/download/:jobId`,
`/health`), request/response shapes, and error codes.

---

## Deployment

### Backend (Node/Express)

Any Node host works (Render, Railway, Fly.io, a VPS, ECS, etc.):

```bash
cd backend
npm install
npm run build       # compiles to dist/
npm start           # node dist/index.js
```

Set these environment variables in your host's dashboard (see `.env.example`):

- `PORT` — usually assigned by the platform
- `CORS_ORIGINS` — your deployed frontend origin(s), comma-separated
- `RATE_LIMIT_*`, `ANALYZE_CACHE_TTL_SECONDS` — tune as needed
- `NODE_ENV=production`

For multi-instance deployments, replace the in-memory cache
(`services/cache.service.ts`) and job store (`controllers/download.controller.ts`)
with Redis (or similar) so state is shared across instances — both files are
marked with `REPLACE-ME` notes at the relevant seam.

### Frontend (Next.js)

Deploy to **Vercel** (simplest — auto-detects Next.js) or any Node host:

```bash
cd frontend
npm install
npm run build
npm start
```

Set `NEXT_PUBLIC_API_BASE_URL` to your deployed backend's URL. Because it's a
`NEXT_PUBLIC_*` variable it's baked in at build time — set it in your
platform's environment settings **before** building.

Update `SITE_URL` in `app/layout.tsx` and `app/sitemap.ts` to your real
production domain, and replace the placeholder PWA icons in
`public/icons/` with your own artwork (192×192, 512×512, and a maskable
512×512).

### Reverse proxy / same-origin setup (optional)

To avoid CORS entirely, put both apps behind one domain and proxy
`/api/*` to the backend (e.g. via an Nginx rule, or Next.js `rewrites()` in
`next.config.mjs`) — then `NEXT_PUBLIC_API_BASE_URL` can simply be `""`.

---

## Security notes

- No API keys or secrets are ever sent to the client.
- Request bodies are capped (16kb) — this API never needs more.
- Helmet sets standard security headers; strict CORS allow-list.
- Rate limiting is per-IP; move the store to Redis behind a load balancer
  for correctness across multiple instances.
- The service worker (`public/sw.js`) explicitly never caches `/api/*`
  responses, so analysis/downloads are never served stale.

## Accessibility

- Visible focus rings (`:focus-visible`) throughout, skip-to-content link,
  `aria-live` toast region, labeled form controls, `prefers-reduced-motion`
  respected in both CSS and the canvas particle field.

## License

Provided as-is for demonstration and extension. Replace mock services with
lawfully sourced/licensed integrations before any production use.
