---
domain: workflow
tags: [skills, reference, tools]
triggers: [.agents/skills/**]
related: [pixijs/installed-skills]
---

# Available Skills

Skills are installed in `.agents/skills/` and `.opencode/skills/`.
Load them on demand when needed for specific tasks.

## Developer Skills

| Skill | Purpose | Load when... |
|-------|---------|-------------|
| **diagnosing-bugs** | Systematic debugging of hard bugs and regressions | Something is broken, throwing, failing, or slow |
| **playwright-best-practices** | Playwright E2E testing, flaky test fixes, Page Object Model | Writing or fixing Playwright tests |
| **tdd** | Test-driven development, red-green-refactor | Building features or fixing bugs test-first |
| **prototype** | Throwaway prototypes for design exploration | Need to flesh out a design quickly |
| **typescript-patterns** | TypeScript strict patterns, no any, branded types | Writing or reviewing TypeScript code |

## Process Skills

| Skill | Purpose | Load when... |
|-------|---------|-------------|
| **grill-with-docs** | Relentless design review that produces ADRs | Sharpening a plan or design |
| **handoff** | Compact conversation into handoff document | Another agent needs to pick up context |
| **improve-codebase-architecture** | Scan for architecture opportunities | Need to identify technical debt |
| **writing-great-skills** | Guide for authoring new skills | Creating or editing skill files |

## Project Skills (.opencode/skills/)

| Skill | Purpose |
|-------|---------|
| **automagically-game-architecture** | State ownership, scene lifecycle, update loop, composition rules |
| **automagically-testing** | Testing pyramid, deterministic clocks, seeded RNG |
| **automagically-audio** | AudioManager interface, Howler usage, scene cleanup |
| **automagically-assets-and-build** | PixiJS Assets bundles, manifest format, Vite config |
| **pixijs** | Router to 26 PixiJS v8 specialized sub-skills |

## PixiJS v8 Skills (26)

See `knowledge/pixijs/installed-skills.md` for the full list covering:
Application, core concepts, assets, events, filters, blend modes, color, math,
ticker, performance, accessibility, migration, environments, and all scene
objects (Sprite, Graphics, Text, Container, Mesh, ParticleContainer, etc).
