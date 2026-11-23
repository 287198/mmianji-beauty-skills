/*
@mmianji-beauty
@id: demo.theme.base-v1
@name: 示范主题 · 标准生命周期基座
@mode: hidden
@version: 1.0.0
*/
(function (root) {
  'use strict';
  var ID = 'demo.theme.base-v1';
  if (!root.IDIC || !root.IDIC.Extensions || typeof root.IDIC.Extensions.define !== 'function') return;

  var dispose = null;

  function activate() {
    var view = document.getElementById('chat-window-view');
    if (!view) return;

    var dead = false;
    var active = false;
    var rafId = 0;
    var timers = [];
    var cleanups = [];
    var injected = [];

    var motion = root.matchMedia ? root.matchMedia('(prefers-reduced-motion: reduce)') : null;

    function addListener(target, event, handler, opts) {
      if (!target) return;
      target.addEventListener(event, handler, opts);
      cleanups.push(function () { target.removeEventListener(event, handler, opts); });
    }

    function track(node) {
      injected.push(node);
      return node;
    }

    function stopLoop() {
      if (rafId) { root.cancelAnimationFrame(rafId); rafId = 0; }
    }

    function syncVisibility() {
      var visible = !view.classList.contains('hidden');
      document.body.classList.toggle('demo-chat-visible', visible);
      var next = visible && !document.hidden && !dead && !(motion && motion.matches);
      if (next === active) return;
      active = next;
      if (active) {
        // 恢复动画或监听
      } else {
        stopLoop();
      }
    }

    var viewObserver = new MutationObserver(syncVisibility);
    viewObserver.observe(view, { attributes: true, attributeFilter: ['class'] });
    cleanups.push(function () { viewObserver.disconnect(); });

    addListener(document, 'visibilitychange', syncVisibility);
    if (motion && motion.addEventListener) addListener(motion, 'change', syncVisibility);

    syncVisibility();

    dispose = function () {
      dead = true;
      active = false;
      stopLoop();
      timers.forEach(function (t) { root.clearTimeout(t); });
      timers = [];
      cleanups.forEach(function (fn) { try { fn(); } catch (_) {} });
      cleanups = [];
      injected.forEach(function (n) { if (n && n.parentNode) n.parentNode.removeChild(n); });
      injected = [];
      document.body.classList.remove('demo-chat-visible');
    };
  }

  function deactivate() {
    if (dispose) {
      var fn = dispose;
      dispose = null;
      fn();
    }
  }

  root.IDIC.Extensions.define({ id: ID, activate: activate, deactivate: deactivate });
}(window));
