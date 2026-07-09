# AutoMagically — Lean Game Studio

**Architecture:** OpenCode (orchestrator) + Codex (builder) operating in concert.
**Stack:** PixiJS v8 + TypeScript strict + Vite + Vitest.
**Status:** Working game output, art pipeline, RAG knowledge base.

```
Describe → Generate → Art → Verify → Iterate
```

---

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in a browser. A platformer game is already built in.

To generate a new game, the OpenCode + Codex consort follows the 7-beat rhythm:

```
Explore → Frame → Expand → Attack → Commit → Build → Prove
```

See `design/lean-consort-model.md` for the full operating model.

---

## What This Is

A two-agent game development system where **OpenCode** (orchestrator) and **Codex** (builder) collaborate to produce browser games. The system learns from every build via a RAG knowledge base extracted from 36 expert agent definitions.

### Capabilities

| Phase | What | Status |
|-------|------|--------|
| 0 | Build pipeline — tsc, vite, vitest all green | ✅ |
| 1 | Working platformer from spec (20/20 tests) | ✅ |
| 2 | Lean Consort Model — OpenCode + Codex operating model | ✅ |
| 3 | Art generation + texture pipeline + Playwright visual verification | ✅ |
| 4 | RAG knowledge base — 56 chunks across 11 domains | ✅ |

### Test Games Produced

The previous version of this system generated 5 working games across different genres: twin-stick shooter, breakout, submarine shmup, puzzle game, and platformer. See `design/` for architecture docs.

---

## Architecture

### The Consort (2 actors)

| Role | Agent | Domain |
|------|-------|--------|
| Orchestrator | OpenCode | Architecture, workflow, integration, final review |
| Builder | Codex | Implementation, art generation (gpt-image-2), browser verification, testing |

### Knowledge Base (56 chunks)

`knowledge/` directory with tagged, retrievable knowledge across:

| Domain | Chunks | Contents |
|--------|--------|----------|
| architecture | 11 | Layer isolation, state ownership, scene lifecycle, engine code standards |
| game-design | 9 | MDA framework, economy design, core loops, level pacing, balancing |
| pixijs | 7 | Rendering pipeline, scene management, input handling, asset loading, audio |
| qa-testing | 8 | Test standards, performance budgets, accessibility, browser smoke tests |
| workflow | 11 | Collaboration protocol, decision records, release pipeline, localization |
| genre | 5 | Top-down, shmup, runner, puzzle, minimal |
| audio, art, narrative | 5 | Sound design, visual identity, worldbuilding, dialogue |

### Durable Memory

- `production/active.md` — current state, next action, active packs
- `production/events.md` — chronological log of all significant events
- `docs/architecture/adr/` — numbered architecture decision records

---

## Project Structure

```
├── AGENTS.md                 # Consort model description
├── opencode.json             # OpenCode config (permissions, models)
├── design/
│   └── lean-consort-model.md # Full operating model specification
├── knowledge/                # RAG knowledge base (56 chunks)
├── docs/
│   ├── architecture/adr/     # Decision records
│   └── packs/                # Knowledge packs (extracted domain guides)
├── production/
│   ├── active.md             # Current session state
│   └── events.md             # Chronological history
├── src/
│   ├── main.ts               # Entry point
│   ├── core/                 # Engine (scene-manager, input-manager, game-loop)
│   ├── scenes/               # Game scenes (boot, game)
│   ├── gameplay/             # Game logic (player, level, enemy, gem, state)
│   └── audio/                # Howler.js + jsfxr audio
├── public/
│   └── assets/               # Runtime assets (sprites, manifest)
├── assets/data/              # Game data (config, levels)
├── packages/
│   └── narrative-core/       # Zod-validated narrative engine
├── tools/
│   ├── ts-compiler-mcp/      # TypeScript MCP server
│   └── audio-pipeline/       # Procedural SFX generation
└── tests/                    # Vitest test suites
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Renderer | PixiJS v8 (WebGL2/WebGPU/Canvas) |
| Language | TypeScript 5.9 (strict) |
| Build | Vite 6 |
| Testing | Vitest 3 (20 tests, all passing) |
| Audio | Howler.js + jsfxr (procedural SFX) |
| Validation | Zod 4 |
| CI | GitHub Actions (tsc + test + build) |

---

## License

MIT. See [LICENSE](LICENSE).
