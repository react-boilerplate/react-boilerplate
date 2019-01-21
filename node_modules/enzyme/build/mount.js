Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = mount;

var _ReactWrapper = require('./ReactWrapper');

var _ReactWrapper2 = _interopRequireDefault(_ReactWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Mounts and renders a react component into the document and provides a testing wrapper around it.
 *
 * @param node
 * @returns {ReactWrapper}
 */
function mount(node, options) {
  return new _ReactWrapper2['default'](node, null, options);
}