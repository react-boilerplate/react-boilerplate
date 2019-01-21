'use strict';

const prompts = require('./prompts');

const ignore = ['suggest', 'format', 'onState'];
const noop = () => {};

/**
 * Prompt for a series of questions
 * @param {Array|Object} questions Single question object or Array of question objects
 * @returns {Object} Object with values from user input
 */
async function prompt(questions=[], { onSubmit=noop, onCancel=noop }={}) {
  const answers = {};
  questions = [].concat(questions);
  let answer, question, quit, name, type;
  let MAP = prompt._map || {};

  for (question of questions) {
    ({ name, type } = question);

    if (MAP[name] !== void 0) {
      answers[name] = MAP[name];
      delete MAP[name];
      continue; // take val & run
    }

    // if property is a function, invoke it unless it's ignored
    for (let key in question) {
      if (ignore.includes(key)) continue;
      let value = question[key];
      question[key] = typeof value === 'function' ? await value(answer, { ...answers }, question) : value;
    }

    if (typeof question.message !== 'string') {
      throw new Error('prompt message is required');
    }

    // update vars in case they changed
    ({ name, type } = question);

    // skip if type is a falsy value
    if (!type) continue;

    if (prompts[type] === void 0) {
      throw new Error(`prompt type (${type}) is not defined`);
    }

    try {
      answer = await prompts[type](question);
      answers[name] = answer = question.format ? await question.format(answer, answers) : answer;
      quit = onSubmit(question, answer);
    } catch (err) {
      quit = !onCancel(question);
    }

    if (quit) return answers;
  }

  return answers;
}

function inject(obj) {
  prompt._map = prompt._map || {};
  for (let k in obj) {
    prompt._map[k] = obj[k];
  }
}

module.exports = Object.assign(prompt, { prompt, prompts, inject });
