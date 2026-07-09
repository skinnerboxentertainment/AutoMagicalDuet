---
domain: workflow
tags: [adr, decisions, governance]
triggers: [docs/architecture/adr/**, design/**, production/**]
related: [workflow/collaboration-protocol, architecture/layer-isolation]
---

# Decision Records

Irreversible, architecture-shaping, or identity-shaping decisions should be recorded with context, chosen direction, consequences, alternatives, and validation criteria.

## Patterns

- Use ADRs for architecture decisions and equivalent decision docs for creative or production calls.
- Include title, status, context, decision, consequences, implications, and alternatives considered.
- Explain why rejected alternatives were rejected.
- Add validation criteria so the team knows whether the decision worked.
- Cascade accepted decisions to affected docs, systems, and owners.

## Anti-patterns

- Major decisions living only in chat history.
- ADRs that describe an implementation but not the problem or alternatives.
- Accepted decisions with no status or supersession path.
- Silent deviations from an accepted ADR.

## References

- `.opencode/agents/technical-director.md`
- `.opencode/agents/creative-director.md`
- `docs/architecture/adr/`
