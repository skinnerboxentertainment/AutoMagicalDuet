import { PlayerState, Particle, MovementConfig } from "./types";

export function updateParticles(particles: Particle[], dt: number) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life -= dt;
    if (p.life <= 0) { particles.splice(i, 1); continue; }
    p.vy += 800 * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
  }
}

export function popDeathBurst(player: PlayerState, particles: Particle[]) {
  for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 200 + Math.random() * 300;
    particles.push({
      x: player.x + player.width / 2,
      y: player.y + player.height / 2,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0.4 + Math.random() * 0.4,
      maxLife: 0.8,
      color: "#f43f5e",
      size: Math.random() * 10 + 5,
    });
  }
}

export function spawnJumpDust(player: PlayerState, particles: Particle[]) {
  for (let i = 0; i < 4; i++) {
    particles.push({
      x: player.x + player.width / 2 + (Math.random() - 0.5) * 20,
      y: player.y + player.height,
      vx: (Math.random() - 0.5) * 100,
      vy: -Math.random() * 50 - 20,
      life: 0.3 + Math.random() * 0.2,
      maxLife: 0.5,
      color: "#a1a1aa",
      size: Math.random() * 6 + 4,
    });
  }
}

export function applySquashRecovery(player: PlayerState, config: MovementConfig, dt: number) {
  player.squashX += (1.0 - player.squashX) * config.squashRecoveryRate * dt;
  player.squashY += (1.0 - player.squashY) * config.squashRecoveryRate * dt;
}

export function applySkidSquash(player: PlayerState, config: MovementConfig) {
  const intensity = Math.min(1.0, Math.abs(player.vx) / config.maxSpeed);
  player.squashX = 1.0 + 0.3 * intensity * config.elasticity;
  player.squashY = 1.0 / player.squashX;
}

export function applyTakeoffSquash(player: PlayerState, config: MovementConfig) {
  player.squashY = 1.0 + 0.6 * config.elasticity;
  player.squashX = 1.0 / player.squashY;
}

export function applyLandingJuice(player: PlayerState, config: MovementConfig, impactVy: number, particles: Particle[]) {
  const intensity = Math.min(1.0, impactVy / config.terminalVelocity);
  if (intensity > 0.2) {
    player.squashY = Math.max(0.2, 1.0 - 0.5 * intensity * config.elasticity);
    player.squashX = 1.0 / player.squashY;
    const count = Math.floor(10 * intensity) + 3;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: player.x + player.width / 2,
        y: player.y + player.height,
        vx: (Math.random() > 0.5 ? 1 : -1) * (100 + Math.random() * 150 * intensity),
        vy: -Math.random() * 150 * intensity - 50,
        life: 0.3 + Math.random() * 0.3,
        maxLife: 0.6,
        color: "#d4d4d8",
        size: Math.random() * 8 + 4,
      });
    }
  }
}
