---
domain: architecture
tags: [scenes, lifecycle, cleanup]
triggers: [src/scenes/**, src/core/scene*.*, src/main.ts]
related: [pixijs/scene-management, architecture/resource-cleanup]
---

# Scene Lifecycle

Scenes are stack-managed runtime units with deterministic entry, update, and exit behavior. A scene owns its display objects and transient subscriptions, but not the PixiJS application or global input service.

## Patterns

- Use `enter()` to create containers, add display objects, subscribe to input-facing signals, and start scene music.
- Use `update(dt)` for one frame of scene behavior.
- Use `exit()` to remove display objects, destroy children, unsubscribe listeners, and stop scene-owned audio.
- Support stack operations: `push` pauses the current scene, `pop` destroys the top scene and resumes the previous one, `replace` destroys the current scene and starts another.
- Keep the `Application`, renderer, ticker, and `InputManager` at app/core level.

## Anti-patterns

- Creating `new Application()` inside a scene.
- Leaving display objects attached after scene exit.
- Letting scene transitions rely on ad hoc booleans instead of explicit stack operations.
- Registering DOM event listeners per scene.

## References

- `.opencode/skills/automagically-game-architecture/SKILL.md`
- `.opencode/agents/engine-programmer.md`
