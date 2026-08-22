import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Icon = {
  star: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M12 2.5l2.9 5.9 6.6.9-4.8 4.6 1.2 6.5L12 17.3l-5.9 3.1 1.2-6.5L2.5 9.3l6.6-.9L12 2.5z" />
    </svg>
  ),
  check: (p: IconProps) => (
    <Base {...p}>
      <path d="M20 6L9 17l-5-5" />
    </Base>
  ),
  chevronDown: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 9l6 6 6-6" />
    </Base>
  ),
  arrowRight: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  ),
  globe: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 010 18a15 15 0 010-18z" />
    </Base>
  ),
  whatsapp: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.53 3.75 1.45 5.31L2 22l4.98-1.6a9.8 9.8 0 005.06 1.4h.01c5.43 0 9.84-4.4 9.84-9.84S17.47 2 12.04 2zm5.72 13.9c-.24.68-1.42 1.31-1.95 1.36-.5.05-1.13.07-1.82-.11-.42-.11-.96-.31-1.66-.6-2.92-1.24-4.83-4.1-4.98-4.29-.14-.19-1.18-1.55-1.18-2.96s.75-2.1 1.02-2.39c.26-.29.57-.36.76-.36l.55.01c.17.01.41-.07.64.48.24.57.81 1.97.88 2.11.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.37-.42.49-.14.14-.28.29-.12.57.16.29.71 1.16 1.52 1.88 1.04.92 1.92 1.21 2.2 1.35.28.14.44.12.6-.07.17-.19.69-.8.88-1.08.19-.29.37-.24.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.69-.17 1.36z" />
    </svg>
  ),
  google: (p: IconProps) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.7-.06-1.37-.18-2.02H12v3.82h5.38a4.6 4.6 0 01-2 3.02v2.5h3.24c1.89-1.74 2.98-4.3 2.98-7.32z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.24-2.51c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.59A10 10 0 0012 22z"
      />
      <path
        fill="#FBBC05"
        d="M6.41 13.9a6 6 0 010-3.82V7.5H3.06a10 10 0 000 9l3.35-2.6z"
      />
      <path
        fill="#EA4335"
        d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.87-2.87A10 10 0 003.06 7.5l3.35 2.59C7.2 7.73 9.4 5.98 12 5.98z"
      />
    </svg>
  ),
  instagram: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </Base>
  ),
  facebook: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M14.5 8.5h2.3V5.6c-.4-.05-1.4-.16-2.55-.16-2.53 0-4.26 1.5-4.26 4.26V12H7.4v3.3h2.6V22h3.2v-6.7h2.5l.4-3.3h-2.9V10c0-.95.26-1.5 1.3-1.5z" />
    </svg>
  ),
  bell: (p: IconProps) => (
    <Base {...p}>
      <path d="M18 8a6 6 0 10-12 0c0 6-2 7-2 7h16s-2-1-2-7" />
      <path d="M13.7 20a2 2 0 01-3.4 0" />
    </Base>
  ),
  chart: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 3v18h18" />
      <path d="M7 15l3.5-4 3 2.5L20 7" />
    </Base>
  ),
  home: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5.5 9.5V21h13V9.5" />
    </Base>
  ),
  chat: (p: IconProps) => (
    <Base {...p}>
      <path d="M21 11.5a8 8 0 01-11.6 7.1L3 20.5l1.9-6.3A8 8 0 1121 11.5z" />
    </Base>
  ),
  sparkles: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
    </Base>
  ),
  clock: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.3l3.2 1.9" />
    </Base>
  ),
  alert: (p: IconProps) => (
    <Base {...p}>
      <path d="M10.3 3.6L1.9 18a2 2 0 001.7 3h16.8a2 2 0 001.7-3L13.7 3.6a2 2 0 00-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </Base>
  ),
  trendUp: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </Base>
  ),
  trendDown: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 7l6 6 4-4 8 8" />
      <path d="M15 17h6v-6" />
    </Base>
  ),
  users: (p: IconProps) => (
    <Base {...p}>
      <path d="M16 20v-1.5a4 4 0 00-4-4H6a4 4 0 00-4 4V20" />
      <circle cx="9" cy="7.5" r="3.5" />
      <path d="M22 20v-1.5a4 4 0 00-3-3.87" />
      <path d="M16.5 4.13a4 4 0 010 6.74" />
    </Base>
  ),
  send: (p: IconProps) => (
    <Base {...p}>
      <path d="M21.5 2.5L11 13" />
      <path d="M21.5 2.5l-6.6 19-3.9-8.5L2.5 9.1l19-6.6z" />
    </Base>
  ),
  cloudRain: (p: IconProps) => (
    <Base {...p}>
      <path d="M17.5 17a4.5 4.5 0 00-.9-8.9A6 6 0 105 14.5" />
      <path d="M9 18.5v2M13 18v2.5M17 18.5v2" />
    </Base>
  ),
  calendar: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </Base>
  ),
  tag: (p: IconProps) => (
    <Base {...p}>
      <path d="M20.5 13.5l-7 7a2 2 0 01-2.8 0L3 13V3h10l7.5 7.5a2 2 0 010 3z" />
      <path d="M7.5 7.5h.01" />
    </Base>
  ),
  menu: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Base>
  ),
  close: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Base>
  ),
  shield: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 2.5l8 3v6c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10v-6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </Base>
  ),
};

export type IconName = keyof typeof Icon;
