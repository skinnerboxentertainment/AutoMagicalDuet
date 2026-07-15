# Jump Physics Engine — Parameter Model & Feel Techniques

A comprehensive 2D jump physics engine tuned for responsive platformer feel. Proven across 8 unit tests and multiple preset configurations.

## Parameter Model (MovementConfig)

### Ground Movement

| Parameter | Type | Range | Purpose |
|-----------|------|-------|---------|
| `maxSpeed` | number | 200-800 | Horizontal speed cap in pixels/sec |
| `acceleration` | number | 1000-5000 | Rate of ground speed increase |
| `deceleration` | number | 1000-5000 | Rate of ground speed decrease on release |
| `turnMultiplier` | number | 1.0-4.0 | Acceleration multiplier when reversing direction |

### Jump Core

| Parameter | Type | Range | Purpose |
|-----------|------|-------|---------|
| `jumpForce` | number | 500-1200 | Initial upward velocity applied on jump |
| `gravity` | number | 800-3500 | Downward acceleration in pixels/sec^2 |
| `fallGravityMultiplier` | number | 1.0-3.0 | Extra gravity applied during fall for snappy descent |
| `terminalVelocity` | number | 800-2500 | Maximum fall speed cap |

### Air Movement

| Parameter | Type | Range | Purpose |
|-----------|------|-------|---------|
| `airControl` | number | 0.0-1.0 | Fraction of ground acceleration available in air |
| `airFriction` | number | 0-1000 | Deceleration rate when no horizontal input in air |

### Release & Variable Height

| Parameter | Type | Range | Purpose |
|-----------|------|-------|---------|
| `jumpCancelMode` | enum | `none` \| `partial` \| `full` | Behavior when jump key is released mid-ascent |
| `minJumpHold` | number | 0-0.15 | Seconds the jump is force-held (prevents accidental short hops) |
| `maxJumpHold` | number | 0-0.5 | Maximum seconds jump can be held (controls variable height range) |
| `earlyReleaseGravityMultiplier` | number | 1.0-5.0 | Gravity multiplier applied during `partial` cancel |

### Feel & Juice

| Parameter | Type | Range | Purpose |
|-----------|------|-------|---------|
| `elasticity` | number | 0-2.0 | Intensity of squash-and-stretch deformation |
| `squashRecoveryRate` | number | 5-30 | Spring stiffness for returning to neutral shape |

### Assists

| Parameter | Type | Range | Purpose |
|-----------|------|-------|---------|
| `coyoteTime` | number | 0-0.2 | Seconds after leaving a ledge where jump still works |
| `jumpBuffer` | number | 0-0.2 | Seconds before landing where jump input is queued |

## Hybrid Automaton (Jump State Machine)

```
Ground → Rising_Controlled → Rising_Uncontrolled → Falling → Ground
         ↑                                                        |
         └────────────────── (landing on platform) ──────────────┘
```

- **Ground**: Player is on a platform. Coyote timer counts down when walking off.
- **Rising_Controlled**: Moving upward while jump key is held (capped by maxJumpHold). minJumpHold forces brief hold window.
- **Rising_Uncontrolled**: Moving upward after releasing jump key (or maxHold expired). Cancel mode applies here.
- **Falling**: Moving downward (vy > 0). Fall gravity multiplier applies.

### Jump Execution Logic

```
if jumpBufferTimer > 0 AND coyoteTimer > 0 AND not already jumping:
    vy = -jumpForce
    jumpBufferTimer = 0
    coyoteTimer = 0
    isJumping = true
    isGrounded = false
    jumpState = Rising_Controlled
```

## Fixed-Timestep Accumulator Pattern

Physics runs at 120 Hz in a Web Worker using `setInterval`. The main thread syncs input and receives state via message passing. This keeps simulation consistent regardless of render framerate.

```
tick():
    dtMs = performance.now() - lastTime
    dt = clamp(dtMs / 1000, 0, 0.1)     // cap at 100ms to prevent spiral-of-death
    accumulator += dt

    while accumulator >= FIXED_DT:       // FIXED_DT = 1/120
        applyPhysics(FIXED_DT)
        postMessage({ type: 'sync', player, particles })
        accumulator -= FIXED_DT
```

### Integration (Semi-Implicit Euler)

```
// Horizontal
vx += targetDir * acceleration * dt
vx = clamp(vx, -maxSpeed, maxSpeed)

// Deceleration when no input
if no horizontal input:
    vx = move_toward(vx, 0, deceleration * dt)

// Vertical
vy += gravity * fallGravityMultiplier * dt   // during fall
vy += gravity * earlyReleaseGravityMultiplier * dt  // during early release
vy = min(vy, terminalVelocity)

// Position
x += vx * dt
resolveCollisions(axis = 'x')
y += vy * dt
resolveCollisions(axis = 'y')
```

## AABB Collision Resolution

