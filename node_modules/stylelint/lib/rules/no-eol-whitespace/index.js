"use strict";

const eachRoot = require("../../utils/eachRoot");
const isOnlyWhitespace = require("../../utils/isOnlyWhitespace");
const optionsMatches = require("../../utils/optionsMatches");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "no-eol-whitespace";

const messages = ruleMessages(ruleName, {
  rejected: "Unexpected whitespace at end of line"
});

const whitespacesToReject = new Set([" ", "\t"]);

const rule = function(on, options, context) {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      {
        actual: on
      },
      {
        optional: true,
        actual: options,
        possible: {
          ignore: ["empty-lines"]
        }
      }
    );
    if (!validOptions) {
      return;
    }

    eachRoot(root, checkRoot);

    function checkRoot(root) {
      if (context.fix) {
        fix(root);
      }

      const rootString = context.fix ? root.toString() : root.source.input.css;

      eachEolWhitespace(
        rootString,
        index => {
          report({
            message: messages.rejected,
            node: root,
            index,
            result,
            ruleName
          });
        },
        true
      );
    }

    /**
     * Iterate each whitespace at the end of each line of the given string.
     * @param {string} string the source code string
     * @param {Function} callback callback the whitespace index at the end of each line.
     * @param {boolean} isRootFirst set `true` if the given string is the first token of the root.
     * @returns {void}
     */
    function eachEolWhitespace(string, callback, isRootFirst) {
      styleSearch(
        {
          source: string,
          target: ["\n", "\r"],
          comments: "check"
        },
        match => {
          const eolWhitespaceIndex = match.startIndex - 1;
          // If the character before newline is not whitespace, ignore
          if (!whitespacesToReject.has(string[eolWhitespaceIndex])) {
            return;
          }

          if (optionsMatches(options, "ignore", "empty-lines")) {
            // If there is only whitespace between the previous newline and
            // this newline, ignore
            const beforeNewlineIndex = string.lastIndexOf(
              "\n",
              eolWhitespaceIndex
            );
            if (beforeNewlineIndex >= 0 || isRootFirst) {
              const line = string.substring(
                beforeNewlineIndex,
                eolWhitespaceIndex
              );

              if (isOnlyWhitespace(line)) {
                return;
              }
            }
          }
          callback(eolWhitespaceIndex);
        }
      );
    }

    function fix(root) {
      let isRootFirst = true;
      root.walk(node => {
        fixText(
          node.raws.before,
          fixed => {
            node.raws.before = fixed;
          },
          isRootFirst
        );
        isRootFirst = false;

        // AtRule
        fixText(node.raws.afterName, fixed => {
          node.raws.afterName = fixed;
        });
        if (node.raws.params) {
          fixText(node.raws.params.raw, fixed => {
            node.raws.params.raw = fixed;
          });
        } else {
          fixText(node.params, fixed => {
            node.params = fixed;
          });
        }

        // Rule
        if (node.raws.selector) {
          fixText(node.raws.selector.raw, fixed => {
            node.raws.selector.raw = fixed;
          });
        } else {
          fixText(node.selector, fixed => {
            node.selector = fixed;
          });
        }

        // AtRule or Rule or Decl
        fixText(node.raws.between, fixed => {
          node.raws.between = fixed;
        });

        // Decl
        if (node.raws.value) {
          fixText(node.raws.value.raw, fixed => {
            node.raws.value.raw = fixed;
          });
        } else {
          fixText(node.value, fixed => {
            node.value = fixed;
          });
        }

        // Comment
        fixText(node.raws.left, fixed => {
          node.raws.left = fixed;
        });
        fixText(node.text, fixed => {
          node.text = fixed;
        });

        //
        fixText(node.raws.after, fixed => {
          node.raws.after = fixed;
        });
      });

      fixText(
        root.raws.after,
        fixed => {
          root.raws.after = fixed;
        },
        isRootFirst
      );
    }

    function fixText(value, fix, isRootFirst) {
      if (!value) {
        return;
      }
      let fixed = "";
      let lastIndex = 0;
      eachEolWhitespace(
        value,
        index => {
          const newlineIndex = index + 1;
          fixed += value.slice(lastIndex, newlineIndex).replace(/[ \t]+$/, "");
          lastIndex = newlineIndex;
        },
        isRootFirst
      );
      if (lastIndex) {
        fixed += value.slice(lastIndex);
        fix(fixed);
      }
    }
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
