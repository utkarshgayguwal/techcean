import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const links = ['Services', 'Work', 'Process', 'About', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#" className={styles.logo} data-hover>
        <span className={styles.logoTag}>&lt;</span>
        <span className={styles.logoName}>TechCean</span>
        <span className={styles.logoTag}>/&gt;</span>
      </a>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {links.map((l, i) => (
          <li key={l} style={{ '--i': i }}>
            <a href={`#${l.toLowerCase()}`} data-hover onClick={() => setMenuOpen(false)}>
              <span className={styles.linkNum}>0{i + 1}</span>
              {l}
            </a>
          </li>
        ))}
      </ul>

      <a href="#contact" className={styles.cta} data-hover>
        <span>Get Started</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </a>

      <button className={`${styles.burger} ${menuOpen ? styles.active : ''}`}
        onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}
