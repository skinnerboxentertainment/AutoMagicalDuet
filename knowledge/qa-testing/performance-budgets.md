---
domain: qa-testing
tags: [performance, budgets, profiling]
triggers: [src/**, tests/performance/**, production/qa/**]
related: [pixijs/rendering-pipeline, pixijs/shader-code-standards]
---

# Performance Budgets

Performance work starts with measured budgets, not guesses. Track CPU, GPU, memory, loading, and rendering categories over time.

## Patterns

- Define frame-time budgets by category: gameplay logic, rendering, physics, AI, and audio.
- Track memory by textures, meshes, audio, game state, and UI.
- Document top bottlenecks with impact, recommendation, and expected implementation cost.
- Compare builds to detect regressions.
- Profile before and after optimizations and record measured numbers.
- Maintain visual budgets for draw calls, vertex count, texture memory, particle count, shader instructions, and overdraw.

## Anti-patterns

- Optimizing without profiling.
- Changing budgets locally instead of escalating to technical direction.
- Ignoring load-time and scene-transition regressions.
- Treating average FPS as enough without frame-time category breakdown.

## References

- `.opencode/agents/performance-analyst.md`
- `.opencode/agents/technical-artist.md`
- `.opencode/rules/engine-code.md`
