import { InMemoryGameRepository } from '../../../../test/in-memory-repositories/in-memory-game-repository'
import { CreateGameService } from './create-game'

let sut: CreateGameService
let inMemoryGameRepository: InMemoryGameRepository

describe('Create Game', () => {
  beforeEach(() => {
    inMemoryGameRepository = new InMemoryGameRepository()
    sut = new CreateGameService(inMemoryGameRepository)
  })

  it('should be able to create a new game', async () => {
    const response = await sut.execute()

    expect(response.isRight()).toBeTruthy()
    expect(inMemoryGameRepository.games).toHaveLength(1)
    expect(inMemoryGameRepository.games[0]).toEqual(response.value)
  })
})
