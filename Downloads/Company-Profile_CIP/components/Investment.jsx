import ScrollReveal from './ScrollReveal'

const STAGES = [
  { n: '01', name: 'Pre-Seed & Seed',  desc: 'Early-stage startups with proven concept and strong founding team' },
  { n: '02', name: 'Series A',         desc: 'Companies with product-market fit, ready to scale operations' },
  { n: '03', name: 'Growth Stage',     desc: 'Established businesses expanding to new markets or product lines' },
  { n: '04', name: 'Strategic Buyout', desc: 'Acquiring stakes in mature businesses for value optimization' },
]

const SECTORS = [
  { title: 'Technology & Digital',  desc: 'SaaS, fintech, edtech, healthtech, and digital platforms' },
  { title: 'Consumer & Retail',     desc: 'Innovative brands with strong growth and repeat purchase' },
  { title: 'Financial Services',    desc: 'Lending, insurance, payments, and wealth management' },
  { title: 'Healthcare',            desc: 'Medical devices, telemedicine, and health infrastructure' },
  { title: 'Infrastructure',        desc: 'Logistics, clean energy, and urban development' },
  { title: 'Agribusiness',          desc: 'Agri-tech and food security solutions for Indonesia' },
]

export default function Investment() {
  return (
    <section className="section" id="investment" style={{ background: 'var(--black-2)' }}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-label">04 · Investment</div>
            <h2 className="section-title">Investment Focus</h2>
            <p className="section-subtitle">Where we deploy capital and create value</p>
            <div className="gold-divider" style={{ marginTop: '20px' }}>
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <h4 className="sub-heading">INVESTMENT STAGES</h4>
        </ScrollReveal>
        <div className="stages-list">
          {STAGES.map(({ n, name, desc }, i) => (
            <ScrollReveal key={n} delay={i * 80}>
              <div className="stage-row card">
                <span className="stage-num">{n}</span>
                <span className="stage-name">{name}</span>
                <span className="stage-desc">{desc}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={100}>
          <h4 className="sub-heading" style={{ marginTop: '48px' }}>TARGET SECTORS</h4>
        </ScrollReveal>
        <div className="sectors-grid">
          {SECTORS.map(({ title, desc }, i) => (
            <ScrollReveal key={title} delay={i * 80}>
              <div className="sector-item">
                <span className="diamond-bullet">◆</span>
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
