import { useState, useEffect } from 'react';

const G = {
  bg: "#04060f", bg2: "#07091a", surface: "#0b0f1e",
  accent: "#00d4ff", green: "#00ff9d", purple: "#8b5cf6",
  text: "#e2eeff", muted: "#4f6080", border: "rgba(0,212,255,.1)",
  mono: "'Space Mono', monospace", display: "'Syne', sans-serif",
};

const links = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/work' },
  { name: 'Process', href: '/process' },
];

export default function Nav({ active = 'Home' }) {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: scrolled ? "1rem 4rem" : "1.6rem 4rem",
      transition: "all .4s",
      background: scrolled ? "rgba(4,6,15,.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${G.border}` : "1px solid transparent"
    }}>
      <a href="/" style={{ fontFamily: G.mono, fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 2 }}>
        <span style={{ color: G.green }}>&lt;</span><span>TechCean</span><span style={{ color: G.green }}>/&gt;</span>
      </a>
      <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", alignItems: "center" }}>
        {links.map(l => (
          <li key={l.name}>
            <a 
              href={l.href} 
              style={{ 
                fontFamily: G.mono, fontSize: ".72rem", fontWeight: 700, 
                letterSpacing: ".08em", textTransform: "uppercase",
                color: l.name === active ? G.accent : G.muted,
                transition: "color .2s"
              }} 
              onMouseEnter={e => e.target.style.color = G.text} 
              onMouseLeave={e => e.target.style.color = l.name === active ? G.accent : G.muted}
            >
              {l.name}
            </a>
          </li>
        ))}
      </ul>
      <a href="/contact" style={{ fontFamily: G.mono, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", padding: ".55rem 1.4rem", border: `1px solid ${G.accent}`, color: G.accent, clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)", transition: "all .25s" }}
        onMouseEnter={e => { e.currentTarget.style.background = G.accent; e.currentTarget.style.color = "#000"; e.currentTarget.style.boxShadow = `0 0 24px rgba(0,212,255,.45)`; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = G.accent; e.currentTarget.style.boxShadow = "none"; }}
      >
        Contact Us
      </a>
    </nav>
  );
}