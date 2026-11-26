/**
 * 四部自著书稿的公开载体与关联关系。
 *
 * 口径：书稿状态以作者公开信息为准；无出版社、ISBN 或发行时间，不写「已出版」。
 * 读者入口是 uRead 的在线阅读器，笔记入口是 uRead 的公开读书笔记。
 * 每条 thesis 均来自对应的公开笔记，不自行编造。
 */

export type BookDirection = 'THINK' | 'CREATE';

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  direction: BookDirection;
  directionIndex: string;
  directionLabel: string;
  status: string;
  coverClass: string;
  summary: string;
  thesis: string[];
  facts: string[];
  readerId: string;
  noteSlug: string;
  noteTitle: string;
  companion?: { label: string; href: string };
  relatedProjects: string[];
  relatedArticles: string[];
  boundaries: string[];
  lastVerified: string;
}

const UREAD = 'https://zhubao315.github.io/uRead';
export const readerUrl = (id: string) => `${UREAD}/books/reader.html?id=${id}`;
export const noteUrl = (slug: string) => `${UREAD}/read/${encodeURIComponent(slug)}`;

export const books: Book[] = [
  {
    id: 'knowledge-base-engineering-book',
    slug: 'knowledge-base-engineering',
    title: '知识库工程学',
    subtitle: '从收藏到可治理的知识系统',
    direction: 'THINK',
    directionIndex: '02',
    directionLabel: '工程知识 · 知识工程',
    status: '自著书稿 · 在线阅读',
    coverClass: 'book--navy',
    summary:
      '把个人知识管理写成一门工程学：以 OESA 闭环、真实事故病历与可复现脚本为支撑，处理规模增长后的治理、权限与 AI 边界问题。',
    thesis: [
      '收藏不是资产，架构与运营才是；知识库是需要持续治理的认知基础设施。',
      'OESA 闭环在治理层（观测→评估→固化→调用），不在六步执行链。',
      '假红灯比没红灯更危险——4,102→803 是尺子问题，不是库的问题。',
      '「你用来确认安全的那套东西，和被确认的对象不是同一套」——全书总论据。',
      '数字带时点与口径；不同口径不能画进同一条趋势线。',
      '失败不美化：直接原因未定就写未定，事故成本留在病历里。',
      'AI 边界由不可逆性决定：物理删除不在 AI 权限集合里。',
    ],
    facts: ['13 章工程架构', '5 个附录', '配套 Skill v1.2.0', '8 治理模块 / 25 回归测试'],
    readerId: '38036cf7bf29',
    noteSlug: 'B5-科技科普__《知识库工程学》-朱宝',
    noteTitle: '《知识库工程学》深度阅读分析',
    companion: {
      label: '配套 Skill 仓库',
      href: 'https://github.com/zhubao315/knowledge-base-engineering-skill',
    },
    relatedProjects: ['knowledge-base-engineering', 'e-life-method', 'uread'],
    relatedArticles: [
      'why-knowledge-bases-get-harder',
      'obsidian-governance-workflow',
      'three-lines-of-life-os',
    ],
    boundaries: [
      '不构成出版信息：没有可核实的出版社、ISBN 或发行时间。',
      '配套测试验证的是流程与权限，不是万篇笔记的生产性能基准。',
    ],
    lastVerified: '2026-11-26',
  },
  {
    id: 'investment-discipline-book',
    slug: 'investment-discipline',
    title: '投资的纪律',
    subtitle: '从情绪交易到纪律复利',
    direction: 'THINK',
    directionIndex: '02',
    directionLabel: '工程知识 · 投资研究',
    status: '自著书稿 · 在线阅读',
    coverClass: 'book--gold',
    summary:
      '把研究、数据校验、风险边界与复盘写成可执行的清单；目标不是预测价格，而是提前锁定「亏得起」的条件。',
    thesis: [
      '市场不可预测，但「亏得起」可以被提前锁定：把判断从猜价格转成准备条件。',
      '第 0 票 + 三票制：两类资产准入与一票否决优先于赞成票。',
      '证据四级；自家回测停在第 ① 级并公开负结果，不用同一批数据改完规则再自证。',
      '清单是下单前的验收闸门：红灯 0、黄灯 ≤2 才放行；硬止损单触发即执行。',
      '止损好坏看组合净贡献，不看躲过了多少跌幅。',
      'AI 产出只进人工复核，不下单。',
      '能复算的写每一步，不能复算的写边界。',
    ],
    facts: ['8 种任务模式', '45 项结构校验', '63 项单元测试', '配套 Skill 已开源'],
    readerId: 'a2e2ed0dd1d8',
    noteSlug: 'B6-投资理财__《投资的纪律》-朱宝',
    noteTitle: '《投资的纪律》读书笔记',
    companion: {
      label: '配套 Skill 仓库',
      href: 'https://github.com/zhubao315/investment-discipline',
    },
    relatedProjects: ['investment-discipline', 'dual-asset-strategy', 'uvision'],
    relatedArticles: ['compounding-across-domains', 'three-lines-of-life-os'],
    boundaries: [
      '不构成出版信息：没有可核实的出版社、ISBN 或发行时间。',
      '不预测、不荐股、不承诺收益；回测为个人研究记录，不代表未来结果。',
    ],
    lastVerified: '2026-11-26',
  },
  {
    id: 'ai-era-learning-book',
    slug: 'ai-era-learning',
    title: 'AI时代，如何真正学会',
    subtitle: '在答案唾手可得的时代，重建学习闭环',
    direction: 'THINK',
    directionIndex: '02',
    directionLabel: '工程知识 · 学习方法',
    status: '自著书稿 · 在线阅读',
    coverClass: 'book--teal',
    summary:
      'AI 让「看过」更便宜，却没有让「学会」更便宜。本书把学会变成可判定的能力标准，并给出六个会被绕过的短路点。',
    thesis: [
      '答案唾手可得，学会变得更贵。',
      '真正学会是可判定的：减材料、去提示后仍能解释、应用、迁移，并发现并修正错误。',
      '六种能力判据：合上书能讲、换场景能用、做完能验、错了能改、关掉 AI 能复现、能承担判断后果。',
      '六环是诊断工具，不是流水线；断在哪一环就在哪一环补。',
      'AI 让每一环都可以被绕过：材料无限、笔记代写、答案即达、原题会解、整段外包、迎合回声。',
      '答案先到，学习就退场——先答后问保护的是你还拥有一版「未经污染的错答案」。',
      '外包动作可以，外包判断不行：判断包含你的目标、代价与责任。',
      '收藏是存货，调用才是资产；计划不是排满时间，是安排证据。',
    ],
    facts: ['六环诊断框架', '六种能力判据', '90 天证据节奏'],
    readerId: 'dd24f66b8e72',
    noteSlug: 'B3-认知成长__《AI时代，如何真正学会》-朱宝',
    noteTitle: '《AI时代，如何真正学会》-朱宝',
    companion: {
      label: '方法论站点 e-Life',
      href: 'https://github.com/zhubao315/e-life-method',
    },
    relatedProjects: ['uread', 'e-life-method', 'uskill'],
    relatedArticles: ['all-disciplines-lead-to-psychology', 'compounding-across-domains'],
    boundaries: [
      '不构成出版信息：没有可核实的出版社、ISBN 或发行时间。',
      '方法来自个人实践与阅读研究，不构成教育或心理诊断建议。',
    ],
    lastVerified: '2026-11-26',
  },
  {
    id: 'one-in-a-thousand-book',
    slug: 'one-in-a-thousand',
    title: '千分之一的你',
    subtitle: '从 16 型到 64 型的人格探索',
    direction: 'CREATE',
    directionIndex: '04',
    directionLabel: '创造作品 · 人格探索',
    status: '自著书稿 · 在线阅读',
    coverClass: 'book--violet',
    summary:
      '把 MBTI 的四种调节状态展开为 64 个观察位置，用稀有度、对标练习与证据分层，把人格测评做成可以继续探索的作品。',
    thesis: [
      '人格不是一纸标签，而是偏好与倾向的组合；四个字母回答偏好排序，不回答你在什么姿态下被驱动。',
      '64 型是 16×2×2 的观察位置，不是 64 种新人格，也不是经心理测量验证的分类体系。',
      '一个人有四种调节状态，可互转，不是年龄阶段，也不是发展定律。',
      '稀有度是模型内序次：6.4‰ 算出来而非数出来，不代表人口占比，更不代表价值高低。',
      '对标式行为练习：向最相近 3 型借微调、向最互补 3 型借盲区动作。',
      '证据三层标注：【研究】可核验文献、【模型】作者框架、【练习】行为假设。',
    ],
    facts: ['16×2×2 = 64 观察位', '四种调节状态', '证据三层标注'],
    readerId: 'df4c81f86b08',
    noteSlug: 'B3-认知成长__《千分之一的你》-朱宝',
    noteTitle: '《千分之一的你：从16型到64型》读书笔记',
    companion: {
      label: '关联测评站 MBTI64',
      href: 'https://zhubao315.github.io/mbti64/',
    },
    relatedProjects: ['mbti64', 'memoir'],
    relatedArticles: ['all-disciplines-lead-to-psychology', 'three-lines-of-life-os'],
    boundaries: [
      '不构成出版信息：没有可核实的出版社、ISBN 或发行时间。',
      '只用于娱乐与自我探索，不构成心理测量、心理咨询或临床诊断。',
    ],
    lastVerified: '2026-11-26',
  },
];

