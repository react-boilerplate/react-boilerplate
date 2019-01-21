"use strict";

const _ = require("lodash");
const beforeBlockString = require("../../utils/beforeBlockString");
const hasBlock = require("../../utils/hasBlock");
const optionsMatches = require("../../utils/optionsMatches");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "indentation";
const messages = ruleMessages(ruleName, {
  expected: x => `Expected indentation of ${x}`
});

/**
 * @param {number|"tab"} space - Number of whitespaces to expect, or else
 *   keyword "tab" for single `\t`
 * @param {object} [options]
 */
const rule = function(space, options, context) {
  options = options || {};

  const isTab = space === "tab";
  const indentChar = isTab ? "\t" : _.repeat(" ", space);
  const warningWord = isTab ? "tab" : "space";

  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      {
        actual: space,
        possible: [_.isNumber, "tab"]
      },
      {
        actual: options,
        possible: {
          baseIndentLevel: [_.isNumber, "auto"],
          except: ["block", "value", "param"],
          ignore: ["value", "param", "inside-parens"],
          indentInsideParens: ["twice", "once-at-root-twice-in-block"],
          indentClosingBrace: [_.isBoolean]
        },
        optional: true
      }
    );
    if (!validOptions) {
      return;
    }

    // Cycle through all nodes using walk.
    root.walk(node => {
      const nodeLevel = indentationLevel(node);

      // Cut out any * and _ hacks from `before`
      const before = (node.raws.before || "").replace(/[*_]$/, "");
      const after = node.raws.after || "";
      const parent = node.parent;

      const expectedOpeningBraceIndentation = _.repeat(indentChar, nodeLevel);

      // Only inspect the spaces before the node
      // if this is the first node in root
      // or there is a newline in the `before` string.
      // (If there is no newline before a node,
      // there is no "indentation" to check.)
      const isFirstChild = parent.type === "root" && parent.first === node;
      const lastIndexOfNewline = before.lastIndexOf("\n");
      // Inspect whitespace in the `before` string that is
      // *after* the *last* newline character,
      // because anything besides that is not indentation for this node:
      // it is some other kind of separation, checked by some separate rule
      if (
        (lastIndexOfNewline !== -1 ||
          (isFirstChild &&
            (!parent.document ||
              parent.raws.beforeStart.slice(-1) === "\n"))) &&
        before.slice(lastIndexOfNewline + 1) !== expectedOpeningBraceIndentation
      ) {
        if (context.fix) {
          if (isFirstChild && _.isString(node.raws.before)) {
            node.raws.before = node.raws.before.replace(
              /^[ \t]*(?=\S|$)/,
              expectedOpeningBraceIndentation
            );
          }
          node.raws.before = fixIndentation(
            node.raws.before,
            expectedOpeningBraceIndentation
          );
        } else {
          report({
            message: messages.expected(legibleExpectation(nodeLevel)),
            node,
            result,
            ruleName
          });
        }
      }

      // Only blocks have the `after` string to check.
      // Only inspect `after` strings that start with a newline;
      // otherwise there's no indentation involved.
      // And check `indentClosingBrace` to see if it should be indented an extra level.
      const closingBraceLevel = options.indentClosingBrace
        ? nodeLevel + 1
        : nodeLevel;
      const expectedClosingBraceIndentation = _.repeat(
        indentChar,
        closingBraceLevel
      );
      if (
        hasBlock(node) &&
        after &&
        after.indexOf("\n") !== -1 &&
        after.slice(after.lastIndexOf("\n") + 1) !==
          expectedClosingBraceIndentation
      ) {
        if (context.fix) {
          node.raws.after = fixIndentation(
            node.raws.after,
            expectedClosingBraceIndentation
          );
        } else {
          report({
            message: messages.expected(legibleExpectation(closingBraceLevel)),
            node,
            index: node.toString().length - 1,
            result,
            ruleName
          });
        }
      }

      // If this is a declaration, check the value
      if (node.value) {
        checkValue(node, nodeLevel);
      }

      // If this is a rule, check the selector
      if (node.selector) {
        checkSelector(node, nodeLevel);
      }

      // If this is an at rule, check the params
      if (node.type === "atrule") {
        checkAtRuleParams(node, nodeLevel);
      }
    });

    function indentationLevel(node, level) {
      level = level || 0;

      if (node.parent.type === "root") {
        return (
          level +
          getRootBaseIndentLevel(node.parent, options.baseIndentLevel, space)
        );
      }

      let calculatedLevel;

      // Indentation level equals the ancestor nodes
      // separating this node from root; so recursively
      // run this operation
      calculatedLevel = indentationLevel(node.parent, level + 1);

      // If options.except includes "block",
      // blocks are taken down one from their calculated level
      // (all blocks are the same level as their parents)
      if (
        optionsMatches(options, "except", "block") &&
        (node.type === "rule" || node.type === "atrule") &&
        hasBlock(node)
      ) {
        calculatedLevel--;
      }

      return calculatedLevel;
    }

    function checkValue(decl, declLevel) {
      if (decl.value.indexOf("\n") === -1) {
        return;
      }
      if (optionsMatches(options, "ignore", "value")) {
        return;
      }

      const declString = decl.toString();
      const valueLevel = optionsMatches(options, "except", "value")
        ? declLevel
        : declLevel + 1;

      checkMultilineBit(declString, valueLevel, decl);
    }

    function checkSelector(rule, ruleLevel) {
      const selector = rule.selector;

      // Less mixins have params, and they should be indented extra
      if (rule.params) {
        ruleLevel += 1;
      }

      checkMultilineBit(selector, ruleLevel, rule);
    }

    function checkAtRuleParams(atRule, ruleLevel) {
      if (optionsMatches(options, "ignore", "param")) {
        return;
      }

      // @nest and SCSS's @at-root rules should be treated like regular rules, not expected
      // to have their params (selectors) indented
      const paramLevel =
        optionsMatches(options, "except", "param") ||
        atRule.name === "nest" ||
        atRule.name === "at-root"
          ? ruleLevel
          : ruleLevel + 1;

      checkMultilineBit(beforeBlockString(atRule).trim(), paramLevel, atRule);
    }

    function checkMultilineBit(source, newlineIndentLevel, node) {
      if (source.indexOf("\n") === -1) {
        return;
      }

      // Data for current node fixing
      const fixPositions = [];

      // `outsideParens` because function arguments and also non-standard parenthesized stuff like
      // Sass maps are ignored to allow for arbitrary indentation
      let parentheticalDepth = 0;

      styleSearch(
        {
          source,
          target: "\n",
          outsideParens: optionsMatches(options, "ignore", "inside-parens")
        },
        (match, matchCount) => {
          const precedesClosingParenthesis = /^[ \t]*\)/.test(
            source.slice(match.startIndex + 1)
          );

          if (
            optionsMatches(options, "ignore", "inside-parens") &&
            (precedesClosingParenthesis || match.insideParens)
          ) {
            return;
          }

          let expectedIndentLevel = newlineIndentLevel;

          // Modififications for parenthetical content
          if (
            !optionsMatches(options, "ignore", "inside-parens") &&
            match.insideParens
          ) {
            // If the first match in is within parentheses, reduce the parenthesis penalty
            if (matchCount === 1) parentheticalDepth -= 1;

            // Account for windows line endings
            let newlineIndex = match.startIndex;
            if (source[match.startIndex - 1] === "\r") {
              newlineIndex--;
            }

            const followsOpeningParenthesis = /\([ \t]*$/.test(
              source.slice(0, newlineIndex)
            );
            if (followsOpeningParenthesis) {
              parentheticalDepth += 1;
            }

            const followsOpeningBrace = /\{[ \t]*$/.test(
              source.slice(0, newlineIndex)
            );
            if (followsOpeningBrace) {
              parentheticalDepth += 1;
            }

            const startingClosingBrace = /^[ \t]*}/.test(
              source.slice(match.startIndex + 1)
            );
            if (startingClosingBrace) {
              parentheticalDepth -= 1;
            }

            expectedIndentLevel += parentheticalDepth;

            // Past this point, adjustments to parentheticalDepth affect next line

            if (precedesClosingParenthesis) {
              parentheticalDepth -= 1;
            }

            switch (options.indentInsideParens) {
              case "twice":
                if (!precedesClosingParenthesis || options.indentClosingBrace) {
                  expectedIndentLevel += 1;
                }
                break;
              case "once-at-root-twice-in-block":
                if (node.parent === node.root()) {
                  if (
                    precedesClosingParenthesis &&
                    !options.indentClosingBrace
                  ) {
                    expectedIndentLevel -= 1;
                  }
                  break;
                }
                if (!precedesClosingParenthesis || options.indentClosingBrace) {
                  expectedIndentLevel += 1;
                }
                break;
              default:
                if (precedesClosingParenthesis && !options.indentClosingBrace) {
                  expectedIndentLevel -= 1;
                }
            }
          }

          // Starting at the index after the newline, we want to
          // check that the whitespace characters (excluding newlines) before the first
          // non-whitespace character equal the expected indentation
          const afterNewlineSpaceMatches = /^([ \t]*)\S/.exec(
            source.slice(match.startIndex + 1)
          );

          if (!afterNewlineSpaceMatches) {
            return;
          }

          const afterNewlineSpace = afterNewlineSpaceMatches[1];
          const expectedIndentation = _.repeat(indentChar, expectedIndentLevel);

          if (afterNewlineSpace !== expectedIndentation) {
            if (context.fix) {
              // Adding fixes position in reverse order, because if we change indent in the beginning of the string it will break all following fixes for that string
              fixPositions.unshift({
                expectedIndentation,
                currentIndentation: afterNewlineSpace,
                startIndex: match.startIndex
              });
            } else {
              report({
                message: messages.expected(
                  legibleExpectation(expectedIndentLevel)
                ),
                node,
                index: match.startIndex + afterNewlineSpace.length + 1,
                result,
                ruleName
              });
            }
          }
        }
      );

      if (fixPositions.length) {
        if (node.type === "rule") {
          fixPositions.forEach(function(fixPosition) {
            node.selector = replaceIndentation(
              node.selector,
              fixPosition.currentIndentation,
              fixPosition.expectedIndentation,
              fixPosition.startIndex
            );
          });
        }

        if (node.type === "decl") {
          const declProp = node.prop;
          const declBetween = node.raws.between;

          fixPositions.forEach(function(fixPosition) {
            if (fixPosition.startIndex < declProp.length + declBetween.length) {
              node.raws.between = replaceIndentation(
                declBetween,
                fixPosition.currentIndentation,
                fixPosition.expectedIndentation,
                fixPosition.startIndex - declProp.length
              );
            } else {
              node.value = replaceIndentation(
                node.value,
                fixPosition.currentIndentation,
                fixPosition.expectedIndentation,
                fixPosition.startIndex - declProp.length - declBetween.length
              );
            }
          });
        }

        if (node.type === "atrule") {
          const atRuleName = node.name;
          const atRuleAfterName = node.raws.afterName;
          const atRuleParams = node.params;

          fixPositions.forEach(function(fixPosition) {
            // 1 — it's a @ length
            if (
              fixPosition.startIndex <
              1 + atRuleName.length + atRuleAfterName.length
            ) {
              node.raws.afterName = replaceIndentation(
                atRuleAfterName,
                fixPosition.currentIndentation,
                fixPosition.expectedIndentation,
                fixPosition.startIndex - atRuleName.length - 1
              );
            } else {
              node.params = replaceIndentation(
                atRuleParams,
                fixPosition.currentIndentation,
                fixPosition.expectedIndentation,
                fixPosition.startIndex -
                  atRuleName.length -
                  atRuleAfterName.length -
                  1
              );
            }
          });
        }
      }
    }
  };

  function legibleExpectation(level) {
    const count = isTab ? level : level * space;
    const quantifiedWarningWord = count === 1 ? warningWord : warningWord + "s";

    return `${count} ${quantifiedWarningWord}`;
  }
};

