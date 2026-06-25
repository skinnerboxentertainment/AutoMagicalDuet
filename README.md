<p align="center">
  <h1 align="center">OpenCode PixiJS Game Studio</h1>
  <p align="center">
    <em>PixiJS v8 + TypeScript derivative of <a href="https://github.com/Donchitos/Claude-Code-Game-Studios">Claude Code Game Studios</a></em>
    <br />
    Turn a single OpenCode session into a browser game development studio.
    <br />
    35 agents. 73 commands. PixiJS v8 rendering.
  </p>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a>
  <a href=".opencode/agents"><img src="https://img.shields.io/badge/agents-35-blueviolet" alt="35 Agents"></a>
  <a href=".opencode/commands"><img src="https://img.shields.io/badge/commands-73-green" alt="73 Commands"></a>
  <a href=".opencode/rules"><img src="https://img.shields.io/badge/rules-12-red" alt="12 Rules"></a>
  <a href="https://opencode.ai"><img src="https://img.shields.io/badge/built%20for-OpenCode-f5f5f5" alt="Built for OpenCode"></a>
  <a href="https://github.com/Donchitos/Claude-Code-Game-Studios"><img src="https://img.shields.io/badge/original-CCGS-blue" alt="Original: CCGS"></a>
</p>

---

## Why This Exists

Building a game solo with AI is powerful — but a single chat session has no structure. No one stops you from hardcoding magic numbers, skipping design docs, or writing spaghetti code. There's no QA pass, no design review, no one asking "does this actually fit the game's vision?"

**OpenCode PixiJS Game Studio** solves this by giving your AI session the structure of a real studio. Instead of one general-purpose assistant, you get 35 specialized agents organized into a studio hierarchy — directors who guard the vision, department leads who own their domains, and specialists who do the hands-on work. Each agent has defined responsibilities, escalation paths, and quality gates. All running on PixiJS v8 + TypeScript for web browser delivery.

The result: you still make every decision, but now you have a team that asks the right questions, catches mistakes early, and keeps your project organized from first brainstorm to launch.

> This is a PixiJS v8 + TypeScript derivative of [Claude Code Game Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) (CCGS) by Donchitos, adapted from `.claude/` to `.opencode/` format. All credit for the original architecture, agents, skills, and design goes to the CCGS project.

---

## Table of Contents

