'use client'

import { Game } from '@/app/history/page'
import { Round } from '@/contexts/RoundContext'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Loading } from './Loading'
import RoundCell from './RoundCell'

type GameCellProps = {
  game: Game
}

export default function GameCell({ game }: GameCellProps) {
  const [rounds, setRounds] = useState<Array<Round>>([])

  const [page, setPage] = useState<number>(1)

  const [roundCount, setRoundCount] = useState<number>(1)

  const [waiting, setWaiting] = useState<boolean>(false)

  const handleLoadMore = () => {
    if (roundCount > rounds.length) {
      fetchRounds()
    }
  }

  const fetchRounds = async () => {
    setWaiting(true)
    const response = await fetch(
      `/api/round/game/${game.id}?` +
        new URLSearchParams({
          page: page.toString(),
          limit: Number(3).toString(),
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
      setRounds((prev) => prev.concat(data.rounds))
      setRoundCount(data.totalRoundsCount)
      setPage((prev) => prev + 1)
    } else {
      enqueueSnackbar('Rounds search failed, retry soon', {
        variant: 'error',
      })
    }

    setWaiting(false)
  }

  useEffect(() => {
    fetchRounds()
  }, [])

  return (
    <li
      className={`drop-shadow-xl bg-white w-full text-center rounded-lg max-w-96 border-4 p-6 pb-14 ${game.winner === 'RED' ? 'border-red_base_color' : ''} ${game.winner === 'BLUE' ? 'border-blue_base_color' : ''}`}
    >
      <header className="flex flex-col justify-between ">
        <h1 className="text-black font-bold text-xl text-start">
          Gamed at: {new Date(game.createdAt).toISOString()}
        </h1>
        <h1 className="text-black font-normal text-sm text-start">{game.id}</h1>
      </header>
      <p
        className={` font-normal text-sm text-start mt-4 ${game.winner === 'RED' ? 'text-red_base_color' : 'text-blue_base_color'}`}
      >
        Rounds:
      </p>
      <div
        className={`w-full h-[1px] ${game.winner === 'RED' ? 'bg-red_base_color' : 'bg-blue_base_color'}`}
      />

      {rounds ? (
        rounds.map((round) => <RoundCell round={round} key={round.id} />)
      ) : (
        <div>Error to render</div>
      )}

      <button
        disabled={waiting}
        onClick={handleLoadMore}
        className={`rounded-full h-10 w-40 drop-shadow-xl ${game.winner === 'RED' ? 'bg-red_base_color' : 'bg-blue_base_color'} absolute -ml-20 mt-0 ${roundCount <= rounds.length ? 'invisible' : 'visible'}`}
      >
        {waiting ? (
          <Loading style="h-6 w-6 fill-white" />
        ) : (
          <p className={` font-bold text-base text-center text-white`}>
            Load More Rounds
          </p>
        )}
      </button>
    </li>
  )
}
