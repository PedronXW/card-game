import { EntityId } from '../../../@shared/entities/entity-id'
import { Attributes, Round } from '../../../domain/entities/round'
import { attributeConversor, RoundMapper } from './round-mapper'

describe('Round Mapper', () => {
  it('should be able to transform domain Round in a prisma Round', async () => {
    const round = Round.create({
      blueCardsBeforeRound: ['a'],
      redCardsBeforeRound: ['b'],
      selectedAttribute: Attributes.MAX_SPEED,
      game: new EntityId('a'),
    })

    const transformed = RoundMapper.toPersistence(round)

    expect(transformed).toEqual({
      id: round.id.getValue(),
      createdAt: expect.any(Date),
      blueCardsBeforeRound: ['a'],
      redCardsBeforeRound: ['b'],
      game: {
        connect: {
          id: round.game.getValue(),
        },
      },
      selectedAttribute: attributeConversor(Attributes.MAX_SPEED),
      blueCardPlayed: undefined,
      redCardPlayed: undefined,
    })
  })

  it('should be able to transform a prisma Round in a domain Round', async () => {
    const round = Round.create({
      blueCardsBeforeRound: ['a'],
      redCardsBeforeRound: ['b'],
      selectedAttribute: Attributes.MAX_SPEED,
      game: new EntityId('a'),
    })

    const transformed = RoundMapper.toDomain({
      id: round.id.getValue(),
      createdAt: expect.any(Date),
      blueCardsBeforeRound: ['a'],
      redCardsBeforeRound: ['b'],
      game: {
        id: 'a',
      },
      selectedAttribute: attributeConversor(Attributes.MAX_SPEED),
      blueCardPlayed: undefined,
      redCardPlayed: undefined,
    })

    expect(transformed).toEqual({
      _id: round.id,
      props: {
        blueCardPlayed: null,
        blueCardsBeforeRound: ['a'],
        createdAt: expect.any(Date),
        game: new EntityId('a'),
        redCardPlayed: null,
        redCardsBeforeRound: ['b'],
        selectedAttribute: round.selectedAttribute,
        updatedAt: null,
      },
    })
  })
})
