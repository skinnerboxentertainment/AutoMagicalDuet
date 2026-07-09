---
domain: workflow
tags: [prototype, spike, learning]
triggers: [prototypes/**]
related: [workflow/design-doc-standards, workflow/scope-management]
---

# Prototype Standards

Prototype code is disposable. Its durable output is evidence about a falsifiable hypothesis.

## Patterns

- Put each prototype in `prototypes/[name]/` or a mode-specific prototype directory.
- State the hypothesis, riskiest assumption, run instructions, status, findings, and recommendation.
- Use HTML prototypes for logic-heavy or turn-based ideas; engine prototypes for action feel; paper prototypes for rules and economy questions.
- Keep scope to one mechanic, technical question, or validation loop.
- Preserve findings and rewrite production implementation from scratch.

## Anti-patterns

- Production code importing from `prototypes/`.
- Prototype code gradually becoming production through cleanup.
- Polishing menus, audio, or progression when they are unrelated to the hypothesis.
- Continuing past a timebox without reframing the question.

## References

- `.opencode/rules/prototype-code.md`
- `.opencode/agents/prototyper.md`
