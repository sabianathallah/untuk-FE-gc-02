import ScrollReveal from './ScrollReveal'

const STEPS = [
  { n: '01', title: 'Introductory Discussion', desc: 'A concise conversation to understand the business, objectives, and mutual fit.' },
  { n: '02', title: 'Assessment & Alignment',  desc: 'Review of fundamentals, governance readiness, and strategic alignment.' },
  { n: '03', title: 'Investment Committee',    desc: 'Structured review and decision based on clear, predefined criteria.' },
  { n: '04', title: 'Term Finalization',       desc: 'Documentation and closing with defined milestones and responsibilities.' },
]

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-label">05 · Process</div>
            <h2 className="section-title">Investment Process</h2>
            <p className="section-subtitle">A clear, structured path to partnership</p>
            <div className="gold-divider" style={{ marginTop: '20px' }}>
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>
        </ScrollReveal>

        <div className="process-list">
          {STEPS.map(({ n, title, desc }, i) => (
            <ScrollReveal key={n} type="reveal-left" delay={i * 100}>
              <div className="process-row card">
                <div className="process-connector">
                  <div className="process-num">{n}</div>
                </div>
                <div className="process-content">
                  <h3>{title}</h3>
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
