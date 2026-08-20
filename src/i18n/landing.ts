import type { Lang } from './ui';

export interface ThesisItem {
  mark: string;
  verb: string;
  question: string;
  body: string;
}

export interface MethodStep {
  n: string;
  title: string;
  body: string;
}

export interface PathItem {
  mark: string;
  title: string;
  body: string;
  tag: string;
  href: string;
}

export interface LandingContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; headline: string; lead: string; cta1: string; cta2: string };
  compose: {
    eyebrow: string;
    title: string;
    lead: string;
    sourceLabel: string;
    resultLabel: string;
    commandLabel: string;
    lineage: string;
  };
  thesis: { eyebrow: string; title: string; lead: string; items: ThesisItem[] };
  method: {
    eyebrow: string;
    title: string;
    lead: string;
    tabletIntro: string;
    steps: MethodStep[];
  };
  tablet: { verses: string[]; attrib: string };
  evidence: {
    eyebrow: string;
    title: string;
    lead: string;
    receipt: string;
    noReceipt: string;
    storyEyebrow: string;
    storyTitle: string;
    storyBody: string;
    storyTag: string;
    storyHref: string;
  };
  paths: { eyebrow: string; title: string; lead: string; items: PathItem[] };
  join: { eyebrow: string; title: string; lead: string; coda: string };
}

const zh: LandingContent = {
  meta: {
    title: 'n/ — 你的兩個程式，可以相加',
    description: 'n/ 是從格論出發的語義作業系統：程式可以合併、由內容辨認，並在觀測時收斂。',
  },
  hero: {
    eyebrow: '語義作業系統 · @co-nlang',
    headline: '你的兩個程式，可以相加。',
    lead: '在 n/，這個加法寫作 &。它不是把文字接在一起，而是讓兩份各自成立的程式收斂成同一個值：相容的資訊合併，矛盾留下原因。',
    cta1: '看它們合併',
    cta2: '為什麼這樣設計',
  },
  compose: {
    eyebrow: '先看一件真的事',
    title: '不是拼接，是有定義的合併',
    lead: '兩個檔案各自只知道一半。oo 把它們放進同一個宇宙，以格的交運算收斂；交換檔案順序，答案不變。',
    sourceLabel: '來源',
    resultLabel: '觀測結果',
    commandLabel: '實跑',
    lineage: '<strong>如果你熟悉 CUE：</strong>這份相似是我們承認的祖先，不是要藏起來的對手。n/ 從格與合一出發，繼續追問耐久身分、歷史、觀測，以及跨機器交換。',
  },
  thesis: {
    eyebrow: '它真正追問的事',
    title: '一個結構，能否不靠外部名稱，而由自身的關係被辨認、觀測與組合？',
    lead: '這不是三個平行功能，而是同一個問題長出的三隻手。數學不是第四隻手；它是這三件事接受檢驗的地方。',
    items: [
      { mark: '%id', verb: '辨認', question: '不靠名字，怎麼知道這是哪一個東西？', body: '內容形成位址；值、根與提交可以由自己的結構被指認。名字是入口，不是身分。' },
      { mark: '<<>>', verb: '觀測', question: '不先把整個世界跑完，怎麼知道它是什麼？', body: '求值沿觀測路徑發生。沒被要求的部分保持惰性；看不清楚時，結果也必須誠實地說不清楚。' },
      { mark: '&', verb: '組合', question: '兩個結構相遇，結果由誰決定？', body: '格律決定收斂。相容的約束變得更精確；不相容時得到帶 %cause 的底，而不是偷偷覆寫。' },
    ],
  },
  method: {
    eyebrow: '方法',
    title: '哲學命題是假設，不是結論',
    lead: '在理論與實作還沒能支撐一個設計以前，最清楚的往往只是一句哲學性的假設。n/ 把它先寫下來，再讓數學、引擎與失敗記錄逐步檢驗。',
    tabletIntro: '下面這塊石板不是答案。它是專案在還不知道答案以前，替自己留下的原始假設。',
    steps: [
      { n: '01', title: '假設', body: '先把尚未證明、但足以指引設計的那句話寫清楚。' },
      { n: '02', title: '導出', body: '從它導出格、帶因果的底、call-by-observation 與內容身分。' },
      { n: '03', title: '檢驗', body: '把宣稱交給規格、探針、符合性向量和真實引擎。' },
      { n: '04', title: '留下被推翻的地方', body: '錯誤不是從歷史抹掉；修正移動了什麼，與程式碼一起記錄。' },
    ],
  },
  tablet: {
    verses: [
      '如其在頂（<span class="car">_</span>），如其在底（<span class="car">_|_</span>）；<br>如其在全集之虛空，如其在原子之真實。<br><span class="em">以成那唯一之奇蹟 —— 收斂。</span>',
      '宇宙皆 Combo，欄位即可能之源，原子即存在之果。<br><span class="em">交集以純化真理，聯集以展開萬物。</span>',
      '銜尾蛇自吞其尾：其父為定義，其母為收斂。<br><span class="em">其力在於：若它能被觀測，它便已是真實。</span>',
    ],
    attrib: '— 規格書序言 · Specification Preface',
  },
  evidence: {
    eyebrow: '不用先相信我們',
    title: '你可以看著我們出錯',
    lead: '每一弧都留下工單、探針、驗收與故事提交。重點不是展示謙虛，而是讓一句宣稱被推翻時，修正造成的代價仍然找得到。',
    receipt: '本頁的 {claims} 項結果宣稱，已由 <strong>{engine}</strong> 實跑；沒有收據，這行就不會出現。',
    noReceipt: '本次建置沒有誠實閘收據，因此不展示任何驗證數字。',
    storyEyebrow: '最近一則引擎故事',
    storyTitle: 'One name, two answers',
    storyBody: '同一個名字，裸讀與投影曾得到兩個答案。前一版的探針只問 evolve 有沒有報錯，卻從未觀測真正失敗的那條路。修正與那支失明的探針一起留在提交裡。',
    storyTag: '閱讀完整故事提交 →',
    storyHref: 'https://github.com/co-nlang/nlang-tools/commit/bf0776944df7682e6aa608557fa41a0cc4cce910',
  },
  paths: {
    eyebrow: '從你在意的問題進去',
    title: '這裡不是四個維度，是幾條不同的路',
    lead: '首頁到這裡已經把問題說完。接下來依你想做的事選入口；未完成的內頁不會假裝成文件。',
    items: [
      { mark: 'oo', title: '跑起來', body: '安裝參考引擎，從兩個真實檔案的合併開始。', tag: '五分鐘 Quick Start →', href: '/tools' },
      { mark: '§', title: '讀規格', body: '語法、語義、實現契約與符合性要求都在同一部法典。', tag: '前往規格書 →', href: 'https://github.com/co-nlang/nlang-spec' },
      { mark: 'H*', title: '看研究', body: '從白皮書到障礙階梯；定理、reduction 與 correspondence 分開標記。', tag: '進入研究倉 →', href: 'https://github.com/co-nlang/research' },
      { mark: 'git', title: '看它怎麼改變', body: '故事提交記錄每一弧之前相信什麼、哪個量測推翻它，以及代價。', tag: '閱讀演進記錄 →', href: 'https://github.com/co-nlang/nlang-tools/commits/top' },
    ],
  },
  join: {
    eyebrow: '參與',
    title: '把你的觀測帶進來',
    lead: '規格、引擎與研究都在 GitHub 上公開形成。你可以從一個反例、一支探針、一條規格問題，或一個完全不同的視角開始。',
    coda: '引導期的治理細節仍在收斂中。目前以 GitHub 為物理實體，規格書為法典；不先把尚未長出的結構寫成完成品。',
  },
};

