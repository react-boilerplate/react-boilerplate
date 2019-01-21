/* @flow */
"use strict";
const _ = require("lodash");
const configurationError = require("./utils/configurationError");
const dynamicRequire = require("./dynamicRequire");
const getModulePath = require("./utils/getModulePath");
const globjoin = require("globjoin");
const normalizeRuleSettings = require("./normalizeRuleSettings");
const path = require("path");
const requireRule = require("./requireRule");

// - Merges config and configOverrides
// - Makes all paths absolute
// - Merges extends
function augmentConfigBasic(
  stylelint /*: stylelint$internalApi*/,
  config /*: stylelint$config*/,
  configDir /*: string*/,
  allowOverrides /*:: ?: boolean*/
) /*: Promise<stylelint$config>*/ {
  return Promise.resolve()
    .then(() => {
      if (!allowOverrides) return config;
      return _.merge(config, stylelint._options.configOverrides);
    })
    .then(augmentedConfig => {
      return extendConfig(stylelint, augmentedConfig, configDir);
    })
    .then(augmentedConfig => {
      return absolutizePaths(augmentedConfig, configDir);
    });
}

// Extended configs need to be run through augmentConfigBasic
// but do not need the full treatment. Things like pluginFunctions
// will be resolved and added by the parent config.
function augmentConfigExtended(
  stylelint /*: stylelint$internalApi*/,
  cosmiconfigResultArg /*: ?{
     config: stylelint$config,
     filepath: string,
   }*/
) /*: Promise<?{ config: stylelint$config, filepath: string }>*/ {
  const cosmiconfigResult = cosmiconfigResultArg; // Lock in for Flow
  if (!cosmiconfigResult) return Promise.resolve(null);

  const configDir = path.dirname(cosmiconfigResult.filepath || "");
  const cleanedConfig = _.omit(cosmiconfigResult.config, "ignoreFiles");
  return augmentConfigBasic(stylelint, cleanedConfig, configDir).then(
    augmentedConfig => {
      return {
        config: augmentedConfig,
        filepath: cosmiconfigResult.filepath
      };
    }
  );
}

function augmentConfigFull(
  stylelint /*: stylelint$internalApi*/,
  cosmiconfigResultArg /*: ?{
   config: stylelint$config,
   filepath: string,
  }*/
) /*: Promise<?{ config: stylelint$config, filepath: string }>*/ {
  const cosmiconfigResult = cosmiconfigResultArg; // Lock in for Flow
  if (!cosmiconfigResult) return Promise.resolve(null);

  const config = cosmiconfigResult.config;
  const filepath = cosmiconfigResult.filepath;

  const configDir =
    stylelint._options.configBasedir || path.dirname(filepath || "");

  return augmentConfigBasic(stylelint, config, configDir, true)
    .then(augmentedConfig => {
      return addPluginFunctions(augmentedConfig);
    })
    .then(augmentedConfig => {
      return addProcessorFunctions(augmentedConfig);
    })
    .then(augmentedConfig => {
      if (!augmentedConfig.rules) {
        throw configurationError(
          'No rules found within configuration. Have you provided a "rules" property?'
        );
      }

      return normalizeAllRuleSettings(augmentedConfig);
    })
    .then(augmentedConfig => {
      return {
        config: augmentedConfig,
        filepath: cosmiconfigResult.filepath
      };
    });
}

// Make all paths in the config absolute:
// - ignoreFiles
// - plugins
// - processors
// (extends handled elsewhere)
function absolutizePaths(
  config /*: stylelint$config*/,
  configDir /*: string*/
) /*: stylelint$config*/ {
  if (config.ignoreFiles) {
    config.ignoreFiles = [].concat(config.ignoreFiles).map(glob => {
      if (path.isAbsolute(glob.replace(/^!/, ""))) return glob;
      return globjoin(configDir, glob);
    });
  }

  if (config.plugins) {
    config.plugins = [].concat(config.plugins).map(lookup => {
      return getModulePath(configDir, lookup);
    });
  }

  if (config.processors) {
    config.processors = absolutizeProcessors(config.processors, configDir);
  }

  return config;
}

// Processors are absolutized in their own way because
// they can be and return a string or an array
function absolutizeProcessors(
  processors /*: stylelint$configProcessors*/,
  configDir /*: string*/
) /*: stylelint$configProcessors*/ {
  const normalizedProcessors = Array.isArray(processors)
    ? processors
    : [processors];

  return normalizedProcessors.map(item => {
    if (typeof item === "string") {
      return getModulePath(configDir, item);
    }

    return [getModulePath(configDir, item[0]), item[1]];
  });
}

function extendConfig(
  stylelint /*: stylelint$internalApi*/,
  config /*: stylelint$config*/,
  configDir /*: string*/
) /*: Promise<stylelint$config>*/ {
  if (config.extends === undefined) return Promise.resolve(config);
  const normalizedExtends = Array.isArray(config.extends)
    ? config.extends
    : [config.extends];

  const originalWithoutExtends = _.omit(config, "extends");
  const loadExtends = normalizedExtends.reduce(
    (resultPromise, extendLookup) => {
      return resultPromise.then(resultConfig => {
        return loadExtendedConfig(
          stylelint,
          resultConfig,
          configDir,
          extendLookup
        ).then(extendResult => {
          if (!extendResult) return resultConfig;
          return mergeConfigs(resultConfig, extendResult.config);
        });
      });
    },
    Promise.resolve(originalWithoutExtends)
  );

  return loadExtends.then(resultConfig => {
    return mergeConfigs(resultConfig, originalWithoutExtends);
  });
}

