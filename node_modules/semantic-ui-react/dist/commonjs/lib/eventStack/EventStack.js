"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _isBrowser = _interopRequireDefault(require("../isBrowser"));

var _EventTarget = _interopRequireDefault(require("./EventTarget"));

var _normalizeHandlers = _interopRequireDefault(require("./normalizeHandlers"));

var _normalizeTarget = _interopRequireDefault(require("./normalizeTarget"));

var EventStack =
/*#__PURE__*/
function () {
  function EventStack() {
    var _this = this;

    (0, _classCallCheck2.default)(this, EventStack);
    (0, _defineProperty2.default)(this, "targets", new Map());
    (0, _defineProperty2.default)(this, "getTarget", function (target) {
      var autoCreate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var normalized = (0, _normalizeTarget.default)(target);
      if (_this.targets.has(normalized)) return _this.targets.get(normalized);
      if (!autoCreate) return null;
      var eventTarget = new _EventTarget.default(normalized);

      _this.targets.set(normalized, eventTarget);

      return eventTarget;
    });
    (0, _defineProperty2.default)(this, "removeTarget", function (target) {
      _this.targets.delete((0, _normalizeTarget.default)(target));
    });
  }

  (0, _createClass2.default)(EventStack, [{
    key: "sub",

    /**
     * @param {String} eventName
     * @param {Function|Function[]} eventHandlers
     * @param {Object} [options]
     * @param {*} [options.target]
     * @param {String} [options.pool]
     */
    value: function sub(eventName, eventHandlers) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!(0, _isBrowser.default)()) return;
      var _options$target = options.target,
          target = _options$target === void 0 ? document : _options$target,
          _options$pool = options.pool,
          pool = _options$pool === void 0 ? 'default' : _options$pool;
      var eventTarget = this.getTarget(target);
      eventTarget.addHandlers(pool, eventName, (0, _normalizeHandlers.default)(eventHandlers));
    }
    /**
     * @param {String} eventName
     * @param {Function|Function[]} eventHandlers
     * @param {Object} [options]
     * @param {*} [options.target]
     * @param {String} [options.pool]
     */

  }, {
    key: "unsub",
    value: function unsub(eventName, eventHandlers) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!(0, _isBrowser.default)()) return;
      var _options$target2 = options.target,
          target = _options$target2 === void 0 ? document : _options$target2,
          _options$pool2 = options.pool,
          pool = _options$pool2 === void 0 ? 'default' : _options$pool2;
      var eventTarget = this.getTarget(target, false);

      if (eventTarget) {
        eventTarget.removeHandlers(pool, eventName, (0, _normalizeHandlers.default)(eventHandlers));
        if (!eventTarget.hasHandlers()) this.removeTarget(target);
      }
    }
    /**
     * @private
     * @param {*} target
     * @param {Boolean} [autoCreate]
     * @return {EventTarget}
     */

  }]);
  return EventStack;
}();

exports.default = EventStack;