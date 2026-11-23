---
name: mmianji-fx-realtime-components
description: 眠眠机（IDIC）实时数据、粒子特效与独立动效组件库。涵盖真实本机时间天文月相算法、ASCII 艺术与乱码解码、票根化红包、气泡渐出/星屑粒子、发送键冰晶与 Shadow DOM Web Component 封装。
---

# 实时数据、粒子与独立动效组件库

本 Skill 沉淀了经过实战验证的高光组件范式，可直接作为独立 Demo 移植到新主题中。

## 核心组件范式

1. **真实本机时间天文月相**：
   * 基于朔望月周期（`29.530588853` 天）与参考新月时间戳 `Date.UTC(2000, 0, 6, 18, 14)` 实时计算月相盈亏百分比、八相名称与矢量受光路径。
   * 顶栏月相签（`.osc-crest`）挂载在 `#chat-header-info` 下沿，每 10 分钟自动校准。
   * ASCII 月面通过球面受光点积 + 环形山噪点生成，交互切换时可触发 `scrambleMoon` 乱码解码动效。
2. **票根化红包（Ticket Red Packet）**：
   * 不破坏原生 `.message-red-packet` 点击逻辑，仅向 `.rp-bubble-content` 注入票头编号（取自消息 ID 后四位）、SVG 条形码副券（动态同步 `待兑现` / `已核销` 状态）与圆形主题邮戳。
3. **低发热交互特效**：
   * **气泡星屑**：`MutationObserver` 过滤批量重绘，延迟 `140ms` 等气泡滚入视野后在边缘炸出轻量 Canvas 字符粒子（上限 64 颗，15.5ms 节流）。
   * **发送键冰晶**：点击 `#send-button` 时在按钮坐标动态插入 `.wf-send-spark`，监听 `animationend` 自动销毁。
4. **独立动效挂件（Web Component + Shadow DOM）**：
   * 复杂像素/序列帧/物理碎裂动效（如海蓝宝爱心 `<wf-aquamarine-gem>`）必须封装为 Custom Element + Shadow DOM，配合 `IntersectionObserver` 在可视区域内限频（如 `15fps`）渲染，彻底与宿主样式解耦。

## 内置示范模板

* `templates/realtime-lunar-crest.js` — 真实天文月相算法 + 顶栏月相签 + ASCII 月面生成。
* `templates/ticket-red-packet.js` — 票根化红包 DOM 注入与状态同步。
* `templates/bubble-particles-and-send-spark.js` — 气泡星屑粒子 + 发送键冰晶动效。
* `templates/aquamarine-gem-component.js` — Shadow DOM Web Component 动效挂件骨架（含 `IntersectionObserver` 15fps 休眠）。
