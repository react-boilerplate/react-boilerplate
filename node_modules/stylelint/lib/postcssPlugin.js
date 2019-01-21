/* @flow */
"use strict";
/*:: type postcssType = {
  atRule: Function,
  comment: Function,
  decl: Function,
  list: any,
  parse: any,
  plugin: Function,
  root: Function,
  rule: Function,
  stringify: any,
  vendor: any,
} */
const _ = require("lodash");
const createStylelint = require("./createStylelint");
const path = require("path");
const postcss /*: postcssType*/ = require("postcss");
//'block-no-empty': bool || Array
/*:: type OptionsT = {
  config?: {
    extends?: Array<string>,
    plugins?: Array<string>,
    rules?: Object,
  };
  configBasedir?: string;
  configFile?: string;
  defaultSeverity?: string;
  from?: string;
  ignoreDisables?: boolean;
  ignoreFiles?: string;
  pluginFunctions?: Object;
  plugins?: Array<string>;
  rules?: Object;
}
*/

/*:: type rootParamT = {
  raws: {
    semicolon: boolean,
    after: string,
  },
  type: string,
  nodes: Array<Object>,
  source: {
    input: {
      css: string,
      id?: string,
      file?: string,
    },
    start: {
      line: number,
      column: number,
    }
  }
} */

/*:: type resultParamT = {
  processor: {
    version: string,
    plugins: Array<Object>,
  },
  messages: Array<any>,
  root: {
    raws: {
      semicolon: boolean,
      after: string,
    },
    type: string,
    nodes: Array<Object>,
    source: {
      input: Object,
      start: Object,
    },
  },
  opts: {
    config?: {
      rules: Object,
    },
    configFile?: string,
    defaultSeverity?: string,
    rules?: Object,
    ignoreDisables?: boolean,
    ignoreFiles?: string,
    from?: string,
    syntax?: {
      parse: Function,
      stringify: Function,
    }
  },
  css: ?any,
  map: ?any,
  lastPlugin: {
    postcssPlugin: string,
    postcssVersion: string,
  }
} */

/*:: type postcssPromise = Promise<?{ config: stylelint$config, filepath: string }>*/

module.exports = postcss.plugin("stylelint", function(
  options /*: OptionsT*/
) /*: Function*/ {
  options = options || {};

  const tailoredOptions /*: Object*/ = options.rules
    ? { config: options }
    : options;
  const stylelint /*: stylelint$internalApi*/ = createStylelint(
    tailoredOptions
  );

  // prettier-ignore
  return (root/*: rootParamT*/, result/*: resultParamT*/)/*: Promise<any>*/ => {
    let filePath = options.from || _.get(root, "source.input.file");
    if (filePath !== undefined && !path.isAbsolute(filePath)) {
      filePath = path.join(process.cwd(), filePath);
    }

    return stylelint._lintSource({
      filePath,
      existingPostcssResult: result
    });
  };
});
