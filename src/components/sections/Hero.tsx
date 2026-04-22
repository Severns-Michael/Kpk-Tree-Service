import { motion } from 'motion/react';
import { Phone, ChevronDown } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { companyInfo } from '@/data/company';
import { scrollToSection } from '@/utils/smoothScroll';
import { FallingLeaves } from '@/components/ui/FallingLeaves';
import { TreeSilhouettes } from '@/components/ui/TreeSilhouettes';
import { TransparentLogo } from '@/components/ui/TransparentLogo';
import logoImg from '@/assets/logo.jpg';
import styles from './Hero.module.css';

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <div className={styles.hero}>
      <div className={styles.overlay} />
      <TreeSilhouettes />
      <FallingLeaves />
      <motion.div
        className={styles.content}
        variants={reducedMotion ? undefined : staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className={styles.logoWrapper}
          variants={reducedMotion ? undefined : staggerItem}
        >
          <TransparentLogo
            src={logoImg}
            alt="KPK Tree Service logo"
            className={styles.logo}
            color="#c45e0a"
            threshold={120}
          />
        </motion.div>

        <motion.h1
          className={styles.title}
          variants={reducedMotion ? undefined : staggerItem}
        >
          <span className={styles.srOnly}>KPK Tree Service &ndash; </span>
          <span className={styles.titleGreen}>Professional Tree Service</span>
          {' & '}
          <span className={styles.titleOrange}>Property Maintenance</span>
          <span className={styles.srOnly}> in Mansfield, Ohio</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          variants={reducedMotion ? undefined : staggerItem}
        >
          Serving Mansfield, Ohio &amp; Surrounding Areas
        </motion.p>

        <motion.div
          className={styles.ctas}
          variants={reducedMotion ? undefined : staggerItem}
        >
          <a
            href={`tel:${companyInfo.phone}`}
            className={styles.ctaPrimary}
          >
            <Phone size={20} />
            Call Now
          </a>
          <button
            className={styles.ctaSecondary}
            onClick={() => scrollToSection('contact')}
          >
            Free Estimate
          </button>
        </motion.div>
      </motion.div>

      <motion.button
        className={styles.scrollIndicator}
        onClick={() => scrollToSection('services')}
        aria-label="Scroll to services"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ChevronDown size={28} />
      </motion.button>
    </div>
  );
}
