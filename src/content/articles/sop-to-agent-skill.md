---
title: 如何把一份 SOP 转成可执行的 Agent Skill？
description: 用 uSkill 的 convert 与 Builder 把非结构化 SOP 变成双层技能草稿：保留标题、约束与嵌套细节，生成评测用例，再由人工评审发布。
date: 2026-11-26
author: ZHUBAO
keywords: ['SOP', 'Agent Skill', 'uskills convert', '技能构建']
project: uSkill
category: agent
---

## 直接答案

先用规则式解析把 SOP 的标题、约束、嵌套和表格结构化，生成 `drafts/` 里的技能候选与评测用例草稿；再人工评审契约、权限与风险等级；最后才用 `uskills build` / `uskills migrate` 形成正式双层技能。**转换永远不会自动发布**——这是 uSkill 的硬约束。

## 为什么不能直接把 SOP 丢给模型

一份真实 SOP 往往包含隐含结构：哪些是必填条件、哪些步骤有分支、哪些动作不可逆。如果只把它作为一段文本塞进 Prompt，模型会丢失这些边界，输出看似合理但无法校验。

uSkill 的转换分两条路径：

- **规则式结构化解析**：保留标题、约束、嵌套与表格，不丢原文。
- **AI 转换**：用 JSON Schema 约束输出，并产出机器可读的转换报告，标明哪些字段无法表达。

## 实际操作步骤

仓库里附带了两份示例 SOP：`examples/customer_service_sop.md` 和 `examples/skill_creator_governance_sop.md`。可以直接复跑：

```bash
# 1. 体检环境与技能资产
uskills doctor

# 2. 把 SOP 转成草稿候选（不会写入正式技能库）
uskills convert examples/customer_service_sop.md --output drafts/

# 3. 创建标准双层技能目录
uskills init my-skill

# 4. legacy 单文件迁移为双层目录，先看不可表达字段
uskills migrate --dry-run skills/atomic/text_summarize.yaml
```

转换后需要人工确认三件事：输入输出契约是否完整、哪些工具需要授权、评测用例是否覆盖失败路径。

## 运行结果与门禁

2026-11-26 本地执行 `pytest -q`：301 项测试全部通过，其中包含转换、Builder 与评测相关用例。CI 还设置了覆盖率门禁 80% 与 eval 回归门禁（对比 `evals/reports/*.mock-baseline.json`，回归即退出码 1）。

Builder 的产物固定落在 `drafts/`，报告带 `requires_approval`；质量分低于 70 强制复核，提示词中出现密钥字面量直接判零分。这些是**流程约束**，不是"AI 自己判断可以发布"。

## 边界与失败情况

- 转换是启发式的：复杂表格、图或外部系统引用可能无法完整表达，转换报告会列出不可表达字段。
- 评测全绿不等于效果好：CI 基线由 MockProvider 生成，守护的是判分管道未退化。
- 不会生成真实用户反馈或使用数据；项目公开仓库的 Star / Fork 为 0（2026-11-26 GitHub API），本文不宣称社区验证。

## 常见问题

**转换后的草稿会自动上线吗？**
不会。产物在 `drafts/`，带 `requires_approval`，发布必经人工评审。

**需要 API Key 才能转换吗？**
不需要。规则式路径完全离线；AI 转换接入真实模型时才需要 Provider。

## 下一步

阅读 [SOP 转技能案例文档](https://github.com/zhubao315/uSkill/blob/main/docs/skill-creator-case.md) 与 [uSkill 项目页](/work/uskill/)。

## 证据

- 命令与示例：uSkill 仓库 `docs/quickstart.md`、`examples/`，核验于 2026-11-26。
- 门禁与草稿约束：`docs/index.md` FAQ、`docs/audit/`，核验于 2026-11-26。
- 测试结果：`pytest -q` → 301 passed，2026-11-26。

## 未验证

- 真实企业 SOP 的转换成功率：UNVERIFIED —— 需真实样本与人工标注。
- 搜索意图与关键词流量：UNVERIFIED —— 需 GSC / Bing 数据。
