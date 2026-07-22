PROJECT_MANIFEST — PDCYES Website

1. Project Overview
Name: PDCYES – Personal Development Community in Playa del Carmen
Stack: Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Octokit (GitHub-backed CMS) · NextAuth (GitHub OAuth) · simple cookie-auth admin · OpenAI v4 (event content assistant)
Repo: https://github.com/dynamicmike-dashboard/pdcyes2026
GitHub owner/org: dynamicmike-dashboard
Branch: main
Local source: F:\Mike d drive\Mike Webs\PDC YES\pdcyes-new-website 20jul26\pdcyes-github

2. Local Folders Restriction Rule
ONLY use the F: drive.
Antigravity work area: F:\Antigravity — never C: drive.
Do NOT access the local dev from localhost:3000 — that port is reserved for another project. This site runs on port 3001.

3. How to Run Locally
cd "F:\Mike d drive\Mike Webs\PDC YES\pdcyes-new-website 20jul26\pdcyes-github"
npm install
npm run dev
# Open http://localhost:3001
If you only need a production build: npm run build then npm run start.

4. Environment Variables (template)
Store in .env.local (NEVER commit). The same keys belong in Vercel → Project Settings → Environment Variables.

MANAGE_PASSWORD=<your-password>          # cookie-gate admin password
GITHUB_PAT=<github_personal_access_token>    # Content API + commits
OPENAI_API_KEY=<openai_api_key>
GITHUB_ID=<github_oauth_client_id>
GITHUB_SECRET=<github_oauth_client_secret>
NEXTAUTH_SECRET=<random_string>
NEXTAUTH_URL=http://localhost:3001          # or your Vercel URL
GITHUB_OWNER=dynamicmike-dashboard
GITHUB_REPO=https://github.com/dynamicmike-dashboard/pdcyes2026.git
NEXT_PUBLIC_SITE_URL=http://localhost:3001
 
5. Admin / Password Access
Hidden password admin (/manage): visit http://localhost:3001/manage → enter MANAGE_PASSWORD → redirected to /manage/events. Cookie-based session.
GitHub OAuth admin (/admin): requires GITHUB_ID/GITHUB_SECRET. Sign in via Sign in with GitHub.
Logout: visit /manage?logout=1, or delete the session cookie via DevTools.
Change the password: set/change MANAGE_PASSWORD in .env.local (local) and in Vercel env vars (production), then redeploy.

6. Editing Content / Deploying Changes
Public site edits: change code under app/ and components/, commit, push to main. Vercel auto-deploys.
Events content: /manage/events UI creates/edits/deletes events → writes markdown to content/events/<slug>.md via the GitHub Content API.
Re-clone the repo locally: git clone https://github.com/dynamicmike-dashboard/pdcyes2026.git <dest>.

7. Git Push Helper
A small PowerScript at F:\Antigravity\push.ps1 runs git push origin main with your PAT, then scrubs the PAT out of git remote -v. Initial commit 77aabe0 → current head pinned remotely after every successful push.

8. Git History (this session)
77aabe0 Initial commit: PDC YES website (Next.js)
91252d8 fix(admin/events): mark client component + add tsconfig paths
5fdb68e fix: scrub stray tool-call/prose tokens from page.tsx and StatCard.tsx
16b6316 fix(admin,events/page): split server fetch + client filter
e2b91fd fix(SEOHead): server component accepts pathname prop
e3fd493 fix(build): add globals.css + tailwind/postcss, OpenAI v4
e70b7b8 fix(admin/new,admin/edit): split server fetch + client form
0e00e10 fix(EventForm, AI components): repair JSX types + 'use client'
8a5561f fix(SEOHead): export both default and named
6044662 fix(DashboardClient): widen Event type
d622e34 fix(StatCard): accept icon as string
af07b80 fix(admin/clone): split server + client

Vercel Build Errors Encountered + Fixes
A. useState / useEffect / useRouter / usePathname in a Server Component
Symptom:

./app/admin/events/page.tsx:1:1
1 | import { getAllEvents } from "@/lib/content";
2 | import { useEffect, useState } from "react";
                                   ^^^^^^^^
Fix: Either mark 'use client' OR split: thin async server page that fetches, then a 'use client' sibling that holds the hooks. Applied to app/admin/page.tsx → DashboardClient.tsx, app/admin/events/page.tsx, app/events/page.tsx → EventsList.tsx, app/admin/events/new/page.tsx, app/admin/events/[slug]/edit/page.tsx → EventFormClient.tsx, app/admin/events/[slug]/clone.tsx → CloneEventClient.tsx.

B. Can't resolve '@/components/AdminHeader' (false lead)
Symptom pointed to AdminHeader missing; in reality the upstream RSC compile error in app/admin/events/page.tsx halted the segment and the bundler emitted the misleading trace. Fix: TS itself — added "baseUrl": "." and "paths": { "@/*": ["./*"] } in tsconfig.json.

