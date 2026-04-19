import { useInView } from '../hooks/useInView';
import styles from './Services.module.css';

const services = [
  {
    num: '01',
    icon: '◈',
    title: 'Website Development',
    desc: 'Blazing-fast, pixel-perfect web experiences built with React, Next.js, and modern stacks. From landing pages to enterprise portals.',
    tags: ['React', 'Next.js', 'Node.js', 'Tailwind'],
  },
  {
    num: '02',
    icon: '⬡',
    title: 'AI Integrations',
    desc: 'Embed intelligent automation into your product — LLM-powered features, chatbots, recommendation engines, and custom ML pipelines.',
    tags: ['LLMs', 'OpenAI', 'Python', 'Vector DBs'],
  },
  {
    num: '03',
    icon: '◎',
    title: 'Mobile Applications',
    desc: 'Cross-platform apps built with React Native that feel native on iOS and Android — smooth, responsive, and offline-ready.',
    tags: ['React Native', 'Expo', 'Firebase'],
  },
  {
    num: '04',
    icon: '⬟',
    title: 'UI/UX Design',
    desc: 'Interface design that converts — research-backed, visually refined, and prototyped in Figma before a single line of code.',
    tags: ['Figma', 'Prototyping', 'Design Systems'],
  },
  {
    num: '05',
    icon: '◉',
    title: 'Cloud & DevOps',
    desc: 'Scalable infrastructure, CI/CD pipelines, containerised deployments, and 24/7 monitoring to keep your product running flawlessly.',
    tags: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions'],
  },
  {
    num: '06',
    icon: '⬡',
    title: 'E-Commerce Solutions',
    desc: 'Headless storefronts, payment integrations, inventory management and conversion-optimised checkout flows at any scale.',
    tags: ['Shopify', 'Stripe', 'WooCommerce'],
  },
];

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`${styles.card} ${inView ? styles.visible : ''}`}
      style={{ '--delay': `${index * 0.08}s` }}
      data-hover
    >
      <div className={styles.cardTop}>
        <span className={styles.cardNum}>{service.num}</span>
        <span className={styles.cardIcon}>{service.icon}</span>
      </div>
      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.cardDesc}>{service.desc}</p>
      <div className={styles.cardTags}>
        {service.tags.map(t => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
      </div>
      <div className={styles.cardArrow}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div className={styles.cardGlow} />
    </div>
  );
}

export default function Services() {
  const [titleRef, titleVisible] = useInView();
  return (
    <section className={styles.section} id="services">
      <div className={styles.header} ref={titleRef}>
        <p className={`${styles.label} ${titleVisible ? styles.vis : ''}`}>
          <span>// </span>What we do
        </p>
        <h2 className={`${styles.title} ${titleVisible ? styles.vis : ''}`}>
          Services that<br /><em>scale with you</em>
        </h2>
      </div>

      <div className={styles.grid}>
        {services.map((s, i) => <ServiceCard key={s.num} service={s} index={i} />)}
      </div>
    </section>
  );
}
