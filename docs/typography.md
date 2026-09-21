# 排版系统

> 单一事实来源:`../tokens/tokens.css` Typography 段。

## 字体栈

```css
--budian-font-sans:  Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
--budian-font-mono:  ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
--budian-font-serif: ui-serif, "Songti SC", "Noto Serif CJK SC", Georgia, serif; /* 仅氛围分支 */
```

- **零字体下载**:站群 11 站无一处 `@font-face`。Inter 装了就用,没装落到 SF Pro/苹方/雅黑,首屏零字体请求。
- 中文优先 PingFang SC(macOS/iOS)与 Microsoft YaHei(Windows);不引入 Noto Web 字体。
- `-webkit-font-smoothing: antialiased` 于 body。

## 字号刻度(封闭集合)

| 角色 | 值 | 行高 | 字距 | 字重 | 用途 |
| --- | --- | --- | --- | --- | --- |
| `text-display` | `clamp(58px, 8.2vw, 118px)` | .95 | -.06em | 780 | Hero 主句 |
| `text-title` | `clamp(34px, 4vw, 52px)` | 1.05 | -.05em | 800 | 区块 h2 |
| `text-heading` | 19px | 1.25 | -.02em | 700 | 卡片 h3、弹窗标题(20–23px 可选) |
| `text-subheading` | 16px | 1.5 | 0 | 650 | h4、面板标题 |
| `text-body` | 15px | 1.7 | 0 | 400 | 正文 |
| `text-lede` | `clamp(16px, 1.8vw, 21px)` | 1.75 | -.01em | 400 | Hero 段落 |
| `text-small` | 13px | 1.5 | 0 | 400 | 描述、按钮辅助、表格单元 |
| `text-caption` | 11px | 1.4 | .12em | 400–600 | 元信息(常配 mono) |
| `kicker` | 11px | 1 | .18em | 800 | 大写小标签 |
| `text-code` | 13px(mono) | 1.6 | 0 | 400 | 代码块、终端 |

## 规则

1. **刻度封闭。** 不发明中间字号;需要更强的层级时,先调字重/字距/颜色,再加档。
2. **负字距只属于大字。** ≥34px 才允许 -.02em 以下;小字号字距为 0 或正值。
3. **数字一律表格数字。** 指标、金额、时间戳:`font-variant-numeric: tabular-nums`。
4. **Kicker 是 Budian 的签名。** 节标题结构固定:`kicker(大写/等宽可选) + h2 + section-note(mono,右对齐)`。颜色 accent,不参与正文层级。
5. **中文行长。** 正文列 34–46 个全角字符宽(约 620–720px);文档文章列 ~72ch(英文)。
6. **中英混排。** 行高不低于 1.5(CJK 需要呼吸);display 行高 .95 是上限压缩,出现 clipping 立即回到 1。
7. **字重带。** 常用 400 / 600 / 650 / 700 / 780 / 800;可变字体下允许 690–850 的微调,但同一页面字重种类 ≤ 4。
8. **移动端缩放只发生在 display/lede**(clamp 已内置);标题以下字号不随断点变化。

## 移动端(≤640)

- display:`clamp(52px, 16vw, 76px)`(参照观测值,避免 320px 下溢出)。
- lede 固定 15px,行高 1.75。
- caption 允许降到 10px,但配合 aria 或放大触控区。

## 示例

```html
<p class="kicker">SELECTED WORK</p>
<h2>正在发生的事</h2>
<span class="section-note">10 / DESTINATIONS</span>
```

```css
.kicker {
  font-size: var(--budian-kicker-size);
  font-weight: var(--budian-kicker-weight);
  letter-spacing: var(--budian-kicker-tracking);
  text-transform: uppercase;
  color: var(--budian-accent);
}
```
