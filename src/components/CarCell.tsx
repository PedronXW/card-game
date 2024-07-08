/* eslint-disable react-hooks/exhaustive-deps */
import { Car, RoundContext } from '@/contexts/RoundContext'
import { useContext, useEffect, useState } from 'react'
import { cards } from '../../lib/cards'

type CarCellProps = {
  car: Car
}

export default function CarCell({ car }: CarCellProps) {
  const {
    round,
    setSelectedRedCard,
    setSelectedBlueCard,
    selectedBlueCard,
    selectedRedCard,
  } = useContext(RoundContext)

  const { max_speed, name, power, torque } = car

  const [cardIndex, setCardIndex] = useState<number | undefined>(undefined)

  const [side, setSide] = useState<'RED' | 'BLUE' | undefined>(undefined)

  useEffect(() => {
    cards.forEach((card, index) => {
      if (card.name === name) {
        setCardIndex(index)
      }
    })

    round?.blueCardsBeforeRound.forEach((card) => {
      if (card === name) {
        setSide('BLUE')
      }
    })
  }, [])

  const handleSelectCar = () => {
    if (cardIndex === undefined) {
      return
    }

    if (side === undefined) {
      setSelectedRedCard(cardIndex)
    } else {
      setSelectedBlueCard(cardIndex)
    }
  }

  return (
    <button
      onClick={handleSelectCar}
      className={`h-full bg-white flex flex-col rounded-xl p-10 drop-shadow-xl m-1 border-4 ${selectedBlueCard === cardIndex ? 'border-4 border-blue_base_color' : ''} ${selectedRedCard === cardIndex ? 'border-4 border-red_base_color' : ''}`}
    >
      <h1 className="text-black font-bold text-xl text-center mb-8 w-full">
        {name}
      </h1>
      <div className="flex w-full">
        <p className="text-black font-bold text-md text-start w-full">
          Max Speed
        </p>
        <p className="text-black font-bold text-md text-end w-full">
          {max_speed + ' km/h'}
        </p>
      </div>

      <div className="flex w-full">
        <p className="text-black font-bold text-md text-start w-full">Torque</p>
        <p className="text-black font-bold text-md text-end w-full">
          {torque + ' kgfm'}
        </p>
      </div>

      <div className="flex w-full">
        <p className="text-black font-bold text-md text-start w-full">Power</p>
        <p className="text-black font-bold text-md text-end w-full">
          {power + ' cv'}
        </p>
      </div>
    </button>
  )
}
