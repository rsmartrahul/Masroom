'use client';

import Link from 'next/link';
import { useEffect, useState, type ComponentType } from 'react';
import { AnimatePresence, motion } from '@/components/Motion';
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Leaf,
  PlayCircle,
  Sparkles,
  Star,
  SunMedium,
  BarChart3,
  CalendarCheck2,
  Droplets,
  Lock,
  ShieldCheck,
  Sprout,
  Truck,
} from 'lucide-react';

type HeroSlide = {
  id: string;
  badge: string;
  badgeIcon: ComponentType<{ className?: string }>;
  title: string;
  tagline: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  palette: {
    accent: string;
    accentSoft: string;
    border: string;
    glow: string;
    panel: string;
  };
  bullets: string[];
  metricLabel: string;
  metricValue: string;
  badgeTone: string;
  graphic: 'mushroom' | 'solar';
};

const slides: HeroSlide[] = [
  {
    id: 'mushroom',
    badge: "India's Leading Mushroom Supplier",
    badgeIcon: Leaf,
    title: 'Premium Quality Mushroom & Dry Mushroom Packaging',
    tagline: 'Grow • Pack • Preserve • Supply',
    description:
      'Get organically grown fresh mushrooms and professionally packed dry mushrooms with moisture-locking technology. Perfect for retail and wholesale supply.',
    primaryCta: { label: 'Order Sample', href: '/enquiry' },
    secondaryCta: { label: 'View Catalog', href: '/products' },
    palette: {
      accent: 'from-emerald-500 to-lime-500',
      accentSoft: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200',
      border: 'border-emerald-200/70 dark:border-emerald-500/20',
      glow: 'bg-emerald-400/20',
      panel: 'from-white via-emerald-50/60 to-lime-50/70 dark:from-slate-900 dark:via-emerald-950/25 dark:to-slate-900',
    },
    bullets: ['Moisture Control', '100% Organic', 'Premium Sorting'],
    metricLabel: 'Freshness Retention',
    metricValue: '98%',
    badgeTone: 'text-emerald-700 dark:text-emerald-200',
    graphic: 'mushroom',
  },
  {
    id: 'solar',
    badge: 'Certified Solar Maintenance Experts',
    badgeIcon: SunMedium,
    title: 'Maximized Efficiency for Your Solar Power Panels',
    tagline: 'Clean • Maintain • Monitor • Save',
    description:
      'Professional solar panel cleaning and maintenance services. Get full comprehensive business plans, automated scheduling, and instant performance tracking.',
    primaryCta: { label: 'Get Full Business Plan', href: '/services' },
    secondaryCta: { label: 'Book a Cleaning', href: '/enquiry' },
    palette: {
      accent: 'from-primary-600 to-solar-500',
      accentSoft: 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-200',
      border: 'border-primary-200/70 dark:border-primary-500/20',
      glow: 'bg-primary-400/20',
      panel: 'from-white via-primary-50/60 to-solar-50/70 dark:from-slate-900 dark:via-primary-950/25 dark:to-slate-900',
    },
    bullets: ['Efficiency: 95%', 'Next Cleaning: Scheduled', 'Live Performance Tracking'],
    metricLabel: 'Energy Gain',
    metricValue: '+18%',
    badgeTone: 'text-primary-700 dark:text-primary-200',
    graphic: 'solar',
  },
];

function AppBadge({ kind }: { kind: 'google' | 'apple' }) {
  const isGoogle = kind === 'google';

  return (
    <Link
      href={isGoogle ? '/products' : '/services'}
      className="inline-flex items-center gap-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/90 px-4 py-3 shadow-sm backdrop-blur hover:shadow-md transition-shadow"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
        <PlayCircle className="h-5 w-5" />
      </div>
      <div className="text-left leading-tight">
        <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          {isGoogle ? 'Get it on' : 'Download on the'}
        </div>
        <div className="text-sm font-semibold text-slate-900 dark:text-white">
          {isGoogle ? 'Google Play' : 'App Store'}
        </div>
      </div>
    </Link>
  );
}

