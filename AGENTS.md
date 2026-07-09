# AutoMagicalDuet — Role Delegation

**Short version:** OpenCode builds. Codex sharpens. You decide.

---

## Who Does What

```
OpenCode (Orchestrator-Builder)          Codex (Specialist Critic)
─────────────────────────────            ─────────────────────────────
✓ Architecture decisions                ✓ Research & info aggregation
✓ ALL coding & implementation           ✓ Design critique & deconstruction
✓ Integration & wiring                  ✓ Visual QA (Playwright screenshots)
✓ Repo governance & git                 ✓ Art generation (gpt-image-2)
✓ Final decision on disputes            ✓ Browser verification
```

| Domain | Owned by | Codex's role |
|--------|----------|-------------|
| **Architecture** | OpenCode decides | Codex advises on risks |
| **Implementation** | OpenCode builds | Codex reviews diffs |
| **Visual QA** | OpenCode integrates | Codex inspects screenshots |
| **Art** | OpenCode integrates assets | Codex generates via gpt-image-2 |
| **Testing** | OpenCode writes tests | Codex reviews coverage |
| **Research** | OpenCode frames the question | Codex investigates and summarizes |

### Operating Rhythm

```
Explore (OC) → Frame (OC) → Expand (both) → Attack (CX) → Commit (OC) → Build (OC) → Prove (CX reviews, OC integrates)
```

### Previous model
36-agent studio (deprecated — see `.opencode/agents/` for reference).

---

## Full Operating Model

### Tier 0: The Consort (always active)

| Role | Agent | Primary Domain | Authority |
|------|-------|---------------|-----------|
| **Orchestrator-Builder** | OpenCode | Architecture, implementation, coding, integration, repo governance | Decides architecture, implementation, integration. Owns the build. |
| **Specialist Critic** | Codex | Research, design critique, visual QA/inspection, art generation, browser verification | Advises on design quality, technical risks, visual correctness. Does not own builds. |

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
6. **OpenCode decides** on architecture, implementation, integration, repo governance
7. **Codex advises** on research, design quality, and visual correctness — does not override OpenCode on implementation

---

## Collaboration Protocol

**OpenCode builds, Codex sharpens, user decides.**

- OpenCode owns architecture, implementation, and integration
- Codex provides critique, research, visual QA, and art generation
- Codex advises on design quality and technical risks but does not override OpenCode on implementation
- Multi-file changes require approval for the full changeset
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
1. **Explore** — OpenCode inspects current state
2. **Frame** — OpenCode defines the game spec
3. **Expand** — both discuss approaches
4. **Attack** — Codex stress-tests the approach
5. **Commit** — OpenCode locks the design
6. **Build** — OpenCode implements
7. **Prove** — Codex reviews/verifies, OpenCode integrates
