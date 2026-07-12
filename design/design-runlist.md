# Design Runlist — 36-Agent Compile

**Purpose:** A systematic review checklist compiled from all 36 agent definitions in `.opencode/agents/`. Before any build phase, run the relevant sections against the current design. Not every section applies at every phase — use the phase gate.

**How to use:** For each section, read the questions, discuss/pass, and mark the verdict. All passes = proceed. Any Kill = redesign before building. Any Pivot = resolve the flagged issue, then re-run.

---

## Phase I: Pre-Prototype (Sage Laboratory)

Only these 11 agents apply before the prototype exists. Everything else is premature.

---

### 1. Creative Director — Vision Coherence

> *"Is this a game, or is this a collection of systems?"*

| # | Question | Verdict |
|---|----------|---------|
| 1.1 | Does the design have one coherent player fantasy, or several competing ones? | Pass / Pivot / Kill |
| 1.2 | Are the design pillars mutually reinforcing, or does one contradict another? | Pass / Pivot / Kill |
| 1.3 | Would a player who loves the pitch also love the moment-to-moment play? | Pass / Pivot / Kill |
| 1.4 | Is there a single sentence that captures what the game IS (not just what it HAS)? | Pass / Pivot / Kill |
| 1.5 | Do all systems point toward the same emotional experience, or are some pulling in different directions? | Pass / Pivot / Kill |

**Notes:**

---

### 2. Game Designer — Core Loop Integrity

> *"Is the primary action intrinsically satisfying, regardless of context?"*

| # | Question | Verdict |
|---|----------|---------|
| 2.1 | Is the primary verb ("select two aspects") genuinely interesting in isolation, or does it depend on rewards to feel good? | Pass / Pivot / Kill |
| 2.2 | What prevents brute-force optimization? Is the blocker mechanical (cost) or systemic (knowledge state)? | Pass / Pivot / Kill |
| 2.3 | Is there a dominant strategy? If so, is it interesting enough that players won't mind repeating it? | Pass / Pivot / Kill |
| 2.4 | What does failure feel like? Is it interesting, frustrating, or invisible? | Pass / Pivot / Kill |
| 2.5 | Can the player answer "what should I do next?" at every point in the session? | Pass / Pivot / Kill |
| 2.6 | Does the core loop survive the transition from discovery (early) to optimization (late)? | Pass / Pivot / Kill |

**Notes:**

---

### 3. Systems Designer — Formula and Edge Cases

> *"The devil is in the interaction matrix."*

| # | Question | Verdict |
|---|----------|---------|
| 3.1 | Are all formulas explicit (written down, not "we'll tune it later")? | Pass / Pivot / Kill |
| 3.2 | What happens when two aspects of the same type stack from different sources? Is the behavior defined? | Pass / Pivot / Kill |
| 3.3 | What happens when a condition for an effect no longer applies (aspect decays, Sage dies, city falls)? | Pass / Pivot / Kill |
| 3.4 | Are there any circular dependencies in the system graph (A depends on B, B depends on A)? | Pass / Pivot / Kill |
| 3.5 | How many edge cases exist for the combination resolver? (same Sage, same pair, already known, rival discovered in same turn, etc.) | Pass / Pivot / Kill |
| 3.6 | Is the game state always valid, or can the player reach a state where no legal action exists? | Pass / Pivot / Kill |

**Notes:**

---

### 4. Economy Designer — Resource Flow

> *"An economy is a set of faucets and sinks. If the sink is missing, the economy floods."*

| # | Question | Verdict |
|---|----------|---------|
| 4.1 | For every yield (Growth, Industry, Arcana, Influence), what is the primary source and what is the primary sink? | Pass / Pivot / Kill |
| 4.2 | Is there a stable equilibrium, or does the economy grow without bound (inflation) or stall (deflation)? | Pass / Pivot / Kill |
| 4.3 | Can the player get stuck (no Arcana to train a Sage, no Sages to generate Arcana)? | Pass / Pivot / Kill |
| 4.4 | Are there any degenerate strategies where accumulating one yield makes the other yields irrelevant? | Pass / Pivot / Kill |
| 4.5 | Does the economy support the intended pacing (early scarcity, mid abundance, late focused)? | Pass / Pivot / Kill |

**Notes:**

---

### 5. UX Designer — Information Architecture

> *"Every number needs a tooltip. Every state needs an indicator."*

