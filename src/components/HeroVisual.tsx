import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { CodeXml } from 'lucide-react';
import { site } from '../config/site';
import { useI18n } from '../i18n/core';

const MAX_TILT = 4;

function Orbit({ variant }: { variant: 'a' | 'b' }) {
  const id = `orbit-${variant}`;
  return (
    <svg className={`orbit orbit--${variant}`} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={variant === 'a' ? '#6f8dff' : '#9a7bff'} stopOpacity="0" />
          <stop offset="0.5" stopColor={variant === 'a' ? '#7c9cff' : '#8b6cff'} />
          <stop offset="1" stopColor={variant === 'a' ? '#8b6cff' : '#5b7bff'} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" pathLength="100" stroke={`url(#${id})`} className="orbit__arc" />
    </svg>
  );
}

export function HeroVisual() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let inView = true;
    const update = () => setPaused(!inView || document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(root);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  const canTilt = () =>
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el || e.pointerType !== 'mouse' || !canTilt()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--tilt-x', `${(-y * 2 * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty('--tilt-y', `${(x * 2 * MAX_TILT).toFixed(2)}deg`);
  };

  const onPointerLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <div
      ref={rootRef}
      className={`hero-visual ${paused ? 'is-paused' : ''}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <Orbit variant="a" />
      <Orbit variant="b" />
      <div className="photo-float">
        <div ref={tiltRef} className="glass-tile">
          {site.photo ? (
            <img
              className="glass-tile__photo"
              src={site.photo}
              alt={t.photoAlt}
              width={1024}
              height={1024}
              fetchPriority="high"
            />
          ) : (
            <CodeXml className="glass-tile__icon" strokeWidth={1.6} aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
}
