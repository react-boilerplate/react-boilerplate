'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (plopfileApi, flags) {
	let abort;

	// triggers inquirer with the correct prompts for this generator
	// returns a promise that resolves with the user's answers
	const runGeneratorPrompts = _co2.default.wrap(function* (genObject, bypassArr = []) {
		const { prompts } = genObject;

		if (prompts == null) {
			throw Error(`${genObject.name} has no prompts`);
		}

		if (typeof prompts === 'function') {
			return yield prompts(plopfileApi.inquirer);
		}

		// handle bypass data when provided
		const [promptsAfterBypass, bypassAnswers] = (0, _promptBypass2.default)(prompts, bypassArr, plopfileApi);

		return yield plopfileApi.inquirer.prompt(promptsAfterBypass).then(answers => Object.assign(answers, bypassAnswers));
	});

	// Run the actions for this generator
	const runGeneratorActions = _co2.default.wrap(function* (genObject, data) {
		var changes = []; // array of changed made by the actions
		var failures = []; // array of actions that failed
		var { actions } = genObject; // the list of actions to execute
		const customActionTypes = getCustomActionTypes();
		const actionTypes = Object.assign({}, customActionTypes, buildInActions);

		abort = false;

		// if action is a function, run it to get our array of actions
		if (typeof actions === 'function') {
			actions = actions(data);
		}

		// if actions are not defined... we cannot proceed.
		if (actions == null) {
			throw Error(`${genObject.name} has no actions`);
		}

		// if actions are not an array, invalid!
		if (!(actions instanceof Array)) {
			throw Error(`${genObject.name} has invalid actions`);
		}

		for (let [actionIdx, action] of actions.entries()) {
			// bail out if a previous action aborted
			if (abort) {
				failures.push({
					type: action.type || '',
					path: action.path || '',
					error: 'Aborted due to previous action failure'
				});
				continue;
			}

			action.force = flags.force === true || action.force === true;

			const actionIsFunction = typeof action === 'function';
			const actionCfg = actionIsFunction ? {} : action;
			const actionLogic = actionIsFunction ? action : actionTypes[actionCfg.type];

			if (typeof actionLogic !== 'function') {
				if (actionCfg.abortOnFail !== false) {
					abort = true;
				}
				failures.push({
					type: action.type || '',
					path: action.path || '',
					error: `Invalid action (#${actionIdx + 1})`
				});
				continue;
			}

			try {
				const actionResult = yield executeActionLogic(actionLogic, actionCfg, data);
				changes.push(actionResult);
			} catch (failure) {
				failures.push(failure);
			}
		}

		return { changes, failures };
	});

	// handle action logic
	const executeActionLogic = _co2.default.wrap(function* (action, cfg, data) {
		const failure = makeErrorLogger(cfg.type || 'function', '', cfg.abortOnFail);

		// convert any returned data into a promise to
		// return and wait on
		const fullData = Object.assign({}, cfg.data, data);
		return yield Promise.resolve(action(fullData, cfg, plopfileApi)).then(
		// show the resolved value in the console
		result => ({
			type: cfg.type || 'function',
			path: _colors2.default.blue(result.toString())
		}),
		// a rejected promise is treated as a failure
		function (err) {
			throw failure(err.message || err.toString());
		});
	});

	// request the list of custom actions from the plopfile
	function getCustomActionTypes() {
		return plopfileApi.getActionTypeList().reduce(function (types, name) {
			types[name] = plopfileApi.getActionType(name);
			return types;
		}, {});
	}

	// provide a function to handle action errors in a uniform way
	function makeErrorLogger(type, path, abortOnFail) {
		return function (error) {
			if (abortOnFail !== false) {
				abort = true;
			}
			return { type, path, error };
		};
	}

	return {
		runGeneratorActions,
		runGeneratorPrompts
	};
};

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _promptBypass = require('./prompt-bypass');

var _promptBypass2 = _interopRequireDefault(_promptBypass);

var _actions = require('./actions');

var buildInActions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }