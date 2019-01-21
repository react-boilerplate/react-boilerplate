var path = require('path');
var e2c  = require('electron-to-chromium/versions');
var fs   = require('fs');

var caniuse = require('caniuse-db/data.json').agents;

function normalize(versions) {
    return versions.filter(function (version) {
        return typeof version === 'string';
    });
}

var FLOAT_RANGE = /^\d+(\.\d+)?(-\d+(\.\d+)?)*$/;
var IS_SECTION = /^\s*\[(.+)\]\s*$/;

function uniq(array) {
    var filtered = [];
    for ( var i = 0; i < array.length; i++ ) {
        if ( filtered.indexOf(array[i]) === -1 ) filtered.push(array[i]);
    }
    return filtered;
}

function BrowserslistError(message) {
    this.name = 'BrowserslistError';
    this.message = message || '';
    this.browserslist = true;
    if ( Error.captureStackTrace ) {
        Error.captureStackTrace(this, BrowserslistError);
    }
}
BrowserslistError.prototype = Error.prototype;

// Helpers

function error(name) {
    throw new BrowserslistError(name);
}

function fillUsage(result, name, data) {
    for ( var i in data ) {
        result[name + ' ' + i] = data[i];
    }
}

function isFile(file) {
    return fs.existsSync(file) && fs.statSync(file).isFile();
}

function eachParent(file, callback) {
    if ( !fs.readFileSync || !fs.existsSync || !fs.statSync ) {
        /* istanbul ignore next */
        return undefined;
    }

    if ( file === false ) return undefined;
    if ( typeof file === 'undefined' ) file = '.';
    var loc = path.resolve(file);
    do {
        var result = callback(loc);
        if (typeof result !== 'undefined') return result;
    } while (loc !== (loc = path.dirname(loc)));
    return undefined;
}

function getStat(opts) {
    if ( opts.stats ) {
        return opts.stats;
    } else if ( process.env.BROWSERSLIST_STATS ) {
        return process.env.BROWSERSLIST_STATS;
    } else {
        return eachParent(opts.path, function (dir) {
            var file = path.join(dir, 'browserslist-stats.json');
            if ( isFile(file) ) {
                return file;
            }
        });
    }
}

function parsePackage(file) {
    var config = JSON.parse(fs.readFileSync(file)).browserslist;
    if ( typeof config === 'object' && config.length ) {
        config = { defaults: config };
    }
    return config;
}

function pickEnv(config, opts) {
    if ( typeof config !== 'object' ) return config;

    var env;
    if ( typeof opts.env === 'string' ) {
        env = opts.env;
    } else if ( typeof process.env.BROWSERSLIST_ENV === 'string' ) {
        env = process.env.BROWSERSLIST_ENV;
    } else if ( typeof process.env.NODE_ENV === 'string' ) {
        env = process.env.NODE_ENV;
    } else {
        env = 'development';
    }

    return config[env] || config.defaults;
}

function generateFilter(sign, version) {
    version = parseFloat(version);
    if ( sign === '>' ) {
        return function (v) {
            return parseFloat(v) > version;
        };
    } else if ( sign === '>=' ) {
        return function (v) {
            return parseFloat(v) >= version;
        };
    } else if ( sign === '<' ) {
        return function (v) {
            return parseFloat(v) < version;
        };
    } else if ( sign === '<=' ) {
        return function (v) {
            return parseFloat(v) <= version;
        };
    }
}

function compareStrings(a, b) {
    if (a < b) return -1;
    if (a > b) return +1;
    return 0;
}

/**
 * Return array of browsers by selection queries.
 *
 * @param {string[]} queries Browser queries.
 * @param {object} opts Options.
 * @param {string} [opts.path="."] Path to processed file.
 *                                 It will be used to find config files.
 * @param {string} [opts.env="development"] Processing environment.
 *                                          It will be used to take right
 *                                          queries from config file.
 * @param {string} [opts.config] Path to config file with queries.
 * @param {object} [opts.stats] Custom browser usage statistics
 *                              for "> 1% in my stats" query.
 * @return {string[]} Array with browser names in Can I Use.
 *
 * @example
 * browserslist('IE >= 10, IE 8') //=> ['ie 11', 'ie 10', 'ie 8']
 */
