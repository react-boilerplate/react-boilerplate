'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = require('./utils');

var OldValue = function () {
    function OldValue(unprefixed, prefixed, string, regexp) {
        _classCallCheck(this, OldValue);

        this.unprefixed = unprefixed;
        this.prefixed = prefixed;
        this.string = string || prefixed;
        this.regexp = regexp || utils.regexp(prefixed);
    }

    /**
     * Check, that value contain old value
     */


    OldValue.prototype.check = function check(value) {
        if (value.indexOf(this.string) !== -1) {
            return !!value.match(this.regexp);
        }
        return false;
    };

    return OldValue;
}();

module.exports = OldValue;