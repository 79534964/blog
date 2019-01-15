var browser = {
  wx: window.navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
};

if (browser.wx) {
  window.alert('抱歉若微信浏览器无法使用，请复制链接用其他浏览打开！');
}

window.setTimeout(function () {
  let scale = document.body.clientWidth / 1600 * 1.1;
  if (scale < 0.8) {
    scale = 0.8;
  }
  if (scale > 1) {
    scale = 1;
  }
  document.body.style.zoom = scale;
}, 0);
