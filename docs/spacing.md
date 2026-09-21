# 间距系统

> 单一事实来源:`../tokens/tokens.css` Spacing 段。刻度来自站群高频观测值(4/8/12/16/20/24/32/48/64/96)。

## 刻度

```css
--budian-space-1: 4px;   /* 图标与文字、徽章内距 */
--budian-space-2: 8px;   /* 按钮组、列表项内距、紧凑 gap */
--budian-space-3: 12px;  /* 卡片内距(移动)、工具栏 */
--budian-space-4: 16px;  /* 通用组件内距、卡间 gap 上限 */
--budian-space-5: 20px;  /* 卡片内距(桌面)、双栏 gap */
--budian-space-6: 24px;  /* 面板 padding、对话框内距 */
--budian-space-8: 32px;  /* 对话框内距、区块标题与内容 */
--budian-space-10: 40px; /* 少用:大面板内距 */
--budian-space-12: 48px; /* hero 底部留白、footer 上距 */
--budian-space-16: 64px; /* 移动端区块节奏 */
--budian-space-20: 80px; /* 桌面区块节奏 */
--budian-space-24: 96px; /* 大型区块节奏上限 */
--budian-space-section: clamp(64px, 9vw, 112px); /* 区块通用节奏 */
```

## 节奏规则

1. **4px 基数,档位封闭。** 需要中间值时说明理由(如 7px 的观测微调仅限历史还原)。
2. **区块间大,组件间小。** section 节奏 64–112px;卡网格 gap 10–20px;这两类间距属于不同量级,不可互相挪用。
3. **区块分隔优先级**:留白 → 发丝线(`border-top`)→ 容器卡片。三者按顺序考虑。
4. **垂直韵律用 section token**,不自定义 padding:如 `padding: var(--budian-space-section) 0`。
5. **hero 内部**:kicker 与标题 24–30px;标题与 lede 32–38px;lede 与行动点 44–48px(观测带)。
6. **卡片内距**:桌面 18–20px,移动 12–15px(行卡观测值)。

## 禁止

- `margin` 手工叠加出 37px、53px 之类非刻度值。
- 用 `padding` 解决布局问题(应改用 gap / 对齐)。
- 组件间用负 margin 硬贴(玻璃卡内高光除外,那是视觉不是布局)。

## 语义别名(可选)

项目可将刻度映射为语义名,但底层仍指向 token:

```css
:root {
  --space-inline: var(--budian-space-2);   /* 行内元素间 */
  --space-stack: var(--budian-space-4);    /* 堆叠段落间 */
  --space-group: var(--budian-space-5);    /* 卡片内距 */
}
```
