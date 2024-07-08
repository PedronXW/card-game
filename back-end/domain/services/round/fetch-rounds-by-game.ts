import { Either, left, right } from '../../../@shared/either'
import { PaginationError } from '../../error/pagination-error'
import {
  FetchRoundsResponse,
  RoundRepository,
} from '../../repositories/round-repository'

export type FetchRoundByGameServiceRequest = {
  gameId: string
  page: number
  limit: number
}

export type FetchRoundByGameServiceResponse = Either<
  PaginationError,
  FetchRoundsResponse
>

export class FetchRoundByGameService {
  constructor(private roundRepository: RoundRepository) {}

  async execute({
    gameId,
    page,
    limit,
  }: FetchRoundByGameServiceRequest): Promise<FetchRoundByGameServiceResponse> {
    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    const fetchdRound = await this.roundRepository.fetchRoundsByGame(
      gameId,
      page,
      limit,
    )

    return right(fetchdRound)
  }
}
