import { useInView } from '../hooks/useInView';
import styles from './Process.module.css';

const steps = [
  { num: '01', title: 'Discovery', desc: 'We dig deep into your goals, users, and technical constraints. No templates — everything is bespoke.' },
  { num: '02', title: 'Architecture', desc: 'System design, tech stack selection, and a clear roadmap before any code is written.' },
  { num: '03', title: 'Build', desc: 'Rapid sprints with full transparency. Staging previews at every milestone.' },
  { num: '04', title: 'Launch & Scale', desc: 'Smooth deployment, thorough QA, and ongoing support as your product grows.' },
];

export default function Process() {
  const [ref, inView] = useInView();
  return (
    <section className={styles.section} id="process">
      <div className={styles.inner} ref={ref}>
        <div className={styles.left}>
          <p className={`${styles.label} ${inView ? styles.vis : ''}`}>
            <span>// </span>How we work
          </p>
          <h2 className={`${styles.title} ${inView ? styles.vis : ''}`}>
            Precision<br />from day<br /><em>one</em>
          </h2>
          <p className={`${styles.sub} ${inView ? styles.vis : ''}`}>
            Our process is designed to eliminate surprises and deliver results — fast.
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`${styles.step} ${inView ? styles.vis : ''}`}
              style={{ '--delay': `${0.2 + i * 0.1}s` }}
            >
              <div className={styles.stepLine}>
                <div className={styles.stepDot} />
                {i < steps.length - 1 && <div className={styles.stepConnector} />}
              </div>
              <div className={styles.stepContent}>
                <span className={styles.stepNum}>{step.num}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
