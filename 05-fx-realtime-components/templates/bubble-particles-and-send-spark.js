/*
 * 历史示例：气泡星屑 Canvas 粒子 + 发送键冰晶动效（源自《星轨奏鸣》&《Snowman》）。
 * 气泡粒子默认不添加：实机体验中曾出现明显卡顿与发热，用户坚持使用时先说明风险并实测。
 * 下方 createMessageBurstObserver 仅展示旧实现，不能直接用来识别真实新消息：
 * DOM 新增和数量过滤无法排除历史消息恢复、会话切换或重绘，可能导致历史动画重播，
 * 曾伴随消息列表进入聊天时跳到小剧场的异常。接入应依据宿主可靠的新消息事件，
 * 结合当前会话和历史加载状态；无法可靠区分时不触发。详见所属 Skill 的 SKILL.md。
 * 发送键效果可单独参考，无需启用粒子观察器。
 */

/* 1. 点击发送键在按钮坐标生成自动销毁的 SVG 动效 */
function spawnSendSpark(btn, svgHtml) {
  if (!btn || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  var rect = btn.getBoundingClientRect();
  if (!rect.width && !rect.height) return;
  var spark = document.createElement('span');
  spark.className = 'wf-send-spark';
  spark.innerHTML = svgHtml;
  spark.style.left = Math.round(rect.left + rect.width * 0.5) + 'px';
  spark.style.top = Math.round(rect.top + rect.height * 0.28) + 'px';
  document.body.appendChild(spark);
  var cleanup = function () { if (spark.parentNode) spark.parentNode.removeChild(spark); };
  spark.addEventListener('animationend', cleanup, { once: true });
  setTimeout(cleanup, 760);
}

/* 2. 旧观察器示例（不能直接用于判断新消息；先阅读文件顶部警示） */
function createMessageBurstObserver(msgsEl, onBurst) {
  var burstTimer = 0;
  function isRow(node) {
    return node.nodeType === 1 && node.classList.contains('message-row') && !node.classList.contains('system-row');
  }
  return new MutationObserver(function (records) {
    var added = [], removed = 0;
    records.forEach(function (r) {
      removed += r.removedNodes.length;
      Array.prototype.forEach.call(r.addedNodes, function (n) { if (isRow(n)) added.push(n); });
    });
    // 过滤整页重绘（切换会话）
    if (!added.length || added.length > 3 || removed > 3) return;
    if (burstTimer) clearTimeout(burstTimer);
    // 等待 App 将新消息滚入视野后再取坐标
    burstTimer = setTimeout(function () {
      burstTimer = 0;
      var row = added[added.length - 1];
      if (!row || !row.isConnected) return;
      var bubble = row.querySelector('.message, .thought-bubble-message') || row;
      onBurst(bubble.getBoundingClientRect(), row.classList.contains('user-row'));
    }, 140);
  });
}
