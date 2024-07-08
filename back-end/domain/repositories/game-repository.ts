import { Game } from '../entities/game'

export type FetchGamesResponse = {
  games: Game[]
  totalGamesCount: number
}

export abstract class GameRepository {
  abstract createGame(game: Game): Promise<Game>
  abstract fetchGames(page: number, limit: number): Promise<FetchGamesResponse>
  abstract fetchGameById(id: string): Promise<Game | undefined>
  abstract selectAWinner(id: string, winner: string): Promise<Game>
}
