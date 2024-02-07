import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MainHeader from './components/layout/MainHeader'
import './globals.css'
import SessionProvider from '@/app/components/layout/SessionProvider'
import { NextRequest } from 'next/server'
import { serverAuth } from '@/lib/auth'
import UnauthorizedButton from './components/buttons/UnauthorizedButton'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from './components/ThemeProvider'
import MainFooter from './components/layout/MainFooter'


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
    <html lang="en" className='no-scrollbar'>
      <body suppressHydrationWarning={true} className={` ${inter.className}`}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
          <MainHeader />
            <main className="mt-(-10)">
              {session ? children :
                <UnauthorizedButton
                  home
                />}
              <Toaster richColors />
            </main>
            <MainFooter />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
