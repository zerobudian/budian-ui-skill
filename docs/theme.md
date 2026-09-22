# 主题架构(明 / 暗)

> 默认能力:除非用户明确关闭,Budian UI 页面必须支持基于操作系统的自动明暗。本架构综合了站群的三种 Observed 实现(budiancloud 的 data-theme + 内联检测、wtx/vellunote 的持久化、gfw-x/h3flow 的纯 media query),并补齐 Recommended 工程件。

## 三态模型

```
首访 → 读 localStorage("budian-theme")
        ├─ "light" / "dark" → 手动偏好(最高优先)
        └─ 无值 → 跟随 prefers-color-scheme(且持续监听系统变化)
手动切换 → 写入 localStorage → 之后永远手动优先
切回"跟随系统" → 清除存储 → 恢复实时跟随
```

## 1. 防闪烁初始化(内联于 `<head>`,先于样式表)

```html
<script>
  (function () {
    var t = null;
    try { t = localStorage.getItem("budian-theme"); } catch (e) {}
    if (t !== "light" && t !== "dark") {
      t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.documentElement.dataset.theme = t;
  })();
</script>
```

- 必须内联、必须先于 `<link rel="stylesheet">`,否则首帧闪错主题(FOUC)。
- `try/catch` 包住 localStorage(隐私模式/禁用cookie 下抛异常)。

## 2. CSS 结构

```css
:root { color-scheme: light; /* + 全部浅色 token */ }
:root[data-theme="dark"] { color-scheme: dark; /* + 全部深色 token */ }
```

- `color-scheme` 让原生控件(滚动条、表单、`<dialog>`)同步换肤——站群三站已 Observed。
- 深色不是简单反转:bg 换近黑 `#050609`,muted 变亮,阴影加深,accent 提亮为暗底优化的蓝。

## 3. meta theme-color(双值 + JS 同步)

```html
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#f3f5f8">
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#050609">
```

```js
// 手动覆盖后同步(系统跟随时浏览器自动处理):
const meta = document.querySelector('meta[name="theme-color"][media]');
meta.content = theme === "dark" ? "#050609" : "#f3f5f8";
```

## 4. 切换模块(完整)

```js
const THEME_KEY = "budian-theme";
const root = document.documentElement;
const media = matchMedia("(prefers-color-scheme: dark)");

function applyTheme(mode) {          // mode: "system" | "light" | "dark"
  const resolved = mode === "system"
    ? (media.matches ? "dark" : "light")
    : mode;
  root.dataset.theme = resolved;
  if (mode === "system") {
    try { localStorage.removeItem(THEME_KEY); } catch (e) {}
  } else {
    try { localStorage.setItem(THEME_KEY, mode); } catch (e) {}
  }
  syncMeta(resolved);
  syncButton(mode, resolved);        // aria-label + 图标(太阳/月亮二选一显示)
}

media.addEventListener("change", () => {
  if (!localStorage.getItem(THEME_KEY)) applyTheme("system");  // 无手动偏好→实时跟随
});
```

- 切换**不刷新页面**;颜色经 token 过渡 250ms 平滑完成。
- 三态循环按钮:system → light → dark → system;`aria-label` 随状态更新(如"切换为浅色模式")。

### 按钮状态契约(v1.1.0 起)

初始化完成后,主题切换按钮的 **icon、`aria-label`、`aria-pressed`** 三者必须与当前实际主题一致——不允许出现"页面已是深色,按钮仍显示切换深色模式"的状态错误。实现方式:

- 静态 HTML 只写**中性** `aria-label`(如"切换明暗主题"),**不硬编码** `aria-pressed`;
- 运行时在 init 后写入 `aria-pressed`(与 resolved 主题一致)和方向性 `aria-label`(深色时→"切换为浅色模式");
- 图标(太阳/月亮)由 CSS 按 `[data-theme]` 切换,首帧即正确;
- 因此运行时加载失败时,按钮只会留下中性的、不会出错的标签,而不是错误状态。

### 实时跟随的实现细节

监听对象是 `matchMedia("(prefers-color-scheme: dark)")` 的 **change 事件**(系统外观翻转时触发)。注意:不存在 `"(prefers-color-scheme: change)"` 这样的媒体查询——历史上这里出过 bug,写成后者会导致监听永远不触发。用户存在手动偏好(localStorage 有值)时,系统变化不覆盖用户选择。

## 5. 资产适配清单

| 资产 | 规则 |
| --- | --- |
| SVG 图标 | `fill: none; stroke: currentColor;` 继承文字色,零处理 |
| Logo / 品牌 | 双版本 `currentColor` 或按 `[data-theme]` 切换 `hidden` |
| 代码块 | 双主题恒暗(token 已内置),仅边框微调 |
| 渐变短语 | 双主题同值,暗色下不透明度略降(如 .9) |
| 环境光斑 | 暗色 opacity .18 → .09(budianai Observed),避免夜间过亮 |
| 图片/图表 | 提供暗色版本或加 `filter: brightness(.9)` 轻调;canvas 重绘读 token |
| 导航/topbar | 玻璃表面 token 自动切换;阴影换深色档 |
| 浏览器 chrome | meta theme-color 同步(见上) |

**验收红线**:任何主题下不得出现白底白字/黑底黑字;切换后无残留旧主题组件;首帧无闪烁。

## 6. 主题与系统变化的组合矩阵

| localStorage | 系统外观 | 结果 | 系统切换后 |
| --- | --- | --- | --- |
| 无 | light | light | 跟随变 dark |
| 无 | dark | dark | 跟随变 light |
| light | dark | light | 不变(手动优先) |
| dark | light | dark | 不变(手动优先) |

## 7. SSR / 静态 HTML 注意

- 静态站:内联脚本方案即可(见 examples)。
- SSR 框架:同一脚本放进 `<head>` 模板,在任何样式注入前输出;框架水合前 `data-theme` 已就位,不闪。
- 不要用 CSS `transition` 于 `:root` 级颜色(整页过渡会拖慢切换体感),交给组件级 250ms 过渡。
