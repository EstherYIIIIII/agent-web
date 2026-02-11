'use client';

import { motion } from 'framer-motion';
import { Locale, translations } from '@/lib/i18n';

interface HeroProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  totalSites: number;
  totalCategories: number;
  onSearchClick: () => void;
}

export default function Hero({
  locale,
  onLocaleChange,
  totalSites,
  totalCategories,
  onSearchClick,
}: HeroProps) {
  const t = translations[locale];

  return (
    <header className="relative">
      {/* Navigation bar */}
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 pt-8 sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="font-serif text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
            Agent Web
          </span>
        </div>
        <button
          onClick={() => onLocaleChange(locale === 'en' ? 'zh' : 'en')}
          className="rounded-full border border-[var(--color-border)] px-4 py-1.5 text-xs font-medium text-[var(--color-text-muted)] transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          {t.langSwitch}
        </button>
      </nav>

      {/* Hero content */}
      <div className="mx-auto max-w-4xl px-6 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-32">
        <div className="flex flex-col items-center text-center">
          {/* Decorative asterisk */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-[var(--color-accent-light)] text-2xl"
          >
            ✦
          </motion.div>

          {/* Stats badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] tracking-wide">
              {totalSites} {t.totalSites} · {totalCategories} {t.totalCategories}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-2xl font-serif text-4xl font-semibold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-5xl md:text-6xl"
          >
            {t.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg"
          >
            {t.subtitle}
          </motion.p>

          {/* Search trigger */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            onClick={onSearchClick}
            className="group mt-12 flex w-full max-w-md items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 py-3.5 text-left shadow-sm transition-all duration-200 hover:border-[var(--color-accent-light)] hover:shadow-md"
          >
            <svg
              className="h-4 w-4 text-[var(--color-text-muted)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="flex-1 text-sm text-[var(--color-text-muted)]">
              {t.searchPlaceholder}
            </span>
            <kbd className="hidden rounded-md border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-text-muted)] sm:inline-block">
              ⌘K
            </kbd>
          </motion.button>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      </div>
    </header>
  );
}
