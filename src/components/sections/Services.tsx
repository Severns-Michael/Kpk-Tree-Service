import { motion } from 'motion/react';
import {
  TreePine,
  Axe,
  CircleDot,
  Leaf,
  Flower2,
  Mountain,
  CloudLightning,
  Sprout,
  Home,
  Droplets,
  RectangleHorizontal,
} from 'lucide-react';
import { staggerContainer, staggerItem } from '@/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { services } from '@/data/services';
import styles from './Services.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  TreePine,
  Axe,
  CircleDot,
  Leaf,
  Flower2,
  Mountain,
  CloudLightning,
  Sprout,
  Home,
  Droplets,
  RectangleHorizontal,
};

export function Services() {
  const reducedMotion = useReducedMotion();

  return (
    <div className={styles.services}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.titleGreen}>Our </span>
          <span className={styles.titleOrange}>Services</span>
        </h2>
        <p className={styles.subtitle}>
          From tree care to property maintenance, we handle it all with professionalism and expertise.
        </p>
      </div>

      <motion.ul
        className={styles.list}
        variants={reducedMotion ? undefined : staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        role="list"
      >
        {services.map((service) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.li
              key={service.id}
              className={styles.item}
              variants={reducedMotion ? undefined : staggerItem}
            >
              <div className={styles.iconWrapper}>
                {Icon && <Icon size={28} />}
              </div>
              <div className={styles.content}>
                <h3 className={styles.serviceName}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.description}</p>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}