| # | Question | Verdict |
|---|----------|---------|
| 5.1 | Can the player determine "what aspects are on this hex" at a glance, without clicking? | Pass / Pivot / Kill |
| 5.2 | Can the player determine "what combinations are possible for my Sage" without checking every pair? | Pass / Pivot / Kill |
| 5.3 | Is the difference between "attempted-invalid" and "valid-undiscovered" visually clear? | Pass / Pivot / Kill |
| 5.4 | Can the player see what a rival Sage is working on? Is this information useful or noise? | Pass / Pivot / Kill |
| 5.5 | Is the feedback cycle for a discovery complete? (action → timer → result → map change → new options) | Pass / Pivot / Kill |
| 5.6 | Can a new player make their first discovery without reading text? | Pass / Pivot / Kill |

**Notes:**

---

### 6. QA Lead — Test Strategy and Failure Modes

> *"If it can break, it will break. The question is whether we'll notice before the player does."*

| # | Question | Verdict |
|---|----------|---------|
| 6.1 | What is the test surface? (hex math, aspect resolver, save/load, AI, every discovery effect) | Pass / Pivot / Kill |
| 6.2 | What are the hardest-to-test scenarios? (multi-Sage interactions, simultaneous discovery races, rival behavior) | Pass / Pivot / Kill |
| 6.3 | What constitutes a "state corruption" bug? (hash mismatch? wrong aspect on hex? broken save?) | Pass / Pivot / Kill |
| 6.4 | How do we test for regressions when a discovery's effects change? | Pass / Pivot / Kill |
| 6.5 | Is there a headless mode (no rendering) for automated testing and AI tournaments? | Pass / Pivot / Kill |

**Notes:**

---

### 7. Prototyper — Validation Priority

> *"Build the question, not the feature."*

| # | Question | Verdict |
|---|----------|---------|
| 7.1 | What is the single mechanic whose removal would collapse the entire design? Build that first. | Pass / Pivot / Kill |
| 7.2 | Can the core loop be tested in one day with programmer art and one authored map? | Pass / Pivot / Kill |
| 7.3 | What is the minimum rival behavior needed to create tension? (not full AI — a pressure system) | Pass / Pivot / Kill |
| 7.4 | What data will we collect from the prototype? (pairs attempted, time per session, map changes noticed, self-reported emotion) | Pass / Pivot / Kill |
| 7.5 | What is the hard stop condition for the prototype? (which question, if unanswered, kills the project?) | Pass / Pivot / Kill |

**Notes:**

---

### 8. Performance Analyst — Budget and Scaling

> *"The prototype might run fine. The commercial game will not — unless you plan for it."*

| # | Question | Verdict |
|---|----------|---------|
| 8.1 | What is the worst-case hex count? (map size × aspect density × visibility states) | Pass / Pivot / Kill |
| 8.2 | How many objects need position updates per tick? (units × Sages × particles × projectiles) | Pass / Pivot / Kill |
| 8.3 | Is there a cache strategy for aspect queries? (every Sage checking N hexes for M aspects every turn) | Pass / Pivot / Kill |
| 8.4 | What is the save-file size budget for a 200-turn match? Exceeds 10MB? | Pass / Pivot / Kill |
| 8.5 | When does rendering become the bottleneck? How many hexes on screen at typical zoom? | Pass / Pivot / Kill |

**Notes:**

---

### 9. Technical Director — Architecture Feasibility

> *"Every feature is a constraint on the architecture. Choose the constraints wisely."*

| # | Question | Verdict |
|---|----------|---------|
| 9.1 | Is the simulation fully deterministic? (fixed-point math, seeded RNG, platform-independent) | Pass / Pivot / Kill |
| 9.2 | Is the simulation separated from the presentation? (can we run headless?) | Pass / Pivot / Kill |
| 9.3 | What is the command/event model? (player orders → validator → reducer → events → renderer) | Pass / Pivot / Kill |
| 9.4 | Is there a plan for save/load across content patches? (versioned schemas, migration) | Pass / Pivot / Kill |
| 9.5 | What's the build order? (which system depends on which? what blocks what?) | Pass / Pivot / Kill |

**Notes:**

---

### 10. Producer — Scope and Risk

> *"A good plan, violently executed now, is better than a perfect plan executed next week."*

| # | Question | Verdict |
|---|----------|---------|
| 10.1 | Is the prototype scope bounded in time and complexity, or does it creep toward a mini-game? | Pass / Pivot / Kill |
| 10.2 | What is the single biggest risk to the next milestone? (unknown tech? unproven design? missing skill?) | Pass / Pivot / Kill |
| 10.3 | What gets cut if we're 50% over time? (specific features, not "some stuff") | Pass / Pivot / Kill |
| 10.4 | Is there an observable success criterion for the current phase that doesn't depend on interpretation? | Pass / Pivot / Kill |
| 10.5 | Who is the single decision-maker when design and engineering disagree? | Pass / Pivot / Kill |