function getRootBaseIndentLevel(root, baseIndentLevel, space) {
  const document = root.document;
  if (!document) {
    return 0;
  }
  let indentLevel = root.source.baseIndentLevel;
  if (!Number.isSafeInteger(indentLevel)) {
    indentLevel = inferRootIndentLevel(root, baseIndentLevel, () =>
      inferDocIndentSize(document, space)
    );
    root.source.baseIndentLevel = indentLevel;
  }
  return indentLevel;
}

function inferDocIndentSize(document, space) {
  let indentSize = document.source.indentSize;
  if (Number.isSafeInteger(indentSize)) {
    return indentSize;
  }
  const source = document.source.input.css;
  const indents = source.match(/^ *(?=\S)/gm);
  if (indents) {
    const scores = {};
    let lastIndentSize = 0;
    let lastLeadingSpacesLength = 0;
    const vote = leadingSpacesLength => {
      if (leadingSpacesLength) {
        lastIndentSize =
          Math.abs(leadingSpacesLength - lastLeadingSpacesLength) ||
          lastIndentSize;
        if (lastIndentSize > 1) {
          if (scores[lastIndentSize]) {
            scores[lastIndentSize]++;
          } else {
            scores[lastIndentSize] = 1;
          }
        }
      } else {
        lastIndentSize = 0;
      }
      lastLeadingSpacesLength = leadingSpacesLength;
    };

    indents.forEach(leadingSpaces => {
      vote(leadingSpaces.length);
    });

    let bestScore = 0;

    for (const indentSizeDate in scores) {
      const score = scores[indentSizeDate];
      if (score > bestScore) {
        bestScore = score;
        indentSize = indentSizeDate;
      }
    }
  }

  indentSize = +indentSize || (indents && indents[0].length) || +space || 2;
  document.source.indentSize = indentSize;
  return indentSize;
}

