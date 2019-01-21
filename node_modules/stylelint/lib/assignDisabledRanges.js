/* @flow */
"use strict";
const _ = require("lodash");

const COMMAND_PREFIX = "stylelint-";
const disableCommand = COMMAND_PREFIX + "disable";
const enableCommand = COMMAND_PREFIX + "enable";
const disableLineCommand = COMMAND_PREFIX + "disable-line";
const disableNextLineCommand = COMMAND_PREFIX + "disable-next-line";
const ALL_RULES = "all";

/*:: type disabledRangeObject = {
  [ruleName: string]: Array<{
    start: number,
    end?: number,
  }>
}*/

// Run it like a plugin ...
module.exports = function(
  root /*: Object*/,
  result /*: Object*/
) /*: postcss$result*/ {
  result.stylelint = result.stylelint || {};

  // Most of the functions below work via side effects mutating
  // this object
  const disabledRanges /*: disabledRangeObject*/ = {
    all: []
  };
  result.stylelint.disabledRanges = disabledRanges;
  root.walkComments(checkComment);

  return result;

  function processDisableLineCommand(comment /*: postcss$comment*/) {
    getCommandRules(disableLineCommand, comment.text).forEach(ruleName => {
      disableLine(comment.source.start.line, ruleName, comment);
    });
  }

  function processDisableNextLineCommand(comment /*: postcss$comment*/) {
    getCommandRules(disableNextLineCommand, comment.text).forEach(ruleName => {
      disableLine(comment.source.start.line + 1, ruleName, comment);
    });
  }

  function disableLine(
    line /*: number*/,
    ruleName /*: string*/,
    comment /*: postcss$comment*/
  ) {
    if (ruleIsDisabled(ALL_RULES)) {
      throw comment.error("All rules have already been disabled", {
        plugin: "stylelint"
      });
    }
    if (ruleIsDisabled(ruleName)) {
      throw comment.error(`"${ruleName}" has already been disabled`, {
        plugin: "stylelint"
      });
    }
    if (ruleName === ALL_RULES) {
      Object.keys(disabledRanges).forEach(disabledRuleName => {
        startDisabledRange(line, disabledRuleName);
        endDisabledRange(line, disabledRuleName);
      });
    } else {
      startDisabledRange(line, ruleName);
      endDisabledRange(line, ruleName);
    }
  }

  function processDisableCommand(comment /*: postcss$comment*/) {
    getCommandRules(disableCommand, comment.text).forEach(ruleToDisable => {
      if (ruleToDisable === ALL_RULES) {
        if (ruleIsDisabled(ALL_RULES)) {
          throw comment.error("All rules have already been disabled", {
            plugin: "stylelint"
          });
        }
        Object.keys(disabledRanges).forEach(ruleName => {
          startDisabledRange(comment.source.start.line, ruleName);
        });
        return;
      }

      if (ruleIsDisabled(ruleToDisable)) {
        throw comment.error(`"${ruleToDisable}" has already been disabled`, {
          plugin: "stylelint"
        });
      }
      startDisabledRange(comment.source.start.line, ruleToDisable);
    });
  }

  function processEnableCommand(comment /*: postcss$comment*/) {
    getCommandRules(enableCommand, comment.text).forEach(ruleToEnable => {
      if (ruleToEnable === ALL_RULES) {
        if (
          _.values(disabledRanges).every(
            ranges => _.isEmpty(ranges) || !!_.last(ranges.end)
          )
        ) {
          throw comment.error("No rules have been disabled", {
            plugin: "stylelint"
          });
        }
        Object.keys(disabledRanges).forEach(ruleName => {
          if (!_.get(_.last(disabledRanges[ruleName]), "end")) {
            endDisabledRange(comment.source.end.line, ruleName);
          }
        });
        return;
      }

      if (
        ruleIsDisabled(ALL_RULES) &&
        disabledRanges[ruleToEnable] === undefined
      ) {
        // Get a starting point from the where all rules were disabled
        if (!disabledRanges[ruleToEnable]) {
          disabledRanges[ruleToEnable] = _.cloneDeep(disabledRanges.all);
        } else {
          disabledRanges[ruleToEnable].push(
            _.clone(_.last(disabledRanges[ALL_RULES]))
          );
        }
        endDisabledRange(comment.source.end.line, ruleToEnable);
        return;
      }

      if (ruleIsDisabled(ruleToEnable)) {
        endDisabledRange(comment.source.end.line, ruleToEnable);
        return;
      }

      throw comment.error(`"${ruleToEnable}" has not been disabled`, {
        plugin: "stylelint"
      });
    });
  }

  function checkComment(comment /*: postcss$comment*/) {
    const text = comment.text;

    // Ignore comments that are not relevant commands

    if (text.indexOf(COMMAND_PREFIX) !== 0) {
      return result;
    }

    if (text.indexOf(disableLineCommand) === 0) {
      processDisableLineCommand(comment);
    } else if (text.indexOf(disableNextLineCommand) === 0) {
      processDisableNextLineCommand(comment);
    } else if (text.indexOf(disableCommand) === 0) {
      processDisableCommand(comment);
    } else if (text.indexOf(enableCommand) === 0) {
      processEnableCommand(comment);
    }
  }

  function getCommandRules(
    command /*: string*/,
    fullText /*: string*/
  ) /*: Array<string>*/ {
    const rules = _.compact(fullText.slice(command.length).split(",")).map(r =>
      r.trim()
    );
    if (_.isEmpty(rules)) {
      return [ALL_RULES];
    }
    return rules;
  }

  function startDisabledRange(line /*: number*/, ruleName /*: string*/) {
    const rangeObj = { start: line };
    ensureRuleRanges(ruleName);
    disabledRanges[ruleName].push(rangeObj);
  }

  function endDisabledRange(line /*: number*/, ruleName /*: string*/) {
    const lastRangeForRule = _.last(disabledRanges[ruleName]);
    if (!lastRangeForRule) {
      return;
    }
    // Add an `end` prop to the last range of that rule
    lastRangeForRule.end = line;
  }

  function ensureRuleRanges(ruleName /*: string*/) {
    if (!disabledRanges[ruleName]) {
      disabledRanges[ruleName] = _.cloneDeep(disabledRanges.all);
    }
  }

  function ruleIsDisabled(ruleName /*: string*/) /*: boolean*/ {
    if (disabledRanges[ruleName] === undefined) return false;
    if (_.last(disabledRanges[ruleName]) === undefined) return false;
    if (_.get(_.last(disabledRanges[ruleName]), "end") === undefined)
      return true;
    return false;
  }
};
