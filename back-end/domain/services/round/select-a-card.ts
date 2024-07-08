import { cards } from '../../../../lib/cards'
import { Either, left, right } from '../../../@shared/either'
import { attributeConversorToString } from '../../../infra/repositories/mappers/round-mapper'
import { Side } from '../../entities/game'
import { Round } from '../../entities/round'
import { CardNotAllowedError } from '../../error/card-not-allowed-error'
import { RoundAlreadyFilledError } from '../../error/round-already-filled-error'
import { RoundNonExistsError } from '../../error/round-non-exists'
import { RoundRepository } from '../../repositories/round-repository'
import { SelectAWinnerService } from '../game/select-a-winner'

export type SelectACardServiceRequest = {
  card: number
  id: string
  side: Side
}

export type SelectACardServiceResponse = Either<
  RoundNonExistsError | RoundAlreadyFilledError | CardNotAllowedError,
  Round
>

export class SelectACardService {
  constructor(
    private roundRepository: RoundRepository,
    private selectAWinner: SelectAWinnerService,
  ) {}

  async execute({
    card,
    id,
    side,
  }: SelectACardServiceRequest): Promise<SelectACardServiceResponse> {
    const round = await this.roundRepository.fetchRoundById(id)

    if (!round) {
      return left(new RoundNonExistsError())
    }

    if (
      (side === Side.BLUE && round.blueCardPlayed) ||
      (side === Side.RED && round.redCardPlayed)
    ) {
      return left(new RoundAlreadyFilledError())
    }

    if (
      (side === Side.BLUE &&
        !round.blueCardsBeforeRound.includes(cards[card].name)) ||
      (side === Side.RED &&
        !round.redCardsBeforeRound.includes(cards[card].name))
    ) {
      return left(new CardNotAllowedError())
    }

    const updatedRound = await this.roundRepository.selectCard(
      cards[card].name,
      id,
      side,
    )

    if (updatedRound.blueCardPlayed && updatedRound.redCardPlayed) {
      const selectedRedCard = cards.find(
        (card) => card.name === updatedRound.redCardPlayed,
      )

      const selectedBlueCard = cards.find(
        (card) => card.name === updatedRound.blueCardPlayed,
      )

      const winner =
        selectedBlueCard![
          attributeConversorToString(updatedRound.selectedAttribute!)!
        ] >
        selectedRedCard![
          attributeConversorToString(updatedRound.selectedAttribute!)!
        ]
          ? Side.BLUE
          : Side.RED

      if (round.blueCardsBeforeRound.length === 1 && winner === Side.RED) {
        await this.selectAWinner.execute({
          winner: 'RED',
          game: round.game.getValue(),
        })
      }

      if (round.redCardsBeforeRound.length === 1 && winner === Side.BLUE) {
        await this.selectAWinner.execute({
          winner: 'BLUE',
          game: round.game.getValue(),
        })
      }
    }

    return right(updatedRound)
  }
}
