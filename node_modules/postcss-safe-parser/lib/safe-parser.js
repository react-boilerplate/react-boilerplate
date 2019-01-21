'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tokenizer = require('postcss/lib/tokenize');
var Comment = require('postcss/lib/comment');
var Parser = require('postcss/lib/parser');

var SafeParser = function (_Parser) {
  _inherits(SafeParser, _Parser);

  function SafeParser() {
    _classCallCheck(this, SafeParser);

    return _possibleConstructorReturn(this, _Parser.apply(this, arguments));
  }

  SafeParser.prototype.createTokenizer = function createTokenizer() {
    this.tokenizer = tokenizer(this.input, { ignoreErrors: true });
  };

  SafeParser.prototype.comment = function comment(token) {
    var node = new Comment();
    this.init(node, token[2], token[3]);
    node.source.end = { line: token[4], column: token[5] };

    var text = token[1].slice(2);
    if (text.slice(-2) === '*/') text = text.slice(0, -2);

    if (/^\s*$/.test(text)) {
      node.text = '';
      node.raws.left = text;
      node.raws.right = '';
    } else {
      var match = text.match(/^(\s*)([^]*[^\s])(\s*)$/);
      node.text = match[2];
      node.raws.left = match[1];
      node.raws.right = match[3];
    }
  };

  SafeParser.prototype.decl = function decl(tokens) {
    if (tokens.length > 1) {
      _Parser.prototype.decl.call(this, tokens);
    }
  };

  SafeParser.prototype.unclosedBracket = function unclosedBracket() {};

  SafeParser.prototype.unknownWord = function unknownWord(tokens) {
    this.spaces += tokens.map(function (i) {
      return i[1];
    }).join('');
  };

  SafeParser.prototype.unexpectedClose = function unexpectedClose() {
    this.current.raws.after += '}';
  };

  SafeParser.prototype.doubleColon = function doubleColon() {};

  SafeParser.prototype.unnamedAtrule = function unnamedAtrule(node) {
    node.name = '';
  };

  SafeParser.prototype.precheckMissedSemicolon = function precheckMissedSemicolon(tokens) {
    var colon = this.colon(tokens);
    if (colon === false) return;

    var split = void 0;
    for (split = colon - 1; split >= 0; split--) {
      if (tokens[split][0] === 'word') break;
    }
    for (split -= 1; split >= 0; split--) {
      if (tokens[split][0] !== 'space') {
        split += 1;
        break;
      }
    }
    var other = tokens.splice(split, tokens.length - split);
    this.decl(other);
  };

  SafeParser.prototype.checkMissedSemicolon = function checkMissedSemicolon() {};

  SafeParser.prototype.endFile = function endFile() {
    if (this.current.nodes && this.current.nodes.length) {
      this.current.raws.semicolon = this.semicolon;
    }
    this.current.raws.after = (this.current.raws.after || '') + this.spaces;

    while (this.current.parent) {
      this.current = this.current.parent;
      this.current.raws.after = '';
    }
  };

  return SafeParser;
}(Parser);