var browserslist = function (queries, opts) {
    if ( typeof opts === 'undefined' ) opts = { };

    if ( typeof queries === 'undefined' || queries === null ) {
        if ( process.env.BROWSERSLIST ) {
            queries = process.env.BROWSERSLIST;
        } else if ( opts.config || process.env.BROWSERSLIST_CONFIG ) {
            var file = opts.config || process.env.BROWSERSLIST_CONFIG;
            queries = pickEnv(browserslist.readConfig(file), opts);
        } else {
            queries = pickEnv(browserslist.findConfig(opts.path), opts);
        }
    }

    if ( typeof queries === 'undefined' || queries === null ) {
        queries = browserslist.defaults;
    }

    if ( typeof queries === 'string' ) {
        queries = queries.split(/,\s*/);
    }

    var context = { };

    var stats = getStat(opts);
    if ( stats ) {
        if ( typeof stats === 'string' ) {
            try {
                stats = JSON.parse(fs.readFileSync(stats));
            } catch (e) {
                error('Can\'t read ' + stats);
            }
        }
        if ( 'dataByBrowser' in stats ) {
            stats = stats.dataByBrowser;
        }

        context.customUsage = { };
        for ( var browser in stats ) {
            fillUsage(context.customUsage, browser, stats[browser]);
        }
    }

    var result = [];

    queries.forEach(function (selection) {
        if ( selection.trim() === '' ) return;

        var exclude = selection.indexOf('not ') === 0;
        if ( exclude ) selection = selection.slice(4);

        for ( var i in browserslist.queries ) {
            var type  = browserslist.queries[i];
            var match = selection.match(type.regexp);
            if ( match ) {
                var args = [context].concat(match.slice(1));
                var array = type.select.apply(browserslist, args);
                if ( exclude ) {
                    array = array.concat(array.map(function (j) {
                        return j.replace(/\s\d+/, ' 0');
                    }));
                    result = result.filter(function (j) {
                        return array.indexOf(j) === -1;
                    });
                } else {
                    result = result.concat(array);
                }
                return;
            }
        }

        error('Unknown browser query `' + selection + '`');
    });
    result = result.map(function (i) {
        var parts = i.split(' ');
        var name = parts[0];
        var version = parts[1];
        if ( version === '0' ) {
            return name + ' ' + browserslist.byName(name).versions[0];
        } else {
            return i;
        }
    }).sort(function (name1, name2) {
        name1 = name1.split(' ');
        name2 = name2.split(' ');
        if ( name1[0] === name2[0] ) {
            if ( FLOAT_RANGE.test(name1[1]) && FLOAT_RANGE.test(name2[1]) ) {
                return parseFloat(name2[1]) - parseFloat(name1[1]);
            } else {
                return compareStrings(name2[1], name1[1]);
            }
        } else {
            return compareStrings(name1[0], name2[0]);
        }
    });

    return uniq(result);
};

var normalizeVersion = function (data, version) {
    if ( data.versions.indexOf(version) !== -1 ) {
        return version;
    } else if ( browserslist.versionAliases[data.name][version] ) {
        return browserslist.versionAliases[data.name][version];
    } else if ( data.versions.length === 1 ) {
        return data.versions[0];
    }
};

var loadCountryStatistics = function (country) {
    if ( !browserslist.usage[country] ) {
        var usage = { };
        var data = require(
            'caniuse-db/region-usage-json/' + country + '.json');
        for ( var i in data.data ) {
            fillUsage(usage, i, data.data[i]);
        }
        browserslist.usage[country] = usage;
    }
};

// Will be filled by Can I Use data below
browserslist.data  = { };
browserslist.usage = {
    global: { },
    custom: null
};

// Default browsers query
browserslist.defaults = [
    '> 1%',
    'last 2 versions',
    'Firefox ESR'
];

// What browsers will be used in `last n version` query
browserslist.major = [
    'safari', 'opera', 'ios_saf', 'ie_mob', 'ie', 'edge', 'firefox', 'chrome'
];

// Browser names aliases
browserslist.aliases = {
    fx:             'firefox',
    ff:             'firefox',
    ios:            'ios_saf',
    explorer:       'ie',
    blackberry:     'bb',
    explorermobile: 'ie_mob',
    operamini:      'op_mini',
    operamobile:    'op_mob',
    chromeandroid:  'and_chr',
    firefoxandroid: 'and_ff',
    ucandroid:      'and_uc'
};

// Aliases to work with joined versions like `ios_saf 7.0-7.1`
browserslist.versionAliases = { };

// Get browser data by alias or case insensitive name
browserslist.byName = function (name) {
    name = name.toLowerCase();
    name = browserslist.aliases[name] || name;
    return browserslist.data[name];
};

