'use strict';
const path = require('path');
const buildMinimistOptions = require('minimist-options');
const yargs = require('yargs-parser');
const camelcaseKeys = require('camelcase-keys');
const decamelizeKeys = require('decamelize-keys');
const trimNewlines = require('trim-newlines');
const redent = require('redent');
const readPkgUp = require('read-pkg-up');
const loudRejection = require('loud-rejection');
const normalizePackageData = require('normalize-package-data');

// Prevent caching of this module so module.parent is always accurate
delete require.cache[__filename];
const parentDir = path.dirname(module.parent.filename);

module.exports = (helpMessage, options) => {
	loudRejection();

	if (typeof helpMessage === 'object' && !Array.isArray(helpMessage)) {
		options = helpMessage;
		helpMessage = '';
	}

	options = Object.assign({
		pkg: readPkgUp.sync({
			cwd: parentDir,
			normalize: false
		}).pkg || {},
		argv: process.argv.slice(2),
		inferType: false,
		input: 'string',
		help: helpMessage,
		autoHelp: true,
		autoVersion: true,
		booleanDefault: false
	}, options);

	const minimistFlags = options.flags && typeof options.booleanDefault !== 'undefined' ? Object.keys(options.flags).reduce(
		(flags, flag) => {
			if (flags[flag].type === 'boolean' && !Object.prototype.hasOwnProperty.call(flags[flag], 'default')) {
				flags[flag].default = options.booleanDefault;
			}

			return flags;
		},
		options.flags
	) : options.flags;

	let minimistoptions = Object.assign({
		arguments: options.input
	}, minimistFlags);

	minimistoptions = decamelizeKeys(minimistoptions, '-', {exclude: ['stopEarly', '--']});

	if (options.inferType) {
		delete minimistoptions.arguments;
	}

	minimistoptions = buildMinimistOptions(minimistoptions);

	if (minimistoptions['--']) {
		minimistoptions.configuration = Object.assign({}, minimistoptions.configuration, {'populate--': true});
	}

	const {pkg} = options;
	const argv = yargs(options.argv, minimistoptions);
	let help = redent(trimNewlines((options.help || '').replace(/\t+\n*$/, '')), 2);

	normalizePackageData(pkg);

	process.title = pkg.bin ? Object.keys(pkg.bin)[0] : pkg.name;

	let {description} = options;
	if (!description && description !== false) {
		({description} = pkg);
	}

	help = (description ? `\n  ${description}\n` : '') + (help ? `\n${help}\n` : '\n');

	const showHelp = code => {
		console.log(help);
		process.exit(typeof code === 'number' ? code : 2);
	};

	const showVersion = () => {
		console.log(typeof options.version === 'string' ? options.version : pkg.version);
		process.exit();
	};

	if (argv.version && options.autoVersion) {
		showVersion();
	}

	if (argv.help && options.autoHelp) {
		showHelp(0);
	}

	const input = argv._;
	delete argv._;

	const flags = camelcaseKeys(argv, {exclude: ['--', /^\w$/]});

	return {
		input,
		flags,
		pkg,
		help,
		showHelp,
		showVersion
	};
};
