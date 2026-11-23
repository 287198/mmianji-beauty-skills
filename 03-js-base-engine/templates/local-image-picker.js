/* 示范模板：本机双击换图与防爆内存引擎（源自《Snowman·中心动图版》）
   特性：
   1. 双击触发选图，单击可保留彩蛋/其他交互；
   2. 通过 window.IDICStorage 持久化保存原始 Blob；
   3. 内置 APNG acTL 块检测（动图不压缩，静态大图自动 Canvas 压缩至最长边 1200px 防 WebView 爆内存）。 */

function isStaticPng(blob) {
  var part = blob.slice(0, Math.min(blob.size, 1024 * 1024));
  if (!part.arrayBuffer) return Promise.resolve(false);
  return part.arrayBuffer().then(function (buffer) {
    var bytes = new Uint8Array(buffer), view = new DataView(buffer);
    if (bytes.length < 8 || bytes[0] !== 137 || bytes[1] !== 80 || bytes[2] !== 78 || bytes[3] !== 71) return false;
    for (var at = 8; at + 12 <= bytes.length;) {
      var size = view.getUint32(at), end = at + 12 + size;
      var type = String.fromCharCode(bytes[at + 4], bytes[at + 5], bytes[at + 6], bytes[at + 7]);
      if (type === 'acTL') return false; // APNG 动图
      if (type === 'IDAT') return true;  // 静态 PNG
      if (end > bytes.length || end < at) return false;
      at = end;
    }
    return false;
  }).catch(function () { return false; });
}

function createPreviewBlob(blob) {
  if (!/^image\/(jpeg|png)$/i.test(blob.type)) return Promise.resolve(blob);
  var check = /^image\/png$/i.test(blob.type) ? isStaticPng(blob) : Promise.resolve(true);
  return check.then(function (isStatic) {
    if (!isStatic) return blob;
    return new Promise(function (resolve) {
      var img = new Image(), url = URL.createObjectURL(blob);
      img.onload = function () {
        URL.revokeObjectURL(url);
        var w = img.naturalWidth, h = img.naturalHeight;
        if (!w || !h || Math.max(w, h) <= 1200) return resolve(blob);
        var scale = 1200 / Math.max(w, h);
        var canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(w * scale));
        canvas.height = Math.max(1, Math.round(h * scale));
        var ctx = canvas.getContext('2d');
        if (!ctx || !canvas.toBlob) return resolve(blob);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(function (small) {
          canvas.width = 1; canvas.height = 1;
          resolve(small && small.size ? small : blob);
        }, /^image\/png$/i.test(blob.type) ? 'image/webp' : 'image/jpeg', 0.88);
      };
      img.onerror = function () { URL.revokeObjectURL(url); resolve(blob); };
      img.src = url;
    });
  });
}
