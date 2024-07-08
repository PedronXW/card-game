import { IdParams } from '@/app/api/round/[id]/route'
import { NextResponse } from 'next/server'
import { FetchGameByIdService } from '../../../../domain/services/game/fetch-games-by-id'
import { PrismaGameRepository } from '../../../repositories/prisma-game-repository'
import { idZodParamSchema } from '../../dtos/round-dtos'
import { GamePresenter } from '../../presenters/game-presenter'

export class FetchGameByIdController {
  async handle({ params }: IdParams) {
    const gameRepository = new PrismaGameRepository()

    const fetchGameByIdService = new FetchGameByIdService(gameRepository)

    const { id } = idZodParamSchema.parse(params)

    const fetchedGame = await fetchGameByIdService.execute({
      id,
    })

    if (fetchedGame.isLeft()) {
      return NextResponse.json(
        { error: fetchedGame.value.message },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        game: GamePresenter.toHTTP(fetchedGame.value),
      },
      { status: 200 },
    )
  }
}
