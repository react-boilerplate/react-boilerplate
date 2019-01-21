/* @flow */
"use strict";

const _ = require("lodash");
const chalk = require("chalk");
const EOL = require("os").EOL;
const leven = require("leven");

/*:: type allowedOptionsType = { [key: string]: { alias?: string } }*/

const buildAllowedOptions = (allowedOptions /*: allowedOptionsType */) => {
  let options = Object.keys(allowedOptions);
  options = options.reduce((opts, opt) => {
    const alias = allowedOptions[opt].alias;
    if (alias) {
      opts.push(alias);
    }
    return opts;
  }, options);
  options.sort();
  return options;
};

const suggest = (all /*: string[]*/, invalid /*: string*/) => {
  const maxThreshold = 10;
  for (let threshold = 1; threshold <= maxThreshold; threshold++) {
    const suggestion = all.find(option => leven(option, invalid) <= threshold);
    if (suggestion) {
      return suggestion;
    }
  }
  return null;
};

const cliOption = (opt /*: string*/) =>
  opt.length === 1 ? `"-${opt}"` : `"--${_.kebabCase(opt)}"`;

const buildMessageLine = (invalid /*: string*/, suggestion /*: ?string*/) => {
  let line = `Invalid option ${chalk.red(cliOption(invalid))}.`;
  if (suggestion) {
    line += ` Did you mean ${chalk.cyan(cliOption(suggestion))}?`;
  }
  return line + EOL;
};

module.exports = function checkInvalidCLIOptions(
  allowedOptions /*: { [key: string]: any }*/,
  inputOptions /*: { [key: string]: any }*/
) /*: string*/ {
  const allOptions = buildAllowedOptions(allowedOptions);

  return Object.keys(inputOptions)
    .map(opt => _.kebabCase(opt))
    .filter(opt => !allOptions.includes(opt))
    .reduce((msg, invalid) => {
      // NOTE: No suggestion for shortcut options because it's too difficult
      const suggestion =
        invalid.length >= 2 ? suggest(allOptions, invalid) : null;
      return msg + buildMessageLine(invalid, suggestion);
    }, "");
};
