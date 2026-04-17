import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { sectionReveal } from '@/animations';
import { scrollConfig } from '@/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Section.module.css';
import clsx from 'clsx';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function Section({ id, children, className, fullWidth = false }: SectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={clsx(styles.section, fullWidth && styles.fullWidth, className)}
      initial="hidden"
      whileInView="visible"
      viewport={scrollConfig.section}
      variants={reducedMotion ? undefined : sectionReveal}
    >
      {fullWidth ? children : <div className={styles.container}>{children}</div>}
    </motion.section>
  );
}
