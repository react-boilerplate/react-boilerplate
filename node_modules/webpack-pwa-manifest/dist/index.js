'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _presets = require('./validators/presets');

var _presets2 = _interopRequireDefault(_presets);

var _colors = require('./validators/colors');

var _colors2 = _interopRequireDefault(_colors);

var _versioning = require('./validators/versioning');

var _versioning2 = _interopRequireDefault(_versioning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebpackPwaManifest = function () {
  function WebpackPwaManifest() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, WebpackPwaManifest);

    (0, _presets2.default)(options, 'dir', 'display', 'orientation', 'crossorigin');
    (0, _colors2.default)(options, 'background_color', 'theme_color');
    (0, _versioning2.default)(options, 'useWebpackPublicPath');
    this._generator = null;
    this.assets = null;
    this.htmlPlugin = false;
    var shortName = options.short_name || options.name || 'App';
    // fingerprints is true by default, but we want it to be false even if users
    // set it to undefined or null.
    if (!options.hasOwnProperty('fingerprints')) {
      options.fingerprints = true;
    }
    this.options = Object.assign({
      filename: options.fingerprints ? '[name].[hash].[ext]' : '[name].[ext]',
      name: 'App',
      short_name: shortName,
      orientation: 'portrait',
      display: 'standalone',
      start_url: '.',
      inject: true,
      fingerprints: true,
      ios: false,
      publicPath: null,
      includeDirectory: true,
      crossorigin: null
    }, options);
  }

  _createClass(WebpackPwaManifest, [{
    key: '_acquireGenerator',
    value: function _acquireGenerator(hooks) {
      return hooks ? require('./generators/tapable') : require('./generators/legacy');
    }
  }, {
    key: 'apply',
    value: function apply(compiler) {
      var hooks = compiler.hooks;

      var generator = this._generator || (this._generator = this._acquireGenerator(hooks));
      generator(this, compiler);
    }
  }]);

  return WebpackPwaManifest;
}();

module.exports = WebpackPwaManifest;