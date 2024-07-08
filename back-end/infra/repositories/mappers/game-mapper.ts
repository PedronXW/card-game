import { WinnerSide } from '@prisma/client'
import { EntityId } from '../../../@shared/entities/entity-id'
import { Game, Side } from '../../../domain/entities/game'

export class GameMapper {
  static toDomain(raw) {
    return Game.create(
      {
        rounds: raw.rounds,
        winner:
          raw.winner !== null
            ? raw.winner === WinnerSide.BLUE
              ? Side.BLUE
              : Side.RED
            : undefined,
        createdAt: raw.createdAt,
      },
      new EntityId(raw.id),
    )
  }

  static toPersistence(game: Game) {
    return {
      id: game.id.getValue(),
      rounds: {
        connect: game.rounds.map((round) => {
          return { id: round.getValue() }
        }),
      },
      winner: game.winner
        ? game.winner === Side.BLUE
          ? WinnerSide.BLUE
          : WinnerSide.RED
        : undefined,
      createdAt: game.createdAt,
    }
  }
}
