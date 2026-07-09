# AutoMagically — Quickstart Guide

## First Time

```bash
npm install
npm run dev        # opens at http://localhost:5173
npm test           # 20 tests should pass
npm run build      # production build to dist/
```

## Playing the Built Game

Arrow keys to move, Space to jump, collect gems, avoid the enemy, reach the exit door. Press R to restart after game over.

## Generating a New Game

The OpenCode + Codex consort builds games collaboratively using the 7-beat rhythm:

1. **Explore** — inspect current state and available knowledge
2. **Frame** — define the game spec
3. **Expand** — discuss approaches
4. **Attack** — stress-test the design
5. **Commit** — lock the design and spec it
6. **Build** — generate code, art, and tests
7. **Prove** — verify with tsc, vitest, and Playwright screenshot

## Knowledge Base

Domain knowledge lives in `knowledge/` — 56 tagged chunks across architecture, game-design, pixijs, qa-testing, workflow, and genre. Load relevant chunks when starting a new task.

## Project Brain

- `production/active.md` — what's happening now
- `production/events.md` — what's happened before
- `docs/architecture/adr/` — why decisions were made
