/** PURE_IMPORTS_START tslib PURE_IMPORTS_END */
import * as tslib_1 from "tslib";
var UnsubscriptionError = /*@__PURE__*/ (function (_super) {
    tslib_1.__extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        var _this = _super.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '') || this;
        _this.errors = errors;
        _this.name = 'UnsubscriptionError';
        Object.setPrototypeOf(_this, UnsubscriptionError.prototype);
        return _this;
    }
    return UnsubscriptionError;
}(Error));
export { UnsubscriptionError };
//# sourceMappingURL=UnsubscriptionError.js.map
