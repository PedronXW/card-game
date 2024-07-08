import { Either, left, right } from '../../../@shared/either'
import { Game } from '../../entities/game'
import { GameNonExistsError } from '../../error/game-non-exists'
import { GameRepository } from '../../repositories/game-repository'

export type FetchGameByIdServiceRequest = {
  id: string
}

export type FetchGameByIdServiceResponse = Either<GameNonExistsError, Game>

export class FetchGameByIdService {
  constructor(private gameRepository: GameRepository) {}

  async execute({
    id,
  }: FetchGameByIdServiceRequest): Promise<FetchGameByIdServiceResponse> {
    const fetchedGame = await this.gameRepository.fetchGameById(id)

    if (!fetchedGame) {
      return left(new GameNonExistsError())
    }

    return right(fetchedGame)
  }
}
