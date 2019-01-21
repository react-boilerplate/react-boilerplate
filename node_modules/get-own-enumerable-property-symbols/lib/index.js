"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (object) { return Object
    .getOwnPropertySymbols(object)
    .filter(function (keySymbol) { return object.propertyIsEnumerable(keySymbol); }); };
//# sourceMappingURL=index.js.map