C. usePathname imported in a component used from app/layout.tsx
components/SEOHead.tsx:1:1
1 | import { usePathname } from "next/navigation";
          ^^^^^^^^^^^
Fix: removed usePathname and useMemo. Server component now takes pathname as a prop and reads process.env.NEXT_PUBLIC_SITE_URL for canonical/og.

D. Module not found 'openai'
Module not found: Can't resolve 'openai'
package.json did not list openai. Fix: upgraded to v4 — added "openai": "^4.56.0", rewrote app/api/ai/route.ts to new OpenAI({apiKey}) + client.chat.completions.create(...).

E. Module not found: './globals.css'
./app/layout.tsx
Module not found: Can't resolve './globals.css'
Fix: created app/globals.css with the @tailwind base; @tailwind components; @tailwind utilities; directives plus project utility classes (.bg-primary, .text-primary, etc.) and minimal .prose rules. Added tailwind.config.js and postcss.config.js (Tailwind was in devDeps but no config existed).

F. SEOHead is not exported / Did you mean to use import SEOHead from ...?
./app/about/page.tsx:1:10
Type error: Module '"@/components/SEOHead"' has no exported member 'SEOHead'.
Fix: added a named export alongside the default so both styles resolve: export function SEOHead(...) {...} export default SEOHead;

G. Type 'string' is not assignable to 'Element | ComponentType<any>'
./app/admin/DashboardClient.tsx:38:62
<StatCard icon="Calendar" />
                       ^^^^^^^
Fix: widened StatCard.icon to string | React.ComponentType<any> | JSX.Element and added a render branch for strings.

H. Property 'title' does not exist on type '{ body: string; slug: string; }'
./app/admin/events/[slug]/delete.tsx:27:49
Are you sure you want to delete "{event.title}"?
                                                 ^
Caused by getEventBySlug return type narrowly inferred. Fix: cast source to any in CloneEventClient/EditEventPage, and frame reads with optional-chaining (source?.title ?? source?.slug ?? "Untitled"). For delete.tsx, replace with a 'use client' DeletePageClient.tsx and either rename to page.tsx for routing or drop it from this route segment (already renamed during the session).

I. Stray prose / tool-call tokens inside TSX files
1 | import { getEventBySlug: "lib/content",
2 |  notFound: "next/navigation",
3 |  SEOHead: not sure about imports.…"
Fix: rewritten — those are pre-session artifacts where another model's output leaked into file bodies (also components/StatCard.tsx had <translation:translation.CAN …>; components/ai/AIAssistantToolbar.tsx had onCaret>;…). Always grep for <function=write>, <parameter=content>, I'll write, import { x: "y" patterns after any historical paste-in.

J. EventForm corrupted <label> (Registration Link"label>)
The closing > was missing and replaced by ". Fix: full-file rewrite of EventForm.tsx, also marked 'use client' at the top.

K. Naming/Reserved-name Windows artifacts
Files like nul (Windows reserved) and fix-routes.ps1/.sh with embedded UTF-8 em-dash bytes (\xE2\x80\x91) made cleanup via PowerShell impossible. Fix: added nul, fix-routes.ps1, fix-routes.sh to .gitignore; renamed the bad-name files via a UTF-8 byte-script F:\Antigravity\rename-helper.ps1 using [System.Text.Encoding]::UTF8.GetString([byte[]](0x66,0x69,0x78,...)).

L. PAT in remote URL
After pushing I scrub PAT from git remote set-url origin https://github.com/<owner>/<repo>.git.

M. Recurring pattern (note for next session)
Most errors had one of three root causes:

Hooks in a Server Component — fix by 'use client' OR split into server-page + client-component pair.
Inferred TypeScript shape breaking — fix with any cast or explicit Promise<any[]> return type for getAllEvents/getEventBySlug.
Missing config / stray token paste-in — fix by grepping the repo before each commit and adding tsconfig/tailwind/postcss/globals.css.

9. To-Do / Open Items
Run npm install once on the server (Vercel does this automatically on push).
Verify OpenAI key in Vercel env (without it /api/ai returns 500).
Continue splitting remaining RSC+hook files if any surface (do a sweep with grep for useState|useEffect|useRouter|usePathname inside async function).
Define an explicit Promise<Event[]> return type on getAllEvents/getEventBySlug to remove future any casts.
 
10. Verification Commands
# Last pushed commits
git ls-remote origin
# Local CWD contents
Get-ChildItem "F:\Mike d drive\Mike Webs\PDC YES\pdcyes-new-website 20jul26\pdcyes-github"
# Re-deploy from Vercel dashboard → Project → Deployments → Redeploy latest.
