import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/layout/ClientLayout'

export const metadata: Metadata = {
  title: "Davidson's Neurosurgical Psychiatry Lab",
  description: 'Pioneering research at the intersection of neurosurgery and psychiatry at Sunnybrook Health Sciences Centre',
  icons: {
    icon: '/davidson-lab-logo-icon.png',
    shortcut: '/davidson-lab-logo-icon.png',
    apple: '/davidson-lab-logo-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}