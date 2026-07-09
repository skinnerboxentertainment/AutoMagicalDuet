---
domain: architecture
tags: [ai, behavior, debugging]
triggers: [src/ai/**, src/gameplay/**]
related: [game-design/flow-design, qa-testing/performance-budgets]
---

# AI Code Standards

Game AI should be data-driven, debuggable, readable to players, and bounded by a strict frame budget.

## Patterns

- Prefer behavior trees, utility systems, or explicit state machines over hardcoded if/else chains.
- Keep AI update work within a 2ms per-frame budget and profile to verify.
- Load perception ranges, weights, timers, formations, and role assignments from data.
- Telegraph AI intentions so players can learn and react.
- Log AI state transitions for debugging.
- Provide visualization hooks for paths, perception cones, decision trees, and current goals.
- Validate networked AI inputs and commands server-side.

## Anti-patterns

- Perfectly optimal AI that is unreadable or unfair to play against.
- Hidden AI parameters embedded in code.
- Group behavior that ignores formation, flanking, or role data.
- Networked AI accepting client-provided state as trusted.

## References

- `.opencode/rules/ai-code.md`
- `.opencode/agents/ai-programmer.md`
