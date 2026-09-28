'use client';

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState, type FocusEvent } from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { navItems, services } from '@/lib/content';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';

type MenuPlace = {
  left: number;
  top: number;
  bridgeLeft: number;
  bridgeTop: number;
  bridgeWidth: number;
  bridgeHeight: number;
};

export function Navbar() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesMenu, setServicesMenu] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [place, setPlace] = useState<MenuPlace | null>(null);
  const [active, setActive] = useState('');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const onHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) {
      setActive('');
      return;
    }
    const onScroll = () => {
      const marker = window.innerHeight * 0.32;
      let current = navItems[0]?.id ?? 'home';
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (!section) continue;
        if (section.getBoundingClientRect().top <= marker) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onHome]);

  useEffect(() => {
    if (!open) {
      setServicesMenu(false);
      return;
    }
    const previousOverflow = document.body.style.overflow;
    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    const panel = document.getElementById(menuId);
    const getItems = () => (panel ? [...panel.querySelectorAll<HTMLElement>('a, button')] : []);
    getItems()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const items = getItems();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [menuId, open]);

  useEffect(() => {
    if (!servicesOpen) return;
    const measure = () => {
      const node = servicesRef.current;
      const header = node?.closest('header');
      if (!node || !header) return;
      const link = node.getBoundingClientRect();
      const bar = header.getBoundingClientRect();
      const menuWidth = Math.min(560, window.innerWidth - 32);
      let left = link.left;
      if (left + menuWidth > window.innerWidth - 16) {
        left = Math.max(16, window.innerWidth - 16 - menuWidth);
      }
      const top = bar.bottom + 10;
      setPlace({
        left,
        top,
        bridgeLeft: left,
        bridgeTop: link.bottom,
        bridgeWidth: menuWidth,
        bridgeHeight: Math.max(top - link.bottom, 0),
      });
    };
    measure();
    const close = () => setServicesOpen(false);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', close, { passive: true });
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', close);
    };
  }, [servicesOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1280px)');
    const onChange = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  const currentService = services.find((service) => service.id === activeService) ?? null;

  function openServices() {
    setServicesOpen(true);
    setActiveService((current) => current ?? services[0]?.id ?? null);
  }

  return (
    <>
      {reduce ? null : (
        <motion.div
          style={{ scaleX }}
          aria-hidden="true"
          className="fixed inset-x-0 top-[env(safe-area-inset-top)] z-[80] h-0.5 origin-left bg-brand"
        />
      )}
      <header
        className={cn(
          'sticky top-0 z-[70] pt-[env(safe-area-inset-top)] transition-colors duration-300',
          scrolled || open || servicesOpen
            ? 'bg-white/80 shadow-[0_1px_0_rgba(10,10,10,0.06)] backdrop-blur-xl'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-8">
          <Link
            href="/#home"
            className="relative block h-8 w-[7.4rem] shrink-0 sm:h-10 sm:w-[9.4rem]"
            aria-label="Pexbit Media, home"
          >
            <Image
              src="/images/logo-wordmark.png"
              alt="Pexbit Media"
              fill
              priority
              sizes="160px"
              className="object-contain object-left"
            />
          </Link>
          <nav aria-label="Primary" className="hidden min-w-0 items-center gap-4 xl:flex xl:gap-6">
            {navItems.map((item) => {
              const current = onHome && active === item.id;
              const link = (
                <Link
                  href={`/#${item.id}`}
                  aria-current={current ? 'location' : undefined}
                  aria-expanded={item.id === 'services' ? servicesOpen : undefined}
                  aria-haspopup={item.id === 'services' ? 'true' : undefined}
                  className={cn(
                    'relative whitespace-nowrap text-[13px] font-medium text-ink/70 transition-colors hover:text-ink xl:text-sm',
                    (current || (item.id === 'services' && servicesOpen)) && 'text-ink',
                  )}
                >
                  {item.label}
                  {current ? (
                    <motion.span
                      layoutId={reduce ? undefined : 'nav-underline'}
                      className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-brand"
                    />
                  ) : item.id === 'services' && servicesOpen ? (
                    <span className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-brand" />
                  ) : null}
                </Link>
              );

              if (item.id !== 'services') {
                return <span key={item.id}>{link}</span>;
              }

              return (
                <div
                  key={item.id}
                  ref={servicesRef}
                  className="relative"
                  onMouseEnter={openServices}
                  onMouseLeave={() => setServicesOpen(false)}
                  onFocus={openServices}
                  onBlur={(event: FocusEvent<HTMLDivElement>) => {
                    const next = event.relatedTarget;
                    if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
                      setServicesOpen(false);
                    }
                  }}
                >
                  {link}
                  {servicesOpen && place ? (
                    <div
                      aria-hidden="true"
                      className="fixed z-[81]"
                      style={{
                        left: place.bridgeLeft,
                        top: place.bridgeTop,
                        width: place.bridgeWidth,
                        height: place.bridgeHeight,
                      }}
                    />
                  ) : null}
                  <AnimatePresence>
                    {servicesOpen && place ? (
                      <motion.div
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: 8 }}
                        transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
                        className="fixed z-[80]"
                        style={{ left: place.left, top: place.top, perspective: 1200 }}
                      >
                        <div className="flex items-start gap-2">
                          <div className="w-56 rounded-2xl border border-ink/10 bg-white p-2 shadow-card">
                            {services.map((service) => {
                              const selected = service.id === activeService;
                              return (
                                <Link
                                  key={service.id}
                                  href={`/services/${service.id}`}
                                  onMouseEnter={() => setActiveService(service.id)}
                                  onFocus={() => setActiveService(service.id)}
                                  onClick={() => setServicesOpen(false)}
                                  className={cn(
                                    'flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink',
                                    selected ? 'bg-brand-soft text-brand' : 'hover:bg-paper',
                                  )}
                                >
                                  {service.title}
                                  <span aria-hidden="true" className="text-xs">
                                    ›
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                          <AnimatePresence mode="wait">
                            {currentService ? (
                              <motion.div
                                key={currentService.id}
                                initial={reduce ? false : { opacity: 0, rotateY: -78, x: -16 }}
                                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                                exit={reduce ? undefined : { opacity: 0, rotateY: 70, x: 12 }}
                                transition={{ duration: reduce ? 0 : 0.38, ease: EASE }}
                                style={{
                                  transformOrigin: 'left center',
                                  transformStyle: 'preserve-3d',
                                }}
                                className="w-72 rounded-2xl border border-ink/10 bg-white p-4 shadow-card"
                              >
                                <p className="px-2 font-display text-sm font-semibold text-ink">
                                  {currentService.title}
                                </p>
                                {currentService.groups.map((group) => (
                                  <div key={group.label} className="mt-3">
                                    <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                                      {group.label}
                                    </p>
                                    <ul className="mt-1">
                                      {group.items.map((item) => (
                                        <li key={item.slug}>
                                          <Link
                                            href={`/services/${item.slug}`}
                                            onClick={() => setServicesOpen(false)}
                                            className="block rounded-lg px-2 py-1.5 text-sm text-ink/75 hover:bg-paper hover:text-ink"
                                          >
                                            {item.title}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <MagneticButton href="/#contact">Book a Strategy Call</MagneticButton>
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white xl:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span className="relative block h-3.5 w-4" aria-hidden="true">
                <span
                  className={cn(
                    'absolute left-0 h-0.5 w-4 bg-ink transition-transform',
                    open ? 'top-1.5 rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn('absolute left-0 top-1.5 h-0.5 w-4 bg-ink', open && 'opacity-0')}
                />
                <span
                  className={cn(
                    'absolute left-0 h-0.5 w-4 bg-ink transition-transform',
                    open ? 'top-1.5 -rotate-45' : 'top-3',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/40 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {open ? (
          <motion.nav
            id={menuId}
            aria-label="Mobile"
            initial={reduce ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reduce ? undefined : { x: '100%' }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed bottom-0 right-0 top-[calc(4rem+env(safe-area-inset-top))] z-[65] flex w-full flex-col gap-1 overflow-y-auto overscroll-contain bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-card sm:top-[calc(5rem+env(safe-area-inset-top))] sm:w-[min(100%,24rem)] xl:hidden"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={reduce ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: reduce ? 0 : 0.04 * index,
                  duration: reduce ? 0 : 0.35,
                  ease: EASE,
                }}
              >
                {item.id === 'services' ? (
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left font-display text-lg font-semibold text-ink hover:bg-brand-soft"
                    aria-expanded={servicesMenu}
                    onClick={() => setServicesMenu((value) => !value)}
                  >
                    {item.label}
                    <span aria-hidden="true" className={cn('text-sm text-brand', servicesMenu && 'rotate-90')}>
                      ›
                    </span>
                  </button>
                ) : (
                  <Link
                    href={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-3 py-3 font-display text-lg font-semibold text-ink hover:bg-brand-soft"
                  >
                    {item.label}
                  </Link>
                )}
                {item.id === 'services' && servicesMenu ? (
                  <div className="space-y-3 px-3 pb-2">
                    <Link
                      href="/#services"
                      onClick={() => setOpen(false)}
                      className="block text-sm font-semibold text-ink/70"
                    >
                      All services
                    </Link>
                    {services.map((service) => (
                      <div key={service.id}>
                        <Link
                          href={`/services/${service.id}`}
                          onClick={() => setOpen(false)}
                          className="text-sm font-semibold text-brand"
                        >
                          {service.title}
                        </Link>
                        <ul className="mt-1 space-y-1">
                          {service.groups.flatMap((group) =>
                            group.items.map((sub) => (
                              <li key={sub.slug}>
                                <Link
                                  href={`/services/${sub.slug}`}
                                  onClick={() => setOpen(false)}
                                  className="block py-1 text-sm text-ink/65"
                                >
                                  {sub.title}
                                </Link>
                              </li>
                            )),
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
              </motion.div>
            ))}
            <div className="mt-4 sm:hidden">
              <MagneticButton href="/#contact" className="w-full" onClick={() => setOpen(false)}>
                Book a Strategy Call
              </MagneticButton>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
