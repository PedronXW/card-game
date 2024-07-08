import { Game } from '../../../domain/entities/game'
import { GameMapper } from './game-mapper'

describe('Game Mapper', () => {
  it('should be able to transform domain Game in a prisma Game', async () => {
    const game = Game.create({})

    const transformed = GameMapper.toPersistence(game)

    expect(transformed).toEqual({
      id: game.id.getValue(),
      winner: game.winner,
      createdAt: game.createdAt,
      rounds: {
        connect: [],
      },
    })
  })

  it('should be able to transform a prisma Game in a domain Game', async () => {
    const game = Game.create({})

    const transformed = GameMapper.toDomain({
      id: game.id.getValue(),
      winner: game.winner,
      createdAt: game.createdAt,
      rounds: [],
    })

    expect(transformed).toEqual({
      _id: game.id,
      props: {
        createdAt: expect.any(Date),
        rounds: [],
        winner: 'RED',
      },
    })
  })
})