// Get browser data by alias or case insensitive name and throw error
// on unknown browser
browserslist.checkName = function (name) {
    var data = browserslist.byName(name);
    if ( !data ) error('Unknown browser ' + name);
    return data;
};

// Read and parse config
browserslist.readConfig = function (file) {
    if ( !fs.existsSync(file) || !fs.statSync(file).isFile() ) {
        error('Can\'t read ' + file + ' config');
    }
    return browserslist.parseConfig(fs.readFileSync(file));
};

// Find config, read file and parse it
browserslist.findConfig = function (from) {
    return eachParent(from, function (dir) {
        var config = path.join(dir, 'browserslist');
        var pkg = path.join(dir, 'package.json');

        var pkgBrowserslist;
        if ( isFile(pkg) ) {
            try {
                pkgBrowserslist = parsePackage(pkg);
            } catch (e) {
                console.warn(
                    '[Browserslist] Could not parse ' + pkg + '. ' +
                    'Ignoring it.');
            }
        }

        if ( isFile(config) && pkgBrowserslist ) {
            error(
                dir + ' contains both browserslist ' +
                'and package.json with browsers');
        } else if ( isFile(config) ) {
            return browserslist.readConfig(config);
        } else if ( pkgBrowserslist ) {
            return pkgBrowserslist;
        }
    });
};

/**
 * Return browsers market coverage.
 *
 * @param {string[]} browsers Browsers names in Can I Use.
 * @param {string} [country="global"] Which country statistics should be used.
 *
 * @return {number} Total market coverage for all selected browsers.
 *
 * @example
 * browserslist.coverage(browserslist('> 1% in US'), 'US') //=> 83.1
 */
browserslist.coverage = function (browsers, country) {
    if ( country && country !== 'global') {
        country = country.toUpperCase();
        loadCountryStatistics(country);
    } else {
        country = 'global';
    }

    return browsers.reduce(function (all, i) {
        var usage = browserslist.usage[country][i];
        if ( usage === undefined ) {
            usage = browserslist.usage[country][i.replace(/ [\d.]+$/, ' 0')];
        }
        return all + (usage || 0);
    }, 0);
};

