/**
 * SynCraft i18n — Translation dictionary
 * Server-side translations for static HTML generation
 */

export const translations = {
  ja: {
    // Site meta
    'site.title': 'SynCraft - Small Tech. Real Impact.',
    'site.description':
      'SynCraft（シンクラフト）は、日常の小さな課題に寄り添うプロダクトを企画・開発する個人開発スタジオです。',

    // Nav
    'nav.home': 'HOME',
    'nav.product': 'PRODUCT',
    'nav.blog': 'BLOG',
    'nav.contact': 'CONTACT',

    // Product section
    'section.product': 'PRODUCT',
    'product.ts.alt': 'TimeSense アプリの紹介画像',
    'product.ts.desc':
      '「TimeSense」は、子どもの知育・自立と親子の時間をサポートする声かけタイマーアプリです。',
    'product.ts.feat1': '直感的な操作',
    'product.ts.feat2': '優しい声かけ',
    'product.ts.feat3': '子供に優しい',
    'product.ts.btn': 'Product Page',
    'product.sr.alt': 'STEALTH RADAR アプリの紹介画像',
    'product.sr.desc':
      '「STEALTH RADAR」は、日常を冒険に変えるエンターテインメント型GPS探索レーダーアプリです。',
    'product.sr.feat1': 'GPS探索',
    'product.sr.feat2': 'レーダーUI',
    'product.sr.feat3': '安全な共有',
    'product.sr.btn': 'Product Page',

    // Blog section
    'section.blog': 'Blog',
    'blog.readmore': 'Read more →',
    'blog.back': '← 記事一覧へ戻る',
    'blog.viewall': '全ての記事を見る →',
    'blog.related': '関連記事',

    // Contact section
    'section.contact': 'CONTACT',
    'contact.developer': 'Developer: SynCraft（シンクラフト）',

    // Footer
    'footer.copyright': '© SynCraft 2025',

    // CTA
    'cta.try_timesense': 'TimeSense を試す →',
    'cta.try_stealthradar': 'STEALTH RADAR を試す →',
  },

  en: {
    // Site meta
    'site.title': 'SynCraft - Small Tech. Real Impact.',
    'site.description':
      'SynCraft is an indie dev studio building products that solve small, everyday challenges.',

    // Nav
    'nav.home': 'HOME',
    'nav.product': 'PRODUCT',
    'nav.blog': 'BLOG',
    'nav.contact': 'CONTACT',

    // Product section
    'section.product': 'PRODUCT',
    'product.ts.alt': 'TimeSense app introduction',
    'product.ts.desc':
      'TimeSense is a visual timer and voice-guided clock app designed to help kids build independence and create calmer daily routines.',
    'product.ts.feat1': 'Intuitive Controls',
    'product.ts.feat2': 'Gentle Reminders',
    'product.ts.feat3': 'Kid-Friendly',
    'product.ts.btn': 'Product Page',
    'product.sr.alt': 'STEALTH RADAR app introduction',
    'product.sr.desc':
      'STEALTH RADAR is a GPS-powered scavenger hunt app that turns real-world locations into radar-based adventures.',
    'product.sr.feat1': 'GPS Exploration',
    'product.sr.feat2': 'Radar UI',
    'product.sr.feat3': 'Safe Sharing',
    'product.sr.btn': 'Product Page',

    // Blog section
    'section.blog': 'Blog',
    'blog.readmore': 'Read more →',
    'blog.back': '← Back to Blog',
    'blog.viewall': 'View all posts →',
    'blog.related': 'Related Posts',

    // Contact section
    'section.contact': 'CONTACT',
    'contact.developer': 'Developer: SynCraft',

    // Footer
    'footer.copyright': '© SynCraft 2025',

    // CTA
    'cta.try_timesense': 'Try TimeSense →',
    'cta.try_stealthradar': 'Try STEALTH RADAR →',
  },
} as const;

export type Lang = keyof typeof translations;
export type TranslationKey = keyof (typeof translations)['ja'];

export const languages: Record<Lang, string> = {
  ja: '日本語',
  en: 'ENGLISH',
};

export const defaultLang: Lang = 'ja';
