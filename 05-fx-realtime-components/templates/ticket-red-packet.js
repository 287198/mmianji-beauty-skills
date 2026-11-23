/* 示范模板：票根化红包组件（源自《Snowman·中心动图版》）
   作用：为原生 .message-red-packet 注入票头编号、SVG 条形码副券与动态核销状态。 */

var TICKET_BARCODE_HTML =
  '<svg class="wf-ticket-barcode" viewBox="0 0 64 34" fill="currentColor" aria-hidden="true">' +
  '<rect x="0" y="0" width="2.5" height="34"/><rect x="5" y="0" width="1.5" height="34"/>' +
  '<rect x="9" y="0" width="3.5" height="34"/><rect x="15" y="0" width="1.5" height="34"/>' +
  '<rect x="24" y="0" width="4" height="34"/><rect x="34" y="0" width="2.5" height="34"/>' +
  '<rect x="43" y="0" width="3.5" height="34"/><rect x="57" y="0" width="3" height="34"/></svg>';

function ensureRedPacketTickets(passTitle) {
  var packets = document.querySelectorAll('#message-container .message-red-packet');
  for (var i = 0; i < packets.length; i++) {
    var pkt = packets[i];
    var content = pkt.querySelector(':scope > .rp-bubble-content');
    var info = content ? content.querySelector(':scope > .rp-bubble-info') : null;
    if (!content || !info) continue;

    if (!info.querySelector(':scope > .wf-ticket-head')) {
      var head = document.createElement('div');
      head.className = 'wf-ticket-head';
      var row = pkt.closest('[data-message-id]');
      var digits = (row ? String(row.getAttribute('data-message-id') || '') : '').replace(/\D/g, '').slice(-4);
      head.innerHTML = '<span class="wf-ticket-tag">' + (passTitle || 'WINTER PASS') + '</span><span class="wf-ticket-no">№ ' + (digits || '1225') + '</span>';
      info.insertBefore(head, info.firstChild);
    }

    var stub = content.querySelector(':scope > .wf-ticket-stub');
    if (!stub) {
      stub = document.createElement('div');
      stub.className = 'wf-ticket-stub';
      stub.innerHTML = TICKET_BARCODE_HTML + '<span class="wf-ticket-status"></span>';
      content.appendChild(stub);
    }

    var statusEl = stub.querySelector('.wf-ticket-status');
    var claimed = pkt.classList.contains('opened') || pkt.classList.contains('claimed') || pkt.getAttribute('data-transfer-status') === 'received';
    if (statusEl) {
      var nextText = claimed ? '已核销' : '待兑现';
      if (statusEl.textContent !== nextText) statusEl.textContent = nextText;
    }
    pkt.classList.add('wf-ticketized');
  }
}
