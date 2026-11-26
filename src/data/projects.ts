import type { ImageMetadata } from 'astro';
import mbti64Cover from '../assets/projects/mbti64.webp';
import perfectmeCover from '../assets/projects/perfectme.webp';
import healthCover from '../assets/projects/health.webp';
import runningCover from '../assets/projects/running.webp';
import cyclingCover from '../assets/projects/cycling.webp';

export const categoryMeta = {
  product: { label: 'Product', labelZh: '数字产品', accent: 'coral' },
  agent: { label: 'AI & Agent', labelZh: '智能系统', accent: 'sky' },
  knowledge: { label: 'Knowledge', labelZh: '知识工程', accent: 'gold' },
  investment: { label: 'Investment', labelZh: '投资研究', accent: 'gold' },
  quantified: { label: 'Quantified Life', labelZh: '量化生活', accent: 'cyan' },
  creative: { label: 'Creative', labelZh: '创意作品', accent: 'coral' },
  infrastructure: { label: 'Infrastructure', labelZh: '基础设施', accent: 'slate' },
  research: { label: 'Research', labelZh: '上游研究', accent: 'slate' },
} as const;

export type Category = keyof typeof categoryMeta;
export type ProjectStatus = 'active' | 'prototype' | 'experiment' | 'archived';
export type SourceType = 'original' | 'modified' | 'research';

export const statusMeta: Record<ProjectStatus, { label: string; labelZh: string }> = {
  active: { label: 'Active', labelZh: '持续建设' },
  prototype: { label: 'Prototype', labelZh: '原型阶段' },
  experiment: { label: 'Experiment', labelZh: '实验探索' },
  archived: { label: 'Archived', labelZh: '历史归档' },
};

export const sourceMeta: Record<SourceType, { label: string; labelZh: string }> = {
  original: { label: 'Original', labelZh: '原创项目' },
  modified: { label: 'Modified', labelZh: '二次开发' },
  research: { label: 'Upstream research', labelZh: '上游研究' },
};

export interface ProjectMetric {
  value: string;
  label: string;
  note?: string;
}

export interface ApproachStep {
  index: string;
  title: string;
  body: string;
}

export interface ProjectCaseStudy {
  context: string[];
  approach: ApproachStep[];
  evidence: string[];
  boundaries?: string[];
}

export interface ProjectDecision {
  /** 决策主题，例如「为什么用 IndexedDB」。 */
  title: string;
  /** 最终采用的方案。 */
  decision: string;
  /** 为什么这样选、取舍是什么；必须可追溯到仓库文档或实测。 */
  reason: string;
}

export interface ProjectFAQ {
  question: string;
  answer: string;
}

export interface ProjectEvidenceLink {
  label: string;
  href: string;
}

export type ProjectSchemaType = 'SoftwareApplication' | 'WebApplication' | 'CreativeWork';

export interface Project {
  id: string;
  slug: string;
  name: string;
  nameZh: string;
  category: Category;
  status: ProjectStatus;
  sourceType: SourceType;
  featured: boolean;
  tagline: string;
  summary: string;
  description?: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
  demoLabel?: string;
  extraLinks?: { label: string; href: string }[];
  cover?: ImageMetadata;
  coverAlt?: string;
  metrics?: ProjectMetric[];
  caseStudy?: ProjectCaseStudy;
  sourceNote?: string;
  /** 一句话直接答案；用于首屏与结构化数据，必须能从 README 或页面核验。 */
  definition?: string;
  /** 真正需要这个项目的用户；不写虚构用户画像。 */
  audience?: string[];
  /** 版本口径；无已核验 Release 时不写具体版本号。 */
  versionNote?: string;
  /** 关键技术决策：解决什么取舍，为什么这样选。 */
  decisions?: ProjectDecision[];
  /** 可点击的一手证据，优先 README / Release / 演示站。 */
  evidenceLinks?: ProjectEvidenceLink[];
  /** 用户真正会搜索的问题；答案必须来自已有事实。 */
  faqs?: ProjectFAQ[];
  /** 只在真实符合定义时使用，默认 CreativeWork。 */
  schemaType?: ProjectSchemaType;
  lastVerified: string;
}

