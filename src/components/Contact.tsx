import { site } from '../config/site';
import { useI18n } from '../i18n/core';
import { InstagramIcon, TelegramIcon } from './BrandIcons';
import { LinkButton } from './LinkButton';
import { Reveal } from './Reveal';

export function Contact() {
  const { contact } = useI18n().t;

  return (
    <section id="contact" className="section section--contact" tabIndex={-1} aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="glass contact-card">
          <div className="contact-card__glow" aria-hidden="true" />
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2 id="contact-title" className="contact-card__title">
            {contact.title}
          </h2>
          <p className="contact-card__text">{contact.text}</p>
          <div className="contact-card__actions">
            <LinkButton href={site.social.instagram} variant="violet" icon={<InstagramIcon size={22} />}>
              {contact.instagram}
            </LinkButton>
            <LinkButton href={site.social.telegram} variant="blue" icon={<TelegramIcon size={22} />}>
              {contact.telegram}
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
