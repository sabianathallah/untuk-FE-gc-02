import ScrollReveal from './ScrollReveal'

export default function Leadership() {
  return (
    <section className="section" id="leadership" style={{ background: 'var(--black-2)' }}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-label">06 · Leadership</div>
            <h2 className="section-title">Leadership Team</h2>
            <p className="section-subtitle">The people steering our vision and operations</p>
            <div className="gold-divider" style={{ marginTop: '20px' }}>
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="leadership-intro">
            PT Citra Investama Palapa is governed by an experienced leadership structure comprising
            a Board of Commissioners and a Board of Directors, each entrusted with upholding the
            highest standards of governance, strategy, and operational excellence.
          </p>
        </ScrollReveal>

        {/* Board of Commissioners */}
        <ScrollReveal delay={150}>
          <div className="board-table">
            <div className="board-header">BOARD OF COMMISSIONERS</div>
            <div className="table-col-header">
              <span>No.</span>
              <span>Full Name</span>
              <span>Title / Position</span>
            </div>
            <div className="table-row">
              <span>01</span>
              <span>Inderawan Hery Widyanto</span>
              <span>President Commissioner</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Board of Directors */}
        <ScrollReveal delay={250}>
          <div className="board-table">
            <div className="board-header">BOARD OF DIRECTORS</div>
            <div className="table-col-header">
              <span>No.</span>
              <span>Full Name</span>
              <span>Title / Position</span>
            </div>
            <div className="table-row">
              <span>01</span>
              <span>Arastio Gutomo</span>
              <span>President Director</span>
            </div>
            <div className="table-row alt">
              <span>02</span>
              <span>Syahril Amran Sagita</span>
              <span>Director</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={350}>
          <div className="leadership-closing card">
            <span className="diamond-bullet">◆</span>
            Our leadership team brings together decades of experience in investment, governance,
            and business development to guide PT Citra Investama Palapa toward sustainable growth
            and lasting impact.
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
