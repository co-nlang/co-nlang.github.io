import type { Lang } from './ui';

export interface TriItem { role: string; name: string; code: string }
export interface DimItem { idx: string; title: string; body: string; tag: string; honest?: string; href: string }
export interface Seat { n: string; title: string; body: string }

export interface LandingContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; headline: string; lead: string; cta1: string; cta2: string; codeCap: string; code: string };
  tablet: { verses: string[]; attrib: string };
  why: { eyebrow: string; title: string; lead: string; tri: TriItem[]; convergeCode: string; note: string };
  dims: { eyebrow: string; title: string; lead: string; items: DimItem[] };
  join: { eyebrow: string; title: string; coEq: string; lead: string; seats: Seat[] };
}

const zh: LandingContent = {
  meta: {
    title: 'n/ — 語義作業系統',
    description: '一個基於格論的宣告式語言:資料、型別、邏輯是同一個幾何物件,從不同角度觀測。',
  },
  hero: {
    eyebrow: '語義作業系統 · @co-nlang',
    headline: '沒有執行,只有觀測。真理是收斂之點。',
    lead: '一個基於格論的宣告式語言 —— 資料、型別、邏輯是同一個幾何物件,只是觀測的角度不同。你不寫步驟,你雕刻約束;交集剩下的形狀就是結果。',
    cta1: '探索語言',
    cta2: '加入我們',
    codeCap: '收斂,即是那唯一之物',
    code: `;; 型別即約束,不是註記
age: 25 & @int      ;; → 25

;; 兩個視角合併 = 交集
{ age: 25 } & { age: @int }
;; → { age: 25 }

;; 矛盾坍縮為帶因果的空集
{ age: 25 } & { age: 30 }
;; → _|_ (%cause: #conflict)`,
  },
  tablet: {
    verses: [
      '如其在頂（<span class="car">_</span>），如其在底（<span class="car">_|_</span>）;<br>如其在全集之虛空,如其在原子之真實。<br><span class="em">以成那唯一之奇蹟 —— 收斂。</span>',
      '宇宙皆 Combo,欄位即可能之源,原子即存在之果。<br><span class="em">交集以純化真理,聯集以展開萬物。</span>',
      '銜尾蛇自吞其尾:其父為定義,其母為收斂。<br><span class="em">其力在於:若它能被觀測,它便已是真實。</span>',
    ],
    attrib: '— 規格書序言 · Specification Preface',
  },
  why: {
    eyebrow: '為什麼是 n/',
    title: '資料、型別、邏輯 —— 同一個東西',
    lead: '傳統上你用 YAML 寫設定、TypeScript 寫型別、Python 寫驗證。n/ 把三者透過一個共通結構(Combo)映射到「格」上,再用單一運算 —— 集合交集(<code style="color:var(--gold)">&</code>)—— 驅動全部。',
    tri: [
      { role: '存有', name: 'Data', code: `;; 存在
age: 25` },
      { role: '邊界', name: 'Type', code: `;; 約束,非註記
25 & @int   ;; → 25
"hi" & @int
;; → _|_` },
      { role: '變換', name: 'Logic', code: `;; 態射與管道
/double: x -> x * 2
5 |> /double |> /inc
;; → 11` },
    ],
    convergeCode: `;; 收斂:約束重疊,剩下唯一的形狀
{ x: 1 } & { y: 2 }        ;; → { x: 1, y: 2 }
(1 | 7) & 1..3            ;; → 1
1..10 & 5..20            ;; → 5..10`,
    note: '<b style="color:var(--indigo)">衝突不是崩潰。</b> 當約束無法相容,結果坍縮為 <code class="bt">_|_</code> —— 一個帶著 <code class="op">%cause</code> 因果標記的空集。錯誤在 n/ 裡不是例外,而是邏輯的空集合。',
  },
  dims: {
    eyebrow: '四個維度',
    title: '同一物件,不同角度',
    lead: 'n/ 橫跨計算、數學、物理。選一個角度進入,深度自己決定。',
    items: [
      { idx: '01', href: '/language', title: '語言 · 格論',
        body: 'Combo 與 Cocoon、交集 <code class="op">&</code> 與聯集 <code class="jn">|</code>、態射與管道、Top <code class="op">_</code> 與 Bottom <code class="bt">_|_</code>。語言的完整語法與哲學。',
        tag: '語法速覽 →' },
      { idx: '02', href: '/discovery', title: '發現協議 · LADD',
        body: 'CAID 內容定址、氣味搜尋、語義引力。一個「自帶語義理解」的去中心化發現網路 —— 指紋在下載之前就能感知彼此的距離。',
        tag: '閱讀協議 →' },
      { idx: '03', href: '/tools', title: '工具 · oo 引擎',
        body: '參考引擎 <code class="op">oo</code> —— 一個惰性、call-by-observation 的直譯器。<code>run</code> / <code>repl</code> / <code>fmt</code> / <code>lint</code>。從這裡開始跑第一支 n/ 程式。',
        tag: '開始使用 →' },
      { idx: '04', href: '/research', title: '研究 · 障礙階梯',
        body: '上同調障礙階梯:把型別衝突、拜占庭錯誤、身分捏造讀成同一台幾何機器的不同階。22 篇論文 + 白皮書 Paper N。',
        honest: '誠實標記:階梯的部分對應為 correspondence-level 洞見,關鍵環節(如 item 21)是 <i>reduction</i> 而非已封閉的定理。我們把每個「本質」宣稱都掛上它在 H* 的強度標籤 —— 這條防火牆是語言哲學的一部分,不是行銷話術。',
        tag: '進入深水區 →' },
    ],
  },
  join: {
    eyebrow: '加入我們',
    title: '語言是極限,人是餘極限',
    coEq: '<span class="k">co:</span> #collective <span class="jn">|</span> #colimit',
    lead: '在 n/ 中,沒有單一視角能握住全部真理 —— 這是一條定理,不是口號。你一個人看不見的,眾人的視角交集會收斂出來。引導期的治理以 GitHub 為物理實體,由四人委員會維護。',
    seats: [
      { n: '×2', title: '邏輯守護者', body: '審核規格與文檔的語義一致性(nlang-spec)。' },
      { n: '×2', title: '幾何工程師', body: '負責 oo 引擎的實作與技術合規(nlang-tools)。' },
      { n: '✎', title: '創始人否決權', body: '違反不變性的提案可被否決,行使須附邏輯證明。' },
    ],
  },
};

