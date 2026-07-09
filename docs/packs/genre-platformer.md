---
name: genre-platformer
when: "Side-scrolling platformer projects or features involving gravity movement, jumping, tile collisions, collectibles, enemies, scrolling cameras, or level exits."
triggers: "Touching src/gameplay/player*, enemy, collectible, score, level loading, platformer level JSON, camera follow logic, or platformer acceptance tests."
---

# Genre Platformer Pack

## When to use

Use this pack for browser platformers with horizontal movement, gravity, jump arcs, enemies, collectibles, scrolling levels, tile collision, and an exit objective.

It provides default values for an initial playable build. Treat values as starting points unless a project GDD or tuning file overrides them.

## Constraints

- Store levels in `assets/data/level-01.json`.
- Store gameplay tuning in `assets/data/gameplay-config.json`; do not hardcode speed, gravity, health, jump velocity, or timing values.
- Keep the initial build simple: tile-based AABB collision is acceptable at 60fps or lower.
- Use per-axis collision resolution: X axis first, then Y axis.
- Avoid a standalone collision system in the first pass unless the project explicitly needs it.
- Camera must stay inside level bounds.
- Player state must be explicit enough for animation, damage, death, and tests.
- All win, damage, collection, and stomp conditions need binary pass/fail acceptance criteria.

## Patterns

- **Player movement defaults**: horizontal speed 250 px/s, gravity 980 px/s^2, jump velocity -500 px/s.
- **Variable jump**: holding jump extends ascent; releasing jump cuts upward velocity by 40%.
- **Player shape**: 24x40 px rectangle or placeholder circle, commonly colored `0x00aaff`.
- **Player states**: idle, running, jumping, falling, dead.
- **Health model**: 3 hits with 1.5 seconds of invincibility after damage.
- **Tile defaults**: 32x32 px tiles, air `0`, ground `1`, platform `2`, spike `3`.
- **Level dimensions**: 40-80 tiles wide, 15 tiles high, ground on bottom row `y=14`.
- **Gap pacing**: gaps every 10-15 tiles, usually 1-2 tiles wide.
- **Platform placement**: platforms at `y=8` to `y=12`, 3-8 tiles wide, especially above gaps and open areas.
- **Camera follow**: horizontal follow with a deadzone around 25% from the left edge; vertical camera remains locked to tile bounds.
- **Collectibles**: 15-25 coins or gems per level, 16x16 px, bobbing animation, +100 score on overlap.
- **Enemies**: 3-7 patrol enemies per level, horizontal patrol bounds 4-8 tiles apart.
- **Stomp rule**: player is falling and the player bottom is within 16 px of enemy top.
- **Exit rule**: exit flag on the last ground tile at the right edge; overlap triggers level clear.
- **Audio stubs**: jump, collect, hit, and death events should be hookable even before final audio exists.

## Anti-patterns

- Hardcoding platformer constants in `src/**`.
- Letting the camera scroll past the authored level.
- Using vague collision responses such as "push player out somehow" without axis order and solid tile rules.
- Making enemies collide with full tile physics in the first build unless required by the design.
- Placing collectibles only on the critical path; use them to reward jumps, platforms, and risk.
- Making gaps or enemies appear before the player has safely learned movement and jump timing.
- Adding advanced movement before the core jump arc, landing, damage, death, and clear flow are testable.

## Checklist

- Player moves left/right with A/D or arrow keys.
- Player jumps with Space, W, or Up.
- Jump height varies on hold/release.
- Idle, running, jumping, falling, and dead states are reachable.
- Gravity, speed, jump velocity, health, iframe duration, and score values are in config data.
- Player collides with solid ground and platforms via per-axis AABB.
- Level loads from JSON tile and spawn data.
- Collectibles overlap, animate, disappear or mark collected, and add score.
- Enemy patrols between configured bounds.
- Enemy damages player on side/body overlap.
- Stomp defeats enemy only when falling and near enemy top.
- Invincibility frames prevent repeated immediate damage.
- Death and respawn or fail state are defined.
- Exit overlap triggers `LEVEL CLEAR` or equivalent state.
- Camera follows horizontally and clamps to level bounds.
- Unit tests cover jump arc, patrol bounds, collection, damage, iframes, and stomp logic.
- Integration or browser check confirms scene load, render, movement, jump, and level clear.

## References

- Template source: `.opencode/templates/genre-patterns/platformer.md`.
- Suggested files: `src/gameplay/player.ts`, `src/gameplay/player-state.ts`, `src/gameplay/enemy.ts`, `src/gameplay/collectible.ts`, `src/gameplay/score-manager.ts`.
- Suggested tests: `tests/unit/gameplay/player.test.ts`, `tests/unit/gameplay/enemy.test.ts`, `tests/unit/gameplay/collectible.test.ts`.
- Data files: `assets/data/level-01.json`, `assets/data/gameplay-config.json`.

## Escalation

- Pull in `game-design-pack` when platformer mechanics affect pillars, progression, level pacing, rewards, or player fantasy.
- Pull in `pixijs-rendering-pack` when implementing sprites, graphics, camera containers, parallax, particles, or canvas input.
- Pull in `qa-testing-pack` before marking movement, collision, enemy, collectible, or clear-flow stories done.
- Escalate to architecture when collision, level streaming, entity systems, or camera design needs to become reusable infrastructure.
