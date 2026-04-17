import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { slideInLeft, slideInRight } from '@/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { companyInfo } from '@/data/company';
import { services } from '@/data/services';
import styles from './Contact.module.css';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const reducedMotion = useReducedMotion();
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
    }, 1000);
  };

  return (
    <div className={styles.contact}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.titleOrange}>Get Your </span>
          <span className={styles.titleGreen}>Free Estimate</span>
        </h2>
        <p className={styles.subtitle}>
          Ready to get started? Contact us today for a free, no-obligation estimate.
        </p>
      </div>

      <div className={styles.grid}>
        <motion.div
          className={styles.formWrapper}
          variants={reducedMotion ? undefined : slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {formStatus === 'success' ? (
            <div className={styles.successMessage}>
              <h3>Thank You!</h3>
              <p>We&apos;ve received your message and will get back to you as soon as possible.</p>
              <button
                className={styles.resetBtn}
                onClick={() => setFormStatus('idle')}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              data-netlify="true"
              name="contact"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles.input}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={styles.input}
                    required
                    placeholder="(xxx) xxx-xxxx"
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    placeholder="your@email.com"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="service" className={styles.label}>Service Needed</label>
                  <select
                    id="service"
                    name="service"
                    className={styles.select}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  rows={5}
                  required
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'submitting' ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        <motion.div
          className={styles.infoWrapper}
          variants={reducedMotion ? undefined : slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Contact Information</h3>

            <a href={`tel:${companyInfo.phone}`} className={styles.infoItem}>
              <Phone size={20} />
              <div>
                <span className={styles.infoLabel}>Phone</span>
                <span className={styles.infoValue}>{companyInfo.phoneFormatted}</span>
              </div>
            </a>

            <a href={`mailto:${companyInfo.email}`} className={styles.infoItem}>
              <Mail size={20} />
              <div>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>{companyInfo.email}</span>
              </div>
            </a>

            <div className={styles.infoItem}>
              <MapPin size={20} />
              <div>
                <span className={styles.infoLabel}>Address</span>
                <span className={styles.infoValue}>{companyInfo.address.full}</span>
              </div>
            </div>
          </div>

          <a
            href={`tel:${companyInfo.phone}`}
            className={styles.callCta}
          >
            <Phone size={22} />
            Call Now — {companyInfo.phoneFormatted}
          </a>
        </motion.div>
      </div>
    </div>
  );
}
