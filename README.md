# LogicForge

A gamified learning platform for absolute programming beginners. Develop computational thinking through interactive, programming-style challenges: before writing a single line of code.

## Features

- **8 missions + Final Boss** covering algorithms, problem analysis, debugging, decisions, loops, and variables
- **Challenge-first learning** - discover concepts after solving problems
- **Multi-phase missions** - Understand -> Logic -> Pseudocode -> Challenge -> Concept
- **Game mechanics** - XP, levels, achievements, streaks, progressive hints
- **Persistent progress** - saved in localStorage

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Architecture

```
src/
  data/levels/     # Challenge data (easy to add Level 2)
  components/      # UI and challenge components
  context/         # Progress state + localStorage
  types/           # TypeScript definitions
```

Challenge data is separated from UI - add new levels by extending `src/data/levels/`.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Lucide Icons
- @dnd-kit (drag and drop)
- React Router
