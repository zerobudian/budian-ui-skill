# Budian UI 设计系统总纲

> 本文档由基线 `references/design-system.md` 演进而来(原五分支抽象经 11 站源码交叉验证后全部保留),是 docs/ 系列的入口。
> 数值证据与来源标注见 `evidence.md`;逐主题细节见同目录专题文档。

## 目录

1. 核心气质
2. 分层:Core / Pattern / Site-specific
3. 五种视觉分支
4. Token 总览
5. 排版与布局
6. 组件规范摘要
7. 动效摘要
8. 响应式与无障碍摘要
9. 各站点观察档案

## 1. 核心气质

Budian 界面直接、留白慷慨、产品主导。一个页面通常只有一个视觉意图:一行超大文案、一个数字、一个居中任务、或一个工作面。边线安静、阴影柔软、强调色稀少。技术页面精确,创意页面氛围,都不需要视觉噪音。

- 用一个 unmistakable 的焦点开场。
- 近黑文字 + 灰白或近黑画布。
- 元信息用大写或等宽小标签。
- 先用留白与细线分区,再考虑容器。
- 控件紧凑而有触感:10–16px 圆角、克制阴影、清晰选中态。
- 让单一强调色解释状态、类别或动效。
- 装饰几何必须微弱且与产品结构相关:轨道、网格、柱条、流、或一个发光体。

**品质词**:Modern · Calm · Fast · Clear · Technical · Elegant · Accessible · Adaptable · Consistent
**反品质词**:Flashy · Noisy · Heavy · Over-animated · Template-like

## 2. 分层:Core / Pattern / Site-specific

| 层 | 内容 | 规则 |
| --- | --- | --- |
| **Core Design System** | 语义 token、字体栈、间距/圆角/阴影/动效刻度、基础组件(按钮/输入/卡片/标签/对话框/吐司/表格/代码块)、主题与 i18n 架构、a11y 底线 | 全站强制,改它须过 evidence 流程 |
| **Reusable Pattern** | 节标题(kicker+h2)、行卡片网格、双栏工作台、stat 卡、紧凑 tabs、终端窗、空态、骨架屏、导航抽屉 | 按页面类型选用 |
| **Site-specific** | boogleone 的 Google 式搜索框、budianyun 的居中下载卡、budianfarm 的像素 UI、vellunote 的 orb/蜡封仪式组件、wtx 的四档蓝色词频条 | **不进入**通用系统;仅记录于观察档案 |
| **Legacy** | 真实首页 reveal 无 `.js` 门控的缺陷、`!important` 滥用、静态 meta theme-color | 已在 Skill 中修正,勿回引 |

未来新增组件(日期选择器、数据网格、文件上传等):允许设计,但必须基于现有 token 与原则,并在 evidence.md 标记 **Recommended**,不冒充历史页面已有。

## 3. 五种视觉分支

### Editorial index(编辑索引)
作品集、项目目录、宣传页。超大 hero + 紧字距,安静页头,大留白,有序行卡,一处微弱网格或轨道母题。一句渐变短语足够。参考:budiancloud。

### Product workbench(产品工作台)
生成工具、编辑器、上传流、设置、仪表盘。任务面置于首屏:宽主面板 + 窄设置/摘要面板。控件用细线与标签分组,最终配置贴近最强操作。连接与高级设置用 modal 或抽屉。参考:h3flowconsole、budianai。

### Technical showcase(技术展示)
性能、架构、网络、开发者产品。一个指标或产品名占主导,配柱条、流、trace 或内存图。暗场 + 单一发光强调,或暖白场 + 黑字 + 酸性强调。预测/估算/实测必须明确标注。场景切换揭示架构。参考:resident3、gfw-x。

### Calm utility(安静工具)
写作、加密、搜索、专注工具。外壳缩减为任务 + 状态 + 必要操作。双栏输入/输出画布或居中单任务。隐私与本地处理说明贴近任务。紧凑 tabs 与直白空态。参考:ciphey、budianwtx。

### Atmospheric experience(氛围体验)
个人化、反思型产品。克制衬线体做关键陈述,柔和粉彩场,细腻纹理,一个精工焦点物。控件退居次要,动效放慢。参考:vellunote。

分支组合仅当产品真正需要(如工作台 + 氛围化的完成态)。

## 4. Token 总览

完整定义见 `../tokens/tokens.css` 与 `../tokens/tokens.json`(单一事实来源,含 Observed/Inferred/Recommended 标注)。

