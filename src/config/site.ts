/**
 * ФАЙЛИ ТАНЗИМОТ — пайвандҳо ва акс дар ин ҷо.
 * Матнҳои интерфейс дар папкаи src/i18n (tg.ts, ru.ts, en.ts) ҷойгиранд.
 *
 * Пайвандҳо: агар суроға холӣ ('') бошад, тугма ғайрифаъол мешавад ва
 * «Пайванд ҳоло илова нашудааст» нишон медиҳад.
 *
 * Акс: файлро ба папкаи `public/` гузоред ва роҳашро нависед, масалан '/zoir.jpg'.
 * Агар холӣ бошад, дар экрани аввал корти шишагин бо иконкаи «</>» нишон дода мешавад.
 */

export type ServiceIcon = 'web' | 'bot' | 'mobile';

export const site = {
  brand: 'ZOIR',
  tagline: 'Portfolio / 2026',
  photo: `${import.meta.env.BASE_URL}zoir.jpg`,

  social: {
    instagram: 'https://instagram.com/__saidov.code',
    telegram: 'https://t.me/saidov_zoir',
  },

  services: ['web', 'bot', 'mobile'] satisfies ServiceIcon[] as ServiceIcon[],
};

export const navIds = ['home', 'about', 'contact'] as const;

export type NavId = (typeof navIds)[number];
