import type { ReactNode, SVGProps } from 'react';
import type { ServiceIconName, SocialName } from '@/types';

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <BaseIcon className={className}>
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </BaseIcon>
  );
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <BaseIcon className={className}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </BaseIcon>
  );
}

const servicePaths: Record<ServiceIconName, ReactNode> = {
  linkedin: (
    <>
      <circle cx="9" cy="8" r="2.2" />
      <path d="M5.5 18.5v-4.2a3.2 3.2 0 0 1 6.4 0v4.2" strokeLinecap="round" />
      <path d="M14 11.5h4.5M16.2 11.5V18" strokeLinecap="round" />
    </>
  ),
  site: (
    <>
      <rect x="3.5" y="4.5" width="17" height="13" rx="2" />
      <path d="M3.5 8.5h17" />
      <circle cx="12" cy="14" r="1.6" />
    </>
  ),
  press: (
    <>
      <path d="M5 6.5h10.5A3.5 3.5 0 0 1 19 10v7.5H8.5A3.5 3.5 0 0 1 5 14V6.5z" />
      <path d="M8 10h7M8 13h5" strokeLinecap="round" />
    </>
  ),
  video: (
    <>
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="M11 9.5v5l4-2.5-4-2.5z" strokeLinejoin="round" />
    </>
  ),
  pen: (
    <>
      <path d="M14.5 5.5l4 4L9 19H5v-4L14.5 5.5z" strokeLinejoin="round" />
      <path d="M12.5 7.5l4 4" />
    </>
  ),
  mark: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.5M12 18v2.5M3.5 12H6M18 12h2.5" strokeLinecap="round" />
    </>
  ),
};

export function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  return <BaseIcon className={className ?? 'h-6 w-6'}>{servicePaths[name]}</BaseIcon>;
}

const socialPaths: Record<SocialName, ReactNode> = {
  LinkedIn: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="8.2" cy="9" r="0.9" fill="currentColor" stroke="none" />
      <path d="M8.2 11.2V16M12 16v-2.8a1.8 1.8 0 0 1 3.6 0V16" strokeLinecap="round" />
    </>
  ),
  Instagram: (
    <>
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="16.4" cy="7.6" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  YouTube: (
    <>
      <rect x="3.5" y="7" width="17" height="10" rx="3" />
      <path d="M11 10.2v3.6l3.2-1.8-3.2-1.8z" strokeLinejoin="round" />
    </>
  ),
  X: <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />,
};

export function SocialIcon({ name }: { name: SocialName }) {
  return <BaseIcon className="h-4 w-4">{socialPaths[name]}</BaseIcon>;
}
