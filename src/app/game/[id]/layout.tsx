import { redirect } from 'next/navigation'
import { FetchGameByIdController } from '../../../../back-end/infra/http/controllers/game/fetch-game-by-id.controller'

export default async function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    id: string
  }
}) {
  const controller = new FetchGameByIdController()

  const response = await controller.handle({ params })

  const { game } = await response.json()

  if (game.winner) {
    redirect(`/game/winner?winner=${game.winner}`)
  }

  return <>{children}</>
}
