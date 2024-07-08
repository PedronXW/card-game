import { InMemoryGameRepository } from '../../../../test/in-memory-repositories/in-memory-game-repository'
import { Game } from '../../entities/game'
import { FetchGameByIdService } from './fetch-games-by-id'

let sut: FetchGameByIdService
let inMemoryGameRepository: InMemoryGameRepository

describe('Fetch Games', () => {
  beforeEach(() => {
    inMemoryGameRepository = new InMemoryGameRepository()
    sut = new FetchGameByIdService(inMemoryGameRepository)
  })

  it('should be able to fetch games', async () => {
    const game = Game.create({})

    inMemoryGameRepository.createGame(game)

    const response = await sut.execute({ id: game.id.getValue() })

    expect(response.isRight()).toBeTruthy()
    expect(inMemoryGameRepository.games).toHaveLength(1)
    expect(inMemoryGameRepository.games[0]).toEqual(game)
    expect(response.value).toEqual(game)
  })
})
