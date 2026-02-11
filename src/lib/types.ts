export interface LocalizedString {
  en: string;
  zh: string;
}

export interface Site {
  name: string;
  url: string;
  description: LocalizedString;
  tags: string[];
}

export interface Category {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  icon: string;
  sites: Site[];
}

export interface TopUpdate {
  title: LocalizedString;
  url: string;
  source: string;
  date: string;
}

export interface SitesData {
  categories: Category[];
  topUpdates: TopUpdate[];
}
