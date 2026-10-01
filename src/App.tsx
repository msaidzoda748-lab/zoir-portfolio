import { About } from './components/About';
import { Contact } from './components/Contact';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { site } from './config/site';
import { useTheme } from './hooks/useTheme';
import { useI18n } from './i18n/core';

export default function App() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();

  return (
    <>
      <a href="#main" className="skip-link">
        {t.skipLink}
      </a>
      <div className="bg" aria-hidden="true">
        <span className="bg__blob bg__blob--1" />
        <span className="bg__blob bg__blob--2" />
        <span className="bg__blob bg__blob--3" />
      </div>
      <Header theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <About />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <span className="footer__brand">{site.brand}</span>
          <span>
            © {new Date().getFullYear()} {t.name}
          </span>
        </div>
      </footer>
    </>
  );
}