// Return array of queries from config content
browserslist.parseConfig = function (string) {
    var result = { defaults: [] };
    var section = 'defaults';

    string.toString()
        .replace(/#[^\n]*/g, '')
        .split(/\n/)
        .map(function (line) {
            return line.trim();
        })
        .filter(function (line) {
            return line !== '';
        })
        .forEach(function (line) {
            if ( IS_SECTION.test(line) ) {
                section = line.match(IS_SECTION)[1].trim();
                result[section] = result[section] || [];
            } else {
                result[section].push(line);
            }
        });

    return result;
};

browserslist.queries = {

    lastVersions: {
        regexp: /^last\s+(\d+)\s+versions?$/i,
        select: function (context, versions) {
            var selected = [];
            browserslist.major.forEach(function (name) {
                var data  = browserslist.byName(name);
                if ( !data ) return;
                var array = data.released.slice(-versions);

                array = array.map(function (v) {
                    return data.name + ' ' + v;
                });
                selected = selected.concat(array);
            });
            return selected;
        }
    },

    lastByBrowser: {
        regexp: /^last\s+(\d+)\s+(\w+)\s+versions?$/i,
        select: function (context, versions, name) {
            var data = browserslist.checkName(name);
            return data.released.slice(-versions).map(function (v) {
                return data.name + ' ' + v;
            });
        }
    },

    globalStatistics: {
        regexp: /^>\s*(\d*\.?\d+)%$/,
        select: function (context, popularity) {
            popularity = parseFloat(popularity);
            var result = [];

            for ( var version in browserslist.usage.global ) {
                if ( browserslist.usage.global[version] > popularity ) {
                    result.push(version);
                }
            }

            return result;
        }
    },

    customStatistics: {
        regexp: /^>\s*(\d*\.?\d+)%\s+in\s+my\s+stats$/,
        select: function (context, popularity) {
            popularity = parseFloat(popularity);
            var result = [];

            if ( !context.customUsage ) {
                error('Custom usage statistics was not provided');
            }

            for ( var version in context.customUsage ) {
                if ( context.customUsage[version] > popularity ) {
                    result.push(version);
                }
            }

            return result;
        }
    },

    countryStatistics: {
        regexp: /^>\s*(\d*\.?\d+)%\s+in\s+(\w\w)$/,
        select: function (context, popularity, country) {
            popularity = parseFloat(popularity);
            country    = country.toUpperCase();
            var result = [];

            loadCountryStatistics(country);
            var usage = browserslist.usage[country];

            for ( var version in usage ) {
                if ( usage[version] > popularity ) {
                    result.push(version);
                }
            }

            return result;
        }
    },

    electronRange: {
        regexp: /^electron\s+([\d\.]+)\s*-\s*([\d\.]+)$/i,
        select: function (context, from, to) {
            if ( !e2c[from] ) error('Unknown version ' + from + ' of electron');
            if ( !e2c[to] ) error('Unknown version ' + to   + ' of electron');

            from = parseFloat(from);
            to = parseFloat(to);

            return Object.keys(e2c).filter(function (i) {
                var parsed = parseFloat(i);
                return parsed >= from && parsed <= to;
            }).map(function (i) {
                return 'chrome ' + e2c[i];
            });
        }
    },

    range: {
        regexp: /^(\w+)\s+([\d\.]+)\s*-\s*([\d\.]+)$/i,
        select: function (context, name, from, to) {
            var data = browserslist.checkName(name);
            from = parseFloat(normalizeVersion(data, from) || from);
            to = parseFloat(normalizeVersion(data, to) || to);

            var filter = function (v) {
                var parsed = parseFloat(v);
                return parsed >= from && parsed <= to;
            };

            return data.released.filter(filter).map(function (v) {
                return data.name + ' ' + v;
            });
        }
    },

    electronVersions: {
        regexp: /^electron\s*(>=?|<=?)\s*([\d\.]+)$/i,
        select: function (context, sign, version) {
            return Object.keys(e2c)
                .filter(generateFilter(sign, version))
                .map(function (i) {
                    return 'chrome ' + e2c[i];
                });
        }
    },

    versions: {
        regexp: /^(\w+)\s*(>=?|<=?)\s*([\d\.]+)$/,
        select: function (context, name, sign, version) {
            var data = browserslist.checkName(name);
            var alias = normalizeVersion(data, version);
            if ( alias ) {
                version = alias;
            }
            return data.released
                .filter(generateFilter(sign, version))
                .map(function (v) {
                    return data.name + ' ' + v;
                });
        }
    },

    esr: {
        regexp: /^(firefox|ff|fx)\s+esr$/i,
        select: function () {
            return ['firefox 52'];
        }
    },

    opMini: {
        regexp: /(operamini|op_mini)\s+all/i,
        select: function () {
            return ['op_mini all'];
        }
    },

    electron: {
        regexp: /^electron\s+([\d\.]+)$/i,
        select: function (context, version) {
            var chrome = e2c[version];
            if ( !chrome ) error('Unknown version ' + version + ' of electron');
            return ['chrome ' + chrome];
        }
    },

    direct: {
        regexp: /^(\w+)\s+(tp|[\d\.]+)$/i,
        select: function (context, name, version) {
            if ( /tp/i.test(version) ) version = 'TP';
            var data  = browserslist.checkName(name);
            var alias = normalizeVersion(data, version);
            if ( alias ) {
                version = alias;
            } else {
                if ( version.indexOf('.') === -1 ) {
                    alias = version + '.0';
                } else if ( /\.0$/.test(version) ) {
                    alias = version.replace(/\.0$/, '');
                }
                alias = normalizeVersion(data, alias);
                if ( alias ) {
                    version = alias;
                } else {
                    error('Unknown version ' + version + ' of ' + name);
                }
            }
            return [data.name + ' ' + version];
        }
    },

    defaults: {
        regexp: /^defaults$/i,
        select: function () {
            return browserslist(browserslist.defaults);
        }
    }

};

// Get and convert Can I Use data

(function () {
    for ( var name in caniuse ) {
        var browser = caniuse[name];
        browserslist.data[name] = {
            name:     name,
            versions: normalize(caniuse[name].versions),
            released: normalize(caniuse[name].versions.slice(0, -3))
        };
        fillUsage(browserslist.usage.global, name, browser.usage_global);

        browserslist.versionAliases[name] = { };
        for ( var i = 0; i < browser.versions.length; i++ ) {
            var full = browser.versions[i];
            if (!full) continue;

            if ( full.indexOf('-') !== -1 ) {
                var interval = full.split('-');
                for ( var j = 0; j < interval.length; j++ ) {
                    browserslist.versionAliases[name][interval[j]] = full;
                }
            }
        }
    }
}());

module.exports = browserslist;
