import ScrollReveal from './ScrollReveal'

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-label">07 · Contact</div>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">Reach out to discuss investment opportunities</p>
            <div className="gold-divider" style={{ marginTop: '20px' }}>
              <span className="line" /><span className="diamond" /><span className="line" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150} type="reveal-scale">
          <div className="contact-card card">
            <div className="contact-row">
              <span className="contact-label">OFFICE</span>
              <span className="contact-value">
                Graha Hanurata, Floor 3B, Jl. Kebon Sirih Raya Kav. 67–69,
                RT.1/RW.7, Kb. Sirih, Kec. Menteng, Jakarta Pusat 10340
              </span>
            </div>
            <div className="contact-row">
              <span className="contact-label">EMAIL</span>
              <a href="mailto:contact@citraip.co.id" className="contact-value">
                contact@citraip.co.id
              </a>
            </div>
            <div className="contact-row">
              <span className="contact-label">PHONE</span>
              <a href="tel:+6281212100099" className="contact-value">
                +62 812-1210-0099
              </a>
            </div>
            <div className="contact-row">
              <span className="contact-label">WEBSITE</span>
              <a
                href="https://www.citraip.co.id"
                className="contact-value"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.citraip.co.id
              </a>
            </div>
            <div className="contact-cta">
              <a
                href="https://wa.me/6281212100099"
                className="btn-gold btn-gold-fill"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact via WhatsApp
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
