import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/Providers'

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

// 🔥 IVS Website Metadata
export const metadata: Metadata = {
  title: 'International Vision School | Excellence in Education',
  description: 'Providing quality education with a blend of scientific excellence and moral values. Playgroup to Grade 10.',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico', // In production you'd use a real apple-touch-icon
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased text-gray-900 bg-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
