import { InMemoryGameRepository } from '../../../../test/in-memory-repositories/in-memory-game-repository'
import { Game, Side } from '../../entities/game'
import { SelectAWinnerService } from './select-a-winner'

let sut: SelectAWinnerService
let inMemoryGameRepository: InMemoryGameRepository

describe('Fetch Games', () => {
  beforeEach(() => {
    inMemoryGameRepository = new InMemoryGameRepository()
    sut = new SelectAWinnerService(inMemoryGameRepository)
  })

  it('should be able to fetch games', async () => {
    const game = Game.create({})

    inMemoryGameRepository.createGame(game)

    const response = await sut.execute({
      game: game.id.getValue(),
      winner: 'BLUE',
    })

    expect(response.isRight()).toBeTruthy()
    expect(inMemoryGameRepository.games).toHaveLength(1)
    expect(inMemoryGameRepository.games[0]).toEqual(game)
    expect(inMemoryGameRepository.games[0].winner).toEqual(Side.BLUE)
  })
})
