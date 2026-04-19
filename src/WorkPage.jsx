import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./WorkPage.module.css";
import Nav from "./components/Nav.jsx";
import "./styles/global.css";

/* ── SHARED THEME TOKENS ── */
const G = {
  bg: "#04060f", bg2: "#07091a", surface: "#0b0f1e",
  accent: "#00d4ff", green: "#00ff9d", purple: "#8b5cf6",
  text: "#e2eeff", muted: "#4f6080", border: "rgba(0,212,255,.1)",
  mono: "'Space Mono', monospace", display: "'Syne', sans-serif",
};

function Cursor() {
  const curRef = useRef(); const ringRef = useRef();
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, raf;
    const move = e => { mx = e.clientX; my = e.clientY; curRef.current.style.left = mx + "px"; curRef.current.style.top = my + "px"; };
    const loop = () => { rx += (mx - rx) * .13; ry += (my - ry) * .13; ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; raf = requestAnimationFrame(loop); };
    const on = () => { curRef.current.classList.add("hover"); ringRef.current.classList.add("hover"); };
    const off = () => { curRef.current.classList.remove("hover"); ringRef.current.classList.remove("hover"); };
    document.addEventListener("mousemove", move);
    document.querySelectorAll("a,button").forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); });
    loop();
    return () => { cancelAnimationFrame(raf); document.removeEventListener("mousemove", move); };
  }, []);
  return (<><div className="cursor" ref={curRef}/><div className="cursor-ring" ref={ringRef}/></>);
}

/* ── REVEAL HOOK ── */
function useReveal(delay = 0) {
  const ref = useRef(); const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return [ref, vis];
}

/* ── HERO ── */
function WorkHero() {
  const [ref, vis] = useReveal();
  return (
    <section className={styles.hero}>
      {/* grid bg */}
      <svg className={styles.heroBg} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="wgrid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke={G.accent} strokeWidth="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wgrid)" />
      </svg>
      {/* corner brackets */}
      {["tl","tr","bl","br"].map(pos => (
        <svg key={pos} className={`${styles.bracket} ${styles[`bracket_${pos}`]}`} width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M2 16V2h14" stroke={G.accent} strokeWidth="1.5" opacity=".45" />
        </svg>
      ))}
      <div className={styles.heroBg2} />
      <div ref={ref} className={`${styles.heroContent} ${vis ? styles.vis : ""}`}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          CASE STUDIES &amp; PORTFOLIO
        </div>
        <h1 className={styles.heroH1}>
          Work we're <br />
          <span className={styles.grad}>proud of</span>
        </h1>
        <p className={styles.heroSub}>
          Real products. Real clients. Real results — from zero to production-ready, these are the digital systems we've built that are live and performing today.
        </p>
        <div className={styles.heroMeta}>
          <span className={styles.heroMetaItem}><span className={styles.heroMetaNum}>50+</span>Projects</span>
          <span className={styles.heroMetaDivider} />
          <span className={styles.heroMetaItem}><span className={styles.heroMetaNum}>12</span>Industries</span>
          <span className={styles.heroMetaDivider} />
          <span className={styles.heroMetaItem}><span className={styles.heroMetaNum}>98%</span>Satisfaction</span>
        </div>
      </div>
      <div className={styles.scrollHint}>
        <span>SCROLL</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}

/* ── FILTER BAR ── */
const CATEGORIES = ["All", "Web App", "AI / ML", "Mobile", "E-Commerce", "Branding"];

