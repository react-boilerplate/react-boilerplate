'use strict';

exports.__esModule = true;

var _declaration = require('./declaration');

var _declaration2 = _interopRequireDefault(_declaration);

var _tokenize = require('./tokenize');

var _tokenize2 = _interopRequireDefault(_tokenize);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

var _atRule = require('./at-rule');

var _atRule2 = _interopRequireDefault(_atRule);

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

var _rule = require('./rule');

var _rule2 = _interopRequireDefault(_rule);

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
        this.semicolon = false;

        this.root.source = { input: input, start: { line: 1, column: 1 } };
    }

    Parser.prototype.tokenize = function tokenize() {
        this.tokens = (0, _tokenize2.default)(this.input);
    };

    Parser.prototype.loop = function loop() {
        var token = void 0;
        while (this.pos < this.tokens.length) {
            token = this.tokens[this.pos];

            switch (token[0]) {

                case 'space':
                case ';':
                    this.spaces += token[1];
                    break;

                case '}':
                    this.end(token);
                    break;

                case 'comment':
                    this.comment(token);
                    break;

                case 'at-word':
                    this.atrule(token);
                    break;

                case '{':
                    this.emptyRule(token);
                    break;

                default:
                    this.other();
                    break;
            }

            this.pos += 1;
        }
        this.endFile();
    };

    Parser.prototype.comment = function comment(token) {
        var node = new _comment2.default();
        this.init(node, token[2], token[3]);
        node.source.end = { line: token[4], column: token[5] };

        var text = token[1].slice(2, -2);
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

    Parser.prototype.emptyRule = function emptyRule(token) {
        var node = new _rule2.default();
        this.init(node, token[2], token[3]);
        node.selector = '';
        node.raws.between = '';
        this.current = node;
    };

    Parser.prototype.other = function other() {
        var token = void 0;
        var end = false;
        var type = null;
        var colon = false;
        var bracket = null;
        var brackets = [];

        var start = this.pos;
        while (this.pos < this.tokens.length) {
            token = this.tokens[this.pos];
            type = token[0];

            if (type === '(' || type === '[') {
                if (!bracket) bracket = token;
                brackets.push(type === '(' ? ')' : ']');
            } else if (brackets.length === 0) {
                if (type === ';') {
                    if (colon) {
                        this.decl(this.tokens.slice(start, this.pos + 1));
                        return;
                    } else {
                        break;
                    }
                } else if (type === '{') {
                    this.rule(this.tokens.slice(start, this.pos + 1));
                    return;
                } else if (type === '}') {
                    this.pos -= 1;
                    end = true;
                    break;
                } else if (type === ':') {
                    colon = true;
                }
            } else if (type === brackets[brackets.length - 1]) {
                brackets.pop();
                if (brackets.length === 0) bracket = null;
            }

            this.pos += 1;
        }
        if (this.pos === this.tokens.length) {
            this.pos -= 1;
            end = true;
        }

        if (brackets.length > 0) this.unclosedBracket(bracket);

        if (end && colon) {
            while (this.pos > start) {
                token = this.tokens[this.pos][0];
                if (token !== 'space' && token !== 'comment') break;
                this.pos -= 1;
            }
            this.decl(this.tokens.slice(start, this.pos + 1));
            return;
        }

        this.unknownWord(start);
    };

    Parser.prototype.rule = function rule(tokens) {
        tokens.pop();

        var node = new _rule2.default();
        this.init(node, tokens[0][2], tokens[0][3]);

        node.raws.between = this.spacesAndCommentsFromEnd(tokens);
        this.raw(node, 'selector', tokens);
        this.current = node;
    };

    Parser.prototype.decl = function decl(tokens) {
        var node = new _declaration2.default();
        this.init(node);

        var last = tokens[tokens.length - 1];
        if (last[0] === ';') {
            this.semicolon = true;
            tokens.pop();
        }
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

        for (var i = tokens.length - 1; i > 0; i--) {
            token = tokens[i];
            if (token[1] === '!important') {
                node.important = true;
                var string = this.stringFrom(tokens, i);
                string = this.spacesFromEnd(tokens) + string;
                if (string !== ' !important') node.raws.important = string;
                break;
            } else if (token[1] === 'important') {
                var cache = tokens.slice(0);
                var str = '';
                for (var j = i; j > 0; j--) {
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

        if (node.value.indexOf(':') !== -1) this.checkMissedSemicolon(tokens);
    };

    Parser.prototype.atrule = function atrule(token) {
        var node = new _atRule2.default();
        node.name = token[1].slice(1);
        if (node.name === '') {
            this.unnamedAtrule(node, token);
        }
        this.init(node, token[2], token[3]);

        var last = false;
        var open = false;
        var params = [];

        this.pos += 1;
        while (this.pos < this.tokens.length) {
            token = this.tokens[this.pos];

            if (token[0] === ';') {
                node.source.end = { line: token[2], column: token[3] };
                this.semicolon = true;
                break;
            } else if (token[0] === '{') {
                open = true;
                break;
            } else if (token[0] === '}') {
                this.end(token);
                break;
            } else {
                params.push(token);
            }

            this.pos += 1;
        }
        if (this.pos === this.tokens.length) {
            last = true;
        }

        node.raws.between = this.spacesAndCommentsFromEnd(params);
        if (params.length) {
            node.raws.afterName = this.spacesAndCommentsFromStart(params);
            this.raw(node, 'params', params);
            if (last) {
                token = params[params.length - 1];
                node.source.end = { line: token[4], column: token[5] };
                this.spaces = node.raws.between;
                node.raws.between = '';
            }
        } else {
            node.raws.afterName = '';
            node.params = '';
        }

        if (open) {
            node.nodes = [];
            this.current = node;
        }
    };

    Parser.prototype.end = function end(token) {
        if (this.current.nodes && this.current.nodes.length) {
            this.current.raws.semicolon = this.semicolon;
        }
        this.semicolon = false;

        this.current.raws.after = (this.current.raws.after || '') + this.spaces;
        this.spaces = '';

        if (this.current.parent) {
            this.current.source.end = { line: token[2], column: token[3] };
            this.current = this.current.parent;
        } else {
            this.unexpectedClose(token);
        }
    };

    Parser.prototype.endFile = function endFile() {
        if (this.current.parent) this.unclosedBlock();
        if (this.current.nodes && this.current.nodes.length) {
            this.current.raws.semicolon = this.semicolon;
        }
        this.current.raws.after = (this.current.raws.after || '') + this.spaces;
    };

    // Helpers

    Parser.prototype.init = function init(node, line, column) {
        this.current.push(node);

        node.source = { start: { line: line, column: column }, input: this.input };
        node.raws.before = this.spaces;
        this.spaces = '';
        if (node.type !== 'comment') this.semicolon = false;
    };

    Parser.prototype.raw = function raw(node, prop, tokens) {
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
            var raw = tokens.reduce(function (all, i) {
                return all + i[1];
            }, '');
            node.raws[prop] = { value: value, raw: raw };
        }
        node[prop] = value;
    };

    Parser.prototype.spacesAndCommentsFromEnd = function spacesAndCommentsFromEnd(tokens) {
        var lastTokenType = void 0;
        var spaces = '';
        while (tokens.length) {
            lastTokenType = tokens[tokens.length - 1][0];
            if (lastTokenType !== 'space' && lastTokenType !== 'comment') break;
            spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
    };

    Parser.prototype.spacesAndCommentsFromStart = function spacesAndCommentsFromStart(tokens) {
        var next = void 0;
        var spaces = '';
        while (tokens.length) {
            next = tokens[0][0];
            if (next !== 'space' && next !== 'comment') break;
            spaces += tokens.shift()[1];
        }
        return spaces;
    };

    Parser.prototype.spacesFromEnd = function spacesFromEnd(tokens) {
        var lastTokenType = void 0;
        var spaces = '';
        while (tokens.length) {
            lastTokenType = tokens[tokens.length - 1][0];
            if (lastTokenType !== 'space') break;
            spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
    };

    Parser.prototype.stringFrom = function stringFrom(tokens, from) {
        var result = '';
        for (var i = from; i < tokens.length; i++) {
            result += tokens[i][1];
        }
        tokens.splice(from, tokens.length - from);
        return result;
    };

    Parser.prototype.colon = function colon(tokens) {
        var brackets = 0;
        var token = void 0,
            type = void 0,
            prev = void 0;
        for (var i = 0; i < tokens.length; i++) {
            token = tokens[i];
            type = token[0];

            if (type === '(') {
                brackets += 1;
            } else if (type === ')') {
                brackets -= 1;
            } else if (brackets === 0 && type === ':') {
                if (!prev) {
                    this.doubleColon(token);
                } else if (prev[0] === 'word' && prev[1] === 'progid') {
                    continue;
                } else {
                    return i;
                }
            }

            prev = token;
        }
        return false;
    };

    // Errors

    Parser.prototype.unclosedBracket = function unclosedBracket(bracket) {
        throw this.input.error('Unclosed bracket', bracket[2], bracket[3]);
    };

    Parser.prototype.unknownWord = function unknownWord(start) {
        var token = this.tokens[start];
        throw this.input.error('Unknown word', token[2], token[3]);
    };

    Parser.prototype.unexpectedClose = function unexpectedClose(token) {
        throw this.input.error('Unexpected }', token[2], token[3]);
    };

    Parser.prototype.unclosedBlock = function unclosedBlock() {
        var pos = this.current.source.start;
        throw this.input.error('Unclosed block', pos.line, pos.column);
    };

    Parser.prototype.doubleColon = function doubleColon(token) {
        throw this.input.error('Double colon', token[2], token[3]);
    };

    Parser.prototype.unnamedAtrule = function unnamedAtrule(node, token) {
        throw this.input.error('At-rule without name', token[2], token[3]);
    };

    Parser.prototype.precheckMissedSemicolon = function precheckMissedSemicolon(tokens) {
        // Hook for Safe Parser
        tokens;
    };

    Parser.prototype.checkMissedSemicolon = function checkMissedSemicolon(tokens) {
        var colon = this.colon(tokens);
        if (colon === false) return;

        var founded = 0;
        var token = void 0;
        for (var j = colon - 1; j >= 0; j--) {
            token = tokens[j];
            if (token[0] !== 'space') {
                founded += 1;
                if (founded === 2) break;
            }
        }
        throw this.input.error('Missed semicolon', token[2], token[3]);
    };

    return Parser;
}();

exports.default = Parser;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlci5lczYiXSwibmFtZXMiOlsiUGFyc2VyIiwiaW5wdXQiLCJwb3MiLCJyb290IiwiY3VycmVudCIsInNwYWNlcyIsInNlbWljb2xvbiIsInNvdXJjZSIsInN0YXJ0IiwibGluZSIsImNvbHVtbiIsInRva2VuaXplIiwidG9rZW5zIiwibG9vcCIsInRva2VuIiwibGVuZ3RoIiwiZW5kIiwiY29tbWVudCIsImF0cnVsZSIsImVtcHR5UnVsZSIsIm90aGVyIiwiZW5kRmlsZSIsIm5vZGUiLCJpbml0IiwidGV4dCIsInNsaWNlIiwidGVzdCIsInJhd3MiLCJsZWZ0IiwicmlnaHQiLCJtYXRjaCIsInNlbGVjdG9yIiwiYmV0d2VlbiIsInR5cGUiLCJjb2xvbiIsImJyYWNrZXQiLCJicmFja2V0cyIsInB1c2giLCJkZWNsIiwicnVsZSIsInBvcCIsInVuY2xvc2VkQnJhY2tldCIsInVua25vd25Xb3JkIiwic3BhY2VzQW5kQ29tbWVudHNGcm9tRW5kIiwicmF3IiwibGFzdCIsImJlZm9yZSIsInNoaWZ0IiwicHJvcCIsInNwYWNlc0FuZENvbW1lbnRzRnJvbVN0YXJ0IiwicHJlY2hlY2tNaXNzZWRTZW1pY29sb24iLCJpIiwiaW1wb3J0YW50Iiwic3RyaW5nIiwic3RyaW5nRnJvbSIsInNwYWNlc0Zyb21FbmQiLCJjYWNoZSIsInN0ciIsImoiLCJ0cmltIiwiaW5kZXhPZiIsInZhbHVlIiwiY2hlY2tNaXNzZWRTZW1pY29sb24iLCJuYW1lIiwidW5uYW1lZEF0cnVsZSIsIm9wZW4iLCJwYXJhbXMiLCJhZnRlck5hbWUiLCJub2RlcyIsImFmdGVyIiwicGFyZW50IiwidW5leHBlY3RlZENsb3NlIiwidW5jbG9zZWRCbG9jayIsImNsZWFuIiwicmVkdWNlIiwiYWxsIiwibGFzdFRva2VuVHlwZSIsIm5leHQiLCJmcm9tIiwicmVzdWx0Iiwic3BsaWNlIiwicHJldiIsImRvdWJsZUNvbG9uIiwiZXJyb3IiLCJmb3VuZGVkIl0sIm1hcHBpbmdzIjoiOzs7O0FB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Q0FBakMsRUFBMkNBLE1BQU0sQ0FBTixDQUEzQyxDQUFOO0FBQ0gsSzs7cUJBRURrRCxhLDBCQUFjMUMsSSxFQUFNUixLLEVBQU87QUFDdkIsY0FBTSxLQUFLYixLQUFMLENBQVdrRixLQUFYLENBQWlCLHNCQUFqQixFQUF5Q3JFLE1BQU0sQ0FBTixDQUF6QyxFQUFtREEsTUFBTSxDQUFOLENBQW5ELENBQU47QUFDSCxLOztxQkFFRG9DLHVCLG9DQUF3QnRDLE0sRUFBUTtBQUM1QjtBQUNBQTtBQUNILEs7O3FCQUVEa0Qsb0IsaUNBQXFCbEQsTSxFQUFRO0FBQ3pCLFlBQUlzQixRQUFRLEtBQUtBLEtBQUwsQ0FBV3RCLE1BQVgsQ0FBWjtBQUNBLFlBQUtzQixVQUFVLEtBQWYsRUFBdUI7O0FBRXZCLFlBQUlrRCxVQUFVLENBQWQ7QUFDQSxZQUFJdEUsY0FBSjtBQUNBLGFBQU0sSUFBSTRDLElBQUl4QixRQUFRLENBQXRCLEVBQXlCd0IsS0FBSyxDQUE5QixFQUFpQ0EsR0FBakMsRUFBdUM7QUFDbkM1QyxvQkFBUUYsT0FBTzhDLENBQVAsQ0FBUjtBQUNBLGdCQUFLNUMsTUFBTSxDQUFOLE1BQWEsT0FBbEIsRUFBNEI7QUFDeEJzRSwyQkFBVyxDQUFYO0FBQ0Esb0JBQUtBLFlBQVksQ0FBakIsRUFBcUI7QUFDeEI7QUFDSjtBQUNELGNBQU0sS0FBS25GLEtBQUwsQ0FBV2tGLEtBQVgsQ0FBaUIsa0JBQWpCLEVBQXFDckUsTUFBTSxDQUFOLENBQXJDLEVBQStDQSxNQUFNLENBQU4sQ0FBL0MsQ0FBTjtBQUNILEs7Ozs7O2tCQTNkZ0JkLE0iLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERlY2xhcmF0aW9uIGZyb20gJy4vZGVjbGFyYXRpb24nO1xuaW1wb3J0IHRva2VuaXplciAgIGZyb20gJy4vdG9rZW5pemUnO1xuaW1wb3J0IENvbW1lbnQgICAgIGZyb20gJy4vY29tbWVudCc7XG5pbXBvcnQgQXRSdWxlICAgICAgZnJvbSAnLi9hdC1ydWxlJztcbmltcG9ydCBSb290ICAgICAgICBmcm9tICcuL3Jvb3QnO1xuaW1wb3J0IFJ1bGUgICAgICAgIGZyb20gJy4vcnVsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnNlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihpbnB1dCkge1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG5cbiAgICAgICAgdGhpcy5wb3MgICAgICAgPSAwO1xuICAgICAgICB0aGlzLnJvb3QgICAgICA9IG5ldyBSb290KCk7XG4gICAgICAgIHRoaXMuY3VycmVudCAgID0gdGhpcy5yb290O1xuICAgICAgICB0aGlzLnNwYWNlcyAgICA9ICcnO1xuICAgICAgICB0aGlzLnNlbWljb2xvbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMucm9vdC5zb3VyY2UgPSB7IGlucHV0LCBzdGFydDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSB9O1xuICAgIH1cblxuICAgIHRva2VuaXplKCkge1xuICAgICAgICB0aGlzLnRva2VucyA9IHRva2VuaXplcih0aGlzLmlucHV0KTtcbiAgICB9XG5cbiAgICBsb29wKCkge1xuICAgICAgICBsZXQgdG9rZW47XG4gICAgICAgIHdoaWxlICggdGhpcy5wb3MgPCB0aGlzLnRva2Vucy5sZW5ndGggKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHRoaXMudG9rZW5zW3RoaXMucG9zXTtcblxuICAgICAgICAgICAgc3dpdGNoICggdG9rZW5bMF0gKSB7XG5cbiAgICAgICAgICAgIGNhc2UgJ3NwYWNlJzpcbiAgICAgICAgICAgIGNhc2UgJzsnOlxuICAgICAgICAgICAgICAgIHRoaXMuc3BhY2VzICs9IHRva2VuWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd9JzpcbiAgICAgICAgICAgICAgICB0aGlzLmVuZCh0b2tlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2NvbW1lbnQnOlxuICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudCh0b2tlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2F0LXdvcmQnOlxuICAgICAgICAgICAgICAgIHRoaXMuYXRydWxlKHRva2VuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAneyc6XG4gICAgICAgICAgICAgICAgdGhpcy5lbXB0eVJ1bGUodG9rZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMub3RoZXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuZEZpbGUoKTtcbiAgICB9XG5cbiAgICBjb21tZW50KHRva2VuKSB7XG4gICAgICAgIGxldCBub2RlID0gbmV3IENvbW1lbnQoKTtcbiAgICAgICAgdGhpcy5pbml0KG5vZGUsIHRva2VuWzJdLCB0b2tlblszXSk7XG4gICAgICAgIG5vZGUuc291cmNlLmVuZCA9IHsgbGluZTogdG9rZW5bNF0sIGNvbHVtbjogdG9rZW5bNV0gfTtcblxuICAgICAgICBsZXQgdGV4dCA9IHRva2VuWzFdLnNsaWNlKDIsIC0yKTtcbiAgICAgICAgaWYgKCAvXlxccyokLy50ZXN0KHRleHQpICkge1xuICAgICAgICAgICAgbm9kZS50ZXh0ICAgICAgID0gJyc7XG4gICAgICAgICAgICBub2RlLnJhd3MubGVmdCAgPSB0ZXh0O1xuICAgICAgICAgICAgbm9kZS5yYXdzLnJpZ2h0ID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSB0ZXh0Lm1hdGNoKC9eKFxccyopKFteXSpbXlxcc10pKFxccyopJC8pO1xuICAgICAgICAgICAgbm9kZS50ZXh0ICAgICAgID0gbWF0Y2hbMl07XG4gICAgICAgICAgICBub2RlLnJhd3MubGVmdCAgPSBtYXRjaFsxXTtcbiAgICAgICAgICAgIG5vZGUucmF3cy5yaWdodCA9IG1hdGNoWzNdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW1wdHlSdWxlKHRva2VuKSB7XG4gICAgICAgIGxldCBub2RlID0gbmV3IFJ1bGUoKTtcbiAgICAgICAgdGhpcy5pbml0KG5vZGUsIHRva2VuWzJdLCB0b2tlblszXSk7XG4gICAgICAgIG5vZGUuc2VsZWN0b3IgPSAnJztcbiAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gPSAnJztcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbm9kZTtcbiAgICB9XG5cbiAgICBvdGhlcigpIHtcbiAgICAgICAgbGV0IHRva2VuO1xuICAgICAgICBsZXQgZW5kICAgICAgPSBmYWxzZTtcbiAgICAgICAgbGV0IHR5cGUgICAgID0gbnVsbDtcbiAgICAgICAgbGV0IGNvbG9uICAgID0gZmFsc2U7XG4gICAgICAgIGxldCBicmFja2V0ICA9IG51bGw7XG4gICAgICAgIGxldCBicmFja2V0cyA9IFtdO1xuXG4gICAgICAgIGxldCBzdGFydCA9IHRoaXMucG9zO1xuICAgICAgICB3aGlsZSAoIHRoaXMucG9zIDwgdGhpcy50b2tlbnMubGVuZ3RoICkge1xuICAgICAgICAgICAgdG9rZW4gPSB0aGlzLnRva2Vuc1t0aGlzLnBvc107XG4gICAgICAgICAgICB0eXBlICA9IHRva2VuWzBdO1xuXG4gICAgICAgICAgICBpZiAoIHR5cGUgPT09ICcoJyB8fCB0eXBlID09PSAnWycgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhYnJhY2tldCApIGJyYWNrZXQgPSB0b2tlbjtcbiAgICAgICAgICAgICAgICBicmFja2V0cy5wdXNoKHR5cGUgPT09ICcoJyA/ICcpJyA6ICddJyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGJyYWNrZXRzLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICAgICAgICAgICBpZiAoIHR5cGUgPT09ICc7JyApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBjb2xvbiApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjbCh0aGlzLnRva2Vucy5zbGljZShzdGFydCwgdGhpcy5wb3MgKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggdHlwZSA9PT0gJ3snICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bGUodGhpcy50b2tlbnMuc2xpY2Uoc3RhcnQsIHRoaXMucG9zICsgMSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSAnfScgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zIC09IDE7XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggdHlwZSA9PT0gJzonICkge1xuICAgICAgICAgICAgICAgICAgICBjb2xvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSBicmFja2V0c1ticmFja2V0cy5sZW5ndGggLSAxXSApIHtcbiAgICAgICAgICAgICAgICBicmFja2V0cy5wb3AoKTtcbiAgICAgICAgICAgICAgICBpZiAoIGJyYWNrZXRzLmxlbmd0aCA9PT0gMCApIGJyYWNrZXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICggdGhpcy5wb3MgPT09IHRoaXMudG9rZW5zLmxlbmd0aCApIHtcbiAgICAgICAgICAgIHRoaXMucG9zIC09IDE7XG4gICAgICAgICAgICBlbmQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBicmFja2V0cy5sZW5ndGggPiAwICkgdGhpcy51bmNsb3NlZEJyYWNrZXQoYnJhY2tldCk7XG5cbiAgICAgICAgaWYgKCBlbmQgJiYgY29sb24gKSB7XG4gICAgICAgICAgICB3aGlsZSAoIHRoaXMucG9zID4gc3RhcnQgKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSB0aGlzLnRva2Vuc1t0aGlzLnBvc11bMF07XG4gICAgICAgICAgICAgICAgaWYgKCB0b2tlbiAhPT0gJ3NwYWNlJyAmJiB0b2tlbiAhPT0gJ2NvbW1lbnQnICkgYnJlYWs7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3MgLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGVjbCh0aGlzLnRva2Vucy5zbGljZShzdGFydCwgdGhpcy5wb3MgKyAxKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVua25vd25Xb3JkKHN0YXJ0KTtcbiAgICB9XG5cbiAgICBydWxlKHRva2Vucykge1xuICAgICAgICB0b2tlbnMucG9wKCk7XG5cbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgUnVsZSgpO1xuICAgICAgICB0aGlzLmluaXQobm9kZSwgdG9rZW5zWzBdWzJdLCB0b2tlbnNbMF1bM10pO1xuXG4gICAgICAgIG5vZGUucmF3cy5iZXR3ZWVuID0gdGhpcy5zcGFjZXNBbmRDb21tZW50c0Zyb21FbmQodG9rZW5zKTtcbiAgICAgICAgdGhpcy5yYXcobm9kZSwgJ3NlbGVjdG9yJywgdG9rZW5zKTtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbm9kZTtcbiAgICB9XG5cbiAgICBkZWNsKHRva2Vucykge1xuICAgICAgICBsZXQgbm9kZSA9IG5ldyBEZWNsYXJhdGlvbigpO1xuICAgICAgICB0aGlzLmluaXQobm9kZSk7XG5cbiAgICAgICAgbGV0IGxhc3QgPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoIGxhc3RbMF0gPT09ICc7JyApIHtcbiAgICAgICAgICAgIHRoaXMuc2VtaWNvbG9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRva2Vucy5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIGxhc3RbNF0gKSB7XG4gICAgICAgICAgICBub2RlLnNvdXJjZS5lbmQgPSB7IGxpbmU6IGxhc3RbNF0sIGNvbHVtbjogbGFzdFs1XSB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5zb3VyY2UuZW5kID0geyBsaW5lOiBsYXN0WzJdLCBjb2x1bW46IGxhc3RbM10gfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlICggdG9rZW5zWzBdWzBdICE9PSAnd29yZCcgKSB7XG4gICAgICAgICAgICBub2RlLnJhd3MuYmVmb3JlICs9IHRva2Vucy5zaGlmdCgpWzFdO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUuc291cmNlLnN0YXJ0ID0geyBsaW5lOiB0b2tlbnNbMF1bMl0sIGNvbHVtbjogdG9rZW5zWzBdWzNdIH07XG5cbiAgICAgICAgbm9kZS5wcm9wID0gJyc7XG4gICAgICAgIHdoaWxlICggdG9rZW5zLmxlbmd0aCApIHtcbiAgICAgICAgICAgIGxldCB0eXBlID0gdG9rZW5zWzBdWzBdO1xuICAgICAgICAgICAgaWYgKCB0eXBlID09PSAnOicgfHwgdHlwZSA9PT0gJ3NwYWNlJyB8fCB0eXBlID09PSAnY29tbWVudCcgKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLnByb3AgKz0gdG9rZW5zLnNoaWZ0KClbMV07XG4gICAgICAgIH1cblxuICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiA9ICcnO1xuXG4gICAgICAgIGxldCB0b2tlbjtcbiAgICAgICAgd2hpbGUgKCB0b2tlbnMubGVuZ3RoICkge1xuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnMuc2hpZnQoKTtcblxuICAgICAgICAgICAgaWYgKCB0b2tlblswXSA9PT0gJzonICkge1xuICAgICAgICAgICAgICAgIG5vZGUucmF3cy5iZXR3ZWVuICs9IHRva2VuWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiArPSB0b2tlblsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggbm9kZS5wcm9wWzBdID09PSAnXycgfHwgbm9kZS5wcm9wWzBdID09PSAnKicgKSB7XG4gICAgICAgICAgICBub2RlLnJhd3MuYmVmb3JlICs9IG5vZGUucHJvcFswXTtcbiAgICAgICAgICAgIG5vZGUucHJvcCA9IG5vZGUucHJvcC5zbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiArPSB0aGlzLnNwYWNlc0FuZENvbW1lbnRzRnJvbVN0YXJ0KHRva2Vucyk7XG4gICAgICAgIHRoaXMucHJlY2hlY2tNaXNzZWRTZW1pY29sb24odG9rZW5zKTtcblxuICAgICAgICBmb3IgKCBsZXQgaSA9IHRva2Vucy5sZW5ndGggLSAxOyBpID4gMDsgaS0tICkge1xuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICBpZiAoIHRva2VuWzFdID09PSAnIWltcG9ydGFudCcgKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5pbXBvcnRhbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBzdHJpbmcgPSB0aGlzLnN0cmluZ0Zyb20odG9rZW5zLCBpKTtcbiAgICAgICAgICAgICAgICBzdHJpbmcgPSB0aGlzLnNwYWNlc0Zyb21FbmQodG9rZW5zKSArIHN0cmluZztcbiAgICAgICAgICAgICAgICBpZiAoIHN0cmluZyAhPT0gJyAhaW1wb3J0YW50JyApIG5vZGUucmF3cy5pbXBvcnRhbnQgPSBzdHJpbmc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW5bMV0gPT09ICdpbXBvcnRhbnQnKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhY2hlID0gdG9rZW5zLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgIGxldCBzdHIgICA9ICcnO1xuICAgICAgICAgICAgICAgIGZvciAoIGxldCBqID0gaTsgaiA+IDA7IGotLSApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGUgPSBjYWNoZVtqXVswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBzdHIudHJpbSgpLmluZGV4T2YoJyEnKSA9PT0gMCAmJiB0eXBlICE9PSAnc3BhY2UnICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3RyID0gY2FjaGUucG9wKClbMV0gKyBzdHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICggc3RyLnRyaW0oKS5pbmRleE9mKCchJykgPT09IDAgKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuaW1wb3J0YW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yYXdzLmltcG9ydGFudCA9IHN0cjtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5zID0gY2FjaGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHRva2VuWzBdICE9PSAnc3BhY2UnICYmIHRva2VuWzBdICE9PSAnY29tbWVudCcgKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJhdyhub2RlLCAndmFsdWUnLCB0b2tlbnMpO1xuXG4gICAgICAgIGlmICggbm9kZS52YWx1ZS5pbmRleE9mKCc6JykgIT09IC0xICkgdGhpcy5jaGVja01pc3NlZFNlbWljb2xvbih0b2tlbnMpO1xuICAgIH1cblxuICAgIGF0cnVsZSh0b2tlbikge1xuICAgICAgICBsZXQgbm9kZSAgPSBuZXcgQXRSdWxlKCk7XG4gICAgICAgIG5vZGUubmFtZSA9IHRva2VuWzFdLnNsaWNlKDEpO1xuICAgICAgICBpZiAoIG5vZGUubmFtZSA9PT0gJycgKSB7XG4gICAgICAgICAgICB0aGlzLnVubmFtZWRBdHJ1bGUobm9kZSwgdG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdChub2RlLCB0b2tlblsyXSwgdG9rZW5bM10pO1xuXG4gICAgICAgIGxldCBsYXN0ICAgPSBmYWxzZTtcbiAgICAgICAgbGV0IG9wZW4gICA9IGZhbHNlO1xuICAgICAgICBsZXQgcGFyYW1zID0gW107XG5cbiAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgd2hpbGUgKCB0aGlzLnBvcyA8IHRoaXMudG9rZW5zLmxlbmd0aCApIHtcbiAgICAgICAgICAgIHRva2VuID0gdGhpcy50b2tlbnNbdGhpcy5wb3NdO1xuXG4gICAgICAgICAgICBpZiAoIHRva2VuWzBdID09PSAnOycgKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zb3VyY2UuZW5kID0geyBsaW5lOiB0b2tlblsyXSwgY29sdW1uOiB0b2tlblszXSB9O1xuICAgICAgICAgICAgICAgIHRoaXMuc2VtaWNvbG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHRva2VuWzBdID09PSAneycgKSB7XG4gICAgICAgICAgICAgICAgb3BlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB0b2tlblswXSA9PT0gJ30nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmQodG9rZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMucHVzaCh0b2tlbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB0aGlzLnBvcyA9PT0gdGhpcy50b2tlbnMubGVuZ3RoICkge1xuICAgICAgICAgICAgbGFzdCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiA9IHRoaXMuc3BhY2VzQW5kQ29tbWVudHNGcm9tRW5kKHBhcmFtcyk7XG4gICAgICAgIGlmICggcGFyYW1zLmxlbmd0aCApIHtcbiAgICAgICAgICAgIG5vZGUucmF3cy5hZnRlck5hbWUgPSB0aGlzLnNwYWNlc0FuZENvbW1lbnRzRnJvbVN0YXJ0KHBhcmFtcyk7XG4gICAgICAgICAgICB0aGlzLnJhdyhub2RlLCAncGFyYW1zJywgcGFyYW1zKTtcbiAgICAgICAgICAgIGlmICggbGFzdCApIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IHBhcmFtc1twYXJhbXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgbm9kZS5zb3VyY2UuZW5kICAgPSB7IGxpbmU6IHRva2VuWzRdLCBjb2x1bW46IHRva2VuWzVdIH07XG4gICAgICAgICAgICAgICAgdGhpcy5zcGFjZXMgICAgICAgPSBub2RlLnJhd3MuYmV0d2VlbjtcbiAgICAgICAgICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5yYXdzLmFmdGVyTmFtZSA9ICcnO1xuICAgICAgICAgICAgbm9kZS5wYXJhbXMgICAgICAgICA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBvcGVuICkge1xuICAgICAgICAgICAgbm9kZS5ub2RlcyAgID0gW107XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBub2RlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW5kKHRva2VuKSB7XG4gICAgICAgIGlmICggdGhpcy5jdXJyZW50Lm5vZGVzICYmIHRoaXMuY3VycmVudC5ub2Rlcy5sZW5ndGggKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQucmF3cy5zZW1pY29sb24gPSB0aGlzLnNlbWljb2xvbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbWljb2xvbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuY3VycmVudC5yYXdzLmFmdGVyID0gKHRoaXMuY3VycmVudC5yYXdzLmFmdGVyIHx8ICcnKSArIHRoaXMuc3BhY2VzO1xuICAgICAgICB0aGlzLnNwYWNlcyA9ICcnO1xuXG4gICAgICAgIGlmICggdGhpcy5jdXJyZW50LnBhcmVudCApIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5zb3VyY2UuZW5kID0geyBsaW5lOiB0b2tlblsyXSwgY29sdW1uOiB0b2tlblszXSB9O1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5jdXJyZW50LnBhcmVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudW5leHBlY3RlZENsb3NlKHRva2VuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVuZEZpbGUoKSB7XG4gICAgICAgIGlmICggdGhpcy5jdXJyZW50LnBhcmVudCApIHRoaXMudW5jbG9zZWRCbG9jaygpO1xuICAgICAgICBpZiAoIHRoaXMuY3VycmVudC5ub2RlcyAmJiB0aGlzLmN1cnJlbnQubm9kZXMubGVuZ3RoICkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50LnJhd3Muc2VtaWNvbG9uID0gdGhpcy5zZW1pY29sb247XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50LnJhd3MuYWZ0ZXIgPSAodGhpcy5jdXJyZW50LnJhd3MuYWZ0ZXIgfHwgJycpICsgdGhpcy5zcGFjZXM7XG4gICAgfVxuXG4gICAgLy8gSGVscGVyc1xuXG4gICAgaW5pdChub2RlLCBsaW5lLCBjb2x1bW4pIHtcbiAgICAgICAgdGhpcy5jdXJyZW50LnB1c2gobm9kZSk7XG5cbiAgICAgICAgbm9kZS5zb3VyY2UgPSB7IHN0YXJ0OiB7IGxpbmUsIGNvbHVtbiB9LCBpbnB1dDogdGhpcy5pbnB1dCB9O1xuICAgICAgICBub2RlLnJhd3MuYmVmb3JlID0gdGhpcy5zcGFjZXM7XG4gICAgICAgIHRoaXMuc3BhY2VzID0gJyc7XG4gICAgICAgIGlmICggbm9kZS50eXBlICE9PSAnY29tbWVudCcgKSB0aGlzLnNlbWljb2xvbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJhdyhub2RlLCBwcm9wLCB0b2tlbnMpIHtcbiAgICAgICAgbGV0IHRva2VuLCB0eXBlO1xuICAgICAgICBsZXQgbGVuZ3RoID0gdG9rZW5zLmxlbmd0aDtcbiAgICAgICAgbGV0IHZhbHVlICA9ICcnO1xuICAgICAgICBsZXQgY2xlYW4gID0gdHJ1ZTtcbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEgKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIHR5cGUgID0gdG9rZW5bMF07XG4gICAgICAgICAgICBpZiAoIHR5cGUgPT09ICdjb21tZW50JyB8fCB0eXBlID09PSAnc3BhY2UnICYmIGkgPT09IGxlbmd0aCAtIDEgKSB7XG4gICAgICAgICAgICAgICAgY2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gdG9rZW5bMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCAhY2xlYW4gKSB7XG4gICAgICAgICAgICBsZXQgcmF3ID0gdG9rZW5zLnJlZHVjZSggKGFsbCwgaSkgPT4gYWxsICsgaVsxXSwgJycpO1xuICAgICAgICAgICAgbm9kZS5yYXdzW3Byb3BdID0geyB2YWx1ZSwgcmF3IH07XG4gICAgICAgIH1cbiAgICAgICAgbm9kZVtwcm9wXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHNwYWNlc0FuZENvbW1lbnRzRnJvbUVuZCh0b2tlbnMpIHtcbiAgICAgICAgbGV0IGxhc3RUb2tlblR5cGU7XG4gICAgICAgIGxldCBzcGFjZXMgPSAnJztcbiAgICAgICAgd2hpbGUgKCB0b2tlbnMubGVuZ3RoICkge1xuICAgICAgICAgICAgbGFzdFRva2VuVHlwZSA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV1bMF07XG4gICAgICAgICAgICBpZiAoIGxhc3RUb2tlblR5cGUgIT09ICdzcGFjZScgJiZcbiAgICAgICAgICAgICAgICBsYXN0VG9rZW5UeXBlICE9PSAnY29tbWVudCcgKSBicmVhaztcbiAgICAgICAgICAgIHNwYWNlcyA9IHRva2Vucy5wb3AoKVsxXSArIHNwYWNlcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BhY2VzO1xuICAgIH1cblxuICAgIHNwYWNlc0FuZENvbW1lbnRzRnJvbVN0YXJ0KHRva2Vucykge1xuICAgICAgICBsZXQgbmV4dDtcbiAgICAgICAgbGV0IHNwYWNlcyA9ICcnO1xuICAgICAgICB3aGlsZSAoIHRva2Vucy5sZW5ndGggKSB7XG4gICAgICAgICAgICBuZXh0ID0gdG9rZW5zWzBdWzBdO1xuICAgICAgICAgICAgaWYgKCBuZXh0ICE9PSAnc3BhY2UnICYmIG5leHQgIT09ICdjb21tZW50JyApIGJyZWFrO1xuICAgICAgICAgICAgc3BhY2VzICs9IHRva2Vucy5zaGlmdCgpWzFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGFjZXM7XG4gICAgfVxuXG4gICAgc3BhY2VzRnJvbUVuZCh0b2tlbnMpIHtcbiAgICAgICAgbGV0IGxhc3RUb2tlblR5cGU7XG4gICAgICAgIGxldCBzcGFjZXMgPSAnJztcbiAgICAgICAgd2hpbGUgKCB0b2tlbnMubGVuZ3RoICkge1xuICAgICAgICAgICAgbGFzdFRva2VuVHlwZSA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV1bMF07XG4gICAgICAgICAgICBpZiAoIGxhc3RUb2tlblR5cGUgIT09ICdzcGFjZScgKSBicmVhaztcbiAgICAgICAgICAgIHNwYWNlcyA9IHRva2Vucy5wb3AoKVsxXSArIHNwYWNlcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BhY2VzO1xuICAgIH1cblxuICAgIHN0cmluZ0Zyb20odG9rZW5zLCBmcm9tKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgZm9yICggbGV0IGkgPSBmcm9tOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IHRva2Vuc1tpXVsxXTtcbiAgICAgICAgfVxuICAgICAgICB0b2tlbnMuc3BsaWNlKGZyb20sIHRva2Vucy5sZW5ndGggLSBmcm9tKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjb2xvbih0b2tlbnMpIHtcbiAgICAgICAgbGV0IGJyYWNrZXRzID0gMDtcbiAgICAgICAgbGV0IHRva2VuLCB0eXBlLCBwcmV2O1xuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIHR5cGUgID0gdG9rZW5bMF07XG5cbiAgICAgICAgICAgIGlmICggdHlwZSA9PT0gJygnICkge1xuICAgICAgICAgICAgICAgIGJyYWNrZXRzICs9IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSAnKScgKSB7XG4gICAgICAgICAgICAgICAgYnJhY2tldHMgLT0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGJyYWNrZXRzID09PSAwICYmIHR5cGUgPT09ICc6JyApIHtcbiAgICAgICAgICAgICAgICBpZiAoICFwcmV2ICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvdWJsZUNvbG9uKHRva2VuKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBwcmV2WzBdID09PSAnd29yZCcgJiYgcHJldlsxXSA9PT0gJ3Byb2dpZCcgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJldiA9IHRva2VuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBFcnJvcnNcblxuICAgIHVuY2xvc2VkQnJhY2tldChicmFja2V0KSB7XG4gICAgICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoJ1VuY2xvc2VkIGJyYWNrZXQnLCBicmFja2V0WzJdLCBicmFja2V0WzNdKTtcbiAgICB9XG5cbiAgICB1bmtub3duV29yZChzdGFydCkge1xuICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLnRva2Vuc1tzdGFydF07XG4gICAgICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoJ1Vua25vd24gd29yZCcsIHRva2VuWzJdLCB0b2tlblszXSk7XG4gICAgfVxuXG4gICAgdW5leHBlY3RlZENsb3NlKHRva2VuKSB7XG4gICAgICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoJ1VuZXhwZWN0ZWQgfScsIHRva2VuWzJdLCB0b2tlblszXSk7XG4gICAgfVxuXG4gICAgdW5jbG9zZWRCbG9jaygpIHtcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuY3VycmVudC5zb3VyY2Uuc3RhcnQ7XG4gICAgICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoJ1VuY2xvc2VkIGJsb2NrJywgcG9zLmxpbmUsIHBvcy5jb2x1bW4pO1xuICAgIH1cblxuICAgIGRvdWJsZUNvbG9uKHRva2VuKSB7XG4gICAgICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoJ0RvdWJsZSBjb2xvbicsIHRva2VuWzJdLCB0b2tlblszXSk7XG4gICAgfVxuXG4gICAgdW5uYW1lZEF0cnVsZShub2RlLCB0b2tlbikge1xuICAgICAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKCdBdC1ydWxlIHdpdGhvdXQgbmFtZScsIHRva2VuWzJdLCB0b2tlblszXSk7XG4gICAgfVxuXG4gICAgcHJlY2hlY2tNaXNzZWRTZW1pY29sb24odG9rZW5zKSB7XG4gICAgICAgIC8vIEhvb2sgZm9yIFNhZmUgUGFyc2VyXG4gICAgICAgIHRva2VucztcbiAgICB9XG5cbiAgICBjaGVja01pc3NlZFNlbWljb2xvbih0b2tlbnMpIHtcbiAgICAgICAgbGV0IGNvbG9uID0gdGhpcy5jb2xvbih0b2tlbnMpO1xuICAgICAgICBpZiAoIGNvbG9uID09PSBmYWxzZSApIHJldHVybjtcblxuICAgICAgICBsZXQgZm91bmRlZCA9IDA7XG4gICAgICAgIGxldCB0b2tlbjtcbiAgICAgICAgZm9yICggbGV0IGogPSBjb2xvbiAtIDE7IGogPj0gMDsgai0tICkge1xuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbal07XG4gICAgICAgICAgICBpZiAoIHRva2VuWzBdICE9PSAnc3BhY2UnICkge1xuICAgICAgICAgICAgICAgIGZvdW5kZWQgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAoIGZvdW5kZWQgPT09IDIgKSBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKCdNaXNzZWQgc2VtaWNvbG9uJywgdG9rZW5bMl0sIHRva2VuWzNdKTtcbiAgICB9XG5cbn1cbiJdfQ==
