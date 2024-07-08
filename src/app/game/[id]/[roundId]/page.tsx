'use client'

import { Button } from '@/components/Button'
import CarList from '@/components/CarList'
import { Loading } from '@/components/Loading'
import { RoundContext } from '@/contexts/RoundContext'
import { useContext } from 'react'

export default function Round() {
  const { round, waiting, selectACard, selectedBlueCard, selectedRedCard } =
    useContext(RoundContext)

  const handleSelectACard = () => {
    const side = round?.blueCardPlayed === null ? 'BLUE' : 'RED'

    if (side === 'BLUE' && selectedBlueCard !== undefined) {
      selectACard(selectedBlueCard)
    }

    if (side === 'RED' && selectedRedCard !== undefined) {
      selectACard(selectedRedCard)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      {waiting ? (
        <div className="flex flex-col items-center gap-10 min-h-screen justify-center">
          <h1 className="text-black font-bold text-4xl">
            Loading Your Cards...
          </h1>
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-10 w-full">
          <h1 className="text-black font-bold text-4xl">Select a Card</h1>
          {round ? (
            round?.blueCardPlayed === null ? (
              <h1 className="text-black font-bold text-4xl">Player 1</h1>
            ) : (
              <h1 className="text-black font-bold text-4xl">Player 2</h1>
            )
          ) : null}

          <Button action={handleSelectACard} text="CONFIRM SELECTION" />

          <div className="w-96 p-6 sm:p-0">
            {round ? (
              <CarList
                list={
                  round?.blueCardPlayed === null
                    ? round?.blueCardsBeforeRound
                    : round?.redCardsBeforeRound
                }
              />
            ) : null}
          </div>
        </div>
      )}
    </main>
  )
}
