export type PlayStatus = 'playing' | 'won' | 'game-over';

export interface GameplayStateSnapshot {
  score: number;
  gemsCollected: number;
  totalGems: number;
  status: PlayStatus;
}

export class GameplayState {
  private scoreValue = 0;
  private gemsCollectedValue = 0;
  private totalGemsValue: number;
  private statusValue: PlayStatus = 'playing';

  constructor(totalGems = 0) {
    this.totalGemsValue = Math.max(0, totalGems);
  }

  get score(): number {
    return this.scoreValue;
  }

  get gemsCollected(): number {
    return this.gemsCollectedValue;
  }

  get totalGems(): number {
    return this.totalGemsValue;
  }

  get status(): PlayStatus {
    return this.statusValue;
  }

  get isPlaying(): boolean {
    return this.statusValue === 'playing';
  }

  reset(totalGems = this.totalGemsValue): void {
    this.scoreValue = 0;
    this.gemsCollectedValue = 0;
    this.totalGemsValue = Math.max(0, totalGems);
    this.statusValue = 'playing';
  }

  collectGem(points: number): void {
    if (!this.isPlaying) {
      return;
    }

    this.gemsCollectedValue += 1;
    this.scoreValue += Math.max(0, points);
  }

  reachExit(exitBonus: number): void {
    if (!this.isPlaying) {
      return;
    }

    this.scoreValue += Math.max(0, exitBonus);
    this.statusValue = 'won';
  }

  gameOver(): void {
    if (!this.isPlaying) {
      return;
    }

    this.statusValue = 'game-over';
  }

  snapshot(): GameplayStateSnapshot {
    return {
      score: this.scoreValue,
      gemsCollected: this.gemsCollectedValue,
      totalGems: this.totalGemsValue,
      status: this.statusValue,
    };
  }
}
