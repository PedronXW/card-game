'use client'

import { Button } from '@/components/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function WinnerPage() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const winner = searchParams.get('winner')

  const handleReturnToMenu = () => {
    router.push('/')
  }

  return (
    <Suspense>
      <main
        className={`h-screen w-full flex-col items-center justify-center gap-10 flex`}
      >
        <h1 className="text-black font-bold text-2xl text-center">
          Game Winner:
        </h1>
        <h1 className="text-black font-bold text-2xl text-center">{winner}</h1>

        <Button action={handleReturnToMenu} text="Return to Menu" />
      </main>
    </Suspense>
  )
}
