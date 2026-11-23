/* 示范模板：透明表情二进制文件头魔数嗅探（源自《星轨奏鸣》）
   作用：解决本地表情 blob URL 无扩展名导致的透明 PNG/GIF/WebP 被误加气泡底色问题。
   不替换 img，不解码 GIF，仅读取前 32 字节判断文件类型并写入 data-osc-sticker-kind。 */

function sourceKind(src) {
  if (/^data:image\/png(?:;|,)/i.test(src) || /\.png(?:[?#]|$)/i.test(src)) return 'png';
  if (/^data:image\/gif(?:;|,)/i.test(src) || /\.gif(?:[?#]|$)/i.test(src)) return 'gif';
  if (/^data:image\/(?:jpe?g|bmp)(?:;|,)/i.test(src) || /\.(?:jpe?g|bmp)(?:[?#]|$)/i.test(src)) return 'image';
  return 'unknown';
}

function fileKind(blob) {
  if (!blob) return Promise.resolve('unknown');
  var mime = String(blob.type || '').toLowerCase();
  function fallback() {
    if (mime === 'image/png') return 'png';
    if (mime === 'image/gif') return 'gif';
    if (/^image\/(?:jpe?g|bmp)$/.test(mime)) return 'image';
    return 'unknown';
  }
  if (typeof blob.slice !== 'function' || typeof blob.slice(0, 32).arrayBuffer !== 'function') {
    return Promise.resolve(fallback());
  }
  return blob.slice(0, 32).arrayBuffer().then(function (buffer) {
    var b = new Uint8Array(buffer);
    function ascii(pos, text) {
      for (var i = 0; i < text.length; i++) if (b[pos + i] !== text.charCodeAt(i)) return false;
      return true;
    }
    // PNG 魔数: 89 50 4E 47 0D 0A 1A 0A
    if (b.length >= 8 && b[0] === 137 && ascii(1, 'PNG') && b[4] === 13 && b[5] === 10 && b[6] === 26 && b[7] === 10) return 'png';
    // GIF 魔数: GIF87a / GIF89a
    if (b.length >= 6 && (ascii(0, 'GIF87a') || ascii(0, 'GIF89a'))) return 'gif';
    // JPEG 魔数: FF D8 FF
    if (b.length >= 3 && b[0] === 255 && b[1] === 216 && b[2] === 255) return 'image';
    // WebP 透明通道检测 (VP8X / VP8L alpha bit)
    if (b.length >= 21 && ascii(0, 'RIFF') && ascii(8, 'WEBP')) {
      if (ascii(12, 'VP8X')) return (b[20] & 16) ? 'alpha' : 'image';
      if (ascii(12, 'VP8L') && b.length >= 25 && b[20] === 47) return (b[24] & 16) ? 'alpha' : 'image';
      if (ascii(12, 'VP8 ')) return 'image';
    }
    return fallback();
  }).catch(fallback);
}
