# Evidence — 证据日志

> 记录每条 Budian UI 规则的来源,防止设计系统在后续迭代中偏离原始 Budian 语言。
> 分类:**O** = Observed(从页面或源码直接观测)/ **I** = Inferred(多页一致,合理抽象)/ **R** = Recommended(为完善系统新增的工程实践,非 Budian 原有)
> 观测时间:2026-09-21;来源为下列 11 个公开站点的渲染页面与前端源码(HTML/CSS/JS 原文,非截图):
> budiancloud、h3flowconsole、resident3、budianai、budianyun、boogleone、budianfarm、budianwtx、vellunote、ciphey、budian-gfw

## 1. 排版 Typography

| 规则 | 来源 | 观测内容 | 分类 | 备注 |
| --- | --- | --- | --- | --- |
| 字体栈 | budiancloud, budianai, ciphey, gfw-x, h3flow | `Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui` | O | 站群零 `@font-face`,纯系统字体 |
| 等宽栈 | budianai, budiancloud section-note | `ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono"` | O | 用于元信息、编号、code |
| 衬线栈(仪式分支) | vellunote | `ui-serif, "Songti SC", "Noto Serif CJK SC", Georgia` | O | 仅限 atmospheric 分支 |
| 超大 Display | budiancloud | `clamp(58px, 8.2vw, 118px)` / lh `.92` / `-.075em` / w780 | O | token 取 `.95/.06em` 为 CJK 安全余量 |
| 巨型技术数字 | resident3 | `clamp(118px,21vw,270px)`,w880,`-.09em`,`tabular-nums` | O | technical showcase 分支特征 |
| 段落标题 | budiancloud | `clamp(34px,4vw,52px)` / lh1 / `-.055em` | O | |
| 卡片标题 | budiancloud | 19px / `-.025em` | O | |
| 正文带 | budianai 14px/1.78、wtx 15px/1.9、budiancloud 13px/1.45 | 13–16px / lh1.45–1.9 | O | token 收敛 15px/1.7 |
| Kicker 大写标签 | budiancloud `.19em/800/10px`、h3flow `.19em/800/10px`、gfw-x `.16em/760/12px`、ciphey `.22em/700/11px` | 10–12px、700–800、.16–.22em、大写 | O | 收敛 11px/800/.18em |
| 数字表格对齐 | resident3, wtx | `font-variant-numeric: tabular-nums` | O | 指标必须 |
| 负字距仅用于大字号 | 全站群 | ≥34px 才出现 -.05em 以下字距 | I | 小字号一律 0 或正字距 |

## 2. 色彩 Color

| 规则 | 来源 | 观测内容 | 分类 | 备注 |
| --- | --- | --- | --- | --- |
| 近黑前景/灰白底(浅) | budiancloud | `#111419` / `#f3f5f8` | O | |
| 近黑底/亮前景(深) | budiancloud | `#050609` / `#f4f7fb` | O | 站群默认暗色友好 |
| 半透明表面 | budiancloud | surface `rgba(255,255,255,.68)` / `rgba(15,18,25,.66)` | O | 玻璃卡基础 |
| 发丝线边框 | budiancloud | `rgba(15,23,42,.1)` / `rgba(255,255,255,.095)` | O | 区块分隔优先用线不用容器 |
| Muted 灰 | budiancloud | `#667085` / `#9299a8` | O | |
| 单一强调色纪律 | budiancloud, gfw-x, resident3, ciphey | 每页一个主 accent(蓝/酸绿/绿/紫系) | O | |
| 卡片 accent 调色板 | budiancloud | cyan `#29d6ff`…red `#ff5d68` 九色,经 `--card-accent` 注入 | O | 用于分类,不做装饰 |
| 渐变短语最多一次 | budiancloud | `linear-gradient(100deg,#1976ff,#63d8ff,#7c5cff)` 仅 hero 第二行 | O | |
| 状态色 | wtx(good `#0ca30c` 等)、gfw-x(danger `#e65243/#ff6b5c`、observe `#c58100/#f0b340`) | 语义状态色成对出现(浅/深) | O | |
| color-mix 派生色 | budiancloud, gfw-x | accent 与 surface/transparent 混合生成 hover/边框 | O | `color-mix(in srgb, …)` |
| 焦点环 | budiancloud | `outline: 3px solid color-mix(in srgb, var(--ring) 42%, transparent); offset 3px` | O | |
| 终端面双主题恒暗 | gfw-x console `#0e110e` | 代码/终端面在浅色模式也保持深底 | I | token 化 code-bg |

