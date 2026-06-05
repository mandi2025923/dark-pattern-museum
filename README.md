# Dark Pattern Museum

Postgraduate final major project (MA Digital Media and Creative Industries, University of Birmingham) — a speculative interactive digital museum prototype that critiques manipulative UX.

## Tech stack

- Next.js (App Router)
- React · TypeScript
- Tailwind CSS
- Framer Motion

## Project structure

```txt
src/
├── app/              # App Router pages and dynamic routes
├── components/       # Reusable UI, layout, exhibits, simulations
├── sections/         # Page-level sections
├── animations/       # Framer Motion variants and motion config
├── content/          # Site copy and navigation
├── data/             # Exhibits, simulation rooms, attention metrics
├── store/            # Local experience state
├── types/            # Shared TypeScript types
└── lib/              # Routes and utilities
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home: cinematic hero, safety notice, archive preview |
| `/archive` | Dark pattern archive (15 UX pattern records) |
| `/archive/[slug]` | Single archive record |
| `/rooms` | Simulation room index |
| `/rooms/[slug]` | Individual controlled simulation room |
| `/rooms/confirmshaming` | Confirm shaming simulation room |
| `/rooms/fake-urgency` | Fake urgency simulation room (Pressure Timer) |
| `/attention` | Attention economy visualization |
| `/reflection` | Reflection prompts |
| `/exit` | Final exit sequence |
| `/about` | Project background, theory, ethics |

`/exhibits` redirects to `/archive` via client-side router.

## Local development

```bash
cd "/Users/mandi/Documents/毕业设计"
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and deploy

```bash
npm run build    # static export → out/
npm start        # local preview of static build
```

The project is configured with `output: "export"` and `basePath: "/dark-pattern-museum"` for GitHub Pages deployment at [mandi2025923.github.io/dark-pattern-museum](https://mandi2025923.github.io/dark-pattern-museum). Push to `main` for source and `gh-pages` for static output.

## Design notes

- **Palette**: void black, neon green (`#39ff14`), scan cyan, warning amber
- **Type**: monospace + sans-serif (Tailwind defaults)
- **Motion**: Framer Motion entrance fades, scanline overlay, atmospheric field; respects `prefers-reduced-motion`
- **Static export**: no server, no tracking, no personalisation — the museum's formal argument against surveillant infrastructure

## Further development

See `agents.md` in the project root for the exhibition roadmap.
