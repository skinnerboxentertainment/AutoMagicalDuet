# Lean Consort Model — Agent Architecture v2

**Status:** Design locked ✅
**Date:** 2026-07-08
**Revised:** 2026-07-08 (role rebalance — OpenCode builds, Codex sharpens)
**Consensus between:** OpenCode (Orchestrator-Builder) + Codex (Specialist Critic)

---

## Architecture (3 Tiers, Not 3 Agent Tiers)

```
┌─────────────────────────────────────────────────┐
│                 TIER 0: ACTORS                   │
│                                                   │
│   OpenCode (Orchestrator-Builder)  Codex (Specialist Critic) │
│   - Architecture                  - Research                 │
│   - Implementation                - Design critique          │
│   - Integration                   - Visual QA/inspection     │
│   - Coding                        - Art generation           │
│   - Repo governance               - Browser verification     │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│                TIER 1: RHYTHM                     │
│                                                   │
│   7-Beat Operating Rhythm (from 8D Framework)     │
│                                                   │
│   Explore → Frame → Expand → Attack →             │
│   Commit → Build → Prove                          │
│                                                   │
│   Coordinated via: production/active.md            │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│              TIER 2: KNOWLEDGE                    │
│                                                   │
│   Knowledge Packs (structured, not personas)      │
│                                                   │
│   - game-design-pack       - architecture-pack    │
│   - pixijs-rendering-pack  - audio-pack           │
│   - qa-testing-pack        - performance-pack     │
│   - genre-platformer       - genre-top-down       │
│   - genre-shmup            - genre-runner         │
│   - genre-puzzle                                  │
│                                                   │
│   Triggered by: path-based recommendations        │
│   (never automatic — always explicit load)        │
└─────────────────────────────────────────────────┘
```

---

## Tier 0: The Consort

| Role | Agent | Model | Primary Domain | Authority |
|------|-------|-------|---------------|-----------|
| **Orchestrator-Builder** | OpenCode | Pro | Architecture, implementation, coding, integration, repo governance | Decides architecture, implementation, integration. Owns the build. |
| **Specialist Critic** | Codex | Flash | Research, design critique, visual QA/inspection, art generation, browser verification | Advises on design quality, technical risks, visual correctness. Does not own builds. |

### Escalation Ladder

When OpenCode and Codex disagree:

1. **Clarify** the disputed claim (design taste? technical feasibility? risk? scope?)
2. **Ask what evidence** would decide it (prototype? test? benchmark? user approval?)
3. **Prefer reversible** decisions when evidence is weak
4. **Require an ADR** for irreversible or architecture-shaping decisions
5. **User decides** on product goals, taste, scope, acceptable tradeoffs
6. **OpenCode decides** on architecture, implementation, integration, repo governance
7. **Codex advises** on research, design quality, and visual correctness — does not override OpenCode on implementation

> OpenCode owns the build. Codex sharpens it. The user owns the product.

---

## Tier 1: The 7-Beat Rhythm

The operating rhythm comes from the 8D framework's field mnemonic:

| Beat | What happens | Who leads | Artifact |
|------|-------------|-----------|----------|
| **Explore** | Discover current reality | OpenCode | Findings summary |
| **Frame** | Define desired outcome | OpenCode | Goal + acceptance criteria |
| **Expand** | Generate approaches | Both | Trade-off notes |
| **Attack** | Stress-test leading approach | Codex | Risk list, blockers |
| **Commit** | Decide path + design contract | OpenCode | Decision record + design spec |
| **Build** | Implement | OpenCode | Code, tests |
| **Prove** | Review, verify, log | Codex reviews, OpenCode integrates | Visual verification, event log, checkpoint |

### Coordination Contract: `production/active.md`

```markdown
# Active Session

## Current Beat
Explore | Frame | Expand | Attack | Commit | Build | Prove

## Current Objective
One concrete outcome for this beat.

## Active Packs
- pack-name: why loaded

## Open Decisions
- decision, owner, context

## Next Action
The next concrete thing.

## Blockers
Only real blockers.
```

---

## Tier 2: Knowledge Packs

### Pack Format

Each knowledge pack is a structured markdown file with:

```yaml
---
name: pack-name
when: "Paths or contexts where this pack is relevant"
triggers: "What should cause a recommendation"
---
```

Then sections (in order):
1. **When to use** — Conditions where this pack is relevant
2. **Constraints** — Budgets, rules, non-negotiables
3. **Patterns** — Recommended approaches
4. **Anti-patterns** — What not to do
5. **Checklist** — Things to verify
6. **References** — Templates, guides, examples
7. **Escalation** — When to pull in other packs or escalate

### Pack Loading Rule

Packs are NEVER loaded automatically. Path-based rules MAY suggest:

```
Touched: src/rendering/**
Suggested packs:
  - pixijs-rendering
  - performance

Load one? Or continue without?
```

The consort or user explicitly chooses. `active.md` records which packs are loaded.

---

## Project Brain (Durable Memory)

Three files, low ceremony:

| File | Purpose | Format |
|------|---------|--------|
| `production/active.md` | Current operational state | Structured markdown (see above) |
| `docs/architecture/adr/` | Durable decisions | Numbered ADRs: `0001-title.md` |
| `production/events.md` | Chronological history | Dated entries with references |

### ADR Format

```markdown
# ADR-0001: Title

**Date:** YYYY-MM-DD
**Status:** Accepted | Proposed | Superseded

## Context
What prompted this decision?

## Decision
What we decided.

## Rationale
Why this over alternatives.

## Consequences
What this enables and what it constrains.

## Rejected Alternatives
- Option A: rejected because...
- Option B: rejected because...
```

### Events Format

```markdown
## YYYY-MM-DD
- Built prototype X from spec Y.
- Chose renderer path; see ADR-0001.
- Build failed on asset validation.
```

---

## Compared to Old Model

| Aspect | Old (36 agents) | New (Lean Consort) |
|--------|----------------|-------------------|
| Agent count | 36 named agents | 2 actors |
| Structure | 3 tiers of agents | 3 tiers of operating structure |
| Knowledge | Bound to personas | Structured packs, composable |
| Workflow | 7-phase pipeline | 7-beat rhythm |
| Coordination | Director gates | active.md |
| Memory | Session state file | active.md + ADRs + events |
| Loading | All agents always available | Packs loaded on demand |
| Auto-triggers | N/A | Path-based recommendations |
| Escalation | Escalate up hierarchy | Criteria-based ladder |
