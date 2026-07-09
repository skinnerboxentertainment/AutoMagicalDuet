---
domain: game-design
tags: [spec, sub-shooter, mvp, side-scroller, underwater]
triggers: [src/scenes/game-scene.ts, src/gameplay/player.ts, src/gameplay/enemy.ts, assets/data/gameplay-config.json]
related: [game-design/core-loops, game-design/flow-design, pixijs/input-handling, qa-testing/test-standards]
---

# Sub Shooter — Game Design Spec

**Genre:** 2D side-scrolling underwater arcade
**Status:** Built and playable

## Core Fantasy

Pilot a nimble submarine through a hostile underwater corridor, shooting threats, slipping through mine fields, grabbing treasure, and managing fuel pressure long enough to push your score higher.

## Core Loop

1. Move submarine in 4 directions inside the playfield
2. Hold or tap Space to fire forward torpedoes
3. Shoot patrol fish and mines before they reach you
4. Dodge hazards and collect treasure/fuel
5. Survive until 3 hull hits or fuel starvation destroys the sub
6. Restart quickly and chase a higher score

## Design Decisions

- **Forward-only torpedoes** — keeps the attack vector clean and readable
- **Fuel as pressure, not a second life** — empty fuel causes periodic hull damage, not instant death
- **No surfacing mechanic in MVP** — surface is visual only
- **Crisp inertia** — acceleration/drag tuned so movement feels weighty but responsive (~0.2s to max speed)
- **Spawn fairness** — active caps per entity type, no overlapping hazards, damage grace period

## View Full Spec

The complete design document is at `design/mvp-sub-shooter.md`. It includes:

- Full config with 33 tuning values and defaults
- Enemy behavior details (patrol fish with sine wobble, mines as area denial)
- Spawn director rules (Y bounds, active caps, difficulty ramp, fairness rules)
- HUD layout (score, HP pips, fuel bar with low warning)
- Scene flow (Title → Game → Game Over)
- Audio spec (4 procedural SFX via jsfxr)
- Acceptance criteria (17 items)

## What's Deferred

- Surfacing to refuel
- Upward/angled torpedoes
- Background music
- Additional enemy types
- Pause screen
- Cargo hold system
