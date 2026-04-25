'use client'
import { useState, useEffect } from 'react'

const LINKS = [
  { href: '#about',      label: 'About' },
  { href: '#vision',     label: 'Vision' },
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#investment', label: 'Investment' },
  { href: '#process',    label: 'Process' },
  { href: '#leadership', label: 'Leadership' },
  { href: '#contact',    label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]    = useState(false)
  const [progress, setProgress]    = useState(0)
  const [activeSection, setActive] = useState('')
  const [menuOpen, setMenuOpen]    = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y     = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      setScrolled(y > 24)
      setProgress(total > 0 ? (y / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.35, rootMargin: '-68px 0px 0px 0px' }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a href="#top" className="navbar-logo" onClick={close}>
          <img
            src="/portraits/logo.jpeg"
            alt="PT Citra Investama Palapa"
            style={{ height: '40px', width: 'auto' }}
          />
        </a>

        <ul className="navbar-links">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={activeSection === href.slice(1) ? 'active' : ''}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://wa.me/6281212100099"
          className="btn-gold"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>WhatsApp</span>
        </a>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <div
          className="navbar-progress"
          style={{ width: `${progress}%` }}
        />
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <ul>
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={activeSection === href.slice(1) ? 'active' : ''}
                onClick={close}
              >
                {label}
              </a>
            </li>
          ))}
          <li style={{ paddingTop: '8px' }}>
            <a
              href="https://wa.me/6281212100099"
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              style={{ color: 'var(--gold)' }}
            >
              WhatsApp ↗
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
