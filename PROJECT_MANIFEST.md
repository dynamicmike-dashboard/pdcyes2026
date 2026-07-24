# PROJECT MANIFEST

## STATUS
- Current Goal: Stable, Production-Ready Event Management & Public Event Pages
- Last Session Date: 2026-07-24
- Last Session End Time: ~12:36 CST

## SYSTEM STATE
- Project Root: F:\Mike d drive\Mike Webs\PDC YES\pdcyes-new-website 20jul26\pdcyes-github
- Active Modules: Event Management (/manage), AI Copywriting (/api/ai), GitHub Sync (/api/github)
- Repository: https://github.com/dynamicmike-dashboard/pdcyes2026
- Branch: main
- Live Site: https://pdcyes2026.vercel.app/
- Manage URL: https://pdcyes2026.vercel.app/manage
- Dev Port: 3001 (npm run dev -- -p 3001)

## COMPLETED THIS SESSION (2026-07-24)

### Bug Fixes
- [x] Fixed Vercel Digest `2508316783` server-side exception: Added `"use client"` to `SpeakerCard.tsx` (onError handler not valid in React Server Components)
- [x] Fixed stale event page cache: Changed `revalidate = 60` → `force-dynamic` so image/content changes show immediately after every edit
- [x] Fixed stale SHA bug: Edit form no longer passes cached SHA — API always auto-fetches current GitHub SHA before writing

### Features & Improvements
- [x] Refactored SEO metadata to native Next.js `generateMetadata()` — proper OG title, description, image per event
- [x] Enhanced `MarkdownBody` — auto-hyperlinks raw URLs and `[text](url)` markdown links; added **bold** and *italic* rendering
- [x] Improved Registration Link CTA on event detail page — prominent amber card with "Register Now →" button and raw URL as secondary hyperlink

## DATA PERMANENCE CONFIRMED
- All event edits are committed permanently to GitHub as `.md` files in `/content/events/`
- Full git history retained — every version of every event recoverable at any time
- Wiki summaries stored in `/wiki/summaries/` for session continuity

## PENDING / NEXT SESSION
- [ ] Add more events via /manage as needed
- [ ] Consider adding event archiving/past events section
- [ ] Consider image upload to GitHub repo instead of relying on external CDN URLs

## RESTART PROTOCOL
1. Local dev: `npm run dev` (port 3001 configured in package.json)
2. Admin: http://localhost:3001/manage → password: dormobile1
3. See SYSTEM_PROTOCOL.md for full startup instructions
