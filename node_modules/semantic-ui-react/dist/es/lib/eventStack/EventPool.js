import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import EventSet from './EventSet';

var EventPool =
/*#__PURE__*/
function () {
  /**
   * @param {String} poolName
   * @param {String} eventType
   * @param {Function[]} eventHandlers
   * @return {EventPool}
   */

  /**
   * @param {String} poolName
   * @param {Map<String,EventSet>} handlerSets
   */
  function EventPool(poolName, handlerSets) {
    _classCallCheck(this, EventPool);

    /** @private */
    this.handlerSets = handlerSets;
    /** @private */

    this.poolName = poolName;
  }
  /**
   * @param {String} eventType
   * @param {Function[]} eventHandlers
   * @return {EventPool}
   */


  _createClass(EventPool, [{
    key: "addHandlers",
    value: function addHandlers(eventType, eventHandlers) {
      var handlerSets = new Map(this.handlerSets);

      if (handlerSets.has(eventType)) {
        handlerSets.set(eventType, handlerSets.get(eventType).addHandlers(eventHandlers));
      } else {
        handlerSets.set(eventType, new EventSet(eventHandlers));
      }

      return new EventPool(this.poolName, handlerSets);
    }
    /**
     * @param {String} eventType
     * @param {Event} event
     */

  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(eventType, event) {
      var handlerSet = this.handlerSets.get(eventType);
      if (handlerSet) handlerSet.dispatchEvent(event, this.poolName === 'default');
    }
    /**
     * @return {Boolean}
     */

  }, {
    key: "hasHandlers",
    value: function hasHandlers() {
      return this.handlerSets.size > 0;
    }
    /**
     * @param {String} eventType
     * @param {Function[]} eventHandlers
     * @return {EventPool}
     */

  }, {
    key: "removeHandlers",
    value: function removeHandlers(eventType, eventHandlers) {
      var handlerSets = new Map(this.handlerSets);

      if (!handlerSets.has(eventType)) {
        return new EventPool(this.poolName, handlerSets);
      }

      var handlerSet = handlerSets.get(eventType).removeHandlers(eventHandlers);

      if (handlerSet.hasHandlers()) {
        handlerSets.set(eventType, handlerSet);
      } else {
        handlerSets.delete(eventType);
      }

      return new EventPool(this.poolName, handlerSets);
    }
  }]);

  return EventPool;
}();

_defineProperty(EventPool, "createByType", function (poolName, eventType, eventHandlers) {
  var handlerSets = new Map();
  handlerSets.set(eventType, new EventSet(eventHandlers));
  return new EventPool(poolName, handlerSets);
});

export { EventPool as default };