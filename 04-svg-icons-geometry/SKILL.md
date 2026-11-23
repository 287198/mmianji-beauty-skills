---
name: mmianji-svg-icons-geometry
description: 眠眠机（IDIC）程序化 SVG 与主题图标重绘规范。涵盖 24px 细线图标重绘、宿主按钮映射注入、参数化啮合齿轮系、数学公式环、黄金螺线与建筑立面制图装饰。
---

# 程序化 SVG 与主题图标重绘规范

## 核心视觉法则

1. **克制的主题图标重绘**：
   * 统一使用 `viewBox="0 0 24 24"`、`fill="none"`、一致的描边线宽（推荐 `1.25px`–`1.4px`）与 `stroke-linecap="round"`。
   * 将主题意象**克制地**融入基础图标语义中（例如冬日主题：朋友圈→雪花水晶球、红包→带齿孔票根、AI 助手→六角冰晶、发送键→带雪风尾迹的纸飞机），绝不为了装饰牺牲图标可辨识度。
   * 注入方式：在按钮内插入 `.wf-ico-wrap` 包裹新 SVG，配合 CSS 隐藏原生 `> svg`，并在 `deactivate` 时彻底移除 `.wf-ico-wrap` 与 `.wf-iconized` 类名。
2. **程序化细线制图装饰**：
   * 用数学函数生成高精度矢量装饰（如啮合齿轮、黄金矩形与螺线、137.5° 黄金角叶序点阵、中国斗拱/帕特农建筑立面、数学公式环），比位图更清晰且体积极小。
   * 线稿透明度保持在 `0.09`–`0.45` 之间，作为背景纹理退后，绝不抢夺聊天气泡的阅读焦点。

## 内置示范模板

* `templates/icon-redraw-map.js` — 24px 细线主题图标重绘集 + 完整宿主选择器映射表（`ICON_TARGETS`）。
* `templates/procedural-gears-and-blueprint.js` — 精确齿对槽啮合齿轮生成器（`gearPath` / `meshRotation`）+ 黄金螺线与叶序点阵生成器。
