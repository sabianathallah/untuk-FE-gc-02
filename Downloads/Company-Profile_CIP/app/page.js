const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PT Citra Investama Palapa',
  alternateName: 'CIP',
  url: 'https://citraip.co.id',
  logo: 'https://citraip.co.id/portraits/logo.jpeg',
  description:
    'PT Citra Investama Palapa adalah perusahaan venture capital dan fundraising yang berdiri sejak 2021, berfokus pada pendanaan dan pengembangan bisnis berpotensi tinggi di Indonesia.',
  foundingDate: '2021',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Graha Hanurata, Floor 3B, Jl. Kebon Sirih Raya Kav. 67–69',
    addressLocality: 'Jakarta Pusat',
    postalCode: '10340',
    addressCountry: 'ID',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+62-812-1210-0099',
    contactType: 'customer service',
    email: 'contact@citraip.co.id',
  },
  sameAs: ['https://citraip.co.id'],
}

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import VisionMission from '@/components/VisionMission'
import Philosophy from '@/components/Philosophy'
import Investment from '@/components/Investment'
import Process from '@/components/Process'
import Leadership from '@/components/Leadership'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <About />
      <VisionMission />
      <Philosophy />
      <Investment />
      <Process />
      <Leadership />
      <Contact />
      <Footer />
    </main>
  )
}
