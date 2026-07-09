---
domain: workflow
tags: [skills, audit, atomization, knowledge-base]
triggers: [.agents/skills/**, .opencode/skills/**, knowledge/**]
related: [workflow/available-skills, pixijs/installed-skills]
---

# Skills Audit

Audit scope: every requested `SKILL.md` under `.agents/skills/` excluding PixiJS sub-skills, every requested `.opencode/skills/*/SKILL.md`, and the PixiJS router at `.agents/skills/pixijs/SKILL.md`.

Decision key:

- **ATOMIZE**: extract actionable reusable knowledge into new `knowledge/` chunks.
- **REFERENCE**: keep as a skill; knowledge is procedural or routed and works better there.
- **IGNORE**: low-value as knowledge or broken wrapper with little extractable content.
- **MERGE**: fold missing details into existing `knowledge/` chunks.

## Summary

| Skill | Decision | Coverage in `knowledge/` | Size estimate | Works as skill? |
|---|---|---:|---:|---|
| `.agents/skills/diagnosing-bugs` | ATOMIZE | Partial | 4 pages | Yes |
| `.agents/skills/grill-with-docs` | IGNORE | Partial workflow coverage | <1 page | No, depends on missing `/grilling` and `/domain-modeling` |
| `.agents/skills/handoff` | ATOMIZE | Minimal | <1 page | Yes, but simple |
| `.agents/skills/improve-codebase-architecture` | ATOMIZE | Partial | 2 pages | Partially; depends on missing `/codebase-design`, `/grilling`, `/domain-modeling`, `HTML-REPORT.md`, and agent tool semantics |
| `.agents/skills/playwright-best-practices` | REFERENCE | Partial project QA coverage | 5 pages in router, many more in refs | Yes if reference files exist |
| `.agents/skills/prototype` | MERGE | Partial | 1 page | Partially; depends on `LOGIC.md` and `UI.md` |
| `.agents/skills/tdd` | ATOMIZE | Partial | 2 pages | Partially; depends on referenced local files and `/codebase-design` |
| `.agents/skills/writing-great-skills` | ATOMIZE | Minimal | 3 pages | Yes as reference |
| `.opencode/skills/automagically-game-architecture` | MERGE | Strong | 3 pages | Yes |
| `.opencode/skills/automagically-testing` | MERGE | Strong | 2 pages | Yes |
| `.opencode/skills/automagically-audio` | REFERENCE | Strong | 2 pages | Yes |
| `.opencode/skills/automagically-assets-and-build` | MERGE | Strong | 2 pages | Yes |
| `.opencode/skills/typescript-patterns` | MERGE | Strong | 1 page | Partially; depends on `.opencode/docs/ts-reference/*` and optional compiler MCP |
| `.agents/skills/pixijs` | REFERENCE | Strong | 1 page | Yes, router only |

## Detailed Audit

### `.agents/skills/diagnosing-bugs/SKILL.md`

**Decision: ATOMIZE**

Actual knowledge:

- Debugging loop centered on creating a tight, red-capable feedback signal before hypothesizing.
- Ordered repro-loop construction tactics: failing tests, curl scripts, CLI fixtures, browser scripts, trace replay, throwaway harnesses, fuzz/property loops, bisection, differential loops, HITL scripts.
- Loop quality constraints: fast, deterministic, sharp symptom assertion, agent-runnable.
- Non-deterministic bug handling by increasing reproduction rate instead of demanding perfect repro.
- Reproduce and minimize discipline: shrink one factor at a time until every remaining element is load-bearing.
- Ranked falsifiable hypotheses before instrumentation.
- Instrumentation rules: one variable at a time, debugger before targeted logs, unique debug prefixes, perf baseline before fixes.
- Regression seam discipline: test at the real bug pattern, document missing seam as an architecture finding.
- Cleanup and post-mortem checklist.

Existing knowledge coverage:

- Partially covered by `knowledge/qa-testing/test-standards.md`, `knowledge/qa-testing/evidence-gates.md`, `knowledge/workflow/verification-gate.md`, and `knowledge/architecture/ai-code-standards.md`.
- Not covered in depth: tight red-capable loop, minimization, falsifiable ranked hypotheses, instrumentation cleanup, non-deterministic reproduction-rate strategy.

Atomization recommendation:

- Add `knowledge/workflow/debugging-discipline.md` or `knowledge/qa-testing/bug-diagnosis-loop.md`.
- Include the tight-loop gate, repro minimization, hypothesis format, instrumentation rules, and post-mortem checklist.

Size estimate: about 4 token-equivalent pages.

Works as a skill:

- Yes. It is self-contained enough to guide an agent end to end.
- Minor dependency on `CONTEXT.md`, ADRs, and an optional `scripts/hitl-loop.template.sh`, but the core process does not require another skill.

### `.agents/skills/grill-with-docs/SKILL.md`

**Decision: IGNORE**

Actual knowledge:

- Only says to run a `/grilling` session using `/domain-modeling`.
- Contains no independent checklist, constraints, or design-review doctrine.

Existing knowledge coverage:

- The broader collaboration idea is partially covered by `knowledge/workflow/collaboration-protocol.md` and `knowledge/workflow/decision-records.md`.
- There is no substantive content here to preserve.

Atomization recommendation:

- Do not atomize this file as-is.
- If the missing `/grilling` or `/domain-modeling` sources still exist elsewhere, audit those instead.

Size estimate: less than 1 page.

Works as a skill:

- No. It is a wrapper around missing or non-local skills and is not self-contained.

### `.agents/skills/handoff/SKILL.md`

**Decision: ATOMIZE**

Actual knowledge:

- Handoff documents go to the OS temp directory, not the workspace.
- Include suggested skills for the next agent.
- Avoid duplicating durable artifacts; reference PRDs, plans, ADRs, issues, commits, diffs by path or URL.
- Redact secrets, credentials, and PII.
- Tailor the handoff to the next-session focus when arguments are provided.

Existing knowledge coverage:

- `knowledge/workflow/available-skills.md` lists skill availability, but there is no handoff-specific chunk.
- `knowledge/workflow/collaboration-protocol.md` covers governance, not context compaction.

Atomization recommendation:

- Add `knowledge/workflow/handoff-standards.md`.
- Keep it small: purpose, location, must-include sections, artifact-reference rule, redaction rule.

Size estimate: less than 1 page.

Works as a skill:

- Yes. It is short but actionable and self-contained.

### `.agents/skills/improve-codebase-architecture/SKILL.md`

**Decision: ATOMIZE**

Actual knowledge:

- Architecture review concept of "deepening opportunities": refactors that make shallow modules deeper for testability and AI navigability.
- Vocabulary constraints: module, interface, depth, seam, adapter, leverage, locality.
- Exploration prompts: concept spread across modules, shallow interfaces, testability-only extraction with poor locality, seam leaks, hard-to-test interfaces.
- Deletion test: deleting a shallow module should concentrate complexity rather than merely move it.
- HTML report format: self-contained temp file, Tailwind/Mermaid, before/after visuals, candidate cards, recommendation strength.
- ADR conflict handling: surface only real friction worth reopening.
- Grilling loop rules: update domain language, offer ADRs for durable rejected reasons, use design-it-twice for alternative interfaces.

Existing knowledge coverage:

- Partially covered by `knowledge/architecture/layer-isolation.md`, `knowledge/workflow/decision-records.md`, `knowledge/workflow/design-doc-standards.md`, and `knowledge/workflow/collaboration-protocol.md`.
- Missing: deep module vocabulary, deletion test, locality/leverage framing, architecture-review HTML report structure.

Atomization recommendation:

- Add `knowledge/architecture/deep-module-review.md`.
- Optionally add `knowledge/workflow/architecture-review-report.md` if report-generation guidance should be reusable outside this skill.

Size estimate: about 2 token-equivalent pages.

Works as a skill:

- Partially. The high-level process is understandable, but it depends on unavailable `/codebase-design`, `/grilling`, `/domain-modeling`, `HTML-REPORT.md`, and an Agent tool model not present in this repo's current consort instructions.

### `.agents/skills/playwright-best-practices/SKILL.md`

**Decision: REFERENCE**

Actual knowledge:

- A large activity router for Playwright references.
- Covers E2E, component, API, GraphQL, visual regression, POM, fixtures, authentication, mobile, browser APIs, debugging, flaky tests, security, performance, CI, Electron, browser extensions, i18n, and canvas/WebGL testing.
- Includes a quick decision tree and a validation loop: run Playwright, inspect failures/traces, fix, rerun, repeat critical tests.

Existing knowledge coverage:

- Project-level coverage exists in `knowledge/qa-testing/browser-smoke-tests.md`, `knowledge/qa-testing/testing-pyramid.md`, `knowledge/qa-testing/test-standards.md`, `knowledge/qa-testing/accessibility.md`, and `knowledge/qa-testing/evidence-gates.md`.
- Those chunks are intentionally project-level and do not replace this broad Playwright reference tree.

Atomization recommendation:

- Do not atomize the whole Playwright reference set into project knowledge; it is too broad and external-library-specific.
- If this project repeatedly needs canvas/WebGL Playwright checks, merge a small subset into `knowledge/qa-testing/browser-smoke-tests.md` or create `knowledge/qa-testing/playwright-canvas.md`.

Size estimate: about 5 pages in `SKILL.md`; many more pages if linked references are included.

Works as a skill:

- Yes, assuming the referenced files under `core/`, `testing-patterns/`, `advanced/`, `debugging/`, `architecture/`, `frameworks/`, `browser-apis/`, and `infrastructure-ci-cd/` exist with the skill.
- It is a router/reference skill, not a compact project doctrine chunk.

### `.agents/skills/prototype/SKILL.md`

**Decision: MERGE**

Actual knowledge:

- Prototype is throwaway code that answers a specific question.
- Branching rule: logic/state questions use a tiny interactive terminal app; UI questions use multiple variants switchable by URL search param and floating bottom bar.
- Shared rules: clearly mark as throwaway, locate near intended production area, one command to run, no persistence by default, skip polish, surface full relevant state, delete or absorb when done.
- Durable output is the answer: capture hypothesis, decision, or finding in a durable artifact.

Existing knowledge coverage:

- `knowledge/workflow/prototype-standards.md` covers disposable prototypes, hypotheses, run instructions, scope, findings, and anti-patterns.
- Missing details: logic-vs-UI branch split, one-command rule, no persistence by default, state visibility after actions, deletion-or-absorption rule.

Atomization recommendation:

- Merge missing actionable details into `knowledge/workflow/prototype-standards.md`.

Size estimate: about 1 page.

Works as a skill:

- Partially. The top-level skill depends on `LOGIC.md` and `UI.md` for the actual branch instructions. Without those files, it is still useful but incomplete.

### `.agents/skills/tdd/SKILL.md`

**Decision: ATOMIZE**

Actual knowledge:

- Tests verify behavior through public interfaces, not implementation details.
- Prefer integration-style tests that survive refactors.
- Anti-pattern: horizontal slicing, meaning writing all tests first and all implementation later.
- Correct flow: vertical tracer bullets, one behavior test and one minimal implementation at a time.
- Planning checklist: domain vocabulary from `CONTEXT.md`, ADR respect, public interface, behavior priorities, deep module opportunities, user approval.
- TDD loop: red, green, repeat, refactor only when green.
- Per-cycle checklist: behavior test, public interface only, survives refactor, minimal code, no speculative features.

Existing knowledge coverage:

- Partially covered by `knowledge/qa-testing/test-standards.md`, `knowledge/qa-testing/testing-pyramid.md`, and `knowledge/workflow/verification-gate.md`.
- Missing: public-interface-first TDD doctrine, vertical tracer bullets, horizontal-slice anti-pattern, refactor-only-when-green rule.

Atomization recommendation:

- Add `knowledge/qa-testing/tdd-tracer-bullets.md`.

Size estimate: about 2 pages.

Works as a skill:

- Partially. Core guidance is self-contained, but it references `tests.md`, `mocking.md`, `refactoring.md`, and `/codebase-design`, which were not included in this audit request.

### `.agents/skills/writing-great-skills/SKILL.md`

**Decision: ATOMIZE**

Actual knowledge:

- Skills exist to make agent behavior more predictable, not output-identical.
- Invocation tradeoff between model-invoked skills and user-invoked skills.
- Description-writing guidance: front-load leading words, one trigger per branch, prune body identity.
- Information hierarchy: in-skill steps, in-skill reference, external reference.
- Completion criteria should be checkable and exhaustive enough to resist premature completion.
- Progressive disclosure and context pointers for branch-specific material.
- Splitting rules: by invocation or by sequence.
- Pruning doctrine: single source of truth, relevance, no-op test.
- Leading words compress repeated concepts and improve invocation and execution.
- Failure modes: premature completion, duplication, sediment, sprawl, no-op.

Existing knowledge coverage:

- `knowledge/workflow/available-skills.md` only lists skills.
- No existing chunk captures skill-authoring doctrine.

Atomization recommendation:

- Add `knowledge/workflow/skill-authoring-standards.md`.
- This is valuable because this repo is actively converting agents/skills into retrievable knowledge.

Size estimate: about 3 pages.

Works as a skill:

- Yes. It is self-contained reference material, with optional deeper definitions in `GLOSSARY.md`.

### `.opencode/skills/automagically-game-architecture/SKILL.md`

**Decision: MERGE**

Actual knowledge:

- State belongs in plain TypeScript classes/records, not PixiJS display objects.
- Stack-based scene lifecycle with `enter`, `update`, and `exit`.
- Variable delta update loop using PixiJS v8 `Ticker`, fixed-step only when needed.
- Single `InputManager` captures input once per frame; scenes do not register DOM listeners.
- Plain-class composition model, not ECS by default.
- Project structure and dependency boundaries.
- Direct scene-to-`AudioManager` calls, no event bus for audio.
- Save/load via JSON and localStorage with `toJSON`/`fromJSON`.
- Graph integration requirement using `NarrativeDocumentV2Schema`, `GraphRegistry`, `/api/graph`, and `npm run export-graph`.
- Anti-patterns for application ownership, renderer state, DOM listeners, timers, layer violations, and stringly typed domains.

Existing knowledge coverage:

- Strong coverage in `knowledge/architecture/state-ownership.md`, `knowledge/architecture/scene-lifecycle.md`, `knowledge/architecture/update-loop.md`, `knowledge/architecture/layer-isolation.md`, `knowledge/architecture/resource-cleanup.md`, `knowledge/pixijs/input-handling.md`, `knowledge/pixijs/audio-integration.md`, and `knowledge/architecture/typescript-strict-patterns.md`.
- Missing or underrepresented: graph integration, direct singleton audio communication as a deliberate project rule, localStorage/no-migration save/load defaults, explicit "not ECS initially" composition rule.

Atomization recommendation:

- Merge the missing details into existing chunks:
  - `knowledge/architecture/state-ownership.md`: save/load defaults.
  - `knowledge/architecture/layer-isolation.md` or a new `knowledge/architecture/composition-model.md`: no-ECS-by-default rule.
  - New small chunk `knowledge/architecture/graph-integration.md` if graph registration is still a project requirement.

Size estimate: about 3 pages.

Works as a skill:

- Yes. It is self-contained and highly actionable.

### `.opencode/skills/automagically-testing/SKILL.md`

**Decision: MERGE**

Actual knowledge:

- Test directory structure mirroring `src/`: unit, integration, browser, visual, helpers.
- Testing pyramid: 80% unit, 15% integration, 4% browser, 1% visual.
- Unit-test targets: state transitions, collisions, formulas, spawn logic, save/load, seeded RNG.
- Integration-test targets: scene lifecycle, input, resize, audio routing, asset failures.
- Browser-test targets: load, canvas render, input, pause/resume, fullscreen, focus loss.
- Sparse visual testing and explicit visual anti-patterns.
- Deterministic testing via fake clock and seeded RNG.
- Do not test game logic through pixels.
- Helper conventions and coverage targets.

Existing knowledge coverage:

- Strong coverage in `knowledge/qa-testing/testing-pyramid.md`, `knowledge/qa-testing/test-standards.md`, `knowledge/qa-testing/test-doubles.md`, `knowledge/qa-testing/browser-smoke-tests.md`, and `knowledge/qa-testing/performance-budgets.md`.
- Missing details: exact `tests/` directory convention, helper file naming, coverage target nuance, fake clock specifics.

Atomization recommendation:

- Merge missing details into:
  - `knowledge/qa-testing/testing-pyramid.md`
  - `knowledge/qa-testing/test-doubles.md`
  - `knowledge/qa-testing/test-standards.md`

Size estimate: about 2 pages.

Works as a skill:

- Yes. It is self-contained.

### `.opencode/skills/automagically-audio/SKILL.md`

**Decision: REFERENCE**

Actual knowledge:

- Howler initialization after first user gesture only.
- Separate music and SFX buses, persisted volume, global mute via Howler.
- Music as single looping instance; SFX as short Howl instances or sprites for frequent sounds.
- Scene exit cleanup with stop/unload.
- Howler `onloaderror` and `onplayerror` handling should warn and not block gameplay.
- `IAudioManager` interface and Vitest mock test double.
- Anti-patterns: module-scope Howl, raw Web Audio API, uncaught audio errors, pre-gesture music, `setTimeout` for audio timing.

Existing knowledge coverage:

- Strongly covered by `knowledge/pixijs/audio-integration.md`, `knowledge/audio/sonic-identity.md`, and `knowledge/audio/sfx-specifications.md`.
- The existing `pixijs/audio-integration.md` already includes the practical implementation rules and anti-patterns.

Atomization recommendation:

- No immediate atomization needed.
- Keep as the implementation-facing source reference and keep `knowledge/pixijs/audio-integration.md` as the retrievable chunk.

Size estimate: about 2 pages.

Works as a skill:

- Yes. It is self-contained and concrete.

### `.opencode/skills/automagically-assets-and-build/SKILL.md`

**Decision: MERGE**

Actual knowledge:

- PixiJS v8 `Assets` manifest initialization and scene bundle loading.
- Bundle conventions by scene plus shared core bundle.
- Audio codec strategy: MP3 primary plus WebM/Opus fallback in the skill text.
- Imports vs `public/`: Vite imports for hashed/bundled assets, fixed URLs only in `public/`.
- Spritesheet folder convention and JSON loading.
- Font loading before first text scene, `.woff2` preferred, `.ttf` fallback.
- Vite build defaults: `dist/`, `es2022`, hashed assets, base path `/`.
- Anti-patterns: v7 Loader, load in update, public texture imports, missing audio fallback, whole manifest at boot.

Existing knowledge coverage:

- Strong coverage in `knowledge/pixijs/asset-loading.md`, `knowledge/pixijs/rendering-pipeline.md`, `knowledge/workflow/web-runtime-standards.md`, and `knowledge/audio/sonic-identity.md`.
- Missing details: font loading conventions, Vite build defaults, spritesheet path convention, and the exact audio codec ordering should be reconciled because `knowledge/pixijs/audio-integration.md` says WebM/Opus primary with MP3 fallback while this skill says MP3 primary with WebM fallback.

Atomization recommendation:

- Merge missing non-conflicting details into `knowledge/pixijs/asset-loading.md`.
- Resolve the audio codec order conflict before merging. Prefer one project rule and update both sources to match.

Size estimate: about 2 pages.

Works as a skill:

- Yes. It is self-contained.

### `.opencode/skills/typescript-patterns/SKILL.md`

**Decision: MERGE**

Actual knowledge:

- Load pinned TypeScript reference docs first.
- Mode dispatch: review, lint, refactor.
- Review checklist: `any`, `as`, `!`, `@ts-ignore`, missing public return types, implicit anys, runtime enums, wrong layer imports, `Function`/`object` types.
- Lint fix suggestions: replace `any`, assertions, non-null assertions, runtime enums; add return and parameter types.
- Architecture-aware refactoring via import/export mapping and boundary checks.
- Compiler-backed analysis with `ts-morph` or optional `ts-compiler-mcp`.
- Codegen standards: strict idioms, public return types, discriminated unions, branded IDs, `Readonly`, async error boundaries, `AbortController`.
- Anti-patterns: unsafe type escapes, circular imports, gameplay-to-UI and core-to-feature imports.

Existing knowledge coverage:

- Strong coverage in `knowledge/architecture/typescript-strict-patterns.md` and `knowledge/architecture/layer-isolation.md`.
- Missing details: mode-dispatch review/lint/refactor workflow, explicit review report format, `Function`/`object` banned types, pinned TypeScript reference loading.

Atomization recommendation:

- Merge review checklist details into `knowledge/architecture/typescript-strict-patterns.md`.
- If OpenCode still uses mode-dispatch skills directly, keep this skill as the operational checklist.

Size estimate: about 1 page.

Works as a skill:

- Partially. The main checklist works, but full execution depends on `.opencode/docs/ts-reference/VERSION.md`, `patterns.md`, `module-architecture.md`, and optional compiler MCP tools.

### `.agents/skills/pixijs/SKILL.md`

**Decision: REFERENCE**

Actual knowledge:

- Router for PixiJS v8 specialized skills.
- Maps task areas to 26 sub-skills: application, renderer concepts, creation, environments, migration, scene graph, containers, sprites, graphics, text, mesh, particles, DOM, GIF, HTML source, assets, color, events, math, ticker, accessibility, blend modes, custom rendering, filters, performance.
- Fallback rule: fetch the official PixiJS generated `llms.txt` docs index when no sub-skill covers the requested API surface.

Existing knowledge coverage:

- Strong coverage in `knowledge/pixijs/installed-skills.md` and related PixiJS chunks.
- The router itself is already represented as an installed-skills inventory rather than actionable implementation doctrine.

Atomization recommendation:

- Do not atomize the router.
- Keep `knowledge/pixijs/installed-skills.md` as the knowledge-base inventory and use the router as a live skill entry point.

Size estimate: about 1 page.

Works as a skill:

- Yes. It is self-contained as a router, assuming the 26 sub-skills are installed.

## Recommended Follow-Up Atomization Plan

1. Create new chunks:
   - `knowledge/qa-testing/bug-diagnosis-loop.md`
   - `knowledge/qa-testing/tdd-tracer-bullets.md`
   - `knowledge/workflow/handoff-standards.md`
   - `knowledge/workflow/skill-authoring-standards.md`
   - `knowledge/architecture/deep-module-review.md`
2. Merge missing details into existing chunks:
   - `knowledge/workflow/prototype-standards.md`
   - `knowledge/qa-testing/testing-pyramid.md`
   - `knowledge/qa-testing/test-standards.md`
   - `knowledge/qa-testing/test-doubles.md`
   - `knowledge/pixijs/asset-loading.md`
   - `knowledge/architecture/typescript-strict-patterns.md`
   - `knowledge/architecture/state-ownership.md`
3. Resolve before merging:
   - Audio codec order conflict between `.opencode/skills/automagically-assets-and-build/SKILL.md` and `knowledge/pixijs/audio-integration.md`.
   - Whether graph integration via `NarrativeDocumentV2Schema` is still required. If yes, add `knowledge/architecture/graph-integration.md`.
4. Leave as references:
   - `playwright-best-practices`
   - `automagically-audio`
   - `pixijs` router
5. Ignore unless missing dependencies are restored:
   - `grill-with-docs`

