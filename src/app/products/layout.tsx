import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Laptop Room - Products',
  description: 'List of all products',
}

export default function ProductsLayout({
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
