import { Entity } from '../../@shared/entities/entity'
import { EntityId } from '../../@shared/entities/entity-id'
import { Optional } from '../../@shared/types/optional'

export enum Attributes {
  MAX_SPEED = 'max_speed',
  POWER = 'power',
  TORQUE = 'torque',
}

type RoundProps = {
  redCardsBeforeRound: string[]
  blueCardsBeforeRound: string[]
  redCardPlayed?: string
  blueCardPlayed?: string
  selectedAttribute?: Attributes
  game: EntityId
  createdAt: Date
  updatedAt?: Date | null
}

export class Round extends Entity<RoundProps> {
  get redCardsBeforeRound(): string[] {
    return this.props.redCardsBeforeRound
  }

  set redCardsBeforeRound(redCardsBeforeRound: string[]) {
    this.props.redCardsBeforeRound = redCardsBeforeRound
  }

  get blueCardsBeforeRound(): string[] {
    return this.props.blueCardsBeforeRound
  }

  set blueCardsBeforeRound(blueCardsBeforeRound: string[]) {
    this.props.blueCardsBeforeRound = blueCardsBeforeRound
  }

  get redCardPlayed(): string | undefined {
    return this.props.redCardPlayed
  }

  set redCardPlayed(redCardPlayed: string) {
    this.props.redCardPlayed = redCardPlayed
  }

  get blueCardPlayed(): string | undefined {
    return this.props.blueCardPlayed
  }

  set blueCardPlayed(blueCardPlayed: string) {
    this.props.blueCardPlayed = blueCardPlayed
  }

  get selectedAttribute(): Attributes | undefined {
    return this.props.selectedAttribute
  }

  set selectedAttribute(selectedAttribute: Attributes) {
    this.props.selectedAttribute = selectedAttribute
  }

  get game(): EntityId {
    return this.props.game
  }

  set game(game: EntityId) {
    this.props.game = game
  }

  get createdAt() {
    return this.props.createdAt
  }

  set createdAt(value: Date) {
    this.props.createdAt = value
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  set updatedAt(updatedAt: Date | null | undefined) {
    this.props.updatedAt = updatedAt
  }

  static create(
    props: Optional<
      RoundProps,
      'createdAt' | 'updatedAt' | 'blueCardPlayed' | 'redCardPlayed'
    >,
    id?: EntityId,
  ): Round {
    const newCard = new Round(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return newCard
  }
}
