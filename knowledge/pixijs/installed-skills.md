---
domain: pixijs
tags: [skills, reference, pixijs-v8]
triggers: [src/scenes/**, src/gameplay/renderer.ts, pixi.js]
related: [pixijs/scene-management, pixijs/rendering-pipeline, pixijs/asset-loading]
---

# Installed PixiJS v8 Skills

26 specialized PixiJS v8 skills are installed at `.agents/skills/pixijs-*/SKILL.md`.
The router skill `.agents/skills/pixijs/SKILL.md` provides the full index.

## Available Skills

### Foundations
- **pixijs-application** — App setup, `app.init()`, stage/renderer/canvas, resize
- **pixijs-core-concepts** — Renderer pipeline, WebGL/WebGPU/Canvas selection
- **pixijs-create** — Project scaffolding with create-pixi CLI
- **pixijs-environments** — Web Workers, Node/SSR, CSP contexts
- **pixijs-migration-v8** — Upgrading from v7, breaking changes

### Scene Objects
- **pixijs-scene-core-concepts** — Scene graph, containers vs leaves, transforms
- **pixijs-scene-container** — Container operations, children, masking, layers
- **pixijs-scene-sprite** — Sprite creation, textures, anchor, scale, tint
- **pixijs-scene-graphics** — Shape API (rect, circle, polygon, path), fills, strokes
- **pixijs-scene-text** — Text, BitmapText, HTML, styles, fonts, resolution
- **pixijs-scene-mesh** — Mesh, plane, rope, simple mesh, geometry, shader
- **pixijs-scene-particle-container** — ParticleContainer for performance
- **pixijs-scene-gif** — GifSprite for animated GIFs
- **pixijs-scene-dom-container** — Mix DOM elements into the scene graph

### Features
- **pixijs-assets** — Assets class, manifests, bundles, load, cache, spritesheets
- **pixijs-events** — EventSystem, pointer events, hitArea, event modes
- **pixijs-filters** — Filter, BlurFilter, ColorMatrix, custom shader filters
- **pixijs-blend-modes** — BlendMode enum, custom blend modes
- **pixijs-color** — Color class, conversion, gradients, palettes
- **pixijs-math** — Point, ObservablePoint, Matrix, Rectangle, transforms
- **pixijs-ticker** — Ticker, shared ticker, delta time, frame scheduling

### Advanced
- **pixijs-custom-rendering** — Custom renderer plugins, pipes, systems
- **pixijs-performance** — Optimization, draw calls, batching, GPU profiling
- **pixijs-accessibility** — Accessibility features, tab navigation, ARIA
- **pixijs-html-source** — HTMLSource, html` template literal, styled text

## Usage

Load a specific skill when needed. The router at `.agents/skills/pixijs/SKILL.md`
routes to the correct sub-skill based on the task description.

```bash
# Load the router to find the right sub-skill
opencode use-skill pixijs

# Or load a specific skill directly
opencode use-skill pixijs-scene-sprite
```