- [What's Included](#whats-included)
- [Studio Hierarchy](#studio-hierarchy)
- [Slash Commands](#slash-commands)
- [Getting Started](#getting-started)
- [Upgrading](#upgrading)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Design Philosophy](#design-philosophy)
- [Customization](#customization)
- [Platform Support](#platform-support)
- [Community](#community)
- [Supporting This Project](#supporting-this-project)
- [License](#license)

---

## What's Included

| Category | Count | Description |
|----------|-------|-------------|
| **Agents** | 35 | Specialized agents across design, programming, art, audio, narrative, QA, and production |
| **Commands** | 73 | Commands for every workflow phase (`/start`, `/design-system`, `/create-epics`, `/create-stories`, `/dev-story`, `/story-done`, etc.) |
| **Rules** | 12 | Path-scoped coding standards enforced per file path |
| **Templates** | 41 | Document templates for GDDs, UX specs, ADRs, sprint plans, HUD design, accessibility, and more |

## Studio Hierarchy

Agents are organized into three tiers, matching how real studios operate:

```
Tier 1 — Directors (Opus)
  creative-director    technical-director    producer

Tier 2 — Department Leads (Sonnet)
  game-designer        lead-programmer       art-director
  audio-director       narrative-director    qa-lead
  release-manager      localization-lead

Tier 3 — Specialists (Sonnet/Haiku)
  gameplay-programmer  engine-programmer     ai-programmer
  network-programmer   tools-programmer      ui-programmer
  systems-designer     level-designer        economy-designer
  technical-artist     sound-designer        writer
  world-builder        ux-designer           prototyper
  performance-analyst  devops-engineer       analytics-engineer
  security-engineer    qa-tester             accessibility-specialist
  live-ops-designer    community-manager
```

### PixiJS Specialist

A dedicated `pixijs-specialist` agent covers PixiJS v8 rendering, scene graph, shaders, performance optimization, and cross-browser WebGL/WebGPU/Canvas.

## Commands

Type `/` in OpenCode to access all 73 commands:

**Onboarding & Navigation**
`/start` `/help` `/project-stage-detect` `/setup-engine` `/adopt`

**Game Design**
`/brainstorm` `/map-systems` `/design-system` `/quick-design` `/review-all-gdds` `/propagate-design-change`

**Art & Assets**
`/art-bible` `/asset-spec` `/asset-audit`

**UX & Interface Design**
`/ux-design` `/ux-review`

**Architecture**
`/create-architecture` `/architecture-decision` `/architecture-review` `/create-control-manifest`

**Stories & Sprints**
`/create-epics` `/create-stories` `/dev-story` `/sprint-plan` `/sprint-status` `/story-readiness` `/story-done` `/estimate`

**Reviews & Analysis**
`/design-review` `/code-review` `/balance-check` `/content-audit` `/scope-check` `/perf-profile` `/tech-debt` `/gate-check` `/consistency-check` `/security-audit`

**QA & Testing**
`/qa-plan` `/smoke-check` `/soak-test` `/regression-suite` `/test-setup` `/test-helpers` `/test-evidence-review` `/test-flakiness` `/skill-test` `/skill-improve`

**Production**
`/milestone-review` `/retrospective` `/bug-report` `/bug-triage` `/reverse-document` `/playtest-report`

**Release**
`/release-checklist` `/launch-checklist` `/changelog` `/patch-notes` `/hotfix` `/day-one-patch`

**Creative & Content**
`/prototype` `/onboard` `/localize`

**Team Orchestration** (coordinate multiple agents on a single feature)
`/team-combat` `/team-narrative` `/team-ui` `/team-release` `/team-polish` `/team-audio` `/team-level` `/team-live-ops` `/team-qa`

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [OpenCode](https://opencode.ai) (`npm install -g opencode-ai`)
- Python 3 (for JSON validation)

### Setup

```bash
# Clone and install
git clone <repo-url> my-game
cd my-game
npm install                                    # installs PixiJS, Vite, TS + MCP server

# Launch the dev server (browser game)
npm run dev                                    # http://localhost:5173

# Or launch the AI studio
opencode                                       # then run /start to begin
```

Requires [Node.js](https://nodejs.org/) 18+ and [OpenCode](https://opencode.ai) (`npm install -g opencode-ai`).

### Quick Start

Once you're in the OpenCode session:

1. **`/start`** — onboarding flow, asks where you are
2. **`/brainstorm`** — explore game ideas from scratch
3. **`/project-stage-detect`** — if you already have existing work
4. **`/design-system`** — write a game design document for a specific system
5. **`/dev-story`** — implement a story from your sprint

## Upgrading

Already using an older version of this template? See [UPGRADING.md](UPGRADING.md)
for step-by-step migration instructions, a breakdown of what changed between
versions, and which files are safe to overwrite vs. which need a manual merge.

## Project Structure

```
AGENTS.md                           # Master configuration
opencode.json                       # OpenCode config (permissions, models, etc.)
.opencode/
  agents/                           # 35 agent definitions (markdown + YAML frontmatter)
  commands/                         # 73 commands (one .md per command)
  rules/                            # 12 path-scoped coding standards
  docs/
    pixijs-reference/               # PixiJS v8 version reference
    workflow-catalog.yaml           # 7-phase pipeline definition (read by /help)
    templates/                      # 41 document templates
src/                                # Game source code (TypeScript)
assets/                             # Art, audio, VFX, shaders, data files
design/                             # GDDs, narrative docs, level designs
docs/                               # Technical documentation and ADRs
tests/                              # Test suites (unit, integration, performance, playtest)
prototypes/                         # Throwaway prototypes (isolated from src/)
production/                         # Sprint plans, milestones, release tracking
public/                             # Static assets (HTML, favicon, etc.)
```

## How It Works

### Agent Coordination

Agents follow a structured delegation model:

1. **Vertical delegation** — directors delegate to leads, leads delegate to specialists
2. **Horizontal consultation** — same-tier agents can consult each other but can't make binding cross-domain decisions
3. **Conflict resolution** — disagreements escalate up to the shared parent (`creative-director` for design, `technical-director` for technical)
4. **Change propagation** — cross-department changes are coordinated by `producer`
5. **Domain boundaries** — agents don't modify files outside their domain without explicit delegation

### Collaborative, Not Autonomous

This is **not** an auto-pilot system. Every agent follows a strict collaboration protocol:

1. **Ask** — agents ask questions before proposing solutions
2. **Present options** — agents show 2-4 options with pros/cons
3. **You decide** — the user always makes the call
4. **Draft** — agents show work before finalizing
5. **Approve** — nothing gets written without your sign-off

You stay in control. The agents provide structure and expertise, not autonomy.

### Safety via Permissions

**Permission rules** in `opencode.json` auto-allow safe operations (git status, test runs, reads) and require approval for dangerous ones (force push, `rm -rf`, editing files). This replaces CCGS's hook system.

The following practices are documented in `AGENTS.md` as manual validation steps:
- **Pre-commit validation**: Run `/validate-commit` (check hardcoded values, TODO format)
- **Asset validation**: Run `/validate-assets` after changing asset files
- **Pre-push check**: Run `/validate-push` before pushing to protected branches
- **Session state**: Update `production/session-state/active.md` when starting/stopping work

### Path-Scoped Rules

Coding standards are automatically enforced based on file location:

| Path | Enforces |
|------|----------|
| `src/gameplay/**` | Data-driven values, delta time usage, no UI references |
| `src/core/**` | Zero allocations in hot paths, thread safety, API stability |
| `src/ai/**` | Performance budgets, debuggability, data-driven parameters |
| `src/networking/**` | Server-authoritative, versioned messages, security |
| `src/ui/**` | No game state ownership, localization-ready, accessibility |
| `design/gdd/**` | Required 8 sections, formula format, edge cases |
| `tests/**` | Test naming, coverage requirements, fixture patterns |
| `prototypes/**` | Relaxed standards, README required, hypothesis documented |

## Design Philosophy

This template is grounded in professional game development practices:

- **MDA Framework** — Mechanics, Dynamics, Aesthetics analysis for game design
- **Self-Determination Theory** — Autonomy, Competence, Relatedness for player motivation
- **Flow State Design** — Challenge-skill balance for player engagement
- **Bartle Player Types** — Audience targeting and validation
- **Verification-Driven Development** — Tests first, then implementation

## Customization

This is a **template**, not a locked framework. Everything is meant to be customized:

- **Add/remove agents** — delete agent files you don't need, add new ones for your domains
- **Edit agent prompts** — tune agent behavior, add project-specific knowledge
- **Modify skills** — adjust workflows to match your team's process
- **Add rules** — create new path-scoped rules for your project's directory structure
- **Pick your tech stack** — PixiJS v8 is pre-configured; add Matter.js, Howler.js as needed
- **Set review intensity** — `full` (all director gates), `lean` (phase gates only), or `solo` (none). Set during `/start` or edit `production/review-mode.txt`.

## Platform Support

Primary development and testing on **Windows 11** with PowerShell 7+. OpenCode itself is cross-platform (Windows, macOS, Linux). This template should work on any platform OpenCode supports.

## Community

- **Discussions** — [GitHub Discussions](https://github.com/Donchitos/Claude-Code-Game-Studios/discussions) for questions, ideas, and showcasing what you've built
- **Issues** — [Bug reports and feature requests](https://github.com/Donchitos/Claude-Code-Game-Studios/issues)

---

## Supporting This Project

Claude Code Game Studios is free and open source. If it saves you time or helps you ship your game, consider supporting continued development:

<p>
  <a href="https://www.buymeacoffee.com/donchitos3"><img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me a Coffee"></a>
  &nbsp;
  <a href="https://github.com/sponsors/Donchitos"><img src="https://img.shields.io/badge/GitHub%20Sponsors-ea4aaa?style=for-the-badge&logo=githubsponsors&logoColor=white" alt="GitHub Sponsors"></a>
</p>

- **[Buy Me a Coffee](https://www.buymeacoffee.com/donchitos3)** — one-time support
- **[GitHub Sponsors](https://github.com/sponsors/Donchitos)** — recurring support through GitHub

Sponsorships help fund time spent maintaining skills, adding new agents, keeping up with Claude Code and engine API changes, and responding to community issues.

---

*PixiJS Game Studio derivative of [Claude Code Game Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) by Donchitos. Built for OpenCode.*

## License

MIT License. See [LICENSE](LICENSE) for details.
