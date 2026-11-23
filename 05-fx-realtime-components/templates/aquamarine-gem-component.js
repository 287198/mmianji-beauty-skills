/* 示范模板：Shadow DOM Web Component 独立动效挂件骨架（源自《Snowman》海蓝宝组件）
   特性：
   1. Shadow DOM 彻底隔离样式，不污染宿主页面；
   2. 共享单张 master Canvas 离屏渲染，再分发给所有可见实例，极度省电；
   3. 接入 IntersectionObserver + document.hidden + prefers-reduced-motion，仅在可见时以 15fps 运行。 */

(function () {
  'use strict';
  if (customElements.get('theme-fx-gem')) return;

  var W = 288, H = 202, FPS = 15;
  var clients = new Set();
  var visible = new Set();
  var observer = null, timer = 0, started = false, time = 0, lastStamp = null;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var master = document.createElement('canvas');
  master.width = W; master.height = H;
  var mctx = master.getContext('2d');

  function paintFrame(t) {
    mctx.clearRect(0, 0, W, H);
    // 在此处绘制你的像素/序列帧/Voronoi 碎裂动效
  }

  function tick() {
    timer = 0;
    if (!started || document.hidden || !visible.size) { lastStamp = null; return; }
    var now = performance.now();
    if (lastStamp !== null) time += Math.min((now - lastStamp) / 1000, 0.25);
    lastStamp = now;
    paintFrame(reducedMotion.matches ? 0 : time);
    visible.forEach(function (item) {
      if (!item.isConnected) return;
      var ctx = item._canvas.getContext('2d');
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(master, 0, 0);
    });
    if (!reducedMotion.matches) timer = setTimeout(tick, 1000 / FPS);
  }

  function wake() {
    if (timer) { clearTimeout(timer); timer = 0; }
    if (started && !document.hidden && visible.size) tick();
  }

  function start() {
    if (started) return;
    started = true;
    document.addEventListener('visibilitychange', wake);
    if (typeof IntersectionObserver === 'function') {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target);
        });
        wake();
      });
    }
  }

  function stop() {
    if (timer) { clearTimeout(timer); timer = 0; }
    started = false;
    document.removeEventListener('visibilitychange', wake);
    if (observer) { observer.disconnect(); observer = null; }
    visible.clear();
  }

  class ThemeFxGem extends HTMLElement {
    constructor() {
      super();
      var root = this.attachShadow({ mode: 'open' });
      root.innerHTML = '<style>:host{display:inline-block;aspect-ratio:288/202;pointer-events:none}canvas{display:block;width:100%;height:100%;image-rendering:pixelated}</style><canvas width="288" height="202" aria-hidden="true"></canvas>';
      this._canvas = root.querySelector('canvas');
    }
    connectedCallback() {
      clients.add(this);
      start();
      if (observer) observer.observe(this); else visible.add(this);
      wake();
    }
    disconnectedCallback() {
      clients.delete(this); visible.delete(this);
      if (observer) observer.unobserve(this);
      if (!clients.size) stop();
    }
  }

  customElements.define('theme-fx-gem', ThemeFxGem);
})();
