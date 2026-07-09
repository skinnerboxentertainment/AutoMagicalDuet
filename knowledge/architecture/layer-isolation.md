---
domain: architecture
tags: [layering, boundaries, dependencies]
triggers: [src/core/**, src/gameplay/**, src/ui/**, src/scenes/**]
related: [architecture/state-ownership, architecture/engine-code-standards]
---

# Layer Isolation

Code dependencies must point inward toward stable core services. Core engine code cannot import gameplay, scenes, or UI; gameplay must not import UI; UI must not reach into gameplay internals.

## Patterns

- Keep `src/core/` limited to generic systems such as scene management, input, lifecycle, graph registry, timing, and resource helpers.
- Let gameplay depend on core abstractions and input state, not on UI widgets or scene containers.
- Let UI consume view models, events, callbacks, or read-only state projections instead of mutating gameplay objects directly.
- Define narrow interfaces when systems need to collaborate across layer boundaries.
- Escalate architectural changes when a feature requires reversing dependency direction.

## Anti-patterns

- `src/core/**` importing `src/gameplay/**`, `src/scenes/**`, or `src/ui/**`.
- Gameplay classes directly constructing HUD elements.
- UI controls mutating arbitrary gameplay fields.
- Shared singletons for game state that every layer imports.

## References

- `.opencode/skills/automagically-game-architecture/SKILL.md`
- `.opencode/docs/ts-reference/module-architecture.md`
- `.opencode/agents/technical-director.md`
