export const auditMeta = {
  repo: 'zhubao315/uSkill',
  repoUrl: 'https://github.com/zhubao315/uSkill',
  date: '2026-11-12',
  overall: 58,
  scope: '仓库结构、核心代码、Schema、技能样本、测试、CI/CD 与文档',
  nature: '基于公开主分支的主观工程审计，不是自动化基准测试',
} as const;

export interface AuditScore {
  index: string;
  label: string;
  en: string;
  score: number;
  note: string;
}

export const scores: AuditScore[] = [
  {
    index: '01',
    label: '项目定位与方法论',
    en: 'Positioning',
    score: 82,
    note: '“驾驭工程”与 SOP 溯源的方向清楚，但对外表达已经跑在实现前面。',
  },
  {
    index: '02',
    label: '代码结构与模块化',
    en: 'Architecture',
    score: 68,
    note: '核心模块已经分开，但 Schema、执行、检索与适配的职责边界还没有收口。',
  },
  {
    index: '03',
    label: '技能标准与跨平台兼容',
    en: 'Standards',
    score: 35,
    note: '仍是自定义 YAML；没有原生读取、校验、导入或导出 SKILL.md。',
  },
  {
    index: '04',
    label: 'AI 转换能力',
    en: 'Authoring',
    score: 52,
    note: '有 LLM 转换雏形，但缺少结构化输出约束、失败报告与独立审核。',
  },
  {
    index: '05',
    label: '执行引擎与编排',
    en: 'Runtime',
    score: 32,
    note: '一次 Chat Completions 调用不等于运行时；组合技能没有真实调度。',
  },
  {
    index: '06',
    label: '评测与质量保障',
    en: 'Evaluation',
    score: 28,
    note: '测试覆盖基础路径，但没有任务成功率、触发准确率与基线对照。',
  },
  {
    index: '07',
    label: '安全与治理',
    en: 'Governance',
    score: 38,
    note: 'control 字段记录了意图，但权限、审批、审计与沙箱没有在执行层兑现。',
  },
  {
    index: '08',
    label: '文档与开发者体验',
    en: 'Developer experience',
    score: 60,
    note: '内容基础不差，但项目名称、版本、链接与发布状态互相矛盾。',
  },
];

export const verdicts = [
  {
    label: 'KEEP',
    title: '保留',
    items: ['驾驭工程的问题意识', 'SOP 与来源的可追溯性', 'control / source 的治理方向', 'Python 核心与 YAML 资产'],
  },
  {
    label: 'FIX',
    title: '补足',
    items: ['Agent Skills 开放标准', '真正可恢复的 Runtime', '独立、可复跑的 Evals', '统一版本与发布工程'],
  },
  {
    label: 'AVOID',
    title: '避免',
    items: ['推倒重写已有资产', '在没有评测前建市场', '让生成模型自证质量', '把工具调用交给 Prompt 约束'],
  },
] as const;

export type ModuleTone = 'keep' | 'watch' | 'gap';

export interface AuditModule {
  code: string;
  name: string;
  present: string;
  assessment: string;
  tone: ModuleTone;
}

export const modules: AuditModule[] = [
  {
    code: '01',
    name: 'Schema',
    present: 'Pydantic V2 模型、JSON Schema 导出',
    assessment: '有基础；参数类型与 Schema 方言仍需收紧',
    tone: 'watch',
  },
  {
    code: '02',
    name: 'Validator',
    present: 'YAML / JSON 加载、基础字段校验',
    assessment: '能跑通；模板变量与语义检查未进入主流程',
    tone: 'watch',
  },
  {
    code: '03',
    name: 'Converter',
    present: '规则式 SOP 拆分',
    assessment: '可用；会丢失背景、分支与审批约束',
    tone: 'watch',
  },
  {
    code: '04',
    name: 'AI Converter',
    present: 'LLM 生成技能雏形',
    assessment: '方向对；失败被打印后跳过，缺少转换报告',
    tone: 'gap',
  },
  {
    code: '05',
    name: 'Executor',
    present: 'OpenAI Chat Completions 单次调用',
    assessment: '能执行 Prompt；不是可调度、可恢复的 Runtime',
    tone: 'gap',
  },
  {
    code: '06',
    name: 'Indexer',
    present: '按 SOP 来源生成目录与统计',
    assessment: '有索引；没有依赖、重复与意图匹配',
    tone: 'watch',
  },
  {
    code: '07',
    name: 'CLI',
    present: 'validate / convert / schema / index / stats',
    assessment: '覆盖主干；缺少 run / eval / import / export',
    tone: 'watch',
  },
  {
    code: '08',
    name: 'Adapter',
    present: 'LangChain、OpenAI Function Spec',
    assessment: '原型；转换的是描述，不是可执行工具',
    tone: 'gap',
  },
  {
    code: '09',
    name: 'Tests',
    present: '3 个测试文件',
    assessment: '基础回归；没有执行器、适配器与组合流程',
    tone: 'gap',
  },
  {
    code: '10',
    name: 'CI / CD',
    present: 'GitHub Actions、MkDocs Pages',
    assessment: '有自动化；缺少矩阵、包安装、安全与评测',
    tone: 'watch',
  },
];

