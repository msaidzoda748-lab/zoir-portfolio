# ZOIR — портфолиои шахсӣ

React + TypeScript + Vite.

## Оғоз кардан

```bash
npm install        # як маротиба
npm run dev        # сервери коркард: http://localhost:5173
npm run build      # сохтани версияи ниҳоӣ дар папкаи dist/
npm run preview    # дидани версияи ниҳоӣ: http://localhost:4173
```

Барои ҷойгир кардан дар интернет мундариҷаи папкаи `dist/` -ро ба ҳар хостинги статикӣ (Netlify, Vercel, GitHub Pages ва ғ.) бор кунед.

## Иваз кардани маълумоти шахсӣ

Пайвандҳо ва акс дар **`src/config/site.ts`** ҷойгиранд. Матнҳои интерфейс дар **`src/i18n/`** мебошанд.

- **Пайвандҳо** — `social.instagram` ва `social.telegram`:
  ```ts
  social: {
    instagram: 'https://instagram.com/номи_шумо',
    telegram: 'https://t.me/номи_шумо',
  },
  ```
  То пайванд холӣ (`''`) аст, тугма ғайрифаъол буда, «Пайванд ҳоло илова нашудааст» нишон медиҳад.
- **Акс** — файлро ба `public/` гузоред (масалан `public/zoir.jpg`) ва `photo: '/zoir.jpg'` нависед. Акс дар дохили корти шишагини экрани аввал нишон дода мешавад; агар холӣ бошад, иконкаи «</>» мемонад.
## Забонҳо

Сайт се забон дорад: тоҷикӣ (пешфарз), русӣ ва англисӣ. Забони интихобшуда дар `localStorage` (`zoir-lang`) нигоҳ дошта мешавад.

- `src/i18n/tg.ts` — ҳамаи матнҳои интерфейс бо забони тоҷикӣ: меню, экрани аввал, «Дар бораи ман», тамос, тугмаҳо, номҳои дастрасӣ, title ва description.
- `src/i18n/ru.ts`, `src/i18n/en.ts` — ҳамон калидҳо бо забони русӣ ва англисӣ. Агар ягон калид набошад, матни тоҷикӣ нишон дода мешавад.

## Сохтор

```
src/
  config/site.ts      — пайвандҳо ва акс
  i18n/               — тарҷумаҳо (tg, ru, en) ва I18nProvider
  components/         — Header, LangSwitcher, Hero, HeroVisual, About, Contact, LinkButton, Reveal
  hooks/              — useTheme (мавзӯъ + localStorage), useActiveSection
  styles/global.css   — дизайн, мавзӯҳо, responsive, аниматсияҳо
```
