import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import ClientLayout from '../components/ClientLayout'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Improve font loading performance
})

export const metadata: Metadata = {
  title: 'John Doe - Portfolio',
  description: 'Aliquam ornare vehicula lorem eget condimentum. Mauris eu lobortis magna. Donec faucibus risus id turpis posuere, sed tincidunt orci rhoncus.',
  keywords: 'KEYWORD 1, KEYWORD 2, KEYWORD 3',
  authors: [{ name: 'John Doe' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'John Doe - Portfolio',
    description: 'Aliquam ornare vehicula lorem eget condimentum. Mauris eu lobortis magna. Donec faucibus risus id turpis posuere, sed tincidunt orci rhoncus.',
    url: 'https://yourwebsite.com', // Update with your actual domain
    siteName: 'John Doe Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'John Doe - Portfolio',
    description: 'Aliquam ornare vehicula lorem eget condimentum. Mauris eu lobortis magna. Donec faucibus risus id turpis posuere, sed tincidunt orci rhoncus.',
  },
  icons: {
    icon: [
      {
        url: '/icon.png',
        type: 'image/png',
      },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}