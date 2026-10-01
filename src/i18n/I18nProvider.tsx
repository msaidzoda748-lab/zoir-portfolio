import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { dictionaries, I18nContext, LANG_STORAGE_KEY, readStoredLang, type Lang } from './core';

function setMeta(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute('content', content);
}

/** Аввалин элементи мундариҷа, ки дар зери сарлавҳаи сайт намоён аст. */
function findScrollAnchor(): { el: Element; top: number } | null {
  const headerBottom = document.querySelector('.header')?.getBoundingClientRect().bottom ?? 0;
  let best: { el: Element; top: number } | null = null;
  for (const el of document.querySelectorAll('main h1, main h2, main h3, main p, main li, main article')) {
    const top = el.getBoundingClientRect().top;
    if (top >= headerBottom && (!best || top < best.top)) best = { el, top };
  }
  return best;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);
  const anchorRef = useRef<{ el: Element; top: number } | null>(null);
  const t = dictionaries[lang];

  const setLang = useCallback((next: Lang) => {
    anchorRef.current = findScrollAnchor();
    setLangState(next);
  }, []);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    anchorRef.current = null;
    if (!anchor?.el.isConnected) return;
    const delta = anchor.el.getBoundingClientRect().top - anchor.top;
    if (Math.abs(delta) > 0.5) window.scrollTo({ top: window.scrollY + delta, behavior: 'instant' });
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    setMeta('meta[name="description"]', t.meta.description);
    setMeta('meta[property="og:title"]', t.meta.ogTitle);
    setMeta('meta[property="og:description"]', t.meta.ogDescription);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      /* localStorage may be unavailable (private mode) */
    }
  }, [lang, t]);

  const value = useMemo(() => ({ lang, t, setLang }), [lang, t, setLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
