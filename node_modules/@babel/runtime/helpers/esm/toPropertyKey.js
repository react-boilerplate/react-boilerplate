import _typeof from "../../helpers/esm/typeof";
export default function _toPropertyKey(key) {
  if (_typeof(key) === "symbol") {
    return key;
  } else {
    return String(key);
  }
}