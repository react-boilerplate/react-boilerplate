"use strict";

const eachRoot = require("../../utils/eachRoot");
const isCustomPropertySet = require("../../utils/isCustomPropertySet");
const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "no-extra-semicolons";

const messages = ruleMessages(ruleName, {
  rejected: "Unexpected extra semicolon"
});

function getOffsetByNode(node) {
  if (node.parent && node.parent.document) {
    return 0;
  }
  const string = node.root().source.input.css;
  const nodeColumn = node.source.start.column;
  const nodeLine = node.source.start.line;
  let line = 1;
  let column = 1;
  let index = 0;

  for (let i = 0; i < string.length; i++) {
    if (column === nodeColumn && nodeLine === line) {
      index = i;
      break;
    }

    if (string[i] === "\n") {
      column = 1;
      line += 1;
    } else {
      column += 1;
    }
  }

  return index;
}

const rule = function(actual) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual });
    if (!validOptions) {
      return;
    }

    eachRoot(root, checkRoot);

    function checkRoot(root) {
      const rawAfterRoot = root.raws.after;

      if (rawAfterRoot && rawAfterRoot.trim().length !== 0) {
        styleSearch({ source: rawAfterRoot, target: ";" }, match => {
          complain(
            root.source.input.css.length -
              rawAfterRoot.length +
              match.startIndex
          );
        });
      }

      root.walk(node => {
        if (
          node.type === "rule" &&
          !isCustomPropertySet(node) &&
          !isStandardSyntaxRule(node)
        ) {
          return;
        }

        let rawBeforeNode = node.raws.before;

        if (rawBeforeNode && rawBeforeNode.trim().length !== 0) {
          let allowedSemi = 0;

          const next = node.next();

          // Ignore semicolon before comment if next node is custom properties sets or comment
          if (
            node.type === "comment" &&
            next &&
            isCustomPropertySet(next) &&
            node.parent.index(next) > 0
          ) {
            allowedSemi = 1;
          }

          const prev = node.prev();

          // Adding previous node string to custom properties set if previous node is comment
          if (
            isCustomPropertySet(node) &&
            node.parent.index(node) > 0 &&
            prev &&
            prev.type === "comment"
          ) {
            rawBeforeNode = prev.toString() + rawBeforeNode;
            allowedSemi = 0;
          }

          styleSearch(
            { source: rawBeforeNode, target: ";" },
            (match, count) => {
              if (count === allowedSemi) {
                return;
              }

              complain(
                getOffsetByNode(node) - rawBeforeNode.length + match.startIndex
              );
            }
          );
        }

        const rawAfterNode = node.raws.after;

        if (rawAfterNode && rawAfterNode.trim().length !== 0) {
          /**
           * If the last child is a Less mixin followed by more than one semicolon,
           * node.raws.after will be populated with that semicolon.
           * Since we ignore Less mixins, exit here
           */
          if (
            node.last &&
            node.last.type === "rule" &&
            !isCustomPropertySet(node.last) &&
            !isStandardSyntaxRule(node.last)
          ) {
            return;
          }

          styleSearch({ source: rawAfterNode, target: ";" }, match => {
            const index =
              getOffsetByNode(node) +
              node.toString().length -
              1 -
              rawAfterNode.length +
              match.startIndex;

            complain(index);
          });
        }

        const rawOwnSemicolon = node.raws.ownSemicolon;

        if (rawOwnSemicolon) {
          let allowedSemi = 0;

          if (isCustomPropertySet(node)) {
            allowedSemi = 1;
          }

          styleSearch(
            { source: rawOwnSemicolon, target: ";" },
            (match, count) => {
              if (count === allowedSemi) {
                return;
              }

              const index =
                getOffsetByNode(node) +
                node.toString().length -
                rawOwnSemicolon.length +
                match.startIndex;
              complain(index);
            }
          );
        }
      });

      function complain(index) {
        report({
          message: messages.rejected,
          node: root,
          index,
          result,
          ruleName
        });
      }
    }
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
