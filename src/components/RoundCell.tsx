import { Car, Round } from '@/contexts/RoundContext'
import { useEffect, useState } from 'react'
import { cards } from '../../lib/cards'

type RoundCellProps = {
  round: Round
}

export default function RoundCell({ round }: RoundCellProps) {
  const [fullBlueCardPlayed, setFullBlueCardPlayed] = useState<Car | undefined>(
    undefined,
  )
  const [fullRedCardPlayed, setFullRedCardPlayed] = useState<Car | undefined>(
    undefined,
  )

  useEffect(() => {
    cards.forEach((card) => {
      if (card.name === round.blueCardPlayed) {
        setFullBlueCardPlayed(card)
      }

      if (card.name === round.redCardPlayed) {
        setFullRedCardPlayed(card)
      }
    })
  }, [])

  const handleGetWinner = (): string => {
    if (!fullBlueCardPlayed || !fullRedCardPlayed) {
      return 'erro'
    }

    if (
      fullBlueCardPlayed![round.selectedAttribute] >
      fullRedCardPlayed![round.selectedAttribute]
    ) {
      return 'Player 1'
    } else if (
      fullBlueCardPlayed![round.selectedAttribute] ===
      fullRedCardPlayed![round.selectedAttribute]
    ) {
      return 'Draw'
    } else {
      return 'Player 2'
    }
  }

  return (
    <li className="w-full flex border-b-2 border-b-gray-300 justify-between">
      <div className="flex flex-col">
        <div className="flex w-full items-center p-2 gap-2">
          <div className="bg-blue_base_color h-8 w-8 rounded-md drop-shadow-xl" />
          <div className="flex items-center flex-col">
            <p className="text-black font-medium text-md text-start w-full">
              {round.blueCardPlayed}
            </p>
            <p className="text-black font-normal text-sm text-start w-full">
              {round.selectedAttribute.toUpperCase() + ': '}
              {fullBlueCardPlayed
                ? fullBlueCardPlayed![round.selectedAttribute]
                : null}
              {round.selectedAttribute === 'max_speed'
                ? ' km/h'
                : round.selectedAttribute === 'power'
                  ? ' kgfm'
                  : ' cv'}
            </p>
          </div>
        </div>
        <div className={`w-full h-[1px] bg-gray-200`} />
        <div className="flex w-full items-center p-2 gap-2">
          <div className="bg-red_base_color h-8 w-8 rounded-md drop-shadow-xl" />
          <div className="flex items-center flex-col">
            <p className="text-black font-medium text-md text-start w-full">
              {round.redCardPlayed}
            </p>
            <p className="text-black font-normal text-sm text-start w-full">
              {round.selectedAttribute.toUpperCase() + ': '}
              {fullRedCardPlayed
                ? fullRedCardPlayed![round.selectedAttribute]
                : null}
              {round.selectedAttribute === 'max_speed'
                ? ' km/h'
                : round.selectedAttribute === 'power'
                  ? ' kgfm'
                  : ' cv'}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col justify-center flex-1 max-w-32">
        <h1 className="text-black font-normal text-sm text-center">
          Round Winner:
        </h1>
        <h1 className="text-black font-normal text-sm text-center">
          {handleGetWinner()}
        </h1>
      </div>
    </li>
  )
}
