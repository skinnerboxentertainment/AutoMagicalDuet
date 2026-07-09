import * as PIXI from 'pixi.js';
import type { Level } from './level';
import type { Player } from './player';
import type { GameplayState } from './state';

export interface GameplayTextures {
  player: PIXI.Texture;
  platform: PIXI.Texture;
  gem: PIXI.Texture;
  enemy: PIXI.Texture;
  exit: PIXI.Texture;
  background: PIXI.Texture;
}

export class PlatformerRenderer {
  readonly root = new PIXI.Container();

  private readonly world = new PIXI.Container();
  private readonly hud = new PIXI.Container();
  private readonly playerView: PIXI.Sprite;
  private readonly enemyView: PIXI.Sprite;
  private readonly gemViews = new Map<string, PIXI.Sprite>();
  private readonly message = new PIXI.Text({ text: '', style: { fill: 0xffffff, fontSize: 28, fontWeight: '700' } });
  private readonly score = new PIXI.Text({ text: '', style: { fill: 0xffffff, fontSize: 18, fontWeight: '600' } });

  constructor(
    private readonly level: Level,
    private readonly textures: GameplayTextures,
  ) {
    this.playerView = new PIXI.Sprite(textures.player);
    this.enemyView = new PIXI.Sprite(textures.enemy);
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
    const background = new PIXI.Sprite(this.textures.background);
    background.width = this.level.width;
    background.height = this.level.height;
    this.world.addChild(background);

    for (const platform of this.level.platforms) {
      const view = new PIXI.TilingSprite({
        texture: this.textures.platform,
        width: platform.width,
        height: platform.height,
      });
      view.position.set(platform.x, platform.y);
      this.world.addChild(view);
    }

    const exit = new PIXI.Sprite(this.textures.exit);
    exit.position.set(this.level.exit.x, this.level.exit.y);
    exit.width = this.level.exit.width;
    exit.height = this.level.exit.height;
    this.world.addChild(exit);

    for (const gem of this.level.gems) {
      const view = new PIXI.Sprite(this.textures.gem);
      view.position.set(gem.x, gem.y);
      view.width = gem.width;
      view.height = gem.height;
      this.gemViews.set(gem.id, view);
      this.world.addChild(view);
    }
  }

  private drawPlayer(player: Player): void {
    this.playerView.position.set(player.x, player.y);
    this.playerView.width = player.width;
    this.playerView.height = player.height;
  }

  private drawEnemy(): void {
    const enemy = this.level.enemy;
    this.enemyView.position.set(enemy.x, enemy.y);
    this.enemyView.width = enemy.width;
    this.enemyView.height = enemy.height;
  }

  private updateGems(): void {
    for (const gem of this.level.gems) {
      const view = this.gemViews.get(gem.id);
      if (!view) {
        continue;
      }

      view.visible = !gem.collected;
    }
  }
}
