---
domain: qa-testing
tags: [evidence, gates, done]
triggers: [production/qa/**, tests/**, design/gdd/**]
related: [qa-testing/test-standards, workflow/verification-gate]
---

# Evidence Gates

Testing evidence is part of Definition of Done. Logic and integration stories are blockers when evidence is missing; visual, UI, and config stories may use documented manual evidence.

## Patterns

- Classify each story as logic, integration, visual/feel, UI, or config/data.
- Require automated unit tests for logic stories.
- Require integration tests or documented playtests for multi-system stories.
- Store visual/feel evidence as screenshots plus lead sign-off in `production/qa/evidence/`.
- Use manual walkthroughs or interaction tests for UI work.
- Require smoke check evidence for config and data changes.

## Anti-patterns

- Marking logic stories complete without tests.
- Treating "manual looked fine" as evidence for formula or state-machine logic.
- Running full-game regression for every small bug fix instead of targeted regression.
- Skipping smoke checks before manual QA handoff.

## References

- `.opencode/agents/qa-lead.md`
- `.opencode/agents/qa-tester.md`
