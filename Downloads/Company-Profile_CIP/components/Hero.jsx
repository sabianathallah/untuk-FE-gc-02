'use client'
import { useState, useEffect } from 'react'

function AnimatedName({ text, baseDelay }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="hero-char"
          style={{ animationDelay: `${baseDelay + i * 40}ms` }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </>
  )
}

export default function Hero() {
  const [hideScroll, setHideScroll] = useState(false)

  useEffect(() => {
    const onScroll = () => setHideScroll(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero corner-wrap" id="top">
      <div className="hero-dot-grid" />
      <div className="hero-sweep" />

      <div className="hero-content">
        <img
          src="/portraits/logo.jpeg"
          alt="PT Citra Investama Palapa"
          className="hero-logo"
        />

        <div className="gold-divider hero-divider">
          <span className="line" />
          <span className="diamond" />
          <span className="line" />
        </div>

        <h1 className="hero-company-name">
          <span className="hero-pt">
            <AnimatedName text="PT CITRA" baseDelay={800} />
          </span>
          <span className="hero-main">
            <AnimatedName text="INVESTAMA PALAPA" baseDelay={1180} />
          </span>
        </h1>

        <div className="gold-divider hero-divider-2">
          <span className="line" />
          <span className="diamond" />
          <span className="line" />
        </div>

        <p className="hero-tagline">
          S T R A T E G I C &nbsp; I N V E S T M E N T &nbsp;&amp;&nbsp; G R O W T H &nbsp; P A R T N E R
        </p>

        <div className="hero-badge">
          ESTABLISHED&nbsp;2021 &nbsp;·&nbsp; JAKARTA,&nbsp;INDONESIA
        </div>
      </div>

      <div className={`hero-scroll-indicator${hideScroll ? ' hidden' : ''}`}>
        <span>SCROLL</span>
        <div className="hero-scroll-line" />
      </div>

      <div className="hero-bottom-bar">
        Building the Future Through Smart Investments and Meaningful Partnerships
      </div>
    </section>
  )
}
