# Gap Analysis — 需求对照与差距分析

> 对照对象:任务全部要求 vs 既有 ZIP 基线(`budian-ui-open-source.zip`)
> 状态定义:`PASS` 基线已满足 / `PARTIAL` 部分满足 / `FAIL` 缺失 / `UNKNOWN` 无法验证
> 「最终状态」为本轮迭代后的验收结果,证据见各对应文件。

## 1. 审计与来源

| # | 需求 | 基线状态 | 证据 | Gap | 行动 | 优先级 | 最终状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 完整解压并审计 ZIP,输出 AUDIT.md | FAIL | 基线无 AUDIT.md | 全缺 | 逐文件审计,输出 `AUDIT.md` | 高 | PASS |
| 2 | 浏览真实站点全部索引页面 | PARTIAL | design-system.md 声称观察过 10 站,但无原始证据留存 | 无可复核证据 | 下载 11 站源码,输出 `docs/evidence.md` | 高 | PASS |
| 3 | 分析代码而非截图(HTML/CSS/JS) | PARTIAL | 基线含数值(说明看过代码)但未留档 | 证据不可追溯 | 全量源码分析,逐条标注 Observed/Inferred | 高 | PASS |
| 4 | Observed / Inferred / Recommended 分离 | FAIL | 基线仅笼统标注 "observed" | 无三分类体系 | tokens 与 evidence.md 全量三分类标注 | 高 | PASS |

## 2. 设计系统与 Tokens

| # | 需求 | 基线状态 | 证据 | Gap | 行动 | 优先级 | 最终状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 5 | 语义化 Color Tokens(`--budian-*`) | PARTIAL | design-system.md 内联 `--bd-*` 10 个 | 缺 status/code/overlay/inset 等;命名不符 | `tokens/tokens.css` 全量语义令牌 + 命名迁移 | 高 | PASS |
| 6 | Typography Tokens(有限字号档位) | PARTIAL | 文档有数值但无 token 化 | 无 text-* 令牌 | display/title/heading/body/small/caption/kicker + code | 高 | PASS |
| 7 | Spacing / Radius / Shadow / Blur Tokens | PARTIAL | 仅 radius 4 档 | 缺 spacing scale 与 shadow/blur | 按观测值规范化补全 | 高 | PASS |
| 8 | Container / Breakpoint / Z-index / Motion / Opacity Tokens | FAIL | 无 | 全缺 | 补全(断点取观测聚类 640/900/1024) | 高 | PASS |
| 9 | tokens.json 跨栈可移植 + Tailwind 适配示例 | FAIL | 无 | 全缺 | `tokens/tokens.json` + `tailwind-example.js`(仅适配层) | 中 | PASS |
| 10 | 组件用语义 Token,不用 Raw Color | PARTIAL | starter 用 `--accent` 等语义名 | 无成文规则 | 写入 SKILL.md 与 docs/colors.md | 高 | PASS |

## 3. 默认能力(Theme / i18n / Responsive / Motion / A11y)

| # | 需求 | 基线状态 | 证据 | Gap | 行动 | 优先级 | 最终状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 11 | 自动明暗 + 跟随系统 + 手动覆盖 + 持久化 | PARTIAL | starter 有二态持久化 | 无 system 态、无 color-scheme、无 meta 同步 | 三态架构 + 内联防闪烁脚本 + meta theme-color | 高 | PASS |
| 12 | 主题无闪烁(FOUC)、无旧主题残留组件 | PARTIAL | starter 无防闪烁 head 脚本 | 首屏可能闪白 | head 内联先行脚本(先于样式表生效) | 高 | PASS |
| 13 | zh-CN / en 自动语言适配 + 手动持久化 | FAIL | 无 i18n | 全缺 | messages 对象 + navigator.language 检测 + localStorage + `<html lang>` 同步 | 高 | PASS |
| 14 | 禁止散落硬编码文案;日期数字走 Intl | FAIL | 无 | 全缺 | `data-i18n` 机制 + Intl.DateTimeFormat/NumberFormat | 高 | PASS |
| 15 | 语言变化同步 title/aria/placeholder/导航 | FAIL | 无 | 全缺 | `data-i18n-attr` 属性级翻译 | 中 | PASS |
| 16 | i18n 布局不依赖中文尺寸(禁固定宽高) | UNKNOWN | 基线未测试 | 无验证 | 示例全部弹性布局,测试矩阵含 en 溢出检查 | 中 | PASS |
| 17 | 响应式 320–1920 全宽测试 | PARTIAL | 仅 640 断点 | 缺 900/1024 层 | 三断点 + 测试矩阵 | 高 | PASS |
| 18 | Motion Tokens + 单一 reveal 体系 | PARTIAL | 文档有数值,starter 有简化 reveal | 无令牌化;无 stagger 变量 | motion 令牌 + IO reveal runtime(--stagger) | 高 | PASS |
| 19 | prefers-reduced-motion 全局降级 | PASS | starter 与真实站点均支持 | — | 保留 + 写入规则 | 高 | PASS |
| 20 | A11y:语义 HTML / 键盘 / focus-visible / aria / 44px / 对比度 | PARTIAL | 有 focus-visible 与 reduced-motion | 缺 skip-link、触控目标、landmark 规范 | 收录 GFW X/budianai 实测模式 | 高 | PASS |
| 21 | Safe-area / dvh / hover 悬停依赖规避 | FAIL | 无 viewport-fit | 全缺 | `viewport-fit=cover` + `env(safe-area-inset-*)` + `100svh/dvh` 规则 | 中 | PASS |
| 22 | 渐进增强:无 JS 核心内容可用 | PARTIAL | starter `.js` 标记已实现 | 未成文为规则 | 写入 SKILL.md;示例全部通过无 JS 静态检查 | 高 | PASS |

