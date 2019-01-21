'use strict';

var _injector = require('../injector');

module.exports = function (that, _ref) {
  var _ref$hooks = _ref.hooks,
      comp = _ref$hooks.compilation,
      emit = _ref$hooks.emit;

  comp.tap('webpack-pwa-manifest', function (compilation) {
    if (!compilation.hooks || !compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing) return;
    compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('webpack-pwa-manifest', function (htmlPluginData, callback) {
      if (!that.htmlPlugin) that.htmlPlugin = true;
      (0, _injector.buildResources)(that, that.options.publicPath || compilation.options.output.publicPath, function () {
        if (that.options.inject) {
          var tags = (0, _injector.generateAppleTags)(that.options, that.assets);
          var themeColorTag = {
            name: 'theme-color',
            content: that.options['theme-color'] || that.options.theme_color
          };
          if (themeColorTag.content) (0, _injector.applyTag)(tags, 'meta', themeColorTag);
          (0, _injector.applyTag)(tags, 'link', Object.assign({
            rel: 'manifest',
            href: that.manifest.url
          }, !!that.options.crossorigin && { crossorigin: that.options.crossorigin }));
          tags = (0, _injector.generateMaskIconLink)(tags, that.assets);
          htmlPluginData.html = htmlPluginData.html.replace(/(<\/head>)/i, (0, _injector.generateHtmlTags)(tags) + '</head>');
        }
        callback(null, htmlPluginData);
      });
    });
  });
  emit.tapAsync('webpack-pwa-manifest', function (compilation, callback) {
    if (that.htmlPlugin) {
      (0, _injector.injectResources)(compilation, that.assets, callback);
    } else {
      (0, _injector.buildResources)(that, that.options.publicPath || compilation.options.output.publicPath, function () {
        (0, _injector.injectResources)(compilation, that.assets, callback);
      });
    }
  });
};