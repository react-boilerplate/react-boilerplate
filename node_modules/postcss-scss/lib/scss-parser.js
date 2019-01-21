'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Comment = require('postcss/lib/comment');
var Parser = require('postcss/lib/parser');

var NestedDeclaration = require('./nested-declaration');
var scssTokenizer = require('./scss-tokenize');

var ScssParser = function (_Parser) {
  _inherits(ScssParser, _Parser);

  function ScssParser() {
    _classCallCheck(this, ScssParser);

    return _possibleConstructorReturn(this, _Parser.apply(this, arguments));
  }

  ScssParser.prototype.createTokenizer = function createTokenizer() {
    this.tokenizer = scssTokenizer(this.input);
  };

  ScssParser.prototype.rule = function rule(tokens) {
    var withColon = false;
    var brackets = 0;
    var value = '';
    for (var _iterator = tokens, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var i = _ref;

      if (withColon) {
        if (i[0] !== 'comment' && i[0] !== '{') {
          value += i[1];
        }
      } else if (i[0] === 'space' && i[1].indexOf('\n') !== -1) {
        break;
      } else if (i[0] === '(') {
        brackets += 1;
      } else if (i[0] === ')') {
        brackets -= 1;
      } else if (brackets === 0 && i[0] === ':') {
        withColon = true;
      }
    }

    if (!withColon || value.trim() === '' || /^[a-zA-Z-:#]/.test(value)) {
      _Parser.prototype.rule.call(this, tokens);
    } else {
      tokens.pop();
      var node = new NestedDeclaration();
      this.init(node);

      var last = tokens[tokens.length - 1];
      if (last[4]) {
        node.source.end = { line: last[4], column: last[5] };
      } else {
        node.source.end = { line: last[2], column: last[3] };
      }

      while (tokens[0][0] !== 'word') {
        node.raws.before += tokens.shift()[1];
      }
      node.source.start = { line: tokens[0][2], column: tokens[0][3] };

      node.prop = '';
      while (tokens.length) {
        var type = tokens[0][0];
        if (type === ':' || type === 'space' || type === 'comment') {
          break;
        }
        node.prop += tokens.shift()[1];
      }

      node.raws.between = '';

      var token = void 0;
      while (tokens.length) {
        token = tokens.shift();

        if (token[0] === ':') {
          node.raws.between += token[1];
          break;
        } else {
          node.raws.between += token[1];
        }
      }

      if (node.prop[0] === '_' || node.prop[0] === '*') {
        node.raws.before += node.prop[0];
        node.prop = node.prop.slice(1);
      }
      node.raws.between += this.spacesAndCommentsFromStart(tokens);
      this.precheckMissedSemicolon(tokens);

      for (var _i2 = tokens.length - 1; _i2 > 0; _i2--) {
        token = tokens[_i2];
        if (token[1] === '!important') {
          node.important = true;
          var string = this.stringFrom(tokens, _i2);
          string = this.spacesFromEnd(tokens) + string;
          if (string !== ' !important') {
            node.raws.important = string;
          }
          break;
        } else if (token[1] === 'important') {
          var cache = tokens.slice(0);
          var str = '';
          for (var j = _i2; j > 0; j--) {
            var _type = cache[j][0];
            if (str.trim().indexOf('!') === 0 && _type !== 'space') {
              break;
            }
            str = cache.pop()[1] + str;
          }
          if (str.trim().indexOf('!') === 0) {
            node.important = true;
            node.raws.important = str;
            tokens = cache;
          }
        }

        if (token[0] !== 'space' && token[0] !== 'comment') {
          break;
        }
      }

      this.raw(node, 'value', tokens);

      if (node.value.indexOf(':') !== -1) {
        this.checkMissedSemicolon(tokens);
      }

      this.current = node;
    }
  };

  ScssParser.prototype.comment = function comment(token) {
    if (token[6] === 'inline') {
      var node = new Comment();
      this.init(node, token[2], token[3]);
      node.raws.inline = true;
      node.source.end = { line: token[4], column: token[5] };

      var text = token[1].slice(2);
      if (/^\s*$/.test(text)) {
        node.text = '';
        node.raws.left = text;
        node.raws.right = '';
      } else {
        var match = text.match(/^(\s*)([^]*[^\s])(\s*)$/);
        var fixed = match[2].replace(/(\*\/|\/\*)/g, '*//*');
        node.text = fixed;
        node.raws.left = match[1];
        node.raws.right = match[3];
        node.raws.text = match[2];
      }
    } else {
      _Parser.prototype.comment.call(this, token);
    }
  };

  ScssParser.prototype.raw = function raw(node, prop, tokens) {
    _Parser.prototype.raw.call(this, node, prop, tokens);
    if (node.raws[prop]) {
      var scss = node.raws[prop].raw;
      node.raws[prop].raw = tokens.reduce(function (all, i) {
        if (i[0] === 'comment' && i[6] === 'inline') {
          var text = i[1].slice(2).replace(/(\*\/|\/\*)/g, '*//*');
          return all + '/*' + text + '*/';
        } else {
          return all + i[1];
        }
      }, '');
      if (scss !== node.raws[prop].raw) {
        node.raws[prop].scss = scss;
      }
    }
  };

  return ScssParser;
}(Parser);

module.exports = ScssParser;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjc3MtcGFyc2VyLmVzNiJdLCJuYW1lcyI6WyJDb21tZW50IiwicmVxdWlyZSIsIlBhcnNlciIsIk5lc3RlZERlY2xhcmF0aW9uIiwic2Nzc1Rva2VuaXplciIsIlNjc3NQYXJzZXIiLCJjcmVhdGVUb2tlbml6ZXIiLCJ0b2tlbml6ZXIiLCJpbnB1dCIsInJ1bGUiLCJ0b2tlbnMiLCJ3aXRoQ29sb24iLCJicmFja2V0cyIsInZhbHVlIiwiaSIsImluZGV4T2YiLCJ0cmltIiwidGVzdCIsInBvcCIsIm5vZGUiLCJpbml0IiwibGFzdCIsImxlbmd0aCIsInNvdXJjZSIsImVuZCIsImxpbmUiLCJjb2x1bW4iLCJyYXdzIiwiYmVmb3JlIiwic2hpZnQiLCJzdGFydCIsInByb3AiLCJ0eXBlIiwiYmV0d2VlbiIsInRva2VuIiwic2xpY2UiLCJzcGFjZXNBbmRDb21tZW50c0Zyb21TdGFydCIsInByZWNoZWNrTWlzc2VkU2VtaWNvbG9uIiwiaW1wb3J0YW50Iiwic3RyaW5nIiwic3RyaW5nRnJvbSIsInNwYWNlc0Zyb21FbmQiLCJjYWNoZSIsInN0ciIsImoiLCJyYXciLCJjaGVja01pc3NlZFNlbWljb2xvbiIsImN1cnJlbnQiLCJjb21tZW50IiwiaW5saW5lIiwidGV4dCIsImxlZnQiLCJyaWdodCIsIm1hdGNoIiwiZml4ZWQiLCJyZXBsYWNlIiwic2NzcyIsInJlZHVjZSIsImFsbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBTUEsVUFBVUMsUUFBUSxxQkFBUixDQUFoQjtBQUNBLElBQU1DLFNBQVNELFFBQVEsb0JBQVIsQ0FBZjs7QUFFQSxJQUFNRSxvQkFBb0JGLFFBQVEsc0JBQVIsQ0FBMUI7QUFDQSxJQUFNRyxnQkFBZ0JILFFBQVEsaUJBQVIsQ0FBdEI7O0lBRU1JLFU7Ozs7Ozs7Ozt1QkFDSkMsZSw4QkFBbUI7QUFDakIsU0FBS0MsU0FBTCxHQUFpQkgsY0FBYyxLQUFLSSxLQUFuQixDQUFqQjtBQUNELEc7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Q0FBVUksSUFBVixFQUFnQmMsR0FBN0I7QUFDQTFCLFdBQUtRLElBQUwsQ0FBVUksSUFBVixFQUFnQmMsR0FBaEIsR0FBc0JuQyxPQUFPK0MsTUFBUCxDQUFjLFVBQUNDLEdBQUQsRUFBTTVDLENBQU4sRUFBWTtBQUM5QyxZQUFJQSxFQUFFLENBQUYsTUFBUyxTQUFULElBQXNCQSxFQUFFLENBQUYsTUFBUyxRQUFuQyxFQUE2QztBQUMzQyxjQUFNb0MsT0FBT3BDLEVBQUUsQ0FBRixFQUFLcUIsS0FBTCxDQUFXLENBQVgsRUFBY29CLE9BQWQsQ0FBc0IsY0FBdEIsRUFBc0MsTUFBdEMsQ0FBYjtBQUNBLGlCQUFPRyxNQUFNLElBQU4sR0FBYVIsSUFBYixHQUFvQixJQUEzQjtBQUNELFNBSEQsTUFHTztBQUNMLGlCQUFPUSxNQUFNNUMsRUFBRSxDQUFGLENBQWI7QUFDRDtBQUNGLE9BUHFCLEVBT25CLEVBUG1CLENBQXRCO0FBUUEsVUFBSTBDLFNBQVNyQyxLQUFLUSxJQUFMLENBQVVJLElBQVYsRUFBZ0JjLEdBQTdCLEVBQWtDO0FBQ2hDMUIsYUFBS1EsSUFBTCxDQUFVSSxJQUFWLEVBQWdCeUIsSUFBaEIsR0FBdUJBLElBQXZCO0FBQ0Q7QUFDRjtBQUNGLEc7OztFQS9Kc0J0RCxNOztBQWtLekJ5RCxPQUFPQyxPQUFQLEdBQWlCdkQsVUFBakIiLCJmaWxlIjoic2Nzcy1wYXJzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDb21tZW50ID0gcmVxdWlyZSgncG9zdGNzcy9saWIvY29tbWVudCcpXG5jb25zdCBQYXJzZXIgPSByZXF1aXJlKCdwb3N0Y3NzL2xpYi9wYXJzZXInKVxuXG5jb25zdCBOZXN0ZWREZWNsYXJhdGlvbiA9IHJlcXVpcmUoJy4vbmVzdGVkLWRlY2xhcmF0aW9uJylcbmNvbnN0IHNjc3NUb2tlbml6ZXIgPSByZXF1aXJlKCcuL3Njc3MtdG9rZW5pemUnKVxuXG5jbGFzcyBTY3NzUGFyc2VyIGV4dGVuZHMgUGFyc2VyIHtcbiAgY3JlYXRlVG9rZW5pemVyICgpIHtcbiAgICB0aGlzLnRva2VuaXplciA9IHNjc3NUb2tlbml6ZXIodGhpcy5pbnB1dClcbiAgfVxuXG4gIHJ1bGUgKHRva2Vucykge1xuICAgIGxldCB3aXRoQ29sb24gPSBmYWxzZVxuICAgIGxldCBicmFja2V0cyA9IDBcbiAgICBsZXQgdmFsdWUgPSAnJ1xuICAgIGZvciAoY29uc3QgaSBvZiB0b2tlbnMpIHtcbiAgICAgIGlmICh3aXRoQ29sb24pIHtcbiAgICAgICAgaWYgKGlbMF0gIT09ICdjb21tZW50JyAmJiBpWzBdICE9PSAneycpIHtcbiAgICAgICAgICB2YWx1ZSArPSBpWzFdXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaVswXSA9PT0gJ3NwYWNlJyAmJiBpWzFdLmluZGV4T2YoJ1xcbicpICE9PSAtMSkge1xuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIGlmIChpWzBdID09PSAnKCcpIHtcbiAgICAgICAgYnJhY2tldHMgKz0gMVxuICAgICAgfSBlbHNlIGlmIChpWzBdID09PSAnKScpIHtcbiAgICAgICAgYnJhY2tldHMgLT0gMVxuICAgICAgfSBlbHNlIGlmIChicmFja2V0cyA9PT0gMCAmJiBpWzBdID09PSAnOicpIHtcbiAgICAgICAgd2l0aENvbG9uID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghd2l0aENvbG9uIHx8IHZhbHVlLnRyaW0oKSA9PT0gJycgfHwgL15bYS16QS1aLTojXS8udGVzdCh2YWx1ZSkpIHtcbiAgICAgIHN1cGVyLnJ1bGUodG9rZW5zKVxuICAgIH0gZWxzZSB7XG4gICAgICB0b2tlbnMucG9wKClcbiAgICAgIGNvbnN0IG5vZGUgPSBuZXcgTmVzdGVkRGVjbGFyYXRpb24oKVxuICAgICAgdGhpcy5pbml0KG5vZGUpXG5cbiAgICAgIGNvbnN0IGxhc3QgPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdXG4gICAgICBpZiAobGFzdFs0XSkge1xuICAgICAgICBub2RlLnNvdXJjZS5lbmQgPSB7IGxpbmU6IGxhc3RbNF0sIGNvbHVtbjogbGFzdFs1XSB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLnNvdXJjZS5lbmQgPSB7IGxpbmU6IGxhc3RbMl0sIGNvbHVtbjogbGFzdFszXSB9XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICh0b2tlbnNbMF1bMF0gIT09ICd3b3JkJykge1xuICAgICAgICBub2RlLnJhd3MuYmVmb3JlICs9IHRva2Vucy5zaGlmdCgpWzFdXG4gICAgICB9XG4gICAgICBub2RlLnNvdXJjZS5zdGFydCA9IHsgbGluZTogdG9rZW5zWzBdWzJdLCBjb2x1bW46IHRva2Vuc1swXVszXSB9XG5cbiAgICAgIG5vZGUucHJvcCA9ICcnXG4gICAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgICBjb25zdCB0eXBlID0gdG9rZW5zWzBdWzBdXG4gICAgICAgIGlmICh0eXBlID09PSAnOicgfHwgdHlwZSA9PT0gJ3NwYWNlJyB8fCB0eXBlID09PSAnY29tbWVudCcpIHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIG5vZGUucHJvcCArPSB0b2tlbnMuc2hpZnQoKVsxXVxuICAgICAgfVxuXG4gICAgICBub2RlLnJhd3MuYmV0d2VlbiA9ICcnXG5cbiAgICAgIGxldCB0b2tlblxuICAgICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgdG9rZW4gPSB0b2tlbnMuc2hpZnQoKVxuXG4gICAgICAgIGlmICh0b2tlblswXSA9PT0gJzonKSB7XG4gICAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gKz0gdG9rZW5bMV1cbiAgICAgICAgICBicmVha1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vZGUucmF3cy5iZXR3ZWVuICs9IHRva2VuWzFdXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUucHJvcFswXSA9PT0gJ18nIHx8IG5vZGUucHJvcFswXSA9PT0gJyonKSB7XG4gICAgICAgIG5vZGUucmF3cy5iZWZvcmUgKz0gbm9kZS5wcm9wWzBdXG4gICAgICAgIG5vZGUucHJvcCA9IG5vZGUucHJvcC5zbGljZSgxKVxuICAgICAgfVxuICAgICAgbm9kZS5yYXdzLmJldHdlZW4gKz0gdGhpcy5zcGFjZXNBbmRDb21tZW50c0Zyb21TdGFydCh0b2tlbnMpXG4gICAgICB0aGlzLnByZWNoZWNrTWlzc2VkU2VtaWNvbG9uKHRva2VucylcblxuICAgICAgZm9yIChsZXQgaSA9IHRva2Vucy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHRva2VuID0gdG9rZW5zW2ldXG4gICAgICAgIGlmICh0b2tlblsxXSA9PT0gJyFpbXBvcnRhbnQnKSB7XG4gICAgICAgICAgbm9kZS5pbXBvcnRhbnQgPSB0cnVlXG4gICAgICAgICAgbGV0IHN0cmluZyA9IHRoaXMuc3RyaW5nRnJvbSh0b2tlbnMsIGkpXG4gICAgICAgICAgc3RyaW5nID0gdGhpcy5zcGFjZXNGcm9tRW5kKHRva2VucykgKyBzdHJpbmdcbiAgICAgICAgICBpZiAoc3RyaW5nICE9PSAnICFpbXBvcnRhbnQnKSB7XG4gICAgICAgICAgICBub2RlLnJhd3MuaW1wb3J0YW50ID0gc3RyaW5nXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH0gZWxzZSBpZiAodG9rZW5bMV0gPT09ICdpbXBvcnRhbnQnKSB7XG4gICAgICAgICAgY29uc3QgY2FjaGUgPSB0b2tlbnMuc2xpY2UoMClcbiAgICAgICAgICBsZXQgc3RyID0gJydcbiAgICAgICAgICBmb3IgKGxldCBqID0gaTsgaiA+IDA7IGotLSkge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IGNhY2hlW2pdWzBdXG4gICAgICAgICAgICBpZiAoc3RyLnRyaW0oKS5pbmRleE9mKCchJykgPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlICE9PSAnc3BhY2UnXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ciA9IGNhY2hlLnBvcCgpWzFdICsgc3RyXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdHIudHJpbSgpLmluZGV4T2YoJyEnKSA9PT0gMCkge1xuICAgICAgICAgICAgbm9kZS5pbXBvcnRhbnQgPSB0cnVlXG4gICAgICAgICAgICBub2RlLnJhd3MuaW1wb3J0YW50ID0gc3RyXG4gICAgICAgICAgICB0b2tlbnMgPSBjYWNoZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b2tlblswXSAhPT0gJ3NwYWNlJyAmJiB0b2tlblswXSAhPT0gJ2NvbW1lbnQnKSB7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnJhdyhub2RlLCAndmFsdWUnLCB0b2tlbnMpXG5cbiAgICAgIGlmIChub2RlLnZhbHVlLmluZGV4T2YoJzonKSAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5jaGVja01pc3NlZFNlbWljb2xvbih0b2tlbnMpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VycmVudCA9IG5vZGVcbiAgICB9XG4gIH1cblxuICBjb21tZW50ICh0b2tlbikge1xuICAgIGlmICh0b2tlbls2XSA9PT0gJ2lubGluZScpIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBuZXcgQ29tbWVudCgpXG4gICAgICB0aGlzLmluaXQobm9kZSwgdG9rZW5bMl0sIHRva2VuWzNdKVxuICAgICAgbm9kZS5yYXdzLmlubGluZSA9IHRydWVcbiAgICAgIG5vZGUuc291cmNlLmVuZCA9IHsgbGluZTogdG9rZW5bNF0sIGNvbHVtbjogdG9rZW5bNV0gfVxuXG4gICAgICBjb25zdCB0ZXh0ID0gdG9rZW5bMV0uc2xpY2UoMilcbiAgICAgIGlmICgvXlxccyokLy50ZXN0KHRleHQpKSB7XG4gICAgICAgIG5vZGUudGV4dCA9ICcnXG4gICAgICAgIG5vZGUucmF3cy5sZWZ0ID0gdGV4dFxuICAgICAgICBub2RlLnJhd3MucmlnaHQgPSAnJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSB0ZXh0Lm1hdGNoKC9eKFxccyopKFteXSpbXlxcc10pKFxccyopJC8pXG4gICAgICAgIGNvbnN0IGZpeGVkID0gbWF0Y2hbMl0ucmVwbGFjZSgvKFxcKlxcL3xcXC9cXCopL2csICcqLy8qJylcbiAgICAgICAgbm9kZS50ZXh0ID0gZml4ZWRcbiAgICAgICAgbm9kZS5yYXdzLmxlZnQgPSBtYXRjaFsxXVxuICAgICAgICBub2RlLnJhd3MucmlnaHQgPSBtYXRjaFszXVxuICAgICAgICBub2RlLnJhd3MudGV4dCA9IG1hdGNoWzJdXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmNvbW1lbnQodG9rZW4pXG4gICAgfVxuICB9XG5cbiAgcmF3IChub2RlLCBwcm9wLCB0b2tlbnMpIHtcbiAgICBzdXBlci5yYXcobm9kZSwgcHJvcCwgdG9rZW5zKVxuICAgIGlmIChub2RlLnJhd3NbcHJvcF0pIHtcbiAgICAgIGNvbnN0IHNjc3MgPSBub2RlLnJhd3NbcHJvcF0ucmF3XG4gICAgICBub2RlLnJhd3NbcHJvcF0ucmF3ID0gdG9rZW5zLnJlZHVjZSgoYWxsLCBpKSA9PiB7XG4gICAgICAgIGlmIChpWzBdID09PSAnY29tbWVudCcgJiYgaVs2XSA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgICBjb25zdCB0ZXh0ID0gaVsxXS5zbGljZSgyKS5yZXBsYWNlKC8oXFwqXFwvfFxcL1xcKikvZywgJyovLyonKVxuICAgICAgICAgIHJldHVybiBhbGwgKyAnLyonICsgdGV4dCArICcqLydcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYWxsICsgaVsxXVxuICAgICAgICB9XG4gICAgICB9LCAnJylcbiAgICAgIGlmIChzY3NzICE9PSBub2RlLnJhd3NbcHJvcF0ucmF3KSB7XG4gICAgICAgIG5vZGUucmF3c1twcm9wXS5zY3NzID0gc2Nzc1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjc3NQYXJzZXJcbiJdfQ==
