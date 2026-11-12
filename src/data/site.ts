export const site = {
  name: 'ZHUBAO',
  nameZh: '朱宝',
  title: '朱宝 ZHUBAO | AI 工程 · 数字产品 · 知识工程',
  description:
    '朱宝的个人数字作品集：AI 与 Agent 工程、数字产品、知识工程、投资研究，以及由长期运动与健康数据构成的量化生活实践。',
  url: 'https://zhubao315.github.io',
  lang: 'zh-CN',
  locale: 'zh_CN',
  location: '北京 · UTC+8',
  github: 'https://github.com/zhubao315',
  x: 'https://x.com/zhubao315',
  avatar: '/images/avatar.webp',
  ogImage: '/og-default.png',
  tagline: 'Build Systems. Engineer Knowledge. Explore Life.',
  taglineZh: '把想法变成系统，把知识沉淀为资产，把生活记录成可持续的实践。',
  repoCount: 61,
  nonForkCount: 24,
  forkCount: 37,
  lastVerified: '2026-11-11',
};

export const nav = [
  { label: '首页', en: 'HOME', href: '/' },
  { label: '作品', en: 'WORK', href: '/work/' },
  { label: '思考', en: 'THINK', href: '/think/' },
  { label: '探索', en: 'EXPLORE', href: '/explore/' },
  { label: '关于', en: 'ABOUT', href: '/about/' },
];

export const directions = [
  {
    code: 'BUILD',
    index: '01',
    title: '构建系统',
    en: 'Build Systems',
    description: 'AI、Agent、Skills、软件架构与云原生基础设施。把方法做成可运行、可治理的系统。',
    href: '/work/?filter=agent',
    accent: 'sky',
  },
  {
    code: 'THINK',
    index: '02',
    title: '探索认知',
    en: 'Engineer Knowledge',
    description: '知识工程、投资研究与持续学习。让信息经过结构、证据与纪律，变成可调用的资产。',
    href: '/think/',
    accent: 'gold',
  },
  {
    code: 'MEASURE',
    index: '03',
    title: '量化生活',
    en: 'Measure Life',
    description: '健康、跑步、骑行与徒步。用十多年的个人数据，记录身体与时间的关系。',
    href: '/explore/#quantified-life',
    accent: 'cyan',
  },
  {
    code: 'CREATE',
    index: '04',
    title: '创造作品',
    en: 'Create Things',
    description: '数字产品、人格探索与 AI 动画。把抽象的想法变成可以体验、观看和分享的作品。',
    href: '/explore/',
    accent: 'coral',
  },
];

export const principles = [
  {
    index: '01',
    title: '先定义问题，再选择工具',
    body: '工具会过时，问题不会。先确认边界、证据和验收方式，再决定要不要引入新的框架。',
  },
  {
    index: '02',
    title: '可验证，比看起来聪明更重要',
    body: '让结果能被复跑、被审计、被回滚。对数据缺失、证据不足和失败路径保持诚实。',
  },
  {
    index: '03',
    title: '把经验沉淀成系统',
    body: '一次性的 Prompt 是消耗品；可复用、可调用、可迭代的 Skill 才是资产。',
  },
  {
    index: '04',
    title: '长期记录，持续复利',
    body: '身体、知识和作品都需要时间尺度。可信的长期数据，比任何单点高光更有价值。',
  },
];
