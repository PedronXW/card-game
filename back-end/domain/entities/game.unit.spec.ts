import { Game, Side } from './game'

describe('Game', () => {
  it('should be able to create a new game', () => {
    const game = Game.create({
      winner: Side.RED,
    })

    expect(game.winner).toBe(Side.RED)
  })
})
