---
domain: genre
tags: [top-down, movement, tiles]
triggers: [design/gdd/**, src/gameplay/**, assets/data/level*.json]
related: [game-design/level-pacing, pixijs/scene-management]
---

# Top-Down Pattern

A top-down game uses 4- or 8-direction movement, tile-based world constraints, pickups, enemy zones, and a camera clamped to map bounds.

## Patterns

- Use per-axis AABB resolution against impassable tiles.
- Keep the camera centered on the player and clamped inside map bounds.
- Store levels as tile arrays plus spawn metadata.
- Give enemies aggro range and patrol behavior.
- Use invincibility frames and visual blink after damage.
- Test movement directions, patrol boundaries, item overlap, damage invincibility, spawn activation, and health pickup behavior.

## Anti-patterns

- Letting the camera show outside the tile grid.
- Enemies colliding with walls unless pathfinding or steering is explicitly designed.
- Collectibles placed where walls or water make them unreachable.
- Tile meanings defined only in code instead of data schema.

## References

- `.opencode/templates/genre-patterns/top-down.md`
