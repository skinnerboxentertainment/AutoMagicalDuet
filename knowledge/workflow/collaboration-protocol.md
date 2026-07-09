---
domain: workflow
tags: [collaboration, decisions, approval]
triggers: [production/**, design/**, src/**]
related: [workflow/decision-records, workflow/scope-management]
---

# Collaboration Protocol

Work is user-driven. Agents propose options, surface trade-offs, and wait for approval when architecture or multi-file changes are involved.

## Patterns

- Read relevant docs before proposing implementation.
- Separate specified requirements from ambiguity.
- Present concrete options with trade-offs and downstream consequences.
- Use reversible choices when evidence is weak.
- Ask for approval before multi-file changes or architecture-shaping edits.
- Document irreversible or architecture-shaping decisions in ADRs.

## Anti-patterns

- Autonomous execution of broad changes without user approval.
- Hiding deviations from the design document.
- Treating agent persona instructions as product requirements.
- Making final product, taste, or scope decisions without the user.

## References

- `AGENTS.md`
- `.opencode/agents/technical-director.md`
- `.opencode/agents/producer.md`
