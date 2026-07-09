---
domain: architecture
tags: [ticker, timing, deterministic]
triggers: [src/main.ts, src/core/**, src/gameplay/**]
related: [pixijs/rendering-pipeline, qa-testing/performance-budgets]
---

# Update Loop

Use the PixiJS ticker as the single game loop. Start with variable delta time, and introduce fixed-step accumulation only when deterministic physics, rollback, or replay requires it.

## Patterns

- Register one top-level ticker callback that updates input, active scenes, audio state, and diagnostics in a stable order.
- Treat PixiJS v8 `ticker.deltaTime` as a frame-scaled value where `1.0` represents one frame at the target frame rate.
- Multiply movement, animation timers, cooldowns, and simulation rates by delta time.
- Keep hot paths allocation-free by reusing arrays, points, rectangles, and query buffers.
- Document when a subsystem needs fixed-step behavior and isolate the accumulator behind core timing code.

## Anti-patterns

- `setInterval` or `setTimeout` for gameplay logic.
- Per-object ticker registrations that make update order implicit.
- Frame-dependent movement such as `x += speed` without delta.
- Allocating temporary collections in every update frame.

## References

- `.opencode/skills/automagically-game-architecture/SKILL.md`
- `.opencode/rules/gameplay-code.md`
- `.opencode/rules/engine-code.md`
