---
domain: genre
tags: [shmup, projectiles, waves]
triggers: [design/gdd/**, src/gameplay/**, assets/data/waves.json]
related: [game-design/core-loops, qa-testing/testing-pyramid]
---

# SHMUP Pattern

A shoot-em-up centers on 8-direction movement, projectile timing, enemy waves, collision readability, and score pressure.

## Patterns

- Use screen-locked or upward auto-scrolling space.
- Model player states as active, invincible, and dead.
- Use a firing cooldown and explicit projectile speed.
- Generate enemy waves with count, HP, pattern, spawn interval, and boss phase data.
- Use circle collision for player, bullets, enemies, and boss shapes when visuals are roughly circular.
- Test projectile movement, wave timing, collision damage, power-up effects, wave completion, and boss spawn.

## Anti-patterns

- Projectile creation without pooling once fire rate becomes high.
- Enemy wave data embedded in scene code.
- Collision radii that do not match visual readability.
- Power-up duration controlled by real clock instead of game delta or testable timing.

## References

- `.opencode/templates/genre-patterns/shmup.md`
