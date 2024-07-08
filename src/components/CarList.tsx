import { Car } from '@/contexts/RoundContext'
import { useEffect, useState } from 'react'
import { cards } from '../../lib/cards'
import CarCell from './CarCell'

type CarListProps = {
  list: string[]
}

export default function CarList({ list }: CarListProps) {
  const [completedCards, setCompletedCards] = useState<Array<Car>>([])

  useEffect(() => {
    setCompletedCards([])

    cards.forEach((card) => {
      if (list.includes(card.name)) {
        setCompletedCards((previousState) => {
          return [...previousState, card]
        })
      }
    })
  }, [list])

  return (
    <ul className="grid grid-cols-1 w-full gap-4">
      {completedCards.map((car) => (
        <CarCell car={car} key={car.name} />
      ))}
    </ul>
  )
}
