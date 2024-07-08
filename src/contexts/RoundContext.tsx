/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { cards } from '../../lib/cards'

export type Car = {
  name: string
  max_speed: number
  power: number
  torque: number
}

export type Attributes = 'name' | 'torque' | 'power' | 'max_speed'

export type Round = {
  id: string
  redCardsBeforeRound: string[]
  blueCardsBeforeRound: string[]
  redCardPlayed: string
  blueCardPlayed: string
  selectedAttribute: Attributes
  game: string
  createdAt: Date
  updatedAt: Date | undefined
}

interface RoundContext {
  round: Round | undefined
  selectACard: (cardNumber: number) => void
  fetchRound: () => void
  selectedRedCard: number | undefined
  selectedBlueCard: number | undefined
  setSelectedBlueCard: (cardNumber: number) => void
  setSelectedRedCard: (cardNumber: number) => void
  waiting: boolean
}

interface RoundContextInterface {
  children: ReactNode
}

export const RoundContext = createContext({} as RoundContext)

export default function RoundProvider({ children }: RoundContextInterface) {
  const { roundId, id } = useParams()
  const [round, setRound] = useState<Round | undefined>(undefined)
  const [selectedRedCard, setSelectedRedCard] = useState<number | undefined>(
    undefined,
  )
  const [selectedBlueCard, setSelectedBlueCard] = useState<number | undefined>(
    undefined,
  )
  const [waiting, setWaiting] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    fetchRound()
  }, [])

  const fetchRound = async () => {
    setWaiting(true)

    const response = await fetch(`/api/round/${roundId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    if (response.status === 200) {
      if (data.round.redCardPlayed && data.round.blueCardPlayed) {
        router.push(`/game/${id}`)
      }

      if (data.round.redCardPlayed) {
        cards.forEach((card, index) => {
          if (card.name === data.round.redCardPlayed) {
            setSelectedRedCard(index)
          }
        })
      }

      if (data.round.blueCardPlayed) {
        cards.forEach((card, index) => {
          if (card.name === data.round.blueCardPlayed) {
            setSelectedBlueCard(index)
          }
        })
      }

      setRound(data.round)
    } else {
      enqueueSnackbar('Rounds search failed, retry soon', {
        variant: 'error',
      })
    }

    setWaiting(false)
  }

  const selectACard = async (cardNumber: number) => {
    setWaiting(true)

    if (!round) {
      return false
    }

    if (round?.blueCardPlayed === null) {
      setSelectedBlueCard(cardNumber)
    } else {
      setSelectedRedCard(cardNumber)
    }

    const response = await fetch(`/api/round/${round.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        side: round?.blueCardPlayed === null ? 'BLUE' : 'RED',
        card: cardNumber,
      }),
    })

    const data = await response.json()

    if (response.status === 200) {
      setRound(data.round)

      const round: Round = data.round

      if (round.redCardPlayed !== null && round.blueCardPlayed !== null) {
        console.log(
          cards[selectedRedCard!][round.selectedAttribute],
          cards[selectedBlueCard!][round.selectedAttribute],
          round,
          selectedBlueCard,
          selectedRedCard,
        )

        if (
          cards[selectedRedCard!][round.selectedAttribute] ===
          cards[selectedBlueCard!][round.selectedAttribute]
        ) {
          return router.push(`/game/${id}?last-winner=Draw`)
        }

        const winner =
          cards[selectedRedCard!][round.selectedAttribute] >
          cards[selectedBlueCard!][round.selectedAttribute]

        if (round.blueCardsBeforeRound.length === 1 && winner) {
          return router.push(`/game/winner?winner=Player 2`)
        }

        if (round.redCardsBeforeRound.length === 1 && !winner) {
          return router.push(`/game/winner?winner=Player 1`)
        }

        return router.push(
          `/game/${id}?last-winner=${!winner ? 'Player 1 Win' : 'Player 2 Win'}`,
        )
      }
    } else {
      enqueueSnackbar('Select a card failed, retry soon', {
        variant: 'error',
      })
    }

    setWaiting(false)
  }

  return (
    <RoundContext.Provider
      value={{
        waiting,
        fetchRound,
        selectACard,
        selectedBlueCard,
        setSelectedBlueCard,
        setSelectedRedCard,
        round,
        selectedRedCard,
      }}
    >
      {children}
    </RoundContext.Provider>
  )
}
