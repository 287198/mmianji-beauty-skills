# 眠眠机（IDIC）美化创作 Skill 体系 (v2)

本仓库包含一套眠眠机美化创作 Skill 体系、示范模板和参考成品，采用 **「1 个柔性总控工作流 + 4 个专项能力包 + 示范模板库」** 的模块化架构，同时支持**纯 CSS 轻量轨**与**「JS 基座 + CSS 条目」微引擎轨**。完整成品的使用边界见下文。

## 完整成品的使用与署名

`examples/` 中的「少女病」和「Snowman」完整成品的原作者为 **老农咪**。允许下载、导入并供个人使用，请保留作品中的原作者、来源及素材署名。未经授权，不得转载、转发成品文件、重新打包分发或冒充原创。

经授权公开展示时，请标明原作者 **老农咪** 及仓库来源：[GitHub @287198](https://github.com/287198/mmianji-beauty-skills)，并保留作品及素材的其他适用署名；**署名本身不等于获得转载或分发授权**。完整说明见 [examples/使用与署名说明.md](examples/使用与署名说明.md)。

以上是完整成品的使用说明；Skill 和通用模板与完整成品分开看待，不应将成品视作可自由转载的示范模板。涉及第三方素材时，还需遵守素材各自的权利和授权说明。

## v2 核心优化
* **去拷问、护心流**：总控工作流从「强制门禁」升级为「老练设计师搭档」，禁止甩问卷式追问，改为先给视觉提案与下一步建议，轻量引导。
* **动态场景分流**：支持从 0 起盘、带着半成品优化、单组件 Demo 试错、收尾打包 4 种入口直接切入，不再强行拉回重头定调。

## v2 增量更新

* 增加意象 Demo 映射法与主题化 SVG 按钮要求，保留按创作者需求灵活切入的工作方式。
* 增加从少女病成品整理的无粒子气泡入场、引用样式与蕾丝示范；引用范式仅在创作者没有指定引用样式时作为默认参考。
* 补充气泡动画实践：历史消息加载和重绘不应重播入场，气泡粒子默认不添加；用户坚持使用时先说明可能的卡顿与发热，并在目标设备验证。
* 参考成品收录最新 Snowman 双版本和少女病无粒子版。原 v2 仓库并未包含 Snowman 成品，此处以提供的最新版建立参考目录。

## 下载与使用

从本仓库默认分支下载 ZIP 或克隆仓库即可取得最新版本；请保留各 Skill 文件夹及其 `templates/` 子目录。需要在 Codex 等支持单独安装 Skill 的工具中使用时，将需要的各个 Skill 文件夹分别安装，并保留其内部资源；不同工具可能重命名安装后的文件夹，跨技能引用应按技能名称查找。`examples/` 是完整参考成品，请按上述使用与署名说明使用。

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
│       ├── day-night-theme-switch.css   # 示范：日/夜间双肤切换架构
│       ├── bubble-entry.css             # 示范：仅新增气泡入场，历史消息不重播
│       └── quote-style.css              # 推荐范式：可换色的引用消息样式
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
│       ├── procedural-gears-and-blueprint.js # 示范：参数化啮合齿轮与细线制图底
│       ├── lace-border.css              # 示范：SVG border-image 蕾丝镶边
│       ├── lace-border-source.svg       # 示例边框原始 SVG，可编辑颜色
│       └── lace-units.svg               # 示范：可平铺矢量蕾丝单元
├── 05-fx-realtime-components/
│   ├── SKILL.md                         # 实时数据、粒子与独立动效组件
│   └── templates/
│       ├── realtime-lunar-crest.js      # 示范：实时天文月相签 + ASCII 月面乱码解码
│       ├── ticket-red-packet.js         # 示范：票根化红包组件
│       ├── bubble-particles-and-send-spark.js # 保留旧粒子示范，不默认用于气泡
│       └── aquamarine-gem-component.js  # 示范：Shadow DOM Web Component 独立动效挂件骨架
└── examples/                            # 参考成品（署名已纠正）
    ├── 使用与署名说明.md                # 完整成品的使用边界
    ├── Snowman-双版本/
    │   ├── Snowman-中心动图版.json
    │   └── Snowman-顶栏动图版.json
    └── 少女病-无粒子/
        └── 少女病.json
```
