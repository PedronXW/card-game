import { InMemoryRoundRepository } from '../../../../test/in-memory-repositories/in-memory-round-repository'
import { EntityId } from '../../../@shared/entities/entity-id'
import { Attributes, Round } from '../../entities/round'
import { FetchRoundByGameService } from './fetch-rounds-by-game'

let sut: FetchRoundByGameService
let inMemoryRoundRepository: InMemoryRoundRepository

describe('Fetch Rounds By Game', () => {
  beforeEach(() => {
    inMemoryRoundRepository = new InMemoryRoundRepository()
    sut = new FetchRoundByGameService(inMemoryRoundRepository)
  })

  it('should be able to fetch rounds by game', async () => {
    inMemoryRoundRepository.createRound(
      Round.create({
        blueCardsBeforeRound: ['a'],
        redCardsBeforeRound: ['a'],
        selectedAttribute: Attributes.MAX_SPEED,
        game: new EntityId('a'),
      }),
    )

    const response = await sut.execute({
      gameId: 'a',
      limit: 1,
      page: 1,
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({
      rounds: [
        expect.objectContaining({
          blueCardsBeforeRound: ['a'],
          redCardsBeforeRound: ['a'],
          selectedAttribute: Attributes.MAX_SPEED,
          game: new EntityId('a'),
        }),
      ],
      totalRoundsCount: 1,
    })
  })
})
