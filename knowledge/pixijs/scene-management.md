---
domain: pixijs
tags: [scene-graph, containers, lifecycle]
triggers: [src/scenes/**, src/core/**]
related: [architecture/scene-lifecycle, architecture/state-ownership]
---

# Scene Management

PixiJS scene graph objects should represent render hierarchy, not gameplay ownership. Use `Container` roots per scene and sync them from plain state.

## Patterns

- Give each scene a root `Container` added to `app.stage` on enter and destroyed on exit.
- Group related visuals with `Container` children so transforms, visibility, alpha, and z-ordering are local and predictable.
- Use explicit scene stack operations for push, pop, and replace.
- Keep `Application`, renderer, ticker, and input manager outside scenes.
- Use culling or lazy creation for off-screen and hidden content.

## Anti-patterns

- Creating a PixiJS `Application` inside a scene or gameplay class.
- Storing gameplay state on `Sprite`, `Container`, or `Text`.
- Leaving display objects attached when a scene exits.
- Building scene transitions through unmanaged global flags.

## References

- `.opencode/agents/pixijs-specialist.md`
- `.opencode/skills/automagically-game-architecture/SKILL.md`