function loadExtendedConfig(
  stylelint /*: stylelint$internalApi*/,
  config /*: stylelint$config*/,
  configDir /*: string*/,
  extendLookup /*: string*/
) /*: Promise<?{ config: stylelint$config, filepath: string }>*/ {
  const extendPath = getModulePath(configDir, extendLookup);
  return stylelint._extendExplorer.load(extendPath);
}

// When merging configs (via extends)
// - plugin and processor arrays are joined
// - rules are merged via Object.assign, so there is no attempt made to
//   merge any given rule's settings. If b contains the same rule as a,
//   b's rule settings will override a's rule settings entirely.
// - Everything else is merged via Object.assign
function mergeConfigs(
  a /*: stylelint$config*/,
  b /*: stylelint$config*/
) /*: stylelint$config*/ {
  const pluginMerger = {};
  if (a.plugins || b.plugins) {
    pluginMerger.plugins = [];
    if (a.plugins) {
      pluginMerger.plugins = pluginMerger.plugins.concat(a.plugins);
    }
    if (b.plugins) {
      pluginMerger.plugins = _.uniq(pluginMerger.plugins.concat(b.plugins));
    }
  }

  const processorMerger = {};
  if (a.processors || b.processors) {
    processorMerger.processors = [];
    if (a.processors) {
      processorMerger.processors = processorMerger.processors.concat(
        a.processors
      );
    }
    if (b.processors) {
      processorMerger.processors = _.uniq(
        processorMerger.processors.concat(b.processors)
      );
    }
  }

  const rulesMerger = {};
  if (a.rules || b.rules) {
    rulesMerger.rules = Object.assign({}, a.rules, b.rules);
  }

  const result = Object.assign(
    {},
    a,
    b,
    processorMerger,
    pluginMerger,
    rulesMerger
  );
  return result;
}

function addPluginFunctions(
  config /*: stylelint$config*/
) /*: stylelint$config*/ {
  if (!config.plugins) return config;

  const normalizedPlugins = Array.isArray(config.plugins)
    ? config.plugins
    : [config.plugins];

  const pluginFunctions = normalizedPlugins.reduce((result, pluginLookup) => {
    let pluginImport = dynamicRequire(pluginLookup);
    // Handle either ES6 or CommonJS modules
    pluginImport = pluginImport.default || pluginImport;

    // A plugin can export either a single rule definition
    // or an array of them
    const normalizedPluginImport = Array.isArray(pluginImport)
      ? pluginImport
      : [pluginImport];

    normalizedPluginImport.forEach(pluginRuleDefinition => {
      if (!pluginRuleDefinition.ruleName) {
        throw configurationError(
          "stylelint v3+ requires plugins to expose a ruleName. " +
            `The plugin "${pluginLookup}" is not doing this, so will not work ` +
            "with stylelint v3+. Please file an issue with the plugin."
        );
      }

      if (!_.includes(pluginRuleDefinition.ruleName, "/")) {
        throw configurationError(
          "stylelint v7+ requires plugin rules to be namspaced, " +
            "i.e. only `plugin-namespace/plugin-rule-name` plugin rule names are supported. " +
            `The plugin rule "${
              pluginRuleDefinition.ruleName
            }" does not do this, so will not work. ` +
            "Please file an issue with the plugin."
        );
      }

      result[pluginRuleDefinition.ruleName] = pluginRuleDefinition.rule;
    });

    return result;
  }, {});

  config.pluginFunctions = pluginFunctions;
  return config;
}

function normalizeAllRuleSettings(
  config /*: stylelint$config*/
) /*: stylelint$config*/ {
  const normalizedRules = {};
  if (!config.rules) return config;
  Object.keys(config.rules).forEach(ruleName => {
    const rawRuleSettings = _.get(config, ["rules", ruleName]);

    const rule =
      requireRule(ruleName) || _.get(config, ["pluginFunctions", ruleName]);

    if (!rule) {
      throw configurationError(`Undefined rule ${ruleName}`);
    }
    normalizedRules[ruleName] = normalizeRuleSettings(
      rawRuleSettings,
      ruleName,
      _.get(rule, "primaryOptionArray")
    );
  });
  config.rules = normalizedRules;
  return config;
}

// Given an array of processors strings, we want to add two
// properties to the augmented config:
// - codeProcessors: functions that will run on code as it comes in
// - resultProcessors: functions that will run on results as they go out
//
// To create these properties, we need to:
// - Find the processor module
// - Intialize the processor module by calling its functions with any
//   provided options
// - Push the processor's code and result processors to their respective arrays
const processorCache = new Map();
function addProcessorFunctions(
  config /*: stylelint$config*/
) /*: stylelint$config*/ {
  if (!config.processors) return config;

  const codeProcessors = [];
  const resultProcessors = [];
  [].concat(config.processors).forEach(processorConfig => {
    const processorKey = JSON.stringify(processorConfig);

    let initializedProcessor;
    if (processorCache.has(processorKey)) {
      initializedProcessor = processorCache.get(processorKey);
    } else {
      processorConfig = [].concat(processorConfig);
      const processorLookup = processorConfig[0];
      const processorOptions = processorConfig[1];
      let processor = dynamicRequire(processorLookup);
      processor = processor.default || processor;
      initializedProcessor = processor(processorOptions);
      processorCache.set(processorKey, initializedProcessor);
    }

    if (initializedProcessor && initializedProcessor.code) {
      codeProcessors.push(initializedProcessor.code);
    }
    if (initializedProcessor && initializedProcessor.result) {
      resultProcessors.push(initializedProcessor.result);
    }
  });

  config.codeProcessors = codeProcessors;
  config.resultProcessors = resultProcessors;
  return config;
}

module.exports = { augmentConfigExtended, augmentConfigFull };