const en: LandingContent = {
  meta: {
    title: 'n/ — A Semantic Operating System',
    description: 'A lattice-theoretic declarative language where data, type, and logic are one geometric object, seen from different angles.',
  },
  hero: {
    eyebrow: 'A Semantic Operating System · @co-nlang',
    headline: 'There is no execution, only observation. Truth is the point of convergence.',
    lead: 'A lattice-theoretic declarative language where data, type, and logic are one geometric object seen from different angles. You don’t write steps — you sculpt constraints; the shape their intersection leaves is the result.',
    cta1: 'Explore the language',
    cta2: 'Join us',
    codeCap: 'convergence is the one thing',
    code: `;; a type is a constraint, not an annotation
age: 25 & @int      ;; → 25

;; merging two views = intersection
{ age: 25 } & { age: @int }
;; → { age: 25 }

;; contradiction collapses to a caused empty set
{ age: 25 } & { age: 30 }
;; → _|_ (%cause: #conflict)`,
  },
  tablet: {
    verses: [
      'As above (Top&nbsp;<span class="car">_</span>), so below (Bottom&nbsp;<span class="car">_|_</span>);<br>as in the void of the whole, so in the truth of the atom.<br><span class="em">To work the one miracle — convergence.</span>',
      'All the universe is Combo — a field the wellspring of the possible, an atom the fruit of the existent.<br><span class="em">By meet, truth is purified; by join, all things unfold.</span>',
      'The Ouroboros devours its own tail: its father is definition, its mother convergence.<br><span class="em">Herein its power — if it can be observed, it is already real.</span>',
    ],
    attrib: '— Specification Preface',
  },
  why: {
    eyebrow: 'Why n/',
    title: 'Data, type, and logic — one and the same',
    lead: 'You usually write config in YAML, types in TypeScript, validation in Python. n/ maps all three through one structure (Combo) onto a lattice, then drives everything with a single operation — set intersection (<code style="color:var(--gold)">&</code>).',
    tri: [
      { role: 'Existence', name: 'Data', code: `;; existence
age: 25` },
      { role: 'Boundary', name: 'Type', code: `;; a constraint, not an annotation
25 & @int   ;; → 25
"hi" & @int
;; → _|_` },
      { role: 'Transformation', name: 'Logic', code: `;; morphism and pipe
/double: x -> x * 2
5 |> /double |> /inc
;; → 11` },
    ],
    convergeCode: `;; convergence: constraints overlap, one shape remains
{ x: 1 } & { y: 2 }        ;; → { x: 1, y: 2 }
(1 | 7) & 1..3            ;; → 1
1..10 & 5..20            ;; → 5..10`,
    note: '<b style="color:var(--indigo)">Conflict is not a crash.</b> When constraints can’t reconcile, the result collapses to <code class="bt">_|_</code> — an empty set carrying a <code class="op">%cause</code>. An error here isn’t an exception; it’s the empty set of logic.',
  },
  dims: {
    eyebrow: 'Four dimensions',
    title: 'One object, different angles',
    lead: 'n/ spans computation, mathematics, and physics. Pick an angle; choose your own depth.',
    items: [
      { idx: '01', href: '/language', title: 'The Language · Lattice',
        body: 'Combo and Cocoon, meet <code class="op">&</code> and join <code class="jn">|</code>, morphisms and pipes, Top <code class="op">_</code> and Bottom <code class="bt">_|_</code>. The full grammar and philosophy.',
        tag: 'Quick reference →' },
      { idx: '02', href: '/discovery', title: 'Discovery · LADD',
        body: 'Content-addressed CAID, smell search, semantic gravity. A decentralized discovery network that senses distance between fingerprints before download.',
        tag: 'Read the protocol →' },
      { idx: '03', href: '/tools', title: 'Tools · the oo engine',
        body: 'The reference engine <code class="op">oo</code> — a lazy, call-by-observation interpreter. <code>run</code> / <code>repl</code> / <code>fmt</code> / <code>lint</code>. Run your first n/ program here.',
        tag: 'Get started →' },
      { idx: '04', href: '/research', title: 'Research · the Ladder',
        body: 'The cohomological obstruction ladder: type conflict, Byzantine faults, and identity forgery as rungs of one geometric machine. A 22-paper series plus the Paper N whitepaper.',
        honest: 'Honest marking: parts of the ladder are correspondence-level insight, and key links (e.g. item 21) are <i>reductions</i>, not closed theorems. Every claim of “essence” carries its strength tag in H* — that firewall is part of the philosophy, not marketing.',
        tag: 'Into the deep end →' },
    ],
  },
  join: {
    eyebrow: 'Join us',
    title: 'The language is the limit; the people are the colimit',
    coEq: '<span class="k">co:</span> #collective <span class="jn">|</span> #colimit',
    lead: 'In n/ no single perspective holds the whole truth — that is a theorem, not a slogan. What you cannot see alone, merged views converge to. During bootstrap, governance runs on GitHub, maintained by a Council of Four.',
    seats: [
      { n: '×2', title: 'Logic Guardians', body: 'Guard semantic consistency of the spec and docs (nlang-spec).' },
      { n: '×2', title: 'Geometry Engineers', body: 'Own the oo engine’s implementation and compliance (nlang-tools).' },
      { n: '✎', title: 'Founder’s Veto', body: 'Proposals breaking invariants can be vetoed — with a logical proof attached.' },
    ],
  },
};

export const landing: Record<Lang, LandingContent> = { 'zh-TW': zh, en };
