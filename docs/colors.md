# 色彩系统

> 单一事实来源:`../tokens/tokens.css`(CSS)/ `../tokens/tokens.json`(数据)。本文解释用法与纪律。

## 原则

1. **内容近乎单色,颜色即信息。** 每页一个 accent 家族;额外颜色只表达状态或类别。
2. **组件只消费语义 token。** `var(--budian-accent)` 而非 `#237cff`;raw 值仅存在于 tokens 文件。
3. **派生优先于新增。** hover、tint、边框着色用 `color-mix(in srgb, var(--budian-accent) N%, transparent/var(--budian-surface))` 生成,不发明新 hex。
4. **双主题成对定义。** 任何新颜色必须同时给出浅/深两态并验证对比度。
5. **终端面恒暗。** 代码块在浅色模式也保持深底,这是 Budian 的工程质感来源之一。

## 语义令牌(浅 / 深)

| Token | 浅 | 深 | 用途 |
| --- | --- | --- | --- |
| `--budian-bg` | `#f3f5f8` | `#050609` | 页面画布 |
| `--budian-bg-inset` | `#ebeef3` | `#0b0e14` | 凹陷面:输入底、表头、代码浅面、斑马纹 |
| `--budian-surface` | `rgba(255,255,255,.68)` | `rgba(15,18,25,.66)` | 玻璃卡、行卡、浮层底 |
| `--budian-surface-strong` | `rgba(255,255,255,.90)` | `rgba(17,20,28,.92)` | 对话框、popover、吐司 |
| `--budian-text-primary` | `#111419` | `#f4f7fb` | 标题、正文主色 |
| `--budian-text-secondary` | `#3f4756` | `#c3cad6` | 次级正文、表单说明 |
| `--budian-text-muted` | `#667085` | `#9299a8` | 元信息、描述、占位 |
| `--budian-border` | `rgba(15,23,42,.12)` | `rgba(255,255,255,.11)` | 发丝线 |
| `--budian-border-strong` | `rgba(15,23,42,.22)` | `rgba(255,255,255,.24)` | 悬停边框、选中边框 |
| `--budian-accent` | `#237cff` | `#48b8ff` | 主强调:链接、选中、kicker |
| `--budian-accent-hover` | `#1a6ef0` | `#67b6ff` | 强调悬停 |
| `--budian-on-accent` | `#ffffff` | `#05070a` | accent 上的文字/图标 |
| `--budian-ring` | `#1a78ff` | `#67b6ff` | 焦点环基色 |
| `--budian-success` | `#0ca30c` | `#34ef8a` | 成功、在线 |
| `--budian-warning` | `#c58100` | `#f0b340` | 观察中、降级 |
| `--budian-danger` | `#e65243` | `#ff6b5c` | 错误、危险 |
| `--budian-info` | `#1a78ff` | `#67b6ff` | 中性提示 |
| `--budian-code-bg / -text / -border` | `#101318` / `#e7edf6` / 白 8% | `#0d1015` / 同 / 同 | 终端与代码块 |

## 卡面 Accent 调色板

用于列表项分类(索引卡、功能卡),通过局部变量注入:

```css
.project-card.accent-cyan { --card-accent: var(--budian-raw-cyan); }
.project-card.accent-green { --card-accent: var(--budian-raw-green); }
/* …violet / blue / amber / lime / orange / rose / red 同理 */
```

消费方式(全部 color-mix 派生,不手写 rgba):

- 图标块:`color: var(--card-accent); background: color-mix(in srgb, var(--card-accent) 9%, transparent); border: 1px solid color-mix(in srgb, var(--card-accent) 17%, transparent);`
- 悬停边框:`color-mix(in srgb, var(--card-accent) 34%, var(--budian-border))`
- 徽章:`7% 底 + 22% 边框`
- 悬停投影:`0 12px 34px color-mix(in srgb, var(--card-accent) 7%, transparent)`

九色为封闭集合,不得随意扩充;一个网格内可混用(表达类别),但同页主 accent 仍只有一个。

## 渐变短语

`--budian-gradient-phrase: linear-gradient(100deg, #1976ff 4%, #63d8ff 52%, #7c5cff 98%)`

- 每页**至多一次**,且只在 hero 的一行文字上(`background-clip: text`)。
- 可加 8s `gradient-flow` 缓慢流动(reduced-motion 下静止)。
- 除此之外页面不得出现装饰性渐变(状态渐变条、图表数据渐变除外)。

## 状态与指示

- 状态点(live):7px 圆 + 双层 glow(`0 0 0 5px 10% + 0 0 18px 60%`),颜色用 success。
- 状态色做**小字号正文**时对比度不足:改为 `text-secondary` 文字 + 状态色圆点/图标;状态色文字仅用于 ≥13px 或加粗场景。
- 表单错误:danger 边框 + danger 文字说明(≥13px)+ `aria-describedby` 关联。

## 对比度要求

- 正文(text-primary on bg):≥ 7:1(实测 ≈ 15:1)。
- muted 文字:≥ 4.5:1(浅 `#667085` on `#f3f5f8` ≈ 4.9:1;深 `#9299a8` on `#050609` ≈ 7:1)。
- accent 作为文字时仅在 ≥ 14px 或 600+ 字重使用;小字用 text-secondary。
- 焦点环:`color-mix(accent 42%, transparent)` 实测两主题下均与非交互背景区分明确;不足处提高到 60%。
