---
paths:
  - src/**
---

# Web / TypeScript Code Rules

- No direct DOM manipulation outside the designated UI layer (`src/ui/`)
- Memory profiling required for long-running sessions — monitor with `performance.memory` in dev
- Bundle size budgets: keep critical path under 200KB gzipped
- Canvas/WebGL context loss must be handled gracefully — re-create textures and re-render
- Service worker registration is optional but must not block first paint
- PWA manifest, offline fallback, and install prompt must be opt-in, not forced
- TypeScript strict mode required — no `any` except in type guard functions
- All async operations must have error boundaries — unhandled promise rejections crash the tab
- Use `requestAnimationFrame` for rendering, `requestIdleCallback` for non-critical work
- Never block the main thread — defer heavy computation to Web Workers or split across frames
