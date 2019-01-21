import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import isBrowser from '../isBrowser';
import EventTarget from './EventTarget';
import normalizeHandlers from './normalizeHandlers';
import normalizeTarget from './normalizeTarget';

var EventStack =
/*#__PURE__*/
function () {
  function EventStack() {
    var _this = this;

    _classCallCheck(this, EventStack);

    _defineProperty(this, "targets", new Map());

    _defineProperty(this, "getTarget", function (target) {
      var autoCreate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var normalized = normalizeTarget(target);
      if (_this.targets.has(normalized)) return _this.targets.get(normalized);
      if (!autoCreate) return null;
      var eventTarget = new EventTarget(normalized);

      _this.targets.set(normalized, eventTarget);

      return eventTarget;
    });

    _defineProperty(this, "removeTarget", function (target) {
      _this.targets.delete(normalizeTarget(target));
    });
  }

  _createClass(EventStack, [{
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
      if (!isBrowser()) return;
      var _options$target = options.target,
          target = _options$target === void 0 ? document : _options$target,
          _options$pool = options.pool,
          pool = _options$pool === void 0 ? 'default' : _options$pool;
      var eventTarget = this.getTarget(target);
      eventTarget.addHandlers(pool, eventName, normalizeHandlers(eventHandlers));
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
      if (!isBrowser()) return;
      var _options$target2 = options.target,
          target = _options$target2 === void 0 ? document : _options$target2,
          _options$pool2 = options.pool,
          pool = _options$pool2 === void 0 ? 'default' : _options$pool2;
      var eventTarget = this.getTarget(target, false);

      if (eventTarget) {
        eventTarget.removeHandlers(pool, eventName, normalizeHandlers(eventHandlers));
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

export { EventStack as default };