| 族 | 档位 |
| --- | --- |
| 色彩 | bg / bg-inset / surface / surface-strong / text×3 / border×2 / accent / ring / status×4 / code / overlay + 9 色卡面 accent + 渐变短语 |
| 字号 | display · title · heading · subheading · body · lede · small · caption · kicker · code |
| 间距 | 4px 基:4/8/12/16/20/24/32/40/48/64/80/96;区块 `clamp(64px,9vw,112px)` |
| 圆角 | 10 / 14 / 18 / 24 / 32 / 999 |
| 阴影 | sm / md / lg / xl(大模糊低透明)+ 玻璃顶边高光 |
| 模糊 | 10 / 20 / 28 / 36 / 95 |
| 动效 | 140 / 250 / 350 / 650 / 950ms;standard / enter / exit / ambient 四曲线;stagger 55ms |
| 容器 | 640 / 940 / 1180 / 1240;gutter 20 → 14 |
| 断点 | 640 / 900 / 1024(观测聚类,非 Tailwind 默认) |
| Z 轴 | content 2 / sticky 20 / toast 100 / skip 1000 |

## 5. 排版与布局

- 默认 `Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui`;等宽 `ui-monospace…`;衬线仅氛围分支。**全系统零 @font-face**。
- Display 用 clamp 伸缩;≥34px 才允许负字距;指标一律 `tabular-nums`。
- 容器公式 `min(1240px, calc(100% - 40px))`,移动 `calc(100% - 28px)`;详见 `layout.md`、`typography.md`。

## 6. 组件规范摘要

组件清单、解剖、状态矩阵与示例代码见 `components.md` 与 `../examples/components/`。核心纪律:

- 所有交互组件实现 default / hover / `:focus-visible` / active / selected / disabled / loading。
- 禁止 `outline: none` 无替代;焦点环 3px + offset 3px。
- 玻璃只用于浮层;卡片 hover 一次 -2px 上浮 + accent 边框 + 至多一次 sheen 扫光。

## 7. 动效摘要

- 一套 reveal 系统(IntersectionObserver,threshold .12–.2,stagger 55ms)。
- 入场 500–950ms;微交互 140–350ms;环境循环 6–36s。
- 曲线族 `cubic-bezier(.22,1,.36,1)`;计数动画 quart 缓出 650ms。
- `prefers-reduced-motion: reduce` 全局开关(唯一允许 `!important` 处)。
- 详见 `motion.md`。

## 8. 响应式与无障碍摘要

- 三断点 640/900/1024;测试宽 320–1920;`100svh/dvh` + safe-area;触控 ≥44px;hover 信息必须有常显等价物。
- 语义 landmark、skip-link、tablist/dialog aria 模式、forced-colors 兜底。
- 详见 `responsive.md`、`accessibility.md`。

## 9. 各站点观察档案

| 站点 | 分支 | 关键观察 |
| --- | --- | --- |
| budiancloud | editorial index | 双主题(无持久化)、1240 容器、118px hero 上限、蓝青紫渐变短语、轨道几何、18px 行卡、滚动 reveal、reduced-motion 全局开关、原生 dialog、欢迎吐司 |
| h3flowconsole | product workbench | Vite 构建(Tailwind v4)证明栈多元;1180 容器;1fr+316px 工作台;composer 30px 圆角 blur(25);focus-within 高亮;任务时间线;设置滑入面板 |
| resident3 | technical showcase | `#020302` 纯黑 + `#35f58c` 发光绿;hero 数字至 270px w880;分段 VRAM 条;四分位计数动画;56px 网格线遮罩;820/480 断点 |
| budianai | product workbench(聊天) | 30+ CSS 变量;`prefers-color-scheme` 自动暗色;IndexedDB 对话;SSE 流式打字;完整 zh/en 设置切换;aria 全家桶;767 断点抽屉侧栏 |
| budianyun | calm utility(下载卡) | 纯静态无 JS;320px 居中卡;镜面反射装饰 —— Site-specific,勿泛化 |
| boogleone | calm utility(搜索) | Google 风格居中搜索;`.dark` 类手动主题;IP 检测自动切换引擎 —— 风格属 Site-specific |
| budianfarm | 游戏 | 像素语言、HUD chips、canvas 战斗 —— 完全 Site-specific |
| budianwtx | calm utility(写作) | 暖纸色系 `#f9f9f7`;9px 紧凑圆角;tabs role 完整;localStorage 主题 `wtx-theme`;960 断点;Ctrl+Enter 快捷键 |
| vellunote | atmospheric | 衬线 + 粉彩;22 语言 `data-t`;44px 触控;forced-colors 适配;仪式动画序列(orb 呼吸 6s → 释放 2.2s → 回信 950ms) |
| ciphey | calm utility(加密) | aurora 18s 循环;四 tab + 420ms glider;`crypto.subtle` 本地处理;640/1024 断点;28px 大圆角 |
| gfw-x | technical showcase | 噪声纹理 0.025;信号环 14/10/7s;skip-link;自动 i18n(navigator.language + data-i18n);流动路径图;状态三色(allow/block/observe) |
