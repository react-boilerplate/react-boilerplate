'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _resolve = require('resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _bakedInHelpers = require('./baked-in-helpers');

var _bakedInHelpers2 = _interopRequireDefault(_bakedInHelpers);

var _generatorRunner = require('./generator-runner');

var _generatorRunner2 = _interopRequireDefault(_generatorRunner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nodePlop(plopfilePath = '', plopCfg = {}) {

	let pkgJson = {};
	let defaultInclude = { generators: true };

	let welcomeMessage;
	const { destBasePath, force } = plopCfg;
	const generators = {};
	const partials = {};
	const actionTypes = {};
	const helpers = Object.assign({
		pkg: propertyPath => (0, _lodash2.default)(pkgJson, propertyPath, '')
	}, _bakedInHelpers2.default);
	const baseHelpers = Object.keys(helpers);

	const setPrompt = _inquirer2.default.registerPrompt;
	const setWelcomeMessage = message => {
		welcomeMessage = message;
	};
	const setHelper = (name, fn) => {
		helpers[name] = fn;
	};
	const setPartial = (name, str) => {
		partials[name] = str;
	};
	const setActionType = (name, fn) => {
		actionTypes[name] = fn;
	};

	function renderString(template, data) {
		Object.keys(helpers).forEach(h => _handlebars2.default.registerHelper(h, helpers[h]));
		Object.keys(partials).forEach(p => _handlebars2.default.registerPartial(p, partials[p]));
		return _handlebars2.default.compile(template)(data);
	}

	const getWelcomeMessage = () => welcomeMessage;
	const getHelper = name => helpers[name];
	const getPartial = name => partials[name];
	const getActionType = name => actionTypes[name];
	const getGenerator = name => generators[name];
	function setGenerator(name = '', config = {}) {
		// if no name is provided, use a default
		name = name || `generator-${Object.keys(generators).length + 1}`;

		// add the generator to this context
		generators[name] = Object.assign(config, {
			name: name,
			basePath: plopfilePath
		});

		return generators[name];
	}

	const getHelperList = () => Object.keys(helpers).filter(h => !baseHelpers.includes(h));
	const getPartialList = () => Object.keys(partials);
	const getActionTypeList = () => Object.keys(actionTypes);
	function getGeneratorList() {
		return Object.keys(generators).map(function (name) {
			const { description } = generators[name];
			return { name, description };
		});
	}

	const setDefaultInclude = inc => defaultInclude = inc;
	const getDefaultInclude = () => defaultInclude;
	const getDestBasePath = () => destBasePath || plopfilePath;
	const getPlopfilePath = () => plopfilePath;
	const setPlopfilePath = filePath => {
		const pathStats = _fs2.default.statSync(filePath);
		if (pathStats.isFile()) {
			plopfilePath = _path2.default.dirname(filePath);
		} else {
			plopfilePath = filePath;
		}
	};

	function load(targets, loadCfg = {}, includeOverride) {
		if (typeof targets === 'string') {
			targets = [targets];
		}
		const config = Object.assign({
			destBasePath: getDestBasePath()
		}, loadCfg);

		targets.forEach(function (target) {
			const targetPath = _resolve2.default.sync(target, { basedir: getPlopfilePath() });
			const proxy = nodePlop(targetPath, config);
			const proxyDefaultInclude = proxy.getDefaultInclude() || {};
			const includeCfg = includeOverride || proxyDefaultInclude;
			const include = Object.assign({
				generators: false,
				helpers: false,
				partials: false,
				actionTypes: false
			}, includeCfg);

			const genNameList = proxy.getGeneratorList().map(g => g.name);
			loadAsset(genNameList, include.generators, setGenerator, proxyName => ({ proxyName, proxy }));
			loadAsset(proxy.getPartialList(), include.partials, setPartial, proxy.getPartial);
			loadAsset(proxy.getHelperList(), include.helpers, setHelper, proxy.getHelper);
			loadAsset(proxy.getActionTypeList(), include.actionTypes, setActionType, proxy.getActionType);
		});
	}

	function loadAsset(nameList, include, addFunc, getFunc) {
		var incArr;
		if (include === true) {
			incArr = nameList;
		}
		if (include instanceof Array) {
			incArr = include.filter(n => typeof n === 'string');
		}
		if (incArr != null) {
			include = incArr.reduce(function (inc, name) {
				inc[name] = name;
				return inc;
			}, {});
		}

		if (include instanceof Object) {
			Object.keys(include).forEach(i => addFunc(include[i], getFunc(i)));
		}
	}

	function loadPackageJson() {
		// look for a package.json file to use for the "pkg" helper
		try {
			pkgJson = require(_path2.default.join(getDestBasePath(), 'package.json'));
		} catch (error) {
			pkgJson = {};
		}
	}

	/////////
	// the API that is exposed to the plopfile when it is executed
	// it differs from the nodePlopApi in that it does not include the
	// generator runner methods
	//
	const plopfileApi = {
		// main methods for setting and getting plop context things
		setPrompt,
		setWelcomeMessage, getWelcomeMessage,
		setGenerator, getGenerator, getGeneratorList,
		setPartial, getPartial, getPartialList,
		setHelper, getHelper, getHelperList,
		setActionType, getActionType, getActionTypeList,

		// path context methods
		setPlopfilePath, getPlopfilePath,
		getDestBasePath,

		// plop.load functionality
		load, setDefaultInclude, getDefaultInclude,

		// render a handlebars template
		renderString,

		// passthrough properties
		inquirer: _inquirer2.default, handlebars: _handlebars2.default,

		// passthroughs for backward compatibility
		addPrompt: setPrompt,
		addPartial: setPartial,
		addHelper: setHelper
	};

	// the runner for this instance of the nodePlop api
	const runner = (0, _generatorRunner2.default)(plopfileApi, { force });
	const nodePlopApi = Object.assign({}, plopfileApi, {
		getGenerator(name) {
			var generator = plopfileApi.getGenerator(name);

			// if this generator was loaded from an external plopfile, proxy the
			// generator request through to the external plop instance
			if (generator.proxy) {
				return generator.proxy.getGenerator(generator.proxyName);
			}

			return Object.assign({}, generator, {
				runActions: data => runner.runGeneratorActions(generator, data),
				runPrompts: (bypassArr = []) => runner.runGeneratorPrompts(generator, bypassArr)
			});
		},
		setGenerator(name, config) {
			const g = plopfileApi.setGenerator(name, config);
			return this.getGenerator(g.name);
		}
	});

	if (plopfilePath) {
		plopfilePath = _path2.default.resolve(plopfilePath);
		const plopFileName = _path2.default.basename(plopfilePath);
		setPlopfilePath(plopfilePath);
		loadPackageJson();

		require(_path2.default.join(plopfilePath, plopFileName))(plopfileApi, plopCfg);
	} else {
		setPlopfilePath(process.cwd());
		loadPackageJson();
	}

	return nodePlopApi;
}

exports.default = nodePlop;