## 4. 组件、模式与文档

| # | 需求 | 基线状态 | 证据 | Gap | 行动 | 优先级 | 最终状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 23 | 组件清单与逐组件文档(Anatomy/Variants/States/A11y) | FAIL | 仅 6 个组件一句话描述 | 全缺 | `docs/components.md` + `examples/components/` 实物 | 高 | PASS |
| 24 | 交互状态完整(default/hover/focus-visible/active/disabled/loading) | PARTIAL | starter 仅 hover/focus | 缺状态矩阵 | components 示例逐组件演示 | 高 | PASS |
| 25 | 页面 Patterns(landing/devtool/dashboard/docs/status) | PARTIAL | 五分支描述了场景 | 无可运行模式 | `docs/patterns.md` + 四个示例 | 高 | PASS |
| 26 | Core / Pattern / Site-specific 分层 | PARTIAL | 五分支隐含分层 | 未显式声明 | docs/design-system.md 显式分层(像素农场/仪式组件标记为 Site-specific) | 中 | PASS |
| 27 | SKILL.md 独立可用(五问:looks/behaves/adapts/implemented/AI workflow) | PARTIAL | 34 行,仅工作流 | 缺绝大多数章节 | 重写为完整结构(≈400 行) | 高 | PASS |
| 28 | Agent 15 步构建流程 + 禁止行为 + 验证清单 | FAIL | 仅 8 步 | 全缺 | SKILL.md 补全 | 高 | PASS |
| 29 | 性能指导(系统字体/transform+opacity/依赖哲学/框架无关) | PARTIAL | Non-negotiables 有零散条目 | 无成文章节 | `docs/performance.md` + SKILL.md 摘要 | 中 | PASS |

## 5. 仓库工程与开源

| # | 需求 | 基线状态 | 证据 | Gap | 行动 | 优先级 | 最终状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 30 | 推荐目录结构(docs/tokens/examples) | FAIL | 仅 budian-ui/ 单层 | 全缺 | 按 §60 建仓(不造空文件) | 高 | PASS |
| 31 | README 快速上手(30 秒路径) | PARTIAL | 有安装说明 | 缺速通路径与全章节 | 重写 README | 中 | PASS |
| 32 | CHANGELOG / CONTRIBUTING | FAIL | 无 | 全缺 | 新建(含 Observed/Inferred/Recommended 贡献规则) | 中 | PASS |
| 33 | LICENSE 边界 + 第三方资产审计 | PARTIAL | MIT 已有 | 无第三方清单 | TESTING.md 记录:零第三方运行时依赖、全系统字体、无站源复制 | 高 | PASS |
| 34 | 安全审计(key/token/endpoint/分析脚本) | UNKNOWN | 未检查 | 无记录 | 全仓扫描,移除一切生产站点标识;TESTING.md 留档 | 高 | PASS |
| 35 | 内部链接完整性(无 404) | UNKNOWN | 未检查 | 无记录 | 链接检查脚本全仓校验 | 中 | PASS |
| 36 | Examples 可直接运行(非截图) | FAIL | 仅 starter | 全缺 | 四示例 + starter,双击即开 | 高 | PASS |
| 37 | 测试矩阵(主题/语言/宽度/动效/输入/无 JS) | FAIL | 无 | 全缺 | `TESTING.md` + 浏览器实测留档 | 高 | PASS |
| 38 | 最终 ZIP 无双层嵌套 | UNKNOWN | — | — | `budian-ui-skill.zip` 根级即仓库文件 | 高 | PASS |
| 39 | 版本策略 | FAIL | 无版本 | — | v1.0.0(基线为 v0.x 实验版,CHANGELOG 记录迁移) | 低 | PASS |

