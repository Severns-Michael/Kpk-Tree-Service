import { motion } from 'motion/react';
import { Phone, MapPin, Mail } from 'lucide-react';
import { fadeIn, scrollConfig } from '@/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { companyInfo } from '@/data/company';
import { NAV_ITEMS } from '@/data/navigation';
import { handleNavClick } from '@/utils/smoothScroll';
import styles from './Footer.module.css';

export function Footer() {
  const reducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const navLinks = NAV_ITEMS.filter((item) => item.id !== 'hero');

  return (
    <motion.footer
      className={styles.footer}
      role="contentinfo"
      variants={reducedMotion ? undefined : fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={scrollConfig.section}
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{companyInfo.name}</h3>
            <p className={styles.description}>{companyInfo.description}</p>
            <div className={styles.social}>
              <a
                href={companyInfo.facebookUrl}
                className={styles.socialLink}
                aria-label="KPK Tree Service on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Quick Links</h3>
            <ul className={styles.linkList} role="list">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={styles.link}
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contact Us</h3>
            <ul className={styles.contactList} role="list">
              <li>
                <a href={`tel:${companyInfo.phone}`} className={styles.contactItem}>
                  <Phone size={16} />
                  <span>{companyInfo.phoneFormatted}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${companyInfo.email}`} className={styles.contactItem}>
                  <Mail size={16} />
                  <span>{companyInfo.email}</span>
                </a>
              </li>
              <li>
                <div className={styles.contactItem}>
                  <MapPin size={16} />
                  <span>{companyInfo.address.full}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} {companyInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
