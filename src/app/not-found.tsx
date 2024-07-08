'use client'

import car_gif from '@/assets/car-gif.gif'
import { Button } from '@/components/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  const handleReturnToMenu = () => {
    return router.push('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-6">
      <h1 className="text-black font-bold text-4xl text-center">
        Sorry, the page not exists
      </h1>
      <p>Could not find requested resource</p>
      <Button action={handleReturnToMenu} text="Return to Menu" />

      <Image
        src={car_gif}
        alt=""
        width={800}
        height={500}
        className=" overflow-hidden"
      />
    </div>
  )
}
