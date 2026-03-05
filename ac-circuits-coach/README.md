# AC Circuits Coach

Interactive study app for **Introductory Circuit Analysis (14th edition)**, focused on:

- Chapter 10 (Capacitors)
- Chapter 11 (Inductors)
- Chapter 13 (Sinusoidal waveforms)
- Chapter 14 (Basic elements and phasors)
- Chapter 15 (Series AC circuits)
- Chapter 16 (Parallel AC circuits)
- Chapter 17 (Series-parallel AC networks)

## Features

- Student-friendly concept breakdowns with practical wording
- Key equation sheet by chapter (with when-to-use guidance)
- Flashcards
- Multiple-choice quiz mode
- Fill-in-the-blank practice
- Equation selection mode (pick the best equation for a scenario)
- Interactive diagram labs:
  - RC charging (chapter 10)
  - RL storage (chapter 11)
  - Sine-wave controls (chapter 13)
  - Series impedance triangle (chapters 14/15)
  - Parallel admittance model (chapter 16)
  - Mixed network reduction model (chapter 17)
- TI Nspire CX II calculator drills and quick numeric checks

## Local run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npm run build
```

## Deploy to Vercel

1. Push this folder to a Git repo.
2. In Vercel, create a new project and import the repo.
3. Set the Vercel project root directory to:
   `ac-circuits-coach`
4. Keep default Next.js build settings.
5. Deploy.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4 + custom global CSS
