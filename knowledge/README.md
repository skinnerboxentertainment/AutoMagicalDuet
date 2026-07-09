# Knowledge Base — AutoMagically RAG System

**Structure:** Domain-tagged knowledge chunks for dynamic retrieval.
**Protocol:** Load relevant chunks by domain when the consort begins a task.

## Domains

| Directory | Contents | Trigger paths |
|-----------|----------|---------------|
| `architecture/` | Engine layering, patterns, ADRs, control manifest | `src/core/**`, `docs/architecture/**` |
| `game-design/` | Mechanics, loops, systems, economy, narrative | `design/gdd/**`, `src/gameplay/**` |
| `pixijs/` | Rendering, sprites, scenes, filters, v8 API | `src/rendering/**`, `src/scenes/**` |
| `audio/` | Howler.js, sfxr, audio pipeline, sound design | `src/audio/**`, `tools/audio-pipeline/**` |
| `qa-testing/` | Vitest patterns, Playwright, test helpers | `tests/**`, `src/utils/rng.ts` |
| `workflow/` | Commands, protocols, processes | `.opencode/**`, `production/**` |
| `genre/` | Genre-specific patterns and templates | `.opencode/templates/genre-patterns/**` |
| `decisions/` | ADRs and architecture decisions | `docs/architecture/adr/**` |

## Knowledge Chunk Format

```markdown
---
domain: architecture
tags: [layering, core, engine]
triggers: [src/core/**, src/gameplay/**]
related: [pixijs/scene-management, game-design/state-ownership]
---

# Title

Key knowledge content...

## Patterns
...

## Anti-patterns
...

## References
...
```

## Retrieval Protocol

When beginning a task, the consort checks `active.md` for context, then loads relevant domain chunks by matching file paths and task description to chunk tags.

Loaded chunks are recorded in `active.md` under Active Packs.
