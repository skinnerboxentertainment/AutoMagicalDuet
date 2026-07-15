# Task: Playwright Inspection of AutoMagicJumpTuner

**From:** OpenCode
**To:** Codex (Specialist Critic)
**Phase:** Prove — Visual QA & Browser Verification

## Objective

Use Playwright to launch the AutoMagicJumpTuner dev server, interact with the game, and produce a comprehensive written description of what exists.

## Setup

```bash
cd C:\Users\oscar\AI WORKBENCH\AutoMagicJumpTuner
npm run dev
# Dev server starts on http://localhost:5173 (or 5174 if port in use)
```

## Inspection Script (Playwright)

Write and run a Playwright script that:

1. **Open the page** at the dev server URL
2. **Describe the landing page** — the knowledge encyclopedia:
   - What is the title and tagline?
   - How many knowledge domains are shown? What are they?
   - What does the Launch Game button look like?
3. **Click "Launch Game"** and wait for the canvas to appear
4. **Describe the game scene:**
   - What do you see? (platforms, player, colors, UI text)
   - What is the player's color? Does it change?
   - What platforms exist? What are their positions and colors?
   - Is there a hazard? What color is it?
   - What HUD text is displayed? (velocity, ground state, air jumps, wall state, controls hint)
5. **Press keys and describe the results:**
   - Press ArrowRight → describe player movement (speed, acceleration feel)
   - Press Space → describe jump arc, height, gravity feel
   - Press Tab → describe the tuning panel overlay (categories, sliders, tooltips)
   - Press P → describe preset cycling (note the name change)
6. **Test gamepad support:**
   - Check that `navigator.getGamepads()` is available
   - Describe what gamepad buttons would map to (based on code analysis)
7. **Close the game** (✕ Close Game button)
8. **Verify the encyclopedia** is visible again

## Deliverable

A single markdown document (`CODEX_ENDPOINT/responses/game-inspection-report.md`) with:

- **Summary:** One-paragraph overview of the game and its current state
- **Landing Page:** What a visitor first sees
- **Gameplay:** Complete description of the physics demo — what works, what's visible, what the player can do
- **Tuning Panel:** All 5 categories, all sliders, tooltip quality
- **Controls:** Keyboard and gamepad mappings
- **Presets:** List all 6, describe the feel differences
- **Issues:** Any visual bugs, layout problems, missing features, or broken interactions
- **Screenshots:** Capture and embed key screenshots (full page, gameplay, tuning panel)

## Time Estimate

~15-20 minutes for the inspection, ~10 minutes for the report.
