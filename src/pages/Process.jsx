import { useState, useEffect, useRef } from "react";
import styles from "./Process.module.css";
import Nav from "../components/Nav.jsx";
import PageHero from "../components/PageHero.jsx";
import { G } from "../data/theme.js";
import { STEPS, FAQS, TOOLS } from "../data/process.js";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}
body{background:${G.bg};color:${G.text};font-family:${G.display};overflow-x:hidden;cursor:none;}
::selection{background:${G.accent};color:#000;}a{text-decoration:none;color:inherit;}
.cursor{position:fixed;width:10px;height:10px;background:${G.accent};border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:screen;transition:background .2s,transform .2s;}
.cursor-ring{position:fixed;width:34px;height:34px;border:1px solid rgba(0,212,255,.4);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .3s,height .3s,border-color .3s;}
.cursor.h{background:${G.green};transform:translate(-50%,-50%) scale(2.2);}
.cursor-ring.h{width:56px;height:56px;border-color:${G.green};}
@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.25;transform:scale(.6)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(400%)}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes dash{to{stroke-dashoffset:0}}
`;

/* ── CURSOR ── */
function Cursor() {
  const curRef = useRef(); const ringRef = useRef();
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, raf;
    const move = e => { mx = e.clientX; my = e.clientY; curRef.current.style.left = mx + "px"; curRef.current.style.top = my + "px"; };
    const loop = () => { rx += (mx - rx) * .13; ry += (my - ry) * .13; ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; raf = requestAnimationFrame(loop); };
    const on = () => { curRef.current.classList.add(styles.cursorHover); ringRef.current.classList.add(styles.ringHover); };
    const off = () => { curRef.current.classList.remove(styles.cursorHover); ringRef.current.classList.remove(styles.ringHover); };
    document.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,[data-hover]").forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); });
    loop();
    return () => { cancelAnimationFrame(raf); document.removeEventListener("mousemove", move); };
  }, []);
  return (<><div className={styles.cursor} ref={curRef} /><div className={styles.ring} ref={ringRef} /></>);
}

/* ── REVEAL HOOK ── */
function useReveal(threshold = 0.1) {
  const ref = useRef(); const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold });
    io.observe(el); return () => io.disconnect();
  }, []);
  return [ref, vis];
}

/* ── ANIMATED COUNTER ── */
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, vis] = useReveal();
  useEffect(() => {
    if (!vis) return;
    let start = 0; const end = parseInt(target);
    const step = Math.ceil(end / 40);
    const t = setInterval(() => { start = Math.min(start + step, end); setVal(start); if (start >= end) clearInterval(t); }, 35);
    return () => clearInterval(t);
  }, [vis, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── CANVAS HERO BG ── */
function HeroCanvas() {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let W, H, raf, nodes = [];
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    for (let i = 0; i < 55; i++) nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, r: Math.random() * 1.5 + .4 });
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(0,212,255,.05)";
      for (let x = 0; x < W; x += 52) for (let y = 0; y < H; y += 52) { ctx.beginPath(); ctx.arc(x, y, .9, 0, Math.PI * 2); ctx.fill(); }
      nodes.forEach((a, i) => {
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1;
        nodes.slice(i + 1).forEach(b => {
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = `rgba(0,212,255,${(1 - d / 140) * .15})`; ctx.lineWidth = .5; ctx.stroke(); }
        });
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fillStyle = "rgba(0,212,255,.5)"; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className={styles.heroCanvas} />;
}

/* ── HERO ── */
function Hero() {
  return (
    <PageHero
      badge="OUR METHODOLOGY"
      title={<>Precision from<br /><span className={styles.grad}>day one</span></>}
      subtitle="We don't guess. Every project follows a battle-tested methodology designed to eliminate surprises, ship on time, and scale without pain."
      stats={[
        { value: "50+", label: "Projects Shipped" },
        { value: "98%", label: "On-Time Delivery" },
        { value: "5+", label: "Years Experience" },
      ]}
    />
  );
}


/* ── BIG STEP CARD ── */
function StepCard({ step, index }) {
  const [ref, vis] = useReveal();
  const [open, setOpen] = useState(false);
  const isEven = index % 2 === 1;
  return (
    <div
      ref={ref}
      className={`${styles.stepCard} ${vis ? styles.vis : ""} ${isEven ? styles.stepCardEven : ""}`}
      style={{ "--delay": `${index * 0.08}s`, "--col": step.color }}
    >
      {/* timeline dot */}
      <div className={styles.timelineDot} style={{ borderColor: step.color, boxShadow: `0 0 12px ${step.color}44` }}>
        <div className={styles.timelineDotInner} style={{ background: step.color }} />
      </div>

      <div className={styles.stepInner} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        {/* top row */}
        <div className={styles.stepTop}>
          <div className={styles.stepLeft}>
            <div className={styles.stepPhase} style={{ color: step.color }}>{step.num} — {step.phase}</div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
          </div>
          <div className={styles.stepRight}>
            <div className={styles.stepIcon} style={{ color: step.color }}>{step.icon}</div>
            <div className={styles.stepDuration} style={{ borderColor: `${step.color}33`, color: step.color }}>
              <span className={styles.durationDot} style={{ background: step.color }} />
              {step.duration}
            </div>
          </div>
        </div>

        <p className={styles.stepDesc}>{step.desc}</p>

        {/* expandable details */}
        <div className={`${styles.stepDetails} ${open ? styles.stepDetailsOpen : ""}`}>
          <div className={styles.stepDetailsInner}>
            <div className={styles.detailsLabel} style={{ color: step.color }}>// What we do</div>
            <ul className={styles.detailsList}>
              {step.details.map((d, i) => (
                <li key={i} className={styles.detailItem} style={{ "--i": i }}>
                  <span className={styles.detailBullet} style={{ background: step.color }} />
                  {d}
                </li>
              ))}
            </ul>
            <div className={styles.deliverable}>
              <span className={styles.deliverableLabel}>Deliverable</span>
              <span className={styles.deliverableValue} style={{ color: step.color }}>{step.deliverable}</span>
            </div>
          </div>
        </div>

        {/* scanline on hover */}
        <div className={`${styles.stepScan} ${open ? styles.stepScanVis : ""}`} style={{ background: `linear-gradient(90deg, transparent, ${step.color}55, transparent)` }} />
        <div className={`${styles.stepBorder} ${open ? styles.stepBorderVis : ""}`} style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }} />
      </div>
    </div>
  );
}

/* ── TIMELINE SECTION ── */
function Timeline() {
  const [ref, vis] = useReveal();
  return (
    <section className={styles.timelineSection}>
      <div className={styles.si}>
        <div ref={ref} className={`${styles.tlHeader} ${vis ? styles.vis : ""}`}>
          <div className={styles.sl}><span className={styles.slG}>//</span> Methodology</div>
          <div className={styles.tlHeaderRow}>
            <h2 className={styles.st}>The <span className={styles.grad}>6-phase</span> process</h2>
            <p className={styles.tlSub}>Hover each phase to expand the full breakdown. Every project follows this sequence — no shortcuts.</p>
          </div>
        </div>

        {/* vertical timeline line */}
        <div className={styles.timelineLine}>
          <div className={styles.timelineLineInner} />
        </div>

        <div className={styles.stepsGrid}>
          {STEPS.map((s, i) => <StepCard key={s.num} step={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ── HELPERS ── */
function useInView(threshold=.12) {
  const ref = useRef(); const [v, setV] = useState(false);
  useEffect(()=>{const el=ref.current;if(!el)return;const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);io.disconnect();}},{threshold});io.observe(el);return()=>io.disconnect();},[]);
  return [ref,v];
}
function Reveal({children,delay=0,style={}}) {
  const [ref,v]=useInView();
  return <div ref={ref} style={{opacity:v?1:0,transform:v?"none":"translateY(28px)",transition:`opacity .7s ${delay}s,transform .7s ${delay}s`,...style}}>{children}</div>;
}

/* ── FAQ ── */
function FAQ() {
  const [open, setOpen] = useState(null);
  const [ref, vis] = useReveal();
  return (
    <section style={{padding:"8rem 4rem",background:G.bg2,borderTop:`1px solid ${G.border}`}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <Reveal>
          <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
            <p style={{fontFamily:G.mono,fontSize:".72rem",color:G.accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".9rem",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><span style={{color:G.green}}>//</span>FAQ</p>
            <h2 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,letterSpacing:"-.03em"}}>Common <span style={{background:`linear-gradient(100deg,${G.accent},${G.green})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>questions</span></h2>
          </div>
        </Reveal>
        {FAQS.map((f,i)=>(
          <Reveal key={f.q} delay={i*.06}>
            <div style={{borderBottom:`1px solid ${G.border}`,overflow:"hidden"}}>
              <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1.4rem 0",background:"none",border:"none",cursor:"none",textAlign:"left",gap:"1rem"}}>
                <span style={{fontSize:"1rem",fontWeight:700,color:open===i?G.accent:G.text,transition:"color .25s",letterSpacing:"-.01em"}}>{f.q}</span>
                <span style={{color:open===i?G.accent:G.muted,transition:"transform .3s,color .25s",transform:open===i?"rotate(45deg)":"none",fontSize:"1.4rem",lineHeight:1,flexShrink:0}}>+</span>
              </button>
              <div style={{maxHeight:open===i?200:0,overflow:"hidden",transition:"max-height .4s cubic-bezier(.4,0,.2,1)"}}>
                <p style={{fontSize:".9rem",color:G.muted,lineHeight:1.78,paddingBottom:"1.4rem"}}>{f.a}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── TOOLS STRIP ── */
function ToolsStrip() {
  const [ref, vis] = useReveal();
  return (
    <section className={styles.toolsSection}>
      <div className={styles.si}>
        <div ref={ref} className={`${styles.toolsHeader} ${vis ? styles.vis : ""}`}>
          <div className={styles.sl}><span className={styles.slG}>//</span> Tooling</div>
          <h2 className={styles.st}>Built with the <span className={styles.grad}>right stack</span></h2>
        </div>
        <div className={styles.toolsGrid}>
          {TOOLS.map((t, i) => {
            const [tRef, tVis] = useReveal();
            return (
              <div key={t.label} ref={tRef} className={`${styles.toolCard} ${tVis ? styles.vis : ""}`} style={{ "--delay": `${i * 0.06}s`, "--col": t.color }}>
                <div className={styles.toolIcon} style={{ color: t.color, borderColor: `${t.color}22` }}>{t.icon}</div>
                <span className={styles.toolLabel}>{t.label}</span>
                <div className={styles.toolBar} style={{ background: t.color }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTA() {
  const [ref, vis] = useReveal();
  return (
    <section className={styles.ctaSection} id="contact">
      <div className={styles.ctaGlow} />
      <div className={styles.si}>
        <div ref={ref} className={`${styles.ctaContent} ${vis ? styles.vis : ""}`}>
          <div className={styles.sl}><span className={styles.slG}>//</span> Let's Build</div>
          <h2 className={styles.ctaH}>Ready to start<br /><span className={styles.grad}>your project?</span></h2>
          <p className={styles.ctaP}>Book a free 30-minute discovery call. No sales pitch — just an honest conversation about your goals and how we can help.</p>
          <div className={styles.ctaBtns}>
            <a href="mailto:hello@techcean.co.in" className={styles.btnP} data-hover>
              Book a Call <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </a>
            <a href="/work" className={styles.btnG} data-hover>See Our Work</a>
          </div>
          <div className={styles.ctaMeta}>
            <span className={styles.ctaMetaItem}><span className={styles.ctaDot} style={{ background: "#00ff9d" }} />Free discovery call</span>
            <span className={styles.ctaMetaItem}><span className={styles.ctaDot} style={{ background: "#00d4ff" }} />Reply within 24h</span>
            <span className={styles.ctaMetaItem}><span className={styles.ctaDot} style={{ background: "#8b5cf6" }} />No commitment needed</span>
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
        <a href="/" className={styles.logo}><span className={styles.logoTag}>&lt;</span>TechCean<span className={styles.logoTag}>/&gt;</span></a>
        <span className={styles.footerCopy}>© 2025 TechCean. All rights reserved.</span>
        <div className={styles.footerLinks}>{["Privacy", "Terms", "GitHub"].map(l => <a key={l} href="#" className={styles.footerLink}>{l}</a>)}</div>
      </div>
    </footer>
  );
}

/* ── PAGE ── */
export default function ProcessPage() {
  return (
    <>
      <Cursor />
      <Nav active="Process" />
      <Hero />
      <Timeline />
      <ToolsStrip />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
