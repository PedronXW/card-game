'use client'

import GameCell from '@/components/GameCell'
import { Loading } from '@/components/Loading'
import NotificationProvider from '@/providers/NotificationProvider'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useRef, useState } from 'react'

export type Game = {
  createdAt: Date
  id: string
  winner: 'RED' | 'BLUE'
  rounds: Array<string>
}

export default function Home() {
  const [gamesCount, setGamesCount] = useState<number>(1)

  const [page, setPage] = useState<number>(1)

  const [games, setGames] = useState<Array<Game>>([])

  const ref = useRef(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listRef = useRef<any>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getNextPage = async () => {
    if (games?.length === gamesCount) return
    fetchGames()
  }

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      const ratio = entry.intersectionRatio

      if (ratio > 0) {
        getNextPage()
      }
    })

    if (ref.current) {
      intersectionObserver.observe(ref.current)
    }

    listRef.current.scrollTop = listRef.current.scrollHeight

    return () => {
      intersectionObserver.disconnect()
    }
  }, [games, page, getNextPage])

  const fetchGames = async () => {
    const response = await fetch(
      '/api/game?' +
        new URLSearchParams({
          page: page.toString(),
          limit: Number(5).toString(),
        }).toString(),

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = await response.json()
    if (response.status === 200) {
      setGames((prev) => prev.concat(data.games))
      setGamesCount(data.totalGamesCount)
      setPage((prev) => prev + 1)
    } else {
      enqueueSnackbar('Search failed, retry soon', {
        variant: 'error',
      })
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 gap-10">
      <NotificationProvider>
        <h1 className="text-black font-bold text-4xl">Games History</h1>
        <ul className="grid grid-cols-1 w-full gap-4 max-w-96" ref={listRef}>
          {games ? (
            games.map((game) => <GameCell game={game} key={game.id} />)
          ) : (
            <div>Erro ao carregar dados</div>
          )}
          {games?.length === gamesCount ? (
            <div></div>
          ) : (
            <div ref={ref}>
              <Loading />
            </div>
          )}
        </ul>
      </NotificationProvider>
    </main>
  )
}
