---
domain: genre
tags: [puzzle, grid, matching]
triggers: [design/gdd/**, src/gameplay/**, assets/data/level*.json]
related: [game-design/balancing-methodology, qa-testing/testing-pyramid]
---

# Puzzle Pattern

A match puzzle game should treat gameplay as grid-index logic, not physics. Board generation, match detection, gravity, and scoring must be deterministic and testable.

## Patterns

- Map pointer position to grid cell with explicit coordinate math.
- Allow swaps only between orthogonally adjacent cells.
- Scan rows and columns for 3+ consecutive matching tiles.
- Collapse tiles downward after matches and spawn replacements from the top.
- Generate the initial board so no pre-existing matches exist.
- Test match detection, gravity, spawn fill, swap validation, combo scoring, and no-match board generation.

## Anti-patterns

- Pixel collision for tile matching.
- Initial boards that auto-clear before player input.
- Diagonal swaps unless explicitly designed.
- Non-deterministic board generation in unit tests.

## References

- `.opencode/templates/genre-patterns/puzzle.md`
