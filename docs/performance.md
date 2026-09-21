# 性能与工程哲学

## 依赖哲学

- **Web standards first**:站群主流为零运行时依赖的原生 JS(IIFE/ESM);唯一例外 h3flow 为 Vite+Tailwind 构建——证明系统须框架无关。
- 不为单个动画引入库:reveal 用 IntersectionObserver,计数用 rAF,弹窗用 `<dialog>`,折叠用 `<details>`。
- React/Vue/Svelte/Astro 适配:core(token + 行为规则)不变,仅薄适配层;`tokens/tailwind-example.js` 是适配示例而非必需。
- 字体:全系统栈,零 `@font-face`,零字体 CDN(站群 Observed)。

## 关键路径

| 项 | 规则 |
| --- | --- |
| 首屏 | 内联主题脚本(<0.2KB)+ 单一 CSS 文件;无渲染阻塞的第三方脚本 |
| CSS | 单文件 ≤40KB(未压缩);示例 landing 全套 ≈18KB |
| JS | 每页 <8KB(未压缩);`defer` 加载;无打包器也可直接运行 |
| 图片 | SVG 优先;位图 `loading="lazy"` + `decoding="async"`;显式宽高防 CLS |
| 网络 | 零第三方请求(无统计/字体/图标 CDN);开发期也不引入 |

## 渲染性能

1. 动画只用 `transform`/`opacity`(hero 标题一次性 blur 除外)——合成器友好。
2. `backdrop-filter` 保持静态,不参与过渡;数量 ≤3 个并发可见。
3. 环境光斑 `will-change: transform` 且 ≤2 个。
4. 滚动监听 `passive: true`;方向检测节流(>3px 才判向)。
5. 避免布局抖动:计数动画用 tabular-nums;骨架屏尺寸与内容一致。
6. `content-visibility: auto` 可用于长文档后续区块(渐进增强)。

## 渐进增强(No-JS 思维)

```
HTML(可用)→ CSS(润色)→ JS(增强)
```

- **禁止** `body { opacity: 0 }` 等 JS 才显示的整页门控。
- reveal 隐藏态必须挂在 `html.js` 前缀下(JS 存活才添加该类)。
- 核心内容/链接/文档正文在禁用 JS 时完整可读、可导航(参考 budianyun 纯静态站、wtx 结构完整)。
- 工作台类页面允许"交互需 JS",但静态外壳(说明、空态、联系途径)仍需可见。

## 框架无关的模块约定

- 主题/i18n/reveal 三件套 ≈130 行,可直接复制(见 examples/*/app.js)。
- 状态优先用原生属性:`data-state`、`aria-selected`、`hidden`。
- 无构建步骤:双击 `index.html` 即运行;`python3 -m http.server` 即开发。

## 交付检查

- [ ] Lighthouse Performance ≥ 95(静态页,本地测试)
- [ ] 无 console 错误;无未捕获 Promise
- [ ] CLS < 0.02;LCP 用系统字体无阻塞
- [ ] 禁用 JS:核心内容可用
- [ ] 请求瀑布:仅 HTML + CSS + JS(≤3 个文件)
