'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _globby;function _load_globby() {return _globby = _interopRequireDefault(require('globby'));}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * handle globby filepath and return an array with all matched assets.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @export
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @param {Array} assets
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @returns
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */exports.default = (() => {var _ref = _asyncToGenerator(
  function* (assets) {
    const globbyAssets = [];
    const normalAssets = [];
    // if filepath is null or undefined, just bubble up.
    assets.forEach(
    function (asset) {return (
        asset.filepath && (_globby || _load_globby()).default.hasMagic(asset.filepath) ?
        globbyAssets.push(asset) :
        normalAssets.push(asset));});

    const ret = [];
    yield Promise.all(
    globbyAssets.map(function (asset) {return (
        (0, (_globby || _load_globby()).default)(asset.filepath).then(function (paths) {return (
            paths.forEach(function (path) {return (
                ret.push(Object.assign({}, asset, { filepath: path })));}));}));}));





    return ret.concat(normalAssets);
  });return function (_x) {return _ref.apply(this, arguments);};})();module.exports = exports['default'];