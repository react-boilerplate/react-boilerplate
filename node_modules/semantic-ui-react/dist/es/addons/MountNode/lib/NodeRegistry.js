import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

var NodeRegistry = function NodeRegistry() {
  var _this = this;

  _classCallCheck(this, NodeRegistry);

  _defineProperty(this, "add", function (node, component) {
    if (_this.nodes.has(node)) {
      var set = _this.nodes.get(node);

      set.add(component);
      return;
    }

    _this.nodes.set(node, new Set([component]));
  });

  _defineProperty(this, "del", function (node, component) {
    if (!_this.nodes.has(node)) return;

    var set = _this.nodes.get(node);

    if (set.size === 1) {
      _this.nodes.delete(node);

      return;
    }

    set.delete(component);
  });

  _defineProperty(this, "emit", function (node, callback) {
    callback(node, _this.nodes.get(node));
  });

  this.nodes = new Map();
};

export { NodeRegistry as default };