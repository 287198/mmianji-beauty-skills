/* 示范模板：24px 细线主题图标重绘与宿主选择器映射（源自《Snowman·中心动图版》） */

var THEME_ICONS_24PX = {
  chat: '<path class="l" d="M4.6 11.6c0-3.9 3.3-6.9 7.4-6.9s7.4 3 7.4 6.9-3.3 6.9-7.4 6.9c-1.1 0-2.2-.2-3.1-.6l-3.9 1.3 1-3.4a6.4 6.4 0 0 1-1.4-4.2z"/><path class="l" d="M12 9V14.2M9.75 10.3L14.25 12.9M9.75 12.9L14.25 10.3"/>',
  moments: '<circle class="l" cx="12" cy="10.2" r="6.6"/><path class="l" d="M8.2 19.8h7.6M9.2 16.4l-1 3.4M14.8 16.4l1 3.4"/><circle class="d" cx="9.6" cy="8.8" r="0.85"/><circle class="d" cx="13.9" cy="8" r="0.85"/><circle class="d" cx="12" cy="11.9" r="0.85"/>',
  settings: '<path class="l" d="M4.5 8h8.2M17.3 8h2.2M4.5 16h2.2M11.3 16h8.2"/><path class="l" d="M15 5.6l2.3 2.4-2.3 2.4-2.3-2.4z"/><path class="l" d="M9 13.6l2.3 2.4L9 18.4l-2.3-2.4z"/>',
  packet: '<path class="l" d="M4.2 8.2a1.6 1.6 0 0 1 1.6-1.6h12.4a1.6 1.6 0 0 1 1.6 1.6v1.6a2.2 2.2 0 0 0 0 4.4v1.6a1.6 1.6 0 0 1-1.6 1.6H5.8a1.6 1.6 0 0 1-1.6-1.6v-1.6a2.2 2.2 0 0 0 0-4.4z"/><path class="l" d="M14.6 8.6v1.2M14.6 11.4v1.2M14.6 14.2v1.2"/><path class="r" d="M9.4 9.4l.9 1.9 1.9.9-1.9.9-.9 1.9-.9-1.9-1.9-.9 1.9-.9z"/>',
  spark: '<path class="l" d="M12 12L12 3.6M12 12L4.73 7.8M12 12L4.73 16.2M12 12L12 20.4M12 12L19.27 16.2M12 12L19.27 7.8"/><circle class="d" cx="12" cy="12" r="1.15"/>',
  send: '<path class="l" d="M20.2 3.8L3.9 10.3l6.4 2.9 2.9 6.4z"/><path class="l" d="M10.3 13.2l4.6-4.6"/><path class="l" d="M3.4 15.4h3.2M5.2 18.4h2.4"/>',
  back: '<path class="l" d="M17.6 12H5.8M10.9 6.8L5.7 12l5.2 5.2"/><circle class="d" cx="20.2" cy="12" r="0.95"/>'
};

/* 核心宿主按钮映射表：[CSS选择器, 图标Key, 容器类型] */
var ICON_TARGETS = [
  ['#app-nav .nav-button[data-view="chat-list-view"]', 'chat', 'nav'],
  ['#app-nav .nav-button[data-view="moments-view"]', 'moments', 'nav'],
  ['#app-nav .nav-button[data-view="settings-view"]', 'settings', 'nav'],
  ['#voice-btn', 'mic', 'tool'],
  ['#image-btn', 'image', 'tool'],
  ['#camera-btn', 'camera', 'tool'],
  ['#red-packet-btn', 'packet', 'tool'],
  ['#emoji-btn', 'emoji', 'tool'],
  ['#ai-helper-button', 'spark', 'tool'],
  ['#more-functions-button', 'more', 'tool'],
  ['#close-extended-functions-btn', 'close', 'tool'],
  ['.view .header .back-button', 'back', 'head'],
  ['#chat-settings-button', 'menu', 'head'],
  ['#add-contact-button', 'plus', 'head'],
  ['#send-button', 'send', 'send']
];
