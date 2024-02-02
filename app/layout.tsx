import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MainHeader from './components/MainHeader'
import './globals.css'
import SessionProvider from '@/app/components/SessionProvider'
import { NextRequest } from 'next/server'
import { serverAuth } from '@/lib/auth'
import Link from 'next/link'
import UnauthorizedButton from './components/UnauthorizedButton'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from './components/ThemeProvider'

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
  req: NextRequest
  session: any
}) {
  const session = await serverAuth()
  // console.log(`Server Session: ${JSON.stringify(session)}`)
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <main className="bg-background text-foreground">
              <MainHeader />
              {session ? children :
                <UnauthorizedButton
                  home
                />}
              <Toaster richColors />
            </main>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
