'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _addAllAssetsToCompilation;function _load_addAllAssetsToCompilation() {return _addAllAssetsToCompilation = _interopRequireDefault(require('./addAllAssetsToCompilation'));}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class AddAssetHtmlPlugin {
  constructor() {let assets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    this.assets = Array.isArray(assets) ? assets.slice().reverse() : [assets];
  }

  /* istanbul ignore next: this would be integration tests */
  apply(compiler) {
    compiler.plugin('compilation', compilation => {
      compilation.plugin(
      'html-webpack-plugin-before-html-generation',
      (htmlPluginData, callback) =>
      (0, (_addAllAssetsToCompilation || _load_addAllAssetsToCompilation()).default)(
      this.assets,
      compilation,
      htmlPluginData,
      callback));


    });
  }}exports.default = AddAssetHtmlPlugin;module.exports = exports['default'];