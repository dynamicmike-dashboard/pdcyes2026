# PDCYES – Next.js + Tailwind + GitHub‑backed CMS

This scaffold includes:

* Public site (Home, About, Community, Join Us, Events archive & detail) – SSG/ISR
* GitHub‑auth admin (`/admin`) – uses NextAuth (GitHub OAuth)
* **Hidden password‑only admin** (`/manage`) – simple cookie login, no GitHub sign‑in
* AI‑powered content assistant (event page, WhatsApp, Facebook, LinkedIn, email) inside the event editor
* All secrets stay out of the repository (`.gitignore` + `.env.example`) – supply real values in Vercel → Environment Variables (or a local `.env.local` for dev)

## Getting started

1. `npm install`
2. Create a `.env.local` file (copy from `.env.example` and replace the placeholders with real keys) **or** set the same variables in Vercel.
3. `npm run dev` – the app runs on http://localhost:3001 (change the port in `package.json` if you prefer another).
4. Visit `http://localhost:3001/manage` → log in with the password you set (`MANAGE_PASSWORD`) → manage events.

Happy coding!