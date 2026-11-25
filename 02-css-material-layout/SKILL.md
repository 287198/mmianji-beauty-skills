---
name: mmianji-css-material-layout
description: 眠眠机（IDIC）视觉材质与布局重构规范。涵盖 CSS 变量架构、液态玻璃实时折射、去气泡台词框、日/夜间双肤切换、高权重覆盖与透明表情防穿帮规则。
---

# 视觉材质与布局重构规范

## 核心设计原则

1. **CSS 变量驱动**：所有颜色、线框透明度、字体栈、粒子色统一定义在根视图作用域下（如 `body.os-list-visible`、`#chat-window-view`），方便一键衍生日/夜间双肤或跨主题换色。
2. **克制与呼吸感**：极简/忧郁/INS 风格严禁高饱和霓虹与杂乱投影；善用 `1px` 细线（`rgba(..., .16-.22)`）、极低透明度底面与局部香槟金/冷银点缀。
3. **精准权重压制**：
   * 覆盖原生消息气泡时，必须保留完整的 `:not(.message-red-packet):not(.message-sticker)...` 排除链，避免误伤红包、卡片、图片、表情和 HTML 小组件。
   * 需要高权重覆盖时，使用 ID 叠加（如 `#chat-window-view #message-container#message-container`）而非全局通配符。
4. **光学材质性能兜底**：
   * 使用 `backdrop-filter`（尤其是 SVG `feDisplacementMap` 液态玻璃折射）时，必须在 `body.chat-keyboard-resizing` 期间临时关闭滤镜，防键盘弹起掉帧。
   * 必须提供 `@supports not (backdrop-filter: url(...))` 降级方案。
5. **日/夜间双肤架构**：
   * 夜间与日间两套 CSS 复用同一个聊天 JS 基座。
   * 通过 CSS 变量 `--osc-particle-color` 向 JS 传递粒子颜色，实现切换皮肤时 Canvas 粒子自动同步换色。

## 内置示范模板

* `templates/liquid-glass-refraction.css` — 液态玻璃实时折射底栏（SVG `feDisplacementMap` + 响应式 `scale` + 蒙版边缘折射 + 键盘缩放降级）。
* `templates/day-night-theme-switch.css` — 日/夜间双肤切换架构（复用同一 JS 基座、同步粒子色与设置页深浅色）。
* `templates/quote-style.css` — 从《少女病》提取的引用样式**推荐范式**：双向钩子、圆角标签与截断摘要。可主动借鉴结构与精致度，按主题替换提示文字、标签、图片和颜色；创作者明确指定引用样式时以其要求为准，不擅自更改。保留引用文本节点及特殊 HTML 排除范围。
* `templates/bubble-entry.css` — 无粒子气泡入场动画；仅对当前会话经可靠消息事件确认的新增消息临时加 `mm-bubble-arriving`，动画结束或卸载后移除。切换会话、历史加载和整页重绘不能播放；不要仅凭 DOM 节点新增判定。遵循系统减少动态效果设置，并在实机验证。
