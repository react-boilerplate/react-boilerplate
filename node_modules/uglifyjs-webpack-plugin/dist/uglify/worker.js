'use strict';

var _minify = require('./minify');

var _minify2 = _interopRequireDefault(_minify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (options, callback) {
  try {
    // 'use strict' => this === undefined (Clean Scope)
    // Safer for possible security issues, albeit not critical at all here
    // eslint-disable-next-line no-new-func, no-param-reassign
    options = new Function(`'use strict'\nreturn ${options}`)();

    callback(null, (0, _minify2.default)(options));
  } catch (errors) {
    callback(errors);
  }
};