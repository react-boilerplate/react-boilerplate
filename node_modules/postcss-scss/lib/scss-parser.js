'use strict';

exports.__esModule = true;

var _comment = require('postcss/lib/comment');

var _comment2 = _interopRequireDefault(_comment);

var _parser = require('postcss/lib/parser');

var _parser2 = _interopRequireDefault(_parser);

var _nestedDeclaration = require('./nested-declaration');

var _nestedDeclaration2 = _interopRequireDefault(_nestedDeclaration);

var _scssTokenize = require('./scss-tokenize');

var _scssTokenize2 = _interopRequireDefault(_scssTokenize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScssParser = function (_Parser) {
    _inherits(ScssParser, _Parser);

    function ScssParser() {
        _classCallCheck(this, ScssParser);

        return _possibleConstructorReturn(this, _Parser.apply(this, arguments));
    }

    ScssParser.prototype.createTokenizer = function createTokenizer() {
        this.tokenizer = (0, _scssTokenize2.default)(this.input);
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
            var node = new _nestedDeclaration2.default();
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
            var node = new _comment2.default();
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
}(_parser2.default);

exports.default = ScssParser;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjc3MtcGFyc2VyLmVzNiJdLCJuYW1lcyI6WyJTY3NzUGFyc2VyIiwiY3JlYXRlVG9rZW5pemVyIiwidG9rZW5pemVyIiwiaW5wdXQiLCJydWxlIiwidG9rZW5zIiwid2l0aENvbG9uIiwiYnJhY2tldHMiLCJ2YWx1ZSIsImkiLCJpbmRleE9mIiwidHJpbSIsInRlc3QiLCJwb3AiLCJub2RlIiwiaW5pdCIsImxhc3QiLCJsZW5ndGgiLCJzb3VyY2UiLCJlbmQiLCJsaW5lIiwiY29sdW1uIiwicmF3cyIsImJlZm9yZSIsInNoaWZ0Iiwic3RhcnQiLCJwcm9wIiwidHlwZSIsImJldHdlZW4iLCJ0b2tlbiIsInNsaWNlIiwic3BhY2VzQW5kQ29tbWVudHNGcm9tU3RhcnQiLCJwcmVjaGVja01pc3NlZFNlbWljb2xvbiIsImltcG9ydGFudCIsInN0cmluZyIsInN0cmluZ0Zyb20iLCJzcGFjZXNGcm9tRW5kIiwiY2FjaGUiLCJzdHIiLCJqIiwicmF3IiwiY2hlY2tNaXNzZWRTZW1pY29sb24iLCJjdXJyZW50IiwiY29tbWVudCIsImlubGluZSIsInRleHQiLCJsZWZ0IiwicmlnaHQiLCJtYXRjaCIsImZpeGVkIiwicmVwbGFjZSIsInNjc3MiLCJyZWR1Y2UiLCJhbGwiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7Ozs7Ozs7eUJBRWpCQyxlLDhCQUFrQjtBQUNkLGFBQUtDLFNBQUwsR0FBaUIsNEJBQWMsS0FBS0MsS0FBbkIsQ0FBakI7QUFDSCxLOzt5QkFFREMsSSxpQkFBS0MsTSxFQUFRO0FBQ1QsWUFBSUMsWUFBWSxLQUFoQjtBQUNBLFlBQUlDLFdBQVksQ0FBaEI7QUFDQSxZQUFJQyxRQUFZLEVBQWhCO0FBQ0EsNkJBQWVILE1BQWYsa0hBQXdCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxnQkFBZEksQ0FBYzs7QUFDcEIsZ0JB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LFNBQVQsSUFBc0JBLEVBQUUsQ0FBRixNQUFTLFFBQXBDLEVBQStDO0FBQzNDLHdCQUFJb0MsT0FBT3BDLEVBQUUsQ0FBRixFQUFLcUIsS0FBTCxDQUFXLENBQVgsRUFBY29CLE9BQWQsQ0FBc0IsY0FBdEIsRUFBc0MsTUFBdEMsQ0FBWDtBQUNBLDJCQUFPRyxNQUFNLElBQU4sR0FBYVIsSUFBYixHQUFvQixJQUEzQjtBQUNILGlCQUhELE1BR087QUFDSCwyQkFBT1EsTUFBTTVDLEVBQUUsQ0FBRixDQUFiO0FBQ0g7QUFDSixhQVBxQixFQU9uQixFQVBtQixDQUF0QjtBQVFBLGdCQUFLMEMsU0FBU3JDLEtBQUtRLElBQUwsQ0FBVUksSUFBVixFQUFnQmMsR0FBOUIsRUFBb0M7QUFDaEMxQixxQkFBS1EsSUFBTCxDQUFVSSxJQUFWLEVBQWdCeUIsSUFBaEIsR0FBdUJBLElBQXZCO0FBQ0g7QUFDSjtBQUNKLEs7Ozs7O2tCQWxLZ0JuRCxVIiwiZmlsZSI6InNjc3MtcGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1lbnQgZnJvbSAncG9zdGNzcy9saWIvY29tbWVudCc7XG5pbXBvcnQgUGFyc2VyICBmcm9tICdwb3N0Y3NzL2xpYi9wYXJzZXInO1xuXG5pbXBvcnQgTmVzdGVkRGVjbGFyYXRpb24gZnJvbSAnLi9uZXN0ZWQtZGVjbGFyYXRpb24nO1xuaW1wb3J0IHNjc3NUb2tlbml6ZXIgICAgIGZyb20gJy4vc2Nzcy10b2tlbml6ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjc3NQYXJzZXIgZXh0ZW5kcyBQYXJzZXIge1xuXG4gICAgY3JlYXRlVG9rZW5pemVyKCkge1xuICAgICAgICB0aGlzLnRva2VuaXplciA9IHNjc3NUb2tlbml6ZXIodGhpcy5pbnB1dCk7XG4gICAgfVxuXG4gICAgcnVsZSh0b2tlbnMpIHtcbiAgICAgICAgbGV0IHdpdGhDb2xvbiA9IGZhbHNlO1xuICAgICAgICBsZXQgYnJhY2tldHMgID0gMDtcbiAgICAgICAgbGV0IHZhbHVlICAgICA9ICcnO1xuICAgICAgICBmb3IgKCBsZXQgaSBvZiB0b2tlbnMgKSB7XG4gICAgICAgICAgICBpZiAoIHdpdGhDb2xvbiApIHtcbiAgICAgICAgICAgICAgICBpZiAoIGlbMF0gIT09ICdjb21tZW50JyAmJiBpWzBdICE9PSAneycgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IGlbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICggaVswXSA9PT0gJ3NwYWNlJyAmJiBpWzFdLmluZGV4T2YoJ1xcbicpICE9PSAtMSApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGlbMF0gPT09ICcoJyApIHtcbiAgICAgICAgICAgICAgICBicmFja2V0cyArPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggaVswXSA9PT0gJyknICkge1xuICAgICAgICAgICAgICAgIGJyYWNrZXRzIC09IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBicmFja2V0cyA9PT0gMCAmJiBpWzBdID09PSAnOicgKSB7XG4gICAgICAgICAgICAgICAgd2l0aENvbG9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggIXdpdGhDb2xvbiB8fCB2YWx1ZS50cmltKCkgPT09ICcnIHx8IC9eW2EtekEtWi06I10vLnRlc3QodmFsdWUpICkge1xuICAgICAgICAgICAgc3VwZXIucnVsZSh0b2tlbnMpO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0b2tlbnMucG9wKCk7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5ldyBOZXN0ZWREZWNsYXJhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5pbml0KG5vZGUpO1xuXG4gICAgICAgICAgICBsZXQgbGFzdCA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAobGFzdFs0XSkge1xuICAgICAgICAgICAgICAgIG5vZGUuc291cmNlLmVuZCA9IHsgbGluZTogbGFzdFs0XSwgY29sdW1uOiBsYXN0WzVdIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUuc291cmNlLmVuZCA9IHsgbGluZTogbGFzdFsyXSwgY29sdW1uOiBsYXN0WzNdIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlICh0b2tlbnNbMF1bMF0gIT09ICd3b3JkJykge1xuICAgICAgICAgICAgICAgIG5vZGUucmF3cy5iZWZvcmUgKz0gdG9rZW5zLnNoaWZ0KClbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLnNvdXJjZS5zdGFydCA9IHsgbGluZTogdG9rZW5zWzBdWzJdLCBjb2x1bW46IHRva2Vuc1swXVszXSB9O1xuXG4gICAgICAgICAgICBub2RlLnByb3AgPSAnJztcbiAgICAgICAgICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSB0b2tlbnNbMF1bMF07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICc6JyB8fCB0eXBlID09PSAnc3BhY2UnIHx8IHR5cGUgPT09ICdjb21tZW50Jykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wICs9IHRva2Vucy5zaGlmdCgpWzFdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiA9ICcnO1xuXG4gICAgICAgICAgICBsZXQgdG9rZW47XG4gICAgICAgICAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gdG9rZW5zLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodG9rZW5bMF0gPT09ICc6Jykge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiArPSB0b2tlblsxXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gKz0gdG9rZW5bMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm9kZS5wcm9wWzBdID09PSAnXycgfHwgbm9kZS5wcm9wWzBdID09PSAnKicpIHtcbiAgICAgICAgICAgICAgICBub2RlLnJhd3MuYmVmb3JlICs9IG5vZGUucHJvcFswXTtcbiAgICAgICAgICAgICAgICBub2RlLnByb3AgPSBub2RlLnByb3Auc2xpY2UoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiArPSB0aGlzLnNwYWNlc0FuZENvbW1lbnRzRnJvbVN0YXJ0KHRva2Vucyk7XG4gICAgICAgICAgICB0aGlzLnByZWNoZWNrTWlzc2VkU2VtaWNvbG9uKHRva2Vucyk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0b2tlbnMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICAgICAgICAgIGlmICh0b2tlblsxXSA9PT0gJyFpbXBvcnRhbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuaW1wb3J0YW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0cmluZyA9IHRoaXMuc3RyaW5nRnJvbSh0b2tlbnMsIGkpO1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgPSB0aGlzLnNwYWNlc0Zyb21FbmQodG9rZW5zKSArIHN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmluZyAhPT0gJyAhaW1wb3J0YW50Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yYXdzLmltcG9ydGFudCA9IHN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW5bMV0gPT09ICdpbXBvcnRhbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjYWNoZSA9IHRva2Vucy5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0ciAgID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBpOyBqID4gMDsgai0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHlwZSA9IGNhY2hlW2pdWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ci50cmltKCkuaW5kZXhPZignIScpID09PSAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSAhPT0gJ3NwYWNlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBjYWNoZS5wb3AoKVsxXSArIHN0cjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyLnRyaW0oKS5pbmRleE9mKCchJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuaW1wb3J0YW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucmF3cy5pbXBvcnRhbnQgPSBzdHI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMgPSBjYWNoZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0b2tlblswXSAhPT0gJ3NwYWNlJyAmJiB0b2tlblswXSAhPT0gJ2NvbW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yYXcobm9kZSwgJ3ZhbHVlJywgdG9rZW5zKTtcblxuICAgICAgICAgICAgaWYgKG5vZGUudmFsdWUuaW5kZXhPZignOicpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tNaXNzZWRTZW1pY29sb24odG9rZW5zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gbm9kZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbW1lbnQodG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuWzZdID09PSAnaW5saW5lJykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgQ29tbWVudCgpO1xuICAgICAgICAgICAgdGhpcy5pbml0KG5vZGUsIHRva2VuWzJdLCB0b2tlblszXSk7XG4gICAgICAgICAgICBub2RlLnJhd3MuaW5saW5lID0gdHJ1ZTtcbiAgICAgICAgICAgIG5vZGUuc291cmNlLmVuZCAgPSB7IGxpbmU6IHRva2VuWzRdLCBjb2x1bW46IHRva2VuWzVdIH07XG5cbiAgICAgICAgICAgIGxldCB0ZXh0ID0gdG9rZW5bMV0uc2xpY2UoMik7XG4gICAgICAgICAgICBpZiAoIC9eXFxzKiQvLnRlc3QodGV4dCkgKSB7XG4gICAgICAgICAgICAgICAgbm9kZS50ZXh0ICAgICAgID0gJyc7XG4gICAgICAgICAgICAgICAgbm9kZS5yYXdzLmxlZnQgID0gdGV4dDtcbiAgICAgICAgICAgICAgICBub2RlLnJhd3MucmlnaHQgPSAnJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoID0gdGV4dC5tYXRjaCgvXihcXHMqKShbXl0qW15cXHNdKShcXHMqKSQvKTtcbiAgICAgICAgICAgICAgICBsZXQgZml4ZWQgPSBtYXRjaFsyXS5yZXBsYWNlKC8oXFwqXFwvfFxcL1xcKikvZywgJyovLyonKTtcbiAgICAgICAgICAgICAgICBub2RlLnRleHQgICAgICAgPSBmaXhlZDtcbiAgICAgICAgICAgICAgICBub2RlLnJhd3MubGVmdCAgPSBtYXRjaFsxXTtcbiAgICAgICAgICAgICAgICBub2RlLnJhd3MucmlnaHQgPSBtYXRjaFszXTtcbiAgICAgICAgICAgICAgICBub2RlLnJhd3MudGV4dCAgPSBtYXRjaFsyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1cGVyLmNvbW1lbnQodG9rZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmF3KG5vZGUsIHByb3AsIHRva2Vucykge1xuICAgICAgICBzdXBlci5yYXcobm9kZSwgcHJvcCwgdG9rZW5zKTtcbiAgICAgICAgaWYgKCBub2RlLnJhd3NbcHJvcF0gKSB7XG4gICAgICAgICAgICBsZXQgc2NzcyA9IG5vZGUucmF3c1twcm9wXS5yYXc7XG4gICAgICAgICAgICBub2RlLnJhd3NbcHJvcF0ucmF3ID0gdG9rZW5zLnJlZHVjZSggKGFsbCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICggaVswXSA9PT0gJ2NvbW1lbnQnICYmIGlbNl0gPT09ICdpbmxpbmUnICkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dCA9IGlbMV0uc2xpY2UoMikucmVwbGFjZSgvKFxcKlxcL3xcXC9cXCopL2csICcqLy8qJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGwgKyAnLyonICsgdGV4dCArICcqLyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsbCArIGlbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgJycpO1xuICAgICAgICAgICAgaWYgKCBzY3NzICE9PSBub2RlLnJhd3NbcHJvcF0ucmF3ICkge1xuICAgICAgICAgICAgICAgIG5vZGUucmF3c1twcm9wXS5zY3NzID0gc2NzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19
