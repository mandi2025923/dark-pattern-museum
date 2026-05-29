# Dark Pattern Museum - Agents Guide

## Project Overview

You are helping build a postgraduate final major project for a MA Digital Media and Creative Industries student at the University of Birmingham.

The project is an interactive critical design website prototype called **Dark Pattern Museum**.

The website acts as a speculative digital museum/archive exposing manipulative UX patterns used by modern platforms, apps, social media systems, e-commerce websites, and algorithmic recommendation systems.

This is not a normal commercial website. It is:

- A critical design project
- An interactive academic artefact
- A UX critique experience
- A portfolio-quality creative coding project
- A reflective digital media experiment

The project should feel like:

- A futuristic digital exhibition
- A cyber/modern UI experience
- An interactive storytelling website
- A museum archive mixed with manipulative platform aesthetics

The emotional tone should create discomfort, curiosity, realization, self-reflection, and awareness of digital manipulation.

## Critical Themes

The project critiques:

- Dark patterns
- Addictive design
- Infinite scrolling
- Notification addiction
- Confirmation shaming
- Fake urgency
- Information overload
- Algorithmic manipulation
- Attention economy systems

The website should intentionally simulate manipulative UX patterns in controlled ways to help users critically understand them.

Important boundaries:

- The project is educational and critical.
- Do not implement genuinely malicious behavior.
- Do not collect user data.
- Do not use real tracking.
- Do not manipulate users outside the designed experience.

## Target Outcome

Create a polished interactive web experience suitable for:

- University final exhibition
- Dissertation artefact
- Portfolio project
- Creative technology showcase
- UX/UI case study

The project should feel impressive both academically and professionally.

## Preferred Tech Stack

Use this stack unless the user requests otherwise:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Vercel deployment

Optional additions:

- GSAP
- Three.js
- Lenis smooth scroll
- shadcn/ui
- Zustand
- Lottie animations

Avoid:

- Heavy backend systems
- Authentication systems
- Databases unless necessary
- Complicated server architecture

This is mainly a frontend interactive experience.

## Design Direction

Visual references:

- Modern museum websites
- Cyber aesthetics
- Brutalist web design
- Dark futuristic interfaces
- Experimental digital storytelling
- Surveillance/control aesthetics
- Dystopian UI
- Black Mirror style interactions

Color palette:

- Black
- Dark gray
- Neon red
- White typography
- Occasional warning colors

Typography:

- Clean modern sans serif
- Strong hierarchy
- Cinematic spacing

Animation style:

- Smooth
- Immersive
- Unsettling
- Responsive
- Intentional

The website should feel premium and professionally designed. Avoid generic corporate landing page aesthetics, plain academic article layouts, and default template styling.

## Website Structure

Build the website with multiple interactive sections/pages.

Suggested structure:

1. Landing Page
   - Cinematic intro
   - Warning message
   - Immersive entry animation
   - "Enter the Museum" CTA

2. Dark Pattern Archive
   - Interactive cards/categories for dark patterns
   - Each entry should include an explanation, real-world inspired examples, interactive simulation, emotional UX experience, and critical commentary

3. Interactive Simulation Rooms
   - Endless scrolling
   - Fake countdowns
   - Notification spam
   - Attention traps
   - Autoplay systems

4. Attention Economy Visualization
   - Screen time
   - Attention extraction
   - Notification frequency
   - Dopamine loops
   - Algorithmic reinforcement

5. Reflection Section
   - Prompt users to reflect on media habits, digital addiction, platform dependency, and emotional manipulation online

6. Final Exit Experience
   - Emotional/cinematic ending
   - Critical closing message, such as "You were never the customer. You were the product."

Dark pattern archive categories should include:

- Infinite Scroll
- Confirmshaming
- Fake Urgency
- Forced Continuity
- Notification Addiction
- Privacy Zuckering
- Algorithmic Manipulation
- Information Bombardment

## UX Requirements

The experience must be:

- Immersive
- Highly interactive
- Visually polished
- Emotionally engaging
- Academically meaningful

Balance usability, intentional friction, and critical discomfort. Do not make the experience genuinely unusable.

Maintain reasonable accessibility:

- Responsive layout
- Keyboard support where possible
- Readable typography
- Motion reduction fallback

## Academic Context

This project is informed by:

- Dark pattern theory
- Attention economy
- Persuasive technology
- Platform capitalism
- UX ethics
- Surveillance capitalism
- Digital media critique

Subtly communicate these theories through interaction design rather than heavy academic text.

## Development Approach

When implementing:

- Prioritize visual quality.
- Create reusable components.
- Use modular architecture.
- Maintain a clean folder structure.
- Document components clearly where helpful.
- Continuously connect design decisions to the critical theme of manipulative UX and digital attention extraction.
- Maintain a balance between artistic experimentation and portfolio-level polish.

Always explain:

- Architecture decisions
- Interaction rationale
- How the UX supports the critical theme

## File Structure

Organize clearly:

```txt
components/
sections/
animations/
hooks/
styles/
data/
content/
```

Adapt this structure to the framework conventions once the app is scaffolded.

## Coding Style

Use:

- Clean modern React patterns
- Reusable components
- TypeScript types
- Maintainable architecture

Avoid:

- Messy inline code
- Duplicated logic
- Overengineering

## Output Expectations

When generating code:

- Generate production-quality UI.
- Include animations.
- Include responsive design.
- Include meaningful microinteractions.
- Explain setup instructions.
- Explain dependencies.
- Explain deployment steps.

## Notes For Future Agents

- Read this file first when starting work.
- Check `git status` before editing.
- Respect existing user changes.
- If the project gains a README, package manifest, test config, or framework-specific files, use those as implementation context and keep this guide aligned.
