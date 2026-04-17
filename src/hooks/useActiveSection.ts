import { useState, useEffect } from 'react';
import { SECTION_IDS } from '@/data/navigation';

export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState<string>(SECTION_IDS[0] ?? 'hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibilityMap = new Map<string, number>();

    SECTION_IDS.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibilityMap.set(sectionId, entry.intersectionRatio);
          });

          let maxRatio = 0;
          let maxSection: string = SECTION_IDS[0] ?? 'hero';
          visibilityMap.forEach((ratio, id) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              maxSection = id;
            }
          });

          if (maxRatio > 0) {
            setActiveSection(maxSection);
          }
        },
        {
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: '-80px 0px -20% 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return activeSection;
}
