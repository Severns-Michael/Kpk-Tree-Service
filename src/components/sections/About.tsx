import { motion } from 'motion/react';
import { Shield, DollarSign, Clock, Award } from 'lucide-react';
import { slideInLeft, slideInRight, staggerContainer, staggerItem } from '@/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './About.module.css';

const stats = [
  { icon: Shield, label: 'Licensed & Insured' },
  { icon: DollarSign, label: 'Free Estimates' },
  { icon: Clock, label: 'Fast Response' },
  { icon: Award, label: 'Quality Work' },
];

export function About() {
  const reducedMotion = useReducedMotion();

  return (
    <div className={styles.about}>
      <div className={styles.grid}>
        <motion.div
          className={styles.textContent}
          variants={reducedMotion ? undefined : slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className={styles.title}>
            <span className={styles.titleOrange}>About </span>
            <span className={styles.titleGreen}>KPK Tree Service</span>
          </h2>
          <p className={styles.text}>
            KPK Tree Service is Mansfield, Ohio&apos;s trusted choice for professional tree service
            and property maintenance. We take pride in delivering quality workmanship, reliable
            service, and honest pricing on every job.
          </p>
          <p className={styles.text}>
            From tree trimming and removal to landscaping, roofing, and driveway installation, our
            experienced crew handles it all. No job is too big or too small. We treat every property
            like it&apos;s our own and won&apos;t leave until the job is done right.
          </p>
          <p className={styles.text}>
            We serve Mansfield and the surrounding areas with the dedication and attention to detail
            that our customers have come to expect. Give us a call for a free estimate — you&apos;ll
            see why our customers keep coming back.
          </p>
        </motion.div>

        <motion.div
          className={styles.statsContent}
          variants={reducedMotion ? undefined : slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            className={styles.statsGrid}
            variants={reducedMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className={styles.statCard}
                variants={reducedMotion ? undefined : staggerItem}
              >
                <stat.icon size={32} className={styles.statIcon} />
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
