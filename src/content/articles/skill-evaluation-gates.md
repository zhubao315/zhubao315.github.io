---
title: Skill 评测怎么做：基线对照与回归门禁
description: 用 No-Skill 基线、确定性断言和版本回归门禁证明技能是否真的有用；区分"判分管道未退化"与"模型语义质量提升"。
date: 2026-11-26
author: ZHUBAO
keywords: ['Skill 评测', '回归门禁', '基线对照', 'CI']
project: uSkill
category: agent
---

## 直接答案

先建立**无技能基线**，再在相同评测集上运行带技能的版本，用确定性断言比较输出合规度、一致性、延迟、token 与工具成功率；然后把结果存为基线，在 CI 中用 `--gate` 比较，出现无法解释的回归就让命令以非零码退出。**评测全绿只说明判分管道与输出契约没有退化，不等于模型语义质量提升。**

## 为什么"看起来好用"不够

技能改动很容易引入隐性回退：改了一段提示词，某个边界用例不再通过；换了模型，输出结构从 JSON 变成一段解释文字。如果没有基线和门禁，这些问题只会在用户使用时暴露。

uSkill 的评测体系包含：

- 版本化评测集（`evals/datasets/`），可针对已发布技能运行。
- 确定性断言评分器优先，LLM-as-Judge 使用固定 rubric、记录 judge 模型，并单独存放，不翻转确定性通过/失败。
- 诚实指标：单次重复的一致性为 `null`；未知模型的成本为 `null`，不编造数字。
- 多模型矩阵 `eval --models a,b,c` 与版本比较 `--compare`。
- 发布回归门禁 `--gate --max-drop-pp`。

## 可复跑的命令

```bash
# 无 API Key 的离线评测
uskills eval --skill skills/atomic/text_summarize.yaml \
  --suite evals/datasets/summarize.json

# 与上一版结果比较，回归则退出码 1
uskills eval --skill skills/atomic/text_summarize.yaml \
  --suite evals/datasets/summarize.json \
  --compare run.json --gate

# 确定性 mock 回归（CI 使用）
uskills eval --skill skills/atomic/text_summarize.yaml \
  --suite evals/datasets/summarize.json \
  --mock-response evals/reports/*.mock-baseline.json
```

CI 中还有 `ruff check` + `ruff format --check`、覆盖率门禁（`--cov-fail-under=80`，见 `ci.yml`）和 eval 回归门禁。

## 实测结果

2026-11-26 本地执行 `pytest -q`：301 项测试全部通过，涵盖 `test_evaluation.py`、`test_evaluation_v2.py` 与 `test_release_gate.py`。文档站的 CLI 演示中，`--compare` 输出 `+0.0 pp, regressed=none`，并注明回归会返回退出码 1；该示例基于 MockProvider。

## 边界与误读

- Mock 基线守护"判分管道没有退化"，不是真实效果证明。
- 确定性断言衡量输出契约合规度，不衡量语义质量。
- 真实效果需要你在自己的评测集上接真实模型跑矩阵；仓库没有、也不会替你宣称某个模型"更好"。
- 未知模型的成本指标是 `null`，不是 0。

## 常见问题

**评测全绿能写进宣传材料说"效果提升"吗？**
不能。正确表述是"回归门禁通过，判分管道未退化"。

**LLM-as-Judge 会覆盖确定性结果吗？**
不会。它使用固定 rubric、记录 judge 模型，单独存储，不翻转确定性通过/失败。

## 下一步

阅读 [评测文档](https://github.com/zhubao315/uSkill/blob/main/docs/evaluation.md) 与 [uSkill 项目页](/work/uskill/)。

## 证据

- 评测与门禁实现：`core/uskills/evaluation.py`、`docs/evaluation.md`、`ci.yml`，核验于 2026-11-26。
- 测试结果：`pytest -q` → 301 passed，2026-11-26。
- 门禁口径：`--cov-fail-under=80` 见 `ci.yml`；实际覆盖率以 CI 报告为准。

## 未验证

- 真实模型矩阵结果：UNVERIFIED —— 需自建评测集与真实 Provider。
- 搜索流量与转化：UNVERIFIED —— 需 GSC / Bing 与自有事件。
