import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CookiesProvider } from 'next-client-cookies/server';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Laptop Room',
  description: 'Explore top-quality laptops for an unmatched experience. Shop now!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="fantasy">
      <body className={inter.className}>
        <CookiesProvider>
          {children}
        </CookiesProvider>
      </body>
    </html>
  )
}
