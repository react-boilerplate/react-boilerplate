"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OldSelector = function () {
    function OldSelector(selector, prefix) {
        _classCallCheck(this, OldSelector);

        this.prefix = prefix;
        this.prefixed = selector.prefixed(this.prefix);
        this.regexp = selector.regexp(this.prefix);

        this.prefixeds = selector.possible().map(function (x) {
            return [selector.prefixed(x), selector.regexp(x)];
        });

        this.unprefixed = selector.name;
        this.nameRegexp = selector.regexp();
    }

    /**
     * Is rule a hack without unprefixed version bottom
     */


    OldSelector.prototype.isHack = function isHack(rule) {
        var index = rule.parent.index(rule) + 1;
        var rules = rule.parent.nodes;

        while (index < rules.length) {
            var before = rules[index].selector;
            if (!before) {
                return true;
            }

            if (before.indexOf(this.unprefixed) !== -1 && before.match(this.nameRegexp)) {
                return false;
            }

            var some = false;
            for (var _iterator = this.prefixeds, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref2 = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref2 = _i.value;
                }

                var _ref = _ref2;
                var string = _ref[0];
                var regexp = _ref[1];

                if (before.indexOf(string) !== -1 && before.match(regexp)) {
                    some = true;
                    break;
                }
            }

            if (!some) {
                return true;
            }

            index += 1;
        }

        return true;
    };

    /**
     * Does rule contain an unnecessary prefixed selector
     */


    OldSelector.prototype.check = function check(rule) {
        if (rule.selector.indexOf(this.prefixed) === -1) {
            return false;
        }
        if (!rule.selector.match(this.regexp)) {
            return false;
        }
        if (this.isHack(rule)) {
            return false;
        }
        return true;
    };

    return OldSelector;
}();

module.exports = OldSelector;