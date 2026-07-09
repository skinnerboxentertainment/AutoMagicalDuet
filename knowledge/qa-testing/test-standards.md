---
domain: qa-testing
tags: [standards, regression, vitest]
triggers: [tests/**]
related: [qa-testing/testing-pyramid, qa-testing/evidence-gates]
---

# Test Standards

Tests must be deterministic, readable, and tied to the behavior they protect. Every bug fix needs a regression test that would have caught the original failure.

## Patterns

- Name tests with `test_[system]_[scenario]_[expected_result]`.
- Structure every test as arrange, act, assert.
- Define test data inside the test or dedicated fixtures.
- Mock external dependencies.
- Give performance tests explicit thresholds that fail when exceeded.
- For formulas, test normal, zero/null, maximum, negative modifier, and documented edge cases.

## Anti-patterns

- Imprecise assertions such as "less than current value" when an exact result is required.
- Shared mutable test state.
- Integration tests without cleanup.
- Accepting subjective criteria such as "feels snappy" without binary pass criteria.

## References

- `.opencode/rules/test-standards.md`
- `.opencode/agents/qa-tester.md`
