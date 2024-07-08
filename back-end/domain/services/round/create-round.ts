import { Either, left, right } from '../../../@shared/either'
import { Round } from '../../entities/round'
import { GameNonExistsError } from '../../error/game-non-exists'
import { LastRoundNonFinishedError } from '../../error/last-round-non-finished'
import { GameRepository } from '../../repositories/game-repository'
import { RoundRepository } from '../../repositories/round-repository'
import { firstRoundGenerator } from '../../utils/create-first-round'
import { nextRoundGenerator } from '../../utils/create-next-round'

export type CreateRoundServiceRequest = {
  game: string
  selectedAttribute: string
}

export type CreateRoundServiceResponse = Either<
  GameNonExistsError | LastRoundNonFinishedError,
  Round
>

export class CreateRoundService {
  constructor(
    private roundRepository: RoundRepository,
    private gameRepository: GameRepository,
  ) {}

  async execute({
    game,
    selectedAttribute,
  }: CreateRoundServiceRequest): Promise<CreateRoundServiceResponse> {
    const selectedGame = await this.gameRepository.fetchGameById(game)

    if (!selectedGame) {
      return left(new GameNonExistsError())
    }

    const lastRound = (
      await this.roundRepository.fetchRoundsByGame(
        // Fetch rounds by game always return ordered by dec createdAt property
        selectedGame.id.getValue(),
        1,
        1,
      )
    ).rounds[0]

    if (!lastRound) {
      const createdRound = await this.roundRepository.createRound(
        firstRoundGenerator(selectedAttribute, game),
      )

      return right(createdRound)
    }

    if (lastRound.blueCardPlayed === null || lastRound.redCardPlayed === null) {
      return left(new LastRoundNonFinishedError())
    }

    const createdRound = await this.roundRepository.createRound(
      nextRoundGenerator(lastRound, selectedAttribute),
    )

    return right(createdRound)
  }
}
