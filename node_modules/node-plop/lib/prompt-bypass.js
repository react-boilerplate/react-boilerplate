'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (prompts, bypassArr, plop) {
	const noop = [prompts, {}, []];
	// bail out if we don't have prompts or bypass data
	if (!Array.isArray(prompts)) {
		return noop;
	}
	if (bypassArr.length === 0) {
		return noop;
	}

	// pull registered prompts out of inquirer
	const { prompts: inqPrompts } = plop.inquirer.prompt;

	const answers = {};
	const bypassFailures = [];

	// generate a list of pompts that the user is bypassing
	const bypassedPrompts = prompts.filter(function (p, idx) {
		// if the user didn't provide value for this prompt, skip it
		if (idx >= bypassArr.length) {
			return false;
		}
		const val = bypassArr[idx].toString();

		// if the user asked to be given this prompt, skip it
		if (flag.isPrompt(val)) {
			return false;
		}

		// if this prompt is dynamic, throw error because we can't know if
		// the pompt bypass values given line up with the path this user
		// has taken through the prompt tree.
		if (typeof p.when === 'function') {
			bypassFailures.push(`You can not bypass conditional prompts: ${p.name}`);
			return false;
		}

		try {
			const inqPrompt = inqPrompts[p.type] || {};
			// try to find a bypass function to run
			const bypass = p.bypass || inqPrompt.bypass || typeBypass[p.type] || null;

			// get the real answer data out of the bypass function and attach it
			// to the answer data object
			const bypassIsFunc = typeof bypass === 'function';
			const value = bypassIsFunc ? bypass.call(null, val, p) : val;

			// if inquirer prompt has a filter function - call it
			const answer = p.filter ? p.filter(value) : value;

			answers[p.name] = answer;
		} catch (err) {
			// if we encounter an error above... assume the bypass value was invalid
			bypassFailures.push(`The "${p.name}" prompt did not recognize "${val}" as a valid ${p.type} value (ERROR: ${err.message})`);
			return false;
		}

		// if we got this far, we successfully bypassed this prompt
		return true;
	});

	// rip out any prompts that have been bypassed
	const promptsAfterBypass = [
	// first prompt will copy the bypass answer data so it's available
	// for prompts and actions to use
	{ when: data => (Object.assign(data, answers), false) },
	// inlcude any prompts that were NOT bypassed
	...prompts.filter(p => !bypassedPrompts.includes(p))];

	// if we have failures, throw the first one
	if (bypassFailures.length) {
		throw Error(bypassFailures[0]);
	} else {
		// return the prompts that still need to be run
		return [promptsAfterBypass, answers];
	}
	// BOOM!
};

/* ========================================================================
 * PROMPT BYPASSING
 * -----------------
 * this allows a user to bypass a prompt by supplying input before
 * the prompts are run. we handle input differently depending on the
 * type of prompt that's in play (ie "y" means "true" for a confirm prompt)
 * ======================================================================== */

/////
// HELPER FUNCTIONS
//

// pull the "value" out of a choice option
const getChoiceValue = choice => {
	const isObject = typeof choice === 'object';
	if (isObject && choice.value != null) {
		return choice.value;
	}
	if (isObject && choice.name != null) {
		return choice.name;
	}
	if (isObject && choice.key != null) {
		return choice.key;
	}
	return choice;
};

// check if a bypass value matches some aspect of
// a particular choice option (index, value, key, etc)
const choiceMatchesValue = (choice, choiceIdx, value) => {
	const choiceValue = getChoiceValue(choice);

	const valueMatchesChoice = choiceValue && choiceValue.toLowerCase() === value.toLowerCase();
	const valueMatchesChoiceKey = typeof choice.key === 'string' && choice.key.toLowerCase() === value.toLowerCase();
	const valueMatchesChoiceName = typeof choice.name === 'string' && choice.name.toLowerCase() === value.toLowerCase();
	const valueMatchesChoiceIndex = choiceIdx.toString() === value;

	return valueMatchesChoice || valueMatchesChoiceKey || valueMatchesChoiceName || valueMatchesChoiceIndex;
};

// check if a value matches a particular set of flagged input options
const isFlag = (list, v) => list.includes(v.toLowerCase());
// input values that represent different types of responses
const flag = {
	isTrue: v => isFlag(['yes', 'y', 'true', 't'], v),
	isFalse: v => isFlag(['no', 'n', 'false', 'f'], v),
	isPrompt: v => /^_+$/.test(v)
};

// generic list bypass function. used for all types of lists.
// accepts value, index, or key as matching criteria
const listTypeBypass = (v, prompt) => {
	const choice = prompt.choices.find((c, idx) => choiceMatchesValue(c, idx, v));
	if (choice != null) {
		return getChoiceValue(choice);
	}
	throw Error('invalid choice');
};

/////
// BYPASS FUNCTIONS
//

// list of prompt bypass functions by prompt type
const typeBypass = {
	confirm(v) {
		if (flag.isTrue(v)) {
			return true;
		}
		if (flag.isFalse(v)) {
			return false;
		}
		throw Error('invalid input');
	},
	checkbox(v, prompt) {
		const valList = v.split(',');
		const valuesNoMatch = valList.filter(val => !prompt.choices.some((c, idx) => choiceMatchesValue(c, idx, val)));
		if (valuesNoMatch.length) {
			throw Error(`no match for "${valuesNoMatch.join('", "')}"`);
		}

		return valList.map(val => getChoiceValue(prompt.choices.find((c, idx) => choiceMatchesValue(c, idx, val))));
	},
	list: listTypeBypass,
	rawlist: listTypeBypass,
	expand: listTypeBypass
};

/////
// MAIN LOGIC
//

// returns new prompts, initial answers object, and any failures