const en: LandingContent = {
  meta: {
    title: 'n/ — Your two programs can be added',
    description: 'n/ is a lattice-born semantic operating system: programs compose, content identifies itself, and values converge when observed.',
  },
  hero: {
    eyebrow: 'A Semantic Operating System · @co-nlang',
    headline: 'Your two programs can be added.',
    lead: 'In n/, that addition is written &. It does not concatenate text. It lets two independently valid programs converge into one value: compatible information combines; contradictions keep their cause.',
    cta1: 'Watch them combine',
    cta2: 'Why design it this way?',
  },
  compose: {
    eyebrow: 'Start with something verifiable',
    title: 'A defined merge, not concatenation',
    lead: 'Each file knows only half. oo places both in one universe and converges them with lattice meet. Reverse the file order and the answer stays the same.',
    sourceLabel: 'Source',
    resultLabel: 'Observed result',
    commandLabel: 'Run it',
    lineage: '<strong>If you know CUE:</strong> the resemblance is an ancestry we acknowledge, not a rival we hide. n/ begins with lattices and unification, then asks about durable identity, history, observation, and exchange across machines.',
  },
  thesis: {
    eyebrow: 'The question underneath',
    title: 'Can a structure be identified, observed, and composed through its own relations, without relying on an external name?',
    lead: 'These are not three parallel features. They are three hands grown from one question. Mathematics is not a fourth hand; it is where the other three are tested.',
    items: [
      { mark: '%id', verb: 'Identify', question: 'Without a name, how do we know which thing this is?', body: 'Content forms its address. Values, roots, and commits can be identified by their own structure. A name is an entry point, not an identity.' },
      { mark: '<<>>', verb: 'Observe', question: 'Without running the whole world first, how do we know what it is?', body: 'Evaluation follows the path being observed. What was not requested remains lazy; when the view is incomplete, the result must say so honestly.' },
      { mark: '&', verb: 'Compose', question: 'When two structures meet, who decides the result?', body: 'The lattice laws decide convergence. Compatible constraints become more precise; incompatible ones yield caused bottom instead of a silent overwrite.' },
    ],
  },
  method: {
    eyebrow: 'Method',
    title: 'The philosophical claim is a hypothesis, not a conclusion',
    lead: 'Before theory and implementation can support a design, the clearest thing available may be a philosophical hypothesis. n/ writes it down first, then lets mathematics, the engine, and the record of failure test it.',
    tabletIntro: 'The tablet below is not an answer. It is a primary record of what the project wrote down before it knew whether the answer would hold.',
    steps: [
      { n: '01', title: 'Hypothesize', body: 'State the unproven sentence clearly enough to guide a design.' },
      { n: '02', title: 'Derive', body: 'Let it lead to lattices, caused bottom, call-by-observation, and content identity.' },
      { n: '03', title: 'Test', body: 'Submit every claim to the specification, probes, conformance vectors, and a real engine.' },
      { n: '04', title: 'Keep the reversals', body: 'Do not erase mistakes from history; record what the correction actually moved beside the code.' },
    ],
  },
  tablet: {
    verses: [
      'As above (Top&nbsp;<span class="car">_</span>), so below (Bottom&nbsp;<span class="car">_|_</span>);<br>as in the void of the whole, so in the truth of the atom.<br><span class="em">To work the one miracle — convergence.</span>',
      'All the universe is Combo — a field the wellspring of the possible, an atom the fruit of the existent.<br><span class="em">By meet, truth is purified; by join, all things unfold.</span>',
      'The Ouroboros devours its own tail: its father is definition, its mother convergence.<br><span class="em">Herein its power — if it can be observed, it is already real.</span>',
    ],
    attrib: '— Specification Preface',
  },
  evidence: {
    eyebrow: 'Do not take our word for it',
    title: 'You can watch us be wrong',
    lead: 'Every arc leaves a work order, probes, acceptance evidence, and a story commit. The point is not performative humility. It is making the cost of a disproved claim traceable.',
    receipt: 'The {claims} result claim(s) on this page were executed by <strong>{engine}</strong>. Without a receipt, this line does not appear.',
    noReceipt: 'This build has no honesty-gate receipt, so it publishes no verification number.',
    storyEyebrow: 'A recent engine story',
    storyTitle: 'One name, two answers',
    storyBody: 'The same name once produced one answer when read bare and another through projection. The previous probe asked only whether evolve reported an error; it never observed the path that failed. The repair and the blind probe remain together in the commit.',
    storyTag: 'Read the full story commit →',
    storyHref: 'https://github.com/co-nlang/nlang-tools/commit/bf0776944df7682e6aa608557fa41a0cc4cce910',
  },
  paths: {
    eyebrow: 'Enter through the question you have',
    title: 'Not four dimensions — several ways forward',
    lead: 'The landing page has made its case. From here, choose what you want to do; unfinished inner pages will not pretend to be documentation.',
    items: [
      { mark: 'oo', title: 'Run it', body: 'Install the reference engine and begin by composing two real files.', tag: 'Five-minute Quick Start →', href: '/en/tools' },
      { mark: '§', title: 'Read the specification', body: 'Syntax, semantics, implementation contracts, and conformance requirements share one code of law.', tag: 'Open the specification →', href: 'https://github.com/co-nlang/nlang-spec' },
      { mark: 'H*', title: 'Read the research', body: 'From the whitepaper to the obstruction ladder, with theorem, reduction, and correspondence marked separately.', tag: 'Enter the research repo →', href: 'https://github.com/co-nlang/research' },
      { mark: 'git', title: 'See how it changes', body: 'Story commits record what each arc believed, which measurement overturned it, and what the correction cost.', tag: 'Read the history →', href: 'https://github.com/co-nlang/nlang-tools/commits/top' },
    ],
  },
  join: {
    eyebrow: 'Participate',
    title: 'Bring your observation',
    lead: 'The specification, engine, and research all form in public on GitHub. Start with a counterexample, a probe, a specification question, or a view none of us has considered.',
    coda: 'Bootstrap governance is still converging. GitHub is the physical substrate and the specification is the law; we do not present structures that have not grown yet as finished.',
  },
};

export const landing: Record<Lang, LandingContent> = { 'zh-TW': zh, en };