function FilterBar({ active, onChange }) {
  return (
    <div className={styles.filterWrap}>
      <div className={styles.filterBar}>
        <span className={styles.filterLabel}>// Filter</span>
        <div className={styles.filterBtns}>
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`${styles.filterBtn} ${active === c ? styles.filterBtnActive : ""}`}
              onClick={() => onChange(c)}
              data-hover
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── PROJECT DATA ── */
const PROJECTS = [
  {
    id: 1, cat: "Web App", tag: "Web App",
    title: "BuildFast Platform",
    desc: "A SaaS project management platform with real-time collaboration, advanced analytics dashboard, and AI-powered task prioritization.",
    tags: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    metric: "2× faster", metricLabel: "delivery speed",
    year: "2024", client: "BuildFast Inc.",
    color: G.accent, accent: "rgba(0,212,255,.08)",
    featured: true,
  },
  {
    id: 2, cat: "AI / ML", tag: "AI / ML",
    title: "Growlytics AI CRM",
    desc: "AI-powered CRM that tripled lead conversion through predictive scoring, automated nurture sequences, and behavioral segmentation.",
    tags: ["Python", "FastAPI", "OpenAI", "React"],
    metric: "3×", metricLabel: "lead conversion",
    year: "2024", client: "Growlytics",
    color: G.green, accent: "rgba(0,255,157,.06)",
    featured: true,
  },
  {
    id: 3, cat: "E-Commerce", tag: "E-Commerce",
    title: "Shopflow Commerce",
    desc: "Headless e-commerce architecture for a D2C brand — custom storefront, inventory sync, and checkout in under 1.2s.",
    tags: ["Next.js", "Stripe", "Sanity", "Vercel"],
    metric: "1.2s", metricLabel: "checkout speed",
    year: "2023", client: "Shopflow",
    color: G.purple, accent: "rgba(139,92,246,.07)",
    featured: false,
  },
  {
    id: 4, cat: "Mobile", tag: "Mobile",
    title: "HealthTrack App",
    desc: "Cross-platform health monitoring app with wearable sync, AI diet recommendations, and HIPAA-compliant data storage.",
    tags: ["React Native", "Firebase", "ML Kit", "HealthKit"],
    metric: "40K+", metricLabel: "active users",
    year: "2024", client: "HealthTrack",
    color: G.accent, accent: "rgba(0,212,255,.08)",
    featured: false,
  },
  {
    id: 5, cat: "Web App", tag: "Web App",
    title: "Novex Dashboard",
    desc: "Enterprise analytics dashboard with real-time data pipelines, custom chart builder, and role-based access for 200+ users.",
    tags: ["Vue.js", "Python", "Redis", "D3.js"],
    metric: "200+", metricLabel: "enterprise users",
    year: "2023", client: "Novex Corp",
    color: G.green, accent: "rgba(0,255,157,.06)",
    featured: false,
  },
  {
    id: 6, cat: "Branding", tag: "Branding",
    title: "Zeta Brand System",
    desc: "Full brand identity + design system for a fintech startup — logo, typography, color tokens, and component library in Figma.",
    tags: ["Figma", "Tokens", "Storybook", "Design Ops"],
    metric: "80+", metricLabel: "components",
    year: "2023", client: "Zeta Finance",
    color: G.purple, accent: "rgba(139,92,246,.07)",
    featured: false,
  },
  {
    id: 7, cat: "AI / ML", tag: "AI / ML",
    title: "DocuMind AI",
    desc: "Document intelligence platform — upload contracts, invoices, or reports and extract structured data, summaries, and risk flags automatically.",
    tags: ["LangChain", "Pinecone", "FastAPI", "Next.js"],
    metric: "90%", metricLabel: "manual effort saved",
    year: "2024", client: "LegalEdge",
    color: G.accent, accent: "rgba(0,212,255,.08)",
    featured: false,
  },
  {
    id: 8, cat: "E-Commerce", tag: "E-Commerce",
    title: "FreshCart Grocery",
    desc: "Hyperlocal grocery delivery app with live inventory, dynamic pricing engine, and 15-minute delivery slot optimization.",
    tags: ["React Native", "Node.js", "MongoDB", "Redis"],
    metric: "15 min", metricLabel: "delivery window",
    year: "2024", client: "FreshCart",
    color: G.green, accent: "rgba(0,255,157,.06)",
    featured: false,
  },
];

/* ── FEATURED PROJECT CARD (large) ── */
function FeaturedCard({ project, index }) {
  const [ref, vis] = useReveal();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      className={`${styles.featuredCard} ${vis ? styles.vis : ""}`}
      style={{ "--delay": `${index * 0.1}s`, "--accent-bg": project.accent, "--accent-color": project.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.featuredInner}>
        {/* Left: info */}
        <div className={styles.featuredLeft}>
          <div className={styles.cardMeta}>
            <span className={styles.cardTag} style={{ color: project.color, borderColor: `${project.color}33` }}>{project.tag}</span>
            <span className={styles.cardYear}>{project.year}</span>
          </div>
          <h3 className={styles.featuredTitle}>{project.title}</h3>
          <p className={styles.cardDesc}>{project.desc}</p>
          <div className={styles.cardTagsRow}>
            {project.tags.map(t => <span key={t} className={styles.techTag}>{t}</span>)}
          </div>
          <a href="#" className={styles.cardCta} data-hover>
            <span>View Case Study</span>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
          </a>
        </div>
        {/* Right: metric + visual */}
        <div className={styles.featuredRight}>
          <div className={styles.metricBox} style={{ borderColor: `${project.color}22` }}>
            <div className={styles.metricScanline} />
            <span className={styles.metricNum} style={{ color: project.color }}>{project.metric}</span>
            <span className={styles.metricLabel}>{project.metricLabel}</span>
            <span className={styles.metricClient}>{project.client}</span>
          </div>
          {/* Animated circuit lines */}
          <svg className={styles.featuredSvg} viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 90 H80 V40 H180 V90 H240" stroke={project.color} strokeWidth="0.6" opacity="0.18"/>
            <path d="M20 90 H80 V140 H180 V90 H240" stroke={project.color} strokeWidth="0.6" opacity="0.12"/>
            <circle cx="80" cy="90" r="3" fill={project.color} opacity="0.35"/>
            <circle cx="180" cy="90" r="3" fill={project.color} opacity="0.35"/>
            <circle cx="80" cy="40" r="2" fill={project.color} opacity="0.25"/>
            <circle cx="180" cy="40" r="2" fill={project.color} opacity="0.25"/>
            <circle cx="80" cy="140" r="2" fill={project.color} opacity="0.25"/>
            <circle cx="180" cy="140" r="2" fill={project.color} opacity="0.25"/>
            <rect x="105" y="65" width="50" height="50" rx="2" stroke={project.color} strokeWidth="0.8" opacity="0.2"/>
            <text x="130" y="95" fill={project.color} fontSize="9" textAnchor="middle" opacity="0.4" fontFamily="Space Mono, monospace">{"{}"}</text>
          </svg>
        </div>
      </div>
      {/* hover glow */}
      <div className={`${styles.cardGlow} ${hovered ? styles.cardGlowVis : ""}`} style={{ background: `radial-gradient(ellipse at 80% 50%, ${project.color}12, transparent 65%)` }} />
    </div>
  );
}

/* ── REGULAR PROJECT CARD ── */
function ProjectCard({ project, index }) {
  const [ref, vis] = useReveal();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      className={`${styles.projectCard} ${vis ? styles.vis : ""}`}
      style={{ "--delay": `${index * 0.07}s`, "--accent-color": project.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.cardTop}>
        <div className={styles.cardMeta}>
          <span className={styles.cardTag} style={{ color: project.color, borderColor: `${project.color}33` }}>{project.tag}</span>
          <span className={styles.cardYear}>{project.year}</span>
        </div>
        <a href="#" className={`${styles.cardArrow} ${hovered ? styles.cardArrowVis : ""}`} data-hover>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3h10v10M3 13L13 3" stroke={project.color} strokeWidth="1.4" strokeLinecap="round"/></svg>
        </a>
      </div>
      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardDesc}>{project.desc}</p>
      <div className={styles.cardTagsRow}>
        {project.tags.map(t => <span key={t} className={styles.techTag}>{t}</span>)}
      </div>
      <div className={styles.cardBottom}>
        <div className={styles.cardMetric}>
          <span className={styles.cardMetricNum} style={{ color: project.color }}>{project.metric}</span>
          <span className={styles.cardMetricLabel}>{project.metricLabel}</span>
        </div>
        <a href="#" className={styles.cardLink} data-hover>
          View Study <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 5.5h9M5.5 1l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
        </a>
      </div>
      {/* scanline on hover */}
      <div className={`${styles.cardScanline} ${hovered ? styles.cardScanlineVis : ""}`} />
      <div className={`${styles.cardGlow} ${hovered ? styles.cardGlowVis : ""}`} style={{ background: `radial-gradient(circle at 50% 110%, ${project.color}0f, transparent 60%)` }} />
    </div>
  );
}