function inferRootIndentLevel(root, baseIndentLevel, indentSize) {
  function getIndentLevel(indent) {
    let tabCount = indent.match(/\t/g);
    tabCount = tabCount ? tabCount.length : 0;
    let spaceCount = indent.match(/ /g);
    spaceCount = spaceCount ? Math.round(spaceCount.length / indentSize()) : 0;
    return tabCount + spaceCount;
  }

  if (!Number.isSafeInteger(baseIndentLevel)) {
    let source = root.source.input.css;
    source = source.replace(
      /^[^\r\n]+/,
      firstLine =>
        /(?:^|\n)([ \t]*)$/.test(root.raws.beforeStart)
          ? RegExp.$1 + firstLine
          : ""
    );

    const indents = source.match(/^[ \t]*(?=\S)/gm);
    if (indents) {
      return Math.min.apply(Math, indents.map(getIndentLevel));
    } else {
      baseIndentLevel = 1;
    }
  }

  const indents = [];

  if (/(?:^|\n)([ \t]*)\S[^\r\n]*(?:\r?\n\s*)*$/.test(root.raws.beforeStart)) {
    indents.push(RegExp.$1);
  }

  const after = root.raws.after;
  if (after) {
    let afterEnd;
    if (after.slice(-1) === "\n") {
      const document = root.document;
      afterEnd = document.nodes[root.nodes.indexOf(root) + 1];
      if (afterEnd) {
        afterEnd = afterEnd.raws.beforeStart;
      } else {
        afterEnd = document.raws.afterEnd;
      }
    } else {
      afterEnd = after;
    }
    indents.push(afterEnd.match(/^[ \t]*/)[0]);
  }

  if (indents.length) {
    return Math.max.apply(Math, indents.map(getIndentLevel)) + baseIndentLevel;
  }

  return baseIndentLevel;
}

function fixIndentation(str, whitespace) {
  if (!_.isString(str)) {
    return str;
  }

  return str.replace(/\n[ \t]*(?=\S|$)/g, "\n" + whitespace);
}

function replaceIndentation(input, searchString, replaceString, startIndex) {
  const offset = startIndex + 1;
  const stringStart = input.slice(0, offset);
  const stringEnd = input.slice(offset + searchString.length);

  return stringStart + replaceString + stringEnd;
}

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
