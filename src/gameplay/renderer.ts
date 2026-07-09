import * as PIXI from 'pixi.js';
import type { Level } from './level';
import type { Player } from './player';
import type { GameplayState } from './state';

export class PlatformerRenderer {
  readonly root = new PIXI.Container();

  private readonly world = new PIXI.Container();
  private readonly hud = new PIXI.Container();
  private readonly playerView = new PIXI.Graphics();
  private readonly enemyView = new PIXI.Graphics();
  private readonly gemViews = new Map<string, PIXI.Graphics>();
  private readonly message = new PIXI.Text({ text: '', style: { fill: 0xffffff, fontSize: 28, fontWeight: '700' } });
  private readonly score = new PIXI.Text({ text: '', style: { fill: 0xffffff, fontSize: 18, fontWeight: '600' } });

  constructor(private readonly level: Level) {
    this.root.addChild(this.world, this.hud);
    this.drawStaticLevel();
    this.world.addChild(this.playerView, this.enemyView);
    this.hud.addChild(this.score, this.message);
    this.score.position.set(16, 12);
    this.message.anchor.set(0.5);
    this.message.position.set(400, 160);
  }

  update(player: Player, state: GameplayState): void {
    this.drawPlayer(player);
    this.drawEnemy();
    this.updateGems();
    this.score.text = `Score ${state.score}  Gems ${state.gemsCollected}/${state.totalGems}`;

    if (state.status === 'won') {
      this.message.text = 'Exit reached';
    } else if (state.status === 'game-over') {
      this.message.text = 'Game over - press R';
    } else {
      this.message.text = '';
    }
  }

  private drawStaticLevel(): void {
    const background = new PIXI.Graphics();
    background.rect(0, 0, this.level.width, this.level.height).fill(0x172033);
    this.world.addChild(background);

    for (const platform of this.level.platforms) {
      const view = new PIXI.Graphics();
      view.rect(platform.x, platform.y, platform.width, platform.height).fill(0x6f7d55);
      this.world.addChild(view);
    }

    const exit = new PIXI.Graphics();
    exit.rect(this.level.exit.x, this.level.exit.y, this.level.exit.width, this.level.exit.height).fill(0x58c4dd);
    this.world.addChild(exit);

    for (const gem of this.level.gems) {
      const view = new PIXI.Graphics();
      this.gemViews.set(gem.id, view);
      this.world.addChild(view);
    }
  }

  private drawPlayer(player: Player): void {
    this.playerView.clear();
    this.playerView.rect(player.x, player.y, player.width, player.height).fill(0xf0d35c);
  }

  private drawEnemy(): void {
    const enemy = this.level.enemy;
    this.enemyView.clear();
    this.enemyView.rect(enemy.x, enemy.y, enemy.width, enemy.height).fill(0xd94f4f);
  }

  private updateGems(): void {
    for (const gem of this.level.gems) {
      const view = this.gemViews.get(gem.id);
      if (!view) {
        continue;
      }

      view.visible = !gem.collected;
      view.clear();
      if (!gem.collected) {
        view.circle(gem.x + gem.width / 2, gem.y + gem.height / 2, gem.width / 2).fill(0x72e06a);
      }
    }
  }
}
