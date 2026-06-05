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
| `/archive` | Dark pattern archive (nine UX pattern records) |
| `/archive/[slug]` | Single archive record |
| `/rooms` | Simulation room index |
| `/rooms/[slug]` | Individual controlled simulation room |
| `/rooms/confirmshaming` | Confirm shaming simulation room |
| `/attention` | Attention economy visualization (foundation) |
| `/reflection` | Reflection prompts |
| `/exit` | Final exit sequence |
| `/about` | Project background, theory, ethics |

`/exhibits` redirects to `/archive` where configured.

## Local development

```bash
cd "/Users/mandi/Documents/毕业设计"
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and deploy

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com) by connecting the Git repository.

## Design notes

- **Palette**: void black, neon red, scan cyan, warning amber
- **Type**: Orbitron (display), Exo 2 (body), Share Tech Mono (labels)
- **Motion**: entrance fades, nav indicator, scanline overlay; respects `prefers-reduced-motion`

## Further development

See `agents.md` in the project root for the exhibition roadmap.
