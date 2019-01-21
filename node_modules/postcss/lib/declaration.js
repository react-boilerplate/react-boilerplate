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
 * Represents a CSS declaration.
 *
 * @extends Node
 *
 * @example
 * const root = postcss.parse('a { color: black }');
 * const decl = root.first.first;
 * decl.type       //=> 'decl'
 * decl.toString() //=> ' color: black'
 */
var Declaration = function (_Node) {
    _inherits(Declaration, _Node);

    function Declaration(defaults) {
        _classCallCheck(this, Declaration);

        var _this = _possibleConstructorReturn(this, _Node.call(this, defaults));

        _this.type = 'decl';
        return _this;
    }

    _createClass(Declaration, [{
        key: '_value',
        get: function get() {
            (0, _warnOnce2.default)('Node#_value was deprecated. Use Node#raws.value');
            return this.raws.value;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('Node#_value was deprecated. Use Node#raws.value');
            this.raws.value = val;
        }
    }, {
        key: '_important',
        get: function get() {
            (0, _warnOnce2.default)('Node#_important was deprecated. Use Node#raws.important');
            return this.raws.important;
        },
        set: function set(val) {
            (0, _warnOnce2.default)('Node#_important was deprecated. Use Node#raws.important');
            this.raws.important = val;
        }

        /**
         * @memberof Declaration#
         * @member {string} prop - the declaration’s property name
         *
         * @example
         * const root = postcss.parse('a { color: black }');
         * const decl = root.first.first;
         * decl.prop //=> 'color'
         */

        /**
         * @memberof Declaration#
         * @member {string} value - the declaration’s value
         *
         * @example
         * const root = postcss.parse('a { color: black }');
         * const decl = root.first.first;
         * decl.value //=> 'black'
         */

        /**
         * @memberof Declaration#
         * @member {boolean} important - `true` if the declaration
         *                               has an !important annotation.
         *
         * @example
         * const root = postcss.parse('a { color: black !important; color: red }');
         * root.first.first.important //=> true
         * root.first.last.important  //=> undefined
         */

        /**
         * @memberof Declaration#
         * @member {object} raws - Information to generate byte-to-byte equal
         *                         node string as it was in the origin input.
         *
         * Every parser saves its own properties,
         * but the default CSS parser uses:
         *
         * * `before`: the space symbols before the node. It also stores `*`
         *   and `_` symbols before the declaration (IE hack).
         * * `between`: the symbols between the property and value
         *   for declarations.
         * * `important`: the content of the important statement,
         *   if it is not just `!important`.
         *
         * PostCSS cleans declaration from comments and extra spaces,
         * but it stores origin content in raws properties.
         * As such, if you don’t change a declaration’s value,
         * PostCSS will use the raw value with comments.
         *
         * @example
         * const root = postcss.parse('a {\n  color:black\n}')
         * root.first.first.raws //=> { before: '\n  ', between: ':' }
         */

    }]);

    return Declaration;
}(_node2.default);

