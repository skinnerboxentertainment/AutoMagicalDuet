---
domain: qa-testing
tags: [accessibility, wcag, input]
triggers: [src/ui/**, src/input/**, production/qa/accessibility/**]
related: [pixijs/ui-code-standards, workflow/localization]
---

# Accessibility

Accessibility requirements apply to UI, input, audio, visual communication, and cognitive load. WCAG 2.1 Level AA is the default target for UI findings.

## Patterns

- Use minimum text size of 18px at 1080p and support scaling up to 200%.
- Maintain at least 4.5:1 text contrast and 3:1 UI element contrast.
- Never encode information through color alone; pair color with shape, icon, label, or pattern.
- Support remapping for keyboard, mouse, and gamepad.
- Provide subtitle support for dialogue and story-critical audio.
- Offer separate volume sliders for master, music, SFX, dialogue, and UI.
- Cite WCAG success criteria in accessibility audit findings.

## Anti-patterns

- Required simultaneous inputs without toggle or alternative.
- QTEs with no skip or auto-complete option.
- Flashing or motion-sensitive content without mitigation.
- Raw color-only status indicators.
- UI unreachable by keyboard or gamepad navigation.

## References

- `.opencode/agents/accessibility-specialist.md`
- `.opencode/agents/ux-designer.md`
