import RoundProvider from '@/contexts/RoundContext'

export default function RoundLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <RoundProvider>{children}</RoundProvider>
    </div>
  )
}
