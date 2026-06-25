---
paths:
  - src/ui/**
---

# UI Code Rules

- UI must NEVER own or directly modify game state — display only, use commands/events to request changes
- All UI text must go through the localization system — no hardcoded user-facing strings
- Support both keyboard/mouse AND gamepad input for all interactive elements
- All animations must be skippable and respect user motion/accessibility preferences
- UI sounds trigger through the audio event system, not directly
- UI must never block the game thread
- Scalable text and colorblind modes are mandatory, not optional
- Test all screens at minimum and maximum supported resolutions
- Use PixiJS Container-based hierarchy for in-game UI (HUD, damage numbers, indicators)
- DOM overlays allowed for menus, settings, and complex screens — keep consistent with canvas UI
- Never render UI elements outside the game canvas unless using a DOM overlay
- All interactive UI containers must have explicit `hitArea` set
