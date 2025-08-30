# Resume Project

This repository contains my professional resume.
It is generated using GitHub Copilot in agent mode.

Local development (Node.js + Vite)
- Prerequisites: Node.js 18+ (recommended 20)
- Install: `npm install`
- Run dev server: `npm run dev`
- Build: `npm run build` (outputs to `dist/`)
- Preview build: `npm run preview`

Deployment (GitHub Pages)
- A workflow at `.github/workflows/pages.yml` builds the site with Vite and deploys to GitHub Pages on pushes to `main`.
- Custom domain `ferencpato.com` is preserved via `public/CNAME` copied into the build output.
