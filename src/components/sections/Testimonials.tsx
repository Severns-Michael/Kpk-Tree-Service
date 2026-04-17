import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { testimonials } from '@/data/testimonials';
import styles from './Testimonials.module.css';

export function Testimonials() {
  const reducedMotion = useReducedMotion();

  return (
    <div className={styles.testimonials}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.titleGreen}>Customer </span>
          <span className={styles.titleOrange}>Reviews</span>
        </h2>
        <p className={styles.subtitle}>
          Don&apos;t just take our word for it — hear from our satisfied customers.
        </p>
      </div>

      <motion.div
        className={styles.grid}
        variants={reducedMotion ? undefined : staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            className={styles.card}
            variants={reducedMotion ? undefined : staggerItem}
          >
            <Quote size={24} className={styles.quoteIcon} />
            <div className={styles.stars} aria-label={`${String(testimonial.rating)} out of 5 stars`}>
              {Array.from({ length: testimonial.rating }, (_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className={styles.text}>{testimonial.text}</p>
            <div className={styles.author}>
              <span className={styles.name}>{testimonial.name}</span>
              <span className={styles.location}>{testimonial.location}</span>
            </div>
            <span className={styles.service}>{testimonial.service}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
