import { Enemy, type EnemyDefinition } from './enemy';
import { Gem, type GemDefinition } from './gem';
import type { Bounds, PlayerConfig } from './player';

export interface PlatformDefinition extends Bounds {
  id: string;
}

export interface LevelDefinition {
  id: string;
  name: string;
  width: number;
  height: number;
  player: PlayerConfig;
  platforms: PlatformDefinition[];
  gems: GemDefinition[];
  enemy: EnemyDefinition;
  exit: Bounds;
}

export class Level {
  readonly id: string;
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly player: PlayerConfig;
  readonly platforms: PlatformDefinition[];
  readonly gems: Gem[];
  readonly enemy: Enemy;
  readonly exit: Bounds;

  constructor(definition: LevelDefinition) {
    this.id = definition.id;
    this.name = definition.name;
    this.width = definition.width;
    this.height = definition.height;
    this.player = definition.player;
    this.platforms = definition.platforms;
    this.gems = definition.gems.map((gem) => new Gem(gem));
    this.enemy = new Enemy(definition.enemy);
    this.exit = definition.exit;
  }

  reset(): void {
    for (const gem of this.gems) {
      gem.collected = false;
    }

    this.enemy.reset();
  }

  get totalGems(): number {
    return this.gems.length;
  }
}
