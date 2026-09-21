# AUDIT — 既有 ZIP 基线审计报告

> 审计对象:`budian-ui-open-source.zip`(解压于 2026-09-21,工作目录 `/data/user/work/audit`)
> 审计方法:逐文件通读 + 与真实 Budian Cloud 系列页面(11 个站点源码)交叉验证
> 结论:基线骨架正确、方向诚实,但覆盖面不足本任务要求的约 35%。总体策略为 **保留 + 增量迭代**,不推翻重写。

## 1. 基线结构

```
budian-ui-open-source/
├── .gitignore                  # 4 行,基础可用
├── LICENSE                     # MIT,完整
├── README.md                   # 63 行,中文,含来源声明
└── budian-ui/
    ├── SKILL.md                # 34 行,英文,含 frontmatter + 工作流
    ├── agents/openai.yaml      # 4 行,ChatGPT/Codex 元数据
    ├── assets/starter/         # index.html(37 行)+ styles.css + app.js
    └── references/design-system.md  # 149 行,核心资产:五种视觉分支 + tokens + 来源观察
```

## 2. 逐项审计结论

| 区域 | 现状 | 评级 | 说明 |
| --- | --- | --- | --- |
| `references/design-system.md` | 五种视觉分支(editorial index / product workbench / technical showcase / calm utility / atmospheric experience)+ tokens + 各站观察 | **KEEP + 扩展** | 全仓库最有价值的抽象,与本次 11 站证据交叉验证后成立;演进为 `docs/design-system.md` |
| SKILL.md frontmatter | name/description 含触发词(GFW X、Resident3 等) | **KEEP** | 符合 Agent Skill 约定;description 保留并微调 |
| SKILL.md 正文 | 8 步工作流 + Non-negotiables | **IMPROVE** | 缺 Theme/i18n/Responsive/Motion/A11y/Performance 章节、页面模式、验证清单;本次补全至完整结构 |
| Starter `.js` 渐进增强 | `html.classList.add('js')` 后才允许 `opacity:0` reveal | **KEEP** | 修复了真实站点「无 JS 时卡片不可见」的缺陷,方向正确;随新 runtime 保留 |
| Starter 主题持久化 | `localStorage('budian-theme')` + 系统回退 | **KEEP** | 优于真实首页(首页无持久化);演进为三态 system/light/dark |
| Starter 代码 | 37 行 HTML,单行压缩 CSS,装饰用字符图标(⌁◇✦) | **IMPROVE** | 结构过简;重写为可读格式 + 真 SVG 图标 + i18n;压缩 CSS 不符合「Readable」代码质量要求 |
| README | 来源声明诚实(不含站点源码/品牌资产) | **KEEP + 扩展** | 补 30 秒上手、测试、仓库结构等章节 |
| MIT LICENSE | 完整,声明 "Budian UI contributors" | **KEEP** | 仅覆盖自有内容;第三方资产审计见 TESTING.md |
| tokens 体系 | 仅在 design-system.md 内联 `--bd-*` 代码块 | **IMPROVE** | 缺独立 `tokens/` 目录;本次建立 `tokens.css` + `tokens.json` + Tailwind 适配示例,命名迁移为 `--budian-*`(破坏性变更,记录于 CHANGELOG) |
| docs/ | 不存在 | **MISSING** | 本次新建 15 个文档(设计系统、gap、证据、色彩、字体、间距、布局、组件、响应式、动效、主题、i18n、无障碍、性能、模式) |
| examples/ | 不存在(仅 starter) | **MISSING** | 本次新建 landing / dashboard / docs / components 四个自测示例 |
| i18n | 完全缺失(基线为中文硬编码) | **MISSING** | 真实站群中 GFW X(自动检测 + data-i18n)、budianai(设置内切换)、vellunote(22 语言 data-t)提供了 Observed 依据;本次建立 messages 对象架构并落到全部示例 |
| 主题三态 | 仅二态切换 | **IMPROVE** | 补 system/light/dark 三态 + `color-scheme` + meta theme-color 同步 + 无闪烁内联脚本 |
| 响应式 | 仅 640 一个断点 | **IMPROVE** | 真实站群断点聚类 620–680 / 820–980 / 1024;规范化为 640 / 900 / 1024 |
| 无障碍 | focus-visible + reduced-motion 已有 | **IMPROVE** | 补 skip-link(GFW X Observed)、44px 触控目标、landmark、aria 模式、forced-colors 说明 |
| AUDIT / CHANGELOG / CONTRIBUTING / TESTING | 不存在 | **MISSING** | 本次全部新建 |
| `.gitignore` | 覆盖 node_modules/dist/.env* | **KEEP** | 增补 OS/IDE 垃圾文件 |
| `agents/openai.yaml` | 4 行元数据 | **KEEP** | 保留并更新描述 |

## 3. REMOVE / REWRITE 清单

- **REMOVE**:无。基线没有错误到需要删除的内容;Cloudflare Analytics beacon 等第三方内容本就未混入基线。
- **REWRITE**:无整文件级重写。starter 的 CSS 从单行压缩重排为可读多行,属格式重写而非语义重写。

## 4. 与真实站点的差异(基线未覆盖、本次修正)

| 发现 | 基线状态 | 本次处理 |
| --- | --- | --- |
| 真实首页 reveal 依赖 `opacity:0` 初始态,无 JS 时内容不可见 | 基线已用 `.js` 标记修复(starter) | 保留修复并写入 SKILL.md 规则 |
| 真实首页主题不持久化、无 `color-scheme`、meta theme-color 静态 | 基线部分修复(持久化) | 三态架构 + color-scheme + meta 同步 |
| 真实站群断点聚类 640/900/1024,非 Tailwind 默认 | 基线仅 640 | 规范化三断点并写入文档 |
| GFW X 的 skip-link、budianai 的 aria 全家桶、vellunote 的 forced-colors | 基线未收录 | 收录为 Observed 规则 |
| 基线 CSS 使用 `!important` 数处(starter 无,真实首页有) | starter 干净 | 规则:禁止 `!important` 除 reduced-motion 全局开关 |
| 第三方资产 | 基线无第三方资产 | 维持零第三方运行时依赖;字体全系统栈(站群 Observed:无 @font-face) |

## 5. 审计结论

基线的核心判断(五种视觉分支、克制原则、来源诚实声明、MIT 边界)全部经 11 站证据验证成立,予以保留。主要缺口在**工程化深度**(tokens 文件化、i18n、三态主题、组件文档、示例、测试矩阵),本轮迭代按 Gap Analysis(docs/gap-analysis.md)逐项补齐,不推翻任何已验证正确的决策。