/* ── MARQUEE ── */
function Marquee() {
  const items = ["BuildFast", "✦", "Growlytics", "✦", "Shopflow", "✦", "Novex Corp", "✦", "HealthTrack", "✦", "DocuMind", "✦"];
  const all = [...items, ...items, ...items, ...items];
  return (
    <div className={styles.marqueeWrap}>
      <div className={styles.marqueeTrack}>
        {all.map((x, i) => x === "✦"
          ? <span key={i} className={styles.marqueeDot}>✦</span>
          : <span key={i} className={styles.marqueeItem}>{x}</span>
        )}
      </div>
    </div>
  );
}

/* ── PROCESS / HOW WE WORK ── */
const PROCESS_STEPS = [
  { num: "01", title: "Discovery", desc: "We deep-dive into your domain, users, and goals — aligning on the problem before touching any code.", icon: "◎" },
  { num: "02", title: "Architecture", desc: "We design the system — database schema, API contracts, component structure — so there are zero surprises later.", icon: "⬡" },
  { num: "03", title: "Build Sprint", desc: "Two-week sprints with daily standups, live staging previews, and direct communication — no middle-men.", icon: "⚡" },
  { num: "04", title: "Launch & Scale", desc: "We ship, monitor, and iterate. Post-launch support is part of every engagement — we don't disappear.", icon: "▲" },
];

