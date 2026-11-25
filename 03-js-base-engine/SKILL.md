---
name: mmianji-js-base-engine
description: 眠眠机（IDIC）JS 基座微引擎与性能规范。涵盖 MMIANJI_BEAUTY_BUNDLE_V1 打包格式、IDIC.Extensions 生命周期、零残留卸载、后台休眠防发热、透明表情魔数嗅探与本机换图持久化。
---

# JS 基座微引擎与性能规范

当纯 CSS 无法满足布局重构、自定义交互、主题图标重绘或粒子特效时，启用 **「JS 基座 + CSS 条目」** 架构。

## 核心工程铁律

1. **标准扩展注册**：所有 JS 基座必须使用 IIFE 包裹，通过 `window.IDIC.Extensions.define({ id, activate, deactivate })` 注册，并在文件头部写明 `@mmianji-beauty` 元信息（`@id`、`@name`、`@mode: hidden`、`@version`）。
2. **零残留卸载（Strict Dispose）**：
   * `deactivate()` 必须 100% 清理所有自建 DOM、断开所有 `MutationObserver` / `ResizeObserver` / `IntersectionObserver`、取消所有 `requestAnimationFrame` 和 `setTimeout`、移除挂载在 `body` 或宿主元素上的类名与 `data-*` 属性。
3. **极致省电与防发热**：
   * 必须同时监听 `document.visibilitychange`、目标视图（`#chat-list-view` / `#chat-window-view`）的 `.hidden` 状态以及 `prefers-reduced-motion: reduce`。
   * 页面不可见时：立即停止 `requestAnimationFrame` 循环、清空粒子数组、将 Canvas 尺寸缩为 `1×1` 释放显存。
   * 动画循环做帧率节流（如 `15.5ms` 或按需 `15fps`）。
4. **MutationObserver 防死循环与防误触**：
   * **不能仅凭 DOM 新增或 `added.length > 3 || removed > 3` 识别新消息**：少量历史消息恢复、切换会话或重绘也可能插入节点。数量过滤最多作为辅助；接入宿主可靠的新消息事件，结合当前会话身份、页面就绪和历史加载状态，只对确认的实时新消息触发；无法可靠区分时不要播放。
   * 忽略自身注入的装饰节点变化，防止 Observer 自我触发死循环。

## 内置示范模板

* `templates/bundle-skeleton.json` — `MMIANJI_BEAUTY_BUNDLE_V1` 标准一键导入合集骨架。
* `templates/extension-lifecycle.js` — 标准生命周期、可见性休眠与零残留卸载模板。
* `templates/sticker-header-sniff.js` — 读取 `IDIC.db.getImage` 二进制文件头魔数识别 PNG/GIF/WebP 透明通道。
* `templates/local-image-picker.js` — 双击本机换图 + `IDICStorage` 持久化 + APNG 静态检测 + 1200px Canvas 缩略图防爆内存。
