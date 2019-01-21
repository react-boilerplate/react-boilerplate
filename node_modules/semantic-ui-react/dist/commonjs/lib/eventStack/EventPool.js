"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _EventSet = _interopRequireDefault(require("./EventSet"));

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
    (0, _classCallCheck2.default)(this, EventPool);

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


  (0, _createClass2.default)(EventPool, [{
    key: "addHandlers",
    value: function addHandlers(eventType, eventHandlers) {
      var handlerSets = new Map(this.handlerSets);

      if (handlerSets.has(eventType)) {
        handlerSets.set(eventType, handlerSets.get(eventType).addHandlers(eventHandlers));
      } else {
        handlerSets.set(eventType, new _EventSet.default(eventHandlers));
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

exports.default = EventPool;
(0, _defineProperty2.default)(EventPool, "createByType", function (poolName, eventType, eventHandlers) {
  var handlerSets = new Map();
  handlerSets.set(eventType, new _EventSet.default(eventHandlers));
  return new EventPool(poolName, handlerSets);
});