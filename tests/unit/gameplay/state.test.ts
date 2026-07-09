import { describe, expect, it } from 'vitest';
import { GameplayState } from '../../../src/gameplay/state';

describe('GameplayState', () => {
  it('tracks collected gems and score', () => {
    const state = new GameplayState(3);

    state.collectGem(100);
    state.collectGem(50);

    expect(state.score).toBe(150);
    expect(state.gemsCollected).toBe(2);
    expect(state.totalGems).toBe(3);
    expect(state.status).toBe('playing');
  });

  it('marks a win and ignores later score changes', () => {
    const state = new GameplayState(1);

    state.reachExit(500);
    state.collectGem(100);

    expect(state.score).toBe(500);
    expect(state.status).toBe('won');
  });

  it('resets after game over', () => {
    const state = new GameplayState(2);

    state.collectGem(100);
    state.gameOver();
    state.reset(4);

    expect(state.snapshot()).toEqual({
      score: 0,
      gemsCollected: 0,
      totalGems: 4,
      status: 'playing',
    });
  });
});
