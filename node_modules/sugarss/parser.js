'use strict';

exports.__esModule = true;

var _declaration = require('postcss/lib/declaration');

var _declaration2 = _interopRequireDefault(_declaration);

var _comment = require('postcss/lib/comment');

var _comment2 = _interopRequireDefault(_comment);

var _atRule = require('postcss/lib/at-rule');

var _atRule2 = _interopRequireDefault(_atRule);

var _rule = require('postcss/lib/rule');

var _rule2 = _interopRequireDefault(_rule);

var _root = require('postcss/lib/root');

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
    function Parser(input) {
        _classCallCheck(this, Parser);

        this.input = input;

        this.pos = 0;
        this.root = new _root2.default();
        this.current = this.root;
        this.spaces = '';

        this.extraIndent = false;
        this.prevIndent = undefined;
        this.step = undefined;

        this.root.source = { input: input, start: { line: 1, column: 1 } };
    }

    Parser.prototype.loop = function loop() {
        var part = void 0;
        while (this.pos < this.parts.length) {
            part = this.parts[this.pos];

            if (part.comment) {
                this.comment(part);
            } else if (part.atrule) {
                this.atrule(part);
            } else if (part.colon) {
                var next = this.nextNonComment(this.pos);

                if (next.end || next.atrule) {
                    this.decl(part);
                } else {
                    var moreIndent = next.indent.length > part.indent.length;
                    if (!moreIndent) {
                        this.decl(part);
                    } else if (moreIndent && next.colon) {
                        this.rule(part);
                    } else if (moreIndent && !next.colon) {
                        this.decl(part);
                    }
                }
            } else if (part.end) {
                this.root.raws.after = part.before;
            } else {
                this.rule(part);
            }

            this.pos += 1;
        }

        for (var i = this.tokens.length - 1; i >= 0; i--) {
            if (this.tokens[i].length > 3) {
                var last = this.tokens[i];
                this.root.source.end = {
                    line: last[4] || last[2],
                    column: last[5] || last[3]
                };
                break;
            }
        }
    };

    Parser.prototype.comment = function comment(part) {
        var token = part.tokens[0];
        var node = new _comment2.default();
        this.init(node, part);
        node.source.end = { line: token[4], column: token[5] };
        this.commentText(node, token);
    };

    Parser.prototype.atrule = function atrule(part) {
        var atword = part.tokens[0];
        var params = part.tokens.slice(1);

        var node = new _atRule2.default();
        node.name = atword[1].slice(1);
        this.init(node, part);

        if (node.name === '') this.unnamedAtrule(atword);

        while (!part.end && part.lastComma) {
            this.pos += 1;
            part = this.parts[this.pos];
            params.push(['space', part.before + part.indent]);
            params = params.concat(part.tokens);
        }

        node.raws.afterName = this.firstSpaces(params);
        this.keepTrailingSpace(node, params);
        this.checkSemicolon(params);
        this.checkCurly(params);
        this.raw(node, 'params', params, atword);
    };

    Parser.prototype.decl = function decl(part) {
        var node = new _declaration2.default();
        this.init(node, part);

        var between = '';
        var colon = 0;
        var value = [];
        var prop = '';
        for (var i = 0; i < part.tokens.length; i++) {
            var token = part.tokens[i];
            if (token[0] === ':') {
                between += token[1];
                colon = token;
                value = part.tokens.slice(i + 1);
                break;
            } else if (token[0] === 'comment' || token[0] === 'space') {
                between += token[1];
            } else if (between !== '') {
                this.badProp(token);
            } else {
                prop += token[1];
            }
        }

        if (prop === '') this.unnamedDecl(part.tokens[0]);
        node.prop = prop;

        var next = this.parts[this.pos + 1];

        while (!next.end && !next.atrule && !next.colon && next.indent.length > part.indent.length) {
            value.push(['space', next.before + next.indent]);
            value = value.concat(next.tokens);
            this.pos += 1;
            next = this.parts[this.pos + 1];
        }

        var last = value[value.length - 1];
        if (last && last[0] === 'comment') {
            value.pop();
            var comment = new _comment2.default();
            this.current.push(comment);
            comment.source = {
                input: this.input,
                start: { line: last[2], column: last[3] },
                end: { line: last[4], column: last[5] }
            };
            var prev = value[value.length - 1];
            if (prev && prev[0] === 'space') {
                value.pop();
                comment.raws.before = prev[1];
            }
            this.commentText(comment, last);
        }

        for (var _i = value.length - 1; _i > 0; _i--) {
            var t = value[_i][0];
            if (t === 'word' && value[_i][1] === '!important') {
                node.important = true;
                if (_i > 0 && value[_i - 1][0] === 'space') {
                    node.raws.important = value[_i - 1][1] + '!important';
                    value.splice(_i - 1, 2);
                } else {
                    node.raws.important = '!important';
                    value.splice(_i, 1);
                }
                break;
            } else if (t !== 'space' && t !== 'newline' && t !== 'comment') {
                break;
            }
        }

        node.raws.between = between + this.firstSpaces(value);
        this.checkSemicolon(value);
        this.raw(node, 'value', value, colon);
    };

    Parser.prototype.rule = function rule(part) {
        var node = new _rule2.default();
        this.init(node, part);

        var selector = part.tokens;
        var next = this.parts[this.pos + 1];

        while (!next.end && next.indent.length === part.indent.length) {
            selector.push(['space', next.before + next.indent]);
            selector = selector.concat(next.tokens);
            this.pos += 1;
            next = this.parts[this.pos + 1];
        }

        this.keepTrailingSpace(node, selector);
        this.checkCurly(selector);
        this.raw(node, 'selector', selector);
    };

    /* Helpers */

    Parser.prototype.indent = function indent(part) {
        var indent = part.indent.length;
        var isPrev = typeof this.prevIndent !== 'undefined';

        if (!isPrev && indent) this.indentedFirstLine(part);

        if (!this.step && indent) {
            this.step = indent;
            this.root.raws.indent = part.indent;
        }

        if (isPrev && this.prevIndent !== indent) {
            var diff = indent - this.prevIndent;
            if (diff > 0) {
                if (diff !== this.step) {
                    this.wrongIndent(this.prevIndent + this.step, indent, part);
                } else if (this.current.last.push) {
                    this.current = this.current.last;
                } else {
                    this.extraIndent = '';
                    for (var i = 0; i < diff; i++) {
                        this.extraIndent += ' ';
                    }
                }
            } else if (diff % this.step !== 0) {
                var m = indent + diff % this.step;
                this.wrongIndent(m + ' or ' + (m + this.step), indent, part);
            } else {
                for (var _i2 = 0; _i2 < -diff / this.step; _i2++) {
                    this.current = this.current.parent;
                }
            }
        }

        this.prevIndent = indent;
    };

    Parser.prototype.init = function init(node, part) {
        this.indent(part);

        if (!this.current.nodes) this.current.nodes = [];
        this.current.push(node);

        node.raws.before = part.before + part.indent;
        if (this.extraIndent) {
            node.raws.extraIndent = this.extraIndent;
            this.extraIndent = false;
        }
        node.source = {
            start: { line: part.tokens[0][2], column: part.tokens[0][3] },
            input: this.input
        };
    };

    Parser.prototype.checkCurly = function checkCurly(tokens) {
        for (var _iterator = tokens, _isArray = Array.isArray(_iterator), _i3 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i3 >= _iterator.length) break;
                _ref = _iterator[_i3++];
            } else {
                _i3 = _iterator.next();
                if (_i3.done) break;
                _ref = _i3.value;
            }

            var token = _ref;

            if (token[0] === '{') {
                this.error('Unnecessary curly bracket', token[2], token[3]);
            }
        }
    };

    Parser.prototype.checkSemicolon = function checkSemicolon(tokens) {
        for (var _iterator2 = tokens, _isArray2 = Array.isArray(_iterator2), _i4 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i4 >= _iterator2.length) break;
                _ref2 = _iterator2[_i4++];
            } else {
                _i4 = _iterator2.next();
                if (_i4.done) break;
                _ref2 = _i4.value;
            }

            var token = _ref2;

            if (token[0] === ';') {
                this.error('Unnecessary semicolon', token[2], token[3]);
            }
        }
    };

    Parser.prototype.keepTrailingSpace = function keepTrailingSpace(node, tokens) {
        var lastSpace = tokens[tokens.length - 1];
        if (lastSpace && lastSpace[0] === 'space') {
            tokens.pop();
            node.raws.sssBetween = lastSpace[1];
        }
    };

    Parser.prototype.firstSpaces = function firstSpaces(tokens) {
        var result = '';
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i][0] === 'space' || tokens[i][0] === 'newline') {
                result += tokens.shift()[1];
                i -= 1;
            } else {
                break;
            }
        }
        return result;
    };

    Parser.prototype.raw = function raw(node, prop, tokens, altLast) {
        var token = void 0,
            type = void 0;
        var length = tokens.length;
        var value = '';
        var clean = true;
        for (var i = 0; i < length; i += 1) {
            token = tokens[i];
            type = token[0];
            if (type === 'comment' || type === 'space' && i === length - 1) {
                clean = false;
            } else {
                value += token[1];
            }
        }
        if (!clean) {
            var sss = tokens.reduce(function (all, i) {
                return all + i[1];
            }, '');
            var raw = tokens.reduce(function (all, i) {
                if (i[0] === 'comment' && i[6] === 'inline') {
                    return all + '/* ' + i[1].slice(2).trim() + ' */';
                } else {
                    return all + i[1];
                }
            }, '');
            node.raws[prop] = { value: value, raw: raw };
            if (sss !== raw) node.raws[prop].sss = sss;
        }
        node[prop] = value;

        var last = void 0;
        for (var _i5 = tokens.length - 1; _i5 >= 0; _i5--) {
            if (tokens[_i5].length > 2) {
                last = tokens[_i5];
                break;
            }
        }
        if (!last) last = altLast;

        node.source.end = {
            line: last[4] || last[2],
            column: last[5] || last[3]
        };
    };

    Parser.prototype.nextNonComment = function nextNonComment(pos) {
        var next = pos;
        var part = void 0;
        while (next < this.parts.length) {
            next += 1;
            part = this.parts[next];
            if (part.end || !part.comment) break;
        }
        return part;
    };

    Parser.prototype.commentText = function commentText(node, token) {
        var text = token[1];
        if (token[6] === 'inline') {
            node.raws.inline = true;
            text = text.slice(2);
        } else {
            text = text.slice(2, -2);
        }

        var match = text.match(/^(\s*)([^]*[^\s])(\s*)\n?$/);
        if (match) {
            node.text = match[2];
            node.raws.left = match[1];
            node.raws.inlineRight = match[3];
        } else {
            node.text = '';
            node.raws.left = '';
            node.raws.inlineRight = '';
        }
    };

    // Errors

    Parser.prototype.error = function error(msg, line, column) {
        throw this.input.error(msg, line, column);
    };

    Parser.prototype.unnamedAtrule = function unnamedAtrule(token) {
        this.error('At-rule without name', token[2], token[3]);
    };

    Parser.prototype.unnamedDecl = function unnamedDecl(token) {
        this.error('Declaration without name', token[2], token[3]);
    };

    Parser.prototype.indentedFirstLine = function indentedFirstLine(part) {
        this.error('First line should not have indent', part.number, 1);
    };

    Parser.prototype.wrongIndent = function wrongIndent(expected, real, part) {
        var msg = 'Expected ' + expected + ' indent, but get ' + real;
        this.error(msg, part.number, 1);
    };

    Parser.prototype.badProp = function badProp(token) {
        this.error('Unexpected separator in property', token[2], token[3]);
    };

    return Parser;
}();

