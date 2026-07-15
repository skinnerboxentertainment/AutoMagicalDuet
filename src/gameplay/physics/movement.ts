import { MovementConfig, PlayerState, Platform, InputState, Particle } from "./types";
import { resolveCollisions } from "./collision";
import {
  updateParticles, applySquashRecovery, applySkidSquash,
  applyTakeoffSquash, applyLandingJuice, spawnJumpDust,
} from "./juice";

const RESPAWN_X = 100;
const RESPAWN_Y = 980;

export function applyPhysics(
  player: PlayerState,
  config: MovementConfig,
  input: InputState,
  dt: number,
  platforms: Platform[],
  particles: Particle[],
) {
  updateParticles(particles, dt);

  if (player.isDead) {
    player.deathTimer -= dt;
    if (player.deathTimer <= 0) {
      player.isDead = false;
      player.x = RESPAWN_X;
      player.y = RESPAWN_Y;
      player.vx = 0;
      player.vy = 0;
      player.squashX = 1;
      player.squashY = 1;
      player.currentJumpTime = 0;
      player.jumpState = "Ground";
      player.trail = [];
    }
    return;
  }

  applySquashRecovery(player, config, dt);

  if (player.isGrounded) {
    player.coyoteTimer = config.coyoteTime;
    player.airJumpsUsed = 0;
    player.wallDir = 0;
  } else {
    player.coyoteTimer -= dt;
  }

  if (input.jumpPressedThisFrame) player.jumpBufferTimer = config.jumpBuffer;
  else player.jumpBufferTimer -= dt;

  const dir = (input.right ? 1 : 0) - (input.left ? 1 : 0);
  let accel = config.acceleration;
  if (!player.isGrounded) accel *= config.airControl;

  if (dir !== 0) {
    if (Math.sign(dir) !== Math.sign(player.vx) && player.vx !== 0 && player.isGrounded) {
      accel *= config.turnMultiplier;
      applySkidSquash(player, config);
    }
    player.vx += dir * accel * dt;
    if (Math.abs(player.vx) > config.maxSpeed)
      player.vx = Math.sign(player.vx) * config.maxSpeed;
  } else {
    const decel = player.isGrounded ? config.deceleration : config.airFriction;
    if (player.vx > 0) player.vx = Math.max(0, player.vx - decel * dt);
    else if (player.vx < 0) player.vx = Math.min(0, player.vx + decel * dt);
  }

  const isPressingIntoWall = !player.isGrounded && player.wallDir !== 0 && dir === player.wallDir
  player.isWallSliding = isPressingIntoWall && player.vy >= 0

  if (player.isWallSliding) {
    player.airJumpsUsed = 0
  }

  const canGroundJump = player.jumpBufferTimer > 0 && player.coyoteTimer > 0 && !player.isJumping
  const canAirJump = config.maxAirJumps > 0 && player.airJumpsUsed < config.maxAirJumps && input.jumpPressedThisFrame
  const canWallJump = player.isWallSliding && input.jumpPressedThisFrame && config.wallJumpForce > 0

  if (canGroundJump || canAirJump || canWallJump) {
    player.vy = -config.jumpForce;
    player.jumpBufferTimer = 0;
    player.coyoteTimer = 0;

    if (canWallJump) {
      player.vx = -player.wallDir * config.wallJumpHorizontal;
      player.vy = -config.wallJumpForce;
      player.airJumpsUsed = 0;
      player.wallDir = 0;
    } else if (!canAirJump) {
      player.isJumping = true;
    } else {
      player.airJumpsUsed++;
      player.isJumping = true;
    }

    player.isGrounded = false;
    player.currentJumpTime = 0;
    player.jumpState = "Rising_Controlled";
    applyTakeoffSquash(player, config);
    spawnJumpDust(player, particles);
  }

  if (player.isJumping) player.currentJumpTime += dt;

  let virtualHold = input.jump;
  if (player.isJumping) {
    if (player.currentJumpTime < config.minJumpHold) virtualHold = true;
    if (config.maxJumpHold > 0 && player.currentJumpTime >= config.maxJumpHold) virtualHold = false;
  } else {
    virtualHold = false;
  }

  if (!player.isGrounded) {
    if (player.vy < 0)
      player.jumpState = virtualHold ? "Rising_Controlled" : "Rising_Uncontrolled";
    else
      player.jumpState = "Falling";
  } else {
    player.jumpState = "Ground";
  }

  let gravity = config.gravity;
  if (player.isWallSliding) {
    gravity *= config.wallSlideGravity;
  } else if (player.vy > 0) {
    gravity *= config.fallGravityMultiplier;
  } else if (player.jumpState === "Rising_Uncontrolled") {
    if (config.jumpCancelMode === "partial") gravity *= config.earlyReleaseGravityMultiplier;
    else if (config.jumpCancelMode === "full") player.vy = 0;
  }

  const oldVy = player.vy;
  player.vy += gravity * dt;
  if (player.vy > config.terminalVelocity) player.vy = config.terminalVelocity;

  player.wallDir = 0;
  player.x += player.vx * dt;
  resolveCollisions(player, platforms, particles, "x");

  player.y += player.vy * dt;
  const wasGrounded = player.isGrounded;
  resolveCollisions(player, platforms, particles, "y");

  if (player.isGrounded && !wasGrounded) {
    player.isJumping = false;
    player.wallDir = 0;
    applyLandingJuice(player, config, oldVy, particles);
  }

  if (!player.isWallSliding && !player.isGrounded && player.wallDir === 0) {
    player.isWallSliding = false;
  }

  player.trail.push({ x: player.x + player.width / 2, y: player.y + player.height / 2 });
  if (player.trail.length > 30) player.trail.shift();
}
