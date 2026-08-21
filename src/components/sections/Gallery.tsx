import { motion } from 'motion/react';
import { staggerContainer, staggerItem } from '@/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { galleryImages } from '@/data/gallery';
import styles from './Gallery.module.css';

export function Gallery() {
  const reducedMotion = useReducedMotion();

  return (
    <div className={styles.gallery}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.titleGreen}>Our </span>
          <span className={styles.titleOrange}>Work</span>
        </h2>
        <p className={styles.subtitle}>
          Real jobs, real results — a look at recent projects from our crew.
        </p>
      </div>

      <motion.ul
        className={styles.grid}
        variants={reducedMotion ? undefined : staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        role="list"
      >
        {galleryImages.map((image) => (
          <motion.li
            key={image.id}
            className={styles.item}
            variants={reducedMotion ? undefined : staggerItem}
          >
            <figure className={styles.figure}>
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                className={styles.image}
              />
              <figcaption className={styles.caption}>{image.caption}</figcaption>
            </figure>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
