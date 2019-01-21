import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import EventPool from './EventPool';

var EventTarget =
/*#__PURE__*/
function () {
  /** @private {Map<String,Function>} */

  /** @private {Map<String,EventPool>} */

  /**
   * @param {HTMLElement} target
   */
  function EventTarget(target) {
    _classCallCheck(this, EventTarget);

    _defineProperty(this, "handlers", new Map());

    _defineProperty(this, "pools", new Map());

    _defineProperty(this, "createEmitter", function (eventType, eventPools) {
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


  _createClass(EventTarget, [{
    key: "addHandlers",
    value: function addHandlers(poolName, eventType, eventHandlers) {
      this.removeTargetHandler(eventType);

      if (!this.pools.has(poolName)) {
        this.pools.set(poolName, EventPool.createByType(poolName, eventType, eventHandlers));
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

export { EventTarget as default };