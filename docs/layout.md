# 布局系统

> 单一事实来源:`../tokens/tokens.css` Layout 段。

## 容器

| Token | 值 | 用途 | 观测来源 |
| --- | --- | --- | --- |
| `--budian-container-xl` | 1240px | 编辑索引、landing | budiancloud、gfw-x |
| `--budian-container-lg` | 1180px | 工作台、技术展示 | resident3、h3flow |
| `--budian-container-md` | 940px | 双栏仪式/文章 | vellunote refinement |
| `--budian-container-sm` | 640px | 单任务、聊天列 | vellunote ritual、budianai 消息列 |

**Shell 公式**(全站通用):

```css
.budian-shell {
  width: min(var(--budian-container-xl), calc(100% - 2 * var(--budian-gutter)));
  margin-inline: auto;
}
@media (max-width: 640px) {
  .budian-shell { --budian-gutter: var(--budian-gutter-narrow); } /* 20 → 14 */
}
```

## 结构模式

### 页面骨架(landing / index)

```
topbar(92px,hairline 底边)
└── hero(min-height 100svh − topbar;kicker/大标题/lede/行动点;右侧轨道母题)
└── section(hairline 顶边 + section 节奏;padding: var(--budian-space-section) 0)
└── section …
└── footer(hairline 顶边,3 列 grid;移动单列)
```

### 工作台(product workbench / dashboard)

```
topbar
└── workbench: grid-template-columns: minmax(0,1fr) 316px   /* ≤900 单列 */
    ├── 主面板(composer/画布/表格)
    └── 控制面板(设置/摘要/操作)
```

侧栏式工作台(ciphey/docs):`grid-template-columns: 220px minmax(0,1fr)`,≤1024 收窄、≤900 变抽屉。

### 文档

```
header(搜索 + 链接)
└── grid: 220px(目录,sticky)+ minmax(0,1fr)(文章列 ~72ch)
└── prev/next(hairline 顶边两列)
```

## 关键数值

- topbar 高:92px(桌面)/ 76px(≤640);固定时玻璃 blur(18px)。
- 行卡最小高:108px(桌面)/ 94px(移动)。
- 卡网格:`gap: 10px`(行卡)/ `16–20px`(功能卡);列数 `repeat(auto-fill, minmax(260px, 1fr))` 或固定 2/3 列。
- footer:min-height 150px,3 列 `1fr auto 1fr`;移动单列左对齐。
- 全屏 hero:`min-height: 100svh`(配合 `100dvh` 兜底);`viewport-fit=cover` + `env(safe-area-inset-*)`。

## 分区纪律

1. **先线后盒**:区块用 hairline + 留白分开;只有真正需要抬升的内容才放进卡片。
2. **一屏一意图**:hero 之后每个 section 一个主题,标题区结构统一(kicker + h2 + 右侧 mono note)。
3. **对齐即设计**:行卡的四列 grid(index/icon/copy/destination)严格对齐,是 Budian 秩序感的主要来源。
4. **水平滚动禁止**:任何断点 `overflow-x: hidden` 只能作为最后防线,根因是布局错误。
5. **z 轴纪律**:ambient(装饰)垫底 → content(2)→ sticky(20)→ toast(100)→ skip-link(1000);dialog 走原生 top layer。

## 装饰层(ambient)

- 光斑(orb):42rem 圆,`blur(95px)`,`opacity .18`,18s 漂移;每页 ≤2 个。
- 网格场:72px 网格线,`mask-image` 渐隐,`opacity .32`,28s 慢移。
- 轨道:1px 圆环 + 小发光点,36s 旋转;technical 分支可用。
- 装饰层一律 `aria-hidden` + `pointer-events: none`,reduced-motion 下静止。
