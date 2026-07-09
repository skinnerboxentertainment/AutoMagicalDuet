import type { PlatformDefinition } from './level';

export interface PlayerInput {
  left: boolean;
  right: boolean;
  jump: boolean;
  restart: boolean;
}

export interface PlayerConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  jumpVelocity: number;
  gravity: number;
  maxFallSpeed: number;
}

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Player {
  readonly width: number;
  readonly height: number;

  x: number;
  y: number;
  vx = 0;
  vy = 0;
  grounded = false;

  private readonly spawnX: number;
  private readonly spawnY: number;
  private readonly speed: number;
  private readonly jumpVelocity: number;
  private readonly gravity: number;
  private readonly maxFallSpeed: number;
  private jumpWasDown = false;

  constructor(config: PlayerConfig) {
    this.spawnX = config.x;
    this.spawnY = config.y;
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
    this.speed = config.speed;
    this.jumpVelocity = config.jumpVelocity;
    this.gravity = config.gravity;
    this.maxFallSpeed = config.maxFallSpeed;
  }

  reset(): void {
    this.x = this.spawnX;
    this.y = this.spawnY;
    this.vx = 0;
    this.vy = 0;
    this.grounded = false;
    this.jumpWasDown = false;
  }

  update(deltaSeconds: number, input: PlayerInput, platforms: PlatformDefinition[]): void {
    const dt = Math.max(0, deltaSeconds);
    const direction = Number(input.right) - Number(input.left);
    this.vx = direction * this.speed;

    const jumpPressed = input.jump && !this.jumpWasDown;
    if (jumpPressed && this.grounded) {
      this.vy = -this.jumpVelocity;
      this.grounded = false;
    }
    this.jumpWasDown = input.jump;

    this.x += this.vx * dt;
    this.vy = Math.min(this.maxFallSpeed, this.vy + this.gravity * dt);
    this.y += this.vy * dt;

    this.resolvePlatformCollisions(platforms);
  }

  getBounds(): Bounds {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  private resolvePlatformCollisions(platforms: PlatformDefinition[]): void {
    this.grounded = false;

    for (const platform of platforms) {
      const bounds = this.getBounds();
      if (!intersects(bounds, platform)) {
        continue;
      }

      const previousBottom = bounds.y + bounds.height - this.vy / 60;
      const platformTop = platform.y;
      if (this.vy >= 0 && previousBottom <= platformTop + 8) {
        this.y = platformTop - this.height;
        this.vy = 0;
        this.grounded = true;
      }
    }
  }
}

export function intersects(a: Bounds, b: Bounds): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
