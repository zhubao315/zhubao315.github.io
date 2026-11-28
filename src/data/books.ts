import type { ImageMetadata } from 'astro';
import knowledgeCover from '../assets/books/38036cf7bf29.png';
import investmentCover from '../assets/books/a2e2ed0dd1d8.png';
import aiLearningCover from '../assets/books/dd24f66b8e72.png';
import personalityCover from '../assets/books/df4c81f86b08.png';

/**
 * 四部自著书稿的公开载体与关联关系。
 *
 * 口径：书稿状态以作者公开信息为准；无出版社、ISBN 或发行时间，不写「已出版」。
 * 读者入口是 uRead 的在线阅读器，笔记入口是 uRead 的公开读书笔记。
 * 每条 thesis 均来自对应的公开笔记，不自行编造。
 */

/** 公开读书笔记中「金句摘录与深度解析」的一条：原文 — 语境 — 深度解析。 */
export interface BookQuote {
  text: string;
  context: string;
  analysis: string;
}

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
  cover: ImageMetadata;
  coverAlt: string;
  summary: string;
  thesis: string[];
  corePoints: string[];
  quotes: BookQuote[];
  noteAlias: string;
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
/** uRead 的 ASCII 稳定别名对应的真实静态页 slug（来自 uRead src/data/noteAliases.ts）。 */
const UREAD_NOTE_SLUGS: Record<string, string> = {
  'book-knowledge-base-engineering': 'B5-科技科普__《知识库工程学》-朱宝',
  'book-investment-discipline': 'B6-投资理财__《投资的纪律》-朱宝',
  'book-ai-era-learning': 'B3-认知成长__《AI时代，如何真正学会》-朱宝',
  'book-one-in-a-thousand': 'B3-认知成长__《千分之一的你》-朱宝',
};
/** 别名不等于静态路由：uRead 静态页按真实中文 slug 生成，需编码后访问。 */
export const noteUrl = (alias: string) =>
  `${UREAD}/read/${encodeURIComponent(UREAD_NOTE_SLUGS[alias] ?? alias)}/`;

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
    cover: knowledgeCover,
    coverAlt: '《知识库工程学》书封',
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
    corePoints: [
      "**收藏不是资产，架构与运营才是**：知识库是需要持续治理的认知基础设施。",
      "**OESA 闭环**：观测（O）→评估（E）→固化（S）→调用（A），闭环在治理层，不在六步执行链。",
      "**假红灯比没红灯更危险**：4,102→803 与 92→100 都是尺子问题，不是库的问题。",
      "**\"你用来确认安全的那套东西，和被确认的对象不是同一套\"**——全书总论据。",
      "**数字带时点与口径**：任何读数是快照；两种口径不能画进同一条趋势线。",
      "**失败不美化**：直接原因未定就写未定；事故的成本与限制必须留在病历里。",
      "**AI 边界由不可逆性决定**：物理删除不在 AI 权限集合里；AI 产出需人工签字。",
    ],
    quotes: [
      {
        text: "假红灯比没红灯更危险。",
        context: "审计工具报 4,102 篇孤岛，人工抽样真值为 803 篇——工具虚高 5.1 倍。",
        analysis: "没有红灯时你知道自己没测；假红灯会让你对错误读数采取\"治理行动\"，反而制造新破坏。它把\"度量本身的可信度\"提升为第一等问题——先修尺子，再量库。",
      },
      {
        text: "你用来确认安全的那套东西，和被确认的对象不是同一套。",
        context: "九条任务静默 4 天（exit 127）、两份管理文件只剩 142B/136B 元数据、4 篇日记在 28 分钟内被并发删除——事故都发生在\"检查一切正常\"之后。",
        analysis: "这句话揭示了自指盲区：审计工具与被审计对象若共享同一套假设、同一份缓存、同一个操作者，就形成\"共同失效\"。它把事故复盘从追责个人升级为检查系统耦合。",
      },
      {
        text: "壳擦干净了，肉没有长出来。",
        context: "作者发现大量笔记格式完整、链接齐全，但内容只是模板化填充。",
        analysis: "\"完整也可以是一种空\"。这句话区分了形式合规与实质价值，也解释了为什么\"按产物定级、不按主题定级\"是本书的定级原则——能被 called 的知识才算资产。",
      },
      {
        text: "本表是目标节奏，不是现状报告……读表前先确认它在你这儿跑得起来。",
        context: "体检 12 项 × L1/L2/L3 归属表列出理想的日查/周查节奏。",
        analysis: "作者主动给自己的表格加免责——理想节奏不是你已经在做的事。这句话把\"方法\"与\"现状\"分开，避免读者因对照表格产生虚假的落后感，是全书\"口径诚实\"在体例上的落实。",
      },
    ],
    facts: ['13 章工程架构', '5 个附录', '配套 Skill v1.2.0', '8 治理模块 / 25 回归测试'],
    readerId: '38036cf7bf29',
    noteSlug: 'B5-科技科普__《知识库工程学》-朱宝',
    noteAlias: 'book-knowledge-base-engineering',
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
    cover: investmentCover,
    coverAlt: '《投资的纪律》书封',
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
    corePoints: [
      "**市场不可预测，但\"亏得起\"可以被提前锁定**：把判断从\"猜价格\"转成\"准备条件\"。",
      "**第0票 + 三票制**：两类资产准入与一票否决优先于赞成票。",
      "**证据四级 + 自家回测停在第①级**：公开负结果；不允许用同一批数据改完规则再证明新规则有效。",
      "**清单是下单前的验收闸门**：红灯 0、黄灯 ≤2 才放行；硬止损单触发即执行。",
      "**止损好坏看组合净贡献，不看躲过了多少跌幅**：反事后归因。",
      "**AI 产出只进人工复核，不下单**：工具边界的硬约束。",
      "**能复算的写每一步，不能复算的写边界**——本书对\"诚实\"的操作性定义。",
    ],
    quotes: [
      {
        text: "替代本身可以讨论——但它必须署自己的名。",
        context: "作者发现自己的回测里 PEG 因数据源缺失被另一套口径替代，事后复盘却把替代口径的表现记在 PEG 账上。",
        analysis: "这是全书方法论诚实度的顶点。规则一旦被悄悄替换，所有后续评估都会失真——\"账算到错的规则头上\"。它把\"口径治理\"写成可执行的命名纪律：换口径必须改名，复盘才能归因正确。",
      },
      {
        text: "止损好坏看组合净贡献，不看躲过了多少跌幅。",
        context: "作者逐只统计\"止损避免的损失\"后主动降格——那些数字\"只能当故事听，不能当成绩单\"，并声明单窗口 2025-10 至 2026-10 恰逢下跌，止损天然全对。",
        analysis: "这是对幸存者偏差与事后归因的正面防御。单笔\"躲过 20% 跌幅\"的爽感不等于系统有效；只有组合层面的净贡献才是可检验的判据。它要求读者放弃最容易获得的那类成就感。",
      },
      {
        text: "它拦住的不是行情，是那一刻的我。",
        context: "2019 年深夜删单的故事——重组消息、实控人被立案、股价跌七成，清单拦下了原本要下的单。",
        analysis: "全书最有人味的开场。它说明清单的作用对象不是市场（清单不预测涨跌），而是决策者当时的情绪状态。这句话把\"纪律\"从抽象号召落到一个具体动作：拦住冲动。",
      },
      {
        text: "AI 产出只进人工复核，不下单。",
        context: "讲完三层架构、幻觉三招与八步回测后，作者给出铁律；并补充\"它拦不住你硬买\"。",
        analysis: "它划定了工具与责任的边界——AI 可以提供候选、检查、汇总，但签字权与执行权在人。这条规则防止读者把\"用了 AI\"误当成\"有了纪律\"。",
      },
      {
        text: "故障不可耻，不可复盘、不可拦截的故障才可耻。",
        context: "作者把 25 年工程经验与 2018 年 −45% 割肉并置。",
        analysis: "这是全书价值观的源代码。亏损本身不是道德失败，拒绝记录与拒绝建立拦截机制才是。它解释了为什么本书要公开未达标的回测与早期稿算错——那些\"不体面\"的证据正是纪律系统的一部分。",
      },
    ],
    facts: ['8 种任务模式', '45 项结构校验', '63 项单元测试', '配套 Skill 已开源'],
    readerId: 'a2e2ed0dd1d8',
    noteSlug: 'B6-投资理财__《投资的纪律》-朱宝',
    noteAlias: 'book-investment-discipline',
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
    cover: aiLearningCover,
    coverAlt: '《AI时代，如何真正学会》书封',
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
    corePoints: [
      "**答案唾手可得，学会变得更贵。** AI 让「看过」更便宜，但「学会」没有因此变便宜。",
      "**真正学会是可判定的**：在减少材料与提示的条件下，仍能独立解释、提取、应用和迁移，并通过结果与反馈发现并修正错误。",
      "**六种能力判据**：合上书能讲、换场景能用、做完能验、错了能改、关掉 AI 能复现、能承担判断后果。",
      "**六环是诊断工具，不是流水线**：任何一环可单独断掉；反馈列序第六、功能回流前五环；断在哪一环就在哪一环补。",
      "**AI 让每一环都可以被绕过**：材料无限、笔记代写、答案即达、原题会解、整段外包、迎合回声——六个短路点。",
      "**答案先到，学习就退场**：先答后问保护的不是形式，是你还能拥有一版「未经污染的错答案」。",
      "**同一个模型，换个位置就换一种结果**：答案机替你完成（动作是「看」），提问机逼你生成（动作是「想」和「改」）。",
      "**外包动作可以，外包判断不行**：判断包含你的目标、代价、责任——AI 给的是概率最高的路，不是你能承担的路。",
      "**收藏是存货，调用才是资产**：资产看调用率，不看收藏量；填不满场景和边界的笔记，还是别人的话。",
      "**计划不是排满时间，是安排证据**：90 天重建的是节奏，不是知识；砍任务，不砍闭卷。",
    ],
    quotes: [
      {
        text: "熟悉感只能证明你见过它，不能证明你拿得走它。",
        context: "第 1 章「三种学过」与流畅性错觉一节。",
        analysis: "这句话切的是学习中最普遍的误判——把再认（见到能认出）当掌握。作者随后给出反制动作：合书三分钟复述并录音。含义不是「熟悉感没用」，而是熟悉感不能作为验收证据；它提示你该做一次提取测试了。",
      },
      {
        text: "AI 能替你答，不能替你错。",
        context: "第 1 章金句，承接「五个无提示问题」AI 用法卡。",
        analysis: "这是对「AI 辅助学习」最精炼的边界表达。AI 能给出正确答案，但「发现自己在哪一步出错、并承受那个错误带来的修正」这件事无法外包——恰恰是「错」提供了误差信号，而误差信号是学习发生的必要条件。",
      },
      {
        text: "越顺的存入，越难的提取。",
        context: "第 3 章「两页漂亮笔记，换不来一句解释」。",
        analysis: "来自 Bjork 合意困难的方向性结论。作者用它解释为什么划线、摘抄、高亮最容易被误当成学习：它们是最顺的存入方式，因此也最容易制造掌握幻觉。注意作者刻意不推到「越难越好」，并明确拒绝「存储与提取负相关」的口号——这是这句话容易被过度解读的地方。",
      },
      {
        text: "合上书的那五分钟，才是学习。",
        context: "第 4 章「提取」闸门卡。",
        analysis: "把「复习」重新定义为闭卷动作。翻书、重读、看 AI 总结都属于输入；只有合上资料后那五分钟的空白与挣扎，才在建立检索路径。作者还给了具体入口：先写关键词、再连三句、做五道无提示题、标缺口类型。",
      },
      {
        text: "没有误差信号的练习，只是重复。",
        context: "第 6 章「反馈」核心命题。",
        analysis: "误差信号被定义为「当前表现与标准之间的差」，需满足四条件：有标准、有测量、有对比、有修正。这句话的锋利处在于它否定了「练得多就会好」——没有反馈的重复只会把错误练熟。配套动作是把所有反馈压成一条修正项，当天用同一任务的最小单元重练。",
      },
      {
        text: "AI 给的是概率最高的路，不是你能承担的路。",
        context: "第 7 章「认知外包」，紧接判断不能外包的论证。",
        analysis: "这是对 AI 建议最清醒的定位。AI 基于公开数据和常见模式给出「最可能正确」的建议，但它不知道你的资源约束、时间窗口与风险承受力。书中的创业团队案例里，AI 建议「快速试错、多品类并行」，而团队实际只有三个技术人、八个月现金——概率最高的路对他们恰恰不可承担。",
      },
      {
        text: "作品不是知识的展示，是知识的压力测试。",
        context: "第 8 章「案例与误区」。",
        analysis: "点明项目式学习的真正功能。作品的价值不在漂亮，而在它逼你在真实材料上卡住、为一个取舍负责、接受真人追问。「卡住的地方」才是暴露六环断点的诊断信号，这与全书「以证据为单位」的立场一致。",
      },
      {
        text: "收藏是存货，调用才是资产。",
        context: "第 9 章「知识资产」。",
        analysis: "把知识管理从「囤积范式」切换到「调用范式」。作者给出可判定的分界——六栏调用卡填得满才算资产，并定义了「近 30 天调用率」。这句话提醒读者：整理库、打标签、做聚类都是零成本动作，只有真实调用才产生价值。",
      },
      {
        text: "先读标准，再谈努力。",
        context: "第 10 章「考试与职场」。",
        analysis: "把「努力没有回报」的问题改造成「努力没落在评分点上」。作者给出三个动作：圈动词、找反例、三份同类标准取交集。这句话的适用范围超出考试——任何有外部评价体系的场景都成立。",
      },
      {
        text: "计划不是排满时间，是安排证据。",
        context: "第 12 章「回到那个第九天断掉的计划」。",
        analysis: "全书的收束句之一。开场案例里那位运营的 90 天表格有 90 行、每天三小时，第九天就空了；改成「三阶段 + 每周转一圈 + 每周交一页证据」后才跑完十三周。含义是：计划的生命力来自可完成的最小证据动作，不是来自强度。",
      },
    ],
    facts: ['六环诊断框架', '六种能力判据', '90 天证据节奏'],
    readerId: 'dd24f66b8e72',
    noteSlug: 'B3-认知成长__《AI时代，如何真正学会》-朱宝',
    noteAlias: 'book-ai-era-learning',
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
    cover: personalityCover,
    coverAlt: '《千分之一的你》书封',
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
    corePoints: [
      "**人格不是一纸标签，而是偏好与倾向的组合**；四个字母回答偏好排序，不回答你在什么姿态下被驱动。",
      "**64 型是 16×2×2 的观察位置，不是 64 种新人格**，也不是经心理测量验证的分类体系。",
      "**一个人有四种调节状态**（-C-O 审慎探索 / -A-O 坚定探索 / -A-H 坚定守成 / -C-H 审慎守成），可互转、非年龄阶段、非发展定律。",
      "**稀有度是模型内序次**：6.4‰ 算出来而非数出来，不代表人口占比，更不代表价值高低。",
      "**对标式行为练习**：向最相近 3 型借微调、向最互补 3 型借盲区动作，效果由读者自己的记录判断。",
      "**证据三层标注**：【研究】有可核验文献、【模型】是作者框架、【练习】是行为假设；比喻不得伪装成证据。",
    ],
    quotes: [
      {
        text: "一个比喻不该伪装成一份证据。",
        context: "开卷不久，作者先讲\"四个字母装不下完整的你\"，随即给出这条自我约束。",
        analysis: "它不是修辞口号，而是全书的\"认识论宪法\"。后文所有脑科学词汇、调音台/旋钮比喻都被这条规则管住——比喻可以帮助理解，但不能用来支撑\"人格由某脑区决定\"这类断言。它决定了这本书与市面 MBTI 通俗读物的分野。",
      },
      {
        text: "6.4 是算出来的，不是数出来的。",
        context: "讲稀有度时，作者用六个先验参数相乘得到 6.4‰，并强调这些先验是假设、独立性也是假设。",
        analysis: "一句话把\"稀有\"从神秘感拉回模型内部。它同时保护读者免于两种误读——把模型序次当人口统计，以及把稀有当优越。\"少见不等于更好，常见不等于更平庸\"是它的伦理面。",
      },
      {
        text: "很多『A 型同事』和『C 型同事』其实是同一个人站在不同的撤销条件里。",
        context: "在 A/C（决策姿态）五条观察点表之后，作者用\"撤销键\"解释同一个人为何在不同场景呈现不同后缀。",
        analysis: "这是全书最有原创观察力的一句，且完全用行为语言写成。它把\"人格差异\"改写为\"处境差异\"，直接支撑副标题里的\"差异理解\"——读者不再问\"他是什么人\"，而问\"他此刻有没有撤销键\"。",
      },
      {
        text: "多了几个选择，而不是螺旋上升的定律。",
        context: "讲四态循环时，作者刻意否定\"成长阶段论\"。",
        analysis: "这句话守住了四态框架的边界。它让读者可以\"从任意一格开始、在某一格停留很久\"，而不是把 -C-H 当成落后、-A-O 当成进步。对成长读物而言，这种反等级化的克制是少见的。",
      },
      {
        text: "把比喻伪装成证据，短期能换来可信感，长期一定会透支整本书。",
        context: "作者回顾删掉带百分比的假确定感、把脑科学从\"证据\"降为\"通俗类比\"的修订过程。",
        analysis: "与序言那句成对，是作者对自身写作的审判标准。\"透支\"一词把学术诚信写成长期账——短期靠比喻获得的权威感，最终要用整本书的可信度偿还。这两句必须成对保留，拆开就失去力度。",
      },
    ],
    facts: ['16×2×2 = 64 观察位', '四种调节状态', '证据三层标注'],
    readerId: 'df4c81f86b08',
    noteSlug: 'B3-认知成长__《千分之一的你》-朱宝',
    noteAlias: 'book-one-in-a-thousand',
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
  noteUrl: noteUrl(book.noteAlias),
}));
