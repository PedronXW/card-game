import { Game, Side } from '../../back-end/domain/entities/game'
import {
  FetchGamesResponse,
  GameRepository,
} from '../../back-end/domain/repositories/game-repository'

export class InMemoryGameRepository implements GameRepository {
  public games: Game[] = []

  async createGame(game: Game): Promise<Game> {
    await this.games.push(game)
    return game
  }

  async selectAWinner(id: string, winner: string): Promise<Game> {
    const game = this.games.findLastIndex((game) => game.id.getValue() === id)

    this.games[game].winner = winner === 'BLUE' ? Side.BLUE : Side.RED

    return this.games[game]
  }

  async fetchGames(page: number, limit: number): Promise<FetchGamesResponse> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    return {
      games: this.games.slice(startIndex, endIndex),
      totalGamesCount: this.games.length,
    }
  }

  async fetchGameById(id: string): Promise<Game | undefined> {
    return this.games.find((game) => game.id.getValue() === id)
  }
}
