import { useEffect, useRef, useState } from "react";
import Processor from "./components/Processor";
import ProjectBrief from "./components/ProjectBrief";
import { Arrow, Brand, SectionLabel } from "./components/Primitives";

const faqs = [
  [
    "What can you automate for my business?",
    "Think lead intake, client onboarding, follow-ups, reporting, and repetitive admin. We start by mapping your workflow, then identify where automation will be useful and where a human should stay in control.",
  ],
  [
    "Can you design and build our website?",
    "Yes. We bring strategy, design, and development together, from the first wireframe to a responsive, launch-ready website. We can also connect the website to your existing business tools.",
  ],
  [
    "Do we need to know anything about AI?",
    "No technical background is needed. Bring us the problem. We’ll explain the options in plain language, agree on the scope, and show you how to use the finished system.",
  ],
  [
    "How do you price a project?",
    "Every project starts with a conversation about the goals, scope, and integrations involved. We agree on the deliverables, timeline, and price before development begins.",
  ],
  [
    "What happens after launch?",
    "You receive a walkthrough and documentation so you can confidently use what we’ve built. Ongoing maintenance and improvements can be scoped around your needs.",
  ],
];

const journeyStages = [
  {
    label: "01 / LEAD CAPTURE",
    title: "From enquiry to the right conversation.",
    description:
      "A form, email, or chat message becomes a clear lead record. The system can summarize the need, flag what matters, and send it to the right person to follow up.",
    steps: ["Collect the enquiry", "Understand the need", "Alert your team"],
    outcome: "A useful brief for a timely, personal reply.",
  },
  {
    label: "02 / ONBOARDING",
    title: "A smoother start for every client.",
    description:
      "When a client says yes, the welcome, information requests, and internal handoff can move together. Your team sees what is complete and what still needs attention.",
    steps: ["Send the welcome", "Collect the details", "Prepare the handoff"],
    outcome: "A client who feels looked after and a team that is ready.",
  },
  {
    label: "03 / SUPPORT",
    title: "Answers that keep the human touch.",
    description:
      "A question comes in. The system finds relevant approved information, helps with routine requests, and passes sensitive or unusual cases to a person with the context intact.",
    steps: ["Read the question", "Find the context", "Answer or hand off"],
    outcome: "Faster help, without leaving complex cases to a bot.",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [service, setService] = useState("AI automation");
  const [activeStage, setActiveStage] = useState(0);
  const [immersed, setImmersed] = useState(false);
  const [compactStory, setCompactStory] = useState(() =>
    window.matchMedia("(max-width: 1000px)").matches,
  );
  const lastTrigger = useRef<HTMLElement | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const processorShell = useRef<HTMLDivElement>(null);
  const journeyIntro = useRef<HTMLDivElement>(null);
  function openBrief(selected = "AI automation") {
    lastTrigger.current = document.activeElement as HTMLElement;
    setService(selected);
    setBriefOpen(true);
    setMenuOpen(false);
  }
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    elements.forEach((element) => {
      element.classList.add("will-reveal");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  useEffect(() => {
    const compactQuery = window.matchMedia("(max-width: 1000px)");
    const updateLayout = () => setCompactStory(compactQuery.matches);
    compactQuery.addEventListener("change", updateLayout);
    return () => compactQuery.removeEventListener("change", updateLayout);
  }, []);
  useEffect(() => {
    const stages = Array.from(
      document.querySelectorAll<HTMLElement>("[data-workflow-stage]"),
    );
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function updateStage() {
      frame = 0;
      const midpoint =
        window.innerHeight * (window.innerWidth <= 1000 ? 0.4 : 0.5);
      let current = 0;
      stages.forEach((stage, index) => {
        if (stage.getBoundingClientRect().top <= midpoint) current = index;
      });
      setActiveStage(current);

      // Ease from the hero view into the close-up as the story approaches.
      const introTop = journeyIntro.current?.getBoundingClientRect().top;
      const storyEntry = window.innerHeight * 0.82;
      const transitionDistance = Math.max(420, window.innerHeight * 0.62);
      const raw = Math.max(
        0,
        Math.min(1, (storyEntry - (introTop ?? storyEntry)) / transitionDistance),
      );
      const progress =
        motionPreference.matches || window.innerWidth <= 1000
          ? 0
          : raw * raw * (3 - 2 * raw);
      const heroZoom =
        window.innerWidth > 1000 && window.innerWidth <= 1250 ? 0.78 : 0.93;
      const shell = processorShell.current;
      shell?.style.setProperty("--board-angle-x", `${47 - progress * 31}deg`);
      shell?.style.setProperty("--board-angle-z", `${-35 + progress * 27}deg`);
      shell?.style.setProperty("--story-zoom", `${heroZoom + progress * 0.17}`);
      const firstStageTop = stages[0]?.getBoundingClientRect().top;
      const lastStageBottom = stages.at(-1)?.getBoundingClientRect().bottom;
      const mobileExitLine = Math.min(360, window.innerHeight * 0.48);
      setImmersed(
        firstStageTop !== undefined &&
          lastStageBottom !== undefined &&
          firstStageTop <= window.innerHeight * 0.84 &&
          lastStageBottom > (window.innerWidth <= 1000 ? mobileExitLine : 0),
      );
    }
    function requestUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateStage);
    }
    updateStage();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    motionPreference.addEventListener("change", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      motionPreference.removeEventListener("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  function selectStage(index: number) {
    setActiveStage(index);
    document.getElementById(`workflow-${index}`)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    });
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <nav className="container navigation" aria-label="Main navigation">
          <a href="#" aria-label="Dalaux home">
            <Brand />
          </a>
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="navigation-links"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}{" "}
            <span aria-hidden="true">{menuOpen ? "−" : "+"}</span>
          </button>
          <div
            id="navigation-links"
            className={`nav-links ${menuOpen ? "open" : ""}`}
          >
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Services
            </a>
            <a href="#possibilities" onClick={() => setMenuOpen(false)}>
              Possibilities
            </a>
            <a href="#process" onClick={() => setMenuOpen(false)}>
              Our approach
            </a>
            <button
              className="button button-small button-dark"
              onClick={() => openBrief()}
            >
              Let’s talk <Arrow />
            </button>
          </div>
        </nav>
      </header>
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" /> INTELLIGENT SYSTEMS. EXCEPTIONAL
              DESIGN.
            </div>
            <h1 id="hero-title">
              Built to impress.
              <br />
              Engineered
              <br />
              to <em>do more.</em>
            </h1>
            <p className="hero-description">
              Extraordinary websites. Effortless automation.
              <br className="desktop-break" /> We bring design and intelligence
              together to
              <br className="desktop-break" /> move your business forward.
            </p>
            <div className="hero-actions">
              <button
                className="button button-dark"
                onClick={() => openBrief()}
              >
                Build with Dalaux <Arrow />
              </button>
              <a className="quiet-link" href="#services">
                Explore our services <Arrow down />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="tiny-cross">+</span> HUMAN CREATIVITY. MACHINE
              PRECISION.
            </div>
          </div>
          <div
            className={`processor-shell ${immersed && !compactStory ? "story-mode" : ""}`}
            ref={processorShell}
          >
            <Processor
              active={activeStage}
              immersed={immersed && !compactStory}
              onSelect={selectStage}
            />
          </div>
          <div className="hero-baseline">
            <span>YOUR NEXT CHAPTER, INTELLIGENTLY BUILT.</span>
            <span>
              SCROLL TO EXPLORE <Arrow down />
            </span>
          </div>
          <section className="journey-content" aria-labelledby="journey-title">
            <div className="journey-intro" ref={journeyIntro}>
              <SectionLabel number="00">THE ENGINE IN ACTION</SectionLabel>
              <h2 id="journey-title">
                One engine.
                <br />
                <em>More ways forward.</em>
              </h2>
              <p>
                See how connected tools and thoughtful automation turn routine
                work into a clearer next step for your team.
              </p>
              <span className="journey-scroll-cue">SCROLL TO EXPLORE ↓</span>
            </div>
            <div
              className={`mobile-story-processor ${immersed && compactStory ? "story-mode" : ""}`}
            >
              <Processor
                active={activeStage}
                immersed={immersed && compactStory}
                onSelect={selectStage}
              />
            </div>
            {journeyStages.map((stage, index) => (
              <article
                className={`journey-stage ${activeStage === index ? "is-active" : ""}`}
                data-workflow-stage={index}
                id={`workflow-${index}`}
                key={stage.label}
              >
                <span className="journey-stage-label">{stage.label}</span>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
                <ol className="journey-step-list">
                  {stage.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <div className="journey-outcome">
                  <span>THE OUTCOME</span>
                  <strong>{stage.outcome}</strong>
                </div>
              </article>
            ))}
            <p className="journey-disclaimer">
              Illustrative workflows. Every system is designed around your
              business, tools, and team.
            </p>
          </section>
        </section>
        <section className="tool-strip" aria-label="Integration possibilities">
          <div className="container tool-strip-inner">
            <p>
              Connected to the tools
              <br /> you already love.
            </p>
            <div className="tool-wordmarks">
              <span className="tool-openai">
                <span aria-hidden="true">✳</span> OpenAI
              </span>
              <span className="tool-n8n">
                <span aria-hidden="true">⌘</span> n8n
              </span>
              <span className="tool-make">▰ make</span>
              <span className="tool-zapier">_zapier</span>
              <span className="tool-notion">
                <b>N</b> Notion
              </span>
              <span className="tool-slack">
                <span aria-hidden="true">✣</span> slack
              </span>
            </div>
          </div>
        </section>
        <section className="section container" id="services">
          <div className="section-heading" data-reveal>
            <div>
              <SectionLabel number="01">WHAT WE DO</SectionLabel>
              <h2>
                Beautiful on the surface.
                <br />
                <em>Brilliant underneath.</em>
              </h2>
            </div>
            <p>
              Thoughtful design meets powerful engineering.
              <br /> Everything you need to work smarter
              <br /> and show up better.
            </p>
          </div>
          <div className="services-grid">
            <article className="service-card" data-reveal>
              <div className="service-top">
                <span className="mono">01 / INTELLIGENCE</span>
                <span className="service-symbol" aria-hidden="true">
                  ⌘
                </span>
              </div>
              <div
                className="service-illustration automation-art"
                aria-hidden="true"
              >
                <div className="mini-node">↗</div>
                <span className="mini-connection" />
                <div className="mini-chip">
                  D<span />
                </div>
                <span className="mini-connection" />
                <div className="mini-node">✓</div>
              </div>
              <h3>AI & automation</h3>
              <p>
                Give your team their time back. Intelligent workflows that
                connect your tools and take care of the repetitive work.
              </p>
              <div className="service-tags">
                <span>AI agents</span>
                <span>Workflow automation</span>
                <span>Integrations</span>
              </div>
              <button
                className="service-link"
                onClick={() => openBrief("AI automation")}
              >
                Put intelligence to work <Arrow />
              </button>
            </article>
            <article className="service-card" data-reveal>
              <div className="service-top">
                <span className="mono">02 / EXPERIENCE</span>
                <span className="service-symbol" aria-hidden="true">
                  ⌑
                </span>
              </div>
              <div
                className="service-illustration browser-art"
                aria-hidden="true"
              >
                <div className="mini-browser">
                  <div className="browser-bar">
                    <i />
                    <i />
                    <i />
                    <span>your next big thing</span>
                  </div>
                  <div className="browser-body">
                    <div>
                      <b>
                        Make an
                        <br />
                        <em>impression.</em>
                      </b>
                      <span className="mini-button" />
                    </div>
                    <div className="silver-orb" />
                  </div>
                </div>
              </div>
              <h3>Websites & digital experiences</h3>
              <p>
                Your ambition deserves a better website. Distinctive, intuitive
                experiences built to turn a first impression into a lasting
                connection.
              </p>
              <div className="service-tags">
                <span>Web design</span>
                <span>Development</span>
                <span>Conversion</span>
              </div>
              <button
                className="service-link"
                onClick={() => openBrief("Website design & development")}
              >
                Make your mark online <Arrow />
              </button>
            </article>
          </div>
          <div className="services-note">
            <span className="tiny-cross">+</span>
            <p>
              Better together. Connect your website to the systems that power
              your business.
            </p>
            <a href="#possibilities" aria-label="Explore connected systems">
              <Arrow />
            </a>
          </div>
        </section>
        <section className="possibilities-section" id="possibilities">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <SectionLabel number="02">THE POSSIBILITIES</SectionLabel>
                <h2>
                  Imagine what
                  <br />
                  <em>happens next.</em>
                </h2>
              </div>
              <p>
                A glimpse of what we can build together.
                <br /> Concepts designed around real
                <br /> business challenges.
              </p>
            </div>
            <div className="concept-grid">
              <article className="concept-card" data-reveal>
                <div className="concept-visual workflow-visual">
                  <span className="concept-kicker">WORKFLOW CONCEPT / 001</span>
                  <div className="workflow-stack">
                    <div>
                      <span className="workflow-icon">↗</span>
                      <span>
                        <small>01 / CAPTURE</small>
                        <strong>A new opportunity arrives</strong>
                      </span>
                      <span className="workflow-check">✓</span>
                    </div>
                    <span className="workflow-line" />
                    <div className="highlight-node">
                      <span className="workflow-icon">✳</span>
                      <span>
                        <small>02 / UNDERSTAND</small>
                        <strong>AI qualifies the enquiry</strong>
                      </span>
                      <span className="processing-dots">•••</span>
                    </div>
                    <span className="workflow-line" />
                    <div>
                      <span className="workflow-icon">↗</span>
                      <span>
                        <small>03 / CONNECT</small>
                        <strong>The right person takes it from here</strong>
                      </span>
                    </div>
                  </div>
                  <span className="concept-bottom">
                    LESS ADMIN. MORE OPPORTUNITY.
                  </span>
                </div>
                <div className="concept-description">
                  <div>
                    <h3>From enquiry to opportunity.</h3>
                    <p>An intelligent lead intake & routing system.</p>
                  </div>
                  <button
                    className="circle-button"
                    onClick={() => openBrief("Lead capture & routing")}
                    aria-label="Discuss a lead capture system"
                  >
                    <Arrow />
                  </button>
                </div>
              </article>
              <article className="concept-card" data-reveal>
                <div className="concept-visual atelier-visual">
                  <span className="concept-kicker">WEBSITE CONCEPT / 002</span>
                  <div className="atelier-window">
                    <div className="atelier-nav">
                      <b>ATELIER.</b>
                      <span>Spaces &nbsp; About &nbsp; Contact ↗</span>
                    </div>
                    <div className="atelier-content">
                      <span className="mono">ARCHITECTURE & INTERIORS</span>
                      <h4>
                        Room for
                        <br />
                        <em>something more.</em>
                      </h4>
                      <span className="atelier-explore">
                        Explore the collection ↗
                      </span>
                    </div>
                    <div className="architecture-art">
                      <div className="arch arch-back" />
                      <div className="arch arch-front" />
                      <div className="architecture-floor" />
                      <div className="architecture-plinth" />
                    </div>
                    <div className="atelier-caption">
                      CONSIDERED SPACES. ENDURING DESIGN.
                    </div>
                  </div>
                  <span className="concept-bottom">
                    A DIGITAL EXPERIENCE THAT FEELS LIKE YOU.
                  </span>
                </div>
                <div className="concept-description">
                  <div>
                    <h3>A presence worth remembering.</h3>
                    <p>A bespoke digital experience for a premium brand.</p>
                  </div>
                  <button
                    className="circle-button"
                    onClick={() => openBrief("Website design & development")}
                    aria-label="Discuss a premium website"
                  >
                    <Arrow />
                  </button>
                </div>
              </article>
            </div>
            <p className="concept-disclaimer">
              Design explorations, not client case studies. Your project starts
              with your business.
            </p>
          </div>
        </section>
        <section className="section container" id="process">
          <div className="section-heading" data-reveal>
            <div>
              <SectionLabel number="03">THE APPROACH</SectionLabel>
              <h2>
                Complexity, handled.
                <br />
                <em>Possibility, unlocked.</em>
              </h2>
            </div>
            <p>
              A close collaboration. A clear path forward.
              <br /> From the first conversation
              <br /> to the details that make it yours.
            </p>
          </div>
          <div className="process-grid">
            {[
              [
                "Discover",
                "First, we listen.",
                "Your goals, your challenges, your ambitions. We find the opportunities that matter and define what success looks like.",
              ],
              [
                "Design",
                "Make the right things.",
                "We turn strategy into a tangible direction. You see how it looks, how it works, and how it all fits together.",
              ],
              [
                "Develop",
                "Build with intention.",
                "From the interface to the integrations, we engineer, test, and refine every detail with your team in the loop.",
              ],
              [
                "Launch & evolve",
                "Ready for what’s next.",
                "A considered launch, a clear handover, and a foundation that can grow as your business does.",
              ],
            ].map(([title, subtitle, description], index) => (
              <article className="process-step" key={title} data-reveal>
                <div className="process-line">
                  <span>0{index + 1}</span>
                  <span aria-hidden="true">↗</span>
                </div>
                <h3>{title}</h3>
                <strong>{subtitle}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="philosophy" aria-labelledby="philosophy-title">
          <div className="container philosophy-inner" data-reveal>
            <SectionLabel number="04">THE DALAUX DIFFERENCE</SectionLabel>
            <h2 id="philosophy-title">
              Technology should feel
              <br />
              like an advantage.
              <br />
              <em>Never a complication.</em>
            </h2>
            <div className="principles">
              <div>
                <span>01</span>
                <p>
                  Direct collaboration.
                  <small>Work with the people building your project.</small>
                </p>
              </div>
              <div>
                <span>02</span>
                <p>
                  Design with purpose.
                  <small>Every detail serves a real business need.</small>
                </p>
              </div>
              <div>
                <span>03</span>
                <p>
                  Built to be yours.
                  <small>Clear documentation. A confident handover.</small>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section container faq-section" id="faq">
          <div data-reveal>
            <SectionLabel number="05">A LITTLE MORE CLARITY</SectionLabel>
            <h2>
              Good questions.
              <br />
              <em>Straight answers.</em>
            </h2>
            <p>
              Curious about something else?
              <br />
              <button className="inline-button" onClick={() => openBrief()}>
                Let’s start a conversation <Arrow />
              </button>
            </p>
          </div>
          <div className="faq-list" data-reveal>
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true" className="faq-plus">
                    +
                  </span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="contact-section" id="contact">
          <div className="container contact-inner" data-reveal>
            <div className="eyebrow">
              <span className="status-dot" /> YOUR NEXT CHAPTER STARTS HERE
            </div>
            <h2>
              Let’s make
              <br />
              <em>something exceptional.</em>
            </h2>
            <p>
              A smarter system. A remarkable website.
              <br />A better way forward.
            </p>
            <button className="button button-cream" onClick={() => openBrief()}>
              Tell us what you’re imagining <Arrow />
            </button>
            <span className="contact-note">
              BIG IDEAS WELCOME. SMALL DETAILS CONSIDERED.
            </span>
          </div>
          <div className="contact-circuit" aria-hidden="true" />
        </section>
      </main>
      <footer className="site-footer container">
        <div className="footer-top">
          <a href="#" aria-label="Dalaux home">
            <Brand />
          </a>
          <p>Intelligence, beautifully applied.</p>
          <a className="quiet-link" href="#main">
            Back to top <Arrow />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Dalaux. All rights reserved.</span>
          <span>DESIGNED WITH INTENTION. BUILT FOR WHAT’S NEXT.</span>
        </div>
      </footer>
      <ProjectBrief
        open={briefOpen}
        service={service}
        onClose={() => {
          setBriefOpen(false);
          requestAnimationFrame(() => lastTrigger.current?.focus());
        }}
      />
    </>
  );
}
export default App;
