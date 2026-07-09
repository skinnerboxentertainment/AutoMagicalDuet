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
- Pick the branch from the question: logic or state-model questions get a tiny interactive terminal app; UI questions get several variations switchable from one route.
- Use HTML prototypes for logic-heavy or turn-based ideas; engine prototypes for action feel; paper prototypes for rules and economy questions.
- Provide one command that starts the prototype through the project's existing task runner.
- Keep prototype state in memory by default. Add scratch persistence only when persistence is the hypothesis.
- Surface the relevant state after each logic action or UI variant switch so the learning is visible.
- Keep scope to one mechanic, technical question, or validation loop.
- Preserve findings and rewrite production implementation from scratch, or explicitly absorb the validated decision into production and delete the throwaway artifact.

## Anti-patterns

- Production code importing from `prototypes/`.
- Prototype code gradually becoming production through cleanup.
- Polishing menus, audio, or progression when they are unrelated to the hypothesis.
- Leaving a completed prototype in the repo without deletion, absorption, or a durable finding.
- Continuing past a timebox without reframing the question.

## References

- `.opencode/rules/prototype-code.md`
- `.opencode/agents/prototyper.md`
- `.agents/skills/prototype/SKILL.md`
