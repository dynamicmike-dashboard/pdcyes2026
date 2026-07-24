# PROJECT MANIFEST

## STATUS
- Current Goal: Event Management & AI Assistant Fixes / Server Exception Debugging
- Last Session Date: 2026-07-23

## SYSTEM STATE
- Project Root: F:\Mike d drive\Mike Webs\PDC YES\pdcyes-new-website 20jul26\pdcyes-github
- Active Modules: Event Management (/manage), AI Copywriting (/api/ai), GitHub Sync (/api/github)
- Repository: https://github.com/dynamicmike-dashboard/pdcyes2026
- Branch: main

## COMPLETED THIS SESSION
- [x] Fixed AI generation 401 error: `/api/ai` now authorizes password-authenticated `/manage` users via `isUserAuthenticated()`.
- [x] Fixed Event publish 401 error: `/api/github` authorizes `/manage` users and commits using `GITHUB_PAT`.
- [x] Fixed GitHub API `sha` requirement for event edits: auto-fetches file SHA if omitted.
- [x] Added Speaker Profile Image fields (`speaker1_image`, `speaker2_image`) to form & `SpeakerCard` component.
- [x] Added Direct Live Viewing & Shareable Link buttons (`/events/<slug>`) to create, edit, and event list screens.
- [x] Hardened frontmatter parsing (`parseEventMarkdown` in `lib/github.ts`) with safe regex fallback parser.
- [x] Added GitHub raw CDN fallback & token headers (`lib/content.ts`) for un-rate-limited event fetching.
- [x] Fixed Vercel Digest `2508316783` Server-Side Exception on `/events/[slug]`: Added `"use client"` to `SpeakerCard.tsx` (which contains `onError` image fallback handler) to prevent React Server Component SSR crash, and refactored SEO metadata to native Next.js `generateMetadata`.

## PENDING / NEXT SESSION
- [ ] Confirm published event rendering on live domain (https://pdcyes2026.vercel.app/events/move-laugh-thrive after Vercel build completes).

