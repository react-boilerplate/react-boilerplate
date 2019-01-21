'use strict';

exports.__esModule = true;

var _tokenize = require('postcss/lib/tokenize');

var _tokenize2 = _interopRequireDefault(_tokenize);

var _comment = require('postcss/lib/comment');

var _comment2 = _interopRequireDefault(_comment);

var _parser = require('postcss/lib/parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SafeParser = function (_Parser) {
    _inherits(SafeParser, _Parser);

    function SafeParser() {
        _classCallCheck(this, SafeParser);

        return _possibleConstructorReturn(this, _Parser.apply(this, arguments));
    }

    SafeParser.prototype.createTokenizer = function createTokenizer() {
        this.tokenizer = (0, _tokenize2.default)(this.input, { ignoreErrors: true });
    };

    SafeParser.prototype.comment = function comment(token) {
        var node = new _comment2.default();
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
}(_parser2.default);

exports.default = SafeParser;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhZmUtcGFyc2VyLmVzNiJdLCJuYW1lcyI6WyJTYWZlUGFyc2VyIiwiY3JlYXRlVG9rZW5pemVyIiwidG9rZW5pemVyIiwiaW5wdXQiLCJpZ25vcmVFcnJvcnMiLCJjb21tZW50IiwidG9rZW4iLCJub2RlIiwiaW5pdCIsInNvdXJjZSIsImVuZCIsImxpbmUiLCJjb2x1bW4iLCJ0ZXh0Iiwic2xpY2UiLCJ0ZXN0IiwicmF3cyIsImxlZnQiLCJyaWdodCIsIm1hdGNoIiwiZGVjbCIsInRva2VucyIsImxlbmd0aCIsInVuY2xvc2VkQnJhY2tldCIsInVua25vd25Xb3JkIiwic3BhY2VzIiwibWFwIiwiaSIsImpvaW4iLCJ1bmV4cGVjdGVkQ2xvc2UiLCJjdXJyZW50IiwiYWZ0ZXIiLCJkb3VibGVDb2xvbiIsInVubmFtZWRBdHJ1bGUiLCJuYW1lIiwicHJlY2hlY2tNaXNzZWRTZW1pY29sb24iLCJjb2xvbiIsInNwbGl0Iiwib3RoZXIiLCJzcGxpY2UiLCJjaGVja01pc3NlZFNlbWljb2xvbiIsImVuZEZpbGUiLCJub2RlcyIsInNlbWljb2xvbiIsInBhcmVudCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7Ozs7Ozs7eUJBRWpCQyxlLDhCQUFrQjtBQUNkLGFBQUtDLFNBQUwsR0FBaUIsd0JBQVUsS0FBS0MsS0FBZixFQUFzQixFQUFFQyxjQUFjLElBQWhCLEVBQXRCLENBQWpCO0FBQ0gsSzs7eUJBRURDLE8sb0JBQVFDLEssRUFBTztBQUNYLFlBQUlDLE9BQU8sdUJBQVg7QUFDQSxhQUFLQyxJQUFMLENBQVVELElBQVYsRUFBZ0JELE1BQU0sQ0FBTixDQUFoQixFQUEwQkEsTUFBTSxDQUFOLENBQTFCO0FBQ0FDLGFBQUtFLE1BQUwsQ0FBWUMsR0FBWixHQUFrQixFQUFFQyxNQUFNTCxNQUFNLENBQU4sQ0FBUixFQUFrQk0sUUFBUU4sTUFBTSxDQUFOLENBQTFCLEVBQWxCOztBQUVBLFlBQUlP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QkFBS2QsT0FBTCxHQUFlLEtBQUtBLE9BQUwsQ0FBYWMsTUFBNUI7QUFDQSxpQkFBS2QsT0FBTCxDQUFhZCxJQUFiLENBQWtCZSxLQUFsQixHQUEwQixFQUExQjtBQUNIO0FBQ0osSzs7Ozs7a0JBOUVnQi9CLFUiLCJmaWxlIjoic2FmZS1wYXJzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdG9rZW5pemVyIGZyb20gJ3Bvc3Rjc3MvbGliL3Rva2VuaXplJztcbmltcG9ydCBDb21tZW50ICAgZnJvbSAncG9zdGNzcy9saWIvY29tbWVudCc7XG5pbXBvcnQgUGFyc2VyICAgIGZyb20gJ3Bvc3Rjc3MvbGliL3BhcnNlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNhZmVQYXJzZXIgZXh0ZW5kcyBQYXJzZXIge1xuXG4gICAgY3JlYXRlVG9rZW5pemVyKCkge1xuICAgICAgICB0aGlzLnRva2VuaXplciA9IHRva2VuaXplcih0aGlzLmlucHV0LCB7IGlnbm9yZUVycm9yczogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBjb21tZW50KHRva2VuKSB7XG4gICAgICAgIGxldCBub2RlID0gbmV3IENvbW1lbnQoKTtcbiAgICAgICAgdGhpcy5pbml0KG5vZGUsIHRva2VuWzJdLCB0b2tlblszXSk7XG4gICAgICAgIG5vZGUuc291cmNlLmVuZCA9IHsgbGluZTogdG9rZW5bNF0sIGNvbHVtbjogdG9rZW5bNV0gfTtcblxuICAgICAgICBsZXQgdGV4dCA9IHRva2VuWzFdLnNsaWNlKDIpO1xuICAgICAgICBpZiAoIHRleHQuc2xpY2UoLTIpID09PSAnKi8nICkgdGV4dCA9IHRleHQuc2xpY2UoMCwgLTIpO1xuXG4gICAgICAgIGlmICggL15cXHMqJC8udGVzdCh0ZXh0KSApIHtcbiAgICAgICAgICAgIG5vZGUudGV4dCAgICAgICA9ICcnO1xuICAgICAgICAgICAgbm9kZS5yYXdzLmxlZnQgID0gdGV4dDtcbiAgICAgICAgICAgIG5vZGUucmF3cy5yaWdodCA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG1hdGNoID0gdGV4dC5tYXRjaCgvXihcXHMqKShbXl0qW15cXHNdKShcXHMqKSQvKTtcbiAgICAgICAgICAgIG5vZGUudGV4dCAgICAgICA9IG1hdGNoWzJdO1xuICAgICAgICAgICAgbm9kZS5yYXdzLmxlZnQgID0gbWF0Y2hbMV07XG4gICAgICAgICAgICBub2RlLnJhd3MucmlnaHQgPSBtYXRjaFszXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlY2wodG9rZW5zKSB7XG4gICAgICAgIGlmICggdG9rZW5zLmxlbmd0aCA+IDEgKSB7XG4gICAgICAgICAgICBzdXBlci5kZWNsKHRva2Vucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmNsb3NlZEJyYWNrZXQoKSB7IH1cblxuICAgIHVua25vd25Xb3JkKHRva2Vucykge1xuICAgICAgICB0aGlzLnNwYWNlcyArPSB0b2tlbnMubWFwKGkgPT4gaVsxXSkuam9pbignJyk7XG4gICAgfVxuXG4gICAgdW5leHBlY3RlZENsb3NlKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnQucmF3cy5hZnRlciArPSAnfSc7XG4gICAgfVxuXG4gICAgZG91YmxlQ29sb24oKSB7IH1cblxuICAgIHVubmFtZWRBdHJ1bGUobm9kZSkge1xuICAgICAgICBub2RlLm5hbWUgPSAnJztcbiAgICB9XG5cbiAgICBwcmVjaGVja01pc3NlZFNlbWljb2xvbih0b2tlbnMpIHtcbiAgICAgICAgbGV0IGNvbG9uID0gdGhpcy5jb2xvbih0b2tlbnMpO1xuICAgICAgICBpZiAoIGNvbG9uID09PSBmYWxzZSApIHJldHVybjtcblxuICAgICAgICBsZXQgc3BsaXQ7XG4gICAgICAgIGZvciAoIHNwbGl0ID0gY29sb24gLSAxOyBzcGxpdCA+PSAwOyBzcGxpdC0tICkge1xuICAgICAgICAgICAgaWYgKCB0b2tlbnNbc3BsaXRdWzBdID09PSAnd29yZCcgKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKCBzcGxpdCAtPSAxOyBzcGxpdCA+PSAwOyBzcGxpdC0tICkge1xuICAgICAgICAgICAgaWYgKCB0b2tlbnNbc3BsaXRdWzBdICE9PSAnc3BhY2UnICkge1xuICAgICAgICAgICAgICAgIHNwbGl0ICs9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG90aGVyID0gdG9rZW5zLnNwbGljZShzcGxpdCwgdG9rZW5zLmxlbmd0aCAtIHNwbGl0KTtcbiAgICAgICAgdGhpcy5kZWNsKG90aGVyKTtcbiAgICB9XG5cbiAgICBjaGVja01pc3NlZFNlbWljb2xvbigpIHsgfVxuXG4gICAgZW5kRmlsZSgpIHtcbiAgICAgICAgaWYgKCB0aGlzLmN1cnJlbnQubm9kZXMgJiYgdGhpcy5jdXJyZW50Lm5vZGVzLmxlbmd0aCApIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5yYXdzLnNlbWljb2xvbiA9IHRoaXMuc2VtaWNvbG9uO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudC5yYXdzLmFmdGVyID0gKHRoaXMuY3VycmVudC5yYXdzLmFmdGVyIHx8ICcnKSArIHRoaXMuc3BhY2VzO1xuXG4gICAgICAgIHdoaWxlICggdGhpcy5jdXJyZW50LnBhcmVudCApIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMuY3VycmVudC5wYXJlbnQ7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQucmF3cy5hZnRlciA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=
