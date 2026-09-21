# 响应式设计

> 断点来自站群观测聚类,**不是** Tailwind 默认值。原则:Mobile-first, desktop spacious;禁止把桌面页整体缩小当移动版。

## 断点(规范)

| 断点 | 值 | 观测聚类 | 主要行为 |
| --- | --- | --- | --- |
| sm | `max-width: 640px` | 620/640/650/680 | 单列、14px gutter、topbar 76px、堆叠工作台、全宽对话框 |
| md | `max-width: 900px` | 820/900/960/980 | 藏次要标签(destination、section-note)、侧栏抽屉化、双栏→单列 |
| lg | `max-width: 1024px` | 1024(ciphey) | 文档/工具侧栏收窄(220→更窄或折叠) |

辅助微断点(仅特殊页面):480(resident3 数字缩放)、350(vellunote 极小屏)。

## 测试宽度矩阵

`320 · 375 · 430 · 768 · 1024 · 1280 · 1440 · 1920`

核心三宽:375 / 768 / 1440 必测;320 与 1920 抽查。

## 逐区域规则

| 区域 | ≤640 | 641–900 | >900 |
| --- | --- | --- | --- |
| 容器 | `calc(100% - 28px)` | `calc(100% - 40px)` | 同左,上限 1240 |
| Topbar | 76px,品牌只留方块标 | 92px | 92px |
| Hero display | `clamp(52px, 16vw, 76px)` | 中间值 | `clamp(58px, 8.2vw, 118px)` |
| 行卡 | 紧凑四列,94px | 标准四列 | 标准四列 + destination |
| 功能网格 | 1 列 | 2 列 | 3–4 列 |
| 工作台 | 单列,控制面板在下方 | 单列或 2 列 | `1fr + 316px` |
| 表格 | 横向滚动容器或卡片化 | 正常 | sticky 表头 |
| 对话框 | `calc(100% - 28px)`,radius 24 | ≤480px 居中 | 同左 |
| Footer | 单列左对齐 | — | 3 列 `1fr auto 1fr` |
| 侧栏(导航) | 抽屉 + scrim | 抽屉 | 固定列 |

## 视口与环境

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

- 全高区域用 `100svh`(静态)/`100dvh`(动态),**不用裸 `100vh`**(移动端地址栏抖动)。
- 底部固定元素(toast、底部栏)加 `padding-bottom: env(safe-area-inset-bottom)`;刘海侧同理 `env(safe-area-inset-left/right)`。
- 高分屏:`-webkit-font-smoothing: antialiased`;1px hairline 无需特殊处理(亚像素渲染可接受)。

## 输入方式适配

```css
@media (hover: hover) { /* 仅真鼠标获得增强 hover */ }
@media (pointer: coarse) { /* 触控:放大热区、去掉 hover 依赖 */ }
```

- 核心信息(操作说明、菜单项)必须在无 hover 时可见——hover 只是增强。
- 触控下 `:active` 替代 hover 反馈;`-webkit-tap-highlight-color: transparent`。

## 检查清单

- [ ] 320–1920 无水平滚动
- [ ] 无固定高度导致的文本溢出(按钮/卡片/标题)
- [ ] 导航在所有断点可达(抽屉有开关、焦点圈闭)
- [ ] 触控目标 ≥44px
- [ ] 表格在小屏有明确降级(滚动容器标注、或行卡片化)
- [ ] 英文 locale 下导航/按钮不溢出(i18n 与响应式交叉验证)
- [ ] 巨型区块在小屏不留大面积空白(section 节奏已 clamp)
