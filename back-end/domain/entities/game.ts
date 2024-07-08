import { Entity } from '../../@shared/entities/entity'
import { EntityId } from '../../@shared/entities/entity-id'
import { Optional } from '../../@shared/types/optional'

export enum Side {
  RED = 'RED',
  BLUE = 'BLUE',
}

type GameProps = {
  winner?: Side
  createdAt: Date
  rounds: EntityId[]
}

export class Game extends Entity<GameProps> {
  get winner(): Side | undefined {
    return this.props.winner
  }

  set winner(winner: Side) {
    this.props.winner = winner
  }

  get createdAt() {
    return this.props.createdAt
  }

  set createdAt(value: Date) {
    this.props.createdAt = value
  }

  get rounds(): EntityId[] {
    return this.props.rounds
  }

  set rounds(rounds: EntityId[]) {
    this.props.rounds = rounds
  }

  static create(
    props: Optional<GameProps, 'createdAt' | 'winner' | 'rounds'>,
    id?: EntityId,
  ): Game {
    const newCard = new Game(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        rounds: props.rounds ?? [],
      },
      id,
    )

    return newCard
  }
}
