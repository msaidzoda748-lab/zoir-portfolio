import type { CSSProperties } from 'react';
import { site } from '../config/site';
import { useI18n } from '../i18n/core';
import { InstagramIcon, TelegramIcon } from './BrandIcons';
import { HeroVisual } from './HeroVisual';
import { LinkButton } from './LinkButton';

const step = (i: number) => ({ '--i': i }) as CSSProperties;

export function Hero() {
  const { hero } = useI18n().t;

  return (
    <section id="home" className="hero" tabIndex={-1} aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow intro" style={step(0)}>
            {hero.greeting}
          </p>
          <h1 id="hero-title" className="hero__title intro" style={step(1)}>
            <span className="hero__line">{hero.titleLine1}</span>
            <span className="hero__line hero__line--soft">
              {hero.titleLine2} <span className="hero__accent">{hero.titleAccent}</span>
            </span>
          </h1>
          <p className="hero__subtitle intro" style={step(2)}>
            {hero.subtitle}
          </p>
          <p className="hero__role intro" style={step(3)}>
            {hero.role}
          </p>
          <div className="hero__actions intro" style={step(4)}>
            <LinkButton href={site.social.instagram} variant="violet" icon={<InstagramIcon size={22} />}>
              Instagram
            </LinkButton>
            <LinkButton href={site.social.telegram} variant="blue" icon={<TelegramIcon size={22} />}>
              Telegram
            </LinkButton>
          </div>
        </div>

        <div className="hero__media intro" style={step(3)}>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