function SlideGraphic({ slide }: { slide: HeroSlide }) {
  if (slide.graphic === 'mushroom') {
    return (
      <div className="relative mx-auto w-full max-w-[560px]">
        <div className={`absolute -left-8 top-8 h-28 w-28 rounded-full ${slide.palette.glow} blur-3xl`} />
        <div className={`absolute -right-4 bottom-12 h-36 w-36 rounded-full ${slide.palette.glow} blur-3xl`} />

        <div
          className={`relative overflow-hidden rounded-[2rem] border ${slide.palette.border} bg-gradient-to-br ${slide.palette.panel} p-5 shadow-[0_24px_80px_rgba(15,23,42,0.16)]`}
        >
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.6rem] border border-white/70 dark:border-white/10 bg-white/90 dark:bg-slate-950/70 p-5 shadow-xl backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Quality Board</p>
                  <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Premium Packaging Features</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <ShieldCheck className="h-6 w-6" />
                </div>
              </div>

              <div className="space-y-3">
                {slide.bullets.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/80"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-[1.4rem] bg-gradient-to-r from-emerald-500 to-lime-500 p-4 text-white shadow-lg shadow-emerald-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-white/80">Freshness</p>
                    <p className="mt-1 text-2xl font-black">{slide.metricValue}</p>
                  </div>
                  <Leaf className="h-10 w-10 opacity-90" />
                </div>
                <p className="mt-2 text-sm text-white/85">{slide.metricLabel}</p>
              </div>
            </div>

            <div className="relative flex flex-col justify-between gap-4">
              <div className="rounded-[1.6rem] border border-white/70 dark:border-white/10 bg-white/85 dark:bg-slate-950/65 p-4 shadow-xl backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Packed Goods</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-emerald-100/80 p-4 dark:bg-emerald-500/10">
                    <div className="mb-2 h-3 w-16 rounded-full bg-emerald-500/50" />
                    <div className="h-20 rounded-2xl bg-gradient-to-br from-emerald-200 to-emerald-400 shadow-inner" />
                  </div>
                  <div className="rounded-2xl bg-lime-100/80 p-4 dark:bg-lime-500/10">
                    <div className="mb-2 h-3 w-12 rounded-full bg-lime-500/50" />
                    <div className="h-20 rounded-2xl bg-gradient-to-br from-lime-200 to-lime-400 shadow-inner" />
                  </div>
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-white/70 dark:border-white/10 bg-white/85 dark:bg-slate-950/65 p-4 shadow-xl backdrop-blur">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Plant Care</p>
                    <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Fresh look, premium finish</p>
                  </div>
                  <Sprout className="h-8 w-8 text-emerald-500" />
                </div>
                <div className="mt-4 flex items-end gap-3">
                  <div className="h-24 w-10 rounded-full bg-emerald-200 dark:bg-emerald-500/20" />
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10">
                    <div className="h-20 w-20 rounded-full bg-emerald-500/20" />
                  </div>
                  <div className="h-16 w-10 rounded-full bg-lime-200 dark:bg-lime-500/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className={`absolute -left-8 top-8 h-28 w-28 rounded-full ${slide.palette.glow} blur-3xl`} />
      <div className={`absolute -right-4 bottom-12 h-36 w-36 rounded-full ${slide.palette.glow} blur-3xl`} />

      <div
        className={`relative overflow-hidden rounded-[2rem] border ${slide.palette.border} bg-gradient-to-br ${slide.palette.panel} p-5 shadow-[0_24px_80px_rgba(15,23,42,0.16)]`}
      >
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.6rem] border border-white/70 dark:border-white/10 bg-white/90 dark:bg-slate-950/70 p-5 shadow-xl backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Performance Dashboard</p>
                <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Solar Business Overview</p>
              </div>
              <div className="rounded-2xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl bg-slate-50/95 p-4 dark:bg-slate-900/80">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Efficiency</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white">{slide.metricValue}</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-full w-[95%] rounded-full bg-gradient-to-r from-primary-500 to-solar-500" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/95 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                  <CalendarCheck2 className="h-5 w-5 text-primary-500" />
                  <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Next Cleaning</p>
                  <p className="mt-1 text-xl font-black text-slate-900 dark:text-white">Scheduled</p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/95 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                  <Truck className="h-5 w-5 text-solar-500" />
                  <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Service Status</p>
                  <p className="mt-1 text-xl font-black text-slate-900 dark:text-white">Active</p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-[1.4rem] bg-gradient-to-r from-primary-500 to-solar-500 p-4 text-white shadow-lg shadow-primary-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/80">Live Tracking</p>
                  <p className="mt-1 text-2xl font-black">Performance Sync</p>
                </div>
                <Droplets className="h-10 w-10 opacity-90" />
              </div>
              <p className="mt-2 text-sm text-white/85">{slide.metricLabel}</p>
            </div>
          </div>

          <div className="relative flex flex-col justify-between gap-4">
            <div className="rounded-[1.6rem] border border-white/70 dark:border-white/10 bg-white/85 dark:bg-slate-950/65 p-4 shadow-xl backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Solar Panel</p>
              <div className="mt-3 rounded-[1.6rem] bg-gradient-to-br from-primary-200 via-primary-400 to-solar-500 p-4 shadow-inner dark:from-primary-900 dark:via-primary-700 dark:to-solar-800">
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 9 }).map((_, idx) => (
                    <div key={idx} className="h-12 rounded-xl border border-white/30 bg-white/20" />
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/70 dark:border-white/10 bg-white/85 dark:bg-slate-950/65 p-4 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Quality Award</p>
                  <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Top Service Trophy</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">
                  <Star className="h-7 w-7 fill-current" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-[1.25rem] bg-slate-50 px-4 py-3 dark:bg-slate-900">
                <Lock className="h-5 w-5 text-primary-500" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Automated scheduling and performance alerts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PremiumHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[activeIndex];

  return (
    <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.12),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_35%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.14),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.14),_transparent_35%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:80px_80px] opacity-35 dark:opacity-15" />
      <div className="absolute left-0 top-0 -z-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute right-0 top-20 -z-10 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="section-container !py-12 lg:!py-16">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className={`inline-flex items-center gap-2 rounded-full border ${slide.palette.border} bg-white/80 px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur dark:bg-slate-950/75`}>
            <div className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r ${slide.palette.accent} text-white`}>
              <slide.badgeIcon className="h-3.5 w-3.5" />
            </div>
            <span className={slide.badgeTone}>{slide.badge}</span>
          </div>

          <div className="hidden gap-2 sm:flex">
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-10 bg-slate-900 dark:bg-white' : 'w-2.5 bg-slate-300 dark:bg-slate-700'
                }`}
                aria-label={`Go to ${item.id} slide`}
              />
            ))}
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="order-2 lg:order-1"
            >
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950/75 dark:text-slate-300">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Premium Business Solutions
                </div>

                <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                  <span className="bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400">
                    {slide.title}
                  </span>
                </h1>

                <p className="mt-5 text-lg font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
                  {slide.tagline}
                </p>

                <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                  {slide.description}
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href={slide.primaryCta.href}
                    className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold"
                  >
                    {slide.primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={slide.secondaryCta.href}
                    className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold"
                  >
                    {slide.secondaryCta.label}
                  </Link>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/enquiry"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
                  >
                    Start Free
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
                  >
                    Explore
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <AppBadge kind="google" />
                  <AppBadge kind="apple" />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {['Premium Quality', 'Fast Delivery', 'Trusted by Businesses'].map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950/75 dark:text-slate-200"
                    >
                      <BadgeCheck className="h-4 w-4 text-emerald-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${slide.id}-graphic`}
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.97 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="order-1 lg:order-2"
            >
              <SlideGraphic slide={slide} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveIndex((current) => (current - 1 + slides.length) % slides.length)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/75 dark:text-slate-200 dark:hover:bg-slate-900"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/75 dark:text-slate-200 dark:hover:bg-slate-900"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </div>
        </div>
      </div>
    </section>
  );
}
