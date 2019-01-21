"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var NodeRegistry = function NodeRegistry() {
  var _this = this;

  (0, _classCallCheck2.default)(this, NodeRegistry);
  (0, _defineProperty2.default)(this, "add", function (node, component) {
    if (_this.nodes.has(node)) {
      var set = _this.nodes.get(node);

      set.add(component);
      return;
    }

    _this.nodes.set(node, new Set([component]));
  });
  (0, _defineProperty2.default)(this, "del", function (node, component) {
    if (!_this.nodes.has(node)) return;

    var set = _this.nodes.get(node);

    if (set.size === 1) {
      _this.nodes.delete(node);

      return;
    }

    set.delete(component);
  });
  (0, _defineProperty2.default)(this, "emit", function (node, callback) {
    callback(node, _this.nodes.get(node));
  });
  this.nodes = new Map();
};

exports.default = NodeRegistry;