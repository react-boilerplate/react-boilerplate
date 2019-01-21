"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var EventSet =
/*#__PURE__*/
function () {
  /**
   * @param {Function[]} eventHandlers
   */
  function EventSet(eventHandlers) {
    (0, _classCallCheck2.default)(this, EventSet);

    /** @private {Set<Function>} handlers */
    this.handlers = new Set(eventHandlers);
  }
  /**
   * @param {Function[]} eventHandlers
   * @return {EventSet}
   */


  (0, _createClass2.default)(EventSet, [{
    key: "addHandlers",
    value: function addHandlers(eventHandlers) {
      var handlerSet = new Set(this.handlers);
      eventHandlers.forEach(function (eventHandler) {
        // Heads up!
        // We should delete a handler from the set, otherwise it will be not the last element in the
        // set.
        handlerSet.delete(eventHandler);
        handlerSet.add(eventHandler);
      });
      return new EventSet(handlerSet);
    }
    /**
     * @param {Event} event
     * @param {Boolean} dispatchAll
     */

  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event, dispatchAll) {
      if (dispatchAll) {
        this.handlers.forEach(function (handler) {
          handler(event);
        });
        return;
      }

      var recentHandler = (0, _toConsumableArray2.default)(this.handlers).pop();
      recentHandler(event);
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
     * @param {Function[]} eventHandlers
     * @return {EventSet}
     */

  }, {
    key: "removeHandlers",
    value: function removeHandlers(eventHandlers) {
      var handlerSet = new Set(this.handlers);
      eventHandlers.forEach(function (eventHandler) {
        handlerSet.delete(eventHandler);
      });
      return new EventSet(handlerSet);
    }
  }]);
  return EventSet;
}();

exports.default = EventSet;