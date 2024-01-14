import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Laptop Room - Wishlist',
  description: 'List of all wishlist from user',
}

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
        <Navbar />
        {children}
        <Footer />
    </section>
  )
}