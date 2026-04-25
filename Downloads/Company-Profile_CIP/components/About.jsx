import ScrollReveal from './ScrollReveal'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-label">01 · About</div>
            <h2 className="section-title">Company Overview</h2>
            <p className="section-subtitle">Who we are and what we stand for</p>
            <div className="gold-divider" style={{ marginTop: '20px' }}>
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="about-intro">
            PT Citra Investama Palapa is a venture capital and fundraising company established
            in 2021, dedicated to identifying, funding, and actively supporting high-potential
            businesses across Indonesia. We act as a strategic bridge between visionary
            entrepreneurs and the capital and expertise needed to scale — combining financial
            firepower with hands-on operational guidance to build companies that endure.
          </p>
        </ScrollReveal>

        <div className="pillars-grid">
          {[
            { n: '01', title: 'CAPITAL',     desc: 'Flexible funding instruments tailored to each stage of your business journey.' },
            { n: '02', title: 'PARTNERSHIP', desc: 'Long-term relationships built on trust, transparency, and aligned incentives.' },
            { n: '03', title: 'GROWTH',      desc: 'Active, hands-on support to accelerate scaling and value creation.' },
          ].map(({ n, title, desc }, i) => (
            <ScrollReveal key={n} delay={i * 120}>
              <div className="pillar-card card">
                <div className="pillar-number">{n}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={100}>
          <div className="stats-row">
            {[
              { value: '2021',           label: 'Year Founded' },
              { value: 'Jakarta',        label: 'Headquarters' },
              { value: 'Venture Capital',label: 'Core Business' },
              { value: 'Multi-Sector',   label: 'Investment Focus' },
            ].map(({ value, label }) => (
              <div className="stat" key={label}>
                <span className="stat-value">{value}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
