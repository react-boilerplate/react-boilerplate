"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _EventPool = _interopRequireDefault(require("./EventPool"));

var EventTarget =
/*#__PURE__*/
function () {
  /** @private {Map<String,Function>} */

  /** @private {Map<String,EventPool>} */

  /**
   * @param {HTMLElement} target
   */
  function EventTarget(target) {
    (0, _classCallCheck2.default)(this, EventTarget);
    (0, _defineProperty2.default)(this, "handlers", new Map());
    (0, _defineProperty2.default)(this, "pools", new Map());
    (0, _defineProperty2.default)(this, "createEmitter", function (eventType, eventPools) {
      return function (event) {
        eventPools.forEach(function (pool) {
          pool.dispatchEvent(eventType, event);
        });
      };
    });

    /** @private */
    this.target = target;
  }
  /**
   * @param {String} poolName
   * @param {String} eventType
   * @param {Function[]} eventHandlers
   */


  (0, _createClass2.default)(EventTarget, [{
    key: "addHandlers",
    value: function addHandlers(poolName, eventType, eventHandlers) {
      this.removeTargetHandler(eventType);

      if (!this.pools.has(poolName)) {
        this.pools.set(poolName, _EventPool.default.createByType(poolName, eventType, eventHandlers));
      } else {
        this.pools.set(poolName, this.pools.get(poolName).addHandlers(eventType, eventHandlers));
      }

      this.addTargetHandler(eventType);
    }
    /**
     * @return {Boolean}
     */

  }, {
    key: "hasHandlers",
    value: function hasHandlers() {
      return this.handlers.size > 0;
    }
    /**
     * @param {String} poolName
     * @param {String} eventType
     * @param {Function[]} eventHandlers
     */

  }, {
    key: "removeHandlers",
    value: function removeHandlers(poolName, eventType, eventHandlers) {
      var pool = this.pools.get(poolName);

      if (pool) {
        var newPool = pool.removeHandlers(eventType, eventHandlers);

        if (newPool.hasHandlers()) {
          this.pools.set(poolName, newPool);
        } else {
          this.pools.delete(poolName);
        }

        this.removeTargetHandler(eventType);
        if (this.pools.size > 0) this.addTargetHandler(eventType);
      }
    }
    /**
     * @private
     * @param {String} eventType
     * @param {Map<String,EventPool>} eventPools
     * @return {Function}
     */

  }, {
    key: "addTargetHandler",

    /**
     * @private
     * @param {String} eventType
     */
    value: function addTargetHandler(eventType) {
      var handler = this.createEmitter(eventType, this.pools);
      this.handlers.set(eventType, handler);
      this.target.addEventListener(eventType, handler);
    }
    /**
     * @private
     * @param {String} eventType
     */

  }, {
    key: "removeTargetHandler",
    value: function removeTargetHandler(eventType) {
      if (this.handlers.has(eventType)) {
        this.target.removeEventListener(eventType, this.handlers.get(eventType));
        this.handlers.delete(eventType);
      }
    }
  }]);
  return EventTarget;
}();

exports.default = EventTarget;