---
title: Agent Skills 是什么？它和普通 Prompt 有什么区别？
description: Agent Skill 是被结构化、可校验、可版本化的能力资产；Prompt 是一次对话里的文本。本文用 uSkill 的双层标准说明两者的边界与适用时机。
date: 2026-11-26
author: ZHUBAO
keywords: ['Agent Skills', 'Prompt', 'SKILL.md', '技能工程']
project: uSkill
category: agent
---

## 直接答案

Agent Skill 是一份**能被 Agent 加载、校验、复用和迭代的能力描述**：它包含触发条件、输入契约、执行步骤、约束、参考资源和评测集。普通 Prompt 是写在一次对话里的文本，依赖当下上下文，结果难以复跑，也无法知道换一个模型后是否仍然成立。二者的差别不在"写得更好"，而在**是否成为可管理的资产**。

## 问题从哪里来

团队里常见的经验沉淀方式是复制一段提示词到文档或聊天记录。它能解决眼前问题，但有三个长期代价：

1. 换模型、换 Agent 之后写法失效，却不知道是哪一步依赖了隐含上下文。
2. 输出没有契约，无法判断"这次结果对不对"，只能靠人肉阅读。
3. 没有版本与评测，改进无法归因，也无法阻止回退。

uSkill 的设计出发点不是"再写一个更好的 Prompt"，而是把方法变成有结构、有边界、有证据的 Skill。

## 可行的方案与边界

开放标准 `SKILL.md` 用 frontmatter 描述 `name` / `description`，正文写步骤，并把领域知识和确定性脚本放到 `references/` 与 `scripts/`，按需加载。它解决的是**跨 Agent 的可移植性**。

uSkill 在这个标准之上增加 `uskill.yaml` 增强契约：类型化输入输出、执行策略、权限、溯源和评测。它解决的是**工程治理**。uSkill 明确不修改开放标准字段，二者冲突时以官方规范为准。

这个边界很重要：`SKILL.md` 是给 Agent 用的，`uskill.yaml` 是给工程系统用的。把增强字段塞进官方 frontmatter 会破坏跨 Agent 兼容。

## uSkill 如何落地

一个双层技能目录长这样：

```text
skills/agent-skills/code-review/
├── SKILL.md          # 开放标准层：任何兼容 Agent Skills 的 Agent 都能加载
├── uskill.yaml       # 增强契约：类型、权限、溯源、评测
├── references/       # 渐进式加载的领域知识
├── scripts/          # 确定性操作（注册后才可执行）
└── evals/            # 证明技能是否真的有用
```

在本机可以用以下命令校验结构，不需要 API Key：

```bash
pip install -e ".[dev]"
uskills doctor
uskills validate skills/
```

## 实际运行结果

2026-11-26 在 uSkill 仓库本地执行 `pytest -q`，结果为 **301 passed**，全部基于 MockProvider，无需网络或密钥。这说明校验、运行时控制与评测管道可以被离线复跑；但它不证明某个技能在真实模型上的语义质量。

## 什么时候该用 Skill，什么时候用 Prompt

- 一次性问题、探索性写作：Prompt 更轻，没必要建资产。
- 需要重复执行、跨人/跨模型复用、有输入输出约束、需要回归验证：用 Skill。
- 涉及权限、外部工具或不可逆操作：必须用带治理层的 Skill，而不是靠提示词里的"请不要"。

## 局限

- Skill 不能替代模型能力；它约束方法，不保证语义正确。
- 开放的 `SKILL.md` 标准只定义结构与渐进加载，不自带评测与权限；这些是 uSkill 增强层提供的。
- 本文基于 uSkill v2.0.0（tag，2026-11-13）与其仓库文档；后续版本可能改变命令与字段。

## 常见问题

**Agent Skills 是某个厂商的私有格式吗？**
不是。uSkill 原生校验、导入、导出开放标准的 `SKILL.md`，增强内容放在独立的 `uskill.yaml`。

**已有的 Prompt 可以直接变成 Skill 吗？**
可以先用 `uskills convert` 把 SOP/Prompt 转成草稿候选，再人工评审。转换产物不会自动发布。

## 下一步

阅读 [uSkill 项目页](/work/uskill/) 与 [快速开始文档](https://zhubao315.github.io/uSkill/)。

## 证据

- uSkill 双层标准与命令：仓库 `README.md`、`docs/schema.md`、`docs/quickstart.md`，核验于 2026-11-26。
- 301 项测试：`pytest -q` 实测输出，2026-11-26。
- 版本：`core/uskills/_version.py` = 2.0.0，tag v2.0.0（2026-11-13）。

## 未验证

- 搜索量与排名：UNVERIFIED —— 需接入 Search Console / Bing Webmaster Tools。
- 真实模型上的效果对比：UNVERIFIED —— 需自建评测集并接入真实 Provider。
