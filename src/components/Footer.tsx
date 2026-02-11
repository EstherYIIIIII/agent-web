'use client';

import { Locale, translations } from '@/lib/i18n';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = translations[locale];

  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between sm:px-8">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <span className="font-serif font-medium text-[var(--color-text-secondary)]">Agent Web</span>
          <span className="text-[var(--color-border)]">·</span>
          <span>{t.poweredBy}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
          <span>© 2026 Agent Web Navigator</span>
          <span className="text-[var(--color-border)]">·</span>
          <a
            href="https://www.the-agent-web.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-accent)]"
          >
            {locale === 'en' ? 'Inspired by The Agent Web' : '灵感源自 The Agent Web'}
          </a>
        </div>
      </div>
    </footer>
  );
}