## 6. 明确无法 Observed、以 Recommended 完成的项

以下能力在真实站群中**没有对应实现**,按任务允许的方式以 Recommended 补齐,并在文档中明确标注,不冒充历史页面已有:

- 三态主题中的显式 "system" 态(站群均为二态或纯系统跟随)→ Recommended
- `meta theme-color` 双值 + JS 同步(站群为静态单值或缺失)→ Recommended
- Skip-link(仅 GFW X Observed,其余站缺失)→ 收录为通用规则(Observed@GFW X)
- 命令面板 / Command menu → 未实现,仅在 components.md 记为扩展方向
- Date Picker / Data Grid / File Upload 等站群不存在的组件 → 不进入 Core,文档标注为未来扩展须遵守现有 Tokens

## 7. 第二轮维护(v1.1.0,2026-09-22)

> 触发:维护任务「修复 Skill 触发条件 / 渐进增强 / 主题系统 / A11y / 语言原则 / QA 闭环」。对照本轮全部要求:

| # | 要求 | 1.0.0 状态 | 证据 | 行动 | 最终状态 |
| --- | --- | --- | --- | --- | --- |
| R1 | 触发依据为任务类型(涉及 UI 即触发),删除按产品名触发 | FAIL | SKILL.md description 列 GFW X/Resident3/Ciphey 等为触发词 | 重写 description + When to use;openai.yaml、README 同步 | PASS |
| R2 | 设计原则从任务开始参与,禁止"最后美化" | PARTIAL | 15 步工作流隐含但无强制 | 新增 "Design participates from the start" 12 阶段 + 明确禁止项 | PASS |
| R3 | README Markdown 转义问题(`\`` 等) | UNKNOWN | 当前树中未复现(全 md 无反斜杠转义、fence 配对完整) | 全仓扫描确认干净;测试套件新增 fence 平衡与转义检查防回归 | PASS(未复现,已加防护) |
| R4 | 强制 UI QA 闭环(不得只看源码) | PARTIAL | 验证清单偏静态检查 | 新增 "UI QA loop (mandatory)" 17 步;禁止虚假宣称"已视觉验证" | PASS |
| R5 | starter 渐进增强:JS 失败内容必须可见 | FAIL | `.js` 在脚本加载即添加,init 失败则 reveal 永久隐藏 | `.js` 移入 `reveal.init()` 成功武装后添加;新增 4s 视口内兜底 | PASS |
| R6 | 主题系统:按钮状态一致 + 系统变化实时跟随 | FAIL | 监听器媒体查询写错(`prefers-color-scheme: change`,永不触发);aria-pressed 硬编码 | 修正为 `(prefers-color-scheme: dark)` change;静态 HTML 仅中性标签,运行时写 aria-pressed/方向标签 | PASS |
| R7 | 44×44 触控目标:starter 自身必须达标 | FAIL | icon-btn 40px、btn--sm 40px、topnav 链接 ~30px、docs 搜索框/TOC ~40px | 全部改用 `--budian-target-min`;按钮规范 40–52 → 44–52 | PASS |
| R8 | 语言/Locale 原则:不强行中文/混合 | FAIL | i18n 为"强制默认",示例即双语 | 新增语言继承原则(SKILL.md/i18n.md/README);i18n 机制明确限定于多语言项目 | PASS |
| R9 | starter 源码可读性(无预压缩) | PASS | starter CSS 232 行、分区注释、行长 ≤120 | 无需改动;顺带核对其余示例(最长行 285 字符为单行多属性,非压缩) | PASS |
| R10 | 保留既有理念(留白/层级/克制/反廉价玻璃等) | PASS | SKILL.md 设计哲学与组件规则完整 | 原样保留,仅扩充反模式清单 | PASS |
| R11 | 明确反模式清单 | PARTIAL | Don't 列表较短 | 扩充为 12+ 条硬禁项(假数据/假证言/假 logo/桌面缩放移动端/灰底灰字等) | PASS |
| R12 | 最终验收(静态检查 + JS syntax + 路径 + 浏览器 smoke) | — | — | 重建静态 + JSDOM 套件(含新增回归项)+ 浏览器 desktop/mobile 实测 | 见 TESTING.md |
