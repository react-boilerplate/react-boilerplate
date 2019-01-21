/* @flow */
"use strict";

/**
 * Given an object of violation messages, return another
 * that provides the same messages postfixed with the rule
 * that has been violated.
 *
 * @param {string} ruleName
 * @param {object} messages - Object whose keys are message identifiers
 *   and values are either message strings or functions that return message strings
 * @return {object} New message object, whose messages will be marked with the rule name
 */
module.exports = function(
  ruleName /*: string*/,
  messages /*: Object*/
) /*: Object*/ {
  return Object.keys(messages).reduce((newMessages, messageId) => {
    const messageText = messages[messageId];
    if (typeof messageText === "string") {
      newMessages[messageId] = `${messageText} (${ruleName})`;
    } else {
      newMessages[messageId] = function() {
        return `${messageText.apply(null, arguments)} (${ruleName})`;
      };
    }
    return newMessages;
  }, {});
};
