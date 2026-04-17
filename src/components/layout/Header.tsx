import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { NAV_ITEMS } from '@/data/navigation';
import { companyInfo } from '@/data/company';
import { useActiveSection } from '@/hooks/useActiveSection';
import { handleNavClick } from '@/utils/smoothScroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Header.module.css';
import clsx from 'clsx';

interface HeaderProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export function Header({ onMenuToggle, isMobileMenuOpen }: HeaderProps) {
  const activeSection = useActiveSection();
  const reducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = NAV_ITEMS.filter((item) => item.id !== 'hero');

  return (
    <motion.header
      className={clsx(styles.header, scrolled && styles.scrolled)}
      initial={reducedMotion ? false : { y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={styles.container}>
        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => handleNavClick(e, 'hero')}
          aria-label="KPK Tree Service - Scroll to top"
        >
          <span className={styles.logoMark}>KPK</span>
          <span className={styles.logoText}>Tree Service</span>
        </a>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList} role="list">
            {navLinks.map((item) => (
              <li key={item.id}>
                <motion.a
                  href={item.href}
                  className={clsx(styles.navLink, activeSection === item.id && styles.active)}
                  onClick={(e) => handleNavClick(e, item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  whileHover={reducedMotion ? undefined : { y: -1 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      className={styles.activeIndicator}
                      layoutId="activeSection"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a
            href={`tel:${companyInfo.phone}`}
            className={styles.phoneCta}
            aria-label={`Call KPK Tree Service at ${companyInfo.phoneFormatted}`}
          >
            <Phone size={18} />
            <span className={styles.phoneText}>{companyInfo.phoneFormatted}</span>
          </a>
          <button
            className={clsx(styles.hamburger, isMobileMenuOpen && styles.hamburgerOpen)}
            onClick={onMenuToggle}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
