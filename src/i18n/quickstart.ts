import type { Lang } from './ui';

export interface QuickStartContent {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  back: string;
  requirements: string;
  build: { n: string; title: string; body: string; cap: string; commands: string };
  compose: {
    n: string;
    title: string;
    body: string;
    sourceLabel: string;
    runCap: string;
    resultCap: string;
  };
  read: {
    n: string;
    title: string;
    body: string;
    items: Array<{ command: string; title: string; body: string }>;
  };
  next: { title: string; body: string; spec: string; engine: string };
}

const zh: QuickStartContent = {
  meta: {
    title: '五分鐘跑起 n/ — oo Quick Start',
    description: '從 v0.26.1 建置 oo，合併兩個真實 n/ 檔案，再理解 eval、run 與 evolve 的邊界。',
  },
  eyebrow: 'oo · 五分鐘 Quick Start',
  title: '把首頁那個合併，親手跑一次',
  lead: '不需要先讀完整規格。準備 Git 與 Rust stable，從引擎的 v0.26.1 release 建置一個 oo，然後讓兩個各自只知道一半的程式收斂。',
  back: '← 回到首頁',
  requirements: '需要：Git、Rust stable toolchain，以及一個終端機。',
  build: {
    n: '01',
    title: '建置參考引擎',
    body: '固定 checkout 官網驗證所用的 bare release；不要讓教學默默追著開發分支移動。',
    cap: 'terminal · build oo v0.26.1',
    commands: `git clone https://github.com/co-nlang/nlang-tools.git
cd nlang-tools
git checkout v0.26.1
cargo build --release -p oo --bin oo
./target/release/oo --version`,
  },
  compose: {
    n: '02',
    title: '寫下兩份各自成立的程式',
    body: '把下面兩個檔案放在同一個目錄。它們都定義 server，但各自只增加一條相容的約束。',
    sourceLabel: '建立檔案',
    runCap: 'terminal · observe server',
    resultCap: '結果',
  },
  read: {
    n: '03',
    title: '知道三個入口的邊界',
    body: '同一台引擎有三種常用入口；差別不在語法，而在這次觀測是否要碰本地宇宙與歷史。',
    items: [
      { command: 'oo eval', title: '問一個運算式', body: '最短的即時計算入口，適合驗證一條格運算。' },
      { command: 'oo run', title: '一次性的純宇宙', body: '同時讀入一個或多個檔案，觀測後結束；不寫本地 store。' },
      { command: 'oo evolve', title: '把約束放進工作宇宙', body: '將檔案加入 staged 狀態；確認後再由 commit 固化進歷史。' },
    ],
  },
  next: {
    title: '下一步不用照順序',
    body: '想知道每個符號的承諾，讀規格；想看 CLI、測試與每一弧的故事，留在引擎倉。',
    spec: '讀規格書 →',
    engine: '看引擎原始碼 →',
  },
};

const en: QuickStartContent = {
  meta: {
    title: 'Run n/ in five minutes — oo Quick Start',
    description: 'Build oo v0.26.1, compose two real n/ files, and learn the boundary between eval, run, and evolve.',
  },
  eyebrow: 'oo · Five-minute Quick Start',
  title: 'Run the merge from the landing page yourself',
  lead: 'You do not need the whole specification first. Bring Git, a stable Rust toolchain, and a terminal; build oo from the v0.26.1 release, then converge two programs that each know only half.',
  back: '← Back to the landing page',
  requirements: 'Requires Git, a stable Rust toolchain, and a terminal.',
  build: {
    n: '01',
    title: 'Build the reference engine',
    body: 'Check out the same bare release the website verifies against. A tutorial should not drift silently with a development branch.',
    cap: 'terminal · build oo v0.26.1',
    commands: `git clone https://github.com/co-nlang/nlang-tools.git
cd nlang-tools
git checkout v0.26.1
cargo build --release -p oo --bin oo
./target/release/oo --version`,
  },
  compose: {
    n: '02',
    title: 'Write two independently valid programs',
    body: 'Put these files in the same directory. Both define server, and each contributes one compatible constraint.',
    sourceLabel: 'Create file',
    runCap: 'terminal · observe server',
    resultCap: 'Result',
  },
  read: {
    n: '03',
    title: 'Know the boundary between three entry points',
    body: 'The same engine has three common entry points. The difference is not syntax; it is whether this observation touches a local universe and its history.',
    items: [
      { command: 'oo eval', title: 'Ask one expression', body: 'The shortest immediate entry point, useful for checking one lattice operation.' },
      { command: 'oo run', title: 'Use a pure one-shot universe', body: 'Load one or more files together, observe, and exit without writing the local store.' },
      { command: 'oo evolve', title: 'Add constraints to a working universe', body: 'Place files in staged state, then use commit when you intend to solidify them into history.' },
    ],
  },
  next: {
    title: 'The next step is not sequential',
    body: 'Read the specification for the promises behind each symbol. Stay in the engine repository for the CLI, tests, and the story of every development arc.',
    spec: 'Read the specification →',
    engine: 'Browse the engine →',
  },
};

export const quickStart: Record<Lang, QuickStartContent> = { 'zh-TW': zh, en };
