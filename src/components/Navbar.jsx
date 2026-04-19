import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const links = [
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/work' },
  { name: 'Process', href: '/process' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="/" className={styles.logo} data-hover>
        <span className={styles.logoTag}>&lt;</span>
        <span className={styles.logoName}>TechCean</span>
        <span className={styles.logoTag}>/&gt;</span>
      </a>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {links.map((l, i) => (
          <li key={l.name} style={{ '--i': i }}>
            <a 
              href={l.href} 
              data-hover 
              onClick={() => setMenuOpen(false)}
              className={active === l.name ? styles.activeLink : ''}
            >
              {l.name}
            </a>
          </li>
        ))}
      </ul>

      <a href="/contact" className={styles.cta} data-hover>
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
