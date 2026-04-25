import ScrollReveal from './ScrollReveal'

const CARDS = [
  {
    n: '01',
    title: 'Selective Investment Strategy',
    desc: 'We apply rigorous screening to identify businesses with strong fundamentals, scalable models, and exceptional leadership. Quality over quantity — always.',
  },
  {
    n: '02',
    title: 'Long-Term Partnership Mindset',
    desc: 'We go beyond writing checks. Our team engages actively through mentorship, network access, and strategic guidance — committed to your success at every stage.',
  },
  {
    n: '03',
    title: 'Growth-Driven Execution',
    desc: 'We work alongside founders to set ambitious milestones, track performance rigorously, and adapt quickly. Disciplined execution is at the heart of what we do.',
  },
  {
    n: '04',
    title: 'Ecosystem Building',
    desc: 'By connecting entrepreneurs, co-investors, and industry experts, we create a thriving network that amplifies value and opens doors that capital alone cannot.',
  },
]

export default function Philosophy() {
  return (
    <section className="section" id="philosophy">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-label">03 · Philosophy</div>
            <h2 className="section-title">Our Approach</h2>
            <p className="section-subtitle">Beyond capital — a true growth partnership</p>
            <div className="gold-divider" style={{ marginTop: '20px' }}>
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>
        </ScrollReveal>

        <div className="approach-grid">
          {CARDS.map(({ n, title, desc }, i) => (
            <ScrollReveal key={n} delay={i * 100}>
              <div className="approach-card card">
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="approach-number">{n}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
