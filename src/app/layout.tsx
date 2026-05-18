
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import '@/globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pastor Brand Website | Faith, Sermons & Spiritual Guidance',
  description: 'Experience powerful sermons, spiritual resources, and a vibrant community dedicated to faith and personal growth.',
  openGraph: {
    title: 'Pastor Brand Website',
    description: 'Experience powerful sermons, spiritual resources, and a vibrant community.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-off-white text-charcoal">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
