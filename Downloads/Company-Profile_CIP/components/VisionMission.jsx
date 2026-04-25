import ScrollReveal from './ScrollReveal'

export default function VisionMission() {
  return (
    <section className="section" id="vision" style={{ background: 'var(--black-2)' }}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-label">02 · Vision &amp; Mission</div>
            <h2 className="section-title">Vision &amp; Mission</h2>
            <p className="section-subtitle">Our purpose and guiding principles</p>
            <div className="gold-divider" style={{ marginTop: '20px' }}>
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="vm-card card">
            <div className="vm-label">VISION</div>
            <div className="gold-divider vm-divider">
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
            <p className="vision-text">
              To become the leading investment partner in Indonesia — recognized for identifying
              exceptional opportunities, building high-growth businesses, and creating sustainable
              value that positively impacts entrepreneurs, investors, and communities across the nation.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="vm-card card">
            <div className="vm-label">MISSION</div>
            <div className="gold-divider vm-divider">
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
            <ul className="mission-list">
              {[
                'Identify and invest in high-potential business opportunities across diverse sectors.',
                'Support business growth through strategic partnership, mentorship, and active collaboration.',
                'Provide tailored funding solutions matched to each portfolio company\'s unique needs.',
                'Create long-term value for all stakeholders — investors, founders, and the community.',
                'Uphold the highest standards of integrity, transparency, and professional excellence.',
              ].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
