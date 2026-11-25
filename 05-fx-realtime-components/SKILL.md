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
3. **交互特效与实机性能**：
   * **气泡粒子默认不添加**：实机对照中，气泡出现叠加粒子会明显卡顿或发热，降低粒子数量也不保证流畅。创作者坚持使用时，先说明可能的卡顿与发热，再征得选择并在目标设备实测。`bubble-particles-and-send-spark.js` 为历史示例，不代表低发热或建议默认启用。
   * **气泡入场**：推荐使用 `mmianji-css-material-layout` 技能内的 `templates/bubble-entry.css` 无粒子方案（仓库路径 `02-css-material-layout/templates/bubble-entry.css`）；独立安装后按技能所在目录查找。只对当前会话中经可靠事件确认的新增消息播放；打开聊天、切换会话、历史恢复和批量重绘不能重放。不得仅凭 `MutationObserver` 新节点判断，避免无效开销和影响小剧场。
   * **发送键冰晶**：点击 `#send-button` 时在按钮坐标动态插入 `.wf-send-spark`，监听 `animationend` 自动销毁。
4. **独立动效挂件（Web Component + Shadow DOM）**：
   * 复杂像素/序列帧/物理碎裂动效（如海蓝宝爱心 `<wf-aquamarine-gem>`）必须封装为 Custom Element + Shadow DOM，配合 `IntersectionObserver` 在可视区域内限频（如 `15fps`）渲染，彻底与宿主样式解耦。

## 内置示范模板

* `templates/realtime-lunar-crest.js` — 真实天文月相算法 + 顶栏月相签 + ASCII 月面生成。
* `templates/ticket-red-packet.js` — 票根化红包 DOM 注入与状态同步。
* `templates/bubble-particles-and-send-spark.js` — 历史气泡粒子与发送键冰晶示例；旧观察器不能直接判断新消息，气泡粒子默认不启用，使用前须阅读文件顶部警示。
* `templates/aquamarine-gem-component.js` — Shadow DOM Web Component 动效挂件骨架（含 `IntersectionObserver` 15fps 休眠）。
