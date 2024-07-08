import { Either, left, right } from '../../../@shared/either'
import { PaginationError } from '../../error/pagination-error'
import {
  FetchGamesResponse,
  GameRepository,
} from '../../repositories/game-repository'

export type FetchGameServiceRequest = {
  page: number
  limit: number
}

export type FetchGameServiceResponse = Either<
  PaginationError,
  FetchGamesResponse
>

export class FetchGameService {
  constructor(private gameRepository: GameRepository) {}

  async execute({
    page,
    limit,
  }: FetchGameServiceRequest): Promise<FetchGameServiceResponse> {
    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    const fetchdGame = await this.gameRepository.fetchGames(page, limit)

    return right(fetchdGame)
  }
}
