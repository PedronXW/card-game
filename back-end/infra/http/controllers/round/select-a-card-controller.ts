import { IdParams } from '@/app/api/round/[id]/route'
import { NextRequest, NextResponse } from 'next/server'
import { Side } from '../../../../domain/entities/game'
import { SelectAWinnerService } from '../../../../domain/services/game/select-a-winner'
import { SelectACardService } from '../../../../domain/services/round/select-a-card'
import { PrismaGameRepository } from '../../../repositories/prisma-game-repository'
import { PrismaRoundRepository } from '../../../repositories/prisma-round-repository'
import {
  idZodParamSchema,
  selectACardZodBodySchema,
} from '../../dtos/round-dtos'
import { RoundPresenter } from '../../presenters/round-presenter'

export class SelectACardController {
  async handle(request: NextRequest, { params }: IdParams) {
    const data = await request.json()

    const roundRepository = new PrismaRoundRepository()

    const gameRepository = new PrismaGameRepository()

    const selectAWinner = new SelectAWinnerService(gameRepository)

    const selectACardService = new SelectACardService(
      roundRepository,
      selectAWinner,
    )

    const { id } = idZodParamSchema.parse(params)

    const { side, card } = selectACardZodBodySchema.parse(data)

    const selectingACard = await selectACardService.execute({
      id,
      card,
      side: side === 'BLUE' ? Side.BLUE : Side.RED,
    })

    if (selectingACard.isLeft()) {
      return NextResponse.json(
        { error: selectingACard.value.message },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        round: RoundPresenter.toHTTP(selectingACard.value),
      },
      { status: 200 },
    )
  }
}
