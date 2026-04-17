import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin } from 'lucide-react';
import { NAV_ITEMS } from '@/data/navigation';
import { companyInfo } from '@/data/company';
import { handleNavClick } from '@/utils/smoothScroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import clsx from 'clsx';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const menuVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  const reducedMotion = useReducedMotion();
  const menuRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
    } else if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menu = menuRef.current;

    const timer = setTimeout(() => {
      const firstLink = menu.querySelector<HTMLElement>('a[href]');
      if (firstLink) firstLink.focus();
    }, 100);

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const focusableElements = menu.querySelectorAll<HTMLElement>(focusableSelectors);
      if (focusableElements.length === 0) return;

      const firstEl = focusableElements[0] as HTMLElement | undefined;
      const lastEl = focusableElements[focusableElements.length - 1] as HTMLElement | undefined;
      if (!firstEl || !lastEl) return;

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabTrap);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleTabTrap);
    };
  }, [isOpen]);

  const navLinks = NAV_ITEMS.filter((item) => item.id !== 'hero');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            variants={reducedMotion ? undefined : overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.nav
            id="mobile-menu"
            ref={menuRef}
            className={styles.menu}
            variants={reducedMotion ? undefined : menuVariants}
            initial={reducedMotion ? false : 'hidden'}
            animate="visible"
            exit="exit"
            role="dialog"
            aria-label="Mobile navigation"
            aria-modal="true"
          >
            <motion.ul
              className={styles.navList}
              variants={reducedMotion ? undefined : listVariants}
              initial="hidden"
              animate="visible"
              role="list"
            >
              {navLinks.map((item) => (
                <motion.li
                  key={item.id}
                  variants={reducedMotion ? undefined : itemVariants}
                >
                  <a
                    href={item.href}
                    className={clsx(
                      styles.navLink,
                      activeSection === item.id && styles.active
                    )}
                    onClick={(e) => handleNavClick(e, item.id, onClose)}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <div className={styles.contactInfo}>
              <a
                href={`tel:${companyInfo.phone}`}
                className={styles.phoneLink}
              >
                <Phone size={18} />
                {companyInfo.phoneFormatted}
              </a>
              <div className={styles.addressInfo}>
                <MapPin size={16} />
                <span>{companyInfo.address.full}</span>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
