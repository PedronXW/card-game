import { IdParams } from '@/app/api/round/[id]/route'
import { NextRequest, NextResponse } from 'next/server'
import { SelectAWinnerService } from '../../../../domain/services/game/select-a-winner'
import { PrismaGameRepository } from '../../../repositories/prisma-game-repository'
import { selectAWinnerZodQuerySchema } from '../../dtos/game-dtos'
import { idZodParamSchema } from '../../dtos/round-dtos'
import { GamePresenter } from '../../presenters/game-presenter'

export class SelectAWinnerController {
  async handle(request: NextRequest, { params }: IdParams) {
    const gameRepository = new PrismaGameRepository()

    const selectAWinnerService = new SelectAWinnerService(gameRepository)

    const queryWinner = request.nextUrl.searchParams.get('winner')

    const { id } = idZodParamSchema.parse(params)

    const { winner } = selectAWinnerZodQuerySchema.parse({
      winner: queryWinner,
    })

    const changedGame = await selectAWinnerService.execute({
      winner,
      game: id,
    })

    if (changedGame.isLeft()) {
      return NextResponse.json(
        { error: changedGame.value.message },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        game: GamePresenter.toHTTP(changedGame.value),
      },
      { status: 200 },
    )
  }
}
