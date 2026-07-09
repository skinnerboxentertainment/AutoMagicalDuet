# AutoMagically — Lean Consort Model

**Architecture:** OpenCode (orchestrator) + Codex (builder) operating in concert.
**Previous model:** 36-agent studio (deprecated — see `.opencode/agents/` for reference).
**Design doc:** `design/lean-consort-model.md`

---

## Operating Model

Two actors, three layers of structure:

### Tier 0: The Consort (always active)

| Role | Agent | Domain | Authority |
|------|-------|--------|-----------|
| **Orchestrator** | OpenCode | Architecture, workflow, integration, final review | Owns decision log + integration. Decides on architecture, scope, and repo governance |
| **Builder** | Codex | Implementation, art generation, browser verification, testing | Decides locally on implementation mechanics inside an approved design |

### Tier 1: Operating Rhythm

The 7-beat rhythm from the 8D Consensus Framework:

```
Explore → Frame → Expand → Attack → Commit → Build → Prove
```

Current state tracked in `production/active.md`.

### Tier 2: Knowledge Packs

Summoned on demand. Never loaded automatically — path-based rules may suggest packs.

| Pack | Path | Status |
|------|------|--------|
| `docs/packs/game-design-pack.md` | Design docs, gameplay rules, systems | ✅ Extracted |
| `docs/packs/pixijs-rendering-pack.md` | PixiJS rendering, visuals, art | ✅ Extracted |
| `docs/packs/qa-testing-pack.md` | Testing, QA, performance | ✅ Extracted |
| `docs/packs/genre-platformer.md` | Platformer genre defaults | ✅ Extracted |
| architecture-pack | Architecture, layering, patterns | ⏳ Pending |
| audio-pack | Howler.js, sfxr, audio pipeline | ⏳ Pending |
| performance-pack | Profiling, budgets, optimization | ⏳ Pending |

### Project Brain

Durable memory across sessions:
- `production/active.md` — current state, next action, active packs
- `docs/architecture/adr/` — numbered ADRs (architecture decisions)
- `production/events.md` — chronological log

---

## Escalation Ladder

When OpenCode and Codex disagree:

1. **Clarify** the disputed claim (design taste? feasibility? risk? scope?)
2. **Determine what evidence** would resolve it (prototype? test? benchmark?)
3. **Prefer reversible** decisions when evidence is weak
4. **Require an ADR** for irreversible or architecture-shaping decisions
5. **User decides** on product goals, taste, scope, acceptable tradeoffs
6. **OpenCode decides** on integration, architecture, or repo governance
7. **Codex decides locally** on implementation mechanics inside an approved design

---

## Collaboration Protocol

**User-driven collaboration, not autonomous execution.**

- Agents propose, user decides
- Knowledge packs provide structured guidance but do not override user intent
- Multi-file changes require explicit approval for the full changeset
- No commits without user instruction

---

## Technology Stack

- **Renderer:** PixiJS v8 (WebGL2/WebGPU/Canvas)
- **Language:** TypeScript (strict)
- **Build:** Vite + tsc
- **Testing:** Vitest
- **Audio:** Howler.js + jsfxr (optional)

---

## Migration Status

| Component | Status |
|-----------|--------|
| ADR-0001 (Lean Consort Model) | ✅ Accepted |
| Lean Consort Model design doc | ✅ `design/lean-consort-model.md` |
| `production/active.md` | ✅ Active |
| `production/events.md` | ✅ Active |
| `docs/architecture/adr/` | ✅ Active (1 ADR) |
| 4 knowledge packs extracted | ✅ `docs/packs/` |
| `.opencode/agents/` (36 agents) | ⛔ Deprecated — reference only |
| `.opencode/commands/` (81 commands) | ⛔ Deprecated — reference only |
| `.opencode/rules/` (12 rules) | ⛔ Deprecated — reference only |
| Remaining packs (architecture, audio, performance) | ⏳ Pending — extracted when needed |

---

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in a browser.

To generate a game from a spec, the consort follows the 7-beat rhythm:
1. **Explore** — inspect current state
2. **Frame** — define the game spec
3. **Expand** — discuss approaches
4. **Attack** — stress-test the approach
5. **Commit** — lock the design
6. **Build** — generate + verify
7. **Prove** — review and log