## 3. 布局 Layout / 间距

| 规则 | 来源 | 观测内容 | 分类 | 备注 |
| --- | --- | --- | --- | --- |
| 主容器公式 | budiancloud, gfw-x | `min(1240px, calc(100% - 40px))` | O | 移动端 `- 28px`(14px 双边) |
| 次级容器 | resident3/h3flow 1180px、vellunote 940/640px、budianai 消息列 850px | 640/940/1180/1240 四档 | O | 收敛为 container-sm/md/lg/xl |
| 区块以发丝线分隔 | budiancloud | `border-top: 1px solid var(--line)` + 大留白 | O | 先留白和线,后容器 |
| 段落节奏 | budiancloud 92/70/84px、resident3 130px、gfw-x 120px | 58–130px 带宽 | O | token `clamp(64px,9vw,112px)` |
| 网格 gap 偏紧 | budiancloud 列表 10px、h3flow 16px、wtx 20px | 列表/卡网格 10–20px | O | 区块间大、卡间小 |
| 全屏 hero | resident3, gfw-x, h3flow | `min-height: 100svh` | O | |
| 工作台双栏 | h3flow `1fr 316px`、ciphey `220px 1fr` | 主区 + 侧栏 220–316px | O | dashboard 模式基础 |
| 4px 基础间距刻度 | 全站群 | 4/8/12/16/20/24/32/48/64/96 高频出现 | O | |

## 4. 圆角 / 阴影 / 玻璃

| 规则 | 来源 | 观测内容 | 分类 | 备注 |
| --- | --- | --- | --- | --- |
| 圆角聚类 | 全站群 | 9–13(小)/16–19(卡)/22–28(面板)/30–32(大面板)/999(胶囊) | O | 收敛 10/14/18/24/32/pill |
| 大模糊软阴影 | gfw-x `0 30px 80px .10`、h3flow `0 24px 80px`、budiancloud `0 30px 110px .38` | 阴影=大半径低透明 | O | |
| 玻璃内高光 | budiancloud | `inset 0 1px 0 rgba(255,255,255,.035)` | O | 卡片顶边 1px 亮线 |
| 玻璃是高度语言不是默认皮肤 | budiancloud(卡片/弹窗/吐司)、wtx(无玻璃) | blur 仅用于浮层与列表卡,正文区不玻璃 | I | 原则:「Glass is an elevation effect」 |
| blur 档位 | budiancloud | 10(遮罩)/18–20(卡)/24–28(composer)/36(dialog)/95(环境光) | O | |

## 5. 动效 Motion

