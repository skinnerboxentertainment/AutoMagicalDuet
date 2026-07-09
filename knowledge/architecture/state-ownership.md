---
domain: architecture
tags: [state, rendering, save-load]
triggers: [src/gameplay/**, src/scenes/**, src/core/**]
related: [pixijs/scene-management, architecture/layer-isolation]
---

# State Ownership

Game simulation state belongs in plain TypeScript classes or serializable records. PixiJS display objects mirror state during render sync; they do not own gameplay facts.

## Patterns

- Store health, position, inventory, timers, flags, and progression on plain state objects.
- Sync state into `Sprite`, `Container`, `Text`, or `Graphics` during scene update or render sync.
- Give persistent state `toJSON()` and `fromJSON()` methods when save/load is required.
- Serialize saves as JSON into `localStorage` by default.
- Skip binary save formats and schema migrations until a project has real breaking save changes.
- Keep renderer-facing objects disposable. A scene can destroy and recreate visuals without losing simulation state.
- Use plain classes and composition for entities and systems. Do not start with ECS unless cross-cutting data-driven entities make composition painful.
- Use branded IDs, discriminated unions, or typed records for domain entities instead of anonymous strings.

## Anti-patterns

- Adding properties such as `sprite.health`, `container.playerData`, or `text.scoreValue`.
- Treating PixiJS display object lifetime as gameplay lifetime.
- Saving by walking the scene graph.
- Starting with ECS by default for a solo or small-team game before plain composition has failed.
- Requiring PixiJS in unit tests for core gameplay logic.

## References

- `.opencode/skills/automagically-game-architecture/SKILL.md`
- `.opencode/agents/lead-programmer.md`
- `.opencode/rules/gameplay-code.md`
