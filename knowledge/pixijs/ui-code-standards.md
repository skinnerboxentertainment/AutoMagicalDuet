---
domain: pixijs
tags: [ui, accessibility, localization]
triggers: [src/ui/**]
related: [qa-testing/accessibility, workflow/localization]
---

# UI Code Standards

UI displays state and requests changes through commands or events. It must not own gameplay state or block the game thread.

## Patterns

- Build HUD and in-game indicators with PixiJS `Container` hierarchy.
- Use DOM overlays only for menus, settings, and complex screens where DOM ergonomics matter.
- Route all player-facing text through localization keys.
- Support keyboard, mouse, and gamepad navigation.
- Make animations skippable and respect motion/accessibility preferences.
- Test screens at minimum and maximum supported resolutions.

## Anti-patterns

- Hardcoded user-facing strings.
- UI elements directly mutating gameplay objects.
- UI sounds triggered by direct audio object access instead of the audio event/manager path.
- Interactive UI containers without explicit `hitArea`.

## References

- `.opencode/rules/ui-code.md`
- `.opencode/agents/ui-programmer.md`
