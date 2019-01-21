"use strict";

const configurationError = require("./configurationError");
const isSingleLineString = require("./isSingleLineString");
const isWhitespace = require("./isWhitespace");

/**
 * Create a whitespaceChecker, which exposes the following functions:
 * - `before()`
 * - `beforeAllowingIndentation()`
 * - `after()`
 * - `afterOneOnly()`
 *
 * @param {"space"|"newline"} targetWhitespace - This is a keyword instead
 *   of the actual character (e.g. " ") in order to accommodate
 *   different styles of newline ("\n" vs "\r\n")
 * @param {
 *     "always"|"never"
 *     |"always-single-line"|"always-multi-line"
 *     | "never-single-line"|"never-multi-line"
 *   } expectation
 * @param {object} messages - An object of message functions;
 *   calling `before*()` or `after*()` and the `expectation` that is passed
 *   determines which message functions are required
 * @param {function} [messages.exectedBefore]
 * @param {function} [messages.rejectedBefore]
 * @param {function} [messages.expectedAfter]
 * @param {function} [messages.rejectedAfter]
 * @param {function} [messages.expectedBeforeSingleLine]
 * @param {function} [messages.rejectedBeforeSingleLine]
 * @param {function} [messages.expectedBeforeMultiLine]
 * @param {function} [messages.rejectedBeforeMultiLine]
 * @return {object} The checker, with its exposed checking functions
 */
