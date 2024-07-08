import { NextRequest } from 'next/server'
import { FetchRoundByGameController } from '../../../../../../back-end/infra/http/controllers/round/fetch-round-by-game-controller'

export type IdParams = {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, params: IdParams) {
  const controller = new FetchRoundByGameController()

  return controller.handle(request, params)
}
