import _typeof from "@babel/runtime/helpers/typeof";
import _isNil from "lodash/isNil";
var hasDocument = (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object' && document !== null;
var hasWindow = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window !== null && window.self === window; // eslint-disable-next-line no-confusing-arrow

var isBrowser = function isBrowser() {
  return !_isNil(isBrowser.override) ? isBrowser.override : hasDocument && hasWindow;
};

export default isBrowser;