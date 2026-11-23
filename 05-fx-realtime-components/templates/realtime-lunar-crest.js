/* 示范模板：真实本机时间天文月相 + 顶栏月相签 + ASCII 月面（源自《星轨奏鸣》） */

var TAU = Math.PI * 2;
var SYNODIC = 29.530588853;
var NEW_MOON_REF = Date.UTC(2000, 0, 6, 18, 14);

function lunarPhase(date) {
  var d = ((date || new Date()).getTime() - NEW_MOON_REF) / 86400000;
  return ((d / SYNODIC) % 1 + 1) % 1;
}

function phaseNameShort(p) {
  return ['朔', '娥眉', '上弦', '盈凸', '望', '亏凸', '下弦', '残月'][Math.round(p * 8) % 8];
}

/* 生成顶栏月相签矢量受光面 Path */
function moonLitPath(p) {
  var waxing = p < 0.5, q = waxing ? p : 1 - p, rx = Math.abs(Math.cos(q * TAU));
  if (q < 0.02) return '';
  return '<path d="M0 -1 A1 1 0 0 1 0 1 A' + rx.toFixed(3) + ' 1 0 0 ' + (q < 0.25 ? 0 : 1) + ' 0 -1Z"' + (waxing ? '' : ' transform="scale(-1 1)"') + '/>';
}

/* 渲染聊天窗顶栏月相签 (.osc-crest) */
function renderLunarCrest(crestEl) {
  var phase = lunarPhase();
  var illum = (1 - Math.cos(phase * TAU)) / 2;
  crestEl.innerHTML =
    '<span class="osc-crest-moon"><svg viewBox="-1.2 -1.2 2.4 2.4"><circle class="osc-moon-dark" r="1"/><g class="osc-moon-lit">' +
    moonLitPath(phase) + '</g></svg></span>' +
    '<span class="osc-crest-text">' + phaseNameShort(phase) + ' ' + Math.round(illum * 100) + '%</span>';
}

/* 球面受光算法生成实时 ASCII 月面 */
function asciiMoon(phase, cols, rows) {
  var ramp = ' .·:;ioO8%#@', th = phase * TAU;
  var L = [Math.sin(th), -0.12, -Math.cos(th)], lines = [];
  var craters = [[-0.32, -0.28, 0.2], [0.28, 0.1, 0.16], [-0.05, 0.42, 0.13]];
  for (var y = 0; y < rows; y++) {
    var line = '';
    for (var x = 0; x < cols; x++) {
      var nx = (x + 0.5) / cols * 2 - 1, ny = (y + 0.5) / rows * 2 - 1, rr = nx * nx + ny * ny;
      if (rr > 1) { line += ' '; continue; }
      var nz = Math.sqrt(1 - rr), lit = nx * L[0] + ny * L[1] + nz * L[2];
      var tone = 0;
      craters.forEach(function (c) { var dd = Math.hypot(nx - c[0], ny - c[1]); if (dd < c[2]) tone -= (1 - dd / c[2]) * 0.32; });
      if (lit <= 0) { line += rr > 0.8 ? '.' : ' '; continue; }
      var v = Math.min(1, 0.3 + lit * 0.8 + tone);
      line += ramp.charAt(Math.max(1, Math.min(ramp.length - 1, Math.round(v * (ramp.length - 1)))));
    }
    lines.push(line);
  }
  return lines.join('\n');
}
