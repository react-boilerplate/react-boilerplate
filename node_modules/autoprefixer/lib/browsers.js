'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var browserslist = require('browserslist');

var utils = require('./utils');

var Browsers = function () {

    /**
     * Return all prefixes for default browser data
     */
    Browsers.prefixes = function prefixes() {
        if (this.prefixesCache) {
            return this.prefixesCache;
        }

        var data = require('caniuse-lite').agents;

        this.prefixesCache = [];
        for (var name in data) {
            this.prefixesCache.push('-' + data[name].prefix + '-');
        }

        this.prefixesCache = utils.uniq(this.prefixesCache).sort(function (a, b) {
            return b.length - a.length;
        });

        return this.prefixesCache;
    };

    /**
     * Check is value contain any possibe prefix
     */


    Browsers.withPrefix = function withPrefix(value) {
        if (!this.prefixesRegexp) {
            this.prefixesRegexp = new RegExp(this.prefixes().join('|'));
        }

        return this.prefixesRegexp.test(value);
    };

    function Browsers(data, requirements, options, browserslistOpts) {
        _classCallCheck(this, Browsers);

        this.data = data;
        this.options = options || {};
        this.browserslistOpts = browserslistOpts || {};
        this.selected = this.parse(requirements);
    }

    /**
     * Return browsers selected by requirements
     */


    Browsers.prototype.parse = function parse(requirements) {
        var opts = {};
        for (var i in this.browserslistOpts) {
            opts[i] = this.browserslistOpts[i];
        }
        opts.path = this.options.from;
        opts.env = this.options.env;
        return browserslist(requirements, opts);
    };

    /**
     * Return prefix for selected browser
     */


    Browsers.prototype.prefix = function prefix(browser) {
        var _browser$split = browser.split(' '),
            name = _browser$split[0],
            version = _browser$split[1];

        var data = this.data[name];

        var prefix = data.prefix_exceptions && data.prefix_exceptions[version];
        if (!prefix) {
            prefix = data.prefix;
        }
        return '-' + prefix + '-';
    };

    /**
     * Is browser is selected by requirements
     */


    Browsers.prototype.isSelected = function isSelected(browser) {
        return this.selected.indexOf(browser) !== -1;
    };

    return Browsers;
}();

module.exports = Browsers;