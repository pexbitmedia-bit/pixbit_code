import Image from 'next/image';
import { SocialIcon } from '@/components/ui/icons';
import { navItems, services } from '@/lib/content';
import { siteEmail, socialLinks } from '@/lib/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-white">
      <div className="footer-glow h-px w-full" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <span className="relative block h-11 w-[8.8rem] rounded-xl bg-white px-2">
            <Image
              src="/images/logo-wordmark.png"
              alt="Pexbit Media"
              fill
              sizes="140px"
              className="object-contain object-center p-1.5"
            />
          </span>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            We build and elevate personal brands for founders, coaches, consultants, creators, and
            executives.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
            Quick links
          </h2>
          <ul className="mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`/#${item.id}`} className="text-sm text-white/80 hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/#faqs" className="text-sm text-white/80 hover:text-white">
                FAQs
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
            Services
          </h2>
          <ul className="mt-4 space-y-2">
            {services.map((service) => (
              <li key={service.title}>
                <a
                  href={`/services/${service.id}`}
                  className="text-sm text-white/80 hover:text-white"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
            Contact
          </h2>
          <p className="mt-4 text-sm text-white/80">Strategy calls by appointment</p>
          <p className="mt-1 text-sm text-white/80">Working worldwide</p>
          <a
            href={`mailto:${siteEmail}`}
            className="mt-3 inline-block text-sm font-semibold text-brand"
          >
            {siteEmail}
          </a>
          <ul className="mt-5 flex gap-3">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white hover:border-brand hover:text-brand"
                >
                  <SocialIcon name={link.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-white/45 sm:px-8">
          © {year} Pexbit Media. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
