'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { usePathname } from 'next/navigation'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  
  return (
    <>
      <Navbar />
      <main className={isHomePage ? '' : 'flex-grow'}>
        {children}
      </main>
      {!isHomePage && <Footer />}
    </>
  )
}