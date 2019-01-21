'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stringifier = require('postcss/lib/stringifier');

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
}(Stringifier);

module.exports = ScssStringifier;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjc3Mtc3RyaW5naWZpZXIuZXM2Il0sIm5hbWVzIjpbIlN0cmluZ2lmaWVyIiwicmVxdWlyZSIsIlNjc3NTdHJpbmdpZmllciIsImNvbW1lbnQiLCJub2RlIiwibGVmdCIsInJhdyIsInJpZ2h0IiwicmF3cyIsImlubGluZSIsInRleHQiLCJidWlsZGVyIiwiZGVjbCIsInNlbWljb2xvbiIsImlzTmVzdGVkIiwiYmV0d2VlbiIsInN0cmluZyIsInByb3AiLCJyYXdWYWx1ZSIsImltcG9ydGFudCIsImFmdGVyIiwibm9kZXMiLCJsZW5ndGgiLCJib2R5IiwidmFsdWUiLCJzY3NzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxJQUFNQSxjQUFjQyxRQUFRLHlCQUFSLENBQXBCOztJQUVNQyxlOzs7Ozs7Ozs7NEJBQ0pDLE8sb0JBQVNDLEksRUFBTTtBQUNiLFFBQU1DLE9BQU8sS0FBS0MsR0FBTCxDQUFTRixJQUFULEVBQWUsTUFBZixFQUF1QixhQUF2QixDQUFiO0FBQ0EsUUFBTUcsUUFBUSxLQUFLRCxHQUFMLENBQVNGLElBQVQsRUFBZSxPQUFmLEVBQXdCLGNBQXhCLENBQWQ7O0FBRUEsUUFBSUEsS0FBS0ksSUFBTCxDQUFVQyxNQUFkLEVBQXNCO0FBQ3BCLFVBQU1DLE9BQU9OLEtBQUtJLElBQUwsQ0FBVUUsSUFBVixJQUFrQk4sS0FBS00sSUFBcEM7QUFDQSxXQUFLQyxPQUFMLENBQWEsT0FBT04sSUFBUCxHQUFjSyxJQUFkLEdBQXFCSCxLQUFsQyxFQUF5Q0gsSUFBekM7QUFDRCxLQUhELE1BR087QUFDTCxXQUFLTyxPQUFMLENBQWEsT0FBT04sSUFBUCxHQUFjRCxLQUFLTSxJQUFuQixHQUEwQkgsS0FBMUIsR0FBa0MsSUFBL0MsRUFBcURILElBQXJEO0FBQ0Q7QUFDRixHOzs0QkFFRFEsSSxpQkFBTVIsSSxFQUFNUyxTLEVBQVc7QUFDckIsUUFBSSxDQUFDVCxLQUFLVSxRQUFWLEVBQW9CO0FBQ2xCLDZCQUFNRixJQUFOLFlBQVdSLElBQVgsRUFBaUJTLFNBQWpCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsVUFBTUUsVUFBVSxLQUFLVCxHQUFMLENBQVNGLElBQVQsRUFBZSxTQUFmLEVBQTBCLE9BQTFCLENBQWhCO0FBQ0EsVUFBSVksU0FBU1osS0FBS2EsSUFBTCxHQUFZRixPQUFaLEdBQXNCLEtBQUtHLFFBQUwsQ0FBY2QsSUFBZCxFQUFvQixPQUFwQixDQUFuQztBQUNBLFVBQUlBLEtBQUtlLFNBQVQsRUFBb0I7QUFDbEJILGtCQUFVWixLQUFLSSxJQUFMLENBQVVXLFNBQVYsSUFBdUIsYUFBakM7QUFDRDs7QUFFRCxXQUFLUixPQUFMLENBQWFLLFNBQVMsR0FBdEIsRUFBMkJaLElBQTNCLEVBQWlDLE9BQWpDOztBQUVBLFVBQUlnQixjQUFKO0FBQ0EsVUFBSWhCLEtBQUtpQixLQUFMLElBQWNqQixLQUFLaUIsS0FBTCxDQUFXQyxNQUE3QixFQUFxQztBQUNuQyxhQUFLQyxJQUFMLENBQVVuQixJQUFWO0FBQ0FnQixnQkFBUSxLQUFLZCxHQUFMLENBQVNGLElBQVQsRUFBZSxPQUFmLENBQVI7QUFDRCxPQUhELE1BR087QUFDTGdCLGdCQUFRLEtBQUtkLEdBQUwsQ0FBU0YsSUFBVCxFQUFlLE9BQWYsRUFBd0IsV0FBeEIsQ0FBUjtBQUNEO0FBQ0QsVUFBSWdCLEtBQUosRUFBVyxLQUFLVCxPQUFMLENBQWFTLEtBQWI7QUFDWCxXQUFLVCxPQUFMLENBQWEsR0FBYixFQUFrQlAsSUFBbEIsRUFBd0IsS0FBeEI7QUFDRDtBQUNGLEc7OzRCQUVEYyxRLHFCQUFVZCxJLEVBQU1hLEksRUFBTTtBQUNwQixRQUFNTyxRQUFRcEIsS0FBS2EsSUFBTCxDQUFkO0FBQ0EsUUFBTVgsTUFBTUYsS0FBS0ksSUFBTCxDQUFVUyxJQUFWLENBQVo7QUFDQSxRQUFJWCxPQUFPQSxJQUFJa0IsS0FBSixLQUFjQSxLQUF6QixFQUFnQztBQUM5QixhQUFPbEIsSUFBSW1CLElBQUosR0FBV25CLElBQUltQixJQUFmLEdBQXNCbkIsSUFBSUEsR0FBakM7QUFDRCxLQUZELE1BRU87QUFDTCxhQUFPa0IsS0FBUDtBQUNEO0FBQ0YsRzs7O0VBN0MyQnhCLFc7O0FBZ0Q5QjBCLE9BQU9DLE9BQVAsR0FBaUJ6QixlQUFqQiIsImZpbGUiOiJzY3NzLXN0cmluZ2lmaWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU3RyaW5naWZpZXIgPSByZXF1aXJlKCdwb3N0Y3NzL2xpYi9zdHJpbmdpZmllcicpXG5cbmNsYXNzIFNjc3NTdHJpbmdpZmllciBleHRlbmRzIFN0cmluZ2lmaWVyIHtcbiAgY29tbWVudCAobm9kZSkge1xuICAgIGNvbnN0IGxlZnQgPSB0aGlzLnJhdyhub2RlLCAnbGVmdCcsICdjb21tZW50TGVmdCcpXG4gICAgY29uc3QgcmlnaHQgPSB0aGlzLnJhdyhub2RlLCAncmlnaHQnLCAnY29tbWVudFJpZ2h0JylcblxuICAgIGlmIChub2RlLnJhd3MuaW5saW5lKSB7XG4gICAgICBjb25zdCB0ZXh0ID0gbm9kZS5yYXdzLnRleHQgfHwgbm9kZS50ZXh0XG4gICAgICB0aGlzLmJ1aWxkZXIoJy8vJyArIGxlZnQgKyB0ZXh0ICsgcmlnaHQsIG5vZGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnVpbGRlcignLyonICsgbGVmdCArIG5vZGUudGV4dCArIHJpZ2h0ICsgJyovJywgbm9kZSlcbiAgICB9XG4gIH1cblxuICBkZWNsIChub2RlLCBzZW1pY29sb24pIHtcbiAgICBpZiAoIW5vZGUuaXNOZXN0ZWQpIHtcbiAgICAgIHN1cGVyLmRlY2wobm9kZSwgc2VtaWNvbG9uKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBiZXR3ZWVuID0gdGhpcy5yYXcobm9kZSwgJ2JldHdlZW4nLCAnY29sb24nKVxuICAgICAgbGV0IHN0cmluZyA9IG5vZGUucHJvcCArIGJldHdlZW4gKyB0aGlzLnJhd1ZhbHVlKG5vZGUsICd2YWx1ZScpXG4gICAgICBpZiAobm9kZS5pbXBvcnRhbnQpIHtcbiAgICAgICAgc3RyaW5nICs9IG5vZGUucmF3cy5pbXBvcnRhbnQgfHwgJyAhaW1wb3J0YW50J1xuICAgICAgfVxuXG4gICAgICB0aGlzLmJ1aWxkZXIoc3RyaW5nICsgJ3snLCBub2RlLCAnc3RhcnQnKVxuXG4gICAgICBsZXQgYWZ0ZXJcbiAgICAgIGlmIChub2RlLm5vZGVzICYmIG5vZGUubm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuYm9keShub2RlKVxuICAgICAgICBhZnRlciA9IHRoaXMucmF3KG5vZGUsICdhZnRlcicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZnRlciA9IHRoaXMucmF3KG5vZGUsICdhZnRlcicsICdlbXB0eUJvZHknKVxuICAgICAgfVxuICAgICAgaWYgKGFmdGVyKSB0aGlzLmJ1aWxkZXIoYWZ0ZXIpXG4gICAgICB0aGlzLmJ1aWxkZXIoJ30nLCBub2RlLCAnZW5kJylcbiAgICB9XG4gIH1cblxuICByYXdWYWx1ZSAobm9kZSwgcHJvcCkge1xuICAgIGNvbnN0IHZhbHVlID0gbm9kZVtwcm9wXVxuICAgIGNvbnN0IHJhdyA9IG5vZGUucmF3c1twcm9wXVxuICAgIGlmIChyYXcgJiYgcmF3LnZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHJhdy5zY3NzID8gcmF3LnNjc3MgOiByYXcucmF3XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjc3NTdHJpbmdpZmllclxuIl19
