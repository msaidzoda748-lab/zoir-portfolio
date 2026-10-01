import { useEffect, useState, type MouseEvent } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { navIds, site } from '../config/site';
import { useActiveSection } from '../hooks/useActiveSection';
import type { Theme } from '../hooks/useTheme';
import { useI18n } from '../i18n/core';
import { LangSwitcher } from './LangSwitcher';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const sectionIds = [...navIds];

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 860) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const goTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    setOpen(false);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', id === 'home' ? location.pathname : `#${id}`);
    target.focus({ preventScroll: true });
  };

  const isDark = theme === 'dark';

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''} ${open ? 'header--open' : ''}`}>
        <div className="header__inner container">
          <a href="#home" className="logo" onClick={(e) => goTo(e, 'home')} aria-label={`${site.brand} — ${t.header.homeLink}`}>
            <svg className="logo__mark" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#b9c8ff" />
                  <stop offset="1" stopColor="#6c8cff" />
                </linearGradient>
              </defs>
              <path d="M3 3h18v3.2L8.4 17.8H21V21H3v-3.2L15.6 6.2H3z" fill="url(#logo-g)" />
            </svg>
            <span className="logo__text">{site.brand}</span>
          </a>

          <nav className="nav" aria-label={t.nav.label}>
            <ul id="main-menu" className="nav__list">
              {navIds.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`nav__link ${active === id ? 'is-active' : ''}`}
                    aria-current={active === id ? 'true' : undefined}
                    onClick={(e) => goTo(e, id)}
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <span className="header__tagline">{site.tagline}</span>
            <LangSwitcher onOpen={() => setOpen(false)} />
            <button
              type="button"
              className="icon-btn"
              onClick={onToggleTheme}
              aria-label={isDark ? t.header.toLight : t.header.toDark}
              title={isDark ? t.header.lightTitle : t.header.darkTitle}
            >
              {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
            </button>
            <button
              type="button"
              className="icon-btn menu-toggle"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="main-menu"
              aria-label={open ? t.header.closeMenu : t.header.openMenu}
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}
    </>
  );
}
