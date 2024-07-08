import { IdParams } from '@/app/api/round/[id]/route'
import { NextRequest, NextResponse } from 'next/server'
import { FetchRoundByGameService } from '../../../../domain/services/round/fetch-rounds-by-game'
import { PrismaRoundRepository } from '../../../repositories/prisma-round-repository'
import {
  fetchRoundsByGameZodQuerySchema,
  idZodParamSchema,
} from '../../dtos/round-dtos'
import { RoundPresenter } from '../../presenters/round-presenter'

export class FetchRoundByGameController {
  async handle(request: NextRequest, { params }: IdParams) {
    const roundRepository = new PrismaRoundRepository()

    const fetchRoundsService = new FetchRoundByGameService(roundRepository)

    const queryPage = request.nextUrl.searchParams.get('page')

    const queryLimit = request.nextUrl.searchParams.get('limit')

    const { page, limit } = fetchRoundsByGameZodQuerySchema.parse({
      page: queryPage,
      limit: queryLimit,
    })

    const { id } = idZodParamSchema.parse(params)

    const fetchedRounds = await fetchRoundsService.execute({
      page,
      limit,
      gameId: id,
    })

    if (fetchedRounds.isLeft()) {
      return NextResponse.json(
        { error: fetchedRounds.value.message },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        rounds: fetchedRounds.value.rounds.map(RoundPresenter.toHTTP),
        totalRoundsCount: fetchedRounds.value.totalRoundsCount,
      },
      { status: 200 },
    )
  }
}
