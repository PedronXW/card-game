import { EntityId } from '../../@shared/entities/entity-id'
import { Round } from './round'

describe('Round', () => {
  it('should be able to create a new round', () => {
    const round = Round.create({
      game: new EntityId('a'),
      blueCardsBeforeRound: ['a'],
      redCardsBeforeRound: ['b'],
    })

    expect(round.blueCardsBeforeRound).toEqual(['a'])
    expect(round.redCardsBeforeRound).toEqual(['b'])
    expect(round.game).toBeInstanceOf(EntityId)
  })
})
