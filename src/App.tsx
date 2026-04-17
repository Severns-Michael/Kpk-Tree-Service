import { useState, useCallback } from 'react';
import { Header, Footer, Section, MobileMenu } from '@/components/layout';
import { SkipToContent, ScrollProgress } from '@/components/ui';
import { Hero, Services, About, Testimonials, Contact } from '@/components/sections';
import { useActiveSection } from '@/hooks/useActiveSection';
import styles from './App.module.css';

function App() {
  const activeSection = useActiveSection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <div className={styles.app}>
      <SkipToContent />
      <ScrollProgress />

      <Header
        onMenuToggle={handleMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMenuClose}
        activeSection={activeSection}
      />

      <main id="main-content" tabIndex={-1} className={styles.main}>
        <Section id="hero" fullWidth>
          <Hero />
        </Section>

        <Section id="services">
          <Services />
        </Section>

        <Section id="about">
          <About />
        </Section>

<Section id="testimonials">
          <Testimonials />
        </Section>

        <Section id="contact">
          <Contact />
        </Section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
