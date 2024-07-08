import { Either, left, right } from '../../../@shared/either'
import { Game } from '../../entities/game'
import { GameNonExistsError } from '../../error/game-non-exists'
import { GameRepository } from '../../repositories/game-repository'

export type SelectAWinnerServiceRequest = {
  winner: 'BLUE' | 'RED'
  game: string
}

export type SelectAWinnerServiceResponse = Either<GameNonExistsError, Game>

export class SelectAWinnerService {
  constructor(private gameRepository: GameRepository) {}

  async execute({
    winner,
    game,
  }: SelectAWinnerServiceRequest): Promise<SelectAWinnerServiceResponse> {
    const gameSelected = await this.gameRepository.fetchGameById(game)

    if (!gameSelected) {
      return left(new GameNonExistsError())
    }

    const changedGame = await this.gameRepository.selectAWinner(game, winner)

    return right(changedGame)
  }
}
