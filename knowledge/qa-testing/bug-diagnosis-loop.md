---
domain: qa-testing
tags: [debugging, regression, instrumentation]
triggers: [src/**, tests/**, production/events.md]
related: [qa-testing/test-standards, qa-testing/evidence-gates, workflow/verification-gate]
---

# Bug Diagnosis Loop

Hard bugs start with a tight feedback loop. Do not build theories until there is a command that can reproduce the user's exact symptom and later prove it fixed.

## Patterns

- Build a red-capable loop first: failing test, curl script, CLI fixture, browser script, trace replay, throwaway harness, fuzz loop, bisection harness, differential loop, or structured human-in-the-loop script.
- Tighten the loop until it is fast, deterministic, specific to the symptom, and agent-runnable.
- For nondeterministic bugs, raise the reproduction rate with repetition, parallel runs, stress, narrowed timing windows, or injected sleeps.
- Reproduce the failure several times and confirm it matches the user's reported symptom, not a nearby failure.
- Minimize one factor at a time until every remaining input, caller, config value, data file, and step is load-bearing.
- Generate three to five ranked hypotheses before testing. Each hypothesis must predict what change will make the bug disappear, move, or worsen.
- Instrument one variable at a time. Prefer debugger or REPL inspection, then targeted logs at hypothesis boundaries.
- Tag temporary debug logs with a unique prefix such as `[DEBUG-a4f2]` so cleanup is grep-able.
- For performance regressions, establish a baseline measurement before changing code.
- Convert the minimized repro into a regression test at the seam that exercises the real bug pattern, then rerun the original loop after the fix.
- Before declaring done, remove debug instrumentation, delete throwaway harnesses, and record the hypothesis that proved correct.

## Anti-patterns

- Reading code to form a theory before a red-capable loop exists.
- Accepting "does not crash" as a signal when the bug is a specific wrong result, visual artifact, or timing failure.
- Minimizing several factors at once and losing which element mattered.
- Logging everything and searching afterward.
- Writing a regression test at a seam too shallow to reproduce the real call pattern.
- Leaving temporary debug logs or harnesses in normal production paths.

## References

- `.agents/skills/diagnosing-bugs/SKILL.md`
- `knowledge/qa-testing/test-standards.md`
