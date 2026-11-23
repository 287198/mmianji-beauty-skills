/* 示范模板：气泡星屑 Canvas 粒子 + 发送键冰晶动效（源自《星轨奏鸣》&《Snowman》） */

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

/* 2. MutationObserver 监听单条新消息并触发气泡边缘星屑 */
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
