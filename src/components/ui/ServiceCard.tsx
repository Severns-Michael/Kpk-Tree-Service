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
import type { Service } from '@/types';
import styles from './ServiceCard.module.css';

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

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon];

  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        {Icon && <Icon size={28} />}
      </div>
      <h3 className={styles.title}>{service.title}</h3>
      <p className={styles.description}>{service.description}</p>
    </div>
  );
}
