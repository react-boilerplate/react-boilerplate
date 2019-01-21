'use strict';

exports.__esModule = true;
exports.COMPONENTS_PER_TAG = undefined;

var _extractCompsFromCSS = require('../utils/extractCompsFromCSS');

var _extractCompsFromCSS2 = _interopRequireDefault(_extractCompsFromCSS);

var _nonce = require('../utils/nonce');

var _nonce2 = _interopRequireDefault(_nonce);

var _StyleSheet = require('./StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/* eslint-disable no-underscore-dangle */
/*
 * Browser Style Sheet with Rehydration
 *
 * <style data-styled-components="x y z"
 *        data-styled-components-is-local="true">
 *   /· sc-component-id: a ·/
 *   .sc-a { ... }
 *   .x { ... }
 *   /· sc-component-id: b ·/
 *   .sc-b { ... }
 *   .y { ... }
 *   .z { ... }
 * </style>
 *
 * Note: replace · with * in the above snippet.
 * */


var babelPluginFlowReactPropTypes_proptype_Tag = require('./StyleSheet').babelPluginFlowReactPropTypes_proptype_Tag || require('prop-types').any;

var COMPONENTS_PER_TAG = exports.COMPONENTS_PER_TAG = 40;

var BrowserTag = function () {
  function BrowserTag(el, isLocal) {
    var existingSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    _classCallCheck(this, BrowserTag);

    this.el = el;
    this.isLocal = isLocal;
    this.ready = false;

    var extractedComps = (0, _extractCompsFromCSS2.default)(existingSource);

    this.size = extractedComps.length;
    this.components = extractedComps.reduce(function (acc, obj) {
      acc[obj.componentId] = obj; // eslint-disable-line no-param-reassign
      return acc;
    }, {});
  }

  BrowserTag.prototype.isFull = function isFull() {
    return this.size >= COMPONENTS_PER_TAG;
  };

  BrowserTag.prototype.addComponent = function addComponent(componentId) {
    if (!this.ready) this.replaceElement();
    if (process.env.NODE_ENV !== 'production' && this.components[componentId]) {
      throw new Error('Trying to add Component \'' + componentId + '\' twice!');
    }

    var comp = { componentId: componentId, textNode: document.createTextNode('') };
    this.el.appendChild(comp.textNode);

    this.size += 1;
    this.components[componentId] = comp;
  };

  BrowserTag.prototype.inject = function inject(componentId, css, name) {
    if (!this.ready) this.replaceElement();
    var comp = this.components[componentId];

    if (process.env.NODE_ENV !== 'production' && !comp) {
      throw new Error('Must add a new component before you can inject css into it');
    }
    if (comp.textNode.data === '') {
      comp.textNode.appendData('\n/* sc-component-id: ' + componentId + ' */\n');
    }

    comp.textNode.appendData(css);
    if (name) {
      var existingNames = this.el.getAttribute(_StyleSheet.SC_ATTR);
      this.el.setAttribute(_StyleSheet.SC_ATTR, existingNames ? existingNames + ' ' + name : name);
    }

    var nonce = (0, _nonce2.default)();

    if (nonce) {
      this.el.setAttribute('nonce', nonce);
    }
  };

  BrowserTag.prototype.toHTML = function toHTML() {
    return this.el.outerHTML;
  };

  BrowserTag.prototype.toReactElement = function toReactElement() {
    throw new Error("BrowserTag doesn't implement toReactElement!");
  };

  BrowserTag.prototype.clone = function clone() {
    throw new Error('BrowserTag cannot be cloned!');
  };

  /* Because we care about source order, before we can inject anything we need to
   * create a text node for each component and replace the existing CSS. */


  BrowserTag.prototype.replaceElement = function replaceElement() {
    var _this = this;

    this.ready = true;
    // We have nothing to inject. Use the current el.
    if (this.size === 0) return;

    // Build up our replacement style tag
    var newEl = this.el.cloneNode();
    newEl.appendChild(document.createTextNode('\n'));

    Object.keys(this.components).forEach(function (key) {
      var comp = _this.components[key];

      // eslint-disable-next-line no-param-reassign
      comp.textNode = document.createTextNode(comp.cssFromDOM);
      newEl.appendChild(comp.textNode);
    });

    if (!this.el.parentNode) {
      throw new Error("Trying to replace an element that wasn't mounted!");
    }

    // The ol' switcheroo
    this.el.parentNode.replaceChild(newEl, this.el);
    this.el = newEl;
  };

  return BrowserTag;
}();

/* Factory function to separate DOM operations from logical ones*/


exports.default = {
  create: function create() {
    var tags = [];
    var names = {};

    /* Construct existing state from DOM */
    var nodes = document.querySelectorAll('[' + _StyleSheet.SC_ATTR + ']');
    var nodesLength = nodes.length;

    for (var i = 0; i < nodesLength; i += 1) {
      var el = nodes[i];

      tags.push(new BrowserTag(el, el.getAttribute(_StyleSheet.LOCAL_ATTR) === 'true', el.innerHTML));

      var attr = el.getAttribute(_StyleSheet.SC_ATTR);
      if (attr) {
        attr.trim().split(/\s+/).forEach(function (name) {
          names[name] = true;
        });
      }
    }

    /* Factory for making more tags */
    var tagConstructor = function tagConstructor(isLocal) {
      var el = document.createElement('style');
      el.type = 'text/css';
      el.setAttribute(_StyleSheet.SC_ATTR, '');
      el.setAttribute(_StyleSheet.LOCAL_ATTR, isLocal ? 'true' : 'false');
      if (!document.head) throw new Error('Missing document <head>');
      document.head.appendChild(el);
      return new BrowserTag(el, isLocal);
    };

    return new _StyleSheet2.default(tagConstructor, tags, names);
  }
};