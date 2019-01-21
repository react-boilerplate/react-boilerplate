// Node-only
var semver = require('semver');

var warn = function (opts, str) {
    opts.out.write("WARN"+"\t" + str + "\n");
}

function lintNames(grm, opts) {
    var all = [];
    grm.rules.forEach(function(rule) {
        all.push(rule.name);
    });
    grm.rules.forEach(function(rule) {
        rule.symbols.forEach(function(symbol) {
            if (!symbol.literal && !symbol.token && symbol.constructor !== RegExp) {
                if (all.indexOf(symbol) === -1) {
                    warn(opts,"Undefined symbol `" + symbol + "` used.");
                }
            }
        });
    });
}

function lintTSVersion(grm, opts) {
    if (grm.config.preprocessor === 'typescript' &&
        semver.gt(opts.version, '2.11.0'))
        warn(opts, "The interface for the TypeScript preprocessor changed " +
                   "briefly in nearley 2.10 and 2.11. See " +
                   "https://github.com/Hardmath123/nearley/pull/287 if you " +
                   "encounter issues importing your grammar into TS.");
}

function lint(grm, opts) {
    if (!opts.out) opts.out = process.stderr;
    lintNames(grm, opts);
    lintTSVersion(grm, opts);
}

module.exports = lint;
