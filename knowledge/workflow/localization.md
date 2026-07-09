---
domain: workflow
tags: [localization, i18n, strings]
triggers: [src/ui/**, locales/**, assets/ui/fonts/**]
related: [pixijs/ui-code-standards, qa-testing/accessibility]
---

# Localization

Player-facing text must flow through a localization system with context, fallback, and layout testing. UI code should never hardcode production strings.

## Patterns

- Store text in structured locale files, one language per system or feature area.
- Use hierarchical dot-notation keys such as `menu.settings.audio.volume_label`.
- Define fallback chains so missing regional strings degrade gracefully.
- Use ICU MessageFormat or equivalent for pluralization and parameters.
- Include context comments with location, character limits, and variables.
- Test with pseudolocalization and longer translated text.
- Maintain a glossary for game-specific terms.

## Anti-patterns

- Raw user-facing strings in UI source.
- Displaying missing localization keys to players.
- Fixed-width UI that cannot handle 30-40% text expansion.
- Adding a language without confirming font glyph coverage.

## References

- `.opencode/agents/localization-lead.md`
- `.opencode/rules/ui-code.md`
