'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _warnOnce = require('./warn-once');

var _warnOnce2 = _interopRequireDefault(_warnOnce);

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents a comment between declarations or statements (rule and at-rules).
 *
 * Comments inside selectors, at-rule parameters, or declaration values
 * will be stored in the `raws` properties explained above.
 *
 * @extends Node
 */
var Comment = function (_Node) {
    _inherits(Comment, _Node);

    function Comment(defaults) {
        _classCallCheck(this, Comment);

        var _this = _possibleConstructorReturn(this, _Node.call(this, defaults));

        _this.type = 'comment';
        return _this;
    }

    _createClass(Comment, [{
        key: 'left',
        get: function get() {
            (0, _warnOnce2.default)('Comment#left was deprecated. Use Comment#raws.left');
            return this.raws.left;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('Comment#left was deprecated. Use Comment#raws.left');
            this.raws.left = val;
        }
    }, {
        key: 'right',
        get: function get() {
            (0, _warnOnce2.default)('Comment#right was deprecated. Use Comment#raws.right');
            return this.raws.right;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('Comment#right was deprecated. Use Comment#raws.right');
            this.raws.right = val;
        }

        /**
         * @memberof Comment#
         * @member {string} text - the comment’s text
         */

        /**
         * @memberof Comment#
         * @member {object} raws - Information to generate byte-to-byte equal
         *                         node string as it was in the origin input.
         *
         * Every parser saves its own properties,
         * but the default CSS parser uses:
         *
         * * `before`: the space symbols before the node.
         * * `left`: the space symbols between `/*` and the comment’s text.
         * * `right`: the space symbols between the comment’s text.
         */

    }]);

    return Comment;
}(_node2.default);

exports.default = Comment;
module.exports = exports['default'];