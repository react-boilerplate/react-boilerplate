"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stateTransformer;
function stateTransformer(state) {
  return state.asMutable({ deep: true });
}