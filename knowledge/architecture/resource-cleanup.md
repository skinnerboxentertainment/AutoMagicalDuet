---
domain: architecture
tags: [cleanup, lifecycle, resources]
triggers: [src/core/**, src/scenes/**, src/audio/**, src/assets/**]
related: [architecture/scene-lifecycle, pixijs/asset-loading]
---

# Resource Cleanup

Runtime systems need deterministic cleanup. Objects that allocate renderer, audio, DOM, subscription, or asset resources must expose clear ownership and teardown behavior.

## Patterns

- Destroy scene-owned containers with children during `exit()`.
- Remove event subscriptions, timers, ticker callbacks, and DOM listeners when their owner exits.
- Stop or fade scene-owned audio during scene teardown.
- Use object pools for frequently created hot-path objects, and document pool ownership.
- For public engine APIs, document whether callers own returned resources and how to release them.

## Anti-patterns

- Relying on garbage collection to clean renderer resources.
- Keeping global arrays of active objects without removal on scene exit.
- Reusing destroyed PixiJS objects.
- Changing public cleanup contracts without migration notes.

## References

- `.opencode/agents/engine-programmer.md`
- `.opencode/rules/engine-code.md`
- `.opencode/skills/automagically-game-architecture/SKILL.md`
