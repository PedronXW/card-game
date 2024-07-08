import { NextResponse } from 'next/server'
import { CreateGameService } from '../../../../domain/services/game/create-game'
import { PrismaGameRepository } from '../../../repositories/prisma-game-repository'
import { GamePresenter } from '../../presenters/game-presenter'

export class CreateGameController {
  async handle() {
    const gameRepository = new PrismaGameRepository()

    const createGamesService = new CreateGameService(gameRepository)

    const createdGame = await createGamesService.execute()

    if (createdGame.isLeft()) {
      return NextResponse.json({}, { status: 500 })
    }

    return NextResponse.json(
      {
        game: GamePresenter.toHTTP(createdGame.value),
      },
      { status: 201 },
    )
  }
}
