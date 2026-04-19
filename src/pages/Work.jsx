import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Work.module.css";
import Nav from "../components/Nav.jsx";
import PageHero from "../components/PageHero.jsx";
import { G } from "../data/theme.js";
import { CATEGORIES, PROJECTS, PROCESS_STEPS, TESTI } from "../data/work.js";
import "../styles/global.css";

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
  return (
    <PageHero
      badge="CASE STUDIES &amp; PORTFOLIO"
      title={<><span>Work we're </span><span style={{ background: `linear-gradient(100deg,${G.accent},${G.green})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>proud of</span></>}
      subtitle="Real products. Real clients. Real results — from zero to production-ready, these are the digital systems we've built that are live and performing today."
      stats={[
        { value: "50+", label: "Projects" },
        { value: "12", label: "Industries" },
        { value: "98%", label: "Satisfaction" },
      ]}
    />
  );
}

/* ── FILTER BAR ── */
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
