# 动效系统

> 单一事实来源:`../tokens/tokens.css` Motion 段。原则:**Motion communicates hierarchy, relationship, and state** —— 动效表达层级、关系与状态,其余一律删除。

## 令牌

```css
--budian-motion-instant: 140ms;   /* 微反馈:按钮色变、边框 */
--budian-motion-fast:     250ms;  /* 颜色/背景过渡、hover */
--budian-motion-normal:   350ms;  /* 上浮、投影、图标缩放 */
--budian-motion-slow:     650ms;  /* reveal 入场(500–700 带) */
--budian-motion-grand:    950ms;  /* hero 标题入场 */
--budian-ease-standard: cubic-bezier(.22, 1, .36, 1);  /* Budian 标准减速曲线 */
--budian-ease-enter:    cubic-bezier(.2, .8, .2, 1);   /* 入场族 */
--budian-ease-exit:     cubic-bezier(.4, 0, 1, 1);     /* 退场(加速) */
--budian-ease-ambient:  cubic-bezier(.45, 0, .55, 1);  /* 环境循环 */
--budian-stagger: 55ms;           /* reveal 级联(45–70 带) */
```

## 时长语义

| 时长 | 用途 | 例子 |
| --- | --- | --- |
| 140ms | 即时反馈 | 按钮 color/border、tab 高亮 |
| 250ms | 状态过渡 | hover 背景、主题切换中组件色 |
| 350ms | 空间反馈 | 卡片 -2px 上浮、图标 scale(1.06) |
| 650ms | 内容入场 | reveal(位移 16–20px + opacity) |
| 950ms | 页面宣言 | hero 标题(34px 位移 + blur 8→0) |
| 6–36s | 环境循环 | 光斑漂移 18s、网格 28s、轨道 36s、呼吸 6s |

## Reveal 系统(每页唯一)

```js
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) {
    e.target.classList.add("is-visible");
    io.unobserve(e.target);           // 单向 reveal,不反复触发
  }
}, { threshold: .16, rootMargin: "0px 0px -28px 0px" });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
```

```css
html.js .reveal { opacity: 0; transform: translateY(18px);
  transition: opacity var(--budian-motion-slow) ease,
              transform var(--budian-motion-slow) var(--budian-ease-standard);
  transition-delay: var(--delay, 0ms); }   /* 级联:style="--delay: 110ms" */
html.js .reveal.is-visible { opacity: 1; transform: none; }
```

**铁律**:`opacity: 0` 只能出现在 `html.js` 前缀下——无 JS 时内容必须可见。

## 功能动画(每节至多一个)

- **计数**:`1 - (1-k)^4` quart 缓出,650–900ms,`tabular-nums` 保证不抖。
- **柱条/进度**:width 过渡 720–800ms,`cubic-bezier(.15,.85,.22,1)`。
- **轨道/流程图**:节点状态切换变色 + 路径虚线流动;3.5–14s 循环。
- **打字/流式**:光标 1s 闪烁;字符按 token 流入(工作台分支)。
- **glider(tabs 滑块)**:420ms `cubic-bezier(.22,.82,.24,1)`。

## 入场序列(landing 参考)

nav(75ms,延迟 0)→ kicker(70ms,.15s)→ 标题行一(95ms,.21s)→ 标题行二(95ms,.31s,渐变行附加 8s 缓流)→ lede(85ms,.42s)→ 行动点(85ms,.52s)。级联间隔 90–110ms,总长 <1.5s。

## 性能规则

1. 只动 `transform` / `opacity`(hero 标题的一次性 `filter: blur` 除外)。
2. `backdrop-filter` 不参与动画(切换前后的静态值可以)。
3. 禁止动画 `top/left/width/height/box-shadow`(用 transform 伪影或预合成层替代)。
4. 环境层 `will-change: transform`,且数量 ≤2。
5. 滚动监听一律 `passive: true`;方向感知用 rAF 节流。

## Reduced Motion(强制)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- 关闭:大位移、视差、粒子、无限循环、装饰计数。
- 保留:焦点环、选中态、必要的状态反馈(瞬时完成)。
- 关键信息不得依赖动画呈现(reveal 后的内容在 DOM 中静态存在)。
- JS 侧:`matchMedia('(prefers-reduced-motion: reduce)')` 为真时跳过 IO,直接加 `is-visible`。
