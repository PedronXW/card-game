import { Game } from '../../../domain/entities/game'

export class GamePresenter {
  static toHTTP(game: Game) {
    return {
      id: game.id.getValue(),
      rounds: game.rounds,
      winner: game.winner,
      createdAt: game.createdAt,
    }
  }
}
