import { Either, left, right } from '../../../@shared/either'
import { Round } from '../../entities/round'
import { RoundNonExistsError } from '../../error/round-non-exists'
import { RoundRepository } from '../../repositories/round-repository'

export type FetchRoundByIdServiceRequest = {
  id: string
}

export type FetchRoundByIdServiceResponse = Either<RoundNonExistsError, Round>

export class FetchRoundByIdService {
  constructor(private roundRepository: RoundRepository) {}

  async execute({
    id,
  }: FetchRoundByIdServiceRequest): Promise<FetchRoundByIdServiceResponse> {
    const fetchedRound = await this.roundRepository.fetchRoundById(id)

    if (!fetchedRound) {
      return left(new RoundNonExistsError())
    }

    return right(fetchedRound)
  }
}
