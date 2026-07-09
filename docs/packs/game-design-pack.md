---
name: game-design-pack
when: "Design docs, gameplay rules, systems, economy, levels, narrative alignment, or player-facing writing need structured game-design guidance."
triggers: "Touching design/gdd/**, design/narrative/**, src/gameplay/**, assets/data/gameplay-config.json, progression/economy data, level specs, or acceptance criteria for mechanics."
---

# Game Design Pack

## When to use

Use this pack when framing or reviewing how the game works: core loops, mechanics, systems, level pacing, progression, rewards, story/gameplay alignment, or player-facing text.

Use it during Explore and Frame to clarify player experience, during Expand and Attack to compare design options, and during Commit to turn a design choice into implementable rules.

## Constraints

- Start from the intended player experience, not from a feature list.
- Every mechanic must connect to at least one loop: moment-to-moment, session, or long-term progression.
- Every major design choice must trace to the game's pillars, target MDA aesthetics, or explicit acceptance criteria.
- Keep pillars to 3-5 falsifiable principles. Vague pillars such as "fun gameplay" do not guide decisions.
- Treat anti-pillars as real constraints; every "no" protects the core identity.
- All tunable numeric values belong in external data files such as `assets/data/`, not hardcoded in source.
- Formula specs must include named expressions, variable tables, output ranges, and worked examples.
- Economy, item, and cross-system facts should align with `design/registry/entities.yaml` when it exists.
- Player-facing text must be localization-ready: named placeholders, reasonable line length, clear context, and no unnecessary idioms.
- Do not add narrative, economy, or mechanical scope without checking pillar value, production cost, and testability.

## Patterns

- **Question first**: identify the target fantasy, constraints, references, pillar connection, and measurable outcome before proposing mechanics.
- **Options then decision**: present 2-4 options with pros, cons, risks, and a recommendation; the user or orchestrator chooses.
- **MDA backward design**: define target Aesthetics, infer player Dynamics, then specify Mechanics that reliably produce those dynamics.
- **Self-Determination Theory check**: each system should support autonomy, competence, relatedness, or an intentional combination.
- **Nested loops**: define a satisfying 30-second micro-loop, a 5-15 minute goal/reward meso-loop, and a session-level macro-loop with a natural stopping point and reason to return.
- **Flow curve**: scaffold mechanics in isolation, combine them later, use sawtooth difficulty, and keep feedback readable within about 0.5 seconds for moment-to-moment actions.
- **Pillar proximity test**: when scope must shrink, cut non-pillar features first, simplify pillar-supporting features, and protect features that are the pillar.
- **Systems map**: document inputs, outputs, feedback loops, balancing loops, exploits, and mitigation for each subsystem.
- **Balance knobs**: separate feel knobs, curve knobs, and gate knobs. Give each knob a safe range and rationale.
- **Economy model**: map faucets, sinks, acquisition rates, expected stockpiles, bad-luck protection, and health metrics.
- **Level pacing plan**: define critical path, optional paths, encounter density, rest points, landmarks, sightlines, secrets, and narrative beats.
- **Ludonarrative harmony**: mechanics should reinforce the story's values. If the story says one thing and rewards another, flag the conflict.
- **Writing with function**: every line should serve exposition, character, gameplay clarity, mood, or reward. Mechanical text must be unambiguous.

## Anti-patterns

- Designing from implementation convenience before defining the player experience.
- Creating mechanics that do not serve a loop, pillar, or target aesthetic.
- Treating "feels good" as acceptance criteria without measurable proxies.
- Hiding balance-critical values in code.
- Shipping formulas without ranges, clamps, edge cases, or examples.
- Adding rewards without sinks, guarantees, or acquisition expectations.
- Confusing complexity with depth; prefer a small set of rules that produce interesting dynamics.
- Punishing frequent failure with long recovery loops.
- Writing lore that contradicts established world rules or creates new scope.
- Using dialogue as a substitute for playable teaching when a mechanic can teach itself.

## Checklist

- Core fantasy is stated as what the player gets to be or do.
- Unique hook passes the "like X, and also Y" test.
- Target MDA aesthetics are ranked.
- Pillars and anti-pillars are explicit and falsifiable.
- Micro, meso, and macro loops are documented.
- Each mechanic has rules precise enough for implementation.
- Formulas include variable tables, output bounds, and worked examples.
- Edge cases and degenerate strategies are listed.
- Tuning knobs are externalized with ranges and rationale.
- Economy systems include faucets, sinks, rates, guarantees, and health metrics.
- Level specs include play time, critical path, optional paths, encounters, pacing, narrative beats, and audio cues.
- Player-facing text has speaker/context notes where relevant and uses named placeholders.
- Acceptance criteria include functional and experiential evidence.

## References

- Source agents: `.opencode/agents/creative-director.md`, `game-designer.md`, `systems-designer.md`, `level-designer.md`, `economy-designer.md`, `narrative-director.md`, `writer.md`.
- Design docs: `design/gdd/**`, `design/narrative/**`, `design/registry/entities.yaml`.
- Coordination: `production/active.md`, `docs/architecture/adr/`, `production/events.md`.
- Common frameworks: MDA, Self-Determination Theory, Flow, Bartle player types, Quantic Foundry motivations, sink/faucet economy modeling.

## Escalation

- Escalate identity, pillar, tone, or scope conflicts to the OpenCode orchestrator and capture durable decisions in an ADR when architecture or long-term direction changes.
- Pull in `genre-platformer` when the mechanic is a side-scrolling platformer feature.
- Pull in `qa-testing-pack` before committing any logic, integration, UI, or feel-heavy design.
- Pull in `pixijs-rendering-pack` when a design depends on rendering, scene graph, particles, VFX, shaders, or canvas interaction.