module.exports = function(
  targetWhitespace /*: "space" | "newline"*/,
  expectation /*: "always" | "never" | "always-single-line"
    | "always-multi-line" | "never-single-line"|"never-multi-line"*/,
  messages /*: Object*/
) /*: {
  before: Function,
  beforeAllowingIndentation: Function,
  after: Function,
  afterOneOnly: Function
}*/ {
  // Keep track of active arguments in order to avoid passing
  // too much stuff around, making signatures long and confusing.
  // This variable gets reset anytime a checking function is called.
  let activeArgs;

  /**
   * Check for whitespace *before* a character.
   *
   * @param {object} args - Named arguments object
   * @param {string} args.source - The source string
   * @param {number} args.index - The index of the character to check before
   * @param {function} args.err - If a violation is found, this callback
   *   will be invoked with the relevant warning message.
   *   Typically this callback will report() the violation.
   * @param {function} args.errTarget - If a violation is found, this string
   *   will be sent to the relevant warning message.
   * @param {string} [args.lineCheckStr] - Single- and multi-line checkers
   *   will use this string to determine whether they should proceed,
   *   i.e. if this string is one line only, single-line checkers will check,
   *   multi-line checkers will ignore.
   *   If none is passed, they will use `source`.
   * @param {boolean} [args.onlyOneChar=false] - Only check *one* character before.
   *   By default, "always-*" checks will look for the `targetWhitespace` one
   *   before and then ensure there is no whitespace two before. This option
   *   bypasses that second check.
   * @param {boolean} [args.allowIndentation=false] - Allow arbitrary indentation
   *   between the `targetWhitespace` (almost definitely a newline) and the `index`.
   *   With this option, the checker will see if a newline *begins* the whitespace before
   *   the `index`.
   */
  function before(args) {
    const source = args.source;
    const index = args.index;
    const err = args.err;
    const errTarget = args.errTarget;
    const lineCheckStr = args.lineCheckStr;
    const onlyOneChar =
      args.onlyOneChar === undefined ? false : args.onlyOneChar;
    const allowIndentation =
      args.allowIndentation === undefined ? false : args.allowIndentation;

    activeArgs = {
      source,
      index,
      err,
      errTarget,
      onlyOneChar,
      allowIndentation
    };
    switch (expectation) {
      case "always":
        expectBefore();
        break;
      case "never":
        rejectBefore();
        break;
      case "always-single-line":
        if (!isSingleLineString(lineCheckStr || source)) {
          return;
        }
        expectBefore(messages.expectedBeforeSingleLine);
        break;
      case "never-single-line":
        if (!isSingleLineString(lineCheckStr || source)) {
          return;
        }
        rejectBefore(messages.rejectedBeforeSingleLine);
        break;
      case "always-multi-line":
        if (isSingleLineString(lineCheckStr || source)) {
          return;
        }
        expectBefore(messages.expectedBeforeMultiLine);
        break;
      case "never-multi-line":
        if (isSingleLineString(lineCheckStr || source)) {
          return;
        }
        rejectBefore(messages.rejectedBeforeMultiLine);
        break;
      default:
        throw configurationError(`Unknown expectation "${expectation}"`);
    }
  }

  /**
   * Check for whitespace *after* a character.
   *
   * Parameters are pretty much the same as for `before()`, above, just substitute
   * the word "after" for "before".
   */
  function after(args) {
    const source = args.source;
    const index = args.index;
    const err = args.err;
    const errTarget = args.errTarget;
    const lineCheckStr = args.lineCheckStr;
    const onlyOneChar =
      args.onlyOneChar === undefined ? false : args.onlyOneChar;

    activeArgs = { source, index, err, errTarget, onlyOneChar };
    switch (expectation) {
      case "always":
        expectAfter();
        break;
      case "never":
        rejectAfter();
        break;
      case "always-single-line":
        if (!isSingleLineString(lineCheckStr || source)) {
          return;
        }
        expectAfter(messages.expectedAfterSingleLine);
        break;
      case "never-single-line":
        if (!isSingleLineString(lineCheckStr || source)) {
          return;
        }
        rejectAfter(messages.rejectedAfterSingleLine);
        break;
      case "always-multi-line":
        if (isSingleLineString(lineCheckStr || source)) {
          return;
        }
        expectAfter(messages.expectedAfterMultiLine);
        break;
      case "never-multi-line":
        if (isSingleLineString(lineCheckStr || source)) {
          return;
        }
        rejectAfter(messages.rejectedAfterMultiLine);
        break;
      default:
        throw configurationError(`Unknown expectation "${expectation}"`);
    }
  }

  function beforeAllowingIndentation(obj) {
    before(Object.assign({}, obj, { allowIndentation: true }));
  }

  function expectBefore() {
    const messageFunc =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : messages.expectedBefore;

    if (activeArgs.allowIndentation) {
      expectBeforeAllowingIndentation(messageFunc);
      return;
    }

    const _activeArgs = activeArgs;
    const source = _activeArgs.source;
    const index = _activeArgs.index;

    const oneCharBefore = source[index - 1];
    const twoCharsBefore = source[index - 2];

    if (!isValue(oneCharBefore)) {
      return;
    }

    if (targetWhitespace === "space" && oneCharBefore === " ") {
      if (activeArgs.onlyOneChar || !isWhitespace(twoCharsBefore)) {
        return;
      }
    }

    activeArgs.err(
      messageFunc(activeArgs.errTarget ? activeArgs.errTarget : source[index])
    );
  }

  function expectBeforeAllowingIndentation() {
    const messageFunc =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : messages.expectedBefore;
    const _activeArgs2 = activeArgs;
    const source = _activeArgs2.source;
    const index = _activeArgs2.index;
    const err = _activeArgs2.err;

    const expectedChar = (function() {
      if (targetWhitespace === "newline") {
        return "\n";
      }
    })();
    let i = index - 1;
    while (source[i] !== expectedChar) {
      if (source[i] === "\t" || source[i] === " ") {
        i--;
        continue;
      }
      err(
        messageFunc(activeArgs.errTarget ? activeArgs.errTarget : source[index])
      );
      return;
    }
  }

  function rejectBefore() {
    const messageFunc =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : messages.rejectedBefore;
    const _activeArgs3 = activeArgs;
    const source = _activeArgs3.source;
    const index = _activeArgs3.index;

    const oneCharBefore = source[index - 1];

    if (isValue(oneCharBefore) && isWhitespace(oneCharBefore)) {
      activeArgs.err(
        messageFunc(activeArgs.errTarget ? activeArgs.errTarget : source[index])
      );
    }
  }

  function afterOneOnly(obj) {
    after(Object.assign({}, obj, { onlyOneChar: true }));
  }

  function expectAfter() {
    const messageFunc =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : messages.expectedAfter;
    const _activeArgs4 = activeArgs;
    const source = _activeArgs4.source;
    const index = _activeArgs4.index;

    const oneCharAfter = source[index + 1];
    const twoCharsAfter = source[index + 2];

    if (!isValue(oneCharAfter)) {
      return;
    }

    if (targetWhitespace === "newline") {
      // If index is followed by a Windows CR-LF ...
      if (oneCharAfter === "\r" && twoCharsAfter === "\n") {
        if (activeArgs.onlyOneChar || !isWhitespace(source[index + 3])) {
          return;
        }
      }

      // If index is followed by a Unix LF ...
      if (oneCharAfter === "\n") {
        if (activeArgs.onlyOneChar || !isWhitespace(twoCharsAfter)) {
          return;
        }
      }
    }

    if (targetWhitespace === "space" && oneCharAfter === " ") {
      if (activeArgs.onlyOneChar || !isWhitespace(twoCharsAfter)) {
        return;
      }
    }

    activeArgs.err(
      messageFunc(activeArgs.errTarget ? activeArgs.errTarget : source[index])
    );
  }

  function rejectAfter() {
    const messageFunc =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : messages.rejectedAfter;
    const _activeArgs5 = activeArgs;
    const source = _activeArgs5.source;
    const index = _activeArgs5.index;

    const oneCharAfter = source[index + 1];

    if (isValue(oneCharAfter) && isWhitespace(oneCharAfter)) {
      activeArgs.err(
        messageFunc(activeArgs.errTarget ? activeArgs.errTarget : source[index])
      );
    }
  }

  return {
    before,
    beforeAllowingIndentation,
    after,
    afterOneOnly
  };
};

function isValue(x) {
  return x !== undefined && x !== null;
}
