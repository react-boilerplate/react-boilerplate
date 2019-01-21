'use strict';Object.defineProperty(exports, "__esModule", { value: true });let addFileToAssets = (() => {var _ref2 = _asyncToGenerator(


































  function* (
  compilation,
  htmlPluginData, _ref)









  {let filepath = _ref.filepath;var _ref$typeOfAsset = _ref.typeOfAsset;let typeOfAsset = _ref$typeOfAsset === undefined ? 'js' : _ref$typeOfAsset;var _ref$includeSourcemap = _ref.includeSourcemap;let includeSourcemap = _ref$includeSourcemap === undefined ? true : _ref$includeSourcemap;var _ref$hash = _ref.hash;let hash = _ref$hash === undefined ? false : _ref$hash,publicPath = _ref.publicPath,outputPath = _ref.outputPath;var _ref$files = _ref.files;let files = _ref$files === undefined ? [] : _ref$files;
    if (!filepath) {
      const error = new Error('No filepath defined');
      compilation.errors.push(error);
      return Promise.reject(error);
    }

    const fileFilters = Array.isArray(files) ? files : [files];

    if (fileFilters.length > 0) {
      const shouldSkip = !fileFilters.some(function (file) {return (
          (_micromatch || _load_micromatch()).default.isMatch(htmlPluginData.outputName, file));});


      if (shouldSkip) {
        return Promise.resolve(null);
      }
    }

    const addedFilename = yield htmlPluginData.plugin.addFileToAssets(
    filepath,
    compilation);


    let suffix = '';
    if (hash) {
      const md5 = (_crypto || _load_crypto()).default.createHash('md5');
      md5.update(compilation.assets[addedFilename].source());
      suffix = `?${md5.digest('hex').substr(0, 20)}`;
    }

    const resolvedPublicPath =
    typeof publicPath === 'undefined' ?
    resolvePublicPath(compilation, addedFilename) :
    ensureTrailingSlash(publicPath);
    const resolvedPath = `${resolvedPublicPath}${addedFilename}${suffix}`;

    htmlPluginData.assets[typeOfAsset].unshift(resolvedPath);

    resolveOutput(compilation, addedFilename, outputPath);

    if (includeSourcemap) {
      const addedMapFilename = yield htmlPluginData.plugin.addFileToAssets(
      `${filepath}.map`,
      compilation);

      resolveOutput(compilation, addedMapFilename, outputPath);
    }

    return Promise.resolve(null);
  });return function addFileToAssets(_x, _x2, _x3) {return _ref2.apply(this, arguments);};})();

// Visible for testing
var _path;function _load_path() {return _path = _interopRequireDefault(require('path'));}var _crypto;function _load_crypto() {return _crypto = _interopRequireDefault(require('crypto'));}var _pEachSeries;function _load_pEachSeries() {return _pEachSeries = _interopRequireDefault(require('p-each-series'));}var _micromatch;function _load_micromatch() {return _micromatch = _interopRequireDefault(require('micromatch'));}var _handleUrl;function _load_handleUrl() {return _handleUrl = _interopRequireDefault(require('./handleUrl'));}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}function ensureTrailingSlash(string) {if (string.length && string.substr(-1, 1) !== '/') {return `${string}/`;}return string;} // Copied from html-webpack-plugin
function resolvePublicPath(compilation, filename) {/* istanbul ignore else */const publicPath = typeof compilation.options.output.publicPath !== 'undefined' ? compilation.options.output.publicPath : (_path || _load_path()).default.relative((_path || _load_path()).default.dirname(filename), '.'); // TODO: How to test this? I haven't written this logic, unsure what it does
  return ensureTrailingSlash(publicPath);}function resolveOutput(compilation, addedFilename, outputPath) {if (outputPath && outputPath.length) {/* eslint-disable no-param-reassign */compilation.assets[`${outputPath}/${addedFilename}`] = compilation.assets[addedFilename];delete compilation.assets[addedFilename]; /* eslint-enable */}}exports.default = (() => {var _ref3 = _asyncToGenerator(function* (assets, compilation, htmlPluginData, callback) {try {const handledAssets = yield (0, (_handleUrl || _load_handleUrl()).default)(assets);
      yield (0, (_pEachSeries || _load_pEachSeries()).default)(handledAssets, function (asset) {return (
          addFileToAssets(compilation, htmlPluginData, asset));});

      if (callback) {
        return callback(null, htmlPluginData);
      }
      return htmlPluginData;
    } catch (e) {
      if (callback) {
        return callback(e, htmlPluginData);
      }
      throw e;
    }
  });return function (_x4, _x5, _x6, _x7) {return _ref3.apply(this, arguments);};})();module.exports = exports['default'];