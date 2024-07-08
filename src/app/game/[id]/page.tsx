'use client'

import { Button } from '@/components/Button'
import { Loading } from '@/components/Loading'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Game() {
  const { id } = useParams()

  const router = useRouter()

  const searchParams = useSearchParams()

  const lastRoundWinner = searchParams.get('last-winner')

  const [waiting, setWaiting] = useState<boolean>(false)

  const selectAttribute = async (attribute: string) => {
    setWaiting(true)

    const response = await fetch(`/api/round/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedAttribute: attribute,
      }),
    })

    const data = await response.json()

    if (response.status === 201) {
      router.push(`/game/${id}/${data.round.id}`)
    }

    setWaiting(false)
  }

  return (
    <main
      className={`h-screen w-full flex-col items-center justify-center gap-10 flex`}
    >
      {lastRoundWinner ? (
        <div className="flex justify-center gap-2 w-80 flex-col items-center">
          <h1 className="text-black font-bold text-2xl text-center">
            Last Round Result:
          </h1>
          <strong className="text-black font-bold text-4xl text-center">
            {lastRoundWinner}
          </strong>
        </div>
      ) : null}

      <div className="flex justify-center gap-10 w-80 flex-col">
        <h1 className="text-black font-bold text-2xl text-center">
          {waiting ? 'Loading...' : 'Select the next round attribute'}
        </h1>

        <div className="min-h-16">{waiting ? <Loading /> : null}</div>

        <Button
          text="Max Speed"
          able={!waiting}
          action={() => {
            selectAttribute('max_speed')
          }}
        />

        <Button
          text="Power"
          able={!waiting}
          action={() => {
            selectAttribute('power')
          }}
        />

        <Button
          text="Torque"
          able={!waiting}
          action={() => {
            selectAttribute('torque')
          }}
        />
      </div>
    </main>
  )
}
