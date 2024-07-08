import { cards } from '../../../../lib/cards'
import { InMemoryGameRepository } from '../../../../test/in-memory-repositories/in-memory-game-repository'
import { InMemoryRoundRepository } from '../../../../test/in-memory-repositories/in-memory-round-repository'
import { EntityId } from '../../../@shared/entities/entity-id'
import { Side } from '../../entities/game'
import { Attributes, Round } from '../../entities/round'
import { SelectAWinnerService } from '../game/select-a-winner'
import { SelectACardService } from './select-a-card'

let sut: SelectACardService
let inMemoryRoundRepository: InMemoryRoundRepository
let inMemoryGameRepository: InMemoryGameRepository
let selectAWinner: SelectAWinnerService

describe('Select a Card', () => {
  beforeEach(() => {
    inMemoryRoundRepository = new InMemoryRoundRepository()
    inMemoryGameRepository = new InMemoryGameRepository()
    selectAWinner = new SelectAWinnerService(inMemoryGameRepository)
    sut = new SelectACardService(inMemoryRoundRepository, selectAWinner)
  })

  it('should be able to fetch rounds by game', async () => {
    const round = Round.create({
      blueCardsBeforeRound: [cards[1].name],
      redCardsBeforeRound: [cards[0].name],
      blueCardPlayed: cards[1].name,
      selectedAttribute: Attributes.MAX_SPEED,
      game: new EntityId('a'),
    })

    inMemoryRoundRepository.createRound(round)

    const response = await sut.execute({
      card: 0,
      id: round.id.getValue(),
      side: Side.RED,
    })

    expect(response.isRight()).toBeTruthy()
    expect(inMemoryRoundRepository.rounds[0].redCardPlayed).toEqual(
      cards[0].name,
    )
  })
})
