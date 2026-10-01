import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Check, Globe } from 'lucide-react';
import { format, languages, useI18n, type Lang } from '../i18n/core';

interface LangSwitcherProps {
  onOpen?: () => void;
}

export function LangSwitcher({ onOpen }: LangSwitcherProps) {
  const { lang, t, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();
  const current = languages.find((l) => l.code === lang) ?? languages[0];

  const focusItem = (index: number) => {
    const count = languages.length;
    itemRefs.current[(index + count) % count]?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!open) return;
    focusItem(languages.findIndex((l) => l.code === lang));
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
        buttonRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const toggle = () => {
    if (!open) onOpen?.();
    setOpen((v) => !v);
  };

  const choose = (code: Lang) => {
    setLang(code);
    setOpen(false);
    buttonRef.current?.focus({ preventScroll: true });
  };

  const onButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) onOpen?.();
      setOpen(true);
    }
  };

  const onMenuKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const index = itemRefs.current.findIndex((el) => el === document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusItem(index + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusItem(index - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusItem(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusItem(languages.length - 1);
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={`lang ${open ? 'lang--open' : ''}`}>
      <button
        ref={buttonRef}
        type="button"
        className="icon-btn lang__toggle"
        onClick={toggle}
        onKeyDown={onButtonKeyDown}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={format(t.language.button, { name: current.name })}
        title={t.language.menu}
      >
        <Globe size={18} aria-hidden="true" />
        <span className="lang__code" aria-hidden="true">
          {current.short}
        </span>
      </button>

      <ul
        id={menuId}
        className="lang__menu"
        role="menu"
        aria-label={t.language.menu}
        hidden={!open}
        onKeyDown={onMenuKeyDown}
      >
        {languages.map((l, i) => {
          const selected = l.code === lang;
          return (
            <li key={l.code} role="none">
              <button
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                lang={l.code}
                tabIndex={selected ? 0 : -1}
                className={`lang__item ${selected ? 'is-selected' : ''}`}
                onClick={() => choose(l.code)}
              >
                <span className="lang__item-code" aria-hidden="true">
                  {l.short}
                </span>
                <span className="lang__item-name">{l.name}</span>
                <Check className="lang__check" size={18} aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
