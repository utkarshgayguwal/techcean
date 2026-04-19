import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

/* Animated typewriter for the bracket logo */
function TypewriterTag() {
  const words = ['TechCean', 'Innovation', 'AI Solutions', 'Web Dev', 'The Future'];
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  return (
    <div className={styles.codeTag}>
      <span className={styles.bracket}>&lt;</span>
      <span className={styles.tagWord}>{displayed}</span>
      <span className={styles.cursor2}>|</span>
      <span className={styles.bracket}>/&gt;</span>
    </div>
  );
}

/* Canvas grid with floating nodes */
function GridCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let W, H;
    const nodes = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const NODE_COUNT = 55;
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * 1200,
        y: Math.random() * 800,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // grid dots
      ctx.fillStyle = 'rgba(0,210,255,0.06)';
      const spacing = 48;
      for (let x = 0; x < W; x += spacing) {
        for (let y = 0; y < H; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // nodes & edges
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,210,255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,210,255,0.55)';
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <GridCanvas />

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          <span>Available for new projects</span>
        </div>

        <TypewriterTag />

        <h1 className={styles.headline}>
          We build<br />
          <em>scalable digital</em><br />
          products
        </h1>

        <p className={styles.sub}>
          From AI integrations to full-stack platforms — TechCean architects
          the systems that power tomorrow's businesses.
        </p>

        <div className={styles.actions}>
          <a href="#services" className={styles.btnPrimary} data-hover>
            Explore Services
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
          <a href="#work" className={styles.btnGhost} data-hover>View Our Work</a>
        </div>

        <div className={styles.stats}>
          {[['50+', 'Projects Delivered'], ['98%', 'Client Satisfaction'], ['5+', 'Years Experience']].map(([n, l]) => (
            <div key={l} className={styles.stat}>
              <span className={styles.statNum}>{n}</span>
              <span className={styles.statLabel}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scrollHint}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
