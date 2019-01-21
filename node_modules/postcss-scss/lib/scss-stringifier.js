'use strict';

exports.__esModule = true;

var _stringifier = require('postcss/lib/stringifier');

var _stringifier2 = _interopRequireDefault(_stringifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScssStringifier = function (_Stringifier) {
    _inherits(ScssStringifier, _Stringifier);

    function ScssStringifier() {
        _classCallCheck(this, ScssStringifier);

        return _possibleConstructorReturn(this, _Stringifier.apply(this, arguments));
    }

    ScssStringifier.prototype.comment = function comment(node) {
        var left = this.raw(node, 'left', 'commentLeft');
        var right = this.raw(node, 'right', 'commentRight');

        if (node.raws.inline) {
            var text = node.raws.text || node.text;
            this.builder('//' + left + text + right, node);
        } else {
            this.builder('/*' + left + node.text + right + '*/', node);
        }
    };

    ScssStringifier.prototype.decl = function decl(node, semicolon) {
        if (!node.isNested) {
            _Stringifier.prototype.decl.call(this, node, semicolon);
        } else {

            var between = this.raw(node, 'between', 'colon');
            var string = node.prop + between + this.rawValue(node, 'value');
            if (node.important) {
                string += node.raws.important || ' !important';
            }

            this.builder(string + '{', node, 'start');

            var after = void 0;
            if (node.nodes && node.nodes.length) {
                this.body(node);
                after = this.raw(node, 'after');
            } else {
                after = this.raw(node, 'after', 'emptyBody');
            }
            if (after) this.builder(after);
            this.builder('}', node, 'end');
        }
    };

    ScssStringifier.prototype.rawValue = function rawValue(node, prop) {
        var value = node[prop];
        var raw = node.raws[prop];
        if (raw && raw.value === value) {
            return raw.scss ? raw.scss : raw.raw;
        } else {
            return value;
        }
    };

    return ScssStringifier;
}(_stringifier2.default);

exports.default = ScssStringifier;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjc3Mtc3RyaW5naWZpZXIuZXM2Il0sIm5hbWVzIjpbIlNjc3NTdHJpbmdpZmllciIsImNvbW1lbnQiLCJub2RlIiwibGVmdCIsInJhdyIsInJpZ2h0IiwicmF3cyIsImlubGluZSIsInRleHQiLCJidWlsZGVyIiwiZGVjbCIsInNlbWljb2xvbiIsImlzTmVzdGVkIiwiYmV0d2VlbiIsInN0cmluZyIsInByb3AiLCJyYXdWYWx1ZSIsImltcG9ydGFudCIsImFmdGVyIiwibm9kZXMiLCJsZW5ndGgiLCJib2R5IiwidmFsdWUiLCJzY3NzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsZTs7Ozs7Ozs7OzhCQUVqQkMsTyxvQkFBUUMsSSxFQUFNO0FBQ1YsWUFBSUMsT0FBUSxLQUFLQyxHQUFMLENBQVNGLElBQVQsRUFBZSxNQUFmLEVBQXdCLGFBQXhCLENBQVo7QUFDQSxZQUFJRyxRQUFRLEtBQUtELEdBQUwsQ0FBU0YsSUFBVCxFQUFlLE9BQWYsRUFBd0IsY0FBeEIsQ0FBWjs7QUFFQSxZQUFLQSxLQUFLSSxJQUFMLENBQVVDLE1BQWYsRUFBd0I7QUFDcEIsZ0JBQUlDLE9BQU9OLEtBQUtJLElBQUwsQ0FBVUUsSUFBVixJQUFrQk4sS0FBS00sSUFBbEM7QUFDQSxpQkFBS0MsT0FBTCxDQUFhLE9BQU9OLElBQVAsR0FBY0ssSUFBZCxHQUFxQkgsS0FBbEMsRUFBeUNILElBQXpDO0FBQ0gsU0FIRCxNQUdPO0FBQ0gsaUJBQUtPLE9BQUwsQ0FBYSxPQUFPTixJQUFQLEdBQWNELEtBQUtNLElBQW5CLEdBQTBCSCxLQUExQixHQUFrQyxJQUEvQyxFQUFxREgsSUFBckQ7QUFDSDtBQUNKLEs7OzhCQUVEUSxJLGlCQUFLUixJLEVBQU1TLFMsRUFBVztBQUNsQixZQUFLLENBQUNULEtBQUtVLFFBQVgsRUFBc0I7QUFDbEIsbUNBQU1GLElBQU4sWUFBV1IsSUFBWCxFQUFpQlMsU0FBakI7QUFDSCxTQUZELE1BRU87O0FBRUgsZ0JBQUlFLFVBQVUsS0FBS1QsR0FBTCxDQUFTRixJQUFULEVBQWUsU0FBZixFQUEwQixPQUExQixDQUFkO0FBQ0EsZ0JBQUlZLFNBQVVaLEtBQUthLElBQUwsR0FBWUYsT0FBWixHQUFzQixLQUFLRyxRQUFMLENBQWNkLElBQWQsRUFBb0IsT0FBcEIsQ0FBcEM7QUFDQSxnQkFBS0EsS0FBS2UsU0FBVixFQUFzQjtBQUNsQkgsMEJBQVVaLEtBQUtJLElBQUwsQ0FBVVcsU0FBVixJQUF1QixhQUFqQztBQUNIOztBQUVELGlCQUFLUixPQUFMLENBQWFLLFNBQVMsR0FBdEIsRUFBMkJaLElBQTNCLEVBQWlDLE9BQWpDOztBQUVBLGdCQUFJZ0IsY0FBSjtBQUNBLGdCQUFLaEIsS0FBS2lCLEtBQUwsSUFBY2pCLEtBQUtpQixLQUFMLENBQVdDLE1BQTlCLEVBQXVDO0FBQ25DLHFCQUFLQyxJQUFMLENBQVVuQixJQUFWO0FBQ0FnQix3QkFBUSxLQUFLZCxHQUFMLENBQVNGLElBQVQsRUFBZSxPQUFmLENBQVI7QUFDSCxhQUhELE1BR087QUFDSGdCLHdCQUFRLEtBQUtkLEdBQUwsQ0FBU0YsSUFBVCxFQUFlLE9BQWYsRUFBd0IsV0FBeEIsQ0FBUjtBQUNIO0FBQ0QsZ0JBQUtnQixLQUFMLEVBQWEsS0FBS1QsT0FBTCxDQUFhUyxLQUFiO0FBQ2IsaUJBQUtULE9BQUwsQ0FBYSxHQUFiLEVBQWtCUCxJQUFsQixFQUF3QixLQUF4QjtBQUNIO0FBQ0osSzs7OEJBRURjLFEscUJBQVNkLEksRUFBTWEsSSxFQUFNO0FBQ2pCLFlBQUlPLFFBQVFwQixLQUFLYSxJQUFMLENBQVo7QUFDQSxZQUFJWCxNQUFRRixLQUFLSSxJQUFMLENBQVVTLElBQVYsQ0FBWjtBQUNBLFlBQUtYLE9BQU9BLElBQUlrQixLQUFKLEtBQWNBLEtBQTFCLEVBQWtDO0FBQzlCLG1CQUFPbEIsSUFBSW1CLElBQUosR0FBV25CLElBQUltQixJQUFmLEdBQXNCbkIsSUFBSUEsR0FBakM7QUFDSCxTQUZELE1BRU87QUFDSCxtQkFBT2tCLEtBQVA7QUFDSDtBQUNKLEs7Ozs7O2tCQS9DZ0J0QixlIiwiZmlsZSI6InNjc3Mtc3RyaW5naWZpZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RyaW5naWZpZXIgZnJvbSAncG9zdGNzcy9saWIvc3RyaW5naWZpZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3NzU3RyaW5naWZpZXIgZXh0ZW5kcyBTdHJpbmdpZmllciB7XG5cbiAgICBjb21tZW50KG5vZGUpIHtcbiAgICAgICAgbGV0IGxlZnQgID0gdGhpcy5yYXcobm9kZSwgJ2xlZnQnLCAgJ2NvbW1lbnRMZWZ0Jyk7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMucmF3KG5vZGUsICdyaWdodCcsICdjb21tZW50UmlnaHQnKTtcblxuICAgICAgICBpZiAoIG5vZGUucmF3cy5pbmxpbmUgKSB7XG4gICAgICAgICAgICBsZXQgdGV4dCA9IG5vZGUucmF3cy50ZXh0IHx8IG5vZGUudGV4dDtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRlcignLy8nICsgbGVmdCArIHRleHQgKyByaWdodCwgbm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkZXIoJy8qJyArIGxlZnQgKyBub2RlLnRleHQgKyByaWdodCArICcqLycsIG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjbChub2RlLCBzZW1pY29sb24pIHtcbiAgICAgICAgaWYgKCAhbm9kZS5pc05lc3RlZCApIHtcbiAgICAgICAgICAgIHN1cGVyLmRlY2wobm9kZSwgc2VtaWNvbG9uKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbGV0IGJldHdlZW4gPSB0aGlzLnJhdyhub2RlLCAnYmV0d2VlbicsICdjb2xvbicpO1xuICAgICAgICAgICAgbGV0IHN0cmluZyAgPSBub2RlLnByb3AgKyBiZXR3ZWVuICsgdGhpcy5yYXdWYWx1ZShub2RlLCAndmFsdWUnKTtcbiAgICAgICAgICAgIGlmICggbm9kZS5pbXBvcnRhbnQgKSB7XG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IG5vZGUucmF3cy5pbXBvcnRhbnQgfHwgJyAhaW1wb3J0YW50JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5idWlsZGVyKHN0cmluZyArICd7Jywgbm9kZSwgJ3N0YXJ0Jyk7XG5cbiAgICAgICAgICAgIGxldCBhZnRlcjtcbiAgICAgICAgICAgIGlmICggbm9kZS5ub2RlcyAmJiBub2RlLm5vZGVzLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvZHkobm9kZSk7XG4gICAgICAgICAgICAgICAgYWZ0ZXIgPSB0aGlzLnJhdyhub2RlLCAnYWZ0ZXInKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWZ0ZXIgPSB0aGlzLnJhdyhub2RlLCAnYWZ0ZXInLCAnZW1wdHlCb2R5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIGFmdGVyICkgdGhpcy5idWlsZGVyKGFmdGVyKTtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRlcignfScsIG5vZGUsICdlbmQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJhd1ZhbHVlKG5vZGUsIHByb3ApIHtcbiAgICAgICAgbGV0IHZhbHVlID0gbm9kZVtwcm9wXTtcbiAgICAgICAgbGV0IHJhdyAgID0gbm9kZS5yYXdzW3Byb3BdO1xuICAgICAgICBpZiAoIHJhdyAmJiByYXcudmFsdWUgPT09IHZhbHVlICkge1xuICAgICAgICAgICAgcmV0dXJuIHJhdy5zY3NzID8gcmF3LnNjc3MgOiByYXcucmF3O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=
