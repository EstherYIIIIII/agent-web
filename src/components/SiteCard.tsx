'use client';

import { Locale, translations } from '@/lib/i18n';
import { Site } from '@/lib/types';

interface SiteCardProps {
  site: Site;
  locale: Locale;
  index: number;
}

export default function SiteCard({ site, locale, index }: SiteCardProps) {
  const t = translations[locale];
  const domain = new URL(site.url).hostname;

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-hover)] hover:shadow-md"
    >
      {/* Icon + Name */}
      <div className="flex items-start gap-3.5">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--color-bg-secondary)]">
          <img
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
            alt=""
            className="h-4.5 w-4.5"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="font-serif text-sm font-semibold text-[var(--color-accent)]">${site.name[0]}</span>`;
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent)]">
            {site.name}
          </h3>
          <p className="mt-0.5 truncate text-xs text-[var(--color-text-muted)]">{domain}</p>
        </div>
        <div className="flex-shrink-0 opacity-0 transition-all duration-200 group-hover:opacity-100">
          <svg
            className="h-4 w-4 text-[var(--color-accent)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 17L17 7M17 7H7M17 7V17"
            />
          </svg>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 flex-1 text-[13px] leading-relaxed text-[var(--color-text-secondary)] line-clamp-2">
        {site.description[locale]}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {site.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[var(--color-accent-bg)] px-2.5 py-0.5 text-[11px] text-[var(--color-accent)] transition-colors"
          >
            {tag}
          </span>
        ))}
        {site.tags.length > 3 && (
          <span className="rounded-full bg-[var(--color-bg-secondary)] px-2.5 py-0.5 text-[11px] text-[var(--color-text-muted)]">
            +{site.tags.length - 3}
          </span>
        )}
      </div>
    </a>
  );
}
