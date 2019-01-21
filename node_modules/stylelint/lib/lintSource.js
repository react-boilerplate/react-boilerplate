/* @flow */
"use strict";

const _ = require("lodash");
const assignDisabledRanges = require("./assignDisabledRanges");
const configurationError = require("./utils/configurationError");
const getOsEol = require("./utils/getOsEol");
const path = require("path");
const requireRule = require("./requireRule");

/*:: type postcssResultT = {
  processor: {
    version: string,
    plugins: Array<Object>,
  },
  messages: Array<any>,
  root: {
    raws: {
      semicolon?: boolean,
      after: string,
    },
    type: string,
    nodes: Array<Object>,
    source: {
      input: Object,
      start: Object,
    },
    lastEach?: number,
    indexes?: Object,
    toResult: Function,
  },
  opts: {
    configFile?: string,
    defaultSeverity?: string,
    ignoreFiles?: Array<string>,
    rules?: Object,
    from?: ?string,
    syntax?: ?{
      parse: Function,
      stringify: Function,
    },
  },
  css: ?string,
  map: ?any,
  lastPlugin?: {
    postcssPlugin: string,
    postcssVersion: string,
  },
  stylelint: {
    customMessages: Object,
    ignored?: boolean,
    ignoreDisables?: boolean,
    ruleSeverities: Object,
    quiet?: boolean,
  },
}*/

/*:: type emptyPostcssResultT = {
  root: {
    source: {
      input: {
        file: ?string,
      },
    },
  },
  messages: Array<any>,
  stylelint: Object,
}*/

// Run stylelint on a PostCSS Result, either one that is provided
// or one that we create
module.exports = function lintSource(
  stylelint /*: stylelint$internalApi*/,
  options /*: {
    code?: string,
    codeFilename?: string, // Must be an absolute file path
    filePath?: string, // Must be an absolute file path
    existingPostcssResult?: Object,
  }*/
) /*: Promise<Object>*/ {
  options = options || {};

  if (
    !options.filePath &&
    options.code === undefined &&
    !options.existingPostcssResult
  ) {
    return Promise.reject(
      new Error("You must provide filePath, code, or existingPostcssResult")
    );
  }

  const isCodeNotFile = options.code !== undefined;

  const inputFilePath = isCodeNotFile ? options.codeFilename : options.filePath;
  if (inputFilePath !== undefined && !path.isAbsolute(inputFilePath)) {
    if (isCodeNotFile) {
      return Promise.reject(new Error("codeFilename must be an absolute path"));
    } else {
      return Promise.reject(new Error("filePath must be an absolute path"));
    }
  }

  const getIsIgnored = stylelint.isPathIgnored(inputFilePath).catch(err => {
    if (isCodeNotFile && err.code === "ENOENT") return false;
    throw err;
  });

  return getIsIgnored.then(isIgnored => {
    if (isIgnored) {
      const postcssResult /*: Object*/ =
        options.existingPostcssResult ||
        createEmptyPostcssResult(inputFilePath);
      postcssResult.stylelint = postcssResult.stylelint || {};
      postcssResult.stylelint.ignored = true;
      postcssResult.standaloneIgnored = true; // TODO: remove need for this
      return postcssResult;
    }

    const configSearchPath = stylelint._options.configFile || inputFilePath;

    const getConfig = stylelint
      .getConfigForFile(configSearchPath)
      .catch(err => {
        if (isCodeNotFile && err.code === "ENOENT")
          return stylelint.getConfigForFile(process.cwd());
        throw err;
      });

    return getConfig.then(result => {
      const config /*: stylelint$config*/ = result.config;
      const existingPostcssResult = options.existingPostcssResult;

      if (existingPostcssResult) {
        return lintPostcssResult(stylelint, existingPostcssResult, config).then(
          () => existingPostcssResult
        );
      }

      return stylelint
        ._getPostcssResult({
          code: options.code,
          codeFilename: options.codeFilename,
          filePath: inputFilePath,
          codeProcessors: config.codeProcessors
        })
        .then(postcssResult => {
          return lintPostcssResult(stylelint, postcssResult, config).then(
            () => postcssResult
          );
        });
    });
  });
};

function lintPostcssResult(
  stylelint /*: stylelint$internalApi*/,
  postcssResult /*: postcssResultT*/,
  config /*: stylelint$config*/
) /*: Promise<Array<*>>*/ {
  postcssResult.stylelint = postcssResult.stylelint || {};
  postcssResult.stylelint.ruleSeverities = {};
  postcssResult.stylelint.customMessages = {};
  postcssResult.stylelint.quiet = config.quiet;

  const newlineMatch = postcssResult.root
    .toResult({
      stringifier: postcssResult.opts.syntax
    })
    .css.match(/\r?\n/);
  const newline = newlineMatch ? newlineMatch[0] : getOsEol();

  const postcssRoot = postcssResult.root;
  assignDisabledRanges(postcssRoot, postcssResult);
  if (
    stylelint._options.reportNeedlessDisables ||
    stylelint._options.ignoreDisables
  ) {
    postcssResult.stylelint.ignoreDisables = true;
  }

  // Promises for the rules. Although the rule code runs synchronously now,
  // the use of Promises makes it compatible with the possibility of async
  // rules down the line.
  const performRules = [];

  const rules = config.rules ? Object.keys(config.rules) : [];

  rules.forEach(ruleName => {
    const ruleFunction =
      requireRule(ruleName) || _.get(config, ["pluginFunctions", ruleName]);

    if (ruleFunction === undefined) {
      throw configurationError(`Undefined rule ${ruleName}`);
    }

    const ruleSettings = _.get(config, ["rules", ruleName]);
    if (ruleSettings === null || ruleSettings[0] === null) {
      return;
    }

    const primaryOption = ruleSettings[0];
    const secondaryOptions = ruleSettings[1];

    // Log the rule's severity in the PostCSS result
    const defaultSeverity = config.defaultSeverity || "error";
    postcssResult.stylelint.ruleSeverities[ruleName] = _.get(
      secondaryOptions,
      "severity",
      defaultSeverity
    );
    postcssResult.stylelint.customMessages[ruleName] = _.get(
      secondaryOptions,
      "message"
    );

    const performRule = Promise.resolve().then(() => {
      return ruleFunction(primaryOption, secondaryOptions, {
        fix: stylelint._options.fix,
        newline
      })(postcssRoot, postcssResult);
    });
    performRules.push(performRule);
  });

  return Promise.all(performRules);
}

function createEmptyPostcssResult(
  filePath /*:: ?: string*/
) /*: emptyPostcssResultT*/ {
  return {
    root: {
      source: {
        input: { file: filePath }
      }
    },
    messages: [],
    stylelint: { stylelintError: null }
  };
}
