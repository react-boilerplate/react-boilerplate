var chalk = require('chalk');
var _ = require('lodash');
var defaultFormatter = require('./formatter');
var util = require('./util');

module.exports = function(opts) {
  var options = opts || {};

  var formatter = options.formatter || defaultFormatter({
    sortByPosition: (typeof options.sortByPosition !== 'undefined') ? options.sortByPosition : true,
    positionless: options.positionless || 'first',
    noIcon: options.noIcon,
    noPlugin: options.noPlugin,
  });

  var pluginFilter;
  if (!options.plugins) {
    // Every plugin
    pluginFilter = function() { return true; };
  } else if (options.plugins.every(function(plugin) { return plugin[0] === '!'; })) {
    // Blacklist
    pluginFilter = function(message) {
      return options.plugins.indexOf('!' + message.plugin) === -1;
    };
  } else {
    // Whitelist
    pluginFilter = function(message) {
      return options.plugins.indexOf(message.plugin) !== -1;
    };
  }

  var messageFilter = options.filter || function(message) { return (message.type === 'warning'); };

  return function(css, result) {
    var messagesToLog = result.messages
      .filter(pluginFilter)
      .filter(messageFilter);

    var resultSource = (!result.root.source) ? ''
      : result.root.source.input.file || result.root.source.input.id

    var sourceGroupedMessages = _.groupBy(messagesToLog, function(message) {
      return util.getLocation(message).file || resultSource;
    });

    var report = '';
    _.forOwn(sourceGroupedMessages, function(messages, source) {
      report += formatter({
        messages: messages,
        source: source,
      });
    });

    if (options.clearReportedMessages) {
      result.messages = _.difference(result.messages, messagesToLog);
    }

    if (options.clearAllMessages) {
      var messagesToClear = result.messages.filter(pluginFilter);
      result.messages = _.difference(result.messages, messagesToClear);
    }


    if (!report) return;

    console.log(report);

    if (options.throwError && shouldThrowError()) {
      throw new Error(chalk.red.bold('\n** postcss-reporter: warnings or errors were found **'));
    }

    function shouldThrowError() {
      return (
        messagesToLog.length
        && messagesToLog.some(function(message) {
          return message.type === 'warning' || message.type === 'error';
        })
      );
    }
  };
};
