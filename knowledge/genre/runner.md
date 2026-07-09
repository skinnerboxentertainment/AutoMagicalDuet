---
domain: genre
tags: [runner, procedural, obstacles]
triggers: [design/gdd/**, src/gameplay/**, assets/data/difficulty.json]
related: [game-design/flow-design, qa-testing/testing-pyramid]
---

# Runner Pattern

An endless runner depends on auto-movement, jump/duck readability, procedural obstacle safety rules, and distance-based pacing.

## Patterns

- Keep player horizontally auto-running and camera fixed around a stable screen position.
- Use gravity, ground checks, jump velocity, variable jump height, and duck hitbox changes.
- Increase speed and obstacle density over time within capped ranges.
- Enforce safe zones and obstacle sequence rules so procedural output stays fair.
- Spawn high obstacles only when the player can reasonably duck, and avoid high obstacles immediately after gaps.
- Test jump arc, duck hitbox, obstacle collision, coin overlap, spawn spacing, and safe-zone enforcement.

## Anti-patterns

- Random obstacle placement without recovery space.
- Two identical high-pressure obstacle types in a row when the rules forbid it.
- Camera Y movement that reduces jump readability.
- Difficulty curves hardcoded in gameplay code.

## References

- `.opencode/templates/genre-patterns/runner.md`
