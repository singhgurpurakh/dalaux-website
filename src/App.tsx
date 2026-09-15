import { useState } from 'react'

const services = [
  {
    index: '01',
    title: 'AI automation',
    description: 'Turn repetitive operations into quiet, reliable systems that give your team time back.',
    tags: ['Agents', 'Workflows', 'Integrations'],
  },
  {
    index: '02',
    title: 'Web experiences',
    description: 'Build a digital front door that feels as sharp as the product or service behind it.',
    tags: ['Strategy', 'Design', 'Development'],
  },
  {
    index: '03',
    title: 'Growth systems',
    description: 'Connect the dots between attention, action, and insight with a stack built to learn.',
    tags: ['Funnels', 'Analytics', 'Optimization'],
  },
]

const steps = [
  ['Discover', 'We find the high-leverage friction hiding in your workflow.'],
  ['Design', 'We turn the opportunity into a focused, testable system.'],
  ['Deploy', 'We launch, measure, and keep improving after the handoff.'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <nav className="nav container" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Dalaux home">
            <span className="brand-mark">D</span>
            <span>dalaux<span className="brand-dot">.</span></span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
            <span className="menu-bars" aria-hidden="true">☰</span>
          </button>

          <div id="primary-menu" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#services" onClick={() => setMenuOpen(false)}>What we do</a>
            <a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
              Start a project <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> Independent digital studio</p>
            <h1>Make the complex feel <em>obvious.</em></h1>
            <p className="hero-text">
              Dalaux helps ambitious teams turn smart ideas into intelligent automation,
              useful websites, and momentum that compounds.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#contact">Build something useful <span>↗</span></a>
              <a className="text-link" href="#services">Explore capabilities <span>↓</span></a>
            </div>
          </div>

          <div className="hero-art" aria-label="Abstract Dalaux system visualization">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="core">
              <span className="core-label">DAL</span>
              <span className="core-pulse" />
            </div>
            <span className="art-note note-top">Signal / 01</span>
            <span className="art-note note-bottom">Build → Learn → Repeat</span>
          </div>
        </section>

        <section className="trust-bar">
          <div className="container trust-inner">
            <span className="trust-label">Built for teams who are</span>
            <span>Curious</span>
            <span>Decisive</span>
            <span>Moving fast</span>
            <span className="trust-arrow" aria-hidden="true">↘</span>
          </div>
        </section>

        <section className="section container" id="services">
          <div className="section-heading">
            <p className="eyebrow"><span className="eyebrow-line" /> Capabilities</p>
            <h2>Useful by design.</h2>
            <p>Less theater. More thoughtful systems that do the work and look good doing it.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.index}>
                <div className="card-topline">
                  <span>{service.index}</span>
                  <span className="card-arrow" aria-hidden="true">↗</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="tag-list">
                  {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="feature-section">
          <div className="container feature-grid">
            <div className="feature-visual">
              <div className="feature-window">
                <div className="window-bar"><span /><span /><span /><b>dalaux / systems</b></div>
                <div className="flow-label">AUTOMATION FLOW <span>LIVE</span></div>
                <div className="flow">
                  <div className="flow-node node-start"><small>TRIGGER</small><strong>New lead</strong></div>
                  <div className="flow-connector" />
                  <div className="flow-node node-main"><small>DALaux AI</small><strong>Qualify + route</strong></div>
                  <div className="flow-connector" />
                  <div className="flow-node node-end"><small>ACTION</small><strong>Team notified</strong></div>
                </div>
                <div className="window-footer"><span>Runs today</span><strong>1,284</strong><span className="up">+18.4%</span></div>
              </div>
            </div>
            <div className="feature-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> The good stuff</p>
              <h2>Small team.<br /><em>Big leverage.</em></h2>
              <p>We bring strategy, creative, and technical execution into one tight loop. That means fewer handoffs, faster learning, and work that stays connected to the outcome.</p>
              <a className="text-link" href="#approach">See how we work <span>↗</span></a>
            </div>
          </div>
        </section>

        <section className="section container approach-section" id="approach">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" /> Our approach</p>
              <h2>Clarity is<br /><em>a superpower.</em></h2>
            </div>
            <p>Every engagement is built around a clear question, a visible next step, and a system your team can own.</p>
          </div>
          <div className="steps-grid">
            {steps.map(([title, description], index) => (
              <div className="step" key={title}>
                <span className="step-number">0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="quote-section">
          <div className="container quote-inner">
            <p className="quote-mark">“</p>
            <blockquote>
              The best automation is the one that makes your team forget it was ever a problem.
            </blockquote>
            <p className="quote-byline">— A principle we build by</p>
          </div>
        </section>

        <section className="contact-section container" id="contact">
          <div className="contact-card">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" /> Your next move</p>
              <h2>Have a good<br /><em>problem?</em></h2>
            </div>
            <div className="contact-action">
              <p>Tell us what is stuck, slow, or ready to become something better.</p>
              <a className="button button-lime" href="mailto:hello@dalaux.ai">hello@dalaux.ai <span>↗</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <a className="brand" href="#top"><span className="brand-mark">D</span><span>dalaux<span className="brand-dot">.</span></span></a>
          <p>Automation, websites, and the space between.</p>
          <span className="footer-meta">© {new Date().getFullYear()} Dalaux AI</span>
        </div>
      </footer>
    </div>
  )
}

export default App
