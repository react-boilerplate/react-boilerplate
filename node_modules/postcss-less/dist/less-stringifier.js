'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _stringifier = require('postcss/lib/stringifier');

var _stringifier2 = _interopRequireDefault(_stringifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LessStringifier = function (_Stringifier) {
  _inherits(LessStringifier, _Stringifier);

  function LessStringifier() {
    _classCallCheck(this, LessStringifier);

    return _possibleConstructorReturn(this, (LessStringifier.__proto__ || Object.getPrototypeOf(LessStringifier)).apply(this, arguments));
  }

  _createClass(LessStringifier, [{
    key: 'comment',
    value: function comment(node) {
      this.builder(node.raws.content, node);
    }
  }, {
    key: 'import',
    value: function _import(node) {
      this.builder('@' + node.name);
      this.builder((node.raws.afterName || '') + (node.directives || '') + (node.raws.between || '') + (node.urlFunc ? 'url(' : '') + (node.raws.beforeUrl || '') + (node.importPath || '') + (node.raws.afterUrl || '') + (node.urlFunc ? ')' : '') + (node.raws.after || ''));

      if (node.raws.semicolon) {
        this.builder(';');
      }
    }
  }, {
    key: 'rule',
    value: function rule(node) {
      _get(LessStringifier.prototype.__proto__ || Object.getPrototypeOf(LessStringifier.prototype), 'rule', this).call(this, node);

      if (node.empty && node.raws.semicolon) {
        if (node.important) {
          if (node.raws.important) {
            this.builder(node.raws.important);
          } else {
            this.builder(' !important');
          }
        }

        if (node.raws.semicolon) {
          this.builder(';');
        }
      }
    }
  }, {
    key: 'block',
    value: function block(node, start) {
      var empty = node.empty;

      var between = this.raw(node, 'between', 'beforeOpen');
      var after = '';

      if (empty) {
        this.builder(start + between, node, 'start');
      } else {
        this.builder(start + between + '{', node, 'start');
      }

      if (node.nodes && node.nodes.length) {
        this.body(node);
        after = this.raw(node, 'after');
      } else {
        after = this.raw(node, 'after', 'emptyBody');
      }

      if (after) {
        this.builder(after);
      }

      if (!empty) {
        this.builder('}', node, 'end');
      }
    }
  }]);

  return LessStringifier;
}(_stringifier2.default);

exports.default = LessStringifier;
module.exports = exports['default'];