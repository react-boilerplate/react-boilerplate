'use strict';

exports.__esModule = true;

var _container = require('postcss/lib/container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NestedDeclaration = function (_Container) {
    _inherits(NestedDeclaration, _Container);

    function NestedDeclaration(defaults) {
        _classCallCheck(this, NestedDeclaration);

        var _this = _possibleConstructorReturn(this, _Container.call(this, defaults));

        _this.type = 'decl';
        _this.isNested = true;
        if (!_this.nodes) _this.nodes = [];
        return _this;
    }

    return NestedDeclaration;
}(_container2.default);

exports.default = NestedDeclaration;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5lc3RlZC1kZWNsYXJhdGlvbi5lczYiXSwibmFtZXMiOlsiTmVzdGVkRGVjbGFyYXRpb24iLCJkZWZhdWx0cyIsInR5cGUiLCJpc05lc3RlZCIsIm5vZGVzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVNQSxpQjs7O0FBRUYsK0JBQVlDLFFBQVosRUFBc0I7QUFBQTs7QUFBQSxxREFDbEIsc0JBQU1BLFFBQU4sQ0FEa0I7O0FBRWxCLGNBQUtDLElBQUwsR0FBZ0IsTUFBaEI7QUFDQSxjQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsWUFBSyxDQUFDLE1BQUtDLEtBQVgsRUFBbUIsTUFBS0EsS0FBTCxHQUFhLEVBQWI7QUFKRDtBQUtyQjs7Ozs7a0JBSVVKLGlCIiwiZmlsZSI6Im5lc3RlZC1kZWNsYXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb250YWluZXIgZnJvbSAncG9zdGNzcy9saWIvY29udGFpbmVyJztcblxuY2xhc3MgTmVzdGVkRGVjbGFyYXRpb24gZXh0ZW5kcyBDb250YWluZXIge1xuXG4gICAgY29uc3RydWN0b3IoZGVmYXVsdHMpIHtcbiAgICAgICAgc3VwZXIoZGVmYXVsdHMpO1xuICAgICAgICB0aGlzLnR5cGUgICAgID0gJ2RlY2wnO1xuICAgICAgICB0aGlzLmlzTmVzdGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKCAhdGhpcy5ub2RlcyApIHRoaXMubm9kZXMgPSBbXTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmVzdGVkRGVjbGFyYXRpb247XG4iXX0=
