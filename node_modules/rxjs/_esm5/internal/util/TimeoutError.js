/** PURE_IMPORTS_START tslib PURE_IMPORTS_END */
import * as tslib_1 from "tslib";
var TimeoutError = /*@__PURE__*/ (function (_super) {
    tslib_1.__extends(TimeoutError, _super);
    function TimeoutError() {
        var _this = _super.call(this, 'Timeout has occurred') || this;
        _this.name = 'TimeoutError';
        Object.setPrototypeOf(_this, TimeoutError.prototype);
        return _this;
    }
    return TimeoutError;
}(Error));
export { TimeoutError };
//# sourceMappingURL=TimeoutError.js.map