export const projects: Project[] = [
  {
    id: 'mbti64',
    slug: 'mbti64',
    name: 'MBTI64',
    nameZh: '64 型人格稀有度测评',
    category: 'product',
    status: 'active',
    sourceType: 'original',
    featured: true,
    tagline: '把人格测评做成一套完整的探索体验。',
    summary: '120 道中文情景题 → 六维计分 → 64 型人格与 7 档稀有度。',
    description:
      '一个纯静态的中文人格测评站。答案只在浏览器本地计算；结果页包含六维雷达、稀有度、相似与互补型别，以及三尺寸分享海报。',
    tech: ['Next.js 14', 'TypeScript', 'React', 'Static Export'],
    githubUrl: 'https://github.com/zhubao315/mbti64',
    demoUrl: 'https://zhubao315.github.io/mbti64/',
    demoLabel: '在线测评',
    cover: mbti64Cover,
    coverAlt: 'MBTI64 中文人格测评站首页，展示 64 型人格插画与产品界面',
    metrics: [
      { value: '120', label: '道情景题', note: '另设 60 题精简模式' },
      { value: '64', label: '型人格', note: '16 基础型 × 4 状态' },
      { value: '254', label: '项测试', note: '仓库公开测试数' },
    ],
    caseStudy: {
      context: [
        '市面上的 16 型人格测评通常停在四个字母和一段宽泛描述。MBTI64 尝试往前一步：把基础型、决策姿态和变化策略组合成 64 型，再通过六维计分、稀有度和匹配关系，让结果更像一个可以继续探索的入口。',
        '整个产品是静态导出的：不注册、不上传答案，进度保存在浏览器里。这是产品选择，也是隐私边界。',
      ],
      approach: [
        {
          index: '01',
          title: '用产品结构承载内容深度',
          body: '不是把一份长报告塞进结果页，而是拆成测评、64 个型别页、稀有度榜单、双人合盘和三尺寸海报。每一种入口都服务不同的分享与探索场景。',
        },
        {
          index: '02',
          title: '把计分与稀有度写成可测试的规则',
          body: '六维计分、反向题、后缀摇摆型、共享稀有度档位与相似度归一化都有独立规则和测试，避免“看起来合理”的拍脑袋文案。',
        },
        {
          index: '03',
          title: '静态站也能有完整体验',
          body: '64 个型别静态页与对应的 OG 图在构建时生成，分享到社交平台时能给出稳定的预览，不依赖服务端。',
        },
      ],
      evidence: [
        '120 道完整题库，60 题精简模式，五级量表、二选一与四选一图片题混排。',
        '64 型 × 7 档稀有度；稀有度概率、并列档位与统计融合规则均有公开实现。',
        '分享海报支持 4:5、1:1、1.9:1 三种尺寸。',
        '仓库内公开 254 项测试，另包含类型检查、构建校验与 E2E 冒烟流程。',
      ],
      boundaries: [
        '结果只用于娱乐与自我探索，不构成心理咨询、诊断或医疗建议。',
        '付费完整报告是转化链路的 Demo，不接支付、不扣费。',
      ],
    },
    definition: 'MBTI64 是一个纯静态的中文人格探索产品：120 道情景题经六维计分，映射到 64 型人格与 7 档稀有度，答案只在浏览器本地计算。',
    audience: ['想深入了解人格类型的普通用户', '喜欢分享测评结果与型别卡片的用户'],
    versionNote: '静态导出的前端应用；版本与题目变更以仓库 Release 为准。',
    evidenceLinks: [
      { label: 'README 与题库说明', href: 'https://github.com/zhubao315/mbti64#readme' },
      { label: '在线测评', href: 'https://zhubao315.github.io/mbti64/' },
    ],
    faqs: [
      {
        question: 'MBTI64 是心理诊断或临床测评工具吗？',
        answer: '不是。结果只用于娱乐与自我探索，不构成心理咨询、诊断或医疗建议；页面明确标注这一边界。',
      },
      {
        question: '测评答案会上传到服务器吗？',
        answer: '不会。站点是静态导出的，答案只在浏览器本地计算，进度保存在浏览器里，不注册、不上传。',
      },
      {
        question: '64 型人格和 7 档稀有度是怎么来的？',
        answer: '基础型与决策姿态、变化策略组合成 64 型；稀有度概率、并列档位与相似度归一化都有独立规则和测试，源码可在仓库查看。',
      },
    ],
    schemaType: 'WebApplication',
    lastVerified: '2026-11-11',
  },
  {
    id: 'uskill',
    slug: 'uskill',
    name: 'uSkill',
    nameZh: 'Agent 标准化技能底座',
    category: 'agent',
    status: 'active',
    sourceType: 'original',
    featured: true,
    tagline: '让 Agent Skills 从提示词变成可治理的能力资产。',
    summary: 'SOP → 标准化 Skill → 可调用执行器，一条可复用的能力工程链路。',
    description:
      '面向 Agent 的技能基础设施：把零散 SOP 转换为结构化 Skills，提供 Schema、CLI、Python 接口、原生执行器与版本化治理。',
    tech: ['Python 3.11+', 'YAML / JSON Schema', 'CLI', 'OpenAI-compatible APIs'],
    githubUrl: 'https://github.com/zhubao315/uSkill',
    demoUrl: 'https://zhubao315.github.io/uSkill/',
    demoLabel: '阅读文档',
    metrics: [
      { value: '4', label: '项能力属性', note: '可驾驭 / 复用 / 调用 / 迭代' },
      { value: 'v2.0.0', label: '当前版本', note: 'tag v2.0.0（2026-11-13）；Release 页 2026-11-26 已补齐' },
      { value: '301', label: '项测试', note: '2026-11-26 本地实测全部通过' },
    ],
    caseStudy: {
      context: [
        '大多数 Prompt 的价值被困在某一次对话里：写法依赖上下文，结果不可验证，也无法知道它在不同模型上是否仍然成立。uSkill 想解决的不是“再写一个更好的 Prompt”，而是把方法沉淀成有结构、有版本、有执行入口的 Skill。',
      ],
      approach: [
        {
          index: '01',
          title: '先定义能力，再绑定模型',
          body: '用统一 Schema 描述输入、步骤、约束与输出，让技能本身独立于某一家模型。模型是可替换的执行引擎，不是能力本身。',
        },
        {
          index: '02',
          title: '转换、调用、迭代形成闭环',
          body: 'AI 转换引擎把历史 SOP 拆解成结构化 Skill；CLI 与 Python 接口负责调用；执行数据和 Git 历史再反馈到下一轮迭代。',
        },
        {
          index: '03',
          title: '把治理放进能力底座',
          body: '技能分为原子、组合、领域、治理与导入五类，并提供 Schema 验证和索引，让能力库在增长之后仍然可以查找、组合与维护。',
        },
      ],
      evidence: [
        'v2.0.0（tag，2026-11-13）交付六个 Sprint：标准、Builder、Runtime、Evaluation、治理与分发、发布工程。',
        '支持标准 SKILL.md 与增强 uskill.yaml 双层结构，提供校验、导入、导出与 migrate。',
        '受治理运行时强制执行 timeout / retry / 权限 / 审批 / 检查点 / DAG 子技能调度；评测支持基线对照与回归门禁。',
        '2026-11-26 本地执行 pytest：301 项测试全部通过（无需 API Key）。',
        'MIT 许可证；文档站 https://zhubao315.github.io/uSkill/ 已上线。',
      ],
      boundaries: [
        'v2.0.0 的 GitHub Release 页已于 2026-11-26 补齐（tag v2.0.0）。',
        'pyproject.toml 的开发状态仍标记为 Beta；Workbench 3.0 提供本地只读 Web MVP（React + FastAPI，需本机运行、不写文件），托管技能市场与云端面板仍无。',
        'CI 基线使用 MockProvider，全绿说明判分管道未退化，不等于真实模型的语义质量。',
      ],
    },
    decisions: [
      {
        title: '为什么先把 Skill 写成 Schema，而不是直接优化提示词',
        decision: '用统一 Schema 描述输入、步骤、约束与输出；模型只是可替换的执行引擎。',
        reason: '提示词的价值困在一次对话里，无法验证版本与兼容范围。结构化契约才能让技能被复用、评测与回归。',
      },
      {
        title: '为什么把治理放进运行时',
        decision: '受治理运行时强制执行 timeout / retry / 权限 / 人工审批 / 检查点与 DAG 子技能调度。',
        reason: '只在文档里写「要谨慎」不等于有边界；把约束变成运行时行为，执行日志才可复盘，L0–L4 风险分级才有落点。',
      },
      {
        title: '为什么 CI 用 MockProvider',
        decision: '评测门禁在固定数据集与 Mock 执行器上做回归，不把 CI 全绿说成语义质量达标。',
        reason: '真实模型有随机性与成本；门禁应验证判分管道没有退化，而不是冒充对模型能力的背书。',
      },
    ],
    definition: 'uSkill 是一个用于定义、校验、执行和治理 AI Agent Skills 的开源工程平台（MIT，v2.0.0）：把 SOP 转换为双层标准技能，通过受治理运行时、评测门禁与风险分级形成可追溯的能力资产。',
    audience: ['AI 工程师与 Agent 开发者', '使用 Codex / Claude Code / OpenCode 的用户', '需要把团队 SOP 变成可执行能力的技术负责人'],
    versionNote: 'v2.0.0（tag，2026-11-13；Release 页 2026-11-26 已补齐）；包版本定义在 core/uskills/_version.py。',
    evidenceLinks: [
      { label: 'README 与双层标准', href: 'https://github.com/zhubao315/uSkill#readme' },
      { label: '完整文档', href: 'https://zhubao315.github.io/uSkill/' },
      { label: 'v2.0.0 tag', href: 'https://github.com/zhubao315/uSkill/releases/tag/v2.0.0' },
    ],
    faqs: [
      {
        question: 'uSkill 和普通 Prompt 有什么区别？',
        answer: 'Prompt 的价值通常停留在一次对话里；uSkill 用统一 Schema 描述输入、步骤、约束与输出，让技能独立于模型，可验证、可版本化、可重复调用。',
      },
      {
        question: 'uSkill 是否绑定某一家模型？',
        answer: '不绑定。技能定义独立于模型；2.0 提供 OpenAI、OpenAI Responses、Anthropic、兼容网关、Ollama 等 Provider，MockProvider 可离线跑通全部命令。',
      },
      {
        question: '升级到 2.0 需要改 1.x 技能文件吗？',
        answer: '不需要。2.0 字段均为可选增量，SCHEMA_VERSION 保持 1.1.0，存量技能加载/校验/执行向后兼容；可用 uskills migrate --dry-run 先看报告。',
      },
      {
        question: '没有 API Key 能体验吗？评测全绿代表效果好？',
        answer: '大部分命令可在 MockProvider 下端到端运行。评测全绿只说明判分管道未退化、输出契约合规，不等于真实模型的语义质量；真实效果需自己的评测集接真实模型跑矩阵。',
      },
    ],
    schemaType: 'SoftwareApplication',
    lastVerified: '2026-11-26',
  },
  {
    id: 'knowledge-base-engineering',
    slug: 'knowledge-base-engineering',
    name: 'Knowledge Base Engineering',
    nameZh: '知识库工程',
    category: 'knowledge',
    status: 'active',
    sourceType: 'original',
    featured: true,
    tagline: '把知识库当作持续运行的信息系统来治理。',
    summary: '只读优先的 AI Skill：诊断、准入、治理、度量与可回滚的运营。',
    description:
      '一个可迁移、可测试的知识库工程 Skill。它不替用户判断“什么值得留”，而是把事实、证据、方案和边界交给人类。',
    tech: ['Python', 'Markdown / Obsidian', 'JSON / YAML', 'Agent Skills'],
    githubUrl: 'https://github.com/zhubao315/knowledge-base-engineering-skill',
    metrics: [
      { value: '8', label: '个治理模块', note: '诊断到上下文交付' },
      { value: '25', label: '项回归测试', note: 'fixture 测试，非生产基准' },
      { value: '0', label: '次物理删除', note: '删除不在 AI 权限集合' },
    ],
    caseStudy: {
      context: [
        '知识库往往不是缺工具，而是缺治理：重复副本、断链、没有来源的结论、无人维护的归档，以及把“收藏”误当成“资产”。当 AI 进入知识库，问题会更尖锐——它可以快速生成建议，也可能在没有证据时报告完成。',
        'Knowledge Base Engineering 从“先诊断、再治理”开始，把不可逆动作停在人类签字点。',
      ],
      approach: [
        {
          index: '01',
          title: '只读优先，默认不写',
          body: '扫描、检索、统计和建议生成可以自动完成；写入正式知识库、移动、批量重命名、软归档与基线调整需要明确的授权与恢复路径。',
        },
        {
          index: '02',
          title: '把治理拆成可复跑的阶段',
          body: 'OESA 四阶段——观测、评估、固化、调用——配合健康诊断、G0–G7 准入、L0–L7 分级、语义拓扑、度量审计和 90 天运营，形成一条完整链路。',
        },
        {
          index: '03',
          title: '用报告约束 AI 的自信',
          body: 'PASS 必须带时间、范围与方法；NOT_RUN 与 BLOCKED 不得计入通过。报告不能自证，AI 不能用自己的输出证明自己跑过。',
        },
      ],
      evidence: [
        'v1.2.0 包含主入口、4 份 OESA 规则、9 份 references、5 份模板、7 个脚本和 4 个适配器。',
        '25 项回归测试覆盖缺 frontmatter、断链、孤岛、占位、提示注入与 scaffold 安全边界。',
        '默认 dry-run；scaffold 拒绝非空目录，不覆盖、不移动、不删除。',
      ],
      boundaries: [
        '扫描器是启发式的，不会解析全部 Dataview、Canvas 或 Notion 属性。',
        '25 项 fixture 测试证明流程与权限，不代表 10k 规模知识库的生产性能。',
        'Notion API 与 RAG 适配尚未实机联调。',
      ],
    },
    definition: 'Knowledge Base Engineering 是一个只读优先的知识库治理 Skill：先诊断重复、断链与无来源结论，再在人类授权下完成准入、分级、固化与上下文交付。',
    audience: ['使用 Obsidian 的长期笔记用户', '需要审计与治理大型知识库的团队', '希望 AI 在证据边界内处理知识资产的人'],
    versionNote: '案例记录为 v1.2.0；具体版本以仓库 Release 为准。',
    evidenceLinks: [
      { label: 'README 与治理规则', href: 'https://github.com/zhubao315/knowledge-base-engineering-skill#readme' },
    ],
    faqs: [
      {
        question: '这个 Skill 会直接修改或删除我的笔记吗？',
        answer: '默认不会。扫描、检索、统计和建议可以自动完成；写入、移动、批量重命名、软归档与基线调整需要明确授权与恢复路径，删除不在 AI 权限集合内。',
      },
      {
        question: '25 项测试能证明什么？',
        answer: '它们覆盖缺 frontmatter、断链、孤岛、占位、提示注入与 scaffold 安全边界，证明流程与权限约束；不代表一万篇规模知识库的生产性能。',
      },
      {
        question: '它能解析全部 Dataview、Canvas 或 Notion 属性吗？',
        answer: '不能。扫描器是启发式的；Notion API 与 RAG 适配尚未实机联调，边界已在案例页说明。',
      },
    ],
    schemaType: 'SoftwareApplication',
    lastVerified: '2026-11-11',
  },
  {
    id: 'investment-discipline',
    slug: 'investment-discipline',
    name: 'Investment Discipline',
    nameZh: '投资的纪律',
    category: 'investment',
    status: 'active',
    sourceType: 'original',
    featured: true,
    tagline: '不预测市场，只把决策过程变成可执行清单。',
    summary: '《投资的纪律》配套 Agent Skill：采集、校验、分析、纪律检查与复盘。',
    description:
      '一个零依赖的投资研究与纪律执行助手。支持研究、买入前检查、卖出复核、组合合规、复盘与 90 天系统建设，不荐股、不预测、不承诺收益。',
    tech: ['Python 3.9+', 'JSON Rules', 'CLI', 'Agent Skills'],
    githubUrl: 'https://github.com/zhubao315/investment-discipline',
    metrics: [
      { value: '8', label: '种任务模式', note: '研究 / 检查 / 复盘 / 建设' },
      { value: '45', label: '项结构校验', note: '规则可执行、可验证' },
      { value: '63', label: '项单元测试', note: '另有 3 条冒烟流程' },
    ],
    caseStudy: {
      context: [
        '投资中最难的部分通常不是找到一个观点，而是在情绪起伏时仍然按同一套标准行动。这个项目从《投资的纪律：从情绪交易到纪律复利》出发，把研究流程、数据核验、风险边界和决策检查做成 Agent 可以执行的工作流。',
        '它的目标不是给出“买什么”，而是让每一次决策都有来源、有前提、有可复盘的记录。',
      ],
      approach: [
        {
          index: '01',
          title: '先校验数据，再讨论判断',
          body: '采集结果必须区分数据时间与延迟；缺失数据记为待核实，不记为通过。行情、财报、宏观与新闻通过统一入口进入后续流程。',
        },
        {
          index: '02',
          title: '把纪律变成硬约束',
          body: '规则检查、组合与仓位合规、买入前检查、卖出复核和复盘各自有明确路由，规则冲突时输出“等待确认”，而不是自行裁决。',
        },
        {
          index: '03',
          title: '零依赖，离线优先',
          body: '核心校验只依赖 Python 标准库；实时采集可选联网，离线时走本地缓存或测试夹具。研究过程可以被复跑，也可以在无网络环境中审查。',
        },
      ],
      evidence: [
        '8 种任务路由覆盖研究、买入检查、卖出复核、组合合规、复盘、90 天系统、AI 投研和实时采集。',
        '45 项结构校验、63 项单元测试与 3 条端到端冒烟流程。',
        '不执行交易、不连接证券账户、不保存持仓凭据。',
      ],
      boundaries: [
        '不预测涨跌、不给目标价、不承诺收益或胜率，也不推荐具体证券。',
        '没有授权实时源时，页面必须标注“最新可用行情”及其时间与延迟，不能写“实时”。',
      ],
    },
    definition: '投资的纪律是一个零依赖的 Agent Skill，把投资研究、数据校验、买入前检查、卖出复核、组合合规与复盘变成可执行、可追溯的工作流；它不荐股、不预测、不承诺收益。',
    audience: ['希望建立研究流程的个人投资者', '需要可复盘决策记录的长期投资者'],
    versionNote: '能力规模以仓库为准：8 种任务路由、45 项结构校验、63 项单元测试。',
    evidenceLinks: [
      { label: 'README 与规则说明', href: 'https://github.com/zhubao315/investment-discipline#readme' },
    ],
    faqs: [
      {
        question: '它会推荐股票或预测涨跌吗？',
        answer: '不会。项目不预测涨跌、不给目标价、不承诺收益或胜率，也不推荐具体证券；它只帮助按统一标准完成研究和复盘。',
      },
      {
        question: '行情数据如何处理？',
        answer: '采集结果必须区分数据时间与延迟；缺失数据记为待核实而非通过。没有授权实时源时，必须标注“最新可用行情”及时间，不能写“实时”。',
      },
      {
        question: '它会连接证券账户或执行交易吗？',
        answer: '不会。项目不执行交易、不连接证券账户、不保存持仓凭据，核心校验可离线复跑。',
      },
    ],
    schemaType: 'SoftwareApplication',
    lastVerified: '2026-11-11',
  },
  {
    id: 'quantified-life',
    slug: 'quantified-life',
    name: 'Quantified Life',
    nameZh: '量化生活',
    category: 'quantified',
    status: 'active',
    sourceType: 'modified',
    featured: true,
    tagline: '把十多年运动与健康记录，变成一个可查询的个人数据系统。',
    summary: 'COROS → SQLite → JSON / CSV → GitHub Pages 的长期数据实践。',
    description:
      '健康、跑步、骑行与徒步四个独立站点，共享一条从设备同步、数据校验到静态可视化的流水线。数据每天自动更新，历史持续累积。',
    tech: ['Python', 'SQLite', 'FIT / GPX', 'TypeScript / Vite', 'GitHub Pages'],
    githubUrl: 'https://github.com/zhubao315/health',
    demoUrl: 'https://zhubao315.github.io/health/',
    demoLabel: '打开健康面板',
    cover: healthCover,
    coverAlt: '个人健康数据面板，展示睡眠、HRV、静息心率与训练负荷趋势',
    extraLinks: [
      { label: 'Running', href: 'https://zhubao315.github.io/running/' },
      { label: 'Cycling', href: 'https://zhubao315.github.io/cycling/' },
      { label: 'Hiking', href: 'https://zhubao315.github.io/hiking/' },
    ],
    metrics: [
      { value: '1,054', label: '天健康数据', note: '健康仓库每日汇总 · 截至 2026-11-26' },
      { value: '8,196', label: '次运动记录', note: '跑步 2,044 + 骑行 5,808 + 徒步 344 · 派生自各站 README · 2026-11-26' },
      { value: '4', label: '个独立站点', note: '健康 / 跑步 / 骑行 / 徒步' },
    ],
    caseStudy: {
      context: [
        '个人数据项目最容易被“第一张图”欺骗：样本很小、指标很漂亮，几周后却没有继续更新。量化生活的重点不是一次性的可视化，而是让数据在几年后仍然可查、可信、可解释。',
        '四个站点共享一个朴素的链路：设备 → MCP → Python 同步 → SQLite → 静态数据与页面。没有服务器，没有数据库云服务，所有历史都在 Git 里。',
      ],
      approach: [
        {
          index: '01',
          title: '把缺失当作缺失',
          body: '缺失的睡眠阶段保持 null，不自动补零；数据质量报告会公开缺失率、断档、重复键和稳健异常值。',
        },
        {
          index: '02',
          title: '同步可以失败，但不能倒退',
          body: '每张表维护自己的同步水位；失败不推进水位，下次从缺口重新读取。写入使用 COALESCE 风格的 upsert，重拉不会用空值覆盖历史。',
        },
        {
          index: '03',
          title: '用同一定义服务所有界面',
          body: '滚动统计、基线、相关性与数据质量检查共享同一套 Python 定义；面板、Markdown 报告与 CSV 不会各说各话。',
        },
      ],
      evidence: [
        '健康数据从 2023-12-30 持续至今，面板覆盖 11 项指标和每日运动记录。',
        '跑步、骑行、徒步各自有独立站点，轨迹和 3D 地形由原始 FIT / GPX 生成。',
        '每天自动同步，错峰执行；所有数据与页面都托管在 GitHub Pages。',
      ],
      boundaries: [
        '主页只展示经过挑选的汇总指标；更细的健康数据以各项目站点为准。',
        '不同仓库 README 与旧 Profile README 可能存在更新时间差；本项目以各站点 README 的数据快照为准。',
      ],
    },
    definition: '量化生活是一条 COROS → SQLite → JSON / CSV → GitHub Pages 的个人数据流水线，把健康、跑步、骑行与徒步的长期记录变成每天自动更新、可查询、可解释的静态站点。',
    audience: ['长期记录运动与健康数据的个人用户', '关注可复现数据管道的开发者', '希望历史数据始终可查的量化生活实践者'],
    versionNote: '数据每天自动同步；统计口径与日期以各独立站点的数据文件为准。',
    evidenceLinks: [
      { label: '健康数据仓库 README', href: 'https://github.com/zhubao315/health#readme' },
      { label: '健康面板', href: 'https://zhubao315.github.io/health/' },
      { label: '跑步站点', href: 'https://zhubao315.github.io/running/' },
    ],
    faqs: [
      {
        question: '数据来自哪里，是否需要服务器？',
        answer: '来自 COROS 设备，经 MCP 与 Python 同步写入 SQLite，再生成静态数据页面。没有服务器和数据库云服务，历史都托管在 GitHub Pages。',
      },
      {
        question: '缺失的睡眠或运动数据会被补零吗？',
        answer: '不会。缺失阶段保持 null，数据质量报告公开缺失率、断档、重复键与异常值；同步失败不推进水位，下次从缺口重读。',
      },
      {
        question: '这些健康数据会发送到第三方分析平台吗？',
        answer: '不会。站点是静态页面，更细的个人健康数据以各项目站点为准，主页只展示经过挑选的汇总指标。',
      },
    ],
    lastVerified: '2026-11-11',
    sourceNote:
      'Health、Cycling、Hiking 为非 Fork 仓库；Running 的 GitHub 元数据为 Fork，但页面与数据管道已深度改造为个人跑步档案，故在本作品集中作为二次开发标注。',
  },
  {
    id: 'perfectme',
    slug: 'perfectme',
    name: 'Perfect Me',
    nameZh: '满分的我',
    category: 'creative',
    status: 'active',
    sourceType: 'original',
    featured: true,
    tagline: '一部关于“被喜欢”与“做自己”的原创 2D 微动漫。',
    summary: '从剧本、分镜、AI 图像、配音、配乐到成片与宣传站的完整创作链路。',
    description:
      '约 2 分 31 秒的原创 2D 微动漫。以自我差异理论为内核，讲述一个少年在“别人眼中的我”与“真实的我”之间的拉扯。',
    tech: ['Qwen-Image', 'ACE-Step', 'Qwen3-TTS', 'OpenToonz', 'Kdenlive', 'FFmpeg'],
    githubUrl: 'https://github.com/zhubao315/perfectme',
    demoUrl: 'https://zhubao315.github.io/perfectme/',
    demoLabel: '观看作品',
    cover: perfectmeCover,
    coverAlt: '原创 2D 微动漫《满分的我》宣传站，少年站在镜面碎片之间',
    metrics: [
      { value: "2'31\"", label: '成片时长', note: '字幕版与配音版' },
      { value: '3', label: '原创角色', note: '林一 / 一林 / 陈晓' },
      { value: '1', label: '完整链路', note: '文本到成片与宣传' },
    ],
    caseStudy: {
      context: [
        '《满分的我》不是一段单独的 AI 视频，而是一个完整的叙事项目：剧本、分镜、角色、场景、配音、配乐、剪辑、宣传网站，每一环都要服务同一个情绪命题。',
        '故事里，林一努力成为所有人喜欢的样子，却被这份“完美”越推越远。作品想说的不是不要努力，而是：你可以成为更好的自己，但不必先变得完美，才配得到认可。',
      ],
      approach: [
        {
          index: '01',
          title: '先写故事，再选择生成工具',
          body: '剧本与分镜先行，AI 只负责降低视觉与音频制作的边际成本，不代替叙事判断。角色设定经过多轮一致性提示词约束。',
        },
        {
          index: '02',
          title: '把制作流程变成可复现管线',
          body: '从五幕剧本、镜头分镜、图像生成、自研网格形变动画、配乐、配音到 FFmpeg 合成，每个阶段都有文档、素材与可复现脚本。',
        },
        {
          index: '03',
          title: '为作品做一个真正的入口',
          body: '宣传站包含故事、角色、剧照、预告和主题信息，而不是把视频文件直接丢在仓库根目录。观看路径与创作过程被一起呈现。',
        },
      ],
      evidence: [
        '原创 2D 微动漫，成片约 2 分 31 秒，配套宣传网站与创作文档。',
        '三名原创角色与完整剧本、分镜、角色设定、场景资产。',
        '技术链路覆盖 Qwen-Image、ACE-Step、Qwen3-TTS、OpenToonz、Kdenlive 与 FFmpeg。',
      ],
      boundaries: [
        '作品使用 AI 图像、配音与配乐工具辅助制作；具体素材与制作过程以仓库文档为准。',
        '宣传站包含自动播放等交互，移动端体验以实际站点为准。',
      ],
    },
    definition: '《满分的我》是一部约 2 分 31 秒的原创 2D 微动漫，围绕“被喜欢”与“做自己”展开，并配套剧本、分镜、角色设定、创作文档与独立宣传站。',
    audience: ['对原创动画与角色叙事感兴趣的观众', '关注 AI 辅助创作流程的创作者'],
    versionNote: '成片有字幕版与配音版；制作工具与素材清单以仓库文档为准。',
    evidenceLinks: [
      { label: '创作文档与素材', href: 'https://github.com/zhubao315/perfectme#readme' },
      { label: '在线观看', href: 'https://zhubao315.github.io/perfectme/' },
    ],
    faqs: [
      {
        question: '这是一段纯 AI 生成的视频吗？',
        answer: '不是。剧本与分镜先行，AI 用于降低视觉与音频制作的边际成本，不代替叙事判断；项目还包含自研网格形变动画、剪辑与宣传站。',
      },
      {
        question: '成片有多长，在哪里观看？',
        answer: '约 2 分 31 秒，提供字幕版与配音版，可通过项目演示站观看。',
      },
    ],
    schemaType: 'CreativeWork',
    lastVerified: '2026-11-11',
  },
  {
    id: 'e-life-method',
    slug: 'e-life-method',
    name: 'e-Life Method',
    nameZh: '自主进化人生操作系统',
    category: 'knowledge',
    status: 'active',
    sourceType: 'original',
    featured: false,
    tagline: '把知识管理从“收藏”推进到“连接与复利”。',
    summary: '4 大理论基石、4 大系统方法与完整知识管理实践指南。',
    description:
      '一套面向个人长期知识资产的方法论：以知识复利、四维身份、转化阶梯与人机共生为理论基础，配合空间架构、双轴标签、MOC 导航与项目驱动。',
    tech: ['Knowledge Management', 'Obsidian', 'Markdown', 'Methodology'],
    githubUrl: 'https://github.com/zhubao315/e-life-method',
    demoUrl: 'https://zhubao315.github.io/e-life-method/',
    demoLabel: '阅读方法论',
    lastVerified: '2026-11-11',
  },
  {
    id: 'uread',
    slug: 'uread',
    name: 'uRead',
    nameZh: 'Personal Reading Library',
    category: 'knowledge',
    status: 'active',
    sourceType: 'original',
    featured: false,
    tagline: '让读过的书，留下值得反复阅读的内容。READ · REFLECT · REVISIT。',
    summary:
      '从文字书库升级为有视觉识别的阅读发现平台：1599 篇笔记、39 份书单、1807 条书籍记录。',
    description:
      '一个 Personal Reading Library：公开门户与本地工作台共用同一站点。前者把私有 Obsidian 仓库中的阅读沉淀发布为只读档案，后者用 IndexedDB 管理自己的资料、笔记、卡片与书单。',
    tech: ['TypeScript', 'React 19', 'Vite 8', 'Tailwind CSS', 'IndexedDB', 'GitHub Pages', 'foliate-js'],
    githubUrl: 'https://github.com/zhubao315/uRead',
    demoUrl: 'https://zhubao315.github.io/uRead/',
    demoLabel: '在线体验',
    extraLinks: [
      { label: '中文 README', href: 'https://github.com/zhubao315/uRead/blob/main/README.md' },
      { label: 'English README', href: 'https://github.com/zhubao315/uRead/blob/main/README.en.md' },
    ],
    metrics: [
      { value: '1,595', label: '公开读书笔记', note: '全量公开范围，截至 2026-11-20' },
      { value: '39', label: '推荐书单', note: '另有 10 个主题阅读栏目' },
      { value: '1,818', label: '书籍记录', note: '每条都有确定性主题视觉' },
    ],
    caseStudy: {
      context: [
        '阅读档案很容易停在“把笔记列出来”：内容很多，却难以通过视觉快速理解这里有什么、这本书讲什么、这份书单适合谁。uRead 的目标是把文字书库变成有品牌识别的阅读发现平台。',
        '项目有两条刻意分开的线：公开门户只读、可分享、不含任何 token；本地工作台用 IndexedDB 保存八类个人数据。公开笔记不进本地 store，本地数据也不进公开产物。',
      ],
      approach: [
        {
          index: '01',
          title: '先建媒体系统，再谈配图',
          body: '独立清单 + Schema + 统一解析组件管理图片，明确区分真实出版封面与 uRead 主题视觉。1868 → 1818 本书记录全部由书籍 ID 派生确定性 SVG 封面，不批量抓取外部封面服务。',
        },
        {
          index: '02',
          title: '让速度成为体验的一部分',
          body: '用 1.5 MB 轻量索引替代 22 MB 全量正文，详情按单篇加载、相关笔记后台补取；移除阻塞渲染的外部字体，首屏实测 226 ms / 2.79 MB。',
        },
        {
          index: '03',
          title: '真实边界写进产品，而不是藏在文档里',
          body: '没有 WAV 时也提供设备原生语音「收听」，不造假播放器；TTS 服务停机就如实说明；发布审批基线拦截未批准变更；全量公开的不可回收风险在 README 中明确警示。',
        },
      ],
      evidence: [
        '内容基线（2026-11-20）：1599 篇公开笔记、10 个主题、39 份书单、1807 条书籍记录、5 本已发布 EPUB（授权待裁定）。',
        '媒体产物：1818 张书籍主题视觉 + 49 张主题/书单 16:9 视觉；统一 MediaImage 组件负责比例、懒加载与一次性 fallback。',
        '质量口径（2026-11-26 本地实测）：单元测试 231 passed / 1 skipped（32 文件，新增软删除与回收站 5 项）、typecheck / lint / 生产构建通过；备份只读校验脚本对有效备份 exit 0、损坏备份 exit 1。',
        '本地可靠性：普通删除改为软删除并进入 `/workspace/trash` 回收站，可恢复；只有回收站内的二次确认才永久删除。备份仍包含已删除实体。',
        '两个同步工作流：笔记每天、书单每周一；版本未变时跳过提交与部署，不制造空提交。',
      ],
      boundaries: [
        '当前公开范围是整个 07-SOURCES/71-书籍 目录全量公开，已发布内容可能被搜索引擎或他人缓存，无法保证收回。',
        '不做 AI 摘要、知识抽取、推荐、RAG / 向量检索、云端同步与浏览器直连私库。',
        'TTS 服务停机，无新音频；朗读依赖设备原生语音，音色与断句由浏览器决定；书籍主题视觉不冒充出版封面。',
      ],
    },
    decisions: [
      {
        title: '为什么用 IndexedDB 做本地工作台',
        decision: '个人数据默认留在浏览器本地，不做云端同步，也不在浏览器直连私有仓库。',
        reason: '阅读笔记属于私人资料；本地优先让数据在用户设备上可读可改，同时避免把私库 Token 暴露给前端。',
      },
      {
        title: '为什么把公开门户与个人工作台分开',
        decision: '公开门户只消费构建期生成的静态 JSON / HTML，工作台才使用 IndexedDB。',
        reason: '两者边界不同：门户可缓存、可索引；工作台要可删除、可恢复。分开后发布策略与本地数据互不影响。',
      },
      {
        title: '为什么删除先进入回收站',
        decision: '普通删除写 deleted_at，只有回收站里的二次确认才真正移除数据；备份保留已删除实体。',
        reason: '长期使用积累的数据经不起一次误点。恢复优先、永久删除显式化，比单纯的两步确认更能降低不可逆风险。',
      },
      {
        title: '为什么不把 AI 摘要塞进阅读器',
        decision: 'AI 只作为增强能力，不替用户生成摘要或推荐书单。',
        reason: '产品价值在 READ → REFLECT → INTERNALIZE；如果由 AI 代替理解与输出，阅读闭环就退化成摘要工具。',
      },
    ],
    lastVerified: '2026-11-20',
  },
  {
    id: 'uvision',
    slug: 'uvision',
    name: 'uVision',
    nameZh: '投资人知识库',
    category: 'investment',
    status: 'prototype',
    sourceType: 'original',
    featured: false,
    tagline: '把投资研究资料组织成可检索的知识结构。',
    summary: '面向投资研究的知识库项目，处于早期原型阶段。',
    description:
      '投资人知识库方向的早期工程原型。当前没有稳定在线演示与完整 README，项目状态以 GitHub 仓库内容为准。',
    tech: ['TypeScript', 'Knowledge Base'],
    githubUrl: 'https://github.com/zhubao315/uVision',
    lastVerified: '2026-11-11',
  },
  {
    id: 'memoir',
    slug: 'memoir',
    name: 'Memoir',
    nameZh: '数字人生回忆录',
    category: 'creative',
    status: 'prototype',
    sourceType: 'original',
    featured: false,
    tagline: '记录人生重要时刻的数字容器。',
    summary: '数字人生回忆录早期 MVP，探索个人叙事与时间记录的交互方式。',
    description:
      '一个关于人生重要时刻的记录产品原型。当前没有稳定在线演示，适合作为产品探索与交互实验查看。',
    tech: ['HTML', 'Digital Storytelling'],
    githubUrl: 'https://github.com/zhubao315/memoir',
    lastVerified: '2026-11-11',
  },
  {
    id: '2d-micro-anime-skill',
    slug: '2d-micro-anime-skill',
    name: '2D Micro Anime Skill',
    nameZh: '2D 微动漫制作 Skill',
    category: 'creative',
    status: 'active',
    sourceType: 'original',
    featured: false,
    tagline: '把微动漫制作流程封装成可复用的 Agent Skill。',
    summary: '五幕剧本 → 多轮一致性出图 → 网格动画 → 配乐配音 → 合成发布。',
    description:
      '从原创微动漫《拥抱不完美的自己》提炼出的全流程制作 Skill，覆盖剧本、提示词、自研 2D 网格形变动画引擎、ACE-Step 配乐、Qwen3-TTS 配音与 FFmpeg 合成。',
    tech: ['Python', 'Agent Skills', 'Qwen-Image', 'ACE-Step', 'FFmpeg'],
    githubUrl: 'https://github.com/zhubao315/2d-micro-anime-skill',
    schemaType: 'SoftwareApplication',
    lastVerified: '2026-11-11',
  },
  {
    id: 'urepo',
    slug: 'urepo',
    name: 'uRepo',
    nameZh: '主题报告',
    category: 'knowledge',
    status: 'experiment',
    sourceType: 'original',
    featured: false,
    tagline: '围绕主题组织资料、判断与输出。',
    summary: '主题报告型内容仓库，探索研究报告的结构化呈现。',
    description:
      '一个主题报告与资料汇编入口。当前线上站点未稳定发布，具体内容以 GitHub 仓库为准。',
    tech: ['HTML', 'Research Notes'],
    githubUrl: 'https://github.com/zhubao315/uRepo',
    lastVerified: '2026-11-11',
  },
  {
    id: 'tescreal-guide',
    slug: 'tescreal-guide',
    name: 'TESCREAL Guide',
    nameZh: 'TESCREAL 视觉指南',
    category: 'knowledge',
    status: 'active',
    sourceType: 'original',
    featured: false,
    tagline: '用视觉方式理解塑造硅谷的七种技术哲学。',
    summary: '关于 TESCREAL 思想谱系的视觉化指南。',
    description:
      '以信息设计和长页面阅读方式梳理 TESCREAL 相关的七种技术哲学，尝试把复杂概念变成可浏览的结构。',
    tech: ['HTML', 'Information Design', 'Long-form'],
    githubUrl: 'https://github.com/zhubao315/tescreal-guide',
    demoUrl: 'https://zhubao315.github.io/tescreal-guide/',
    demoLabel: '阅读指南',
    lastVerified: '2026-11-11',
  },
  {
    id: 'h029-psychology',
    slug: 'h029-psychology',
    name: 'H029 Psychology',
    nameZh: '万学归心',
    category: 'knowledge',
    status: 'experiment',
    sourceType: 'original',
    featured: false,
    tagline: '从多个领域走向心理学的认知观察。',
    summary: '8 个领域、24 个案例的长篇研究型内容实验。',
    description:
      '一篇围绕“所有领域最终通向心理学”的研究型内容实验，以 8 个领域和 24 个案例进行论证。页面中的观点属于作者个人研究，不构成专业心理建议。',
    tech: ['HTML', 'Research Writing'],
    githubUrl: 'https://github.com/zhubao315/h029-psychology',
    demoUrl: 'https://zhubao315.github.io/h029-psychology/',
    demoLabel: '在线阅读',
    lastVerified: '2026-11-11',
  },
  {
    id: 'dual-asset-strategy',
    slug: 'dual-asset-strategy',
    name: 'Dual Asset Strategy',
    nameZh: '双资产投资策略',
    category: 'investment',
    status: 'experiment',
    sourceType: 'original',
    featured: false,
    tagline: '用攻守两种资产结构理解长期配置。',
    summary: '“改变世界”与“不被世界改变”的双资产研究项目，含 10 年回测。',
    description:
      '个人投资研究项目，讨论成长资产与防御资产的组合逻辑，公开了 10 年回测结果。所有内容仅用于研究记录，不构成投资建议。',
    tech: ['HTML', 'Backtest', 'Investment Research'],
    githubUrl: 'https://github.com/zhubao315/dual-asset-strategy',
    demoUrl: 'https://zhubao315.github.io/dual-asset-strategy/',
    demoLabel: '阅读研究',
    lastVerified: '2026-11-11',
  },
  {
    id: 'reading-2026',
    slug: 'reading-2026',
    name: 'Reading 2026',
    nameZh: '2026 年度阅读',
    category: 'knowledge',
    status: 'active',
    sourceType: 'original',
    featured: false,
    tagline: '在奇点与道之间寻找锚点。',
    summary: '2026 年度阅读收获与主题书单的记录。',
    description:
      '一个年度阅读项目，围绕技术奇点、东方哲学与个人锚点整理阅读收获。当前以仓库内容为唯一事实源。',
    tech: ['Markdown', 'Reading Notes'],
    githubUrl: 'https://github.com/zhubao315/reading-2026',
    lastVerified: '2026-11-11',
  },
  {
    id: 'hip-drive-running',
    slug: 'hip-drive-running',
    name: 'Hip Drive Running',
    nameZh: '送髋跑训练体系',
    category: 'quantified',
    status: 'experiment',
    sourceType: 'original',
    featured: false,
    tagline: '从四本书出发，搭建一套可执行的跑步技术路径。',
    summary: '送髋跑的技术体系、训练路径与文献整理。',
    description:
      '一个个人训练研究项目，把四本跑步技术书籍中的概念整理成送髋跑的技术体系与训练路径。观点属于训练研究记录，不构成医疗建议。',
    tech: ['HTML', 'Training Research'],
    githubUrl: 'https://github.com/zhubao315/hip-drive-running',
    lastVerified: '2026-11-11',
  },
  {
    id: 'uprompt',
    slug: 'uprompt',
    name: 'uPrompt',
    nameZh: '提示词管理',
    category: 'agent',
    status: 'prototype',
    sourceType: 'original',
    featured: false,
    tagline: '让提示词管理变得简单。',
    summary: '提示词管理方向的早期实验，正在寻找更稳定的产品形态。',
    description:
      '提示词管理方向的早期项目。仓库暂无完整 README 与在线演示，在本作品集中保留为实验记录。',
    tech: ['Prompt Engineering'],
    githubUrl: 'https://github.com/zhubao315/uPrompt',
    lastVerified: '2026-11-11',
  },
  {
    id: 'zhuocheng-terminal',
    slug: 'zhuocheng-terminal',
    name: '拙诚日课',
    nameZh: '离线日课与个人修习终端',
    category: 'creative',
    status: 'active',
    sourceType: 'original',
    featured: false,
    tagline: '把一部旧手机，变成一张常亮的修身桌面。',
    summary: '全离线 2.1 信息屏：金句、AI 伴读、曾国藩日课、微习惯与静坐，不需要网络与 API Key。',
    description:
      '面向旧设备再利用的离线个人修习终端。默认停留在每日金句全屏信息屏，六个栏目手动左右切换；内容全部在手机内运行，并提供可直接安装的 APK。',
    tech: ['JavaScript', 'Python', 'WebView', 'Offline-first', 'PhoneBox'],
    githubUrl: 'https://github.com/zhubao315/zhuocheng-terminal',
    demoUrl: 'https://zhubao315.github.io/zhuocheng-terminal/',
    demoLabel: '在线落地页',
    extraLinks: [
      { label: '离线版演示', href: 'https://zhubao315.github.io/zhuocheng-terminal/offline.html' },
      { label: 'APK 下载', href: 'https://zhubao315.github.io/zhuocheng-terminal/releases/zhuocheng-offline-2.0.apk' },
    ],
    metrics: [
      { value: '999', label: '条金句', note: '43 个来源' },
      { value: '30', label: '条微习惯', note: '标注真实时长' },
      { value: '2.1', label: '离线信息屏', note: '桥接版 v1.4.4 另存' },
    ],
    caseStudy: {
      context: [
        '修习类应用通常依赖网络、账号与推送，反而打断日常节奏。拙诚日课把方向反过来：让一台退役手机成为常亮的桌面，打开就在当下这一句，不需要电脑、网络或 API Key。',
      ],
      approach: [
        {
          index: '01',
          title: '默认静止，而不是自动轮播',
          body: '信息屏默认停在每日金句，无顶栏和底导航；金句、伴读、日课、微习惯、静坐、档案六个栏目由用户手动切换，避免被内容流打断。',
        },
        {
          index: '02',
          title: '离线优先，设备自己就是系统',
          body: '内容全部在手机内运行，多端预设适配横竖屏、平板与桌面。硬件原型为红米 Note 2（LineageOS 16），APK 基座来自 PhoneBox，离线版只借它承载 WebView。',
        },
        {
          index: '03',
          title: '把可验证信息写进发布物',
          body: '落地页、离线演示、桥接版演示与 APK 分别给出入口；APK 标注字节数与 SHA-256，方便用户自行校验。',
        },
      ],
      evidence: [
        '999 条金句（43 个来源）、999 条 AI 伴读条目、30 条微习惯与曾国藩日课十二条。',
        '全离线版 2.1 与桥接版 v1.4.4 分别提供演示入口；APK 提供 SHA-256 校验值。',
        '2026-11-26 实测落地页、离线演示与 APK 下载地址均返回 HTTP 200。',
      ],
      boundaries: [
        'AI 伴读内容是预置的自包含条目，不调用在线模型；不会生成新的个性化内容。',
        'APK 基于旧设备与 LineageOS 原型，兼容性以仓库说明为准；代码为 MIT，数据许可另行说明。',
      ],
    },
    definition: '拙诚日课是一个全离线的个人修习终端：把旧手机变成常亮的修身桌面，提供金句、AI 伴读、曾国藩日课、微习惯与静坐六个栏目，不需要网络或 API Key。',
    audience: ['重视日常修习与微习惯的个人用户', '希望再利用旧手机的用户', '关注离线与隐私优先应用的人'],
    versionNote: '全离线信息屏 2.1（默认），桥接版 v1.4.4 另存；以仓库 CHANGELOG 为准。',
    evidenceLinks: [
      { label: '仓库 README 与发布说明', href: 'https://github.com/zhubao315/zhuocheng-terminal#readme' },
      { label: '离线版演示', href: 'https://zhubao315.github.io/zhuocheng-terminal/offline.html' },
    ],
    faqs: [
      {
        question: '需要网络或 API Key 吗？',
        answer: '不需要。默认的全离线版内容全部在手机内运行；AI 伴读是 999 条预置自包含条目，不调用在线模型。',
      },
      {
        question: '可以用哪些设备？',
        answer: '硬件原型是红米 Note 2（刷入 LineageOS 16），同时提供横竖屏、平板与桌面的多端预设；具体兼容性以仓库说明为准。',
      },
      {
        question: 'APK 怎么验证完整性？',
        answer: '落地页提供 APK 字节数与 SHA-256 校验值，可下载后自行比对。',
      },
    ],
    schemaType: 'WebApplication',
    lastVerified: '2026-11-26',
  },
  {
    id: 'ai-agent-master',
    slug: 'ai-agent-master',
    name: 'AI-Agent Master',
    nameZh: 'AI-Agent 平台运维技能',
    category: 'agent',
    status: 'active',
    sourceType: 'original',
    featured: false,
    tagline: '把平台运维经验变成可安装、可审计的技能。',
    summary: 'AI-Agent 0.9.3 全生命周期运维技能：真实审计、资源与 GPU 评估、部署升级回滚、故障诊断。',
    description:
      '按标准 Agent Skills 格式封装的运维技能包，包含 8 份真实环境审计报告、16 篇参考与 10 个 runbook，支持原生 Skillshub 安装。它不是产品源码仓库。',
    tech: ['Agent Skills', 'Docker', 'Python', 'Runbooks'],
    githubUrl: 'https://github.com/zhubao315/ai-agent-master',
    metrics: [
      { value: '8', label: '份审计报告', note: '平台/架构/服务/资源/依赖/风险等' },
      { value: '16', label: '篇参考', note: '另有 10 个 runbook' },
      { value: '7', label: '张 RTX 4090', note: '128 CPU / 499 GiB 基线' },
    ],
    caseStudy: {
      context: [
        'AI Agent 平台的运维知识常散落在工单与个人笔记里。这个项目把真实环境的审计、容量估算、部署、升级与回滚流程整理成可安装、可校验的技能包。',
      ],
      approach: [
        { index: '01', title: '先审计真实环境', body: '报告来自实际平台与架构核查，不给未经验证的容量或性能结论。' },
        { index: '02', title: '把容量估算写成可复核的口径', body: '双 Docker 引擎、四服务、128 CPU / 499 GiB / 7×RTX4090 作为基线，并标注置信度。' },
        { index: '03', title: '安装与验证分开', body: '原生 Skillshub 上传成功、读回内容逐字节一致；但实际调用因上游模型不可达返回 HTTP 400，记为待复验而非成功。' },
      ],
      evidence: [
        '8 份审计报告、16 篇 references、10 个 runbook（12 节结构）。',
        '原生 Skillshub 上传与读回一致，安装位置与结构校验有记录（见 install-verification.md）。',
        'Agent 实际调用未通过：/api/invoke 返回 HTTP 400，根因为上游 192.168.1.3:18087 不可达，非 Skill 缺陷。',
      ],
      boundaries: [
        '仓库是独立技能包，不冒充产品源码仓库；9090 是文档站，产品实例在内部地址。',
        '上游模型不可达时无法完成真实调用验证，恢复后需复验。',
      ],
    },
    definition: 'AI-Agent Master 是一个按 Agent Skills 标准封装的 AI-Agent 平台运维技能，覆盖真实环境审计、GPU 与容量评估、部署升级回滚、故障诊断与原生 Skillshub 安装。',
    audience: ['负责 AI Agent 平台运维的工程师', '需要 GPU 资源评估与容量估算的团队', '使用 OpenCode / Skillshub 的用户'],
    versionNote: '技能版本 v1.0.0（标签 skill-v1.0.0）；许可证 Apache-2.0，以仓库 manifest 为准。',
    evidenceLinks: [
      { label: 'README 与验证记录', href: 'https://github.com/zhubao315/ai-agent-master#readme' },
      { label: '安装验证', href: 'https://github.com/zhubao315/ai-agent-master/blob/main/install-verification.md' },
    ],
    faqs: [
      {
        question: '这是 AI-Agent 产品源码吗？',
        answer: '不是。这是独立的运维技能仓库，不冒充产品源码仓库；产品实例在内部地址，仓库只提供方法与 runbook。',
      },
      {
        question: '安装后能直接调用 Agent 吗？',
        answer: '安装与结构校验已验证通过；实际调用仍需上游模型可达。当前记录中 /api/invoke 因上游不可达返回 HTTP 400，需恢复后复验。',
      },
    ],
    schemaType: 'SoftwareApplication',
    lastVerified: '2026-11-26',
  },
  {
    id: 'gdmp-master',
    slug: 'gdmp-master',
    name: 'GDMP Master',
    nameZh: 'GDMP 无代码平台运维知识包',
    category: 'infrastructure',
    status: 'active',
    sourceType: 'original',
    featured: false,
    tagline: '版本化的无代码平台运维知识，而不是 AI 执行器。',
    summary: 'GDMP 运维知识包：18 篇参考、11 个 runbook、升级兼容与备份恢复；明确无 AI Skill 运行时。',
    description:
      '面向 GDMP 无代码平台的版本化运维知识包，包含真实审计、技术栈说明、部署与应用发布、诊断、性能调优、升级与回滚流程。',
    tech: ['Runbooks', 'No-code', 'Spring Boot', 'PostgreSQL'],
    githubUrl: 'https://github.com/zhubao315/gdmp-master',
    metrics: [
      { value: '8', label: '份审计报告', note: '平台/架构/模块/服务/资源/数据/风险等' },
      { value: '18', label: '篇参考', note: '另有 11 个 runbook' },
      { value: '0', label: 'AI 运行时', note: 'native_skill_runtime=false' },
    ],
    caseStudy: {
      context: [
        '无代码平台的升级与回滚经常依赖口耳相传的经验。这个项目把真实审计与可复核的 runbook 整理成带版本与校验的安装包。',
      ],
      approach: [
        { index: '01', title: '先说明它不是什么', body: 'manifest 明确 native_skill_runtime=false、ai_execution=not_enabled；知识包已安装不等于 AI 执行能力已启用。' },
        { index: '02', title: '把变更约束写进流程', body: '生产只读、变更审批、dry-run、凭据不落盘；DB 与应用回滚分离。' },
        { index: '03', title: '不伪造验证结果', body: '场景测试标待执行，运行时功能与容量基线标待确认；只登记已通过的安装与 SHA256 校验。' },
      ],
      evidence: [
        '8 份真实审计报告、18篇参考、11 个 runbook（11 节结构）。',
        '知识包 SHA256 校验通过，安装到 .installed/1.0.0，读回内容一致。',
        '9191 是文档站；产品实例在内部地址，没有后台授权时不宣称运行时功能已验证。',
      ],
      boundaries: [
        'GDMP WAR 中没有 ai-agent / mcp / skill / llm / vector / embedding 组件；文档中的「AI 能力」是业务功能。',
        '没有 GDMP 后台或宿主机授权，运行时功能与容量基线标记为待确认，场景测试待执行。',
      ],
    },
    definition: 'GDMP Master 是 GDMP 无代码平台的版本化运维知识包，提供真实审计、升级兼容、备份恢复与 runbook；它明确不提供 AI Skill 运行时。',
    audience: ['维护 GDMP 无代码平台的运维人员', '需要升级兼容与回滚流程的团队'],
    versionNote: '知识包 v1.0.0（标签 skill-v1.0.0）；安装方式见 README，配置以 manifest.yaml 为准。',
    evidenceLinks: [
      { label: 'README 与能力说明', href: 'https://github.com/zhubao315/gdmp-master#readme' },
    ],
    faqs: [
      {
        question: '安装知识包会启用 AI 执行能力吗？',
        answer: '不会。manifest.yaml 明确 native_skill_runtime=false、ai_execution=not_enabled；GDMP 本身没有 AI Skill 运行时。',
      },
      {
        question: '有在线产品演示吗？',
        answer: '没有公开实例。9191 是文档站，产品实例在内部地址；未经授权的功能均标记为待确认。',
      },
    ],
    lastVerified: '2026-11-26',
  },
  {
    id: 'ulife-os-infra',
    slug: 'ulife-os-infra',
    name: 'uLife OS Infra',
    nameZh: '个人智能体操作系统 Skill',
    category: 'agent',
    status: 'active',
    sourceType: 'original',
    featured: false,
    tagline: '让 AI 助理拥有身份、记忆与冷启动预算。',
    summary: '个人 AI 操作系统构建与治理技能包：身份契约、四层记忆、冷启动预算与 MCP / A2A / Skills 协议层。',
    description:
      '把「个人智能体操作系统」变成可安装、可审计、可复用的技能包。核心只需 Markdown，脚本为可选 Python 标准库工具，支持 Claude Code / Codex / Cursor 等客户端。',
    tech: ['Agent Skills', 'Markdown', 'Python', 'MCP', 'A2A'],
    githubUrl: 'https://github.com/zhubao315/ulife-os-infra',
    metrics: [
      { value: '4', label: '种工作模式', note: '统一 CLI（v2.0）' },
      { value: '4', label: '层记忆', note: '身份契约 + 冷启动预算' },
      { value: '0', label: '第三方运行时依赖', note: '核心只需要 Markdown' },
    ],
    caseStudy: {
      context: [
        '普通 AI 聊天是无状态的：每次从零开始，不记得你是谁。这个项目把个人 AI 基础设施从理念变成可安装、可审计的技能包。',
      ],
      approach: [
        { index: '01', title: '先写身份契约', body: '用十文件模板让 Agent 了解你的身份、目标与边界，从一次性工具升级为持续理解你的系统。' },
        { index: '02', title: '用预算控制冷启动', body: 'T1/T2/T3 冷启动上下文预算表与人机接力检查点，避免每次对话塞入全部上下文。' },
        { index: '03', title: '协议层与护栏分开', body: 'MCP / A2A / Agent Skills 与 Code-as-Glue 脚本编排属于协议与执行层；人机接力护栏保留人工确认点。' },
      ],
      evidence: [
        'v1.1 对齐指南 v2.1：冷启动预算、人机接力检查点、Code-as-Glue、异构算力路由与 Rework Rate 观测。',
        'v2.0 提供四种工作模式与统一 CLI；核心零第三方依赖，脚本仅用 Python 标准库。',
        '安装可用 npx skills add 或手动放置 SKILL.md；审计脚本可检查骨架是否合规。',
      ],
      boundaries: [
        '核心只需要 Markdown；scripts/ 为可选 Python 3 标准库工具，不提供托管服务。',
        '项目对齐公开指南与 PAI 框架，不宣称属于任何机构官方实现。',
      ],
    },
    definition: 'uLife OS Infra 是一个可安装的个人智能体操作系统 Skill，用身份契约、四层记忆、冷启动预算与 MCP / A2A / Skills 协议层，把一次性对话变成持续理解你的系统。',
    audience: ['希望 AI 助理长期理解自己的个人用户', '搭建个人 AI 基础设施的开发者', '关注上下文工程与智能体记忆的人'],
    versionNote: 'README 记录 v2.0 四种工作模式与统一 CLI；v1.1 对齐指南 v2.1，实际版本以仓库为准。',
    evidenceLinks: [
      { label: 'README 与安装方式', href: 'https://github.com/zhubao315/ulife-os-infra#readme' },
    ],
    faqs: [
      {
        question: '需要数据库或云服务吗？',
        answer: '不需要。核心只需要 Markdown；scripts/ 是可选 Python 标准库工具，没有托管服务依赖。',
      },
      {
        question: '和普通的「人设提示词」有什么不同？',
        answer: '它把身份写成可审计的十文件契约，配上四层记忆、冷启动预算与人机接力检查点，而不是一段每次复制的提示词。',
      },
    ],
    schemaType: 'SoftwareApplication',
    lastVerified: '2026-11-26',
  },
  {
    id: 'active-watch',
    slug: 'active-watch',
    name: 'ACTIVE Watch',
    nameZh: 'ACTIVE 四站运营中枢',
    category: 'infrastructure',
    status: 'active',
    sourceType: 'original',
    featured: false,
    tagline: '四个运动站点的巡检、配额账本与品牌单一事实源。',
    summary: 'ACTIVE 四站运营中枢：每日巡检、共享 COROS 配额账本与品牌单一事实源；本仓库不发布页面。',
    description:
      '健康 / 跑步 / 骑行 / 徒步四个站点的工程治理仓库。承担每日巡检、共享 COROS FIT 下载配额账本与四站共享品牌资产的唯一编辑处。',
    tech: ['GitHub Actions', 'Node.js', 'Python', 'Brand governance'],
    githubUrl: 'https://github.com/zhubao315/active-watch',
    metrics: [
      { value: '4', label: '个站点', note: 'HEALTH / RUNNING / CYCLING / HIKING' },
      { value: '1', label: '张巡检 issue', note: '异常时创建/更新，恢复后关闭' },
      { value: '50', label: '次每日 FIT 额度', note: '三站共享，租约式账本' },
    ],
    caseStudy: {
      context: [
        '多个独立站点同时同步设备数据、共享同一份配额与品牌资产时，最容易出现的不是功能缺失，而是状态漂移。ACTIVE Watch 把这些约束集中到一个工程中枢。',
      ],
      approach: [
        { index: '01', title: '巡检只在真正需要处理时开 issue', body: '每天检查四站 HTTP、标题、品牌残留、数据新鲜度与失败工作流；异常时维护唯一一张 watch:incident issue。' },
        { index: '02', title: '配额是租约，不是配额表', body: '同步前 reserve、同步后 reconcile；未用完额度当天归还另外两站；账本不可达时 fail-open 回退保守值。' },
        { index: '03', title: '品牌单一事实源 + Guard', body: 'brand/ 是四站共享资产的唯一编辑处，sync.sh 同步并重写清单；各仓 Brand Guard 校验文件与清单一致。' },
      ],
      evidence: [
        '巡检时间 05:40 UTC；范围包括 HTTP、标题、blob 同源、favicon 字节一致与数据新鲜度。',
        'COROS 配额账本保留 3 天，单站默认取 10、硬上限 45；失败策略为 fail-open。',
        '品牌版本 3.0 — PRECISION MOTION，含真 SVG 矢量与四站子品牌。',
      ],
      boundaries: [
        '本仓库不发布页面，只承担巡检、账本与品牌源；它不是面向普通消费者的产品。',
        '写 state/ 需要仓库 secret ACTIVE_STATE_TOKEN；轮换时需同步更新三个运动站的 secret。',
      ],
    },
    definition: 'ACTIVE Watch 是 HEALTH、RUNNING、CYCLING、HIKING 四站的工程运营中枢：每日巡检、共享 COROS 配额账本与品牌单一事实源，不发布面向用户的页面。',
    audience: ['维护多个静态数据站点的开发者', '关注品牌一致性与运维自动化的实践者'],
    versionNote: '品牌版本 3.0 — PRECISION MOTION；巡检与账本逻辑以仓库脚本为准。',
    evidenceLinks: [
      { label: 'README 与巡检说明', href: 'https://github.com/zhubao315/active-watch#readme' },
    ],
    faqs: [
      {
        question: '这是一个面向普通用户的运动产品吗？',
        answer: '不是。它不发布页面，只做巡检、配额账本与品牌资产治理，属于技术案例。',
      },
      {
        question: '配额账本不可达时会中断同步吗？',
        answer: '不会。失败策略是 fail-open：回退到保守值 10，运动站同步不会因记账失败而中断。',
      },
    ],
    lastVerified: '2026-11-26',
  },
  {
    id: 'uwise',
    slug: 'uwise',
    name: 'uWise',
    nameZh: '领域知识百科',
    category: 'knowledge',
    status: 'active',
    sourceType: 'original',
    featured: false,
    tagline: '把知识转化为可行动的领域结构。',
    summary: 'AI 驱动的领域知识百科：Area → Project → Task 框架与四大核心身份，MkDocs 每日自动更新。',
    description:
      '以架构师、投资人、终身学习者、生活艺术家四种身份组织的领域知识库，用 MkDocs Material 发布，GitHub Actions 每日自动更新内容。',
    tech: ['MkDocs', 'Material', 'Markdown', 'GitHub Actions'],
    githubUrl: 'https://github.com/zhubao315/uWise',
    demoUrl: 'https://zhubao315.github.io/uWise/',
    demoLabel: '阅读百科',
    metrics: [
      { value: '4', label: '个核心身份', note: '架构师 / 投资人 / 学习者 / 生活艺术家' },
      { value: '2.0.0', label: '包版本', note: '以 pyproject.toml 为准' },
      { value: '1', label: '条更新链路', note: 'GitHub Actions 每日自动更新' },
    ],
    caseStudy: {
      context: [
        '知识百科容易停在资料堆积。uWise 用领域驱动框架把 Area、Project、Task 串起来，让内容指向行动而不是收藏。',
      ],
      approach: [
        { index: '01', title: '用身份组织领域', body: '四大核心身份对应不同知识领域与决策场景，避免把所有内容塞进一个扁平分类。' },
        { index: '02', title: '从领域到任务', body: 'Area → Project → Task 的层级让阅读结果可以落到具体行动。' },
        { index: '03', title: '让更新可验证', body: '内容以 Markdown 维护，站点由 GitHub Actions 每日更新，版本与依赖写在 pyproject.toml。' },
      ],
      evidence: [
        'README 明确四大核心身份与领域驱动框架；站点已上线（2026-11-26 实测 HTTP 200）。',
        'pyproject.toml 记录 version 2.0.0、MIT 协议；技术栈为 MkDocs + Material。',
      ],
      boundaries: [
        '内容是持续更新的知识整理，不构成投资、心理或医疗建议。',
        '自动抓取的内容以来源说明为准，具体领域条目以站点最新页面为准。',
      ],
    },
    definition: 'uWise 是一个 AI 驱动的领域知识百科，用架构师、投资人、终身学习者与生活艺术家四种身份和 Area → Project → Task 框架，把知识组织成可行动的领域结构。',
    audience: ['需要长期组织领域知识的个人', '关注知识到行动转化的人', '投资研究与终身学习的实践者'],
    versionNote: 'pyproject.toml 记录 2.0.0；内容每日自动更新，条目以站点最新版本为准。',
    evidenceLinks: [
      { label: 'README 与领域框架', href: 'https://github.com/zhubao315/uWise#readme' },
      { label: '在线百科', href: 'https://zhubao315.github.io/uWise/' },
    ],
    faqs: [
      {
        question: 'uWise 和知识库工程 Skill 有什么区别？',
        answer: 'uWise 是持续更新的领域知识百科与阅读入口；知识库工程是只读优先的治理 Skill，负责诊断与审计，两者定位不同。',
      },
      {
        question: '内容会每天更新吗？',
        answer: 'README 记录 GitHub Actions 每日自动更新知识内容；具体条目的时间与来源以站点页面为准。',
      },
    ],
    lastVerified: '2026-11-26',
  },
  {
    id: 'piglet-docker',
    slug: 'piglet-docker',
    name: 'Piglet Docker',
    nameZh: 'AI 编程沙箱',
    category: 'infrastructure',
    status: 'experiment',
    sourceType: 'original',
    featured: false,
    tagline: '基于 Pigsty 的轻量级 AI Coding Sandbox。',
    summary: '把 Claude API 代理、Code-Server、JupyterLab、PostgreSQL 与 Nginx 打进一个可自托管的 Docker 镜像。',
    description:
      '一个实验性的 Docker 运行时环境：通过统一入口提供 AI API 格式转换、浏览器版 VS Code、交互计算环境与带向量搜索的数据库。',
    tech: ['Docker', 'Nginx', 'PostgreSQL', 'Code-Server', 'JupyterLab'],
    githubUrl: 'https://github.com/zhubao315/piglet-docker',
    metrics: [
      { value: '5', label: '个组件', note: '代理 / IDE / Jupyter / PG / Nginx' },
      { value: '1', label: '个镜像', note: 'zhubao315/piglet:latest' },
    ],
    caseStudy: {
      context: [
        'AI 编程环境通常需要组合多个服务。Piglet Docker 把这些组件收进一个镜像，便于本地或服务器上一键启动。',
      ],
      approach: [
        { index: '01', title: '统一入口', body: 'Nginx 暴露 80 端口，各组件通过固定端口提供能力，减少配置分散。' },
        { index: '02', title: '把凭据留在运行时', body: 'VLLM_BASE_URL、DEFAULT_MODEL 与 POSTGRES_PASSWORD 通过环境变量注入，不写进镜像。' },
      ],
      evidence: [
        'README 给出 Docker Hub 拉取与本地构建两种运行方式。',
        '组件与端口清单公开：8080 代理、8443 Code-Server、8888 JupyterLab、5432 PostgreSQL。',
      ],
      boundaries: [
        '没有公开在线演示；需要自托管并自行配置上游模型地址与数据库密码。',
        '仓库最近推送为 2026-04-21，当前作为实验项目记录，不宣称生产可用性。',
      ],
    },
    definition: 'Piglet Docker 是一个基于 Pigsty 的轻量级 AI 编程沙箱镜像，把 API 代理、Code-Server、JupyterLab、PostgreSQL 与 Nginx 组合成可自托管的环境。',
    audience: ['需要本地 AI 编程环境的开发者', '想快速体验容器化工具链的团队'],
    versionNote: '镜像标签 latest；仓库最近推送 2026-04-21，作为实验项目记录。',
    evidenceLinks: [
      { label: 'README 与运行方式', href: 'https://github.com/zhubao315/piglet-docker#readme' },
    ],
    faqs: [
      {
        question: '有在线演示吗？',
        answer: '没有。这是一个需要自托管的 Docker 镜像，需自行配置上游模型地址与数据库密码。',
      },
    ],
    lastVerified: '2026-11-26',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const studioProjects = projects.filter(
  (project) => !project.featured && project.sourceType !== 'research',
);

export interface ResearchProject {
  name: string;
  note: string;
  githubUrl: string;
  area: string;
  /** 默认 upstream；仅在有本人提交证据时标为 modified。 */
  sourceType?: 'modified' | 'upstream';
}

export const researchProjects: ResearchProject[] = [
  {
    name: 'DeepSeek Harness',
    note: 'Agent Harness 与插件化执行环境的 Fork 研究。',
    githubUrl: 'https://github.com/zhubao315/deepseek-harness',
    area: 'Agent',
  },
  {
    name: 'GPUStack',
    note: 'GPU 集群与推理引擎编排的上游项目研究。',
    githubUrl: 'https://github.com/zhubao315/gpustack',
    area: 'AI Infra',
  },
  {
    name: 'Cube Studio',
    note: '云原生机器学习平台与 MLOps 架构研究。',
    githubUrl: 'https://github.com/zhubao315/cube-studio',
    area: 'MLOps',
  },
  {
    name: 'KubeSphere',
    note: 'Kubernetes 多集群与云原生平台研究。',
    githubUrl: 'https://github.com/zhubao315/kubesphere',
    area: 'Cloud Native',
  },
  {
    name: 'Flowise',
    note: '可视化 LLM 编排工具的上游研究。',
    githubUrl: 'https://github.com/zhubao315/Flowise',
    area: 'LLM Tooling',
  },
  {
    name: 'FastChat',
    note: '大模型训练、服务与评测平台的源码研究。',
    githubUrl: 'https://github.com/zhubao315/FastChat',
    area: 'LLM Serving',
  },
  {
    name: 'AgentTuning',
    note: 'Agent 能力微调方向的论文与代码研究。',
    githubUrl: 'https://github.com/zhubao315/AgentTuning',
    area: 'Agent',
  },
  {
    name: 'Learn Agentic AI',
    note: 'Agentic AI 学习路径与笔记，来自上游仓库。',
    githubUrl: 'https://github.com/zhubao315/learn-agentic-ai',
    area: 'Learning',
  },
  {
    name: 'Awesome Nano Banana Images',
    note: 'AI 图像案例收藏与提示词观察，上游项目 Fork。',
    githubUrl: 'https://github.com/zhubao315/Awesome-Nano-Banana-images',
    area: 'AI Image',
  },
  {
    name: 'Cherry Studio',
    note: '多模型桌面客户端的交互与架构研究。',
    githubUrl: 'https://github.com/zhubao315/cherry-studio',
    area: 'AI Product',
  },
  {
    name: 'ApeRAG',
    note: '上游研究（Fork，未发现本人修改证据）：ApeRAG: Best choice for building your own Knowledge Graph and for Context Engineering',
    githubUrl: 'https://github.com/zhubao315/ApeRAG',
    area: 'AI & Infra',
  },
  {
    name: 'Auto-GPT',
    note: '上游研究（Fork，未发现本人修改证据）：An experimental open-source attempt to make GPT-4 fully autonomous.',
    githubUrl: 'https://github.com/zhubao315/Auto-GPT',
    area: 'AI & Infra',
  },
  {
    name: 'ChatDev',
    note: '上游研究（Fork，未发现本人修改证据）：Create Customized Software using Natural Language Idea (through Multi-Agent Collaboration)',
    githubUrl: 'https://github.com/zhubao315/ChatDev',
    area: 'AI & Infra',
  },
  {
    name: 'co-mate',
    note: '上游研究（Fork，未发现本人修改证据）：Co-mate is an AI-powered architecture copilot, design and governance tools.',
    githubUrl: 'https://github.com/zhubao315/co-mate',
    area: 'AI & Infra',
  },
  {
    name: 'DevOpsGPT',
    note: '上游研究（Fork，未发现本人修改证据）：Multi agent system for AI-driven software development. Convert natural language requirements into working soft',
    githubUrl: 'https://github.com/zhubao315/DevOpsGPT',
    area: 'AI & Infra',
  },
  {
    name: 'docker_image_pusher',
    note: '二次开发（本地存在本人提交）：使用Github Action将国外的Docker镜像转存到阿里云私有仓库，供国内服务器使用，免费易用',
    githubUrl: 'https://github.com/zhubao315/docker_image_pusher',
    area: 'AI & Infra',
      sourceType: 'modified',
  },
  {
    name: 'DockerTarBuilder',
    note: '上游研究（Fork，未发现本人修改证据）：它是一个工作流。可快速构建指定架构/平台的docker镜像',
    githubUrl: 'https://github.com/zhubao315/DockerTarBuilder',
    area: 'AI & Infra',
  },
  {
    name: 'fabric',
    note: '上游研究（Fork，未发现本人修改证据）：Hyperledger Fabric is an enterprise-grade permissioned distributed ledger framework for developing solutions a',
    githubUrl: 'https://github.com/zhubao315/fabric',
    area: 'AI & Infra',
  },
  {
    name: 'fabric-prompt',
    note: '上游研究（Fork，未发现本人修改证据）：fabric is an open-source framework for augmenting humans using AI. It provides a modular framework for solving',
    githubUrl: 'https://github.com/zhubao315/fabric-prompt',
    area: 'AI & Infra',
  },
  {
    name: 'GitHubPoster',
    note: '上游研究（Fork，未发现本人修改证据）：Make everything a GitHub svg poster and Skyline!',
    githubUrl: 'https://github.com/zhubao315/GitHubPoster',
    area: 'AI & Infra',
  },
  {
    name: 'grok-build',
    note: '上游研究（Fork，未发现本人修改证据）：SpaceXAI\'s coding agent harness and TUI. Fullscreen, mouse interactive, extensible.',
    githubUrl: 'https://github.com/zhubao315/grok-build',
    area: 'Quantified',
  },
  {
    name: 'kubezoo',
    note: '上游研究（Fork，未发现本人修改证据）：a lightweight kubernetes multi-tenancy gateway',
    githubUrl: 'https://github.com/zhubao315/kubezoo',
    area: 'AI & Infra',
  },
  {
    name: 'langflow',
    note: '上游研究（Fork，未发现本人修改证据）：⛓️ LangFlow is a UI for LangChain, designed with react-flow to provide an effortless way to experiment and pro',
    githubUrl: 'https://github.com/zhubao315/langflow',
    area: 'AI & Infra',
  },
  {
    name: 'leapp',
    note: '上游研究（Fork，未发现本人修改证据）：library to quickly export and deploy entire inference pipelines',
    githubUrl: 'https://github.com/zhubao315/leapp',
    area: 'AI & Infra',
  },
  {
    name: 'newton',
    note: '上游研究（Fork，未发现本人修改证据）：An open-source, GPU-accelerated physics simulation engine built upon NVIDIA Warp, specifically targeting robot',
    githubUrl: 'https://github.com/zhubao315/newton',
    area: 'AI & Infra',
  },
  {
    name: 'Open-Assistant',
    note: '上游研究（Fork，未发现本人修改证据）：OpenAssistant is a chat-based assistant that understands tasks, can interact with third-party systems, and ret',
    githubUrl: 'https://github.com/zhubao315/Open-Assistant',
    area: 'AI & Infra',
  },
  {
    name: 'open_llama',
    note: '上游研究（Fork，未发现本人修改证据）：OpenLLaMA, a permissively licensed open source reproduction of Meta AI’s LLaMA 7B trained on the RedPajama dat',
    githubUrl: 'https://github.com/zhubao315/open_llama',
    area: 'AI & Infra',
  },
  {
    name: 'openclaude',
    note: '上游研究（Fork，未发现本人修改证据）：runs anywhere. uses anything',
    githubUrl: 'https://github.com/zhubao315/openclaude',
    area: 'AI & Infra',
  },
  {
    name: 'OpenLLM',
    note: '上游研究（Fork，未发现本人修改证据）：An open platform for operating large language models(LLMs) in production. Fine-tune, serve, deploy, and monito',
    githubUrl: 'https://github.com/zhubao315/OpenLLM',
    area: 'AI & Infra',
  },
  {
    name: 'orawatch',
    note: '上游研究（Fork，未发现本人修改证据）：仓库未提供描述',
    githubUrl: 'https://github.com/zhubao315/orawatch',
    area: 'AI & Infra',
  },
  {
    name: 'pigsty',
    note: '上游研究（Fork，未发现本人修改证据）：Pigsty - Battery-Included Open-Source Distribution for PostgreSQL',
    githubUrl: 'https://github.com/zhubao315/pigsty',
    area: 'AI & Infra',
  },
  {
    name: 'portainer',
    note: '上游研究（Fork，未发现本人修改证据）：Making Docker and Kubernetes management easy.',
    githubUrl: 'https://github.com/zhubao315/portainer',
    area: 'AI & Infra',
  },
  {
    name: 'portainer-templates',
    note: '上游研究（Fork，未发现本人修改证据）：🚢 400+ 1-click Portainer app templates',
    githubUrl: 'https://github.com/zhubao315/portainer-templates',
    area: 'AI & Infra',
  },
  {
    name: 'Python-Core-50-Courses',
    note: '上游研究（Fork，未发现本人修改证据）：Python语言基础50课',
    githubUrl: 'https://github.com/zhubao315/Python-Core-50-Courses',
    area: 'AI & Infra',
  },
  {
    name: 'QueryGPT',
    note: '上游研究（Fork，未发现本人修改证据）：基于Langchain 的自然语言表格数据查询工具 A Natural Language Tabular Data Query Tool based on Langchain',
    githubUrl: 'https://github.com/zhubao315/QueryGPT',
    area: 'AI & Infra',
  },
  {
    name: 'stable-diffusion-webui',
    note: '上游研究（Fork，未发现本人修改证据）：Stable Diffusion web UI',
    githubUrl: 'https://github.com/zhubao315/stable-diffusion-webui',
    area: 'AI & Infra',
  },
  {
    name: 'stable-diffusion-webui-docker',
    note: '上游研究（Fork，未发现本人修改证据）：Easy Docker setup for Stable Diffusion with user-friendly UI',
    githubUrl: 'https://github.com/zhubao315/stable-diffusion-webui-docker',
    area: 'AI & Infra',
  },
  {
    name: 'substrate',
    note: '上游研究（Fork，未发现本人修改证据）：Substrate: The platform for blockchain innovators',
    githubUrl: 'https://github.com/zhubao315/substrate',
    area: 'AI & Infra',
  },
];

export interface LifeSite {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  href: string;
  githubUrl: string;
  stat: string;
  unit: string;
  secondary: string;
  accent: string;
  image?: ImageMetadata;
}

export const lifeSites: LifeSite[] = [
  {
    id: 'health',
    name: 'HEALTH',
    nameZh: '健康',
    description: '睡眠结构、夜间 HRV、静息心率、压力与训练负荷。',
    href: 'https://zhubao315.github.io/health/',
    githubUrl: 'https://github.com/zhubao315/health',
    stat: '1,054',
    unit: '天数据',
    secondary: '11 项指标 · 每日同步 · 2026-11-26',
    accent: 'cyan',
    image: healthCover,
  },
  {
    id: 'running',
    name: 'RUNNING',
    nameZh: '跑步',
    description: 'GPS 轨迹、配速、心率与 3D 地形，记录每一次出发。',
    href: 'https://zhubao315.github.io/running/',
    githubUrl: 'https://github.com/zhubao315/running',
    stat: '2,044',
    unit: '次跑步',
    secondary: '24,660 km · 2015–2026 · 2026-11-26',
    accent: 'lime',
    image: runningCover,
  },
  {
    id: 'cycling',
    name: 'CYCLING',
    nameZh: '骑行',
    description: '路线、速度、爬升与年度趋势，用两轮丈量城市与郊野。',
    href: 'https://zhubao315.github.io/cycling/',
    githubUrl: 'https://github.com/zhubao315/cycling',
    stat: '5,808',
    unit: '次骑行',
    secondary: '45,549 km · 135,316 m 爬升 · 2026-11-26',
    accent: 'orange',
    image: cyclingCover,
  },
  {
    id: 'hiking',
    name: 'HIKING',
    nameZh: '徒步',
    description: '山野足迹、海拔剖面与可交互的 3D 地形。',
    href: 'https://zhubao315.github.io/hiking/',
    githubUrl: 'https://github.com/zhubao315/hiking',
    stat: '344',
    unit: '次徒步',
    secondary: '2,694 km · 53,014 m 爬升',
    accent: 'green',
  },
];

export const publications = [
  {
    id: 'knowledge-base-engineering-book',
    index: '01',
    title: '知识库工程学',
    subtitle: '从收藏到可治理的知识系统',
    type: '书稿 · 方法论',
    status: '持续迭代',
    description:
      '围绕知识库健康诊断、内容准入、语义拓扑、度量审计与长期运营展开的工程架构。配套 AI Skill 已独立开源。',
    facts: ['13 章工程架构', '5 个附录', '配套 Skill v1.2.0'],
    href: 'https://github.com/zhubao315/knowledge-base-engineering-skill',
    linkLabel: '查看配套 Skill',
    coverClass: 'book--navy',
  },
  {
    id: 'investment-discipline-book',
    index: '02',
    title: '投资的纪律',
    subtitle: '从情绪交易到纪律复利',
    type: '书稿 · 方法论',
    status: '配套 Skill 已开源',
    description:
      '把投资研究、数据校验、风险边界与复盘变成可以执行的清单。书稿状态以作者公开信息为准，不标示发行信息。',
    facts: ['8 种任务模式', '45 项结构校验', '63 项单元测试'],
    href: 'https://github.com/zhubao315/investment-discipline',
    linkLabel: '查看配套 Skill',
    coverClass: 'book--gold',
  },
  {
    id: 'ai-era-learning-book',
    index: '03',
    title: 'AI时代，如何真正学会',
    subtitle: '在工具之外，重建学习的纪律',
    type: '书稿 · 方法论',
    status: '创作中 · 无公开载体',
    description:
      '把阅读、笔记、复盘与跨域连接写成一套可复跑的学习方法。书稿仍在修订，公开可见的是相关方法论站点，不标示发行信息。',
    facts: ['对应 e-Life 方法论', '状态以作者公开信息为准'],
    href: 'https://github.com/zhubao315/e-life-method',
    linkLabel: '查看相关方法论',
    coverClass: 'book--teal',
  },
  {
    id: 'one-in-a-thousand-book',
    index: '04',
    title: '千分之一的你',
    subtitle: '64 型人格与稀有度的视觉书稿',
    type: '书稿 · 人格探索',
    status: '视觉与审校阶段',
    description:
      '把 64 型人格与稀有度体系写成可阅读的书稿，配合 MBTI64 的型别页与视觉稿持续修订。',
    facts: ['关联 MBTI64 项目', '视觉 / 审校阶段'],
    href: 'https://github.com/zhubao315/mbti64',
    linkLabel: '查看关联测评站',
    coverClass: 'book--violet',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
