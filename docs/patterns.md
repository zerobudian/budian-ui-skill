# 页面模式

> 每个模式 = 结构骨架 + 内容配方 + 适配要求。示例实现见 `../examples/`。

## 1. Landing / Editorial Index

**适用**:产品宣传页、项目索引、作品集。**示例**:`examples/landing`。

```
topbar:品牌 + 导航(锚点)+ [更新] [主题] [语言] [登录/CTA]
hero:kicker(状态灯 + 大写标签)→ display 标题(第二行渐变)→ lede → scroll-cue
section 1 "功能/项目":kicker + h2 + mono note → 行卡网格(accent 分类,stagger reveal)
section 2 "指标":stat 卡(大数字 + 计数动画)
section 3 "连接/资源":双列卡
footer:品牌语 + 托管/版权
```

- 首屏一个视觉意图;环境 ≤2 光斑或 1 轨道。
- 行卡点击整卡;CTA 一个主一个次。
- 对话框承载"更新日志/等待列表";toast 承载轻反馈。

## 2. Developer Tool / Product Workbench

**适用**:生成工具、编辑器、上传流。**参考**:h3flowconsole。

```
topbar:品牌 + 连接状态(呼吸点)+ [设置]
compact hero:eyebrow + 中号标题 + 一句说明
workbench(首屏内):主面板(composer:输入区 + 素材区 + 生成按钮)
                  控制面板 316px(参数段:分段选择 + 滑杆 + 摘要)
result:状态时间线(排队→处理中→完成)+ 产物区
features:图标 + 标题 + 描述 的行式排布
integration:终端窗(安装命令 + 复制)
cta + footer
```

- 任务面在首屏,营销退后。
- 控件分组用 hairline + 小标题,不用嵌套卡片。
- 生成按钮是页面最强操作:54px 高、accent、loading 态。

## 3. Dashboard

**适用**:控制台、监控、管理。**示例**:`examples/dashboard`。

```
sidebar 240px:品牌 + 导航(分组)+ 底部用户
topbar:面包屑/页标题 + [搜索] [主题] [语言] [通知]
main:
  metric 行:4 张 stat 卡(kicker + 大数字 + 环比 pill)
  chart 区:CSS/SVG 柱状/分段条(720ms width 动画,tabular)
  table:队列/事件列表(sticky 表头,状态 badge,行操作)
  (空态/加载态真实呈现)
settings dialog:表单分区 + 主操作
```

- 密度高于 landing,但仍是 hairline 结构、克制阴影。
- 数字全部 tabular-nums;状态用 badge 而非彩色整行。
- ≤900:侧栏变抽屉(scrim + 焦点圈闭);metric 卡 2 列;表格横向滚动容器。

## 4. Documentation

**适用**:文档站、指南、API 参考。**示例**:`examples/docs`。

```
header:品牌 + 搜索框(kbd ⌘K 提示)+ [主题] [语言]
layout:220px TOC(sticky,当前节高亮)+ 文章列(~72ch)
article:h1 + meta(更新日期,Intl 格式)
  h2/h3 层级 · 段落 · code block(恒暗 + 复制)· callout(注意/提示)
  表格 · 列表
prev/next:hairline 两列卡
footer
```

- 移动:TOC 折叠为抽屉/下拉;prev/next 保持。
- 搜索为渐进增强(`<input>` 可用即可,命令面板是扩展方向)。

## 5. Calm Utility

**适用**:单任务工具(加密、转换、写作)。**参考**:ciphey、budianwtx。

```
极简外壳:品牌 + [主题] [语言]
任务区居中或双栏:输入 pane + 输出 pane(tabs 切换模式)
工具栏:紧凑操作按钮 + 字数/状态(mono)
空态:虚线框 + 单句指引
隐私说明:贴近任务("本地处理,不上传")
```

- 减少导航与装饰;动效只留状态反馈。
- 快捷键(⌘/Ctrl+Enter 执行、Esc 清空)+ `title` 提示。

## 6. Status / System Page

**适用**:服务状态、可用性公告。**结构**:

```
状态横幅(All systems operational + 状态灯)
uptime 摘要(90 天条带图)
事件时间线(日期 + 状态色 + 处理过程)
组件列表(各服务状态 badge)
```

- 状态色承担全部表达;无装饰动效;数据真实可溯源。

## 通用适配要求(所有模式)

- 主题三态 + i18n 双语 + 640/900/1024 三断点 + reduced-motion + 无 JS 可读。
- 每页自查:一个焦点、一个 accent、一套 reveal、零装饰性渐变/玻璃堆叠。