export const getBook = (slug: string) => books.find((book) => book.slug === slug);

/** 项目页 → 书稿落地页。 */
export const bookByProject: Record<string, string> = {
  'knowledge-base-engineering': 'knowledge-base-engineering',
  'e-life-method': 'ai-era-learning',
  uread: 'ai-era-learning',
  'investment-discipline': 'investment-discipline',
  'dual-asset-strategy': 'investment-discipline',
  uvision: 'investment-discipline',
  mbti64: 'one-in-a-thousand',
  memoir: 'one-in-a-thousand',
};

/** 文章 → 书稿落地页。 */
export const bookByArticle: Record<string, string[]> = {
  'why-knowledge-bases-get-harder': ['knowledge-base-engineering'],
  'obsidian-governance-workflow': ['knowledge-base-engineering'],
  'skill-evaluation-gates': ['knowledge-base-engineering'],
  'all-disciplines-lead-to-psychology': ['one-in-a-thousand', 'ai-era-learning'],
  'three-lines-of-life-os': ['investment-discipline', 'knowledge-base-engineering'],
  'compounding-across-domains': ['investment-discipline', 'ai-era-learning'],
};

/** publications 卡片 → 书稿落地页。 */
export const bookByPublication: Record<string, string> = {
  'knowledge-base-engineering-book': 'knowledge-base-engineering',
  'investment-discipline-book': 'investment-discipline',
  'ai-era-learning-book': 'ai-era-learning',
  'one-in-a-thousand-book': 'one-in-a-thousand',
};

export const readerLinks = books.map((book) => ({
  title: book.title,
  href: readerUrl(book.readerId),
  noteUrl: noteUrl(book.noteSlug),
}));
