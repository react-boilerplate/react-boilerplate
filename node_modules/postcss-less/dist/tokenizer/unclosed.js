"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unclosed;
function unclosed(state, what) {
  throw state.input.error("Unclosed " + what, state.line, state.pos - state.offset);
}
module.exports = exports["default"];