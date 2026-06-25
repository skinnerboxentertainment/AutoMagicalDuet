---
paths:
  - assets/shaders/**
---

# Shader Code Standards

All shader files in `assets/shaders/` must follow these standards to maintain
visual quality, performance, and cross-platform compatibility. PixiJS uses
GLSL (WebGL) or WGSL (WebGPU) for custom filters and shaders.

## Naming Conventions
- File naming: `[type]_[category]_[name].[ext]`
  - `filter_blur_glow.glsl` (GLSL filter)
  - `shader_env_water.wgsl` (WGSL shader)
- Use descriptive names that indicate the material purpose
- Prefix with type: `filter_`, `shader_`, `post_`

## PixiJS Patterns

- Use `Filter.from()` for inline filter creation in PixiJS v8
- Custom shaders extend `Filter` class or use `FilterSystem.from()`
- Pass uniforms via `filter.uniforms` object
- Use `sprite.shader` or `container.filterArea` for per-object effects
- Prefer PixiJS built-in filters where they meet the visual requirement

## Code Quality
- All uniforms/parameters must have descriptive names
- Group related parameters in comment blocks
- Comment non-obvious calculations (especially math-heavy sections)
- No magic numbers — use named constants or documented uniform values

## Performance Requirements
- Document the target platform and complexity budget for each shader
- Use appropriate precision: `mediump` on WebGL where full precision isn't needed
- Minimize texture samples in fragment shaders (WebGL)
- Avoid dynamic branching in fragment shaders
- No texture reads inside loops
- Two-pass approach for blur effects (horizontal then vertical)

## Cross-Platform
- Provide fallback if WebGPU is not available (WebGL2 fallback)
- Test WebGL2 and WebGPU variants where applicable
- PixiJS handles context fallback — shaders must be re-creatable on context loss
- Do not use WebGPU-only features without a WebGL2 fallback

## Variant Management
- Minimize shader variants — each variant is a separate compiled shader
- Log and monitor total filter count per frame
