'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Locale } from '@/lib/i18n';
import { SitesData } from '@/lib/types';
import sitesData from '@/data/sites.json';
import Hero from '@/components/Hero';
import SearchModal from '@/components/SearchModal';
import CategoryTabs from '@/components/CategoryTabs';
import TopUpdates from '@/components/TopUpdates';
import CategorySection from '@/components/CategorySection';
import Footer from '@/components/Footer';

const data = sitesData as SitesData;

export default function Home() {
  const [locale, setLocale] = useState<Locale>('zh');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const totalSites = data.categories.reduce(
    (sum, cat) => sum + cat.sites.length,
    0
  );

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const filteredCategories = useMemo(() => {
    let categories = data.categories;

    if (activeCategory) {
      categories = categories.filter((cat) => cat.id === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      categories = categories
        .map((cat) => ({
          ...cat,
          sites: cat.sites.filter(
            (site) =>
              site.name.toLowerCase().includes(query) ||
              site.description.en.toLowerCase().includes(query) ||
              site.description.zh.includes(query) ||
              site.tags.some((tag) => tag.toLowerCase().includes(query)) ||
              site.url.toLowerCase().includes(query)
          ),
        }))
        .filter((cat) => cat.sites.length > 0);
    }

    return categories;
  }, [activeCategory, searchQuery]);

  const handleSearchSelect = useCallback((url: string) => {
    window.open(url, '_blank');
    setSearchOpen(false);
    setSearchQuery('');
  }, []);

  let runningIndex = 0;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--color-bg-primary)]">
      <div className="relative">
        {/* Hero */}
        <Hero
          locale={locale}
          onLocaleChange={setLocale}
          totalSites={totalSites}
          totalCategories={data.categories.length}
          onSearchClick={() => setSearchOpen(true)}
        />

        {/* Main content */}
        <main className="mx-auto max-w-4xl px-6 pb-24 sm:px-8">
          {/* Top Updates */}
          <section className="mb-20">
            <TopUpdates locale={locale} updates={data.topUpdates} />
          </section>

          {/* Category filter */}
          <section className="mb-16">
            <CategoryTabs
              locale={locale}
              categories={data.categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </section>

          {/* Cards */}
          {filteredCategories.length > 0 ? (
            <div className="space-y-24">
              {filteredCategories.map((cat) => {
                const sectionStartIndex = runningIndex;
                runningIndex += cat.sites.length;
                return (
                  <CategorySection
                    key={cat.id}
                    category={cat}
                    locale={locale}
                    startIndex={sectionStartIndex}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="text-5xl opacity-40">✦</div>
              <p className="mt-6 font-serif text-lg italic text-[var(--color-text-muted)]">
                {locale === 'en'
                  ? 'No platforms found matching your search.'
                  : '没有找到匹配的平台。'}
              </p>
            </div>
          )}
        </main>

        <Footer locale={locale} />
      </div>

      {/* Search Modal */}
      <SearchModal
        open={searchOpen}
        onClose={() => {
          setSearchOpen(false);
          setSearchQuery('');
        }}
        locale={locale}
        categories={data.categories}
        onSelect={handleSearchSelect}
      />
    </div>
  );
}
