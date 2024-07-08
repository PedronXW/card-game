import { NextRequest, NextResponse } from 'next/server'
import { FetchGameService } from '../../../../domain/services/game/fetch-games'
import { PrismaGameRepository } from '../../../repositories/prisma-game-repository'
import { fetchGamesZodQuerySchema } from '../../dtos/game-dtos'
import { GamePresenter } from '../../presenters/game-presenter'

export class FetchGamesController {
  async handle(request: NextRequest) {
    const gameRepository = new PrismaGameRepository()

    const fetchGamesService = new FetchGameService(gameRepository)

    const queryPage = request.nextUrl.searchParams.get('page')

    const queryLimit = request.nextUrl.searchParams.get('limit')

    const { page, limit } = fetchGamesZodQuerySchema.parse({
      page: queryPage,
      limit: queryLimit,
    })

    const fetchedGames = await fetchGamesService.execute({
      page,
      limit,
    })

    if (fetchedGames.isLeft()) {
      return NextResponse.json(
        { error: fetchedGames.value.message },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        games: fetchedGames.value.games.map(GamePresenter.toHTTP),
        totalGamesCount: fetchedGames.value.totalGamesCount,
      },
      { status: 200 },
    )
  }
}
