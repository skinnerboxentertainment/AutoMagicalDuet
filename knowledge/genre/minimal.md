---
domain: genre
tags: [minimal, fallback, scaffold]
triggers: [design/gdd/**, src/gameplay/**]
related: [genre/top-down, qa-testing/browser-smoke-tests]
---

# Minimal Pattern

The minimal pattern is a fallback scaffold when a requested genre is unknown. It guarantees a playable canvas with a movable character and a tiny test surface.

## Patterns

- Provide a viewport-sized canvas with a solid background.
- Implement 4-direction player movement with delta-scaled speed.
- Avoid health, physics, gravity, obstacles, scrolling, and audio.
- Generate only the essential player logic and a unit test for move-and-stop behavior.
- Use browser smoke testing to verify canvas render and input response.

## Anti-patterns

- Expanding fallback into an unrequested genre.
- Adding audio, progression, or combat to the minimal scaffold.
- Failing auto-build because genre recognition was uncertain.

## References

- `.opencode/templates/genre-patterns/minimal.md`