exports.default = Parser;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlci5lczYiXSwibmFtZXMiOlsiUGFyc2VyIiwiaW5wdXQiLCJwb3MiLCJyb290IiwiY3VycmVudCIsInNwYWNlcyIsImV4dHJhSW5kZW50IiwicHJldkluZGVudCIsInVuZGVmaW5lZCIsInN0ZXAiLCJzb3VyY2UiLCJzdGFydCIsImxpbmUiLCJjb2x1bW4iLCJsb29wIiwicGFydCIsInBhcnRzIiwibGVuZ3RoIiwiY29tbWVudCIsImF0cnVsZSIsImNvbG9uIiwibmV4dCIsIm5leHROb25Db21tZW50IiwiZW5kIiwiZGVjbCIsIm1vcmVJbmRlbnQiLCJpbmRlbnQiLCJydWxlIiwicmF3cyIsImFmdGVyIiwiYmVmb3JlIiwiaSIsInRva2VucyIsImxhc3QiLCJ0b2tlbiIsIm5vZGUiLCJpbml0IiwiY29tbWVudFRleHQiLCJhdHdvcmQiLCJwYXJhbXMiLCJzbGljZSIsIm5hbWUiLCJ1bm5hbWVkQXRydWxlIiwibGFzdENvbW1hIiwicHVzaCIsImNvbmNhdCIsImFmdGVyTmFtZSIsImZpcnN0U3BhY2VzIiwia2VlcFRyYWlsaW5nU3BhY2UiLCJjaGVja1NlbWljb2xvbiIsImNoZWNrQ3VybHkiLCJyYXciLCJiZXR3ZWVuIiwidmFsdWUiLCJwcm9wIiwiYmFkUHJvcCIsInVubmFtZWREZWNsIiwicG9wIiwicHJldiIsInQiLCJpbXBvcnRhbnQiLCJzcGxpY2UiLCJzZWxlY3RvciIsImlzUHJldiIsImluZGVudGVkRmlyc3RMaW5lIiwiZGlmZiIsIndyb25nSW5kZW50IiwibSIsInBhcmVudCIsIm5vZGVzIiwiZXJyb3IiLCJsYXN0U3BhY2UiLCJzc3NCZXR3ZWVuIiwicmVzdWx0Iiwic2hpZnQiLCJhbHRMYXN0IiwidHlwZSIsImNsZWFuIiwic3NzIiwicmVkdWNlIiwiYWxsIiwidHJpbSIsInRleHQiLCJpbmxpbmUiLCJtYXRjaCIsImxlZnQiLCJpbmxpbmVSaWdodCIsIm1zZyIsIm51bWJlciIsImV4cGVjdGVkIiwicmVhbCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCQSxNO0FBRWpCLG9CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQ2YsYUFBS0EsS0FBTCxHQUFhQSxLQUFiOztBQUVBLGFBQUtDLEdBQUwsR0FBZSxDQUFmO0FBQ0EsYUFBS0MsSUFBTCxHQUFlLG9CQUFmO0FBQ0EsYUFBS0MsT0FBTCxHQUFlLEtBQUtELElBQXBCO0FBQ0EsYUFBS0UsTUFBTCxHQUFlLEVBQWY7O0FBRUEsYUFBS0MsV0FBTCxHQUFtQixLQUFuQjtBQUNBLGFBQUtDLFVBQUwsR0FBbUJDLFNBQW5CO0FBQ0EsYUFBS0MsSUFBTCxHQUFtQkQsU0FBbkI7O0FBRUEsYUFBS0wsSUFBTCxDQUFVTyxNQUFWLEdBQW1CLEVBQUVULFlBQUYsRUFBU1UsT0FBTyxFQUFFQyxNQUFNLENBQVIsRUFBV0MsUUFBUSxDQUFuQixFQUFoQixFQUFuQjtBQUNIOztxQkFFREMsSSxtQkFBTztBQUNILFlBQUlDLGFBQUo7QUFDQSxlQUFRLEtBQUtiLEdBQUwsR0FBVyxLQUFLYyxLQUFMLENBQVdDLE1BQTlCLEVBQXVDO0FBQ25DRixtQkFBTyxLQUFLQyxLQUFMLENBQVcsS0FBS2QsR0FBaEIsQ0FBUDs7QUFFQSxnQkFBS2EsS0FBS0csT0FBVixFQUFvQjtBQUNoQixxQkFBS0EsT0FBTCxDQUFhSCxJQUFiO0FBQ0gsYUFGRCxNQUVPLElBQUtBLEtBQUtJLE1BQVYsRUFBbUI7QUFDdEIscUJBQUtBLE1BQUwsQ0FBWUosSUFBWjtBQUNILGFBRk0sTUFFQSxJQUFLQSxLQUFLSyxLQUFWLEVBQWtCO0FBQ3JCLG9CQUFJQyxPQUFPLEtBQUtDLGNBQUwsQ0FBb0IsS0FBS3BCLEdBQXpCLENBQVg7O0FBRUEsb0JBQUttQixLQUFLRSxHQUFMLElBQVlGLEtBQUtGLE1BQXRCLEVBQStCO0FBQzNCLHlCQUFLSyxJQUFMLENBQVVULElBQVY7QUFDSCxpQkFGRCxNQUVPO0FBQ0gsd0JBQUlVLGFBQWFKLEtBQUtLLE1BQUwsQ0FBWVQsTUFBWixHQUFxQkYsS0FBS1csTUFBTCxDQUFZVCxNQUFsRDtBQUNBLHdCQUFLLENBQUNRLFVBQU4sRUFBbUI7QUFDZiw2QkFBS0QsSUFBTCxDQUFVVCxJQUFWO0FBQ0gscUJBRkQsTUFFTyxJQUFLVSxjQUFjSixLQUFLRCxLQUF4QixFQUFnQztBQUNuQyw2QkFBS08sSUFBTCxDQUFVWixJQUFWO0FBQ0gscUJBRk0sTUFFQSxJQUFLVSxjQUFjLENBQUNKLEtBQUtELEtBQXpCLEVBQWlDO0FBQ3BDLDZCQUFLSSxJQUFMLENBQVVULElBQVY7QUFDSDtBQUNKO0FBQ0osYUFmTSxNQWVBLElBQUtBLEtBQUtRLEdBQVYsRUFBZ0I7QUFDbkIscUJBQUtwQixJQUFMLENBQVV5QixJQUFWLENBQWVDLEtBQWYsR0FBdUJkLEtBQUtlLE1BQTVCO0FBQ0gsYUFGTSxNQUVBO0FBQ0gscUJBQUtILElBQUwsQ0FBVVosSUFBVjtBQUNIOztBQUVELGlCQUFLYixHQUFMLElBQVksQ0FBWjtBQUNIOztBQUVELGFBQU0sSUFBSTZCLElBQUksS0FBS0MsTUFBTCxDQUFZZixNQUFaLEdBQXFCLENBQW5DLEVBQXNDYyxLQUFLLENBQTNDLEVBQThDQSxHQUE5QyxFQUFvRDtBQUNoRCxnQkFBSyxLQUFLQyxNQUFMLENBQVlELENBQVosRUFBZWQsTUFBZixHQUF3QixDQUE3QixFQUFpQztBQUM3QixvQkFBSWdCLE9BQU8sS0FBS0QsTUFBTCxDQUFZRCxDQUFaLENBQVg7QUFDQSxxQkFBSzVCLElBQUwsQ0FBVU8sTUFBVixDQUFpQmEsR0FBakIsR0FBdUI7QUFDbkJYLDBCQUFRcUIsS0FBSyxDQUFMLEtBQVdBLEtBQUssQ0FBTCxDQURBO0FBRW5CcEIsNEJBQVFvQixLQUFLLENBQUwsS0FBV0EsS0FBSyxDQUFMO0FBRkEsaUJBQXZCO0FBSUE7QUFDSDtBQUNKO0FBQ0osSzs7cUJBRURmLE8sb0JBQVFILEksRUFBTTtBQUNWLFlBQUltQixRQUFRbkIsS0FBS2lCLE1BQUwsQ0FBWSxDQUFaLENBQVo7QUFDQSxZQUFJRyxPQUFRLHVCQUFaO0FBQ0EsYUFBS0MsSUFBTCxDQUFVRCxJQUFWLEVBQWdCcEIsSUFBaEI7QUFDQW9CLGFBQUt6QixNQUFMLENBQVlhLEdBQVosR0FBa0IsRUFBRVgsTUFBTXNCLE1BQU0sQ0FBTixDQUFSLEVBQWtCckIsUUFBUXFCLE1BQU0sQ0FBTixDQUExQixFQUFsQjtBQUNBLGFBQUtHLFdBQUwsQ0FBaUJGLElBQWpCLEVBQXVCRCxLQUF2QjtBQUNILEs7O3FCQUVEZixNLG1CQUFPSixJLEVBQU07QUFDVCxZQUFJdUIsU0FBU3ZCLEtBQUtpQixNQUFMLENBQVksQ0FBWixDQUFiO0FBQ0EsWUFBSU8sU0FBU3hCLEtBQUtpQixNQUFMLENBQVlRLEtBQVosQ0FBa0IsQ0FBbEIsQ0FBYjs7QUFFQSxZQUFJTCxPQUFRLHNCQUFaO0FBQ0FBLGFBQUtNLElBQUwsR0FBWUgsT0FBTyxDQUFQLEVBQVVFLEtBQVYsQ0FBZ0IsQ0FBaEIsQ0FBWjtBQUNBLGFBQUtKLElBQUwsQ0FBVUQsSUFBVixFQUFnQnBCLElBQWhCOztBQUVBLFlBQUtvQixLQUFLTSxJQUFMLEtBQWMsRUFBbkIsRUFBd0IsS0FBS0MsYUFBTCxDQUFtQkosTUFBbkI7O0FBRXhCLGVBQVEsQ0FBQ3ZCLEtBQUtRLEdBQU4sSUFBYVIsS0FBSzRCLFNBQTFCLEVBQXNDO0FBQ2xDLGlCQUFLekMsR0FBTCxJQUFZLENBQVo7QUFDQWEsbUJBQU8sS0FBS0MsS0FBTCxDQUFXLEtBQUtkLEdBQWhCLENBQVA7QUFDQXFDLG1CQUFPSyxJQUFQLENBQVksQ0FBQyxPQUFELEVBQVU3QixLQUFLZSxNQUFMLEdBQWNmLEtBQUtXLE1BQTdCLENBQVo7QUFDQWEscUJBQVNBLE9BQU9NLE1BQVAsQ0FBYzlCLEtBQUtpQixNQUFuQixDQUFUO0FBQ0g7O0FBRURHLGFBQUtQLElBQUwsQ0FBVWtCLFNBQVYsR0FBc0IsS0FBS0MsV0FBTCxDQUFpQlIsTUFBakIsQ0FBdEI7QUFDQSxhQUFLUyxpQkFBTCxDQUF1QmIsSUFBdkIsRUFBNkJJLE1BQTdCO0FBQ0EsYUFBS1UsY0FBTCxDQUFvQlYsTUFBcEI7QUFDQSxhQUFLVyxVQUFMLENBQWdCWCxNQUFoQjtBQUNBLGFBQUtZLEdBQUwsQ0FBU2hCLElBQVQsRUFBZSxRQUFmLEVBQXlCSSxNQUF6QixFQUFpQ0QsTUFBakM7QUFDSCxLOztxQkFFRGQsSSxpQkFBS1QsSSxFQUFNO0FBQ1AsWUFBSW9CLE9BQU8sMkJBQVg7QUFDQSxhQUFLQyxJQUFMLENBQVVELElBQVYsRUFBZ0JwQixJQUFoQjs7QUFFQSxZQUFJcUMsVUFBVSxFQUFkO0FBQ0EsWUFBSWhDLFFBQVUsQ0FBZDtBQUNBLFlBQUlpQyxRQUFVLEVBQWQ7QUFDQSxZQUFJQyxPQUFVLEVBQWQ7QUFDQSxhQUFNLElBQUl2QixJQUFJLENBQWQsRUFBaUJBLElBQUloQixLQUFLaUIsTUFBTCxDQUFZZixNQUFqQyxFQUF5Q2MsR0FBekMsRUFBK0M7QUFDM0MsZ0JBQUlHLFFBQVFuQixLQUFLaUIsTUFBTCxDQUFZRCxDQUFaLENBQVo7QUFDQSxnQkFBS0csTUFBTSxDQUFOLE1BQWEsR0FBbEIsRUFBd0I7QUFDcEJrQiwyQkFBV2xCLE1BQU0sQ0FBTixDQUFYO0FBQ0FkLHdCQUFXYyxLQUFYO0FBQ0FtQix3QkFBV3RDLEtBQUtpQixNQUFMLENBQVlRLEtBQVosQ0FBa0JULElBQUksQ0FBdEIsQ0FBWDtBQUNBO0FBQ0gsYUFMRCxNQUtPLElBQUtHLE1BQU0sQ0FBTixNQUFhLFNBQWIsSUFBMEJBLE1BQU0sQ0FBTixNQUFhLE9BQTVDLEVBQXNEO0FBQ3pEa0IsMkJBQVdsQixNQUFNLENBQU4sQ0FBWDtBQUNILGFBRk0sTUFFQSxJQUFLa0IsWUFBWSxFQUFqQixFQUFzQjtBQUN6QixxQkFBS0csT0FBTCxDQUFhckIsS0FBYjtBQUNILGFBRk0sTUFFQTtBQUNIb0Isd0JBQVFwQixNQUFNLENBQU4sQ0FBUjtBQUNIO0FBQ0o7O0FBRUQsWUFBS29CLFNBQVMsRUFBZCxFQUFtQixLQUFLRSxXQUFMLENBQWlCekMsS0FBS2lCLE1BQUwsQ0FBWSxDQUFaLENBQWpCO0FBQ25CRyxhQUFLbUIsSUFBTCxHQUFZQSxJQUFaOztBQUVBLFlBQUlqQyxPQUFPLEtBQUtMLEtBQUwsQ0FBVyxLQUFLZCxHQUFMLEdBQVcsQ0FBdEIsQ0FBWDs7QUFFQSxlQUFRLENBQUNtQixLQUFLRSxHQUFOLElBQWEsQ0FBQ0YsS0FBS0YsTUFBbkIsSUFBNkIsQ0FBQ0UsS0FBS0QsS0FBbkMsSUFDQUMsS0FBS0ssTUFBTCxDQUFZVCxNQUFaLEdBQXFCRixLQUFLVyxNQUFMLENBQVlULE1BRHpDLEVBQ2tEO0FBQzlDb0Msa0JBQU1ULElBQU4sQ0FBVyxDQUFDLE9BQUQsRUFBVXZCLEtBQUtTLE1BQUwsR0FBY1QsS0FBS0ssTUFBN0IsQ0FBWDtBQUNBMkIsb0JBQVFBLE1BQU1SLE1BQU4sQ0FBYXhCLEtBQUtXLE1BQWxCLENBQVI7QUFDQSxpQkFBSzlCLEdBQUwsSUFBWSxDQUFaO0FBQ0FtQixtQkFBTyxLQUFLTCxLQUFMLENBQVcsS0FBS2QsR0FBTCxHQUFXLENBQXRCLENBQVA7QUFDSDs7QUFFRCxZQUFJK0IsT0FBT29CLE1BQU1BLE1BQU1wQyxNQUFOLEdBQWUsQ0FBckIsQ0FBWDtBQUNBLFlBQUtnQixRQUFRQSxLQUFLLENBQUwsTUFBWSxTQUF6QixFQUFxQztBQUNqQ29CLGtCQUFNSSxHQUFOO0FBQ0EsZ0JBQUl2QyxVQUFVLHVCQUFkO0FBQ0EsaUJBQUtkLE9BQUwsQ0FBYXdDLElBQWIsQ0FBa0IxQixPQUFsQjtBQUNBQSxvQkFBUVIsTUFBUixHQUFpQjtBQUNiVCx1QkFBTyxLQUFLQSxLQURDO0FBRWJVLHVCQUFPLEVBQUVDLE1BQU1xQixLQUFLLENBQUwsQ0FBUixFQUFpQnBCLFFBQVFvQixLQUFLLENBQUwsQ0FBekIsRUFGTTtBQUdiVixxQkFBTyxFQUFFWCxNQUFNcUIsS0FBSyxDQUFMLENBQVIsRUFBaUJwQixRQUFRb0IsS0FBSyxDQUFMLENBQXpCO0FBSE0sYUFBakI7QUFLQSxnQkFBSXlCLE9BQU9MLE1BQU1BLE1BQU1wQyxNQUFOLEdBQWUsQ0FBckIsQ0FBWDtBQUNBLGdCQUFLeUMsUUFBUUEsS0FBSyxDQUFMLE1BQVksT0FBekIsRUFBbUM7QUFDL0JMLHNCQUFNSSxHQUFOO0FBQ0F2Qyx3QkFBUVUsSUFBUixDQUFhRSxNQUFiLEdBQXNCNEIsS0FBSyxDQUFMLENBQXRCO0FBQ0g7QUFDRCxpQkFBS3JCLFdBQUwsQ0FBaUJuQixPQUFqQixFQUEwQmUsSUFBMUI7QUFDSDs7QUFFRCxhQUFNLElBQUlGLEtBQUlzQixNQUFNcEMsTUFBTixHQUFlLENBQTdCLEVBQWdDYyxLQUFJLENBQXBDLEVBQXVDQSxJQUF2QyxFQUE2QztBQUN6QyxnQkFBSTRCLElBQUlOLE1BQU10QixFQUFOLEVBQVMsQ0FBVCxDQUFSO0FBQ0EsZ0JBQUs0QixNQUFNLE1BQU4sSUFBZ0JOLE1BQU10QixFQUFOLEVBQVMsQ0FBVCxNQUFnQixZQUFyQyxFQUFvRDtBQUNoREkscUJBQUt5QixTQUFMLEdBQWlCLElBQWpCO0FBQ0Esb0JBQUs3QixLQUFJLENBQUosSUFBU3NCLE1BQU10QixLQUFJLENBQVYsRUFBYSxDQUFiLE1BQW9CLE9BQWxDLEVBQTRDO0FBQ3hDSSx5QkFBS1AsSUFBTCxDQUFVZ0MsU0FBVixHQUFzQlAsTUFBTXRCLEtBQUksQ0FBVixFQUFhLENBQWIsSUFBa0IsWUFBeEM7QUFDQXNCLDBCQUFNUSxNQUFOLENBQWE5QixLQUFJLENBQWpCLEVBQW9CLENBQXBCO0FBQ0gsaUJBSEQsTUFHTztBQUNISSx5QkFBS1AsSUFBTCxDQUFVZ0MsU0FBVixHQUFzQixZQUF0QjtBQUNBUCwwQkFBTVEsTUFBTixDQUFhOUIsRUFBYixFQUFnQixDQUFoQjtBQUNIO0FBQ0Q7QUFDSCxhQVZELE1BVU8sSUFBSzRCLE1BQU0sT0FBTixJQUFpQkEsTUFBTSxTQUF2QixJQUFvQ0EsTUFBTSxTQUEvQyxFQUEyRDtBQUM5RDtBQUNIO0FBQ0o7O0FBRUR4QixhQUFLUCxJQUFMLENBQVV3QixPQUFWLEdBQW9CQSxVQUFVLEtBQUtMLFdBQUwsQ0FBaUJNLEtBQWpCLENBQTlCO0FBQ0EsYUFBS0osY0FBTCxDQUFvQkksS0FBcEI7QUFDQSxhQUFLRixHQUFMLENBQVNoQixJQUFULEVBQWUsT0FBZixFQUF3QmtCLEtBQXhCLEVBQStCakMsS0FBL0I7QUFDSCxLOztxQkFFRE8sSSxpQkFBS1osSSxFQUFNO0FBQ1AsWUFBSW9CLE9BQU8sb0JBQVg7QUFDQSxhQUFLQyxJQUFMLENBQVVELElBQVYsRUFBZ0JwQixJQUFoQjs7QUFFQSxZQUFJK0MsV0FBVy9DLEtBQUtpQixNQUFwQjtBQUNBLFlBQUlYLE9BQVcsS0FBS0wsS0FBTCxDQUFXLEtBQUtkLEdBQUwsR0FBVyxDQUF0QixDQUFmOztBQUVBLGVBQVEsQ0FBQ21CLEtBQUtFLEdBQU4sSUFBYUYsS0FBS0ssTUFBTCxDQUFZVCxNQUFaLEtBQXVCRixLQUFLVyxNQUFMLENBQVlULE1BQXhELEVBQWlFO0FBQzdENkMscUJBQVNsQixJQUFULENBQWMsQ0FBQyxPQUFELEVBQVV2QixLQUFLUyxNQUFMLEdBQWNULEtBQUtLLE1BQTdCLENBQWQ7QUFDQW9DLHVCQUFXQSxTQUFTakIsTUFBVCxDQUFnQnhCLEtBQUtXLE1BQXJCLENBQVg7QUFDQSxpQkFBSzlCLEdBQUwsSUFBWSxDQUFaO0FBQ0FtQixtQkFBTyxLQUFLTCxLQUFMLENBQVcsS0FBS2QsR0FBTCxHQUFXLENBQXRCLENBQVA7QUFDSDs7QUFFRCxhQUFLOEMsaUJBQUwsQ0FBdUJiLElBQXZCLEVBQTZCMkIsUUFBN0I7QUFDQSxhQUFLWixVQUFMLENBQWdCWSxRQUFoQjtBQUNBLGFBQUtYLEdBQUwsQ0FBU2hCLElBQVQsRUFBZSxVQUFmLEVBQTJCMkIsUUFBM0I7QUFDSCxLOztBQUVEOztxQkFFQXBDLE0sbUJBQU9YLEksRUFBTTtBQUNULFlBQUlXLFNBQVNYLEtBQUtXLE1BQUwsQ0FBWVQsTUFBekI7QUFDQSxZQUFJOEMsU0FBUyxPQUFPLEtBQUt4RCxVQUFaLEtBQTJCLFdBQXhDOztBQUVBLFlBQUssQ0FBQ3dELE1BQUQsSUFBV3JDLE1BQWhCLEVBQXlCLEtBQUtzQyxpQkFBTCxDQUF1QmpELElBQXZCOztBQUV6QixZQUFLLENBQUMsS0FBS04sSUFBTixJQUFjaUIsTUFBbkIsRUFBNEI7QUFDeEIsaUJBQUtqQixJQUFMLEdBQVlpQixNQUFaO0FBQ0EsaUJBQUt2QixJQUFMLENBQVV5QixJQUFWLENBQWVGLE1BQWYsR0FBd0JYLEtBQUtXLE1BQTdCO0FBQ0g7O0FBRUQsWUFBS3FDLFVBQVUsS0FBS3hELFVBQUwsS0FBb0JtQixNQUFuQyxFQUE0QztBQUN4QyxnQkFBSXVDLE9BQU92QyxTQUFTLEtBQUtuQixVQUF6QjtBQUNBLGdCQUFLMEQsT0FBTyxDQUFaLEVBQWdCO0FBQ1osb0JBQUtBLFNBQVMsS0FBS3hELElBQW5CLEVBQTBCO0FBQ3RCLHlCQUFLeUQsV0FBTCxDQUFpQixLQUFLM0QsVUFBTCxHQUFrQixLQUFLRSxJQUF4QyxFQUE4Q2lCLE1BQTlDLEVBQXNEWCxJQUF0RDtBQUNILGlCQUZELE1BRU8sSUFBSyxLQUFLWCxPQUFMLENBQWE2QixJQUFiLENBQWtCVyxJQUF2QixFQUE4QjtBQUNqQyx5QkFBS3hDLE9BQUwsR0FBZSxLQUFLQSxPQUFMLENBQWE2QixJQUE1QjtBQUNILGlCQUZNLE1BRUE7QUFDSCx5QkFBSzNCLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSx5QkFBTSxJQUFJeUIsSUFBSSxDQUFkLEVBQWlCQSxJQUFJa0MsSUFBckIsRUFBMkJsQyxHQUEzQixFQUFpQztBQUM3Qiw2QkFBS3pCLFdBQUwsSUFBb0IsR0FBcEI7QUFDSDtBQUNKO0FBQ0osYUFYRCxNQVdPLElBQUsyRCxPQUFPLEtBQUt4RCxJQUFaLEtBQXFCLENBQTFCLEVBQThCO0FBQ2pDLG9CQUFJMEQsSUFBSXpDLFNBQVN1QyxPQUFPLEtBQUt4RCxJQUE3QjtBQUNBLHFCQUFLeUQsV0FBTCxDQUFxQkMsQ0FBckIsYUFBK0JBLElBQUksS0FBSzFELElBQXhDLEdBQWlEaUIsTUFBakQsRUFBeURYLElBQXpEO0FBQ0gsYUFITSxNQUdBO0FBQ0gscUJBQU0sSUFBSWdCLE1BQUksQ0FBZCxFQUFpQkEsTUFBSSxDQUFDa0MsSUFBRCxHQUFRLEtBQUt4RCxJQUFsQyxFQUF3Q3NCLEtBQXhDLEVBQThDO0FBQzFDLHlCQUFLM0IsT0FBTCxHQUFlLEtBQUtBLE9BQUwsQ0FBYWdFLE1BQTVCO0FBQ0g7QUFDSjtBQUNKOztBQUVELGFBQUs3RCxVQUFMLEdBQWtCbUIsTUFBbEI7QUFDSCxLOztxQkFFRFUsSSxpQkFBS0QsSSxFQUFNcEIsSSxFQUFNO0FBQ2IsYUFBS1csTUFBTCxDQUFZWCxJQUFaOztBQUVBLFlBQUssQ0FBQyxLQUFLWCxPQUFMLENBQWFpRSxLQUFuQixFQUEyQixLQUFLakUsT0FBTCxDQUFhaUUsS0FBYixHQUFxQixFQUFyQjtBQUMzQixhQUFLakUsT0FBTCxDQUFhd0MsSUFBYixDQUFrQlQsSUFBbEI7O0FBRUFBLGFBQUtQLElBQUwsQ0FBVUUsTUFBVixHQUFtQmYsS0FBS2UsTUFBTCxHQUFjZixLQUFLVyxNQUF0QztBQUNBLFlBQUssS0FBS3BCLFdBQVYsRUFBd0I7QUFDcEI2QixpQkFBS1AsSUFBTCxDQUFVdEIsV0FBVixHQUF3QixLQUFLQSxXQUE3QjtBQUNBLGlCQUFLQSxXQUFMLEdBQW1CLEtBQW5CO0FBQ0g7QUFDRDZCLGFBQUt6QixNQUFMLEdBQWM7QUFDVkMsbUJBQU8sRUFBRUMsTUFBTUcsS0FBS2lCLE1BQUwsQ0FBWSxDQUFaLEVBQWUsQ0FBZixDQUFSLEVBQTJCbkIsUUFBUUUsS0FBS2lCLE1BQUwsQ0FBWSxDQUFaLEVBQWUsQ0FBZixDQUFuQyxFQURHO0FBRVYvQixtQkFBTyxLQUFLQTtBQUZGLFNBQWQ7QUFJSCxLOztxQkFFRGlELFUsdUJBQVdsQixNLEVBQVE7QUFDZiw2QkFBbUJBLE1BQW5CLG1IQUE0QjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ0JBQWxCRSxLQUFrQjs7QUFDeEIsZ0JBQUtBLE1BQU0sQ0FBTixNQUFhLEdBQWxCLEVBQXdCO0FBQ3BCLHFCQUFLb0MsS0FBTCxDQUFXLDJCQUFYLEVBQXdDcEMsTUFBTSxDQUFOLENBQXhDLEVBQWtEQSxNQUFNLENBQU4sQ0FBbEQ7QUFDSDtBQUNKO0FBQ0osSzs7cUJBRURlLGMsMkJBQWVqQixNLEVBQVE7QUFDbkIsOEJBQW1CQSxNQUFuQix5SEFBNEI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBLGdCQUFsQkUsS0FBa0I7O0FBQ3hCLGdCQUFLQSxNQUFNLENBQU4sTUFBYSxHQUFsQixFQUF3QjtBQUNwQixxQkFBS29DLEtBQUwsQ0FBVyx1QkFBWCxFQUFvQ3BDLE1BQU0sQ0FBTixDQUFwQyxFQUE4Q0EsTUFBTSxDQUFOLENBQTlDO0FBQ0g7QUFDSjtBQUNKLEs7O3FCQUVEYyxpQiw4QkFBa0JiLEksRUFBTUgsTSxFQUFRO0FBQzVCLFlBQUl1QyxZQUFZdkMsT0FBT0EsT0FBT2YsTUFBUCxHQUFnQixDQUF2QixDQUFoQjtBQUNBLFlBQUtzRCxhQUFhQSxVQUFVLENBQVYsTUFBaUIsT0FBbkMsRUFBNkM7QUFDekN2QyxtQkFBT3lCLEdBQVA7QUFDQXRCLGlCQUFLUCxJQUFMLENBQVU0QyxVQUFWLEdBQXVCRCxVQUFVLENBQVYsQ0FBdkI7QUFDSDtBQUNKLEs7O3FCQUVEeEIsVyx3QkFBWWYsTSxFQUFRO0FBQ2hCLFlBQUl5QyxTQUFTLEVBQWI7QUFDQSxhQUFNLElBQUkxQyxJQUFJLENBQWQsRUFBaUJBLElBQUlDLE9BQU9mLE1BQTVCLEVBQW9DYyxHQUFwQyxFQUEwQztBQUN0QyxnQkFBS0MsT0FBT0QsQ0FBUCxFQUFVLENBQVYsTUFBaUIsT0FBakIsSUFBNEJDLE9BQU9ELENBQVAsRUFBVSxDQUFWLE1BQWlCLFNBQWxELEVBQThEO0FBQzFEMEMsMEJBQVV6QyxPQUFPMEMsS0FBUCxHQUFlLENBQWYsQ0FBVjtBQUNBM0MscUJBQUssQ0FBTDtBQUNILGFBSEQsTUFHTztBQUNIO0FBQ0g7QUFDSjtBQUNELGVBQU8wQyxNQUFQO0FBQ0gsSzs7cUJBRUR0QixHLGdCQUFJaEIsSSxFQUFNbUIsSSxFQUFNdEIsTSxFQUFRMkMsTyxFQUFTO0FBQzdCLFlBQUl6QyxjQUFKO0FBQUEsWUFBVzBDLGFBQVg7QUFDQSxZQUFJM0QsU0FBU2UsT0FBT2YsTUFBcEI7QUFDQSxZQUFJb0MsUUFBUyxFQUFiO0FBQ0EsWUFBSXdCLFFBQVMsSUFBYjtBQUNBLGFBQU0sSUFBSTlDLElBQUksQ0FBZCxFQUFpQkEsSUFBSWQsTUFBckIsRUFBNkJjLEtBQUssQ0FBbEMsRUFBc0M7QUFDbENHLG9CQUFRRixPQUFPRCxDQUFQLENBQVI7QUFDQTZDLG1CQUFRMUMsTUFBTSxDQUFOLENBQVI7QUFDQSxnQkFBSzBDLFNBQVMsU0FBVCxJQUFzQkEsU0FBUyxPQUFULElBQW9CN0MsTUFBTWQsU0FBUyxDQUE5RCxFQUFrRTtBQUM5RDRELHdCQUFRLEtBQVI7QUFDSCxhQUZELE1BRU87QUFDSHhCLHlCQUFTbkIsTUFBTSxDQUFOLENBQVQ7QUFDSDtBQUNKO0FBQ0QsWUFBSyxDQUFDMkMsS0FBTixFQUFjO0FBQ1YsZ0JBQUlDLE1BQU05QyxPQUFPK0MsTUFBUCxDQUFlLFVBQUNDLEdBQUQsRUFBTWpELENBQU47QUFBQSx1QkFBWWlELE1BQU1qRCxFQUFFLENBQUYsQ0FBbEI7QUFBQSxhQUFmLEVBQXVDLEVBQXZDLENBQVY7QUFDQSxnQkFBSW9CLE1BQU1uQixPQUFPK0MsTUFBUCxDQUFlLFVBQUNDLEdBQUQsRUFBTWpELENBQU4sRUFBWTtBQUNqQyxvQkFBS0EsRUFBRSxDQUFGLE1BQVMsU0FBVCxJQUFzQkEsRUFBRSxDQUFGLE1BQVMsUUFBcEMsRUFBK0M7QUFDM0MsMkJBQU9pRCxNQUFNLEtBQU4sR0FBY2pELEVBQUUsQ0FBRixFQUFLUyxLQUFMLENBQVcsQ0FBWCxFQUFjeUMsSUFBZCxFQUFkLEdBQXFDLEtBQTVDO0FBQ0gsaUJBRkQsTUFFTztBQUNILDJCQUFPRCxNQUFNakQsRUFBRSxDQUFGLENBQWI7QUFDSDtBQUNKLGFBTlMsRUFNUCxFQU5PLENBQVY7QUFPQUksaUJBQUtQLElBQUwsQ0FBVTBCLElBQVYsSUFBa0IsRUFBRUQsWUFBRixFQUFTRixRQUFULEVBQWxCO0FBQ0EsZ0JBQUsyQixRQUFRM0IsR0FBYixFQUFtQmhCLEtBQUtQLElBQUwsQ0FBVTBCLElBQVYsRUFBZ0J3QixHQUFoQixHQUFzQkEsR0FBdEI7QUFDdEI7QUFDRDNDLGFBQUttQixJQUFMLElBQWFELEtBQWI7O0FBRUEsWUFBSXBCLGFBQUo7QUFDQSxhQUFNLElBQUlGLE1BQUlDLE9BQU9mLE1BQVAsR0FBZ0IsQ0FBOUIsRUFBaUNjLE9BQUssQ0FBdEMsRUFBeUNBLEtBQXpDLEVBQStDO0FBQzNDLGdCQUFLQyxPQUFPRCxHQUFQLEVBQVVkLE1BQVYsR0FBbUIsQ0FBeEIsRUFBNEI7QUFDeEJnQix1QkFBT0QsT0FBT0QsR0FBUCxDQUFQO0FBQ0E7QUFDSDtBQUNKO0FBQ0QsWUFBSyxDQUFDRSxJQUFOLEVBQWFBLE9BQU8wQyxPQUFQOztBQUVieEMsYUFBS3pCLE1BQUwsQ0FBWWEsR0FBWixHQUFrQjtBQUNkWCxrQkFBUXFCLEtBQUssQ0FBTCxLQUFXQSxLQUFLLENBQUwsQ0FETDtBQUVkcEIsb0JBQVFvQixLQUFLLENBQUwsS0FBV0EsS0FBSyxDQUFMO0FBRkwsU0FBbEI7QUFJSCxLOztxQkFFRFgsYywyQkFBZXBCLEcsRUFBSztBQUNoQixZQUFJbUIsT0FBT25CLEdBQVg7QUFDQSxZQUFJYSxhQUFKO0FBQ0EsZUFBUU0sT0FBTyxLQUFLTCxLQUFMLENBQVdDLE1BQTFCLEVBQW1DO0FBQy9CSSxvQkFBUSxDQUFSO0FBQ0FOLG1CQUFPLEtBQUtDLEtBQUwsQ0FBV0ssSUFBWCxDQUFQO0FBQ0EsZ0JBQUtOLEtBQUtRLEdBQUwsSUFBWSxDQUFDUixLQUFLRyxPQUF2QixFQUFpQztBQUNwQztBQUNELGVBQU9ILElBQVA7QUFDSCxLOztxQkFFRHNCLFcsd0JBQVlGLEksRUFBTUQsSyxFQUFPO0FBQ3JCLFlBQUlnRCxPQUFPaEQsTUFBTSxDQUFOLENBQVg7QUFDQSxZQUFLQSxNQUFNLENBQU4sTUFBYSxRQUFsQixFQUE2QjtBQUN6QkMsaUJBQUtQLElBQUwsQ0FBVXVELE1BQVYsR0FBbUIsSUFBbkI7QUFDQUQsbUJBQU9BLEtBQUsxQyxLQUFMLENBQVcsQ0FBWCxDQUFQO0FBQ0gsU0FIRCxNQUdPO0FBQ0gwQyxtQkFBT0EsS0FBSzFDLEtBQUwsQ0FBVyxDQUFYLEVBQWMsQ0FBQyxDQUFmLENBQVA7QUFDSDs7QUFFRCxZQUFJNEMsUUFBUUYsS0FBS0UsS0FBTCxDQUFXLDRCQUFYLENBQVo7QUFDQSxZQUFLQSxLQUFMLEVBQWE7QUFDVGpELGlCQUFLK0MsSUFBTCxHQUFZRSxNQUFNLENBQU4sQ0FBWjtBQUNBakQsaUJBQUtQLElBQUwsQ0FBVXlELElBQVYsR0FBaUJELE1BQU0sQ0FBTixDQUFqQjtBQUNBakQsaUJBQUtQLElBQUwsQ0FBVTBELFdBQVYsR0FBd0JGLE1BQU0sQ0FBTixDQUF4QjtBQUNILFNBSkQsTUFJTztBQUNIakQsaUJBQUsrQyxJQUFMLEdBQVksRUFBWjtBQUNBL0MsaUJBQUtQLElBQUwsQ0FBVXlELElBQVYsR0FBaUIsRUFBakI7QUFDQWxELGlCQUFLUCxJQUFMLENBQVUwRCxXQUFWLEdBQXdCLEVBQXhCO0FBQ0g7QUFDSixLOztBQUVEOztxQkFFQWhCLEssa0JBQU1pQixHLEVBQUszRSxJLEVBQU1DLE0sRUFBUTtBQUNyQixjQUFNLEtBQUtaLEtBQUwsQ0FBV3FFLEtBQVgsQ0FBaUJpQixHQUFqQixFQUFzQjNFLElBQXRCLEVBQTRCQyxNQUE1QixDQUFOO0FBQ0gsSzs7cUJBRUQ2QixhLDBCQUFjUixLLEVBQU87QUFDakIsYUFBS29DLEtBQUwsQ0FBVyxzQkFBWCxFQUFtQ3BDLE1BQU0sQ0FBTixDQUFuQyxFQUE2Q0EsTUFBTSxDQUFOLENBQTdDO0FBQ0gsSzs7cUJBRURzQixXLHdCQUFZdEIsSyxFQUFPO0FBQ2YsYUFBS29DLEtBQUwsQ0FBVywwQkFBWCxFQUF1Q3BDLE1BQU0sQ0FBTixDQUF2QyxFQUFpREEsTUFBTSxDQUFOLENBQWpEO0FBQ0gsSzs7cUJBRUQ4QixpQiw4QkFBa0JqRCxJLEVBQU07QUFDcEIsYUFBS3VELEtBQUwsQ0FBVyxtQ0FBWCxFQUFnRHZELEtBQUt5RSxNQUFyRCxFQUE2RCxDQUE3RDtBQUNILEs7O3FCQUVEdEIsVyx3QkFBWXVCLFEsRUFBVUMsSSxFQUFNM0UsSSxFQUFNO0FBQzlCLFlBQUl3RSxvQkFBbUJFLFFBQW5CLHlCQUFpREMsSUFBckQ7QUFDQSxhQUFLcEIsS0FBTCxDQUFXaUIsR0FBWCxFQUFnQnhFLEtBQUt5RSxNQUFyQixFQUE2QixDQUE3QjtBQUNILEs7O3FCQUVEakMsTyxvQkFBUXJCLEssRUFBTztBQUNYLGFBQUtvQyxLQUFMLENBQVcsa0NBQVgsRUFBK0NwQyxNQUFNLENBQU4sQ0FBL0MsRUFBeURBLE1BQU0sQ0FBTixDQUF6RDtBQUNILEs7Ozs7O2tCQS9YZ0JsQyxNIiwiZmlsZSI6InBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZWNsYXJhdGlvbiBmcm9tICdwb3N0Y3NzL2xpYi9kZWNsYXJhdGlvbic7XG5pbXBvcnQgQ29tbWVudCAgICAgZnJvbSAncG9zdGNzcy9saWIvY29tbWVudCc7XG5pbXBvcnQgQXRSdWxlICAgICAgZnJvbSAncG9zdGNzcy9saWIvYXQtcnVsZSc7XG5pbXBvcnQgUnVsZSAgICAgICAgZnJvbSAncG9zdGNzcy9saWIvcnVsZSc7XG5pbXBvcnQgUm9vdCAgICAgICAgZnJvbSAncG9zdGNzcy9saWIvcm9vdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnNlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihpbnB1dCkge1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG5cbiAgICAgICAgdGhpcy5wb3MgICAgID0gMDtcbiAgICAgICAgdGhpcy5yb290ICAgID0gbmV3IFJvb3QoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5yb290O1xuICAgICAgICB0aGlzLnNwYWNlcyAgPSAnJztcblxuICAgICAgICB0aGlzLmV4dHJhSW5kZW50ID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJldkluZGVudCAgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc3RlcCAgICAgICAgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgdGhpcy5yb290LnNvdXJjZSA9IHsgaW5wdXQsIHN0YXJ0OiB7IGxpbmU6IDEsIGNvbHVtbjogMSB9IH07XG4gICAgfVxuXG4gICAgbG9vcCgpIHtcbiAgICAgICAgbGV0IHBhcnQ7XG4gICAgICAgIHdoaWxlICggdGhpcy5wb3MgPCB0aGlzLnBhcnRzLmxlbmd0aCApIHtcbiAgICAgICAgICAgIHBhcnQgPSB0aGlzLnBhcnRzW3RoaXMucG9zXTtcblxuICAgICAgICAgICAgaWYgKCBwYXJ0LmNvbW1lbnQgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tZW50KHBhcnQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggcGFydC5hdHJ1bGUgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHJ1bGUocGFydCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBwYXJ0LmNvbG9uICkge1xuICAgICAgICAgICAgICAgIGxldCBuZXh0ID0gdGhpcy5uZXh0Tm9uQ29tbWVudCh0aGlzLnBvcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIG5leHQuZW5kIHx8IG5leHQuYXRydWxlICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY2wocGFydCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vcmVJbmRlbnQgPSBuZXh0LmluZGVudC5sZW5ndGggPiBwYXJ0LmluZGVudC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmICggIW1vcmVJbmRlbnQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY2wocGFydCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIG1vcmVJbmRlbnQgJiYgbmV4dC5jb2xvbiApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVsZShwYXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggbW9yZUluZGVudCAmJiAhbmV4dC5jb2xvbiApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjbChwYXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHBhcnQuZW5kICkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5yYXdzLmFmdGVyID0gcGFydC5iZWZvcmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucnVsZShwYXJ0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoIGxldCBpID0gdGhpcy50b2tlbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0gKSB7XG4gICAgICAgICAgICBpZiAoIHRoaXMudG9rZW5zW2ldLmxlbmd0aCA+IDMgKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxhc3QgPSB0aGlzLnRva2Vuc1tpXTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3Quc291cmNlLmVuZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGluZTogICBsYXN0WzRdIHx8IGxhc3RbMl0sXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjogbGFzdFs1XSB8fCBsYXN0WzNdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbW1lbnQocGFydCkge1xuICAgICAgICBsZXQgdG9rZW4gPSBwYXJ0LnRva2Vuc1swXTtcbiAgICAgICAgbGV0IG5vZGUgID0gbmV3IENvbW1lbnQoKTtcbiAgICAgICAgdGhpcy5pbml0KG5vZGUsIHBhcnQpO1xuICAgICAgICBub2RlLnNvdXJjZS5lbmQgPSB7IGxpbmU6IHRva2VuWzRdLCBjb2x1bW46IHRva2VuWzVdIH07XG4gICAgICAgIHRoaXMuY29tbWVudFRleHQobm9kZSwgdG9rZW4pO1xuICAgIH1cblxuICAgIGF0cnVsZShwYXJ0KSB7XG4gICAgICAgIGxldCBhdHdvcmQgPSBwYXJ0LnRva2Vuc1swXTtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHBhcnQudG9rZW5zLnNsaWNlKDEpO1xuXG4gICAgICAgIGxldCBub2RlICA9IG5ldyBBdFJ1bGUoKTtcbiAgICAgICAgbm9kZS5uYW1lID0gYXR3b3JkWzFdLnNsaWNlKDEpO1xuICAgICAgICB0aGlzLmluaXQobm9kZSwgcGFydCk7XG5cbiAgICAgICAgaWYgKCBub2RlLm5hbWUgPT09ICcnICkgdGhpcy51bm5hbWVkQXRydWxlKGF0d29yZCk7XG5cbiAgICAgICAgd2hpbGUgKCAhcGFydC5lbmQgJiYgcGFydC5sYXN0Q29tbWEgKSB7XG4gICAgICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgICAgICAgICAgcGFydCA9IHRoaXMucGFydHNbdGhpcy5wb3NdO1xuICAgICAgICAgICAgcGFyYW1zLnB1c2goWydzcGFjZScsIHBhcnQuYmVmb3JlICsgcGFydC5pbmRlbnRdKTtcbiAgICAgICAgICAgIHBhcmFtcyA9IHBhcmFtcy5jb25jYXQocGFydC50b2tlbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZS5yYXdzLmFmdGVyTmFtZSA9IHRoaXMuZmlyc3RTcGFjZXMocGFyYW1zKTtcbiAgICAgICAgdGhpcy5rZWVwVHJhaWxpbmdTcGFjZShub2RlLCBwYXJhbXMpO1xuICAgICAgICB0aGlzLmNoZWNrU2VtaWNvbG9uKHBhcmFtcyk7XG4gICAgICAgIHRoaXMuY2hlY2tDdXJseShwYXJhbXMpO1xuICAgICAgICB0aGlzLnJhdyhub2RlLCAncGFyYW1zJywgcGFyYW1zLCBhdHdvcmQpO1xuICAgIH1cblxuICAgIGRlY2wocGFydCkge1xuICAgICAgICBsZXQgbm9kZSA9IG5ldyBEZWNsYXJhdGlvbigpO1xuICAgICAgICB0aGlzLmluaXQobm9kZSwgcGFydCk7XG5cbiAgICAgICAgbGV0IGJldHdlZW4gPSAnJztcbiAgICAgICAgbGV0IGNvbG9uICAgPSAwO1xuICAgICAgICBsZXQgdmFsdWUgICA9IFtdO1xuICAgICAgICBsZXQgcHJvcCAgICA9ICcnO1xuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBwYXJ0LnRva2Vucy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGxldCB0b2tlbiA9IHBhcnQudG9rZW5zW2ldO1xuICAgICAgICAgICAgaWYgKCB0b2tlblswXSA9PT0gJzonICkge1xuICAgICAgICAgICAgICAgIGJldHdlZW4gKz0gdG9rZW5bMV07XG4gICAgICAgICAgICAgICAgY29sb24gICAgPSB0b2tlbjtcbiAgICAgICAgICAgICAgICB2YWx1ZSAgICA9IHBhcnQudG9rZW5zLnNsaWNlKGkgKyAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHRva2VuWzBdID09PSAnY29tbWVudCcgfHwgdG9rZW5bMF0gPT09ICdzcGFjZScgKSB7XG4gICAgICAgICAgICAgICAgYmV0d2VlbiArPSB0b2tlblsxXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGJldHdlZW4gIT09ICcnICkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFkUHJvcCh0b2tlbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb3AgKz0gdG9rZW5bMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHByb3AgPT09ICcnICkgdGhpcy51bm5hbWVkRGVjbChwYXJ0LnRva2Vuc1swXSk7XG4gICAgICAgIG5vZGUucHJvcCA9IHByb3A7XG5cbiAgICAgICAgbGV0IG5leHQgPSB0aGlzLnBhcnRzW3RoaXMucG9zICsgMV07XG5cbiAgICAgICAgd2hpbGUgKCAhbmV4dC5lbmQgJiYgIW5leHQuYXRydWxlICYmICFuZXh0LmNvbG9uICYmXG4gICAgICAgICAgICAgICAgbmV4dC5pbmRlbnQubGVuZ3RoID4gcGFydC5pbmRlbnQubGVuZ3RoICkge1xuICAgICAgICAgICAgdmFsdWUucHVzaChbJ3NwYWNlJywgbmV4dC5iZWZvcmUgKyBuZXh0LmluZGVudF0pO1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5jb25jYXQobmV4dC50b2tlbnMpO1xuICAgICAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgICAgIG5leHQgPSB0aGlzLnBhcnRzW3RoaXMucG9zICsgMV07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGFzdCA9IHZhbHVlW3ZhbHVlLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoIGxhc3QgJiYgbGFzdFswXSA9PT0gJ2NvbW1lbnQnICkge1xuICAgICAgICAgICAgdmFsdWUucG9wKCk7XG4gICAgICAgICAgICBsZXQgY29tbWVudCA9IG5ldyBDb21tZW50KCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQucHVzaChjb21tZW50KTtcbiAgICAgICAgICAgIGNvbW1lbnQuc291cmNlID0ge1xuICAgICAgICAgICAgICAgIGlucHV0OiB0aGlzLmlucHV0LFxuICAgICAgICAgICAgICAgIHN0YXJ0OiB7IGxpbmU6IGxhc3RbMl0sIGNvbHVtbjogbGFzdFszXSB9LFxuICAgICAgICAgICAgICAgIGVuZDogICB7IGxpbmU6IGxhc3RbNF0sIGNvbHVtbjogbGFzdFs1XSB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHByZXYgPSB2YWx1ZVt2YWx1ZS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmICggcHJldiAmJiBwcmV2WzBdID09PSAnc3BhY2UnICkge1xuICAgICAgICAgICAgICAgIHZhbHVlLnBvcCgpO1xuICAgICAgICAgICAgICAgIGNvbW1lbnQucmF3cy5iZWZvcmUgPSBwcmV2WzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb21tZW50VGV4dChjb21tZW50LCBsYXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoIGxldCBpID0gdmFsdWUubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSApIHtcbiAgICAgICAgICAgIGxldCB0ID0gdmFsdWVbaV1bMF07XG4gICAgICAgICAgICBpZiAoIHQgPT09ICd3b3JkJyAmJiB2YWx1ZVtpXVsxXSA9PT0gJyFpbXBvcnRhbnQnICkge1xuICAgICAgICAgICAgICAgIG5vZGUuaW1wb3J0YW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoIGkgPiAwICYmIHZhbHVlW2kgLSAxXVswXSA9PT0gJ3NwYWNlJyApIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yYXdzLmltcG9ydGFudCA9IHZhbHVlW2kgLSAxXVsxXSArICchaW1wb3J0YW50JztcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUuc3BsaWNlKGkgLSAxLCAyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnJhd3MuaW1wb3J0YW50ID0gJyFpbXBvcnRhbnQnO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggdCAhPT0gJ3NwYWNlJyAmJiB0ICE9PSAnbmV3bGluZScgJiYgdCAhPT0gJ2NvbW1lbnQnICkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gPSBiZXR3ZWVuICsgdGhpcy5maXJzdFNwYWNlcyh2YWx1ZSk7XG4gICAgICAgIHRoaXMuY2hlY2tTZW1pY29sb24odmFsdWUpO1xuICAgICAgICB0aGlzLnJhdyhub2RlLCAndmFsdWUnLCB2YWx1ZSwgY29sb24pO1xuICAgIH1cblxuICAgIHJ1bGUocGFydCkge1xuICAgICAgICBsZXQgbm9kZSA9IG5ldyBSdWxlKCk7XG4gICAgICAgIHRoaXMuaW5pdChub2RlLCBwYXJ0KTtcblxuICAgICAgICBsZXQgc2VsZWN0b3IgPSBwYXJ0LnRva2VucztcbiAgICAgICAgbGV0IG5leHQgICAgID0gdGhpcy5wYXJ0c1t0aGlzLnBvcyArIDFdO1xuXG4gICAgICAgIHdoaWxlICggIW5leHQuZW5kICYmIG5leHQuaW5kZW50Lmxlbmd0aCA9PT0gcGFydC5pbmRlbnQubGVuZ3RoICkge1xuICAgICAgICAgICAgc2VsZWN0b3IucHVzaChbJ3NwYWNlJywgbmV4dC5iZWZvcmUgKyBuZXh0LmluZGVudF0pO1xuICAgICAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci5jb25jYXQobmV4dC50b2tlbnMpO1xuICAgICAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgICAgIG5leHQgPSB0aGlzLnBhcnRzW3RoaXMucG9zICsgMV07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmtlZXBUcmFpbGluZ1NwYWNlKG5vZGUsIHNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5jaGVja0N1cmx5KHNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5yYXcobm9kZSwgJ3NlbGVjdG9yJywgc2VsZWN0b3IpO1xuICAgIH1cblxuICAgIC8qIEhlbHBlcnMgKi9cblxuICAgIGluZGVudChwYXJ0KSB7XG4gICAgICAgIGxldCBpbmRlbnQgPSBwYXJ0LmluZGVudC5sZW5ndGg7XG4gICAgICAgIGxldCBpc1ByZXYgPSB0eXBlb2YgdGhpcy5wcmV2SW5kZW50ICE9PSAndW5kZWZpbmVkJztcblxuICAgICAgICBpZiAoICFpc1ByZXYgJiYgaW5kZW50ICkgdGhpcy5pbmRlbnRlZEZpcnN0TGluZShwYXJ0KTtcblxuICAgICAgICBpZiAoICF0aGlzLnN0ZXAgJiYgaW5kZW50ICkge1xuICAgICAgICAgICAgdGhpcy5zdGVwID0gaW5kZW50O1xuICAgICAgICAgICAgdGhpcy5yb290LnJhd3MuaW5kZW50ID0gcGFydC5pbmRlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGlzUHJldiAmJiB0aGlzLnByZXZJbmRlbnQgIT09IGluZGVudCApIHtcbiAgICAgICAgICAgIGxldCBkaWZmID0gaW5kZW50IC0gdGhpcy5wcmV2SW5kZW50O1xuICAgICAgICAgICAgaWYgKCBkaWZmID4gMCApIHtcbiAgICAgICAgICAgICAgICBpZiAoIGRpZmYgIT09IHRoaXMuc3RlcCApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53cm9uZ0luZGVudCh0aGlzLnByZXZJbmRlbnQgKyB0aGlzLnN0ZXAsIGluZGVudCwgcGFydCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggdGhpcy5jdXJyZW50Lmxhc3QucHVzaCApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5jdXJyZW50Lmxhc3Q7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHRyYUluZGVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBkaWZmOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4dHJhSW5kZW50ICs9ICcgJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGRpZmYgJSB0aGlzLnN0ZXAgIT09IDAgKSB7XG4gICAgICAgICAgICAgICAgbGV0IG0gPSBpbmRlbnQgKyBkaWZmICUgdGhpcy5zdGVwO1xuICAgICAgICAgICAgICAgIHRoaXMud3JvbmdJbmRlbnQoYCR7IG0gfSBvciAkeyBtICsgdGhpcy5zdGVwIH1gLCBpbmRlbnQsIHBhcnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCAtZGlmZiAvIHRoaXMuc3RlcDsgaSsrICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmN1cnJlbnQucGFyZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJldkluZGVudCA9IGluZGVudDtcbiAgICB9XG5cbiAgICBpbml0KG5vZGUsIHBhcnQpIHtcbiAgICAgICAgdGhpcy5pbmRlbnQocGFydCk7XG5cbiAgICAgICAgaWYgKCAhdGhpcy5jdXJyZW50Lm5vZGVzICkgdGhpcy5jdXJyZW50Lm5vZGVzID0gW107XG4gICAgICAgIHRoaXMuY3VycmVudC5wdXNoKG5vZGUpO1xuXG4gICAgICAgIG5vZGUucmF3cy5iZWZvcmUgPSBwYXJ0LmJlZm9yZSArIHBhcnQuaW5kZW50O1xuICAgICAgICBpZiAoIHRoaXMuZXh0cmFJbmRlbnQgKSB7XG4gICAgICAgICAgICBub2RlLnJhd3MuZXh0cmFJbmRlbnQgPSB0aGlzLmV4dHJhSW5kZW50O1xuICAgICAgICAgICAgdGhpcy5leHRyYUluZGVudCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUuc291cmNlID0ge1xuICAgICAgICAgICAgc3RhcnQ6IHsgbGluZTogcGFydC50b2tlbnNbMF1bMl0sIGNvbHVtbjogcGFydC50b2tlbnNbMF1bM10gfSxcbiAgICAgICAgICAgIGlucHV0OiB0aGlzLmlucHV0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2hlY2tDdXJseSh0b2tlbnMpIHtcbiAgICAgICAgZm9yICggbGV0IHRva2VuIG9mIHRva2VucyApIHtcbiAgICAgICAgICAgIGlmICggdG9rZW5bMF0gPT09ICd7JyApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yKCdVbm5lY2Vzc2FyeSBjdXJseSBicmFja2V0JywgdG9rZW5bMl0sIHRva2VuWzNdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrU2VtaWNvbG9uKHRva2Vucykge1xuICAgICAgICBmb3IgKCBsZXQgdG9rZW4gb2YgdG9rZW5zICkge1xuICAgICAgICAgICAgaWYgKCB0b2tlblswXSA9PT0gJzsnICkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1VubmVjZXNzYXJ5IHNlbWljb2xvbicsIHRva2VuWzJdLCB0b2tlblszXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBrZWVwVHJhaWxpbmdTcGFjZShub2RlLCB0b2tlbnMpIHtcbiAgICAgICAgbGV0IGxhc3RTcGFjZSA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmICggbGFzdFNwYWNlICYmIGxhc3RTcGFjZVswXSA9PT0gJ3NwYWNlJyApIHtcbiAgICAgICAgICAgIHRva2Vucy5wb3AoKTtcbiAgICAgICAgICAgIG5vZGUucmF3cy5zc3NCZXR3ZWVuID0gbGFzdFNwYWNlWzFdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlyc3RTcGFjZXModG9rZW5zKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaWYgKCB0b2tlbnNbaV1bMF0gPT09ICdzcGFjZScgfHwgdG9rZW5zW2ldWzBdID09PSAnbmV3bGluZScgKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHRva2Vucy5zaGlmdCgpWzFdO1xuICAgICAgICAgICAgICAgIGkgLT0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByYXcobm9kZSwgcHJvcCwgdG9rZW5zLCBhbHRMYXN0KSB7XG4gICAgICAgIGxldCB0b2tlbiwgdHlwZTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRva2Vucy5sZW5ndGg7XG4gICAgICAgIGxldCB2YWx1ZSAgPSAnJztcbiAgICAgICAgbGV0IGNsZWFuICA9IHRydWU7XG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxICkge1xuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICB0eXBlICA9IHRva2VuWzBdO1xuICAgICAgICAgICAgaWYgKCB0eXBlID09PSAnY29tbWVudCcgfHwgdHlwZSA9PT0gJ3NwYWNlJyAmJiBpID09PSBsZW5ndGggLSAxICkge1xuICAgICAgICAgICAgICAgIGNsZWFuID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IHRva2VuWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICggIWNsZWFuICkge1xuICAgICAgICAgICAgbGV0IHNzcyA9IHRva2Vucy5yZWR1Y2UoIChhbGwsIGkpID0+IGFsbCArIGlbMV0sICcnKTtcbiAgICAgICAgICAgIGxldCByYXcgPSB0b2tlbnMucmVkdWNlKCAoYWxsLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCBpWzBdID09PSAnY29tbWVudCcgJiYgaVs2XSA9PT0gJ2lubGluZScgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGwgKyAnLyogJyArIGlbMV0uc2xpY2UoMikudHJpbSgpICsgJyAqLyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsbCArIGlbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgJycpO1xuICAgICAgICAgICAgbm9kZS5yYXdzW3Byb3BdID0geyB2YWx1ZSwgcmF3IH07XG4gICAgICAgICAgICBpZiAoIHNzcyAhPT0gcmF3ICkgbm9kZS5yYXdzW3Byb3BdLnNzcyA9IHNzcztcbiAgICAgICAgfVxuICAgICAgICBub2RlW3Byb3BdID0gdmFsdWU7XG5cbiAgICAgICAgbGV0IGxhc3Q7XG4gICAgICAgIGZvciAoIGxldCBpID0gdG9rZW5zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tICkge1xuICAgICAgICAgICAgaWYgKCB0b2tlbnNbaV0ubGVuZ3RoID4gMiApIHtcbiAgICAgICAgICAgICAgICBsYXN0ID0gdG9rZW5zW2ldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICggIWxhc3QgKSBsYXN0ID0gYWx0TGFzdDtcblxuICAgICAgICBub2RlLnNvdXJjZS5lbmQgPSB7XG4gICAgICAgICAgICBsaW5lOiAgIGxhc3RbNF0gfHwgbGFzdFsyXSxcbiAgICAgICAgICAgIGNvbHVtbjogbGFzdFs1XSB8fCBsYXN0WzNdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgbmV4dE5vbkNvbW1lbnQocG9zKSB7XG4gICAgICAgIGxldCBuZXh0ID0gcG9zO1xuICAgICAgICBsZXQgcGFydDtcbiAgICAgICAgd2hpbGUgKCBuZXh0IDwgdGhpcy5wYXJ0cy5sZW5ndGggKSB7XG4gICAgICAgICAgICBuZXh0ICs9IDE7XG4gICAgICAgICAgICBwYXJ0ID0gdGhpcy5wYXJ0c1tuZXh0XTtcbiAgICAgICAgICAgIGlmICggcGFydC5lbmQgfHwgIXBhcnQuY29tbWVudCApIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJ0O1xuICAgIH1cblxuICAgIGNvbW1lbnRUZXh0KG5vZGUsIHRva2VuKSB7XG4gICAgICAgIGxldCB0ZXh0ID0gdG9rZW5bMV07XG4gICAgICAgIGlmICggdG9rZW5bNl0gPT09ICdpbmxpbmUnICkge1xuICAgICAgICAgICAgbm9kZS5yYXdzLmlubGluZSA9IHRydWU7XG4gICAgICAgICAgICB0ZXh0ID0gdGV4dC5zbGljZSgyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnNsaWNlKDIsIC0yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtYXRjaCA9IHRleHQubWF0Y2goL14oXFxzKikoW15dKlteXFxzXSkoXFxzKilcXG4/JC8pO1xuICAgICAgICBpZiAoIG1hdGNoICkge1xuICAgICAgICAgICAgbm9kZS50ZXh0ID0gbWF0Y2hbMl07XG4gICAgICAgICAgICBub2RlLnJhd3MubGVmdCA9IG1hdGNoWzFdO1xuICAgICAgICAgICAgbm9kZS5yYXdzLmlubGluZVJpZ2h0ID0gbWF0Y2hbM107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlLnRleHQgPSAnJztcbiAgICAgICAgICAgIG5vZGUucmF3cy5sZWZ0ID0gJyc7XG4gICAgICAgICAgICBub2RlLnJhd3MuaW5saW5lUmlnaHQgPSAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVycm9yc1xuXG4gICAgZXJyb3IobXNnLCBsaW5lLCBjb2x1bW4pIHtcbiAgICAgICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcihtc2csIGxpbmUsIGNvbHVtbik7XG4gICAgfVxuXG4gICAgdW5uYW1lZEF0cnVsZSh0b2tlbikge1xuICAgICAgICB0aGlzLmVycm9yKCdBdC1ydWxlIHdpdGhvdXQgbmFtZScsIHRva2VuWzJdLCB0b2tlblszXSk7XG4gICAgfVxuXG4gICAgdW5uYW1lZERlY2wodG9rZW4pIHtcbiAgICAgICAgdGhpcy5lcnJvcignRGVjbGFyYXRpb24gd2l0aG91dCBuYW1lJywgdG9rZW5bMl0sIHRva2VuWzNdKTtcbiAgICB9XG5cbiAgICBpbmRlbnRlZEZpcnN0TGluZShwYXJ0KSB7XG4gICAgICAgIHRoaXMuZXJyb3IoJ0ZpcnN0IGxpbmUgc2hvdWxkIG5vdCBoYXZlIGluZGVudCcsIHBhcnQubnVtYmVyLCAxKTtcbiAgICB9XG5cbiAgICB3cm9uZ0luZGVudChleHBlY3RlZCwgcmVhbCwgcGFydCkge1xuICAgICAgICBsZXQgbXNnID0gYEV4cGVjdGVkICR7IGV4cGVjdGVkIH0gaW5kZW50LCBidXQgZ2V0ICR7IHJlYWwgfWA7XG4gICAgICAgIHRoaXMuZXJyb3IobXNnLCBwYXJ0Lm51bWJlciwgMSk7XG4gICAgfVxuXG4gICAgYmFkUHJvcCh0b2tlbikge1xuICAgICAgICB0aGlzLmVycm9yKCdVbmV4cGVjdGVkIHNlcGFyYXRvciBpbiBwcm9wZXJ0eScsIHRva2VuWzJdLCB0b2tlblszXSk7XG4gICAgfVxuXG59XG4iXX0=