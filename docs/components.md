# 组件规范

> 实物参考:`../examples/components/`(可直接打开的组件索引页)。每个组件给出:用途 / 解剖 / 变体 / 状态 / 无障碍 / 动效。

## 通用纪律

- 组件 CSS 只消费语义 token;变体用类,状态用伪类/`data-state`。
- 每个交互组件必须覆盖:default · hover · `:focus-visible` · active · selected · disabled · loading(适用时)。
- 焦点环统一:`outline: 3px solid color-mix(in srgb, var(--budian-ring) 42%, transparent); outline-offset: 3px;`。禁止无替代的 `outline: none`。
- 触控目标 ≥ 44×44px(可视觉小于此值,但点击热区不可)。

## 核心组件清单

| 组件 | 说明 | 状态 |
| --- | --- | --- |
| Topbar / Navbar | 92/76px,hairline 底,38px 方形品牌标,右侧动作簇 | 固定时玻璃化 |
| Hero | kicker + display 标题(至多一行渐变)+ lede + 行动点 | — |
| Button | 40–52px 高,radius 14 | 6 状态 |
| Icon Button | 40×40 方形图标钮 | 同 Button |
| Card / Row Card | radius 18,玻璃,四列行卡或功能卡 | hover 上浮 |
| Feature Card | 图标块 + 标题 + 描述,accent 注入 | — |
| Stat Card | 大 tabular 数字 + kicker 标签 | 计数动画可选 |
| Badge / Pill | 9–11px,radius 999,tint 派生 | — |
| Input / Textarea / Select | radius 10–14,hairline,`focus-within` 高亮 | error/disabled |
| Checkbox / Radio / Toggle | 20px 控件 + 44px 热区 | 4 状态 |
| Tabs | 紧凑,2px 下划线或 inset 胶囊选中 | 完整键盘 |
| Segmented Control | 真模式切换(非导航) | — |
| Dropdown | 优先 `<details>` 渐进增强 | 键盘完整 |
| Tooltip | CSS `data-tip` + `::after` | focus 可见 |
| Modal | 原生 `<dialog>`,radius 24,blur(36) | 遮罩点击关闭 |
| Toast | 底部居中,radius 14,blur(24),2.8s | aria-live |
| Alert / Callout | 状态色左边框或胶囊 | 4 变体 |
| Code Block / Terminal | 恒暗面,mono 13px,头部栏 + 复制 | — |
| Table | hairline 行,右对齐指标,sticky 表头 | 空态/加载 |
| Empty State | 虚线 hairline 框 + 短文案 + 单操作 | — |
| Skeleton | 仅真异步区域,8% 白闪 1.5s | — |
| Progress | 胶囊轨道 6–18px,width 过渡 720–800ms | — |
| Status Indicator | 7px 点 + glow,状态色 | — |
| Breadcrumb | mono 小字 + `/` 分隔 | — |
| Sidebar / Drawer | 220–280px,≤900 变抽屉 + scrim | 焦点圈闭 |
| Search | 输入 + kbd 提示;命令面板为扩展方向 | — |

**明确不进入 Core**(站群不存在,勿伪装为已有):Date Picker、Data Grid、File Upload、Command Menu(⌘K)。需要时按现有 token 新设计并标 Recommended。

## 重点组件规格

### Button

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  height: 40px; padding-inline: 18px; border: 0; border-radius: var(--budian-radius-md);
  font: 600 14px/1 var(--budian-font-sans); cursor: pointer;
  transition: color var(--budian-motion-fast) ease,
              background var(--budian-motion-fast) ease,
              transform var(--budian-motion-fast) var(--budian-ease-standard);
}
.btn-solid   { background: var(--budian-text-primary); color: var(--budian-bg); }
.btn-solid:hover  { transform: translateY(-1px); }
.btn-ghost   { background: var(--budian-surface); color: var(--budian-text-primary);
               border: 1px solid var(--budian-border); }
.btn[disabled] { opacity: var(--budian-opacity-disabled); pointer-events: none; }
```

变体:solid / ghost / text / danger。loading 态:内联 14px 旋转圈替换图标,按钮宽度不变,`aria-busy="true"`。

### Row Card(索引行卡,签名组件)

```css
.row-card {
  min-height: 108px; display: grid;
  grid-template-columns: 34px 42px minmax(0, 1fr) auto; gap: 20px;
  align-items: center; padding: 18px 20px;
  border: 1px solid var(--budian-border); border-radius: var(--budian-radius-lg);
  background: var(--budian-surface); backdrop-filter: blur(var(--budian-blur-md));
  box-shadow: var(--budian-highlight-edge);
  transition: transform var(--budian-motion-normal) var(--budian-ease-standard),
              border-color var(--budian-motion-fast) ease,
              box-shadow var(--budian-motion-normal) ease;
}
.row-card:hover, .row-card:focus-visible {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--card-accent) 34%, var(--budian-border));
  box-shadow: 0 12px 34px color-mix(in srgb, var(--card-accent) 7%, transparent),
              var(--budian-highlight-edge);
}
```

解剖:`01`(mono 索引)/ 图标块(accent 9%/17%)/ 标题+描述(描述单行省略)/ 目的地(mono)+ 圆形箭头钮(hover 变 accent 底 + 2px 斜移)。移动:四列变紧凑(24/40/1fr/36),min-height 94。

### Tabs(role 完整)

```html
<div class="tabs" role="tablist" aria-label="结果">
  <button class="tab" role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1">概览</button>
  <button class="tab" role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">明细</button>
</div>
<div class="tab-panel" role="tabpanel" id="panel-1" aria-labelledby="tab-1">…</div>
```

键盘:←→ 切换、Home/End 跳转;未选中 tab `tabindex="-1"`。

### Modal(原生 dialog)

```html
<dialog class="modal" aria-labelledby="modal-title">
  <form method="dialog">
    <h2 id="modal-title">…</h2>
    <button class="btn btn-solid" value="close">确定</button>
  </form>
</dialog>
```

`showModal()` 打开;点击 `event.target === dialog` 关闭(遮罩点击);`::backdrop { background: var(--budian-overlay); backdrop-filter: blur(var(--budian-blur-sm)); }`;入场 300ms scale+fade。

### Toast

`role="status"` + `aria-live="polite"`;触发用 class 切换 + `void el.offsetWidth` 重排技巧 + rAF;2.8s 自动消失;同一时刻至多一条。

## 状态矩阵(必须全部可验证)

| 状态 | 实现方式 |
| --- | --- |
| hover | `:hover`(信息不藏在 hover 里)+ `@media (hover: hover)` 守卫增强效果 |
| focus | `:focus-visible` 3px 环 |
| active | `:active` 1–2px 下压 |
| selected | `aria-selected` + 样式类 |
| disabled | `[disabled]` + opacity .55 + `pointer-events: none` |
| loading | spinner + `aria-busy` |
| error | danger 边框 + 说明 + `aria-describedby` |
| empty | Empty State 组件 |
