import { InMemoryRoundRepository } from '../../../../test/in-memory-repositories/in-memory-round-repository'
import { EntityId } from '../../../@shared/entities/entity-id'
import { Attributes, Round } from '../../entities/round'
import { FetchRoundByIdService } from './fetch-rounds-by-id'

let sut: FetchRoundByIdService
let inMemoryRoundRepository: InMemoryRoundRepository

describe('Fetch Rounds By Id', () => {
  beforeEach(() => {
    inMemoryRoundRepository = new InMemoryRoundRepository()
    sut = new FetchRoundByIdService(inMemoryRoundRepository)
  })

  it('should be able to fetch rounds by id', async () => {
    const round = Round.create({
      blueCardsBeforeRound: ['a'],
      redCardsBeforeRound: ['a'],
      selectedAttribute: Attributes.MAX_SPEED,
      game: new EntityId('a'),
    })

    inMemoryRoundRepository.createRound(round)

    const response = await sut.execute({
      id: round.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(round)
  })
})
