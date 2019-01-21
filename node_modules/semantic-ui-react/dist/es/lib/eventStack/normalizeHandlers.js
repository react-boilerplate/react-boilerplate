import _isArray from "lodash/isArray";

var normalizeHandlers = function normalizeHandlers(handlers) {
  return _isArray(handlers) ? handlers : [handlers];
};

export default normalizeHandlers;