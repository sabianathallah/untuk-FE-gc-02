const LINKS = [
  { href: '#about',      label: 'About' },
  { href: '#vision',     label: 'Vision' },
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#investment', label: 'Investment' },
  { href: '#process',    label: 'Process' },
  { href: '#leadership', label: 'Leadership' },
  { href: '#contact',    label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <a href="#top" className="footer-logo">
          <img
            src="/portraits/logo.jpeg"
            alt="PT Citra Investama Palapa"
            style={{ height: '48px', width: 'auto' }}
          />
        </a>

        <p className="footer-name">PT Citra Investama Palapa</p>

        <div className="gold-divider footer-divider">
          <span className="line" /><span className="diamond" /><span className="line" />
        </div>

        <p className="footer-address">
          Graha Hanurata, Floor 3B, Jl. Kebon Sirih Raya Kav. 67–69,<br />
          Kec. Menteng, Jakarta Pusat 10340
        </p>

        <nav className="footer-nav">
          {LINKS.map(({ href, label }) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>

        <p className="footer-copy">
          Copyright 2026 PT Citra Investama Palapa. All rights reserved.
        </p>
      </div>
      <div className="footer-bar" />
    </footer>
  )
}