**Notes:**

---

### 11. Narrative Director — Thematic Cohesion

> *"The mechanics tell a story whether you write one or not."*

| # | Question | Verdict |
|---|----------|---------|
| 11.1 | Does the core mechanic (combining aspects on the map) reinforce the thematic premise (knowledge reshapes the world)? | Pass / Pivot / Kill |
| 11.2 | Does the player feel like a "director of intellectual operations" or like a manager of spreadsheet numbers? | Pass / Pivot / Kill |
| 11.3 | Is the discovery feedback celebratory enough to feel like a breakthrough? (not just a notification) | Pass / Pivot / Kill |
| 11.4 | Do the civilization names, aspect names, and discovery names feel like they belong to the same world? | Pass / Pivot / Kill |
| 11.5 | Is there a sense of history being written? (does the map at end of session tell a story?) | Pass / Pivot / Kill |

**Notes:**

---

## Phase II: Vertical Slice (Additional Agents)

These 11 become relevant when building the vertical slice. Saved for later.

| # | Agent | Key Question |
|---|-------|-------------|
| 12 | Engine Programmer | Is the engine architecture extensible enough for new features without rewrites? |
| 13 | Gameplay Programmer | Are the input handling and game feel systems decoupled from simulation? |
| 14 | Lead Programmer | Does the codebase have consistent patterns across all modules? |
| 15 | Technical Artist | Are the shader/vfx requirements understood and budgeted? |
| 16 | UI Programmer | Is the UI data-driven (not hardcoded screens)? Can it be modded? |
| 17 | World Builder | Does the map generation produce recognizable, playable geography? |
| 18 | AI Programmer | Are the AI utility functions calibrated against human play data? |
| 19 | Level Designer | Does the authored map tell a spatial story through aspect placement? |
| 20 | Audio Director | Is the audio hierarchy mapped to event types (discovery, failure, combat, UI)? |
| 21 | Writer | Are there enough writing hooks (discovery descriptions, civilization lore, event text) to feel authored? |
| 22 | Narrative Director (deeper pass) | Does the emergent story (map transformation + discovery history) land emotionally? |

---

## Phase III: Commercial Release (Remaining Agents)

Deferred until the core loop is proven at scale.

| # | Agent | Key Question |
|---|-------|-------------|
| 23 | Art Director | Is the visual identity consistent, readable, and distinct from competitors? |
| 24 | Sound Designer | Are sound effects informative as well as atmospheric? (can a blind player identify what happened?) |
| 25 | Community Manager | Is there a feedback loop between player sentiment and development priorities? |
| 26 | Live Ops Designer | Are there systems that reward returning players without punishing new ones? |
| 27 | Localization Lead | Are all strings externalized? Are there text-length limits for each locale? |
| 28 | Network Programmer | Is the lockstep protocol robust against desync? Is there reconnect support? |
| 29 | Security Engineer | Is anti-cheat strategy defined for competitive multiplayer? |
| 30 | Release Manager | Is there a build pipeline, certification checklist, and rollback plan? |
| 31 | Analytics Engineer | What telemetry reveals whether the game is working as intended? |
| 32 | DevOps Engineer | Are CI/CD pipelines, automated testing, and deployment automated? |
| 33 | UX Designer (deeper pass) | Is the full information architecture validated through playtesting? |
| 34 | QA Lead (deep pass) | Are there automated regression suites for every subsystem? |
| 35 | Performance Analyst (deep pass) | Are profiler traces clean for worst-case scenarios? |
| 36 | Accessibility Specialist (full pass) | Has the game been tested with screen readers, colorblind filters, and reduced motion? |

---

## Summary

| Section | Current Verdict | Gate |
|---------|----------------|------|
| 1. Creative Director | ___ | All Pass = proceed to build |
| 2. Game Designer | ___ | Any Kill = redesign before building |
| 3. Systems Designer | ___ | Any Pivot = resolve and re-run |
| 4. Economy Designer | ___ | |
| 5. UX Designer | ___ | |
| 6. QA Lead | ___ | |
| 7. Prototyper | ___ | |
| 8. Performance Analyst | ___ | |
| 9. Technical Director | ___ | |
| 10. Producer | ___ | |
| 11. Narrative Director | ___ | |
| **All 11** | ___ | **Final: PROCEED / PIVOT / KILL** |

---

*Compiled 12 July 2026 from .opencode/agents/ (36 agents). Phase I: Pre-Prototype. Tier 1 agents extracted by reading each full agent definition and distilling the domain-specific evaluation criteria into 3-6 actionable questions per agent.*
