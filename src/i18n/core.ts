import { createContext, useContext } from 'react';
import { en } from './en';
import { ru } from './ru';
import { tg, type Dict, type PartialDict } from './tg';

export type Lang = 'tg' | 'ru' | 'en';

export const DEFAULT_LANG: Lang = 'tg';
export const LANG_STORAGE_KEY = 'zoir-lang';

export const languages: { code: Lang; short: string; name: string }[] = [
  { code: 'tg', short: 'TJ', name: 'Тоҷикӣ' },
  { code: 'ru', short: 'RU', name: 'Русский' },
  { code: 'en', short: 'EN', name: 'English' },
];

export const isLang = (value: unknown): value is Lang =>
  value === 'tg' || value === 'ru' || value === 'en';

/** Матни холӣ ё калиди нестро бо матни тоҷикӣ иваз мекунад. */
function withFallback<T>(base: T, override: unknown): T {
  if (typeof base === 'string') {
    return (typeof override === 'string' && override.trim() ? override : base) as T;
  }
  const result = {} as Record<string, unknown>;
  const source = (override && typeof override === 'object' ? override : {}) as Record<string, unknown>;
  for (const key of Object.keys(base as object)) {
    result[key] = withFallback((base as Record<string, unknown>)[key], source[key]);
  }
  return result as T;
}

const overrides: Record<Lang, PartialDict> = { tg: {}, ru, en };

export const dictionaries: Record<Lang, Dict> = {
  tg,
  ru: withFallback(tg, overrides.ru),
  en: withFallback(tg, overrides.en),
};

export function format(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => vars[key] ?? match);
}

export function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* localStorage may be unavailable (private mode) */
  }
  return DEFAULT_LANG;
}

interface I18nValue {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
}

export const I18nContext = createContext<I18nValue>({
  lang: DEFAULT_LANG,
  t: tg,
  setLang: () => {},
});

export const useI18n = () => useContext(I18nContext);
