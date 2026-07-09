---
domain: art
tags: [visual, style, hierarchy]
triggers: [design/art/**, assets/**, src/ui/**]
related: [pixijs/ui-code-standards, qa-testing/accessibility]
---

# Visual Identity

Visual direction needs a maintained art bible that defines style, palette, material language, lighting, hierarchy, and asset specifications.

## Patterns

- Keep an art bible as the visual source of truth.
- Define what colors mean and how palette shifts communicate state.
- Use visual hierarchy so important gameplay information is immediately prominent.
- Specify asset resolution, format, naming convention, color profile, and budget per asset category.
- Name assets as `[category]_[name]_[variant]_[size].[ext]`.
- Review visual assets and UI mockups against the art bible with specific corrective guidance.

## Anti-patterns

- Asset style decisions scattered across implementation files.
- Color palettes that communicate state inconsistently.
- Visual polish that harms readability or accessibility.
- Asset naming that omits category, variant, or size.

## References

- `.opencode/agents/art-director.md`
- `.opencode/agents/technical-artist.md`
