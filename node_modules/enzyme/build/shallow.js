Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = shallow;

var _ShallowWrapper = require('./ShallowWrapper');

var _ShallowWrapper2 = _interopRequireDefault(_ShallowWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Shallow renders a react component and provides a testing wrapper around it.
 *
 * @param node
 * @returns {ShallowWrapper}
 */
function shallow(node, options) {
  return new _ShallowWrapper2['default'](node, null, options);
}