import { Attributes, Round } from '../entities/round'
import { firstRoundGenerator } from './create-first-round'

describe('Create First Round', () => {
  it('should be able to create a first round in domain', async () => {
    const round = firstRoundGenerator('max_speed', 'a')

    expect(round).toBeInstanceOf(Round)
    expect(round.game.getValue()).toEqual('a')
    expect(round.selectedAttribute).toEqual(Attributes.MAX_SPEED)
    expect(round.blueCardsBeforeRound).toEqual(expect.any(Array<string>))
    expect(round.blueCardsBeforeRound).toHaveLength(5)
    expect(round.redCardsBeforeRound).toEqual(expect.any(Array<string>))
    expect(round.redCardsBeforeRound).toHaveLength(5)
  })
})
