# Dalaux

> Intelligence, beautifully applied.

The Dalaux agency frontend pairs an ivory and graphite visual identity with an animated processor. Built with React, TypeScript, and Vite, with no animation framework, video, WebGL, or paid asset dependency.

## What's inside

- Vite + React + TypeScript
- Responsive hero, services, concept showcases, process, principles, FAQ, and contact sections
- Layered processor artwork with SVG signal pulses, CSS depth, and pointer tilt
- Three selectable workflow demonstrations and an explicit animation pause control
- Reduced-motion support, off-screen animation pausing, native FAQ disclosures, skip link, and visible keyboard focus
- Native modal project brief with validation, copy, and text download
- Locked dependencies and GitHub Actions production-build verification

## Run locally

Use Node.js 24 and pnpm 11.19.0 (the version pinned in `package.json`).

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Create a production build with:

```bash
pnpm build
pnpm preview
```

## Project structure

- `src/App.tsx` — page content and section composition
- `src/styles.css` — responsive visual system
- `src/main.tsx` — application entry point
- `src/components/Processor.tsx` — processor artwork and demo controls
- `src/components/ProjectBrief.tsx` — accessible project-brief dialog
- `src/components/Primitives.tsx` — shared brand, arrows, and labels
- `.github/workflows/ci.yml` — automated build check
- `pnpm-lock.yaml` — reproducible dependency versions

## Contact and content

The project brief is deliberately local: it does **not** send email, contact a CRM, or claim that an enquiry was submitted. Visitors can copy or download their draft. Form data stays in component memory and is cleared on page reload. Replace this with a verified booking link or a validated server endpoint once the agency's destination is confirmed. Do not put service credentials in frontend code.

The workflow and architecture-site showcases are labeled concepts, not client results. The processor is a visual demonstration, not a live AI service. The tool names illustrate integration possibilities, not partnerships or endorsements. No analytics or tracking is configured. Fonts load from Google Fonts with local system fallbacks.

## Deployment

`pnpm build` produces `dist/`, suitable for a static hosting provider. This repository's CI builds the site but does not deploy it. Configure the final domain before adding canonical URLs and production social-preview images.
