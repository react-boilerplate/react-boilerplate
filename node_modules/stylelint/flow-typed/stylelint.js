export type stylelint$configExtends = string | Array<string>;
export type stylelint$configPlugins = string | Array<string>;
export type stylelint$configProcessors =
  | string
  | Array<string | [string, Object]>;
export type stylelint$configIgnoreFiles = string | Array<string>;

export type stylelint$configRuleSettings = any | [any, Object];
export type stylelint$configRules = {
  [ruleName: string]: stylelint$configRuleSettings
};

export type stylelint$config = {
  extends?: stylelint$configExtends,
  plugins?: stylelint$configPlugins,
  pluginFunctions?: {
    [pluginName: string]: Function
  },
  processors?: stylelint$configProcessors,
  processorFunctions?: Array<Function>,
  ignoreFiles?: stylelint$configIgnoreFiles,
  ignorePatterns?: string,
  rules?: stylelint$configRules,
  codeProcessors?: Array<Function>,
  resultProcessors?: Array<Function>,
  quiet?: boolean,
  defaultSeverity?: string
};

export type stylelint$syntaxes = "scss" | "less" | "sugarss";

export type stylelint$options = {
  config?: stylelint$config,
  configFile?: string,
  configBasedir?: string,
  configOverrides?: Object,
  ignoreDisables?: boolean,
  ignorePath?: string,
  reportNeedlessDisables?: boolean,
  syntax?: stylelint$syntaxes,
  customSyntax?: string,
  fix?: boolean
};

export type stylelint$internalApi = {
  _options: stylelint$options,
  _extendExplorer: {
    search: string => Promise<null | Object>,
    load: string => Promise<null | Object>
  },
  _fullExplorer: {
    search: string => Promise<null | Object>,
    load: string => Promise<null | Object>
  },
  _configCache: Map<string, Object>,
  _specifiedConfigCache: Map<string, Object>,
  _postcssResultCache: Map<string, Object>,

  _augmentConfig: Function,
  _getPostcssResult: Function,
  _lintSource: Function,
  _createStylelintResult: Function,
  _createEmptyPostcssResult?: Function,

  getConfigForFile: Function,
  isPathIgnored: Function,
  lintSource: Function
};

export type stylelint$warning = {
  line: number,
  column: number,
  rule: string,
  severity: string,
  text: string
};

export type stylelint$result = {
  source: string,
  deprecations: Array<{
    text: string,
    reference: string
  }>,
  invalidOptionWarnings: Array<{
    text: string
  }>,
  parseErrors: Array<stylelint$warning>,
  errored?: boolean,
  warnings: Array<stylelint$warning>,
  ignored?: boolean,
  _postcssResult?: Object
};

export type stylelint$cssSyntaxError = {
  column: number,
  file?: string,
  input: {
    column: number,
    file?: string,
    line: number,
    source: string
  },
  line: number,
  message: string,
  name: string,
  reason: string,
  source: string
};

export type stylelint$needlessDisablesReport = Array<{
  source: string,
  ranges: Array<{
    start: number,
    end?: number
  }>
}>;

export type stylelint$standaloneReturnValue = {
  results: Array<stylelint$result>,
  errored: boolean,
  output: any,
  maxWarningsExceeded?: {
    maxWarnings: number,
    foundWarnings: number
  },
  needlessDisables?: stylelint$needlessDisablesReport
};

export type stylelint$standaloneOptions = {
  files?: string | Array<string>,
  globbyOptions?: Object,
  cache?: boolean,
  cacheLocation?: string,
  code?: string,
  codeFilename?: string,
  config?: stylelint$config,
  configFile?: string,
  configBasedir?: string,
  configOverrides?: Object,
  ignoreDisables?: boolean,
  ignorePath?: string,
  ignorePattern?: RegExp,
  reportNeedlessDisables?: boolean,
  maxWarnings?: number,
  syntax?: stylelint$syntaxes,
  customSyntax?: string,
  formatter?: "json" | "string" | "verbose" | Function,
  disableDefaultIgnores?: boolean,
  allowEmptyInput?: boolean,
  fix?: boolean
};