export interface Blocker {
  index: string;
  title: string;
  severity: string;
  summary: string;
  evidence: string[];
  action: string;
  snippet?: string;
}

export const blockers: Blocker[] = [
  {
    index: '01',
    title: '名字、版本和发布对不上',
    severity: 'P0 / TRUST',
    summary: '这是最便宜、也最影响可信度的修复。一个项目连自己的名字和版本都不一致，后面的能力声明就很难被认真对待。',
    evidence: [
      '仓库叫 uSkill，但 README、pyproject、文档与示例里大量地址仍指向 uSkills。',
      'README 写 Version 1.1.0，Release 记录却只看到 v0.0.1 与 v0.1.0-preview.1。',
      'Build Passing 是手工静态徽章，不反映当前 GitHub Actions 状态。',
    ],
    action: '让仓库名、包名、CLI、文档域名与徽章使用同一套命名；版本只保留一个来源，并与 Tag、CHANGELOG、Release 对齐。',
    snippet: 'uSkill  !=  uSkills\nREADME 1.1.0  !=  release v0.1.0-preview.1',
  },
  {
    index: '02',
    title: '自定义 Schema 没有接上开放标准',
    severity: 'P0 / STANDARD',
    summary: 'Agent Skills 已经形成跨平台目录约定。uSkill 不应该用另一套格式去替代它，而应该成为它上面的治理增强层。',
    evidence: [
      '当前技能使用 skill_id + meta + input + execute + output + control + source 的自定义 YAML。',
      '仓库没有原生 SKILL.md 技能目录，也没有针对官方规范的验证、导入或导出能力。',
      '这会让已有 Agent Skills 资产必须放弃原格式，才能进入 uSkill。',
    ],
    action: '建立双层标准：Agent Skills 负责发现、加载与可移植；uSkill Manifest 负责参数契约、执行策略、权限、溯源与评测。',
    snippet: 'skill-name/\n├── SKILL.md          # 开放标准入口\n├── uskill.yaml       # 治理增强层\n├── references/\n├── scripts/\n└── evals/',
  },
  {
    index: '03',
    title: 'Executor 兑现不了 control',
    severity: 'P0 / RUNTIME',
    summary: 'Schema 里写了 timeout、retry、interrupt，执行器却只做一次模型调用。这不是“能力还不完整”，而是声明与行为脱节。',
    evidence: [
      'timeout、retry、interrupt 等控制字段没有在 Executor 中实现。',
      'steps 没有形成可调度的状态机；tools 没有运行时权限边界。',
      'content_pipeline 声明了关键词提取、摘要、翻译三个子技能，但 Executor 不会真正调度它们。',
    ],
    action: '先做确定性运行时：Provider Protocol、Tool Registry、Workflow DAG、状态机、超时/重试/取消、检查点与人工审批。适配器只调用同一套核心。',
    snippet: 'PENDING → READY → RUNNING\n                 ├── COMPLETED\n                 ├── FAILED\n                 ├── WAITING_APPROVAL\n                 ├── INTERRUPTED\n                 └── RETRYING',
  },
  {
    index: '04',
    title: '校验与生成缺少可靠性',
    severity: 'P0 / VALIDATION',
    summary: '单个校验函数没接入主流程、无效候选被静默跳过、提示约束与返回结构不一致——这些问题叠加起来，会让规模化导入变得不可信。',
    evidence: [
      'validate_template_variables() 已存在，但 validate_skill_file() 没有把它纳入完整校验。',
      'SkillParam.type 是自由字符串，而不是严格类型或 JSON Schema。',
      'AIConverter 打印错误后跳过无效技能，调用方可能只拿到空数组。',
      '要求返回 JSON 数组，却使用 json_object 响应格式；source 必填也阻碍独立技能复用。',
      'JSON Schema 手动标记 Draft-07，与 Pydantic V2 默认生成的方言不一致。',
    ],
    action: '把变量、类型、语义和 Schema 方言纳入同一条验证链；AI 转换返回机器可读的候选、错误与丢失字段报告；source 改为可选并保留 provenance。',
    snippet: 'validate_skill_file()\n  ├── parse\n  ├── structure\n  ├── template variables   ← 尚未接入\n  ├── semantic rules\n  └── schema dialect',
  },
];