| 规则 | 来源 | 观测内容 | 分类 | 备注 |
| --- | --- | --- | --- | --- |
| 标准缓动族 | budiancloud `(.22,1,.36,1)`、gfw-x/budianai/ciphey `(.2,.75,.2,1)`,`(.16,1,.3,1)`,`(.2,.8,.2,1)` | 减速族曲线家族 | O | 收敛 standard/enter 两枚 |
| UI 时长带 | h3flow .16s、budiancloud .25/.3/.35s | 微交互 140–350ms | O | |
| 入场时长带 | budiancloud .5–.95s、resident3 .7s、gfw-x .75/.85s | reveal 500–950ms | O | |
| 环境动画 | budiancloud drift 18s/grid 28s/orbit 36s、vellunote breathe 6s | 6–36s 慢循环 | O | |
| IO reveal + stagger | budiancloud(threshold .16, rootMargin -28px, 55ms stagger)、gfw-x(.12)、resident3(.2) | IntersectionObserver 驱动入场 | O | |
| 方向感知 reveal | budiancloud script.js | 记录滚动方向,from-up/from-down | O | 可选增强 |
| 数字计数动画 | resident3 650ms quart、gfw-x 900ms cubic | `1-(1-k)^4` 缓出 | O | |
| reduced-motion 全局开关 | budiancloud, budianai, gfw-x, resident3, vellunote | `animation/transition-duration: .01ms !important` + scroll auto | O | 唯一允许 !important 的场景 |
| title-in 带 blur | budiancloud | `filter: blur(8px) → 0` + 34px 位移 | O | 仅 hero 标题 |
| 动效表达层级/关系/状态 | 全站群综合 | 无纯装饰弹跳/漂浮 | I | 设计原则提炼 |

## 6. 主题 Theme

| 规则 | 来源 | 观测内容 | 分类 | 备注 |
| --- | --- | --- | --- | --- |
| data-theme 属性切换 | budiancloud, wtx, vellunote | `document.documentElement.dataset.theme` | O | |
| 系统偏好检测 | budiancloud(内联 head 脚本)、gfw-x/h3flow/budianai(纯 media query) | `matchMedia('(prefers-color-scheme: dark)')` | O | |
| 首页无持久化 | budiancloud script.js | 主题切换不写 localStorage(刷新回系统态) | O | 站点事实;skill 以持久化为改进(R) |
| 持久化键名 | wtx `wtx-theme`、vellunote `wish.preferences` | localStorage 存偏好 | O | skill 统一 `budian-theme` |
| color-scheme 声明 | gfw-x, budianai, wtx | `color-scheme: light dark` | O | |
| meta theme-color | budiancloud 静态 `#050609`、gfw-x 双值 media | 浏览器 chrome 适配 | O | skill 采用双值+JS 同步 |
| 手动 > 系统 | wtx, vellunote | 有存储值则覆盖系统 | O | 三态架构依据 |
| 无闪烁内联脚本 | budiancloud | head 内联、先于样式生效 | O | 防白屏闪烁 |

## 7. i18n

| 规则 | 来源 | 观测内容 | 分类 | 备注 |
| --- | --- | --- | --- | --- |
| 浏览器语言自动检测 | gfw-x | `navigator.language` → zh-CN/en | O | |
| data-i18n 属性驱动 | gfw-x | 50+ 键值对 translations 对象 | O | |
| data-t 属性驱动 | vellunote | 22 种语言 | O | 机制同源 |
| 设置内语言切换 | budianai | zh/en 双语 60+ 条,设置面板切换 | O | |
| `<html lang>` 动态同步 | budianai | `document.documentElement.lang` | O | |
| 文案集中在 JS 字典 | gfw-x, budianai, vellunote | 不在 DOM 散落双语文案 | O | |
| 默认 zh* → zh-CN,其余 en | gfw-x 逻辑归纳 | 语言映射规则 | I | |

## 8. 可访问性 Accessibility

