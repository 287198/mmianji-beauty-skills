# 眠眠机（IDIC）美化创作 Skill 体系 (v2)

本仓库包含一套完整的眠眠机美化创作 Skill 体系与可直接复用的示范代码库，采用 **「1 个柔性总控工作流 + 4 个专项能力包 + 示范模板库」** 的模块化架构，同时支持**纯 CSS 轻量轨**与**「JS 基座 + CSS 条目」微引擎轨**。

## v2 核心优化
* **去拷问、护心流**：总控工作流从「强制门禁」升级为「老练设计师搭档」，禁止甩问卷式追问，改为先给视觉提案与下一步建议，轻量引导。
* **动态场景分流**：支持从 0 起盘、带着半成品优化、单组件 Demo 试错、收尾打包 4 种入口直接切入，不再强行拉回重头定调。

## 目录结构

```text
mmianji-beauty-skills/
├── README.md
├── 01-master-workflow/
│   └── SKILL.md                         # 柔性总控工作流（场景分流 / 设计师引导 / Demo 缝合 / 收尾整理）
├── 02-css-material-layout/
│   ├── SKILL.md                         # 视觉材质与布局重构规范
│   └── templates/
│       ├── liquid-glass-refraction.css  # 示范：液态玻璃实时折射底栏
│       └── day-night-theme-switch.css   # 示范：日/夜间双肤切换架构
├── 03-js-base-engine/
│   ├── SKILL.md                         # JS 基座微引擎与性能规范
│   └── templates/
│       ├── bundle-skeleton.json         # 示范：MMIANJI_BEAUTY_BUNDLE_V1 打包骨架
│       ├── extension-lifecycle.js       # 示范：标准生命周期、可见性休眠与无损卸载
│       ├── sticker-header-sniff.js      # 示范：透明表情二进制文件头嗅探修复
│       └── local-image-picker.js        # 示范：本机双击换图与防爆内存引擎
├── 04-svg-icons-geometry/
│   ├── SKILL.md                         # 程序化 SVG 与主题图标重绘
│   └── templates/
│       ├── icon-redraw-map.js           # 示范：24px 细线图标重绘与宿主选择器映射
│       └── procedural-gears-and-blueprint.js # 示范：参数化啮合齿轮与细线制图底
└── 05-fx-realtime-components/
    ├── SKILL.md                         # 实时数据、粒子与独立动效组件
    └── templates/
        ├── realtime-lunar-crest.js      # 示范：实时天文月相签 + ASCII 月面乱码解码
        ├── ticket-red-packet.js         # 示范：票根化红包组件
        ├── bubble-particles-and-send-spark.js # 示范：气泡星屑粒子 + 发送键冰晶动效
        └── aquamarine-gem-component.js  # 示范：Shadow DOM Web Component 独立动效挂件骨架
```