export const overviewIssues = [
  {
    index: '01',
    label: 'RUNTIME',
    title: 'Python 与开源发布还不够规范',
    body: '最低版本仍写 3.10，而它已经结束生命周期；仓库声明 MIT，却没有 LICENSE；CHANGELOG、依赖锁定、wheel 安装测试与 SBOM 也未形成闭环。',
    action: '最低支持 3.11，建立多版本 CI、真实许可证、Tag / Release / CHANGELOG、依赖扫描与构建安装测试。',
  },
  {
    index: '02',
    label: 'PARSER',
    title: 'SOP 解析会丢掉原始信息',
    body: 'extract_steps() 发现编号列表或项目符号后只返回列表项。开头的背景约束、结尾的审批要求、分支与异常条件都可能消失。',
    action: '建立 SOP AST：标题、段落、嵌套列表、表格、条件、分支、异常、审批、前后置条件；每个生成步骤保留原文片段与双向溯源。',
  },
  {
    index: '03',
    label: 'REGISTRY',
    title: 'Indexer 还不是检索系统',
    body: '只扫描 .yaml，不覆盖 .yml / .json；没有依赖、重复、冲突版本、过期状态与意图匹配。',
    action: '先做名称、描述、标签、领域与关键词的结构化索引；技能库还小时，不要提前引入向量数据库。',
  },
  {
    index: '04',
    label: 'ADAPTER',
    title: 'Adapter 转换的是描述，不是工具',
    body: 'LangChainAdapter 主要生成工具说明；to_function_spec() 对 object、array 等参数没有完整构建嵌套 JSON Schema，也没有执行与输入校验。',
    action: '所有适配器统一调用核心运行时。OpenAI、MCP、LangChain、CLI、Python SDK 都只是入口，不是第五套执行逻辑。',
  },
  {
    index: '05',
    label: 'EVIDENCE',
    title: '测试证明不了项目定位',
    body: '只有 converter、validator 与 schema 三个测试文件。没有 AIConverter、Executor、Indexer、Adapter、组合技能、恢复与安全测试。',
    action: '用 Mock Provider 建立执行器契约测试；补充集成、兼容、安全与评测套件；每个发布技能都要有独立评测依据。',
  },
] as const;

export interface Trend {
  index: string;
  en: string;
  title: string;
  body: string;
  link?: string;
  linkLabel?: string;
}

export const trends: Trend[] = [
  {
    index: '01',
    en: 'Open standard',
    title: 'Agent Skills 已是开放标准',
    body: 'Agent Skills 于 2026 年 10 月捐赠给 Linux Foundation 下的 Agentic AI Foundation。SKILL.md 目录成为跨平台可移植的事实入口，uSkill 没有理由与之竞争。',
    link: 'https://agentskills.io/specification',
    linkLabel: 'Agent Skills specification',
  },
  {
    index: '02',
    en: 'MCP × Skills',
    title: 'MCP 接工具，Skill 传流程',
    body: 'MCP 负责连接外部工具、数据与服务；Skill 负责描述完成任务所需的流程、经验和边界。Runtime 把两者组合起来，而不是把数据库或浏览器硬编码进每个技能。',
    link: 'https://modelcontextprotocol.io/',
    linkLabel: 'Model Context Protocol',
  },
  {
    index: '03',
    en: 'Lean context',
    title: '模型变强后，Skill 应该更精简',
    body: '描述太长会降低技能选择准确率；重复或矛盾的 Skill 会增加误触发。主文件保持轻量，细节放进 references，需要确定性时使用 scripts，而不是继续堆 Prompt。',
  },
  {
    index: '04',
    en: 'Agent runtime',
    title: '从一次调用升级为受控运行时',
    body: 'Responses API、function calling、远程 MCP、结构化输出与多步工作流正在成为默认能力。核心 Schema 不应绑定某个模型名称；模型由部署配置与 Provider Profile 决定。',
    link: 'https://platform.openai.com/docs/api-reference/responses',
    linkLabel: 'OpenAI Responses API',
  },
  {
    index: '05',
    en: 'Evidence',
    title: '技能价值必须被独立评测',
    body: 'SkillsBench 覆盖 86 个任务、11 个领域与 7 种 Agent–Model 配置：经过整理的 Skills 平均提升 16.2 个百分点，但不同领域差异明显，模型自行生成的 Skills 平均没有收益。',
    link: 'https://arxiv.org/abs/2602.12670',
    linkLabel: 'SkillsBench paper',
  },
];

