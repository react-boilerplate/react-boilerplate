var warn = "offline-plugin: runtime was installed without OfflinePlugin being added to the webpack.config.js. See https://goo.gl/2Ca7NO for details.";

if (window.console) {
  if (console.info) {
    console.info(warn);
  } else if (console.log) {
    console.log(warn);
  }
}

exports.install = function() {};
exports.applyUpdate = function() {};
exports.update = function() {};