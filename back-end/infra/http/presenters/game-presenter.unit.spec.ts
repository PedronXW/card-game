import { Game } from '../../../domain/entities/game'
import { GamePresenter } from './game-presenter'

describe('Game Presenter', () => {
  it('should be able to transform domain Game in a prisma Game', async () => {
    const game = Game.create({})

    const transformed = GamePresenter.toHTTP(game)

    expect(transformed).toEqual({
      id: game.id.getValue(),
      winner: game.winner,
      createdAt: game.createdAt,
      rounds: [],
    })
  })
})