export const layers = [
  {
    index: '01',
    title: 'Skill Authoring',
    zh: '技能生产',
    body: 'SOP 解析、AI 创建、编辑、模板与迁移。输出候选技能与转换报告，不直接发布。',
  },
  {
    index: '02',
    title: 'Skill Standards',
    zh: '双层标准',
    body: 'Agent Skills 负责可移植；uSkill Manifest 负责类型、策略、权限、溯源与评测。',
  },
  {
    index: '03',
    title: 'Skill Registry',
    zh: '技能注册表',
    body: '索引、搜索、版本、依赖、去重与发现。先把结构化检索做好，再考虑语义检索。',
  },
  {
    index: '04',
    title: 'Skill Runtime',
    zh: '受控运行时',
    body: 'Provider、Tool Registry、MCP、Workflow DAG、执行状态、人工审批与恢复。',
  },
  {
    index: '05',
    title: 'Skill Governance',
    zh: '治理',
    body: '权限分级、敏感操作审批、审计、来源、校验和与回滚。默认最小权限。',
  },
  {
    index: '06',
    title: 'Skill Evaluation',
    zh: '证据',
    body: '数据集、确定性 grader、No-Skill 基线、回归测试与质量报告。生成者不能自证。',
  },
] as const;

export interface Phase {
  index: string;
  priority: string;
  title: string;
  en: string;
  focus: string;
  acceptance: string;
}

export const phases: Phase[] = [
  {
    index: '00',
    priority: 'P0',
    title: '工程修复',
    en: 'Foundation',
    focus: '统一名称、版本与 License；升级 Python；修复 Schema 方言与变量校验；补测试、wheel 构建与 CI 矩阵。',
    acceptance: '旧 YAML 继续可读；CLI 不无故破坏；所有声明的当前能力都有测试证据。',
  },
  {
    index: '01',
    priority: 'P0',
    title: '标准升级',
    en: 'Standards',
    focus: '原生读取 SKILL.md；校验 name / description / 目录；支持 references、scripts、assets；双向转换与安装目标。',
    acceptance: '官方规范校验通过；迁移后核心语义不变；不支持的 uSkill 扩展有明确报告。',
  },
  {
    index: '02',
    priority: 'P1',
    title: '执行引擎',
    en: 'Runtime',
    focus: 'Provider Protocol、单技能执行、Tool Registry、MCP、Workflow DAG、超时/重试/取消、检查点与人工审批。',
    acceptance: 'content_pipeline 通过真实 DAG 调度子技能；Mock Provider 覆盖成功、失败、恢复与权限拒绝。',
  },
  {
    index: '03',
    priority: 'P1',
    title: '质量与治理',
    en: 'Evaluation',
    focus: '评测数据集、正向/负向触发、确定性断言、No-Skill 基线、安全测试、审计与发布门槛。',
    acceptance: '每个正式技能都有版本化评测与报告；关键指标退化时阻止发布。',
  },
  {
    index: '04',
    priority: 'P2',
    title: '技能生态',
    en: 'Ecosystem',
    focus: '依赖图、搜索、版本兼容矩阵、签名与校验和、质量评分、安装与私有仓库分发。',
    acceptance: '技能可被发现、安装、升级与回滚；没有可信执行与评测前，不建设开放市场。',
  },
];

export const qualityMetrics = [
  { metric: 'Trigger Precision', zh: '触发精确率', meaning: '技能被正确触发的比例' },
  { metric: 'Trigger Recall', zh: '触发召回率', meaning: '应该触发时成功触发的比例' },
  { metric: 'Task Success Rate', zh: '任务成功率', meaning: '真实任务完成的比例' },
  { metric: 'Output Validity', zh: '输出有效性', meaning: '输出通过 Schema 验证的比例' },
  { metric: 'Instruction Compliance', zh: '约束遵循率', meaning: '是否遵守技能关键约束' },
  { metric: 'Safety Pass Rate', zh: '安全通过率', meaning: '是否通过安全与权限测试' },
  { metric: 'Token Cost', zh: 'Token 成本', meaning: '每次成功任务的平均成本' },
  { metric: 'Regression Rate', zh: '回归率', meaning: '新版本引入的任务退化比例' },
] as const;

export const releaseGates = [
  '结构校验 100% 通过',
  '无严重安全问题',
  '触发精确率达到 90%',
  '输出 Schema 合规率达到 99%',
  '相对 No-Skill 基线无显著退化',
] as const;
