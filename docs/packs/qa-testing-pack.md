---
name: qa-testing-pack
when: "Planning, implementing, reviewing, or releasing features that need test evidence, bug triage, regression coverage, smoke checks, performance gates, or playtest documentation."
triggers: "Touching tests/**, production/qa/**, story acceptance criteria, bug reports, release gates, performance reports, or any Logic/Integration story."
---

# QA Testing Pack

## When to use

Use this pack whenever work needs evidence that it behaves correctly: automated tests, manual walkthroughs, screenshots, smoke checks, bug reports, regression lists, performance profiling, or release readiness.

Load it early in Frame or Commit for story planning. Do not wait until a feature is already built to decide how it will be tested.

## Constraints

- Testing is part of Definition of Done.
- Logic and Integration stories are blocking without appropriate evidence.
- Visual/Feel, UI, and Config/Data evidence may be advisory, but still needs a documented route.
- Smoke checks happen before manual QA handoff.
- Acceptance criteria must be measurable. Subjective criteria require binary proxies.
- Bug reports must include severity, frequency, build, platform, reproduction steps, expected behavior, actual behavior, and context.
- Regression checks after fixes should be targeted to touched systems and downstream consumers.
- Performance analysis must profile first; do not guess at bottlenecks.
- Quality gates cannot be waived silently due to schedule pressure.

## Patterns

- **Story classification**:
  - Logic: formulas, state machines, deterministic rules. Requires automated unit tests in `tests/unit/[system]/`.
  - Integration: multi-system behavior. Requires integration test or documented playtest in `tests/integration/[system]/`.
  - Visual/Feel: animation, VFX, juice, feel. Requires screenshot plus lead sign-off in `production/qa/evidence/`.
  - UI: menus, HUD, screens. Requires manual walkthrough doc or interaction test.
  - Config/Data: balance and data files. Requires smoke check pass.
- **Shift-left QA**: review acceptance criteria before implementation, flag untestable criteria, and define evidence before build work starts.
- **Vitest naming**: use `tests/[system]/[feature].test.ts` and test names like `test_[scenario]_[expected]`.
- **Formula coverage**: normal case, zero/null input, max values, negative modifiers when applicable, and GDD edge cases.
- **Test case format**: include Precondition, Steps, Expected Result, and Pass Criteria.
- **Bug severity**:
  - S1 Critical: crash, data loss, progression blocker.
  - S2 Major: significant gameplay impact, broken feature, severe visual glitch.
  - S3 Minor: cosmetic issue, minor inconvenience, edge case.
  - S4 Trivial: polish issue, minor text error, suggestion.
- **Performance report**: record frame-time budget, per-category actuals, memory budget, top bottlenecks, and regressions since last report.
- **Release gate**: open S1 bugs block any outgoing build; S2 bugs block milestone release unless explicitly accepted by the orchestrator/user.

## Anti-patterns

- Marking a Logic or Integration story done based only on manual confidence.
- Writing tests after implementation without checking the GDD edge cases.
- Accepting "feels good", "looks nice", or "is intuitive" as pass criteria.
- Running full-game regression for every small fix.
- Skipping smoke checks because the change seems small.
- Guessing performance causes without profiling.
- Fixing bugs while writing QA reports; QA documents and routes the defect.
- Hiding release risks in summaries instead of listing blockers first.

## Checklist

- Story type is stated.
- Required evidence, output location, and gate level are stated.
- Acceptance criteria are measurable and binary.
- Automated tests cover normal and edge cases for deterministic logic.
- Integration paths cover producer/consumer systems.
- Manual walkthroughs include preconditions, exact steps, expected result, and pass criteria.
- Visual/feel evidence includes screenshot or capture path and sign-off target.
- Smoke check scenarios cover the critical path.
- Bug reports include repro steps, expected/actual, severity, frequency, build, and platform.
- Regression checklist is scoped to the fix and downstream systems.
- Performance-sensitive work has budgets, measurements, and top bottlenecks.
- Release readiness includes open bug list and gate status.

## References

- Source agents: `.opencode/agents/qa-lead.md`, `qa-tester.md`, `performance-analyst.md`.
- Test paths: `tests/unit/**`, `tests/integration/**`, `tests/smoke/**`.
- Evidence paths: `production/qa/evidence/`, `production/qa/smoke-[date].md`.
- Performance report format from `.opencode/agents/performance-analyst.md`.

## Escalation

- Escalate unmeasurable acceptance criteria to the orchestrator before tests are written.
- Escalate pressure to skip blocking test evidence or smoke checks.
- Pull in `game-design-pack` when a bug implies design ambiguity or changed acceptance criteria.
- Pull in `pixijs-rendering-pack` for rendering, canvas, particles, shaders, scene graph, or browser interaction test strategy.
- Escalate S1 and disputed S2 severity decisions to the release owner or orchestrator.
