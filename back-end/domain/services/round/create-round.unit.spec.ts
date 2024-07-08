import { InMemoryGameRepository } from '../../../../test/in-memory-repositories/in-memory-game-repository'
import { InMemoryRoundRepository } from '../../../../test/in-memory-repositories/in-memory-round-repository'
import { Game } from '../../entities/game'
import { Attributes, Round } from '../../entities/round'
import { CreateRoundService } from './create-round'

let sut: CreateRoundService
let inMemoryGameRepository: InMemoryGameRepository
let inMemoryRoundRepository: InMemoryRoundRepository

describe('Create Round', () => {
  beforeEach(() => {
    inMemoryGameRepository = new InMemoryGameRepository()
    inMemoryRoundRepository = new InMemoryRoundRepository()
    sut = new CreateRoundService(
      inMemoryRoundRepository,
      inMemoryGameRepository,
    )
  })

  it('should be able to create a round', async () => {
    const game = Game.create({})

    inMemoryGameRepository.createGame(game)

    const response = await sut.execute({
      game: game.id.getValue(),
      selectedAttribute: 'max_speed',
    })

    expect(response.isRight()).toBeTruthy()
    expect(inMemoryGameRepository.games).toHaveLength(1)
    expect(inMemoryGameRepository.games[0]).toEqual(game)
    expect(inMemoryRoundRepository.rounds[0]).toBeInstanceOf(Round)
    expect(inMemoryRoundRepository.rounds[0].game).toEqual(game.id)
    expect(inMemoryRoundRepository.rounds[0].selectedAttribute).toEqual(
      Attributes.MAX_SPEED,
    )
    expect(inMemoryRoundRepository.rounds[0].blueCardsBeforeRound).toEqual(
      expect.any(Array<string>),
    )
    expect(inMemoryRoundRepository.rounds[0].blueCardsBeforeRound).toHaveLength(
      5,
    )
    expect(inMemoryRoundRepository.rounds[0].redCardsBeforeRound).toEqual(
      expect.any(Array<string>),
    )
    expect(inMemoryRoundRepository.rounds[0].redCardsBeforeRound).toHaveLength(
      5,
    )
  })
})
