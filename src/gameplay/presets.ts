import { MovementConfig } from "./physics/types";

export const PRESETS: Record<string, MovementConfig> = {
  "Fixed (Retro)": {
    maxSpeed: 300, acceleration: 2000, deceleration: 2500, turnMultiplier: 1.0,
    jumpForce: 750, gravity: 2000, fallGravityMultiplier: 1.0, terminalVelocity: 1200,
    airControl: 0.2, airFriction: 100,
    jumpCancelMode: "none", minJumpHold: 0, maxJumpHold: 0, earlyReleaseGravityMultiplier: 1.0,
    elasticity: 0.1, squashRecoveryRate: 20, coyoteTime: 0.1, jumpBuffer: 0.1, maxAirJumps: 0,
    wallSlideGravity: 0.3, wallJumpForce: 0, wallJumpHorizontal: 0,
  },
  Balanced: {
    maxSpeed: 450, acceleration: 2000, deceleration: 2500, turnMultiplier: 2.0,
    jumpForce: 750, gravity: 1500, fallGravityMultiplier: 1.5, terminalVelocity: 1200,
    airControl: 0.8, airFriction: 400,
    jumpCancelMode: "partial", minJumpHold: 0.05, maxJumpHold: 0.35, earlyReleaseGravityMultiplier: 2.5,
    elasticity: 1.0, squashRecoveryRate: 15, coyoteTime: 0.1, jumpBuffer: 0.1, maxAirJumps: 0,
    wallSlideGravity: 0.3, wallJumpForce: 0, wallJumpHorizontal: 0,
  },
  Heavy: {
    maxSpeed: 600, acceleration: 1200, deceleration: 1500, turnMultiplier: 1.2,
    jumpForce: 950, gravity: 3000, fallGravityMultiplier: 2.5, terminalVelocity: 2000,
    airControl: 0.3, airFriction: 100,
    jumpCancelMode: "partial", minJumpHold: 0.1, maxJumpHold: 0.4, earlyReleaseGravityMultiplier: 3.0,
    elasticity: 0.3, squashRecoveryRate: 10, coyoteTime: 0.1, jumpBuffer: 0.1, maxAirJumps: 0,
    wallSlideGravity: 0.3, wallJumpForce: 0, wallJumpHorizontal: 0,
  },
  Light: {
    maxSpeed: 400, acceleration: 4500, deceleration: 4500, turnMultiplier: 3.0,
    jumpForce: 650, gravity: 1200, fallGravityMultiplier: 1.5, terminalVelocity: 900,
    airControl: 0.9, airFriction: 800,
    jumpCancelMode: "full", minJumpHold: 0, maxJumpHold: 0.25, earlyReleaseGravityMultiplier: 1.5,
    elasticity: 1.5, squashRecoveryRate: 12, coyoteTime: 0.15, jumpBuffer: 0.15, maxAirJumps: 0,
    wallSlideGravity: 0.3, wallJumpForce: 0, wallJumpHorizontal: 0,
  },
  Floaty: {
    maxSpeed: 400, acceleration: 1500, deceleration: 1500, turnMultiplier: 1.5,
    jumpForce: 650, gravity: 900, fallGravityMultiplier: 1.2, terminalVelocity: 800,
    airControl: 1.0, airFriction: 200,
    jumpCancelMode: "partial", minJumpHold: 0.1, maxJumpHold: 0.45, earlyReleaseGravityMultiplier: 1.8,
    elasticity: 0.5, squashRecoveryRate: 25, coyoteTime: 0.15, jumpBuffer: 0.15, maxAirJumps: 0,
    wallSlideGravity: 0.3, wallJumpForce: 0, wallJumpHorizontal: 0,
  },
  Snappy: {
    maxSpeed: 500, acceleration: 4500, deceleration: 5000, turnMultiplier: 3.5,
    jumpForce: 850, gravity: 2800, fallGravityMultiplier: 1.9, terminalVelocity: 2000,
    airControl: 0.9, airFriction: 500,
    jumpCancelMode: "partial", minJumpHold: 0, maxJumpHold: 0.25, earlyReleaseGravityMultiplier: 4.0,
    elasticity: 1.2, squashRecoveryRate: 8, coyoteTime: 0.08, jumpBuffer: 0.08, maxAirJumps: 0,
    wallSlideGravity: 0.3, wallJumpForce: 0, wallJumpHorizontal: 0,
  },
};

export const PRESET_NAMES = Object.keys(PRESETS);