function ProcessStrip() {
  const [ref, vis] = useReveal();
  return (
    <section className={styles.processSection}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionLabel}><span className={styles.slashGreen}>//</span> How We Work</div>
        <h2 className={styles.sectionTitle}>The <span className={styles.grad}>process</span></h2>
        <div ref={ref} className={styles.processGrid}>
          {PROCESS_STEPS.map((s, i) => {
            const [stepRef, stepVis] = useReveal();
            return (
              <div key={s.num} ref={stepRef} className={`${styles.processCard} ${stepVis ? styles.vis : ""}`} style={{ "--delay": `${i * 0.1}s` }}>
                <div className={styles.processNum}>{s.num}</div>
                <div className={styles.processIcon}>{s.icon}</div>
                <h4 className={styles.processTitle}>{s.title}</h4>
                <p className={styles.processDesc}>{s.desc}</p>
                {i < PROCESS_STEPS.length - 1 && <div className={styles.processConnector} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIAL STRIP ── */
const TESTI = [
  { q: "TechCean delivered our platform 2 weeks ahead of schedule. The code quality and attention to detail was extraordinary.", name: "Aryan Sharma", role: "Founder — BuildFast", init: "AS", color: G.accent },
  { q: "Their AI integration tripled our lead conversion rate. Genuinely one of the best technical teams I've worked with.", name: "Priya Mehta", role: "CTO — Growlytics", init: "PM", color: G.green },
  { q: "From design to deployment the process was smooth, transparent and professional. Will definitely work with them again.", name: "Rahul Desai", role: "Product Manager — Novex", init: "RD", color: G.purple },
];

function Testimonials() {
  return (
    <section className={styles.testiSection}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionLabel}><span className={styles.slashGreen}>//</span> Client Voices</div>
        <h2 className={styles.sectionTitle}>Trusted by <span className={styles.grad}>builders</span></h2>
        <div className={styles.testiGrid}>
          {TESTI.map((t, i) => {
            const [ref, vis] = useReveal();
            return (
              <div key={t.name} ref={ref} className={`${styles.testiCard} ${vis ? styles.vis : ""}`} style={{ "--delay": `${i * 0.1}s` }}>
                <div className={styles.testiQuoteIcon} style={{ color: t.color }}>"</div>
                <div className={styles.testiStars}>
                  {[...Array(5)].map((_, j) => <div key={j} className={styles.star} />)}
                </div>
                <p className={styles.testiQ}>"{t.q}"</p>
                <div className={styles.testiAuthor}>
                  <div className={styles.testiAvatar} style={{ background: `linear-gradient(135deg, ${t.color}, ${G.purple})`, color: "#000" }}>{t.init}</div>
                  <div>
                    <div className={styles.testiName}>{t.name}</div>
                    <div className={styles.testiRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── CTA STRIP ── */
function CTAStrip() {
  const [ref, vis] = useReveal();
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaBg} />
      <div className={styles.sectionInner}>
        <div ref={ref} className={`${styles.ctaContent} ${vis ? styles.vis : ""}`}>
          <div className={styles.sectionLabel}><span className={styles.slashGreen}>//</span> Let's Build</div>
          <h2 className={styles.ctaTitle}>
            Have a project<br />
            <span className={styles.grad}>in mind?</span>
          </h2>
          <p className={styles.ctaSub}>Let's turn your idea into a live, scalable product. Drop us a message and we'll respond within 24 hours.</p>
          <div className={styles.ctaBtns}>
            <a href="mailto:hello@techcean.co.in" className={styles.btnPrimary} data-hover>
              Start a Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </a>
            <a href="https://techcean.co.in" className={styles.btnGhost} data-hover>Visit Website</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <a href="/" className={styles.logo}>
          <span className={styles.logoTag}>&lt;</span>TechCean<span className={styles.logoTag}>/&gt;</span>
        </a>
        <span className={styles.footerCopy}>© 2025 TechCean. All rights reserved.</span>
        <div className={styles.footerLinks}>
          {["Privacy", "Terms", "GitHub"].map(l => <a key={l} href="#" className={styles.footerLink}>{l}</a>)}
        </div>
      </div>
    </footer>
  );
}

/* ── MAIN PAGE ── */
export default function WorkPage() {
  const [filter, setFilter] = useState("All");
  const featured = PROJECTS.filter(p => p.featured && (filter === "All" || p.cat === filter));
  const regular = PROJECTS.filter(p => !p.featured && (filter === "All" || p.cat === filter));

  return (
    <>
      <Cursor />
      <Nav active='Work' />
      <WorkHero />
      <FilterBar active={filter} onChange={setFilter} />

      {/* Featured Projects */}
      {featured.length > 0 && (
        <section className={styles.featuredSection}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionLabel}><span className={styles.slashGreen}>//</span> Featured Work</div>
            <div className={styles.featuredGrid}>
              {featured.map((p, i) => <FeaturedCard key={p.id} project={p} index={i} />)}
            </div>
          </div>
        </section>
      )}

      <Marquee />

      {/* Regular Grid */}
      {regular.length > 0 && (
        <section className={styles.projectsSection}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionLabel}><span className={styles.slashGreen}>//</span> All Projects</div>
            <h2 className={styles.sectionTitle}>More <span className={styles.grad}>case studies</span></h2>
            <div className={styles.projectsGrid}>
              {regular.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          </div>
        </section>
      )}

      <ProcessStrip />
      <Testimonials />
      <CTAStrip />
      <Footer />
    </>
  );
}
