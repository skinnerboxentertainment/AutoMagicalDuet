---
domain: workflow
tags: [scope, planning, risk]
triggers: [production/**, design/**]
related: [workflow/collaboration-protocol, workflow/release-pipeline]
---

# Scope Management

Production planning should break work into small, owned tasks with explicit dependencies, acceptance criteria, risk, and buffer.

## Patterns

- Keep sprint tasks sized for 1-3 days.
- Assign each task to one owner.
- List dependencies explicitly.
- Reserve roughly 20% sprint capacity for unplanned work and bugs.
- Identify critical path tasks.
- Maintain a risk register with probability, impact, owner, and mitigation.
- Flag milestone risk at least two sprints before delivery.

## Anti-patterns

- Multi-owner tasks with unclear accountability.
- Hidden dependencies discovered during implementation.
- Scope changes without documented trade-offs.
- Removing QA or verification to preserve schedule.

## References

- `.opencode/agents/producer.md`
- `.opencode/agents/qa-lead.md`
