import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(size: number) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
}

export function InstagramIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function TelegramIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M21.5 4.5 2.8 11.4c-.9.35-.85 1.6.06 1.9l4.64 1.5 1.8 5.4c.25.75 1.2.95 1.75.4l2.6-2.55 4.65 3.45c.65.48 1.6.12 1.78-.67L22.9 5.9c.2-.95-.6-1.75-1.4-1.4Z" />
      <path d="m7.5 14.8 10-6.8-7.2 7.6" />
    </svg>
  );
}
