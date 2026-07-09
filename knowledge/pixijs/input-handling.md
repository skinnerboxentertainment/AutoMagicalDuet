---
domain: pixijs
tags: [input, events, hitarea]
triggers: [src/input/**, src/ui/**, src/scenes/**]
related: [architecture/update-loop, qa-testing/browser-smoke-tests]
---

# Input Handling

Capture input centrally once per frame, then let scenes and UI read stable input state. PixiJS pointer events are useful for interactive display objects, but DOM listener ownership should remain centralized.

## Patterns

- Use a single `InputManager` for keyboard, pointer, touch, and gamepad state.
- Call `InputManager.update()` before scene updates.
- Clear or reset input state on pause, blur, and scene transitions.
- Set explicit `hitArea` on interactive PixiJS UI containers.
- Support keyboard/mouse and gamepad for all interactive UI.

## Anti-patterns

- Scenes registering their own DOM event listeners.
- Reading raw browser events from gameplay logic.
- Interactive containers without bounded hit areas.
- Required simultaneous button presses without accessible alternatives.

## References

- `.opencode/skills/automagically-game-architecture/SKILL.md`
- `.opencode/rules/ui-code.md`
- `.opencode/agents/ux-designer.md`
