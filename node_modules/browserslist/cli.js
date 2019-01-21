#!/usr/bin/env node

var browserslist = require('./');
var pkg          = require('./package.json');
var args         = process.argv.slice(2);

function isArg(arg) {
    return args.some(function (str) {
        return str === arg || str.indexOf(arg + '=') === 0;
    });
}

function getArgValue(arg) {
    var found = args.filter(function (str) {
        return str.indexOf(arg + '=') === 0;
    })[0];
    var value = found && found.split('=')[1];
    return value && value.replace(/^['"]|['"]$/g, '');
}

function error(msg) {
    process.stderr.write(pkg.name + ': ' + msg + '\n');
    process.exit(1);
}

function query(queries, opts) {
    try {
        return browserslist(queries, opts);
    } catch (e) {
        if ( e.name === 'BrowserslistError' ) {
            return error(e.message);
        } else {
            throw e;
        }
    }
}

if ( args.length === 0 || isArg('--help') || isArg('-h') ) {
    process.stdout.write([
        pkg.description,
        '',
        'Usage:',
        '  ' + pkg.name + ' "QUERIES"',
        '  ' + pkg.name + ' --coverage "QUERIES"',
        '  ' + pkg.name + ' --coverage=US "QUERIES"',
        '  ' + pkg.name + ' --config=browserslist "path/to/browserlist/file"',
        '  ' + pkg.name + ' --env="environment name defined in config"',
        '  ' + pkg.name + ' --stats="path/to/browserlist/stats/file"'
    ].join('\n') + '\n');

} else if ( isArg('--version') || isArg('-v') ) {
    process.stdout.write(pkg.name + ' ' + pkg.version + '\n');

} else if ( isArg('--coverage') || isArg('-c') ) {
    var browsers = args.find(function (i) {
        return i[0] !== '-';
    });
    if ( !browsers ) error('Define a browsers query to get coverage');

    var country = getArgValue('--coverage') || getArgValue('-c');
    var result  = browserslist.coverage(query(browsers), country);
    var round   = Math.round(result * 100) / 100.0;

    var end = 'globally';
    if (country && country !== 'global') {
        end = 'in the ' + country.toUpperCase();
    }

    process.stdout.write(
        'These browsers account for ' + round + '% of all users ' + end + '\n');

} else if ( args.length === 1 && args[0][0] !== '-' ) {
    query(args[0]).forEach(function (browser) {
        process.stdout.write(browser + '\n');
    });

} else if (isArg('--config') || isArg('-b')) {
    var opts = {
        config: getArgValue('--config') || getArgValue('-b')
    };

    if (isArg('--env') || isArg('-e')) {
        opts.env = getArgValue('--env') || getArgValue('-e');
    }

    if (isArg('--stats') || isArg('-s')) {
        opts.stats = getArgValue('--stats') || getArgValue('-s');
    }

    query(null, opts).forEach(function (browser) {
        process.stdout.write(browser + '\n');
    });
} else {
    error('Unknown arguments. Use --help to pick right one.');
}
