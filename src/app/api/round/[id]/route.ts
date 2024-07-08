import { NextRequest } from 'next/server'
import { CreateRoundController } from '../../../../../back-end/infra/http/controllers/round/create-round-controller'
import { FetchRoundByIdController } from '../../../../../back-end/infra/http/controllers/round/fetch-round-by-id-controller'
import { SelectACardController } from '../../../../../back-end/infra/http/controllers/round/select-a-card-controller'

export type IdParams = {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, params: IdParams) {
  const controller = new FetchRoundByIdController()

  return controller.handle(request, params)
}

export async function POST(request: NextRequest, params: IdParams) {
  const controller = new CreateRoundController()

  return controller.handle(request, params)
}

export async function PATCH(request: NextRequest, params: IdParams) {
  const controller = new SelectACardController()

  return controller.handle(request, params)
}
