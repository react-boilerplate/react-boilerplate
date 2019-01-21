import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

var EventSet =
/*#__PURE__*/
function () {
  /**
   * @param {Function[]} eventHandlers
   */
  function EventSet(eventHandlers) {
    _classCallCheck(this, EventSet);

    /** @private {Set<Function>} handlers */
    this.handlers = new Set(eventHandlers);
  }
  /**
   * @param {Function[]} eventHandlers
   * @return {EventSet}
   */


  _createClass(EventSet, [{
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

      var recentHandler = _toConsumableArray(this.handlers).pop();

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

export { EventSet as default };