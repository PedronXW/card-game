import { EntityId } from '../../../@shared/entities/entity-id'
import { Attributes, Round } from '../../../domain/entities/round'
import { RoundPresenter } from './round-presenter'

describe('Round Presenter', () => {
  it('should be able to transform domain Round in a prisma Round', async () => {
    const round = Round.create({
      blueCardsBeforeRound: ['a'],
      redCardsBeforeRound: ['b'],
      selectedAttribute: Attributes.MAX_SPEED,
      game: new EntityId('a'),
    })

    const transformed = RoundPresenter.toHTTP(round)

    expect(transformed).toEqual({
      id: round.id.getValue(),
      createdAt: expect.any(Date),
      blueCardsBeforeRound: ['a'],
      redCardsBeforeRound: ['b'],
      game: round.game.getValue(),
      selectedAttribute: 'max_speed',
      blueCardPlayed: undefined,
      redCardPlayed: undefined,
    })
  })
})
