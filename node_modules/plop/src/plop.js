#!/usr/bin/env node

'use strict';

const Liftoff = require('liftoff');
const args = process.argv.slice(2);
const argv = require('minimist')(args);
const v8flags = require('v8flags');
const interpret = require('interpret');
const chalk = require('chalk');

const nodePlop = require('node-plop');
const out = require('./console-out');
const globalPkg = require('../package.json');

const Plop = new Liftoff({
	name: 'plop',
	extensions: interpret.jsVariants,
	v8flags: v8flags
});

Plop.launch({
	cwd: argv.cwd,
	configPath: argv.plopfile,
	require: argv.require,
	completion: argv.completion
}, run);

function run(env) {
	const plopfilePath = env.configPath;

	// handle request for usage and options
	if (argv.help || argv.h) {
		out.displayHelpScreen();
		process.exit(0);
	}

	// handle request for initializing a new plopfile
	if (argv.init || argv.i) {
		return out.createInitPlopfile(env.cwd, function(err){
			if (err){
				console.log(err);
				process.exit(1);
			}
			process.exit(0);
		});
	}

	// handle request for version number
	if (argv.version || argv.v) {
		if (env.modulePackage.version !== globalPkg.version) {
			console.log(chalk.yellow('CLI version'), globalPkg.version);
			console.log(chalk.yellow('Local version'), env.modulePackage.version);
		} else {
			console.log(globalPkg.version);
		}
		return;
	}

	// abort if there's no plopfile found
	if (plopfilePath == null) {
		console.error(chalk.red('[PLOP] ') + 'No plopfile found');
		out.displayHelpScreen();
		process.exit(1);
	}

	// set the default base path to the plopfile directory
	const plop = nodePlop(plopfilePath, {
		force: argv.force || argv.f
	});
	const generators = plop.getGeneratorList();
	const generatorNames = generators.map(function (v) { return v.name; });
	
	// locate the generator name based on input and take the rest of the
	// user's input as prompt bypass data to be passed into the generator
	let generatorName = '';
	let bypassArr = [];
	for (let i=0; i < argv._.length; i++) {
		const nameTest = (generatorName.length ? generatorName + ' ' : '') + argv._[i];
		if (listHasOptionThatStartsWith(generatorNames, nameTest)) {
			generatorName = nameTest;
		} else {
			bypassArr = argv._.slice(i);
			break;
		}
	}
	
	// hmmmm, couldn't identify a generator in the user's input
	if (!generatorName && !generators.length) {
		// no generators?! there's clearly something wrong here
		console.error(chalk.red('[PLOP] ') + 'No generator found in plopfile');
		process.exit(1);
	} else if (!generatorName && generators.length === 1) {
		// only one generator in this plopfile... let's assume they
		// want to run that one!
		doThePlop(plop.getGenerator(generatorNames[0]), bypassArr);
	} else if (!generatorName && generators.length > 1 && !bypassArr.length) {
		// more than one generator? we'll have to ask the user which
		// one they want to run.
		out.chooseOptionFromList(generators, plop.getWelcomeMessage()).then(function (generatorName) {
			doThePlop(plop.getGenerator(generatorName));
		});
	} else if (generatorNames.indexOf(generatorName) >= 0) {
		// we have found the generator, run it!
		doThePlop(plop.getGenerator(generatorName), bypassArr);
	} else {
		// we just can't make sense of your input... sorry :-(
		const fuzyGenName = (generatorName + ' ' + bypassArr.join(' ')).trim();
		console.error(chalk.red('[PLOP] ') + 'Could not find a generator for "' + fuzyGenName + '"');
		process.exit(1);
	}

}

/////
// everybody to the plop!
//
function doThePlop(generator, bypassArr) {
	generator.runPrompts(bypassArr)
		.then(generator.runActions)
		.then(function (result) {
			result.changes.forEach(function(line) {
				console.log(chalk.green('[SUCCESS]'), line.type, line.path);
			});
			result.failures.forEach(function (line) {
				const logs = [chalk.red('[FAILED]')];
				if (line.type) { logs.push(line.type); }
				if (line.path) { logs.push(line.path); }

				const error = line.error || line.message;
				logs.push(chalk.red(error));

				console.log.apply(console, logs);
			});
		})
		.catch(function (err) {
			console.error(chalk.red('[ERROR]'), err.message);
			process.exit(1);
		});
}

function listHasOptionThatStartsWith(list, prefix) {
	return list.some(function (txt) {
		return txt.indexOf(prefix) === 0;
	});
}
