---
domain: qa-testing
tags: [tdd, tracer-bullets, public-interfaces]
triggers: [tests/**, src/**]
related: [qa-testing/test-standards, qa-testing/testing-pyramid, architecture/deep-module-review]
---

# TDD Tracer Bullets

Test-driven work should advance in vertical tracer bullets: one observable behavior, one failing test, one minimal implementation, then repeat.

## Patterns

- Test behavior through public interfaces, not private methods, internal collaborators, or incidental storage.
- Prefer integration-style tests that read like specifications and survive internal refactors.
- Before coding, identify the public interface, domain vocabulary, priority behaviors, and any ADRs that constrain the design.
- Write one test for one behavior, watch it fail, then write only enough implementation to make it pass.
- Let each cycle teach the next test; adjust the plan as the implementation reveals better seams.
- Keep tests focused on observable behavior and critical paths rather than every possible internal edge.
- Refactor only while green. After each refactor step, rerun the relevant tests.
- Per cycle, verify that the test describes behavior, uses only the public interface, survives refactor, and did not invite speculative code.

## Anti-patterns

- Horizontal slicing: writing all tests first, then all implementation later.
- Tests that assert imagined data shapes or function signatures before the behavior is understood.
- Mocking internal collaborators just to reach private implementation.
- Refactoring while red.
- Adding future-facing features before a test requires them.

## References

- `.agents/skills/tdd/SKILL.md`
- `knowledge/qa-testing/test-standards.md`
