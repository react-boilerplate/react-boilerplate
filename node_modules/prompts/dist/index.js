'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Prompt for a series of questions
 * @param {Array|Object} questions Single question object or Array of question objects
 * @returns {Object} Object with values from user input
 */
let prompt = (() => {
  var _ref = _asyncToGenerator(function* (questions = [], { onSubmit = noop, onCancel = noop } = {}) {
    const answers = {};
    questions = [].concat(questions);
    let answer, question, quit, name, type;
    let MAP = prompt._map || {};

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = questions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        question = _step.value;
        var _question = question;
        name = _question.name;
        type = _question.type;


        if (MAP[name] !== void 0) {
          answers[name] = MAP[name];
          delete MAP[name];
          continue; // take val & run
        }

        // if property is a function, invoke it unless it's ignored
        for (let key in question) {
          if (ignore.includes(key)) continue;
          let value = question[key];
          question[key] = typeof value === 'function' ? yield value(answer, _extends({}, answers), question) : value;
        }

        if (typeof question.message !== 'string') {
          throw new Error('prompt message is required');
        }

        // update vars in case they changed


        // skip if type is a falsy value
        var _question2 = question;
        name = _question2.name;
        type = _question2.type;
        if (!type) continue;

        if (prompts[type] === void 0) {
          throw new Error(`prompt type (${type}) is not defined`);
        }

        try {
          answer = yield prompts[type](question);
          answers[name] = answer = question.format ? yield question.format(answer, answers) : answer;
          quit = onSubmit(question, answer);
        } catch (err) {
          quit = !onCancel(question);
        }

        if (quit) return answers;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return answers;
  });

  return function prompt() {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const prompts = require('./prompts');

const ignore = ['suggest', 'format', 'onState'];
const noop = () => {};

function inject(obj) {
  prompt._map = prompt._map || {};
  for (let k in obj) {
    prompt._map[k] = obj[k];
  }
}

module.exports = Object.assign(prompt, { prompt, prompts, inject });