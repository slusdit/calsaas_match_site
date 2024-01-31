import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import MainHeader from './components/MainHeader'
import './globals.css'
import  SessionProvider  from '@/app/components/SessionProvider'
import { NextRequest } from 'next/server'
import authOptions from '@/pages/api/auth/[...nextauth]'
import { serverAuth } from '@/lib/auth'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calsaas Early Warning',
  description: 'Calasas Early Warning',
}

export default async function RootLayout({
  children,
  req,
}: {
  children: React.ReactNode
  req: NextRequest, 
  session: any
}) {
  const session = await serverAuth()
  // console.log(`Server Session: ${JSON.stringify(session)}`)
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <SessionProvider session={session}>
          <main className="bg-slate-100 h-dvh">
            <MainHeader />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}
