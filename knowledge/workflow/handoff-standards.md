---
domain: workflow
tags: [handoff, context, continuity]
triggers: [production/**, docs/**, .agents/skills/handoff/**]
related: [workflow/available-skills, workflow/collaboration-protocol, workflow/decision-records]
---

# Handoff Standards

A handoff should let a fresh agent resume the work without duplicating durable artifacts or leaking sensitive information.

## Patterns

- Save handoff documents in the user's OS temporary directory, not the workspace.
- Tailor the document to the next-session focus when the user provides one.
- Include current goal, relevant state, decisions made, open questions, blockers, next actions, verification status, and suggested skills.
- Reference durable artifacts by path or URL instead of copying their contents: PRDs, plans, ADRs, issues, commits, diffs, reports, and generated files.
- Redact secrets, credentials, tokens, API keys, passwords, and personally identifiable information.
- Keep the handoff concise enough that the next agent can scan it before acting.

## Anti-patterns

- Writing handoff files into the repo when they are not project artifacts.
- Repeating long design docs, diffs, or issue text that already exists elsewhere.
- Omitting suggested skills when the next step depends on specialized workflow.
- Preserving sensitive chat details or environment values verbatim.

## References

- `.agents/skills/handoff/SKILL.md`
- `knowledge/workflow/available-skills.md`
