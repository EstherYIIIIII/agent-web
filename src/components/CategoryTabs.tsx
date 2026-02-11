'use client';

import { Locale, translations } from '@/lib/i18n';
import { Category } from '@/lib/types';

interface CategoryTabsProps {
  locale: Locale;
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export default function CategoryTabs({
  locale,
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  const t = translations[locale];

  const allTabs = [
    {
      id: null,
      label: t.allCategories,
      icon: '✦',
      count: categories.reduce((s, c) => s + c.sites.length, 0),
    },
    ...categories.map((cat) => ({
      id: cat.id,
      label: cat.name[locale],
      icon: cat.icon,
      count: cat.sites.length,
    })),
  ];

  return (
    <div>
      {/* Section title */}
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--color-border)]" />
        <h2 className="font-serif text-sm font-medium tracking-widest uppercase text-[var(--color-text-muted)]">
          {locale === 'en' ? 'Categories' : '分类浏览'}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--color-border)]" />
      </div>

      {/* Tab list */}
      <div className="hide-scrollbar -mx-6 flex flex-wrap justify-center gap-2 px-6 sm:-mx-8 sm:px-8">
        {allTabs.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id ?? 'all'}
              onClick={() => onCategoryChange(tab.id)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
                isActive
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent-bg)] text-[var(--color-accent)]'
                  : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent-light)] hover:text-[var(--color-accent)]'
              }`}
            >
              <span className="text-xs">{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                className={`ml-0.5 text-[11px] ${
                  isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)] opacity-60'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