exports.default = Declaration;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlY2xhcmF0aW9uLmVzNiJdLCJuYW1lcyI6WyJEZWNsYXJhdGlvbiIsImRlZmF1bHRzIiwidHlwZSIsInJhd3MiLCJ2YWx1ZSIsInZhbCIsImltcG9ydGFudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7O0lBV01BLFc7OztBQUVGLHlCQUFZQyxRQUFaLEVBQXNCO0FBQUE7O0FBQUEscURBQ2xCLGlCQUFNQSxRQUFOLENBRGtCOztBQUVsQixjQUFLQyxJQUFMLEdBQVksTUFBWjtBQUZrQjtBQUdyQjs7Ozs0QkFFWTtBQUNULG9DQUFTLGlEQUFUO0FBQ0EsbUJBQU8sS0FBS0MsSUFBTCxDQUFVQyxLQUFqQjtBQUNILFM7MEJBRVVDLEcsRUFBSztBQUNaLG9DQUFTLGlEQUFUO0FBQ0EsaUJBQUtGLElBQUwsQ0FBVUMsS0FBVixHQUFrQkMsR0FBbEI7QUFDSDs7OzRCQUVnQjtBQUNiLG9DQUFTLHlEQUFUO0FBQ0EsbUJBQU8sS0FBS0YsSUFBTCxDQUFVRyxTQUFqQjtBQUNILFM7MEJBRWNELEcsRUFBSztBQUNoQixvQ0FBUyx5REFBVDtBQUNBLGlCQUFLRixJQUFMLENBQVVHLFNBQVYsR0FBc0JELEdBQXRCO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBMkJXTCxXIiwiZmlsZSI6ImRlY2xhcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdhcm5PbmNlIGZyb20gJy4vd2Fybi1vbmNlJztcbmltcG9ydCBOb2RlICAgICBmcm9tICcuL25vZGUnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBDU1MgZGVjbGFyYXRpb24uXG4gKlxuICogQGV4dGVuZHMgTm9kZVxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSB7IGNvbG9yOiBibGFjayB9Jyk7XG4gKiBjb25zdCBkZWNsID0gcm9vdC5maXJzdC5maXJzdDtcbiAqIGRlY2wudHlwZSAgICAgICAvLz0+ICdkZWNsJ1xuICogZGVjbC50b1N0cmluZygpIC8vPT4gJyBjb2xvcjogYmxhY2snXG4gKi9cbmNsYXNzIERlY2xhcmF0aW9uIGV4dGVuZHMgTm9kZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihkZWZhdWx0cykge1xuICAgICAgICBzdXBlcihkZWZhdWx0cyk7XG4gICAgICAgIHRoaXMudHlwZSA9ICdkZWNsJztcbiAgICB9XG5cbiAgICBnZXQgX3ZhbHVlKCkge1xuICAgICAgICB3YXJuT25jZSgnTm9kZSNfdmFsdWUgd2FzIGRlcHJlY2F0ZWQuIFVzZSBOb2RlI3Jhd3MudmFsdWUnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmF3cy52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgX3ZhbHVlKHZhbCkge1xuICAgICAgICB3YXJuT25jZSgnTm9kZSNfdmFsdWUgd2FzIGRlcHJlY2F0ZWQuIFVzZSBOb2RlI3Jhd3MudmFsdWUnKTtcbiAgICAgICAgdGhpcy5yYXdzLnZhbHVlID0gdmFsO1xuICAgIH1cblxuICAgIGdldCBfaW1wb3J0YW50KCkge1xuICAgICAgICB3YXJuT25jZSgnTm9kZSNfaW1wb3J0YW50IHdhcyBkZXByZWNhdGVkLiBVc2UgTm9kZSNyYXdzLmltcG9ydGFudCcpO1xuICAgICAgICByZXR1cm4gdGhpcy5yYXdzLmltcG9ydGFudDtcbiAgICB9XG5cbiAgICBzZXQgX2ltcG9ydGFudCh2YWwpIHtcbiAgICAgICAgd2Fybk9uY2UoJ05vZGUjX2ltcG9ydGFudCB3YXMgZGVwcmVjYXRlZC4gVXNlIE5vZGUjcmF3cy5pbXBvcnRhbnQnKTtcbiAgICAgICAgdGhpcy5yYXdzLmltcG9ydGFudCA9IHZhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyb2YgRGVjbGFyYXRpb24jXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSBwcm9wIC0gdGhlIGRlY2xhcmF0aW9u4oCZcyBwcm9wZXJ0eSBuYW1lXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKCdhIHsgY29sb3I6IGJsYWNrIH0nKTtcbiAgICAgKiBjb25zdCBkZWNsID0gcm9vdC5maXJzdC5maXJzdDtcbiAgICAgKiBkZWNsLnByb3AgLy89PiAnY29sb3InXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyb2YgRGVjbGFyYXRpb24jXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSB2YWx1ZSAtIHRoZSBkZWNsYXJhdGlvbuKAmXMgdmFsdWVcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2EgeyBjb2xvcjogYmxhY2sgfScpO1xuICAgICAqIGNvbnN0IGRlY2wgPSByb290LmZpcnN0LmZpcnN0O1xuICAgICAqIGRlY2wudmFsdWUgLy89PiAnYmxhY2snXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyb2YgRGVjbGFyYXRpb24jXG4gICAgICogQG1lbWJlciB7Ym9vbGVhbn0gaW1wb3J0YW50IC0gYHRydWVgIGlmIHRoZSBkZWNsYXJhdGlvblxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhcyBhbiAhaW1wb3J0YW50IGFubm90YXRpb24uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKCdhIHsgY29sb3I6IGJsYWNrICFpbXBvcnRhbnQ7IGNvbG9yOiByZWQgfScpO1xuICAgICAqIHJvb3QuZmlyc3QuZmlyc3QuaW1wb3J0YW50IC8vPT4gdHJ1ZVxuICAgICAqIHJvb3QuZmlyc3QubGFzdC5pbXBvcnRhbnQgIC8vPT4gdW5kZWZpbmVkXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyb2YgRGVjbGFyYXRpb24jXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSByYXdzIC0gSW5mb3JtYXRpb24gdG8gZ2VuZXJhdGUgYnl0ZS10by1ieXRlIGVxdWFsXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSBzdHJpbmcgYXMgaXQgd2FzIGluIHRoZSBvcmlnaW4gaW5wdXQuXG4gICAgICpcbiAgICAgKiBFdmVyeSBwYXJzZXIgc2F2ZXMgaXRzIG93biBwcm9wZXJ0aWVzLFxuICAgICAqIGJ1dCB0aGUgZGVmYXVsdCBDU1MgcGFyc2VyIHVzZXM6XG4gICAgICpcbiAgICAgKiAqIGBiZWZvcmVgOiB0aGUgc3BhY2Ugc3ltYm9scyBiZWZvcmUgdGhlIG5vZGUuIEl0IGFsc28gc3RvcmVzIGAqYFxuICAgICAqICAgYW5kIGBfYCBzeW1ib2xzIGJlZm9yZSB0aGUgZGVjbGFyYXRpb24gKElFIGhhY2spLlxuICAgICAqICogYGJldHdlZW5gOiB0aGUgc3ltYm9scyBiZXR3ZWVuIHRoZSBwcm9wZXJ0eSBhbmQgdmFsdWVcbiAgICAgKiAgIGZvciBkZWNsYXJhdGlvbnMuXG4gICAgICogKiBgaW1wb3J0YW50YDogdGhlIGNvbnRlbnQgb2YgdGhlIGltcG9ydGFudCBzdGF0ZW1lbnQsXG4gICAgICogICBpZiBpdCBpcyBub3QganVzdCBgIWltcG9ydGFudGAuXG4gICAgICpcbiAgICAgKiBQb3N0Q1NTIGNsZWFucyBkZWNsYXJhdGlvbiBmcm9tIGNvbW1lbnRzIGFuZCBleHRyYSBzcGFjZXMsXG4gICAgICogYnV0IGl0IHN0b3JlcyBvcmlnaW4gY29udGVudCBpbiByYXdzIHByb3BlcnRpZXMuXG4gICAgICogQXMgc3VjaCwgaWYgeW91IGRvbuKAmXQgY2hhbmdlIGEgZGVjbGFyYXRpb27igJlzIHZhbHVlLFxuICAgICAqIFBvc3RDU1Mgd2lsbCB1c2UgdGhlIHJhdyB2YWx1ZSB3aXRoIGNvbW1lbnRzLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSB7XFxuICBjb2xvcjpibGFja1xcbn0nKVxuICAgICAqIHJvb3QuZmlyc3QuZmlyc3QucmF3cyAvLz0+IHsgYmVmb3JlOiAnXFxuICAnLCBiZXR3ZWVuOiAnOicgfVxuICAgICAqL1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IERlY2xhcmF0aW9uO1xuIl19
