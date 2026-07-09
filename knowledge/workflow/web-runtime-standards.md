---
domain: workflow
tags: [web, runtime, performance]
triggers: [src/**, vite.config.ts, public/**]
related: [pixijs/rendering-pipeline, workflow/verification-gate]
---

# Web Runtime Standards

Browser games must protect first paint, avoid main-thread stalls, and recover gracefully from web platform failures.

## Patterns

- Keep critical-path bundle size under the project budget, defaulting to 200KB gzipped unless revised.
- Handle Canvas/WebGL context loss by recreating textures and rendering state.
- Add error boundaries for async operations.
- Use Web Workers or frame-splitting for heavy computation.
- Use `requestIdleCallback` for non-critical work when available.
- Treat service worker, PWA manifest, offline fallback, and install prompt as opt-in features.

## Anti-patterns

- Direct DOM manipulation outside the UI layer.
- Unhandled promise rejections.
- Blocking first paint for optional PWA/service-worker work.
- Long-running synchronous computation on the main thread.

## References

- `.opencode/rules/web-code.md`
- `.opencode/agents/devops-engineer.md`