| 规则 | 来源 | 观测内容 | 分类 | 备注 |
| --- | --- | --- | --- | --- |
| focus-visible 焦点环 | budiancloud 3px/42%/offset3、wtx 2px accent、vellunote 2px/offset6、budianai box-shadow 环 | 键盘焦点可见 | O | |
| skip-link | gfw-x | fixed, focus 时移入视口,z-1000 | O | |
| aria 全家桶 | budianai(aria-modal/expanded/selected、role=listbox/radiogroup/tablist)、vellunote(aria-live/pressed/describedby)、wtx(tablist/tab/tabpanel) | 组件级 aria 模式 | O | |
| 原生 dialog | budiancloud | `<dialog>` + showModal + 点击遮罩关闭 | O | |
| 44px 触控目标 | vellunote(nav-button/icon-button min-height/width 44px) | 触控最小尺寸 | O | |
| forced-colors 适配 | vellunote | `forced-colors: active` 下用 ButtonText/Highlight | O | |
| aria-live 状态播报 | budiancloud toast(role=status)、vellunote cue | 异步状态可感知 | O | |
| 装饰元素 aria-hidden | budiancloud, gfw-x, vellunote | ambient/orbit/grid 全部隐藏 | O | |
| 触控设备不依赖 hover | 站群卡片主信息不藏在 hover 态 | 核心信息常显 | I | |

## 9. 响应式 Responsive

| 规则 | 来源 | 观测内容 | 分类 | 备注 |
| --- | --- | --- | --- | --- |
| 断点聚类 | 620(h3)/640(budiancloud)/650(vellunote)/680(gfw-x);820(resident3)/900(budiancloud,h3flow)/960(wtx)/980(gfw-x);1024(ciphey) | 三聚类:≈640 / ≈900 / 1024 | O | 收敛 640/900/1024 |
| 移动端收窄边距 | budiancloud | `- 40px → - 28px` | O | |
| 导航简化层级 | resident3/gfw-x 820–980 隐藏链接、budiancloud 900 隐藏 destination | 中屏先藏次要信息 | O | |
| 移动端堆叠工作台 | h3flow 900 单列、wtx 960 单列 | 双栏 → 单列 | O | |
| 超小屏二次适配 | vellunote 350px、resident3 480px | 极小屏继续收紧 | O | 测试矩阵含 320 |
| viewport-fit=cover | budiancloud | 刘海/手势区适配 | O | + safe-area-inset |

## 10. 工程 Engineering

| 规则 | 来源 | 观测内容 | 分类 | 备注 |
| --- | --- | --- | --- | --- |
| 零框架主流 | budiancloud/gfw-x/resident3/wtx/ciphey/vellunote 均原生 JS | IIFE/ESM,无运行时依赖 | O | h3flow 为 Vite 构建产物(Tailwind v4)证明栈可多元 → skill 须框架无关 |
| 原生能力优先 | `<dialog>`(budiancloud)、`<details>`、crypto.subtle(ciphey)、clipboard、matchMedia、IO、rAF | Web 标准 first | O | |
| localStorage 偏好 | wtx、vellunote、budianai(settings) | 键名带项目前缀 | O | |
| IndexedDB 大数据 | budianai 对话记录 | 结构化数据不走 localStorage | O | |
| 无 JS 静态可读 | budianyun(纯静态无 JS)、wtx(HTML 结构完整) | 核心内容不依赖 JS 渲染 | O | 真实首页的 reveal opacity:0 缺陷除外——skill 修正为 `.js` 前置标记 |
| 系统字体零下载 | 全站群无 @font-face | 首屏无字体请求 | O | 性能原则 |
| 生产分析脚本不入库 | budiancloud 页尾 Cloudflare beacon(token) | 第三方注入 | O | 明确排除在 skill 之外 |

## 11. 分支与站点特有(Boundary)

| 判断 | 内容 | 分类 |
| --- | --- | --- |
| 五种视觉分支成立 | editorial index / product workbench / technical showcase / calm utility / atmospheric experience,与 11 站逐一对应 | I(经交叉验证) |
| 站点特有,不入通用系统 | boogleone 的 Google 风格搜索框、budianyun 的居中下载卡、budianfarm 的像素游戏 UI、vellunote 的 orb/蜡封仪式组件、wtx 的四档蓝色词频条 | O→边界判定 |
| 可泛化模式 | 双栏工作台、紧凑 tabs、kicker+标题的节标题结构、stat 卡、终端窗、模式切换器、空态虚线框 | I |
