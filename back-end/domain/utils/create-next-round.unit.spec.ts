import { Attributes, Round } from '../entities/round'
import { firstRoundGenerator } from './create-first-round'
import { nextRoundGenerator } from './create-next-round'

describe('Create Next Round', () => {
  it('should be able to create the next round in domain', async () => {
    const firstRound = firstRoundGenerator('max_speed', 'a')
    firstRound.blueCardPlayed = 'Honda Civic LXS'
    firstRound.redCardPlayed = 'VW Golf'

    const round = nextRoundGenerator(firstRound, 'max_speed')

    expect(round).toBeInstanceOf(Round)
    expect(round.game.getValue()).toEqual('a')
    expect(round.selectedAttribute).toEqual(Attributes.MAX_SPEED)
    expect(round.blueCardsBeforeRound).toEqual(expect.any(Array<string>))
    expect(round.blueCardsBeforeRound).toHaveLength(4)
    expect(round.redCardsBeforeRound).toEqual(expect.any(Array<string>))
    expect(round.redCardsBeforeRound).toHaveLength(6)
  })
})
