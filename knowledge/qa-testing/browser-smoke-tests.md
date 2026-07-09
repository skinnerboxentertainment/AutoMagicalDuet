---
domain: qa-testing
tags: [browser, smoke, playwright]
triggers: [tests/browser/**, tests/smoke/**, src/main.ts]
related: [qa-testing/testing-pyramid, workflow/verification-gate]
---

# Browser Smoke Tests

Browser smoke tests prove that the built game boots and accepts core interaction in a real browser environment.

## Patterns

- Verify the dev server page loads and a visible canvas appears.
- Exercise one keyboard or pointer input path for the active genre.
- Check pause/resume and focus-loss handling when available.
- Keep smoke scenarios to the 10-15 highest-value critical paths.
- Run smoke checks before manual QA handoff.

## Anti-patterns

- Browser smoke tests that attempt exhaustive gameplay coverage.
- Depending on frame-perfect visual state for smoke pass/fail.
- Letting smoke tests mutate persistent local storage without cleanup.

## References

- `.opencode/skills/automagically-testing/SKILL.md`
- `.opencode/agents/qa-lead.md`
