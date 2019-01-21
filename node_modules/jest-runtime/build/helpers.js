'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.enhanceUnexpectedTokenMessage = undefined;

var _chalk;

function _load_chalk() {
  return (_chalk = _interopRequireDefault(require('chalk')));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

const DOT = ' \u2022 ';
const enhanceUnexpectedTokenMessage = (exports.enhanceUnexpectedTokenMessage = e => {
  e.stack =
    `${(_chalk || _load_chalk()).default.bold.red(
      'Jest encountered an unexpected token'
    )}

This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript.

By default, if Jest sees a Babel config, it will use that to transform your files, ignoring "node_modules".

Here's what you can do:
${DOT}To have some of your "node_modules" files transformed, you can specify a custom ${(
      _chalk || _load_chalk()
    ).default.bold('"transformIgnorePatterns"')} in your config.
${DOT}If you need a custom transformation specify a ${(
      _chalk || _load_chalk()
    ).default.bold('"transform"')} option in your config.
${DOT}If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the ${(
      _chalk || _load_chalk()
    ).default.bold('"moduleNameMapper"')} config option.

You'll find more details and examples of these config options in the docs:
${(_chalk || _load_chalk()).default.cyan(
      'https://jestjs.io/docs/en/configuration.html'
    )}

${(_chalk || _load_chalk()).default.bold.red('Details:')}

` + e.stack;

  return e;
});
