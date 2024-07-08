import { Round } from '../../../domain/entities/round'

export class RoundPresenter {
  static toHTTP(round: Round) {
    return {
      id: round.id.getValue(),
      redCardsBeforeRound: round.redCardsBeforeRound,
      blueCardsBeforeRound: round.blueCardsBeforeRound,
      redCardPlayed: round.redCardPlayed,
      blueCardPlayed: round.blueCardPlayed,
      selectedAttribute: round.selectedAttribute,
      game: round.game.getValue(),
      createdAt: round.createdAt,
      updatedAt: round.updatedAt,
    }
  }
}
