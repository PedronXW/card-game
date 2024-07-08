import { Attributes as PrismaAttributes } from '@prisma/client'
import { EntityId } from '../../../@shared/entities/entity-id'
import { Attributes, Round } from '../../../domain/entities/round'

export const attributeConversor = (attribute: Attributes) => {
  switch (attribute) {
    case Attributes.MAX_SPEED:
      return PrismaAttributes.MAX_SPEED
    case Attributes.POWER:
      return PrismaAttributes.POWER
    case Attributes.TORQUE:
      return PrismaAttributes.TORQUE
    default:
      return undefined
  }
}

export const attributeConversorToString = (attribute: Attributes) => {
  switch (attribute) {
    case Attributes.MAX_SPEED:
      return 'max_speed'
    case Attributes.POWER:
      return 'power'
    case Attributes.TORQUE:
      return 'torque'
    default:
      return undefined
  }
}

export const attributeConversorFromString = (attribute: string) => {
  switch (attribute) {
    case 'max_speed':
      return Attributes.MAX_SPEED
    case 'power':
      return Attributes.POWER
    case 'torque':
      return Attributes.TORQUE
    default:
      return undefined
  }
}

export const attributeConversorFromPrismaToDomain = (attribute: string) => {
  switch (attribute) {
    case PrismaAttributes.MAX_SPEED:
      return Attributes.MAX_SPEED
    case PrismaAttributes.POWER:
      return Attributes.POWER
    case PrismaAttributes.TORQUE:
      return Attributes.TORQUE
    default:
      return undefined
  }
}

export class RoundMapper {
  static toDomain(raw) {
    return Round.create(
      {
        blueCardsBeforeRound: raw.blueCardsBeforeRound,
        redCardsBeforeRound: raw.redCardsBeforeRound,
        game: new EntityId(raw.game.id),
        selectedAttribute: attributeConversorFromPrismaToDomain(
          raw.selectedAttribute,
        ),
        blueCardPlayed: raw.blueCardPlayed ?? null,
        redCardPlayed: raw.redCardPlayed ?? null,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ?? null,
      },
      new EntityId(raw.id),
    )
  }

  static toPersistence(round: Round) {
    return {
      id: round.id.getValue(),
      createdAt: round.createdAt,
      updatedAt: round.updatedAt,
      blueCardsBeforeRound: round.blueCardsBeforeRound,
      redCardsBeforeRound: round.redCardsBeforeRound,
      game: {
        connect: {
          id: round.game.getValue(),
        },
      },
      selectedAttribute: attributeConversor(round.selectedAttribute!),
      blueCardPlayed: round.blueCardPlayed,
      redCardPlayed: round.redCardPlayed,
    }
  }
}