module.exports = SafeParser;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhZmUtcGFyc2VyLmVzNiJdLCJuYW1lcyI6WyJ0b2tlbml6ZXIiLCJyZXF1aXJlIiwiQ29tbWVudCIsIlBhcnNlciIsIlNhZmVQYXJzZXIiLCJjcmVhdGVUb2tlbml6ZXIiLCJpbnB1dCIsImlnbm9yZUVycm9ycyIsImNvbW1lbnQiLCJ0b2tlbiIsIm5vZGUiLCJpbml0Iiwic291cmNlIiwiZW5kIiwibGluZSIsImNvbHVtbiIsInRleHQiLCJzbGljZSIsInRlc3QiLCJyYXdzIiwibGVmdCIsInJpZ2h0IiwibWF0Y2giLCJkZWNsIiwidG9rZW5zIiwibGVuZ3RoIiwidW5jbG9zZWRCcmFja2V0IiwidW5rbm93bldvcmQiLCJzcGFjZXMiLCJtYXAiLCJpIiwiam9pbiIsInVuZXhwZWN0ZWRDbG9zZSIsImN1cnJlbnQiLCJhZnRlciIsImRvdWJsZUNvbG9uIiwidW5uYW1lZEF0cnVsZSIsIm5hbWUiLCJwcmVjaGVja01pc3NlZFNlbWljb2xvbiIsImNvbG9uIiwic3BsaXQiLCJvdGhlciIsInNwbGljZSIsImNoZWNrTWlzc2VkU2VtaWNvbG9uIiwiZW5kRmlsZSIsIm5vZGVzIiwic2VtaWNvbG9uIiwicGFyZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxJQUFNQSxZQUFZQyxRQUFRLHNCQUFSLENBQWxCO0FBQ0EsSUFBTUMsVUFBVUQsUUFBUSxxQkFBUixDQUFoQjtBQUNBLElBQU1FLFNBQVNGLFFBQVEsb0JBQVIsQ0FBZjs7SUFFTUcsVTs7Ozs7Ozs7O3VCQUNKQyxlLDhCQUFtQjtBQUNqQixTQUFLTCxTQUFMLEdBQWlCQSxVQUFVLEtBQUtNLEtBQWYsRUFBc0IsRUFBRUMsY0FBYyxJQUFoQixFQUF0QixDQUFqQjtBQUNELEc7O3VCQUVEQyxPLG9CQUFTQyxLLEVBQU87QUFDZCxRQUFNQyxPQUFPLElBQUlSLE9BQUosRUFBYjtBQUNBLFNBQUtTLElBQUwsQ0FBVUQsSUFBVixFQUFnQkQsTUFBTSxDQUFOLENBQWhCLEVBQTBCQSxNQUFNLENBQU4sQ0FBMUI7QUFDQUMsU0FBS0UsTUFBTCxDQUFZQyxHQUFaLEdBQWtCLEVBQUVDLE1BQU1MLE1BQU0sQ0FBTixDQUFSLEVBQWtCTSxRQUFRTixNQUFNLENBQU4sQ0FBMUIsRUFBbEI7O0FBRUEsUUFBSU8sT0FBT1AsTUFBTSxDQUFOLEVBQVNRLEtBQVQsQ0FBZSxDQUFmLENBQVg7QUFDQSxRQUFJRCxLQUFLQyxLQUFMLENBQVcsQ0FBQyxDQUFaLE1BQW1CLElBQXZCLEVBQTZCRCxPQUFPQSxLQUFLQyxLQUFMLENBQVcsQ0FBWCxFQUFjLENBQUMsQ0FBZixDQUFQOztBQUU3QixRQUFJLFFBQVFDLElBQVIsQ0FBYUYsSUFBYixDQUFKLEVBQXdCO0FBQ3RCTixXQUFLTSxJQUFMLEdBQVksRUFBWjtBQUNBTixXQUFLUyxJQUFMLENBQVVDLElBQVYsR0FBaUJKLElBQWpCO0FBQ0FOLFdBQUtTLElBQUwsQ0FBVUUsS0FBVixHQUFrQixFQUFsQjtBQUNELEtBSkQsTUFJTztBQUNMLFVBQU1DLFFBQVFOLEtBQUtNLEtBQUwsQ0FBVyx5QkFBWCxDQUFkO0FBQ0FaLFdBQUtNLElBQUwsR0FBWU0sTUFBTSxDQUFOLENBQVo7QUFDQVosV0FBS1MsSUFBTCxDQUFVQyxJQUFWLEdBQWlCRSxNQUFNLENBQU4sQ0FBakI7QUFDQVosV0FBS1MsSUFBTCxDQUFVRSxLQUFWLEdBQWtCQyxNQUFNLENBQU4sQ0FBbEI7QUFDRDtBQUNGLEc7O3VCQUVEQyxJLGlCQUFNQyxNLEVBQVE7QUFDWixRQUFJQSxPQUFPQyxNQUFQLEdBQWdCLENBQXBCLEVBQXVCO0FBQ3JCLHdCQUFNRixJQUFOLFlBQVdDLE1BQVg7QUFDRDtBQUNGLEc7O3VCQUVERSxlLDhCQUFtQixDQUFHLEM7O3VCQUV0QkMsVyx3QkFBYUgsTSxFQUFRO0FBQ25CLFNBQUtJLE1BQUwsSUFBZUosT0FBT0ssR0FBUCxDQUFXO0FBQUEsYUFBS0MsRUFBRSxDQUFGLENBQUw7QUFBQSxLQUFYLEVBQXNCQyxJQUF0QixDQUEyQixFQUEzQixDQUFmO0FBQ0QsRzs7dUJBRURDLGUsOEJBQW1CO0FBQ2pCLFNBQUtDLE9BQUwsQ0FBYWQsSUFBYixDQUFrQmUsS0FBbEIsSUFBMkIsR0FBM0I7QUFDRCxHOzt1QkFFREMsVywwQkFBZSxDQUFHLEM7O3VCQUVsQkMsYSwwQkFBZTFCLEksRUFBTTtBQUNuQkEsU0FBSzJCLElBQUwsR0FBWSxFQUFaO0FBQ0QsRzs7dUJBRURDLHVCLG9DQUF5QmQsTSxFQUFRO0FBQy9CLFFBQU1lLFFBQVEsS0FBS0EsS0FBTCxDQUFXZixNQUFYLENBQWQ7QUFDQSxRQUFJZSxVQUFVLEtBQWQsRUFBcUI7O0FBRXJCLFFBQUlDLGNBQUo7QUFDQSxTQUFLQSxRQUFRRCxRQUFRLENBQXJCLEVBQXdCQyxTQUFTLENBQWpDLEVBQW9DQSxPQUFwQyxFQUE2QztBQUMzQyxVQUFJaEIsT0FBT2dCLEtBQVAsRUFBYyxDQUFkLE1BQXFCLE1BQXpCLEVBQWlDO0FBQ2xDO0FBQ0QsU0FBS0EsU0FBUyxDQUFkLEVBQWlCQSxTQUFTLENBQTFCLEVBQTZCQSxPQUE3QixFQUFzQztBQUNwQyxVQUFJaEIsT0FBT2dCLEtBQVAsRUFBYyxDQUFkLE1BQXFCLE9BQXpCLEVBQWtDO0FBQ2hDQSxpQkFBUyxDQUFUO0FBQ0E7QUFDRDtBQUNGO0FBQ0QsUUFBTUMsUUFBUWpCLE9BQU9rQixNQUFQLENBQWNGLEtBQWQsRUFBcUJoQixPQUFPQyxNQUFQLEdBQWdCZSxLQUFyQyxDQUFkO0FBQ0EsU0FBS2pCLElBQUwsQ0FBVWtCLEtBQVY7QUFDRCxHOzt1QkFFREUsb0IsbUNBQXdCLENBQUcsQzs7dUJBRTNCQyxPLHNCQUFXO0FBQ1QsUUFBSSxLQUFLWCxPQUFMLENBQWFZLEtBQWIsSUFBc0IsS0FBS1osT0FBTCxDQUFhWSxLQUFiLENBQW1CcEIsTUFBN0MsRUFBcUQ7QUFDbkQsV0FBS1EsT0FBTCxDQUFhZCxJQUFiLENBQWtCMkIsU0FBbEIsR0FBOEIsS0FBS0EsU0FBbkM7QUFDRDtBQUNELFNBQUtiLE9BQUwsQ0FBYWQsSUFBYixDQUFrQmUsS0FBbEIsR0FBMEIsQ0FBQyxLQUFLRCxPQUFMLENBQWFkLElBQWIsQ0FBa0JlLEtBQWxCLElBQTJCLEVBQTVCLElBQWtDLEtBQUtOLE1BQWpFOztBQUVBLFdBQU8sS0FBS0ssT0FBTCxDQUFhYyxNQUFwQixFQUE0QjtBQUMxQixXQUFLZCxPQUFMLEdBQWUsS0FBS0EsT0FBTCxDQUFhYyxNQUE1QjtBQUNBLFdBQUtkLE9BQUwsQ0FBYWQsSUFBYixDQUFrQmUsS0FBbEIsR0FBMEIsRUFBMUI7QUFDRDtBQUNGLEc7OztFQTdFc0IvQixNOztBQWdGekI2QyxPQUFPQyxPQUFQLEdBQWlCN0MsVUFBakIiLCJmaWxlIjoic2FmZS1wYXJzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0b2tlbml6ZXIgPSByZXF1aXJlKCdwb3N0Y3NzL2xpYi90b2tlbml6ZScpXG5jb25zdCBDb21tZW50ID0gcmVxdWlyZSgncG9zdGNzcy9saWIvY29tbWVudCcpXG5jb25zdCBQYXJzZXIgPSByZXF1aXJlKCdwb3N0Y3NzL2xpYi9wYXJzZXInKVxuXG5jbGFzcyBTYWZlUGFyc2VyIGV4dGVuZHMgUGFyc2VyIHtcbiAgY3JlYXRlVG9rZW5pemVyICgpIHtcbiAgICB0aGlzLnRva2VuaXplciA9IHRva2VuaXplcih0aGlzLmlucHV0LCB7IGlnbm9yZUVycm9yczogdHJ1ZSB9KVxuICB9XG5cbiAgY29tbWVudCAodG9rZW4pIHtcbiAgICBjb25zdCBub2RlID0gbmV3IENvbW1lbnQoKVxuICAgIHRoaXMuaW5pdChub2RlLCB0b2tlblsyXSwgdG9rZW5bM10pXG4gICAgbm9kZS5zb3VyY2UuZW5kID0geyBsaW5lOiB0b2tlbls0XSwgY29sdW1uOiB0b2tlbls1XSB9XG5cbiAgICBsZXQgdGV4dCA9IHRva2VuWzFdLnNsaWNlKDIpXG4gICAgaWYgKHRleHQuc2xpY2UoLTIpID09PSAnKi8nKSB0ZXh0ID0gdGV4dC5zbGljZSgwLCAtMilcblxuICAgIGlmICgvXlxccyokLy50ZXN0KHRleHQpKSB7XG4gICAgICBub2RlLnRleHQgPSAnJ1xuICAgICAgbm9kZS5yYXdzLmxlZnQgPSB0ZXh0XG4gICAgICBub2RlLnJhd3MucmlnaHQgPSAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXRjaCA9IHRleHQubWF0Y2goL14oXFxzKikoW15dKlteXFxzXSkoXFxzKikkLylcbiAgICAgIG5vZGUudGV4dCA9IG1hdGNoWzJdXG4gICAgICBub2RlLnJhd3MubGVmdCA9IG1hdGNoWzFdXG4gICAgICBub2RlLnJhd3MucmlnaHQgPSBtYXRjaFszXVxuICAgIH1cbiAgfVxuXG4gIGRlY2wgKHRva2Vucykge1xuICAgIGlmICh0b2tlbnMubGVuZ3RoID4gMSkge1xuICAgICAgc3VwZXIuZGVjbCh0b2tlbnMpXG4gICAgfVxuICB9XG5cbiAgdW5jbG9zZWRCcmFja2V0ICgpIHsgfVxuXG4gIHVua25vd25Xb3JkICh0b2tlbnMpIHtcbiAgICB0aGlzLnNwYWNlcyArPSB0b2tlbnMubWFwKGkgPT4gaVsxXSkuam9pbignJylcbiAgfVxuXG4gIHVuZXhwZWN0ZWRDbG9zZSAoKSB7XG4gICAgdGhpcy5jdXJyZW50LnJhd3MuYWZ0ZXIgKz0gJ30nXG4gIH1cblxuICBkb3VibGVDb2xvbiAoKSB7IH1cblxuICB1bm5hbWVkQXRydWxlIChub2RlKSB7XG4gICAgbm9kZS5uYW1lID0gJydcbiAgfVxuXG4gIHByZWNoZWNrTWlzc2VkU2VtaWNvbG9uICh0b2tlbnMpIHtcbiAgICBjb25zdCBjb2xvbiA9IHRoaXMuY29sb24odG9rZW5zKVxuICAgIGlmIChjb2xvbiA9PT0gZmFsc2UpIHJldHVyblxuXG4gICAgbGV0IHNwbGl0XG4gICAgZm9yIChzcGxpdCA9IGNvbG9uIC0gMTsgc3BsaXQgPj0gMDsgc3BsaXQtLSkge1xuICAgICAgaWYgKHRva2Vuc1tzcGxpdF1bMF0gPT09ICd3b3JkJykgYnJlYWtcbiAgICB9XG4gICAgZm9yIChzcGxpdCAtPSAxOyBzcGxpdCA+PSAwOyBzcGxpdC0tKSB7XG4gICAgICBpZiAodG9rZW5zW3NwbGl0XVswXSAhPT0gJ3NwYWNlJykge1xuICAgICAgICBzcGxpdCArPSAxXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IG90aGVyID0gdG9rZW5zLnNwbGljZShzcGxpdCwgdG9rZW5zLmxlbmd0aCAtIHNwbGl0KVxuICAgIHRoaXMuZGVjbChvdGhlcilcbiAgfVxuXG4gIGNoZWNrTWlzc2VkU2VtaWNvbG9uICgpIHsgfVxuXG4gIGVuZEZpbGUgKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQubm9kZXMgJiYgdGhpcy5jdXJyZW50Lm5vZGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5jdXJyZW50LnJhd3Muc2VtaWNvbG9uID0gdGhpcy5zZW1pY29sb25cbiAgICB9XG4gICAgdGhpcy5jdXJyZW50LnJhd3MuYWZ0ZXIgPSAodGhpcy5jdXJyZW50LnJhd3MuYWZ0ZXIgfHwgJycpICsgdGhpcy5zcGFjZXNcblxuICAgIHdoaWxlICh0aGlzLmN1cnJlbnQucGFyZW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmN1cnJlbnQucGFyZW50XG4gICAgICB0aGlzLmN1cnJlbnQucmF3cy5hZnRlciA9ICcnXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2FmZVBhcnNlclxuIl19
