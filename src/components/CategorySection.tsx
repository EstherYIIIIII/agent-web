'use client';

import { motion } from 'framer-motion';
import { Locale } from '@/lib/i18n';
import { Category } from '@/lib/types';
import SiteCard from './SiteCard';

interface CategorySectionProps {
  category: Category;
  locale: Locale;
  startIndex: number;
}

export default function CategorySection({
  category,
  locale,
  startIndex,
}: CategorySectionProps) {
  return (
    <section>
      {/* Section header with decorative lines */}
      <div className="mb-10">
        {/* Decorative title */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--color-border)]" />
          <div className="flex items-center gap-2.5">
            <span className="text-lg">{category.icon}</span>
            <h2 className="font-serif text-xl font-semibold tracking-tight text-[var(--color-text-primary)]">
              {category.name[locale]}
            </h2>
            <span className="text-sm text-[var(--color-text-muted)]">
              ({category.sites.length})
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--color-border)]" />
        </div>
        <p className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
          {category.description[locale]}
        </p>
      </div>

      {/* Cards grid — two columns max */}
      <div className="grid gap-5 sm:grid-cols-2">
        {category.sites.map((site, i) => (
          <motion.div
            key={site.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.4,
              delay: Math.min(i * 0.05, 0.25),
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <SiteCard site={site} locale={locale} index={startIndex + i} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
