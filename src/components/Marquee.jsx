import styles from './Marquee.module.css';

const items = [
  'Website Development', '✦', 'AI Integrations', '✦', 'Mobile Apps',
  '✦', 'UI/UX Design', '✦', 'Cloud & DevOps', '✦', 'E-Commerce', '✦',
  'Website Development', '✦', 'AI Integrations', '✦', 'Mobile Apps',
  '✦', 'UI/UX Design', '✦', 'Cloud & DevOps', '✦', 'E-Commerce', '✦',
];

export default function Marquee() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className={item === '✦' ? styles.dot : styles.item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
