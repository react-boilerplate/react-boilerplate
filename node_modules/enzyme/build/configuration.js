var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _validateAdapter = require('./validateAdapter');

var _validateAdapter2 = _interopRequireDefault(_validateAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var configuration = {};

module.exports = {
  get: function () {
    function get() {
      return (0, _object2['default'])({}, configuration);
    }

    return get;
  }(),
  merge: function () {
    function merge(extra) {
      if (extra.adapter) {
        (0, _validateAdapter2['default'])(extra.adapter);
      }
      (0, _object2['default'])(configuration, extra);
    }

    return merge;
  }()
};