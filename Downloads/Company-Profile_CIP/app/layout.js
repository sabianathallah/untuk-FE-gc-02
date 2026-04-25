import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://citraip.co.id'),
  title: 'PT Citra Investama Palapa — Venture Capital & Investment Partner Indonesia',
  description:
    'PT Citra Investama Palapa adalah perusahaan venture capital dan fundraising yang berdiri sejak 2021, berfokus pada pendanaan dan pengembangan bisnis berpotensi tinggi di Indonesia.',
  keywords: [
    'Citra Investama Palapa',
    'CIP',
    'venture capital Indonesia',
    'investasi startup Indonesia',
    'fundraising Jakarta',
    'modal ventura',
    'investor Indonesia',
    'pendanaan bisnis',
  ],
  authors: [{ name: 'PT Citra Investama Palapa' }],
  creator: 'PT Citra Investama Palapa',
  publisher: 'PT Citra Investama Palapa',
  alternates: {
    canonical: 'https://citraip.co.id',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://citraip.co.id',
    siteName: 'PT Citra Investama Palapa',
    title: 'PT Citra Investama Palapa — Venture Capital & Investment Partner Indonesia',
    description:
      'PT Citra Investama Palapa adalah perusahaan venture capital dan fundraising yang berdiri sejak 2021, berfokus pada pendanaan dan pengembangan bisnis berpotensi tinggi di Indonesia.',
    images: [{ url: '/portraits/logo.jpeg', width: 1200, height: 630, alt: 'PT Citra Investama Palapa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PT Citra Investama Palapa — Venture Capital Indonesia',
    description: 'Venture capital dan fundraising company berfokus pada bisnis berpotensi tinggi di Indonesia.',
    images: ['/portraits/logo.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: '0pIGAwF0fO-xuhu-_pWOQ9CjjTAKmOHfZoEBAwXYoa0',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
