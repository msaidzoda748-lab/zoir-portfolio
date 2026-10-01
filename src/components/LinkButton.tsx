import { useId, type ReactNode } from 'react';
import { useI18n } from '../i18n/core';
import { isValidLink } from '../lib/links';

interface LinkButtonProps {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
  variant?: 'violet' | 'blue' | 'glass';
  className?: string;
}

/**
 * Тугмаи пайванд. Агар суроға дуруст набошад, тугмаи ғайрифаъол
 * бо матни «Пайванд ҳоло илова нашудааст» нишон дода мешавад.
 */
export function LinkButton({ href, icon, children, variant = 'glass', className = '' }: LinkButtonProps) {
  const { t } = useI18n();
  const hintId = useId();
  const classes = `btn btn--${variant} ${className}`.trim();

  if (!isValidLink(href)) {
    return (
      <span className="link-button link-button--missing">
        <button type="button" className={classes} disabled aria-describedby={hintId}>
          {icon}
          <span>{children}</span>
        </button>
        <span id={hintId} className="link-button__hint">
          {t.links.missing}
        </span>
      </span>
    );
  }

  return (
    <span className="link-button">
      <a className={classes} href={href} target="_blank" rel="noopener noreferrer">
        {icon}
        <span>{children}</span>
        <span className="sr-only"> {t.links.newWindow}</span>
      </a>
    </span>
  );
}
