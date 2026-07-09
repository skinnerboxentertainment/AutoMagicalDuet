import type { Bounds } from './player';

export interface EnemyDefinition {
  x: number;
  y: number;
  width: number;
  height: number;
  minX: number;
  maxX: number;
  speed: number;
}

export class Enemy {
  readonly width: number;
  readonly height: number;
  readonly minX: number;
  readonly maxX: number;
  readonly speed: number;

  x: number;
  y: number;
  direction = 1;

  private readonly spawnX: number;

  constructor(definition: EnemyDefinition) {
    this.x = definition.x;
    this.y = definition.y;
    this.spawnX = definition.x;
    this.width = definition.width;
    this.height = definition.height;
    this.minX = definition.minX;
    this.maxX = definition.maxX;
    this.speed = definition.speed;
  }

  reset(): void {
    this.x = this.spawnX;
    this.direction = 1;
  }

  update(deltaSeconds: number): void {
    this.x += this.direction * this.speed * Math.max(0, deltaSeconds);

    if (this.x <= this.minX) {
      this.x = this.minX;
      this.direction = 1;
    } else if (this.x + this.width >= this.maxX) {
      this.x = this.maxX - this.width;
      this.direction = -1;
    }
  }

  getBounds(): Bounds {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }
}
