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
    tech: ['Python 3.10+', 'YAML / JSON Schema', 'CLI', 'OpenAI-compatible APIs'],
    githubUrl: 'https://github.com/zhubao315/uSkill',
    metrics: [
      { value: '4', label: '项能力属性', note: '可驾驭 / 复用 / 调用 / 迭代' },
      { value: 'v1.1', label: '当前版本', note: 'AI 转换与原生执行器' },
      { value: '0', label: '部署依赖', note: '开源与本地优先' },
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
        '提供统一 Schema、CLI、Python 接口和原生 Skill Executor。',
        '支持将非结构化 SOP 转换为 YAML / JSON 定义的 Skills。',
        'V1.1 增加多模型适配与标准化视觉识别，文档随仓库维护。',
      ],
      boundaries: [
        '当前公开文档站点未上线，使用说明以 GitHub 仓库 README 为准。',
        'V1.1 的 AI 转换与执行器仍标记为 Beta，适用边界以仓库说明为准。',
      ],
    },
    lastVerified: '2026-11-11',
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
    lastVerified: '2026-11-11',
  },
  {
    id: 'quantified-life',
    slug: 'quantified-life',
    name: 'Quantified Life',
    nameZh: '量化生活',
    category: 'quantified',
    status: 'active',
    sourceType: 'original',
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
      { value: '1,039', label: '天健康数据', note: '2023-12 起，截至 2026-11-11' },
      { value: '3,315', label: '条运动记录', note: '健康仓库同步记录' },
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
    sourceNote:
      'Health、Cycling、Hiking 为非 Fork 仓库；Running 的 GitHub 元数据为 Fork，但页面与数据管道已深度改造为个人跑步档案，故在本作品集中作为二次开发标注。',
    lastVerified: '2026-11-11',
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
    nameZh: '深度阅读与知识沉淀',
    category: 'knowledge',
    status: 'active',
    sourceType: 'original',
    featured: false,
    tagline: '让每一次阅读，都留下可生长的沉淀。',
    summary: '围绕读书笔记、精选书单与知识卡片构建的轻量阅读产品。',
    description:
      '一个基于 GitHub Pages 与 Agent-friendly 结构化资产的深度阅读笔记产品，尝试把阅读输入、结构化沉淀、原子化复用与体系化联动连成闭环。',
    tech: ['TypeScript', 'React', 'Tailwind CSS', 'GitHub Pages'],
    githubUrl: 'https://github.com/zhubao315/uRead',
    demoUrl: 'https://zhubao315.github.io/uRead/',
    demoLabel: '在线体验',
    lastVerified: '2026-11-11',
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
    stat: '1,039',
    unit: '天数据',
    secondary: '11 项指标 · 每日同步',
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
    stat: '2,037',
    unit: '次跑步',
    secondary: '24,548 km · 2015–2026',
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
    stat: '5,776',
    unit: '次骑行',
    secondary: '45,291 km · 134,659 m 爬升',
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
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
