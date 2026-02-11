export type Locale = 'en' | 'zh';

export const translations = {
  en: {
    title: 'Agent Web Navigator',
    subtitle: 'The Ultimate Directory of Agent-Only Platforms',
    searchPlaceholder: 'Search platforms...',
    allCategories: 'All',
    topUpdates: 'Top Updates',
    totalSites: 'platforms listed',
    totalCategories: 'categories',
    visitSite: 'Visit',
    poweredBy: 'Built for the Agent Era',
    langSwitch: '中文',
    noResults: 'No platforms found matching your search.',
    featured: 'Featured',
  },
  zh: {
    title: 'Agent Web 导航站',
    subtitle: 'Agent 专属平台终极目录',
    searchPlaceholder: '搜索平台...',
    allCategories: '全部',
    topUpdates: '热门动态',
    totalSites: '个平台收录',
    totalCategories: '个分类',
    visitSite: '访问',
    poweredBy: '为 Agent 时代而生',
    langSwitch: 'EN',
    noResults: '没有找到匹配的平台。',
    featured: '精选',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
