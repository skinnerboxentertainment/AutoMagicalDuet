---
domain: workflow
tags: [tools, automation, pipeline]
triggers: [tools/**, scripts/**]
related: [workflow/verification-gate, pixijs/asset-loading]
---

# Tooling Standards

Internal tools are production surfaces for the team. They need validation, clear errors, documentation, and failure behavior that preserves data.

## Patterns

- Validate inputs and produce actionable error messages.
- Make operations undoable where possible.
- Use atomic writes or backups so failures do not corrupt source data.
- Test tools against representative data sets.
- Document usage and examples for every tool.
- Avoid duplicating built-in engine or platform functionality.

## Anti-patterns

- Tools that silently skip malformed data.
- Partial writes that corrupt content on failure.
- Undocumented scripts that only the author knows how to run.
- Tools designed without consulting their content-author users.

## References

- `.opencode/agents/tools-programmer.md`
- `.opencode/skills/automagically-assets-and-build/SKILL.md`
