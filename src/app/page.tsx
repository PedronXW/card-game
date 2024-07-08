'use client'

import car_gif from '@/assets/car-gif.gif'
import { Button } from '@/components/Button'
import NotificationProvider from '@/providers/NotificationProvider'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'

export default function Home() {
  const [waiting, setWaiting] = useState<boolean>(false)

  const router = useRouter()

  const startGameAction = async () => {
    setWaiting(true)

    const response = await fetch('/api/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (response.status === 201) {
      router.push('/game/' + data.game.id)
    } else {
      enqueueSnackbar('Game Creation failed, retry soon', {
        variant: 'error',
      })
      setWaiting(false)
    }
  }

  const goToHistory = () => {
    router.push('history')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-6">
      <NotificationProvider>
        <h1 className="text-black font-bold text-4xl text-center">
          Car D Game
        </h1>
        <Button waiting={waiting} text="START" action={startGameAction} />
        <Button action={goToHistory} text="GAMES HISTORY" />
        <Image
          src={car_gif}
          alt=""
          width={800}
          height={500}
          className=" overflow-hidden"
        />
      </NotificationProvider>
    </main>
  )
}
