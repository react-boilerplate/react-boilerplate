'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var browserslist = require('browserslist');
var postcss = require('postcss');

var Browsers = require('./browsers');
var Prefixes = require('./prefixes');

function isPlainObject(obj) {
    return Object.prototype.toString.apply(obj) === '[object Object]';
}

var cache = {};

function timeCapsule(result, prefixes) {
    if (prefixes.browsers.selected.length === 0) {
        return;
    }
    if (prefixes.add.selectors.length > 0) {
        return;
    }
    if (Object.keys(prefixes.add).length > 2) {
        return;
    }

    /* istanbul ignore next */
    result.warn('Greetings, time traveller. ' + 'We are in the golden age of prefix-less CSS, ' + 'where Autoprefixer is no longer needed for your stylesheet.');
}

module.exports = postcss.plugin('autoprefixer', function () {
    for (var _len = arguments.length, reqs = Array(_len), _key = 0; _key < _len; _key++) {
        reqs[_key] = arguments[_key];
    }

    var options = void 0;
    if (reqs.length === 1 && isPlainObject(reqs[0])) {
        options = reqs[0];
        reqs = undefined;
    } else if (reqs.length === 0 || reqs.length === 1 && !reqs[0]) {
        reqs = undefined;
    } else if (reqs.length <= 2 && (reqs[0] instanceof Array || !reqs[0])) {
        options = reqs[1];
        reqs = reqs[0];
    } else if (_typeof(reqs[reqs.length - 1]) === 'object') {
        options = reqs.pop();
    }

    if (!options) {
        options = {};
    }

    if (options.browser) {
        throw new Error('Change `browser` option to `browsers` in Autoprefixer');
    } else if (options.browserslist) {
        throw new Error('Change `browserslist` option to `browsers` in Autoprefixer');
    }

    if (options.browsers) {
        reqs = options.browsers;
    }

    if (typeof options.grid === 'undefined') {
        options.grid = false;
    }

    var brwlstOpts = {
        ignoreUnknownVersions: options.ignoreUnknownVersions,
        stats: options.stats
    };

    var loadPrefixes = function loadPrefixes(opts) {
        var data = module.exports.data;
        var browsers = new Browsers(data.browsers, reqs, opts, brwlstOpts);
        var key = browsers.selected.join(', ') + JSON.stringify(options);

        if (!cache[key]) {
            cache[key] = new Prefixes(data.prefixes, browsers, options);
        }

        return cache[key];
    };

    var plugin = function plugin(css, result) {
        var prefixes = loadPrefixes({
            from: css.source && css.source.input.file,
            env: options.env
        });
        timeCapsule(result, prefixes);
        if (options.remove !== false) {
            prefixes.processor.remove(css, result);
        }
        if (options.add !== false) {
            prefixes.processor.add(css, result);
        }
    };

    plugin.options = options;

    plugin.browsers = reqs;

    plugin.info = function (opts) {
        opts = opts || {};
        opts.from = opts.from || process.cwd();

        return require('./info')(loadPrefixes(opts));
    };

    return plugin;
});

/**
 * Autoprefixer data
 */
module.exports.data = {
    browsers: require('caniuse-lite').agents,
    prefixes: require('../data/prefixes')
};

/**
 * Autoprefixer default browsers
 */
module.exports.defaults = browserslist.defaults;

/**
 * Inspect with default Autoprefixer
 */
module.exports.info = function () {
    return module.exports().info();
};