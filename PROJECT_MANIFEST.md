# PROJECT MANIFEST

## STATUS
- Current Goal: Host events on events.pdcyes.com subdomain, linking cleanly to pdcyes.com main site.
- Last Session Date: 2026-07-24
- Last Session End Time: ~17:00 CST

## SYSTEM STATE
- Project Root: F:\Mike d drive\Mike Webs\PDC YES\pdcyes-new-website 20jul26\pdcyes-github
- Active Modules: Event Management (/manage), AI Copywriting (/api/ai), GitHub Sync (/api/github)
- Repository: https://github.com/dynamicmike-dashboard/pdcyes2026
- Branch: main
- Live Site: https://events.pdcyes.com/ (previously pdcyes2026.vercel.app)
- Manage URL: https://events.pdcyes.com/manage
- Dev Port: 3001 (npm run dev -- -p 3001)

## COMPLETED THIS SESSION (2026-07-24, Second Half)

### Subdomain Navigation Adjustments
- [x] Configured header navigation links to cleanly point to external pages on the main `https://pdcyes.com/` site:
  - **PDCYES logo** and **Home** lead to `https://pdcyes.com/` (new tab).
  - **Events** points to `https://events.pdcyes.com/` (same tab).
  - **About** leads to `https://pdcyes.com/about` (new tab).
  - **Join Us** leads to `https://pdcyes.com/join-us` (new tab).
  - **Community** link has been removed completely.
- [x] Updated homepage (`app/page.tsx`) to show the event archive search and grid list of thumbnails/titles/dates directly instead of rendering only a single keynote/featured event.
- [x] Adjusted `EventsList.tsx` to fix nested link structures.

## DATA PERMANENCE CONFIRMED
- All event edits are committed permanently to GitHub as `.md` files in `/content/events/`
- Full git history retained — every version of every event recoverable at any time
- Wiki summaries stored in `/wiki/summaries/` for session continuity

## PENDING / NEXT SESSION
- [ ] Monitor Vercel build status and domain mapping.
- [ ] Implement image uploads directly to the repo rather than referencing outside URL paths if requested.
