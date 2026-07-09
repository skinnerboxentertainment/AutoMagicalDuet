---
domain: game-design
tags: [levels, pacing, encounters]
triggers: [design/gdd/**, design/levels/**, assets/data/level*]
related: [game-design/flow-design, genre/top-down]
---

# Level Pacing

Level design should control challenge, exploration, reward, and rest as an intentional sequence. Each level needs spatial flow, encounter placement, and an intensity curve.

## Patterns

- Document critical path, optional paths, secrets, landmarks, sightlines, chokepoints, and leading elements.
- Use pacing charts to show intensity over time, including escalation and rest points.
- Specify encounters by type, composition, position, spawn timing, arena constraints, and difficulty target.
- Place optional content to reward exploration without punishing critical-path players.
- Communicate narrative beats through environment and interaction when possible.

## Anti-patterns

- Flat encounter density with no rest or escalation.
- Layouts that require UI text to compensate for unclear spatial direction.
- Secrets that feel mandatory for baseline viability.
- Difficulty parameters set locally without reference to game-wide balance targets.

## References

- `.opencode/agents/level-designer.md`
- `.opencode/templates/genre-patterns/top-down.md`
