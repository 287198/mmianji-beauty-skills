/* 示范模板：参数化啮合齿轮与黄金比例细线制图（源自《星轨奏鸣》） */

var TAU = Math.PI * 2;
var PHI = (1 + Math.sqrt(5)) / 2;
var GOLDEN_ANGLE = 360 / (PHI * PHI);
function n2(v) { return (+v).toFixed(2); }

/* 1. 生成参数化齿轮 SVG Path */
function gearPath(cx, cy, r, teeth, depth) {
  var path = [];
  for (var i = 0; i < teeth * 4; i++) {
    var angle = i * TAU / (teeth * 4) - Math.PI / 2;
    var radius = r + (i % 4 === 1 || i % 4 === 2 ? depth : -depth);
    path.push((i ? 'L' : 'M') + n2(cx + Math.cos(angle) * radius) + ' ' + n2(cy + Math.sin(angle) * radius));
  }
  return path.join(' ') + 'Z';
}

/* 2. 计算从动轮初始转角，确保啮合点精确「齿对槽」 */
function toothPhase(theta, teeth, rotation) {
  var step = TAU / teeth, start = -Math.PI / 2 + 1.5 * TAU / (teeth * 4);
  return (((theta - rotation - start) / step) % 1 + 1) % 1;
}
function meshRotation(theta, teethA, teethB) {
  var pA = toothPhase(theta, teethA, 0), pB = ((0.5 - pA) % 1 + 1) % 1;
  var psi = theta + Math.PI, start = -Math.PI / 2 + 1.5 * TAU / (teethB * 4);
  return (psi - start - pB * TAU / teethB) * 180 / Math.PI;
}

/* 3. 生成黄金角叶序点阵（第 21 / 34 条斐波那契斜列点成强调色） */
function phyllotaxis(cx, cy) {
  var dots = '', gold = '', N = 233;
  for (var n = 1; n <= N; n++) {
    var a = n * GOLDEN_ANGLE * Math.PI / 180;
    var r = 5 * Math.sqrt(n);
    var x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    var size = (0.45 + 0.95 * n / N).toFixed(2);
    var c = '<circle cx="' + n2(x) + '" cy="' + n2(y) + '" r="' + size + '"/>';
    if (n % 21 === 0 || n % 34 === 0) gold += c; else dots += c;
  }
  return '<g class="osc-phyllo"><g class="osc-phyllo-dots">' + dots + '</g><g class="osc-phyllo-gold">' + gold + '</g></g>';
}
