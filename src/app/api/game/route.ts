import { NextRequest } from 'next/server'
import { CreateGameController } from '../../../../back-end/infra/http/controllers/game/create-game-controller'
import { FetchGamesController } from '../../../../back-end/infra/http/controllers/game/fetch-games-controller'

export async function GET(request: NextRequest) {
  const controller = new FetchGamesController()

  return controller.handle(request)
}

export async function POST() {
  const controller = new CreateGameController()

  return controller.handle()
}
