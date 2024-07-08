import { IdParams } from '@/app/api/round/[id]/route'
import { NextRequest, NextResponse } from 'next/server'
import { CreateRoundService } from '../../../../domain/services/round/create-round'
import { PrismaGameRepository } from '../../../repositories/prisma-game-repository'
import { PrismaRoundRepository } from '../../../repositories/prisma-round-repository'
import {
  createRoundZodBodySchema,
  idZodParamSchema,
} from '../../dtos/round-dtos'
import { RoundPresenter } from '../../presenters/round-presenter'

export class CreateRoundController {
  async handle(request: NextRequest, { params }: IdParams) {
    const data = await request.json()

    const roundRepository = new PrismaRoundRepository()

    const gameRepository = new PrismaGameRepository()

    const createRoundsService = new CreateRoundService(
      roundRepository,
      gameRepository,
    )

    const { id } = idZodParamSchema.parse(params)

    const { selectedAttribute } = createRoundZodBodySchema.parse(data)

    const createdRound = await createRoundsService.execute({
      game: id,
      selectedAttribute,
    })

    if (createdRound.isLeft()) {
      return NextResponse.json(
        { error: createdRound.value.message },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        round: RoundPresenter.toHTTP(createdRound.value),
      },
      { status: 201 },
    )
  }
}
