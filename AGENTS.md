# OpenCode Game Studios — Game Studio Agent Architecture

Indie game development managed through 49 coordinated OpenCode agents.
Each agent owns a specific domain, enforcing separation of concerns and quality.

This is a port of [Claude Code Game Studios](https://github.com/Donchitos/Claude-Code-Game-Studios)
by Donchitos, adapted for OpenCode.

## Model Tier Configuration

Configure your actual model IDs below. The tiers abstract agent assignments
from concrete models so you can switch providers without editing 49 files.

- **tier:opus** → `anthropic/claude-opus-4-5` (or `openai/gpt-5-codex`, etc.)
- **tier:sonnet** → `anthropic/claude-sonnet-4-5` (or `openai/gpt-5`, etc.)
- **tier:haiku** → `anthropic/claude-haiku-4-5` (or `openai/gpt-5-mini`, etc.)

Set in `opencode.json`:
```json
{
  "model": "tier:opus",
  "small_model": "tier:haiku"
}
```

## Agents (49)

Defined in `.opencode/agents/` as markdown files with YAML frontmatter.
- **Tier 1 — Directors** (tier:opus): creative-director, technical-director, producer
- **Tier 2 — Leads** (tier:sonnet): game-designer, lead-programmer, art-director, audio-director, narrative-director, qa-lead, release-manager, localization-lead
- **Tier 3 — Specialists** (tier:sonnet/haiku): gameplay-programmer, engine-programmer, ai-programmer, etc.

Invoke agents with `@agent-name` in your message.

## Commands (73)

All skills from CCGS are available as commands in `.opencode/commands/`.
Type `/command-name` in the TUI to use them:
- `/start` — First-time onboarding
- `/brainstorm` — Explore game ideas
- `/setup-engine` — Configure engine
- `/design-system` — Write a GDD
- `/create-epics` — Map systems to epics
- `/dev-story` — Implement a story
- etc.

## Rules (11)

Path-scoped coding standards in `.opencode/rules/`. Loaded via `instructions` in `opencode.json`.
When applying rules, check the file path and apply the matching rule:

| Path | Rule File |
|------|-----------|
| `src/gameplay/**` | `.opencode/rules/gameplay-code.md` |
| `src/core/**` (engine) | `.opencode/rules/engine-code.md` |
| `src/ai/**` | `.opencode/rules/ai-code.md` |
| `src/networking/**` | `.opencode/rules/network-code.md` |
| `src/ui/**` | `.opencode/rules/ui-code.md` |
| `src/rendering/**` (shaders) | `.opencode/rules/shader-code.md` |
| `assets/**` | `.opencode/rules/data-files.md` |
| `design/gdd/**` | `.opencode/rules/design-docs.md` |
| `design/narrative/**` | `.opencode/rules/narrative.md` |
| `tests/**` | `.opencode/rules/test-standards.md` |
| `prototypes/**` | `.opencode/rules/prototype-code.md` |

## Collaboration Protocol

**User-driven collaboration, not autonomous execution.**
Every task follows: **Question -> Options -> Decision -> Draft -> Approval**

- Agents MUST ask "May I write this to [filepath]?" before using Write/Edit tools
- Agents MUST show drafts or summaries before requesting approval
- Multi-file changes require explicit approval for the full changeset
- No commits without user instruction

See `docs/COLLABORATIVE-DESIGN-PRINCIPLE.md` for full protocol and examples.

## Technology Stack Placeholder

The user should configure their stack in `.opencode/docs/technical-preferences.md`:
- **Engine**: [CHOOSE: Godot 4 / Unity / Unreal Engine 5]
- **Language**: [CHOOSE: GDScript / C# / C++ / Blueprint]
- **Version Control**: Git with trunk-based development
- **Build System**: [SPECIFY]
- **Asset Pipeline**: [SPECIFY]

> Engine-specialist agents exist for Godot, Unity, and Unreal with
> dedicated sub-specialists. Use the set matching your engine.

## Project Structure

@.opencode/docs/directory-structure.md

## Technical Preferences

@.opencode/docs/technical-preferences.md

## Coordination Rules

@.opencode/docs/coordination-rules.md

## Context Management

@.opencode/docs/context-management.md

## Hook Instructions

CCGS hooks are not directly supported in OpenCode. Instead:
- **Pre-commit validation**: Run `/validate-commit` before committing
- **Asset validation**: Run `/validate-assets` after changing asset files
- **Pre-push check**: Run `/validate-push` before pushing
- Session state: Update `production/session-state/active.md` when starting/stopping work

## First Session?

If the project has no engine configured and no game concept, type `/start` to begin.
