'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _miscUtils = require('./misc/utils');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _deepExtend2 = require('deep-extend');

var _deepExtend3 = _interopRequireDefault(_deepExtend2);

var AppCache = (function () {
  function AppCache(options) {
    _classCallCheck(this, AppCache);

    var output = options.output || options.directory;

    if ((0, _miscUtils.isAbsolutePath)(output)) {
      throw new Error('OfflinePlugin: ServiceWorker.output option must be a relative path, ' + 'but an absolute path was passed');
    }

    this.output = output.replace(/^\//, '').replace(/\/$/, '') + '/';
    this.publicPath = options.publicPath;

    this.basePath = null;
    this.location = null;
    this.pathRewrite = null;

    // Tool specific properties
    this.NETWORK = options.NETWORK;
    this.FALLBACK = options.FALLBACK;
    this.name = 'manifest';
    this.caches = options.caches;
    this.events = !!options.events;
    this.disableInstall = options.disableInstall;
    this.includeCrossOrigin = options.includeCrossOrigin;
  }

  _createClass(AppCache, [{
    key: 'addEntry',
    value: function addEntry(plugin, compilation, compiler) {
      // no-op
      return Promise.resolve();
    }
  }, {
    key: 'apply',
    value: function apply(plugin, compilation, compiler) {
      if (!Array.isArray(this.caches)) {
        throw new Error('AppCache caches must be an array');
      }

      var pathRewrite = this.pathRewrite;
      var cache = (this.caches.reduce(function (result, name) {
        var cache = plugin.caches[name];
        if (!cache || !cache.length) return result;

        if (result) {
          result = result.concat(cache);
        } else {
          result = cache;
        }

        return result;
      }, null) || []).map(pathRewrite);

      var path = this.output + this.name;
      var manifest = this.getManifestTemplate(cache, plugin);
      var content = this.getPageContent();
      var page = this.getPageTemplate(this.name, content);

      compilation.assets[path + '.appcache'] = (0, _miscUtils.getSource)(manifest);
      compilation.assets[path + '.html'] = (0, _miscUtils.getSource)(page);
    }
  }, {
    key: 'getManifestTemplate',
    value: function getManifestTemplate(cache, plugin) {
      var _this = this;

      var tag = '#ver:' + plugin.version;

      if (plugin.pluginVersion && !plugin.__tests.noVersionDump) {
        tag += '\n' + '#plugin:' + plugin.pluginVersion;
      }

      var FALLBACK = '';
      var NETWORK = '';

      if (this.NETWORK) {
        NETWORK = 'NETWORK:\n' + (Array.isArray(this.NETWORK) ? this.NETWORK.join('\n') : this.NETWORK + '');
      }

      if (plugin.appShell) {
        var scope = undefined;

        if (plugin.relativePaths) {
          scope = '';
        } else {
          scope = plugin.publicPath;
        }

        FALLBACK = (0, _deepExtend3['default'])(_defineProperty({}, this.pathRewrite(scope), plugin.appShell), this.FALLBACK || {});
      } else if (this.FALLBACK) {
        FALLBACK = this.FALLBACK;
      }

      if (FALLBACK) {
        FALLBACK = 'FALLBACK:\n' + Object.keys(FALLBACK).map(function (path) {
          return path + ' ' + FALLBACK[path];
        }).join('\n');
      }

      if (!this.includeCrossOrigin) {
        cache = cache.filter(function (asset) {
          if ((0, _miscUtils.isAbsoluteURL)(asset) && (_this.basePath === '/' || asset.indexOf(_this.basePath) !== 0)) {
            return false;
          }

          return true;
        });
      }

      return ('\n      CACHE MANIFEST\n      ' + tag + '\n\n      CACHE:\n      ' + cache.join('\n') + '\n\n      ' + NETWORK + '\n\n      ' + FALLBACK + '\n    ').trim().replace(/^      */gm, '');
    }
  }, {
    key: 'getPageTemplate',
    value: function getPageTemplate(name, content) {
      return ('\n      <!doctype html>\n      <html manifest="' + name + '.appcache"><meta charset="utf-8">' + (content || '') + '</html>\n    ').trim().replace(/^      */gm, '');
    }
  }, {
    key: 'getPageContent',
    value: function getPageContent() {
      if (this.events) {
        return _fs2['default'].readFileSync(_path2['default'].join(__dirname, '../tpls/appcache-frame.tpl'), 'utf-8');
      } else {
        return '';
      }
    }
  }, {
    key: 'getConfig',
    value: function getConfig(plugin) {
      return {
        location: this.location,
        name: this.name,
        events: this.events,
        disableInstall: this.disableInstall
      };
    }
  }]);

  return AppCache;
})();

exports['default'] = AppCache;
module.exports = exports['default'];