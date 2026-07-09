import type { Bounds } from './player';

export interface GemDefinition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  points: number;
}

export class Gem {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly points: number;

  collected = false;

  constructor(definition: GemDefinition) {
    this.id = definition.id;
    this.x = definition.x;
    this.y = definition.y;
    this.width = definition.width;
    this.height = definition.height;
    this.points = definition.points;
  }

  getBounds(): Bounds {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  collect(): number {
    if (this.collected) {
      return 0;
    }

    this.collected = true;
    return this.points;
  }
}
