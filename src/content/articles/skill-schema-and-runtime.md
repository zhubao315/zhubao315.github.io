---
title: 如何给 Agent Skill 加上输入约束与输出校验？
description: 用 JSON Schema 约束输入、有界修复环校验输出，并由受治理运行时强制执行超时、重试、权限与人工审批：一个可离线复跑的实现路径。
date: 2026-11-26
author: ZHUBAO
keywords: ['JSON Schema', 'Skill Runtime', '输出校验', '治理']
project: uSkill
category: agent
---

## 直接答案

在技能契约里声明输入 JSON Schema（如 `enum`、`minimum`、`pattern`、`items_type`）与输出 Schema；运行时在调用模型之前拒绝不合规输入，在返回之后校验输出，并在**有界**次数内修复（默认 2 次，可设为 0 关闭）。超时、重试、权限白名单、审批挂起与检查点必须由运行时执行，而不是写在 Prompt 里"请遵守"。

## 问题：声明不等于执行

很多技能文档会写"最多重试 2 次""不要访问网络"，但如果没有执行层，这些只是文本。uSkill 2.0 的关键变化是把 `control.timeout` / `control.retry` 从声明变成真实强制的行为：

- 指数退避重试，上限 30 秒；`idempotent: false` 的工具绝不自动重试。
- 组合技能通过 `depends_on` 形成 DAG，按分层并行调度；环和未知依赖直接拒绝。
- 协作式 `CancelToken` 与 `CANCELLED` 状态。
- 输出 Schema 校验失败后进入有界修复环，不会无限重试。

## 如何配置

以 `uskill.yaml` 为例（字段以仓库当前 Schema 为准）：

```yaml
apiVersion: uskills/v2
kind: Skill
metadata:
  name: structured-extract
execution:
  mode: llm
  timeout: 30
  retry: 1
control:
  repair: 2
  backoff_base: 1
inputs:
  type: object
  properties:
    text: { type: string, minLength: 1 }
    lang: { type: string, enum: [zh, en] }
  required: [text, lang]
outputs:
  type: object
  properties:
    keywords: { type: array, items: { type: string } }
  required: [keywords]
```

离线验证命令（无需 API Key）：

```bash
uskills validate skills/
uskills run content_pipeline --input '{"text":"示例"}' --library skills
```

`content_pipeline` 会真实调度子技能，并在检查点目录留下运行记录：`--audit <path>` 可查看脱敏后的审计轨迹。

## 运行结果与证据

2026-11-26 本地执行 `pytest -q`：301 项测试全部通过，其中包含 `test_runtime_controls.py`（timeout、retry、审批、DAG 调度）与 `test_v2_core.py`。命令输出显示 `COMPLETED`、DAG 层级与检查点路径，这些来自真实 MockProvider 运行，不是合成截图。

## 边界

- 输入约束阻止的是结构错误，不保证业务语义正确。
- 输出 Schema 校验衡量"契约合规度"，不衡量语义质量。
- 审计日志会脱敏敏感键，批量值以 sha256 摘要保存；不要把密钥写入技能模板。
- Workbench 3.0 提供本地只读 Web MVP，安装计划只预览、不写文件。

## 常见问题

**修复环会不会无限循环？**
不会。`control.repair` 默认 2，设为 0 即关闭；运行时不会无界重试。

**未注册的工具声明会提升风险等级吗？**
不会。uSkill 的风险分级由真实能力推导，未注册的工具声明不会升级——因为运行时根本无法调用它。

## 下一步

阅读 [架构文档](https://github.com/zhubao315/uSkill/blob/main/docs/architecture.md) 与 [CLI 参考](https://github.com/zhubao315/uSkill/blob/main/docs/cli.md)。

## 证据

- 运行时控制与 Schema：`core/uskills/runtime/`、`standards/uskill.schema.json`，核验于 2026-11-26。
- 测试结果：`pytest -q` → 301 passed；`tests/test_runtime_controls.py` 覆盖 timeout/retry/DAG，2026-11-26。
- 版本：tag v2.0.0（2026-11-13），Release 页 2026-11-26 已补齐。

## 未验证

- 真实模型上的 schema 修复成功率：UNVERIFIED —— 需真实 Provider 与评测集。
- 搜索量与用户采用：UNVERIFIED —— 需 GSC / Bing 与自有事件。
