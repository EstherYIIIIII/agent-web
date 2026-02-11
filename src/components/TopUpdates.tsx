'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Locale, translations } from '@/lib/i18n';
import { TopUpdate } from '@/lib/types';

interface TopUpdatesProps {
  locale: Locale;
  updates: TopUpdate[];
}

export default function TopUpdates({ locale, updates }: TopUpdatesProps) {
  const t = translations[locale];
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-lg font-semibold text-[var(--color-text-primary)]">
            {t.topUpdates}
          </h2>
          <span className="rounded-full border border-[var(--color-accent-light)] bg-[var(--color-accent-bg)] px-2.5 py-0.5 text-[10px] font-medium text-[var(--color-accent)]">
            NEW
          </span>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent-light)] hover:text-[var(--color-accent)]"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent-light)] hover:text-[var(--color-accent)]"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Decorative line */}
      <div className="mt-4 h-px bg-gradient-to-r from-[var(--color-border)] via-[var(--color-border)] to-transparent" />

      {/* Horizontal scroll cards */}
      <div
        ref={scrollRef}
        className="hide-scrollbar -mx-6 mt-6 flex gap-4 overflow-x-auto px-6 pb-2 sm:-mx-8 sm:px-8"
      >
        {updates.map((update, i) => (
          <motion.a
            key={i}
            href={update.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group flex w-[300px] flex-shrink-0 flex-col justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 shadow-sm transition-all duration-300 hover:border-[var(--color-border-hover)] hover:shadow-md"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm font-semibold text-[var(--color-accent)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {update.source}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--color-text-secondary)] transition-colors group-hover:text-[var(--color-text-primary)] line-clamp-3">
                {update.title[locale]}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] text-[var(--color-text-muted)]">{update.date}</span>
              <svg
                className="h-3.5 w-3.5 text-[var(--color-text-muted)] transition-all group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
