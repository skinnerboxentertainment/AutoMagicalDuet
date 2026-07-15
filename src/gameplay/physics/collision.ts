import { PlayerState, Platform, Particle } from "./types";
import { popDeathBurst } from "./juice";

export function resolveCollisions(
  player: PlayerState,
  platforms: Platform[],
  particles: Particle[],
  axis: "x" | "y"
) {
  if (axis === "y") player.isGrounded = false;

  for (const p of platforms) {
    if (
      player.x < p.x + p.width &&
      player.x + player.width > p.x &&
      player.y < p.y + p.height &&
      player.y + player.height > p.y
    ) {
      if (p.isHazard) {
        player.isDead = true;
        player.deathTimer = 0.5;
        popDeathBurst(player, particles);
        return;
      }

      if (axis === "x") {
        if (player.vx > 0) {
          player.x = p.x - player.width;
          player.wallDir = 1;
        } else if (player.vx < 0) {
          player.x = p.x + p.width;
          player.wallDir = -1;
        }
        player.vx = 0;
      } else if (axis === "y") {
        if (player.vy > 0) {
          player.y = p.y - player.height;
          player.isGrounded = true;
        } else if (player.vy < 0) {
          player.y = p.y + p.height;
        }
        player.vy = 0;
      }
    }
  }
}
