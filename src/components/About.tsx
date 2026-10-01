import { Bot, Globe, Smartphone, type LucideIcon } from 'lucide-react';
import { site, type ServiceIcon } from '../config/site';
import { useI18n } from '../i18n/core';
import { Reveal } from './Reveal';

const icons: Record<ServiceIcon, LucideIcon> = {
  web: Globe,
  bot: Bot,
  mobile: Smartphone,
};

export function About() {
  const { about } = useI18n().t;

  return (
    <section id="about" className="section" tabIndex={-1} aria-labelledby="about-title">
      <div className="container">
        <Reveal className="section-heading">
          <h2 id="about-title" className="section-heading__title">
            {about.title}
          </h2>
          <span className="section-heading__line" aria-hidden="true" />
        </Reveal>

        <Reveal as="p" className="about__text" delay={60}>
          {about.text}
        </Reveal>

        <ul className="services">
          {site.services.map((key, i) => {
            const Icon = icons[key];
            const service = about.services[key];
            return (
              <Reveal as="li" key={key} className="glass service-card" delay={i * 90}>
                <span className="service-card__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__text">{service.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
