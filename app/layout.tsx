import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Supra Template App',
  description:
    'Start your Supra journey here, without unnecessary configuration and setup. Just clone it and code on top of it. Powered by Nightly Wallet.',
  twitter: {
    title: 'Supra Template App',
    description:
      'Start your Supra journey here, without unnecessary configuration and setup. Just clone it and code on top of it. Powered by Nightly Wallet.',
    images: 'https://supra-web3-template.nightly.app/preview_supra.png',
    card: 'summary_large_image',
    site: '@nightly_app'
  },
  openGraph: {
    title: 'Supra Template App',
    description:
      'Start your Supra journey here, without unnecessary configuration and setup. Just clone it and code on top of it. Powered by Nightly Wallet.',
    images: 'https://supra-web3-template.nightly.app/preview_supra.png',
    url: 'https://supra-web3-template.nightly.app',
    type: 'website'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