Per-axis resolution to prevent corner sticking. Hazard tiles trigger instant death with particle burst.

```
resolveCollisions(player, platforms, axis):
    for each platform:
        if AABB overlap:
            if platform.isHazard:
                player.isDead = true
                spawn death particles
                return

            if axis == 'x':
                push player out horizontally, vx = 0
            if axis == 'y' and vy > 0:
                player.y = platform.top - player.height
                player.isGrounded = true
                vy = 0
            if axis == 'y' and vy < 0:
                player.y = platform.bottom
                vy = 0
```

## Feel Techniques

### Variable Jump Height
Controlled by three parameters working together:
- `minJumpHold` — forces jump key treated as held for this window (prevents accidental short hops)
- `maxJumpHold` — caps hold time; beyond this, jump is treated as released
- `jumpCancelMode` — what happens on release:
  - `none`: jump arc is fixed regardless of release
  - `partial`: gravity multiplier applied during Rising_Uncontrolled (most common)
  - `full`: upward velocity zeroed immediately

### Coyote Time
A grace window after leaving a platform edge where jump still works. Prevents the feeling of "I pressed jump but I already walked off." Reset to full duration each frame the player is grounded. Counts down in air.

### Jump Buffer
A grace window where jump input is queued. If the player presses jump slightly before landing, the jump executes the instant they touch ground. Prevents "I pressed jump but nothing happened."

### Squash & Stretch (Volume-Preserving)
- **Skid**: SquashX widens, SquashY shortens (preserving volume: squashY = 1/squashX)
- **Takeoff**: SquashY stretches tall, SquashX narrows
- **Landing**: SquashY compresses short, SquashX widens. Only triggers on impactVelocity > 0.2 * terminalVelocity
- **Recovery**: Spring animation: `squashX += (1 - squashX) * recoveryRate * dt`

### Particle Juice

| Event | Particle Count | Color | Behavior |
|-------|---------------|-------|----------|
| Jump takeoff | 4 | zinc-400 | Burst downward from feet |
| Landing impact | 3-13 (scaled by velocity) | zinc-300 | Burst laterally from feet |
| Death | 30 | rose-500 | Explosion in all directions |

## 6 Preset Feel Profiles

### Fixed (Retro)
Mario-like fixed jump. No variable height, minimal air control, snappy ground movement. Gravity 2000, jumpForce 750, coyote 0.1s, buffer 0.1s.

### Balanced
Well-rounded modern platformer feel. Variable height via partial cancel, good air control (0.8), moderate gravity 1500, jumpForce 750, elasticity 1.0.

### Heavy
Slow, weighty character. Low acceleration 1200, high gravity 3000, high jumpForce 950, low air control 0.3, high terminal velocity 2000. Feels like a big character.

### Light
Fast, nimble character. High acceleration 4500, high deceleration 4500, jumpCancelMode: full, low gravity 1200, high air control 0.9, high elasticity 1.5. Feels like a small agile character.

### Floaty
Slow ascent, gentle gravity. Gravity 900, jumpForce 650, fallGravityMultiplier 1.2, airControl 1.0, long coyote 0.15s. Good for exploration or puzzle-platformers.

### Snappy
Fast ground response, sharp jump cancel. Acceleration 4500, deceleration 5000, earlyReleaseGravityMultiplier 4.0, gravity 2800, coyote 0.08s. Feels precise and responsive.

## Input Handling

### Keyboard
- Arrow keys or WASD for movement
- Space or Up/W for jump
- Single boolean per key, tracked as `pressed` state
- `jumpPressedThisFrame` is a one-frame flag set on key down, cleared after physics tick

### Gamepad
- Left stick X-axis for horizontal movement (deadzone processed)
- South button (A on Xbox, Cross on PlayStation) for jump
- Same jump buffer + coyote logic applies regardless of input device
- No distinction needed between keyboard and gamepad in the physics engine

## Trajectory Prediction

Simulates 4 jump variants forward in time using the same `applyPhysics()` function:

1. Forward Max Hold — moving forward, hold jump full duration
2. Forward Min Hold — moving forward, tap jump (min hold)
3. Neutral Max Hold — no horizontal input, hold jump
4. Neutral Min Hold — no horizontal input, tap jump

Each simulation runs until landing or 2.5s timeout. Results rendered as dotted arc lines with alpha based on current speed intensity. Uses 60 fps prediction step (not 120 — prediction accuracy is less critical than performance).

## References

- `src/gameplay/physics/movement.ts` — core physics integration
- `src/gameplay/physics/collision.ts` — AABB collision resolution
- `src/gameplay/physics/juice.ts` — particles, squash/stretch, death burst
- `src/gameplay/physics/predictor.ts` — trajectory simulation
- `src/gameplay/presets.ts` — 6 preset configurations
- `src/core/input/InputManager.ts` — keyboard + gamepad input
- `knowledge/game-design/jump-physics-engine.md` — this document
