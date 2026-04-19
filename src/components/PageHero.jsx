import { useRef, useEffect, useState } from 'react';
import "./Hero.module.css";

const G = {
  accent: "#00d4ff",
  green: "#00ff9d",
  text: "#e2eeff",
  muted: "#4f6080",
  border: "rgba(0,212,255,.1)",
  mono: "'Space Mono', monospace",
};

function HeroCanvas() {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let W, H, raf, pts = [];
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    for (let i = 0; i < 50; i++) {
      pts.push({ x: Math.random() * 1600, y: Math.random() * 900, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 1.5 + .4 });
    }
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let x = 0; x < W; x += 50) {
        for (let y = 0; y < H; y += 50) {
          ctx.beginPath(); ctx.arc(x, y, .8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0,212,255,.06)"; ctx.fill();
        }
      }
      pts.forEach((a, i) => {
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,212,255,.5)"; ctx.fill();
        pts.slice(i + 1).forEach(b => {
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,212,255,${(1 - d / 140) * .15})`; ctx.lineWidth = .5; ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

function useReveal() {
  const ref = useRef();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, vis];
}

export default function Hero({ badge, title, subtitle, stats }) {
  const [ref, vis] = useReveal();
  
  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      padding: "8rem 4rem 5rem",
    }}>
      <HeroCanvas />
      <div style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 700,
        height: 400,
        background: "radial-gradient(ellipse, rgba(0,212,255,.065), transparent 70%)",
        pointerEvents: "none",
      }} />
      
      {[["tl", "top:2rem;left:2rem"], ["tr", "top:2rem;right:2rem;transform:scaleX(-1)"], ["bl", "bottom:2rem;left:2rem;transform:scaleY(-1)"], ["br", "bottom:2rem;right:2rem;transform:scale(-1,-1)"]].map(([pos, i]) => (
        <svg key={pos} width="38" height="38" style={{ position: "absolute", ...Object.fromEntries(pos.split(";").map(x => x.split(":"))) }} viewBox="0 0 38 38" fill="none">
          <path d="M2 17V2h15" stroke={G.accent} strokeWidth="1.5" opacity=".4" />
        </svg>
      ))}

      <div ref={ref} style={{
        position: "relative",
        zIndex: 2,
        textAlign: "center",
        maxWidth: 760,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(32px)",
        transition: "opacity .8s, transform .8s",
      }}>
        {badge && (
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: ".3rem .9rem",
            border: "1px solid rgba(0,255,157,.22)",
            background: "rgba(0,255,157,.05)",
            fontFamily: G.mono,
            fontSize: ".65rem",
            letterSpacing: ".1em",
            color: G.green,
            marginBottom: "1.4rem",
          }}>
            <span style={{ width: 6, height: 6, background: G.green, borderRadius: "50%", animation: "pulse 2s infinite" }} />
            {badge}
          </div>
        )}

        <h1 style={{
          fontSize: "clamp(3rem,7vw,6rem)",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-.035em",
          marginBottom: "1.4rem",
          color: G.text,
        }}>
          {title}
        </h1>

        {subtitle && (
          <p style={{
            fontSize: "clamp(.9rem,1.4vw,1.05rem)",
            color: G.muted,
            lineHeight: 1.78,
            maxWidth: 520,
            margin: "0 auto 2.5rem",
          }}>
            {subtitle}
          </p>
        )}

        {stats && (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
            paddingTop: "2rem",
            borderTop: `1px solid ${G.border}`,
          }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".25rem" }}>
                <span style={{
                  fontFamily: G.mono,
                  fontSize: "clamp(1.6rem,3vw,2.4rem)",
                  fontWeight: 700,
                  color: G.accent,
                  letterSpacing: "-.02em",
                }}>
                  {stat.value}
                </span>
                <span style={{
                  fontFamily: G.mono,
                  fontSize: ".62rem",
                  color: G.muted,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{
        position: "absolute",
        bottom: "2.2rem",
        right: "4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        fontFamily: G.mono,
        fontSize: ".6rem",
        letterSpacing: ".14em",
        color: G.muted,
        writingMode: "vertical-rl",
        zIndex: 2,
      }}>
        <span>SCROLL</span>
        <div style={{
          width: 1,
          height: 58,
          background: `linear-gradient(to bottom,${G.accent},transparent)`,
          animation: "scrollPulse 2s ease-in-out infinite",
        }} />
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:.25;transform:scale(.6)} }
        @keyframes scrollPulse { 0%,100%{transform:scaleY(1);opacity:1}50%{transform:scaleY(.4);opacity:.3} }
      `}</style>
    </section>
  );
}