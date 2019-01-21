'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = require('postcss/lib/container');

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
}(Container);

module.exports = NestedDeclaration;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5lc3RlZC1kZWNsYXJhdGlvbi5lczYiXSwibmFtZXMiOlsiQ29udGFpbmVyIiwicmVxdWlyZSIsIk5lc3RlZERlY2xhcmF0aW9uIiwiZGVmYXVsdHMiLCJ0eXBlIiwiaXNOZXN0ZWQiLCJub2RlcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBTUEsWUFBWUMsUUFBUSx1QkFBUixDQUFsQjs7SUFFTUMsaUI7OztBQUNKLDZCQUFhQyxRQUFiLEVBQXVCO0FBQUE7O0FBQUEsaURBQ3JCLHNCQUFNQSxRQUFOLENBRHFCOztBQUVyQixVQUFLQyxJQUFMLEdBQVksTUFBWjtBQUNBLFVBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxRQUFJLENBQUMsTUFBS0MsS0FBVixFQUFpQixNQUFLQSxLQUFMLEdBQWEsRUFBYjtBQUpJO0FBS3RCOzs7RUFONkJOLFM7O0FBU2hDTyxPQUFPQyxPQUFQLEdBQWlCTixpQkFBakIiLCJmaWxlIjoibmVzdGVkLWRlY2xhcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ29udGFpbmVyID0gcmVxdWlyZSgncG9zdGNzcy9saWIvY29udGFpbmVyJylcblxuY2xhc3MgTmVzdGVkRGVjbGFyYXRpb24gZXh0ZW5kcyBDb250YWluZXIge1xuICBjb25zdHJ1Y3RvciAoZGVmYXVsdHMpIHtcbiAgICBzdXBlcihkZWZhdWx0cylcbiAgICB0aGlzLnR5cGUgPSAnZGVjbCdcbiAgICB0aGlzLmlzTmVzdGVkID0gdHJ1ZVxuICAgIGlmICghdGhpcy5ub2RlcykgdGhpcy5ub2RlcyA9IFtdXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOZXN0ZWREZWNsYXJhdGlvblxuIl19
