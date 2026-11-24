# 06 · 性能与体积报告

以下为 GitHub 仓库内单文件 >10 MiB 的对象（API 元数据），不等于 Pages 发布包大小。

| MiB | 仓库 | 路径 |
|---|---|---|
| 72.3 | ApeRAG | tests/e2e_test/graphstorage/graph_storage_test_data.json |
| 58.2 | perfectme | 10-宣传网站/assets/film.mp4 |
| 58.2 | perfectme | 07-成片/高一1班-朱明萱-满分的我(配音版).mp4 |
| 57.6 | perfectme | 07-成片/高一1班-朱明萱-满分的我.mp4 |
| 42.4 | fabric-prompt | web/static/favicon.png |
| 42.4 | fabric-prompt | web/static/fabric-logo-gif.gif |
| 42.4 | fabric-prompt | web/src/lib/images/fabric-logo.png |
| 42.4 | fabric-prompt | web/src/lib/images/fabric-logo.gif |
| 42.4 | fabric-prompt | images/fabric-logo-gif.gif |
| 41.2 | perfectme | build/visual.mp4 |
| 34.6 | uRead | public/audio/9c26b1681588726e.wav |
| 25.8 | uRead | public/audio/0e843ff5f0dc2345.wav |
| 25.5 | perfectme | build/mix_raw.wav |
| 25.5 | perfectme | build/mix.wav |
| 25.1 | perfectme | build/music.wav |
| 24.5 | cycling | run_page/data.db |
| 22.7 | uRead | public/audio/ccbd6a79e9c152bb.wav |
| 21.9 | co-mate | llm-semantic/src/main/resources/model/model.onnx |
| 21.4 | uRead | public/notes/notes.json |
| 19.2 | cycling | src/static/activities.json |
| 18.7 | learn-agentic-ai | backup_recent/04_integrations_openai_agents/AI Unleashed_ How OpenAI's Agents SDK is Connecting Mind |
| 17.7 | learn-agentic-ai | 11_graph_query_language/Building-Knowledge-Graphs-Practitioner's-Guide-OReilly-book.pdf |
| 15.7 | uRead | book-library/books/《千分之一的你：从16型到64型》.epub |
| 13.5 | AgentTuning | AgentBench.old/src/tasks/webshop/web_agent_site/envs/chromedriver |
| 13.5 | perfectme | 00-文档总览.pdf |

## 结论

- 最大单对象：ApeRAG 的 72.3 MiB 测试数据 JSON；Perfect Me 多份 58 MiB 成片；fabric-prompt 多份 42 MiB 图片。
- uRead 存在 34.6 / 25.8 MiB WAV，且多数为孤儿音频；已在此前优化中识别。
- 不要直接重写历史：先生成 `git-sizer`/`git rev-list --objects` 报告，再决定是否 LFS/归档。
- 网站发布体积与仓库体积要分别治理：MBTI64 发布包约 44 MiB 但仓库约 707 MiB。
