'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Locale, translations } from '@/lib/i18n';
import { Category, Site } from '@/lib/types';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  categories: Category[];
  onSelect: (url: string) => void;
}

export default function SearchModal({
  open,
  onClose,
  locale,
  categories,
  onSelect,
}: SearchModalProps) {
  const t = translations[locale];
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const items: (Site & { categoryName: string })[] = [];
    categories.forEach((cat) => {
      cat.sites.forEach((site) => {
        if (
          site.name.toLowerCase().includes(q) ||
          site.description.en.toLowerCase().includes(q) ||
          site.description.zh.includes(q) ||
          site.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          site.url.toLowerCase().includes(q)
        ) {
          items.push({ ...site, categoryName: cat.name[locale] });
        }
      });
    });
    return items.slice(0, 8);
  }, [query, categories, locale]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      onSelect(results[selectedIndex].url);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="search-backdrop fixed inset-0 z-50 bg-[var(--color-bg-primary)]/70"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[15%] z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-2xl shadow-black/10"
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-5 py-4">
              <svg
                className="h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)]"
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
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.searchPlaceholder}
                className="flex-1 bg-transparent text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none"
              />
              <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-1.5 py-0.5 text-[10px] text-[var(--color-text-muted)]">
                ESC
              </kbd>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="max-h-80 overflow-y-auto p-2">
                {results.map((site, i) => {
                  const domain = new URL(site.url).hostname;
                  return (
                    <button
                      key={site.url}
                      onClick={() => onSelect(site.url)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        i === selectedIndex
                          ? 'bg-[var(--color-accent-bg)]'
                          : 'hover:bg-[var(--color-bg-secondary)]'
                      }`}
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--color-bg-secondary)]">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
                          alt=""
                          className="h-4 w-4"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="font-serif text-xs font-semibold text-[var(--color-accent)]">${site.name[0]}</span>`;
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                            {site.name}
                          </span>
                          <span className="truncate text-xs text-[var(--color-text-muted)]">
                            {site.categoryName}
                          </span>
                        </div>
                        <p className="truncate text-xs text-[var(--color-text-muted)]">
                          {site.description[locale]}
                        </p>
                      </div>
                      <svg
                        className="h-3.5 w-3.5 flex-shrink-0 text-[var(--color-text-muted)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Empty state */}
            {query.trim() && results.length === 0 && (
              <div className="px-5 py-10 text-center">
                <p className="text-sm text-[var(--color-text-muted)]">
                  {locale === 'en' ? 'No results found' : '未找到结果'}
                </p>
              </div>
            )}

            {/* Hints */}
            {!query.trim() && (
              <div className="px-5 py-10 text-center">
                <p className="font-serif text-sm italic text-[var(--color-text-muted)]">
                  {locale === 'en'
                    ? 'Type to search platforms...'
                    : '输入关键词搜索平台...'}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
