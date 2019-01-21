'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StyleSheet = require('./StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _StyleSheetManager = require('./StyleSheetManager');

var _StyleSheetManager2 = _interopRequireDefault(_StyleSheetManager);

var _nonce = require('../utils/nonce');

var _nonce2 = _interopRequireDefault(_nonce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/* eslint-disable no-underscore-dangle */


var babelPluginFlowReactPropTypes_proptype_Tag = require('./StyleSheet').babelPluginFlowReactPropTypes_proptype_Tag || require('prop-types').any;

var ServerTag = function () {
  function ServerTag(isLocal) {
    _classCallCheck(this, ServerTag);

    this.isLocal = isLocal;
    this.components = {};
    this.size = 0;
    this.names = [];
  }

  ServerTag.prototype.isFull = function isFull() {
    return false;
  };

  ServerTag.prototype.addComponent = function addComponent(componentId) {
    if (process.env.NODE_ENV !== 'production' && this.components[componentId]) {
      throw new Error('Trying to add Component \'' + componentId + '\' twice!');
    }
    this.components[componentId] = { componentId: componentId, css: '' };
    this.size += 1;
  };

  ServerTag.prototype.concatenateCSS = function concatenateCSS() {
    var _this = this;

    return Object.keys(this.components).reduce(function (styles, k) {
      return styles + _this.components[k].css;
    }, '');
  };

  ServerTag.prototype.inject = function inject(componentId, css, name) {
    var comp = this.components[componentId];

    if (process.env.NODE_ENV !== 'production' && !comp) {
      throw new Error('Must add a new component before you can inject css into it');
    }
    if (comp.css === '') comp.css = '/* sc-component-id: ' + componentId + ' */\n';

    comp.css += css.replace(/\n*$/, '\n');

    if (name) this.names.push(name);
  };

  ServerTag.prototype.toHTML = function toHTML() {
    var attrs = ['type="text/css"', _StyleSheet.SC_ATTR + '="' + this.names.join(' ') + '"', _StyleSheet.LOCAL_ATTR + '="' + (this.isLocal ? 'true' : 'false') + '"'];

    var nonce = (0, _nonce2.default)();

    if (nonce) {
      attrs.push('nonce="' + nonce + '"');
    }

    return '<style ' + attrs.join(' ') + '>' + this.concatenateCSS() + '</style>';
  };

  ServerTag.prototype.toReactElement = function toReactElement(key) {
    var _attrs;

    var attrs = (_attrs = {}, _attrs[_StyleSheet.SC_ATTR] = this.names.join(' '), _attrs[_StyleSheet.LOCAL_ATTR] = this.isLocal.toString(), _attrs);

    var nonce = (0, _nonce2.default)();

    if (nonce) {
      attrs.nonce = nonce;
    }

    return _react2.default.createElement('style', _extends({
      key: key,
      type: 'text/css'
    }, attrs, {
      dangerouslySetInnerHTML: { __html: this.concatenateCSS() }
    }));
  };

  ServerTag.prototype.clone = function clone() {
    var _this2 = this;

    var copy = new ServerTag(this.isLocal);
    copy.names = [].concat(this.names);
    copy.size = this.size;
    copy.components = Object.keys(this.components).reduce(function (acc, key) {
      acc[key] = _extends({}, _this2.components[key]); // eslint-disable-line no-param-reassign
      return acc;
    }, {});

    return copy;
  };

  return ServerTag;
}();

var ServerStyleSheet = function () {
  function ServerStyleSheet() {
    _classCallCheck(this, ServerStyleSheet);

    this.instance = _StyleSheet2.default.clone(_StyleSheet2.default.instance);
  }

  ServerStyleSheet.prototype.collectStyles = function collectStyles(children) {
    if (this.closed) {
      throw new Error("Can't collect styles once you've called getStyleTags!");
    }
    return _react2.default.createElement(
      _StyleSheetManager2.default,
      { sheet: this.instance },
      children
    );
  };

  ServerStyleSheet.prototype.getStyleTags = function getStyleTags() {
    if (!this.closed) {
      _StyleSheet.clones.splice(_StyleSheet.clones.indexOf(this.instance), 1);
      this.closed = true;
    }

    return this.instance.toHTML();
  };

  ServerStyleSheet.prototype.getStyleElement = function getStyleElement() {
    if (!this.closed) {
      _StyleSheet.clones.splice(_StyleSheet.clones.indexOf(this.instance), 1);
      this.closed = true;
    }

    return this.instance.toReactElements();
  };

  ServerStyleSheet.create = function create() {
    return new _StyleSheet2.default(function (isLocal) {
      return new ServerTag(isLocal);
    });
  };

  return ServerStyleSheet;
}();

exports.default = ServerStyleSheet;
module.exports = exports['default'];