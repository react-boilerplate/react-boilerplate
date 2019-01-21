'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _comment = require('postcss/lib/comment');

var _comment2 = _interopRequireDefault(_comment);

var _import2 = require('./import');

var _import3 = _interopRequireDefault(_import2);

var _parser = require('postcss/lib/parser');

var _parser2 = _interopRequireDefault(_parser);

var _rule = require('./rule');

var _rule2 = _interopRequireDefault(_rule);

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

var _findExtendRule = require('./find-extend-rule');

var _findExtendRule2 = _interopRequireDefault(_findExtendRule);

var _isMixinToken = require('./is-mixin-token');

var _isMixinToken2 = _interopRequireDefault(_isMixinToken);

var _lessTokenize = require('./less-tokenize');

var _lessTokenize2 = _interopRequireDefault(_lessTokenize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var blockCommentEndPattern = /\*\/$/;

var LessParser = function (_Parser) {
  _inherits(LessParser, _Parser);

  function LessParser(input) {
    _classCallCheck(this, LessParser);

    var _this = _possibleConstructorReturn(this, (LessParser.__proto__ || Object.getPrototypeOf(LessParser)).call(this, input));

    _this.root = new _root2.default();
    _this.current = _this.root;
    _this.root.source = { input: input, start: { line: 1, column: 1 } };
    return _this;
  }

  _createClass(LessParser, [{
    key: 'atrule',
    value: function atrule(token) {
      if (token[1] === '@import') {
        this.import(token);
      } else {
        _get(LessParser.prototype.__proto__ || Object.getPrototypeOf(LessParser.prototype), 'atrule', this).call(this, token);
      }
    }
  }, {
    key: 'comment',
    value: function comment(token) {
      var node = new _comment2.default();
      var content = token[1];
      var text = content.slice(2).replace(blockCommentEndPattern, '');

      this.init(node, token[2], token[3]);
      node.source.end = {
        line: token[4],
        column: token[5]
      };

      node.raws.content = content;
      node.raws.begin = content[0] + content[1];
      node.inline = token[6] === 'inline';
      node.block = !node.inline;

      if (/^\s*$/.test(text)) {
        node.text = '';
        node.raws.left = text;
        node.raws.right = '';
      } else {
        var match = text.match(/^(\s*)([^]*[^\s])(\s*)$/);

        node.text = match[2];

        // Add extra spaces to generate a comment in a common style /*[space][text][space]*/
        node.raws.left = match[1] || ' ';
        node.raws.right = match[3] || ' ';
      }
    }

    /**
     * @description Create a Declaration
     * @param options {{start: number}}
     */

  }, {
    key: 'createDeclaration',
    value: function createDeclaration(options) {
      this.decl(this.tokens.slice(options.start, this.pos + 1));
    }

    /**
     * @description Create a Rule node
     * @param options {{start: number, params: Array}}
     */

  }, {
    key: 'createRule',
    value: function createRule(options) {

      var semi = this.tokens[this.pos][0] === ';';
      var end = this.pos + (options.empty && semi ? 2 : 1);
      var tokens = this.tokens.slice(options.start, end);
      var node = this.rule(tokens);

      /**
       * By default in PostCSS `Rule.params` is `undefined`.
       * To preserve compability with PostCSS:
       *  - Don't set empty params for a Rule.
       *  - Set params for a Rule only if it can be a mixin or &:extend rule.
       */
      if (options.params[0] && (options.mixin || options.extend)) {
        this.raw(node, 'params', options.params);
      }

      if (options.empty) {
        // if it's an empty mixin or extend, it must have a semicolon
        // (that's the only way we get to this point)
        if (semi) {
          node.raws.semicolon = this.semicolon = true;
          node.selector = node.selector.replace(/;$/, '');
        }

        if (options.extend) {
          node.extend = true;
        }

        if (options.mixin) {
          node.mixin = true;
        }

        /**
         * @description Mark mixin without declarations.
         * @type {boolean}
         */
        node.empty = true;

        // eslint-disable-next-line
        delete this.current.nodes;

        if (/!\s*important/i.test(node.selector)) {
          node.important = true;

          if (/\s*!\s*important/i.test(node.selector)) {
            node.raws.important = node.selector.match(/(\s*!\s*important)/i)[1];
          }

          node.selector = node.selector.replace(/\s*!\s*important/i, '');
        }

        // rules don't have trailing semicolons in vanilla css, so they get
        // added to this.spaces by the parser loop, so don't step back.
        if (!semi) {
          this.pos--;
        }

        this.end(this.tokens[this.pos]);
      }
    }
  }, {
    key: 'end',
    value: function end(token) {
      var node = this.current;

      // if a Rule contains other Rules (mixins, extends) and those have
      // semicolons, assert that the parent Rule has a semicolon
      if (node.nodes && node.nodes.length && node.last.raws.semicolon && !node.last.nodes) {
        this.semicolon = true;
      }

      _get(LessParser.prototype.__proto__ || Object.getPrototypeOf(LessParser.prototype), 'end', this).call(this, token);
    }
  }, {
    key: 'import',
    value: function _import(token) {
      /* eslint complexity: 0 */
      var last = false,
          open = false,
          end = { line: 0, column: 0 };

      var directives = [];
      var node = new _import3.default();

      node.name = token[1].slice(1);

      this.init(node, token[2], token[3]);

      this.pos += 1;

      while (this.pos < this.tokens.length) {
        var tokn = this.tokens[this.pos];

        if (tokn[0] === ';') {
          end = { line: tokn[2], column: tokn[3] };
          node.raws.semicolon = true;
          break;
        } else if (tokn[0] === '{') {
          open = true;
          break;
        } else if (tokn[0] === '}') {
          this.end(tokn);
          break;
        } else if (tokn[0] === 'brackets') {
          if (node.urlFunc) {
            node.importPath = tokn[1].replace(/[()]/g, '');
          } else {
            directives.push(tokn);
          }
        } else if (tokn[0] === 'space') {
          if (directives.length) {
            node.raws.between = tokn[1];
          } else if (node.urlFunc) {
            node.raws.beforeUrl = tokn[1];
          } else if (node.importPath) {
            if (node.urlFunc) {
              node.raws.afterUrl = tokn[1];
            } else {
              node.raws.after = tokn[1];
            }
          } else {
            node.raws.afterName = tokn[1];
          }
        } else if (tokn[0] === 'word' && tokn[1] === 'url') {
          node.urlFunc = true;
        } else {
          if (tokn[0] !== '(' && tokn[0] !== ')') {
            node.importPath = tokn[1];
          }
        }

        if (this.pos === this.tokens.length) {
          last = true;
          break;
        }

        this.pos += 1;
      }

      if (node.raws.between && !node.raws.afterName) {
        node.raws.afterName = node.raws.between;
        node.raws.between = '';
      }

      node.source.end = end;

      if (directives.length) {
        this.raw(node, 'directives', directives);

        if (last) {
          token = directives[directives.length - 1];
          node.source.end = { line: token[4], column: token[5] };
          this.spaces = node.raws.between;
          node.raws.between = '';
        }
      } else {
        node.directives = '';
      }

      if (open) {
        node.nodes = [];
        this.current = node;
      }
    }

    /* eslint-disable max-statements, complexity */

  }, {
    key: 'other',
    value: function other() {
      var brackets = [];
      var params = [];
      var start = this.pos;

      var end = false,
          colon = false,
          bracket = null;

      // we need pass "()" as spaces
      // However we can override method Parser.loop, but it seems less maintainable
      if (this.tokens[start][0] === 'brackets') {
        this.spaces += this.tokens[start][1];
        return;
      }

      var mixin = (0, _isMixinToken2.default)(this.tokens[start]);
      var extend = Boolean((0, _findExtendRule2.default)(this.tokens, start));

      while (this.pos < this.tokens.length) {
        var token = this.tokens[this.pos];
        var type = token[0];

        if (type === '(' || type === '[') {
          if (!bracket) {
            bracket = token;
          }

          brackets.push(type === '(' ? ')' : ']');
        } else if (brackets.length === 0) {
          if (type === ';') {
            var foundEndOfRule = this.ruleEnd({
              start: start,
              params: params,
              colon: colon,
              mixin: mixin,
              extend: extend
            });

            if (foundEndOfRule) {
              return;
            }

            break;
          } else if (type === '{') {
            this.createRule({ start: start, params: params, mixin: mixin });
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
          if (brackets.length === 0) {
            bracket = null;
          }
        }

        // we don't want to add params for pseudo-selectors that utilize parens (#56)
        // if ((extend || !colon) && (brackets.length > 0 || type === 'brackets' || params[0])) {
        //   params.push(token);
        // }

        // we don't want to add params for pseudo-selectors that utilize parens (#56) or bracket selectors (#96)
        if ((extend || !colon) && (brackets.length > 0 || type === 'brackets' || params[0]) && brackets[0] !== ']') {
          params.push(token);
        }

        this.pos += 1;
      }

      if (this.pos === this.tokens.length) {
        this.pos -= 1;
        end = true;
      }

      if (brackets.length > 0) {
        this.unclosedBracket(bracket);
      }

      // dont process an end of rule if there's only one token and it's unknown (#64)
      if (end && this.tokens.length > 1) {
        // Handle the case where the there is only a single token in the end rule.
        if (start === this.pos) {
          this.pos += 1;
        }

        var _foundEndOfRule = this.ruleEnd({
          start: start,
          params: params,
          colon: colon,
          mixin: mixin,
          extend: extend,
          isEndOfBlock: true
        });

        if (_foundEndOfRule) {
          return;
        }
      }

      this.unknownWord(start);
    }
  }, {
    key: 'rule',
    value: function rule(tokens) {
      tokens.pop();

      var node = new _rule2.default();

      this.init(node, tokens[0][2], tokens[0][3]);

      //node.raws.between = this.spacesFromEnd(tokens);
      node.raws.between = this.spacesAndCommentsFromEnd(tokens);

      this.raw(node, 'selector', tokens);
      this.current = node;

      return node;
    }
  }, {
    key: 'ruleEnd',
    value: function ruleEnd(options) {
      var start = options.start;


      if (options.extend || options.mixin) {
        this.createRule(Object.assign(options, { empty: true }));
        return true;
      }

      if (options.colon) {
        if (options.isEndOfBlock) {
          while (this.pos > start) {
            var token = this.tokens[this.pos][0];

            if (token !== 'space' && token !== 'comment') {
              break;
            }

            this.pos -= 1;
          }
        }

        this.createDeclaration({ start: start });
        return true;
      }

      return false;
    }
  }, {
    key: 'tokenize',
    value: function tokenize() {
      this.tokens = (0, _lessTokenize2.default)(this.input);
    }

    /* eslint-enable max-statements, complexity */

  }]);

  return LessParser;
}(_parser2.default);

exports.default = LessParser;
module.exports = exports['default'];