import { InMemoryGameRepository } from '../../../../test/in-memory-repositories/in-memory-game-repository'
import { Game } from '../../entities/game'
import { FetchGameService } from './fetch-games'

let sut: FetchGameService
let inMemoryGameRepository: InMemoryGameRepository

describe('Fetch Games', () => {
  beforeEach(() => {
    inMemoryGameRepository = new InMemoryGameRepository()
    sut = new FetchGameService(inMemoryGameRepository)
  })

  it('should be able to fetch games', async () => {
    const game = Game.create({})

    inMemoryGameRepository.createGame(game)

    const response = await sut.execute({ page: 1, limit: 1 })

    expect(response.isRight()).toBeTruthy()
    expect(inMemoryGameRepository.games).toHaveLength(1)
    expect(inMemoryGameRepository.games[0]).toEqual(game)
  })
})
