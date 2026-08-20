export const languages = { 'zh-TW': '中文', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'zh-TW';

/** The site's page routes, in nav order. `path` is the zh (default-locale) path. */
export const routes = [
  { key: 'language', path: '/language' },
  { key: 'discovery', path: '/discovery' },
  { key: 'tools', path: '/tools' },
  { key: 'research', path: '/research' },
  { key: 'join', path: '/join' },
  { key: 'blog', path: '/blog' },
] as const;

/** Given a zh path and a target lang, return the localized href. */
export function localize(path: string, lang: Lang): string {
  const clean = path === '/' ? '' : path;
  return lang === 'zh-TW' ? clean || '/' : `/en${clean}`;
}

/** Given the current URL pathname, return the equivalent path in the other lang. */
export function altHref(pathname: string, current: Lang): string {
  const target: Lang = current === 'zh-TW' ? 'en' : 'zh-TW';
  const stripped = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return localize(stripped === '' ? '/' : stripped, target);
}

export const ui = {
  'zh-TW': {
    'nav.compose': '先看合併',
    'nav.thesis': '核心問題',
    'nav.method': '方法',
    'nav.evidence': '證據',
    'nav.paths': '入口',
    'nav.why': '為什麼',
    'nav.dims': '維度',
    'nav.join': '加入我們',
    'nav.language': '語言',
    'nav.discovery': '發現協議',
    'nav.tools': '工具',
    'nav.research': '研究',
    'nav.blog': 'Blog',
    'footer.stamp': '本頁所有 n/ 範例皆以 <b>{engine}</b> 實跑驗證',
    'footer.tag': '收斂是我們的目標;一致是我們的紐帶。',
    'page.back': '← 回首頁',
    'page.placeholder': '這個維度的內頁正在建置中。目前先佔位——內容會從規格書與引擎逐頁編織進來,所有 n/ 範例都會先經 oo 實跑驗證才上架。',
  },
  en: {
    'nav.compose': 'See the merge',
    'nav.thesis': 'The question',
    'nav.method': 'Method',
    'nav.evidence': 'Evidence',
    'nav.paths': 'Explore',
    'nav.why': 'Why',
    'nav.dims': 'Dimensions',
    'nav.join': 'Join',
    'nav.language': 'Language',
    'nav.discovery': 'Discovery',
    'nav.tools': 'Tools',
    'nav.research': 'Research',
    'nav.blog': 'Blog',
    'footer.stamp': 'Every n/ snippet on this page was verified against a live <b>{engine}</b> engine',
    'footer.tag': 'Convergence is our goal; coherence is our bond.',
    'page.back': '← Back to home',
    'page.placeholder': 'This dimension page is under construction. It is a placeholder for now — content will be woven page by page from the specification and the engine, and every n/ snippet will be verified against a live oo engine before it ships.',
  },
} as const;

export function t(lang: Lang) {
  return (key: keyof (typeof ui)['zh-TW']) => ui[lang][key];
}

/** Per-page eyebrow/title/blurb for the placeholder dimension pages. */
export const pageMeta: Record<
  string,
  Record<Lang, { eyebrow: string; title: string; blurb: string }>
> = {
  language: {
    'zh-TW': { eyebrow: '維度一 · 格論', title: '語言本身', blurb: 'Combo 與 Cocoon、交集與聯集、態射與管道、Top 與 Bottom。n/ 的完整語法與哲學。' },
    en: { eyebrow: 'Dimension I · Lattice', title: 'The Language', blurb: 'Combo and Cocoon, meet and join, morphisms and pipes, Top and Bottom. The full grammar and philosophy of n/.' },
  },
  discovery: {
    'zh-TW': { eyebrow: '維度二 · LADD', title: '發現協議與 LADD 網路', blurb: 'CAID 內容定址、氣味搜尋、語義引力 —— 一個自帶語義理解的去中心化發現網路。' },
    en: { eyebrow: 'Dimension II · LADD', title: 'Discovery & the LADD Network', blurb: 'Content-addressed CAID, smell search, semantic gravity — a decentralized discovery network with semantics built in.' },
  },
  tools: {
    'zh-TW': { eyebrow: '維度三 · oo 引擎', title: '工具鏈', blurb: '參考引擎 oo —— 一個惰性、call-by-observation 的直譯器。run / repl / fmt / lint。' },
    en: { eyebrow: 'Dimension III · the oo engine', title: 'The Toolchain', blurb: 'The reference engine oo — a lazy, call-by-observation interpreter. run / repl / fmt / lint.' },
  },
  research: {
    'zh-TW': { eyebrow: '維度四 · 障礙階梯', title: '數學研究', blurb: '上同調障礙階梯:型別衝突、拜占庭錯誤、身分捏造是同一台幾何機器的不同階。22 篇論文 + 白皮書 Paper N。誠實紀律:reduction≠theorem,每個宣稱掛 H* 強度標籤。' },
    en: { eyebrow: 'Dimension IV · the Ladder', title: 'Mathematical Research', blurb: 'The cohomological obstruction ladder: type conflict, Byzantine faults, and identity forgery as rungs of one geometric machine. A 22-paper series plus the Paper N whitepaper. Honest marking: reductions are not closed theorems; every claim carries its strength tag in H*.' },
  },
  join: {
    'zh-TW': { eyebrow: '加入我們', title: '治理與貢獻', blurb: '引導期治理以 GitHub 為物理實體,由四人委員會維護。co: #collective | #colimit。' },
    en: { eyebrow: 'Join us', title: 'Governance & Contributing', blurb: 'During bootstrap, governance runs on GitHub, maintained by a Council of Four. co: #collective | #colimit.' },
  },
  blog: {
    'zh-TW': { eyebrow: 'Blog', title: '主題文章', blurb: '針對特定主題的短文:方法論、設計取捨、connect-the-dots 的發現故事。文章系統即將上線。' },
    en: { eyebrow: 'Blog', title: 'Topic Essays', blurb: 'Short essays on specific themes: methodology, design trade-offs, the connect-the-dots discovery stories. The article system is coming soon.' },
  },
};
