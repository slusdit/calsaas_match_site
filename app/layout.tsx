import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MainHeader from './components/MainHeader'
import './globals.css'
import  SessionProvider  from '@/app/components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calsaas Early Warning',
  description: 'Calasas Early Warning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <SessionProvider>
          <main className="bg-slate-100 h-dvh">
            <MainHeader />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}
