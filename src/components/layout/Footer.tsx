import { motion } from 'motion/react';
import { Phone, MapPin, Mail, Globe, Camera } from 'lucide-react';
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
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <Globe size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <Camera size={20} />
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
