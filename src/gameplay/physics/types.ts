export interface MovementConfig {
  maxSpeed: number;
  acceleration: number;
  deceleration: number;
  turnMultiplier: number;
  jumpForce: number;
  gravity: number;
  fallGravityMultiplier: number;
  terminalVelocity: number;
  airControl: number;
  airFriction: number;
  jumpCancelMode: "none" | "partial" | "full";
  minJumpHold: number;
  maxJumpHold: number;
  earlyReleaseGravityMultiplier: number;
  elasticity: number;
  squashRecoveryRate: number;
  coyoteTime: number;
  jumpBuffer: number;
  maxAirJumps: number;
  wallSlideGravity: number;
  wallJumpForce: number;
  wallJumpHorizontal: number;
}

export interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  color: string; size: number;
}

export interface PlayerState {
  x: number; y: number;
  vx: number; vy: number;
  width: number; height: number;
  isGrounded: boolean;
  isJumping: boolean;
  wasJumping: boolean;
  coyoteTimer: number;
  jumpBufferTimer: number;
  trail: { x: number; y: number }[];
  squashX: number; squashY: number;
  isDead: boolean;
  deathTimer: number;
  currentJumpTime: number;
  jumpState: "Ground" | "Rising_Controlled" | "Rising_Uncontrolled" | "Falling";
  jumpStartHeight: number;
  jumpStartX: number;
  jumpStartTime: number;
  peakHeight: number;
  airJumpsUsed: number;
  isWallSliding: boolean;
  wallDir: number;
}

export interface Platform {
  x: number; y: number;
  width: number; height: number;
  isHazard?: boolean;
}

export interface InputState {
  left: boolean; right: boolean;
  up: boolean; down: boolean;
  jump: boolean;
  jumpPressedThisFrame: boolean;
}
