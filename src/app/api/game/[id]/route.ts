import { NextRequest } from 'next/server'
import { FetchGameByIdController } from '../../../../../back-end/infra/http/controllers/game/fetch-game-by-id.controller'
import { IdParams } from '../../round/[id]/route'

export async function GET(request: NextRequest, params: IdParams) {
  const controller = new FetchGameByIdController()

  return controller.handle(params)
}
