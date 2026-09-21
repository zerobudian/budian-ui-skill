# 无障碍架构

> 默认能力,非可选。综合 budiancloud(焦点环/aria-hidden/dialog)、budianai(aria 全家桶)、GFW X(skip-link)、vellunote(44px/forced-colors)的 Observed 实践。

## 基线清单

| 项 | 规则 | 来源 |
| --- | --- | --- |
| 语义 HTML | landmark(header/nav/main/aside/footer)、标题层级不跳级、按钮用 `<button>`、链接用 `<a>` | 通用 |
| 键盘 | 全部交互可达;modal 圈闭焦点(`<dialog>` 自带);抽屉 Esc 关闭;tabs ←→/Home/End | O |
| 焦点可见 | `:focus-visible { outline: 3px solid color-mix(in srgb, var(--budian-ring) 42%, transparent); outline-offset: 3px; }` | O |
| skip-link | 首个 Tab 焦点出现"跳到主内容";`z-index: 1000`,平时 `translateY(-150%)` | O@gfw-x |
| aria | 仅补原生语义缺口:tablist/tab/tabpanel、aria-selected、aria-expanded、aria-controls、aria-live、aria-busy、aria-describedby | O |
| 触控目标 | ≥44×44px(视觉可小,热区不可) | O@vellunote |
| 屏幕阅读器文本 | 装饰层 `aria-hidden="true"`;图标按钮必有 `aria-label` | O |
| Reduced motion | 全局开关(见 motion.md);信息不依赖动画 | O |
| 对比度 | 正文 ≥7:1,muted ≥4.5:1,AA 达标 | O/I |
| 表单 | `<label for>` 绑定;错误 `aria-describedby` + danger 说明;必填标注 | O@budianai |
| 异步状态 | toast `role="status"`;加载区 `aria-busy`;错误 `aria-live="assertive"` | O |

## 焦点规范

```css
:focus-visible {
  outline: var(--budian-focus-width) solid color-mix(in srgb, var(--budian-ring) 42%, transparent);
  outline-offset: var(--budian-focus-offset);
}
```

- 全局一次定义,组件不覆盖(除圆形图标钮可换 box-shadow 环,等价可见)。
- `outline: none` 无替代 = 禁止。
- 卡片作为链接:焦点环出现在整卡(`:focus-visible` 同 hover 样式路径)。

## 组件级模式

- **Tabs**:`role="tablist/tab/tabpanel"` + `aria-selected` + 键盘循环;未选中 `tabindex="-1"`。
- **Modal**:原生 `<dialog>`(焦点圈闭、Esc、`aria-labelledby` 标题);遮罩点击关闭需同时保留 Esc。
- **Toast**:`role="status"` + `aria-live="polite"`,不打断阅读。
- **图标按钮**:操作名进 `aria-label`(随 locale 切换)。
- **图表/canvas**:提供文本等价(数据表或 `aria-label` 摘要)。
- **表单错误**:输入 `aria-invalid="true"` + 错误文本 `id` 挂 `aria-describedby`。

## 触控与指针

```css
@media (hover: hover) { .card:hover { transform: translateY(-2px); } }
@media (pointer: coarse) { .menu-item { min-height: 44px; } }
button, a { -webkit-tap-highlight-color: transparent; }
```

核心信息不得仅存于 hover 态(tooltip 内容需可经 focus 或常显获取)。

## 高对比与强制色彩

```css
@media (forced-colors: active) {
  .orb, .card-icon { border: 2px solid ButtonText; }
  .progress-ring { stroke: Highlight; }
}
```

vellunote Observed;图形组件在 forced-colors 下用系统色重描边。

## 验收

- [ ] 仅用键盘完成全部核心流程(含 modal/抽屉/tabs)
- [ ] Tab 首站出现 skip-link;焦点环全程可见
- [ ] 屏幕阅读器(VoiceOver/NVDA 抽查)能读出:页面标题、导航、异步状态
- [ ] axe/Lighthouse 无 critical 违规
- [ ] 缩放 200% 不破版(重排而非截断)
