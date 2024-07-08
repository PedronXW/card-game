import { IdParams } from '@/app/api/round/[id]/route'
import { NextRequest, NextResponse } from 'next/server'
import { FetchRoundByIdService } from '../../../../domain/services/round/fetch-rounds-by-id'
import { PrismaRoundRepository } from '../../../repositories/prisma-round-repository'
import { idZodParamSchema } from '../../dtos/round-dtos'
import { RoundPresenter } from '../../presenters/round-presenter'

export class FetchRoundByIdController {
  async handle(request: NextRequest, { params }: IdParams) {
    const roundRepository = new PrismaRoundRepository()

    const fetchRoundsService = new FetchRoundByIdService(roundRepository)

    const { id } = idZodParamSchema.parse(params)

    const fetchedRound = await fetchRoundsService.execute({
      id,
    })

    if (fetchedRound.isLeft()) {
      return NextResponse.json(
        { error: fetchedRound.value.message },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        round: RoundPresenter.toHTTP(fetchedRound.value),
      },
      { status: 200 },
    )
  }
}
