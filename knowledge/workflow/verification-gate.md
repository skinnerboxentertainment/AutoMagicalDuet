---
domain: workflow
tags: [verification, typescript, tests]
triggers: [src/**, tests/**, assets/**]
related: [qa-testing/evidence-gates, qa-testing/test-standards]
---

# Verification Gate

Before marking work complete, run verification that matches the changed surface. TypeScript and tests are baseline checks.

## Patterns

- Run `npx tsc --noEmit` and require zero TypeScript errors.
- Run `npx vitest run` and require all tests to pass.
- Preserve all pre-existing passing tests.
- Add scope checks for gameplay state ownership, audio interface compliance, scene lifecycle, and PixiJS v8 asset loading.
- If verification fails, fix the underlying issue and rerun up to three attempts.
- Report `PASS WITH NOTES` only when remaining failures are documented with blocker/warning status.

## Anti-patterns

- Proceeding silently after failed verification.
- Treating new passing tests as acceptable if old tests regressed.
- Running only the narrow test for the touched file when shared behavior changed.

## References

- `.opencode/rules/verification-gate.md`
- `.opencode/agents/qa-lead.md`
