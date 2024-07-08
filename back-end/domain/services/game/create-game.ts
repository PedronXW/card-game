import { Either, right } from '../../../@shared/either'
import { Game } from '../../entities/game'
import { GameRepository } from '../../repositories/game-repository'

export type CreateGameServiceResponse = Either<null, Game>

export class CreateGameService {
  constructor(private gameRepository: GameRepository) {}

  async execute(): Promise<CreateGameServiceResponse> {
    const game = Game.create({})

    const createdGame = await this.gameRepository.createGame(game)

    return right(createdGame)
  }
}
