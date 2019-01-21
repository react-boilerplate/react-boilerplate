'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = normalize;

var _crypto;

function _load_crypto() {
  return (_crypto = _interopRequireDefault(require('crypto')));
}

var _glob;

function _load_glob() {
  return (_glob = _interopRequireDefault(require('glob')));
}

var _path;

function _load_path() {
  return (_path = _interopRequireDefault(require('path')));
}

var _jestValidate;

function _load_jestValidate() {
  return (_jestValidate = require('jest-validate'));
}

var _validatePattern;

function _load_validatePattern() {
  return (_validatePattern = _interopRequireDefault(
    require('./validatePattern')
  ));
}

var _jestUtil;

function _load_jestUtil() {
  return (_jestUtil = require('jest-util'));
}

var _chalk;

function _load_chalk() {
  return (_chalk = _interopRequireDefault(require('chalk')));
}

var _getMaxWorkers;

function _load_getMaxWorkers() {
  return (_getMaxWorkers = _interopRequireDefault(require('./getMaxWorkers')));
}

var _micromatch;

function _load_micromatch() {
  return (_micromatch = _interopRequireDefault(require('micromatch')));
}

var _jestResolve;

function _load_jestResolve() {
  return (_jestResolve = _interopRequireDefault(require('jest-resolve')));
}

var _jestRegexUtil;

function _load_jestRegexUtil() {
  return (_jestRegexUtil = require('jest-regex-util'));
}

var _utils;

function _load_utils() {
  return (_utils = require('./utils'));
}

var _constants;

function _load_constants() {
  return (_constants = require('./constants'));
}

var _ReporterValidationErrors;

function _load_ReporterValidationErrors() {
  return (_ReporterValidationErrors = require('./ReporterValidationErrors'));
}

var _Defaults;

function _load_Defaults() {
  return (_Defaults = _interopRequireDefault(require('./Defaults')));
}

var _Deprecated;

function _load_Deprecated() {
  return (_Deprecated = _interopRequireDefault(require('./Deprecated')));
}

var _setFromArgv;

function _load_setFromArgv() {
  return (_setFromArgv = _interopRequireDefault(require('./setFromArgv')));
}

var _ValidConfig;

function _load_ValidConfig() {
  return (_ValidConfig = _interopRequireDefault(require('./ValidConfig')));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i];
    return arr2;
  } else {
    return Array.from(arr);
  }
}
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const ERROR = `${(_utils || _load_utils()).BULLET}Validation Error`;
const PRESET_EXTENSIONS = ['.json', '.js'];
const PRESET_NAME = 'jest-preset';

const createConfigError = message =>
  new (_jestValidate || _load_jestValidate()).ValidationError(
    ERROR,
    message,
    (_utils || _load_utils()).DOCUMENTATION_NOTE
  );

const mergeOptionWithPreset = (options, preset, optionName) => {
  if (options[optionName] && preset[optionName]) {
    options[optionName] = Object.assign(
      {},
      options[optionName],
      preset[optionName],
      options[optionName]
    );
  }
};

const setupPreset = (options, optionsPreset) => {
  let preset;
  const presetPath = (0, (_utils || _load_utils()).replaceRootDirInPath)(
    options.rootDir,
    optionsPreset
  );
  const presetModule = (
    _jestResolve || _load_jestResolve()
  ).default.findNodeModule(
    presetPath.startsWith('.')
      ? presetPath
      : (_path || _load_path()).default.join(presetPath, PRESET_NAME),
    {
      basedir: options.rootDir,
      extensions: PRESET_EXTENSIONS
    }
  );

  try {
    // Force re-evaluation to support multiple projects
    try {
      if (presetModule) {
        delete require.cache[require.resolve(presetModule)];
      }
    } catch (e) {}

    // $FlowFixMe
    preset = require(presetModule);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw createConfigError(
        `  Preset ${(_chalk || _load_chalk()).default.bold(
          presetPath
        )} is invalid:\n  ${error.message}`
      );
    }

    const preset = (_jestResolve || _load_jestResolve()).default.findNodeModule(
      presetPath,
      {
        basedir: options.rootDir
      }
    );

    if (preset) {
      throw createConfigError(
        `  Module ${(_chalk || _load_chalk()).default.bold(
          presetPath
        )} should have "jest-preset.js" or "jest-preset.json" file at the root.`
      );
    }

    throw createConfigError(
      `  Preset ${(_chalk || _load_chalk()).default.bold(
        presetPath
      )} not found.`
    );
  }

  if (options.setupFiles) {
    options.setupFiles = (preset.setupFiles || []).concat(options.setupFiles);
  }
  if (options.modulePathIgnorePatterns && preset.modulePathIgnorePatterns) {
    options.modulePathIgnorePatterns = preset.modulePathIgnorePatterns.concat(
      options.modulePathIgnorePatterns
    );
  }
  mergeOptionWithPreset(options, preset, 'moduleNameMapper');
  mergeOptionWithPreset(options, preset, 'transform');

  return Object.assign({}, preset, options);
};

const setupBabelJest = options => {
  const transform = options.transform;
  let babelJest;
  if (transform) {
    const customJSPattern = Object.keys(transform).find(pattern => {
      const regex = new RegExp(pattern);
      return regex.test('a.js') || regex.test('a.jsx');
    });

    if (customJSPattern) {
      const customJSTransformer = transform[customJSPattern];

      if (customJSTransformer === 'babel-jest') {
        babelJest = require.resolve('babel-jest');
        transform[customJSPattern] = babelJest;
      } else if (customJSTransformer.includes('babel-jest')) {
        babelJest = customJSTransformer;
      }
    }
  } else {
    babelJest = require.resolve('babel-jest');
    options.transform = {
      [(_constants || _load_constants()).DEFAULT_JS_PATTERN]: babelJest
    };
  }

  return babelJest;
};

const normalizeCollectCoverageOnlyFrom = (options, key) => {
  const collectCoverageOnlyFrom = Array.isArray(options[key])
    ? options[key] // passed from argv
    : Object.keys(options[key]); // passed from options
  return collectCoverageOnlyFrom.reduce((map, filePath) => {
    filePath = (_path || _load_path()).default.resolve(
      options.rootDir,
      (0, (_utils || _load_utils()).replaceRootDirInPath)(
        options.rootDir,
        filePath
      )
    );
    map[filePath] = true;
    return map;
  }, Object.create(null));
};

const normalizeCollectCoverageFrom = (options, key) => {
  let value;
  if (!options[key]) {
    value = [];
  }

  if (!Array.isArray(options[key])) {
    try {
      value = JSON.parse(options[key]);
    } catch (e) {}

    Array.isArray(value) || (value = [options[key]]);
  } else {
    value = options[key];
  }

  if (value) {
    value = value.map(filePath =>
      filePath.replace(/^(!?)(<rootDir>\/)(.*)/, '$1$3')
    );
  }

  return value;
};

const normalizeUnmockedModulePathPatterns = (
  options,
  key
  // _replaceRootDirTags is specifically well-suited for substituting
  // <rootDir> in paths (it deals with properly interpreting relative path
  // separators, etc).
  //
  // For patterns, direct global substitution is far more ideal, so we
  // special case substitutions for patterns here.
) =>
  options[key].map(pattern =>
    (0, (_jestRegexUtil || _load_jestRegexUtil()).replacePathSepForRegex)(
      pattern.replace(/<rootDir>/g, options.rootDir)
    )
  );

const normalizePreprocessor = options => {
  if (options.scriptPreprocessor && options.transform) {
    throw createConfigError(`  Options: ${(
      _chalk || _load_chalk()
    ).default.bold('scriptPreprocessor')} and ${(
      _chalk || _load_chalk()
    ).default.bold('transform')} cannot be used together.
  Please change your configuration to only use ${(
    _chalk || _load_chalk()
  ).default.bold('transform')}.`);
  }

  if (options.preprocessorIgnorePatterns && options.transformIgnorePatterns) {
    throw createConfigError(`  Options ${(_chalk || _load_chalk()).default.bold(
      'preprocessorIgnorePatterns'
    )} and ${(_chalk || _load_chalk()).default.bold(
      'transformIgnorePatterns'
    )} cannot be used together.
  Please change your configuration to only use ${(
    _chalk || _load_chalk()
  ).default.bold('transformIgnorePatterns')}.`);
  }

  if (options.scriptPreprocessor) {
    options.transform = {
      '.*': options.scriptPreprocessor
    };
  }

  if (options.preprocessorIgnorePatterns) {
    options.transformIgnorePatterns = options.preprocessorIgnorePatterns;
  }

  delete options.scriptPreprocessor;
  delete options.preprocessorIgnorePatterns;
  return options;
};

const normalizeMissingOptions = options => {
  if (!options.name) {
    options.name = (_crypto || _load_crypto()).default
      .createHash('md5')
      .update(options.rootDir)
      .digest('hex');
  }

  if (!options.setupFiles) {
    options.setupFiles = [];
  }

  return options;
};

const normalizeRootDir = options => {
  // Assert that there *is* a rootDir
  if (!options.hasOwnProperty('rootDir')) {
    throw createConfigError(
      `  Configuration option ${(_chalk || _load_chalk()).default.bold(
        'rootDir'
      )} must be specified.`
    );
  }
  options.rootDir = (_path || _load_path()).default.normalize(options.rootDir);
  return options;
};

const normalizeReporters = (options, basedir) => {
  const reporters = options.reporters;
  if (!reporters || !Array.isArray(reporters)) {
    return options;
  }

  (0,
  (_ReporterValidationErrors || _load_ReporterValidationErrors())
    .validateReporters)(reporters);
  options.reporters = reporters.map(reporterConfig => {
    const normalizedReporterConfig =
      typeof reporterConfig === 'string' // if reporter config is a string, we wrap it in an array
        ? // and pass an empty object for options argument, to normalize
          // the shape.
          [reporterConfig, {}]
        : reporterConfig;

    const reporterPath = (0, (_utils || _load_utils()).replaceRootDirInPath)(
      options.rootDir,
      normalizedReporterConfig[0]
    );

    if (
      reporterPath !== (_constants || _load_constants()).DEFAULT_REPORTER_LABEL
    ) {
      const reporter = (
        _jestResolve || _load_jestResolve()
      ).default.findNodeModule(reporterPath, {
        basedir: options.rootDir
      });
      if (!reporter) {
        throw new Error(
          `Could not resolve a module for a custom reporter.\n` +
            `  Module name: ${reporterPath}`
        );
      }
      normalizedReporterConfig[0] = reporter;
    }
    return normalizedReporterConfig;
  });

  return options;
};

const buildTestPathPattern = argv => {
  const patterns = [];

  if (argv._) {
    patterns.push.apply(patterns, _toConsumableArray(argv._));
  }
  if (argv.testPathPattern) {
    patterns.push.apply(patterns, _toConsumableArray(argv.testPathPattern));
  }

  const replacePosixSep = pattern => {
    if ((_path || _load_path()).default.sep === '/') {
      return pattern;
    }
    return pattern.replace(/\//g, '\\\\');
  };

  const testPathPattern = patterns.map(replacePosixSep).join('|');
  if (
    (0, (_validatePattern || _load_validatePattern()).default)(testPathPattern)
  ) {
    return testPathPattern;
  } else {
    showTestPathPatternError(testPathPattern);
    return '';
  }
};

const showTestPathPatternError = testPathPattern => {
  (0, (_jestUtil || _load_jestUtil()).clearLine)(process.stdout);

  console.log(
    (_chalk || _load_chalk()).default.red(
      `  Invalid testPattern ${testPathPattern} supplied. ` +
        `Running all tests instead.`
    )
  );
};

function normalize(options, argv) {
  var _validate = (0, (_jestValidate || _load_jestValidate()).validate)(
    options,
    {
      comment: (_utils || _load_utils()).DOCUMENTATION_NOTE,
      deprecatedConfig: (_Deprecated || _load_Deprecated()).default,
      exampleConfig: (_ValidConfig || _load_ValidConfig()).default,
      recursiveBlacklist: [
        'collectCoverageOnlyFrom',
        // 'coverageThreshold' allows to use 'global' and glob strings on the same
        // level, there's currently no way we can deal with such config
        'coverageThreshold',
        'globals',
        'moduleNameMapper',
        'testEnvironmentOptions',
        'transform'
      ]
    }
  );

  const hasDeprecationWarnings = _validate.hasDeprecationWarnings;

  options = normalizePreprocessor(
    normalizeReporters(
      normalizeMissingOptions(
        normalizeRootDir(
          (0, (_setFromArgv || _load_setFromArgv()).default)(options, argv)
        )
      )
    )
  );

  if (options.preset) {
    options = setupPreset(options, options.preset);
  }

  if (options.testEnvironment) {
    options.testEnvironment = (0, (_utils || _load_utils()).getTestEnvironment)(
      options
    );
  }

  if (!options.roots && options.testPathDirs) {
    options.roots = options.testPathDirs;
    delete options.testPathDirs;
  }
  if (!options.roots) {
    options.roots = [options.rootDir];
  }

  if (!options.testRunner || options.testRunner === 'jasmine2') {
    options.testRunner = require.resolve('jest-jasmine2');
  }

  if (!options.coverageDirectory) {
    options.coverageDirectory = (_path || _load_path()).default.resolve(
      options.rootDir,
      'coverage'
    );
  }

  const babelJest = setupBabelJest(options);
  const newOptions = Object.assign({}, (_Defaults || _load_Defaults()).default);
  // Cast back to exact type
  options = options;

  if (options.resolver) {
    newOptions.resolver = (0, (_utils || _load_utils()).resolve)(null, {
      filePath: options.resolver,
      key: 'resolver',
      rootDir: options.rootDir
    });
  }

  Object.keys(options).reduce((newOptions, key) => {
    // The resolver has been resolved separately; skip it
    if (key === 'resolver') {
      return newOptions;
    }
    let value;
    switch (key) {
      case 'collectCoverageOnlyFrom':
        value = normalizeCollectCoverageOnlyFrom(options, key);
        break;
      case 'setupFiles':
      case 'snapshotSerializers':
        value =
          options[key] &&
          options[key].map(filePath =>
            (0, (_utils || _load_utils()).resolve)(newOptions.resolver, {
              filePath: filePath,
              key: key,
              rootDir: options.rootDir
            })
          );
        break;
      case 'modulePaths':
      case 'roots':
        value =
          options[key] &&
          options[key].map(filePath =>
            (_path || _load_path()).default.resolve(
              options.rootDir,
              (0, (_utils || _load_utils()).replaceRootDirInPath)(
                options.rootDir,
                filePath
              )
            )
          );
        break;
      case 'collectCoverageFrom':
        value = normalizeCollectCoverageFrom(options, key);
        break;
      case 'cacheDirectory':
      case 'coverageDirectory':
        value =
          options[key] &&
          (_path || _load_path()).default.resolve(
            options.rootDir,
            (0, (_utils || _load_utils()).replaceRootDirInPath)(
              options.rootDir,
              options[key]
            )
          );
        break;
      case 'globalSetup':
      case 'globalTeardown':
      case 'moduleLoader':
      case 'runner':
      case 'setupTestFrameworkScriptFile':
      case 'testResultsProcessor':
      case 'testRunner':
      case 'filter':
        value =
          options[key] &&
          (0, (_utils || _load_utils()).resolve)(newOptions.resolver, {
            filePath: options[key],
            key: key,
            rootDir: options.rootDir
          });
        break;
      case 'prettierPath':
        // We only want this to throw if "prettierPath" is explicitly passed
        // from config or CLI, and the requested path isn't found. Otherwise we
        // set it to null and throw an error lazily when it is used.
        value =
          options[key] &&
          (0, (_utils || _load_utils()).resolve)(newOptions.resolver, {
            filePath: options[key],
            key: key,
            optional:
              options[key] === (_Defaults || _load_Defaults()).default[key],
            rootDir: options.rootDir
          });
        break;
      case 'moduleNameMapper':
        const moduleNameMapper = options[key];
        value =
          moduleNameMapper &&
          Object.keys(moduleNameMapper).map(regex => {
            const item = moduleNameMapper && moduleNameMapper[regex];
            return (
              item && [
                regex,
                (0, (_utils || _load_utils())._replaceRootDirTags)(
                  options.rootDir,
                  item
                )
              ]
            );
          });
        break;
      case 'transform':
        const transform = options[key];
        value =
          transform &&
          Object.keys(transform).map(regex => [
            regex,
            (0, (_utils || _load_utils()).resolve)(newOptions.resolver, {
              filePath: transform[regex],
              key: key,
              rootDir: options.rootDir
            })
          ]);
        break;
      case 'coveragePathIgnorePatterns':
      case 'modulePathIgnorePatterns':
      case 'testPathIgnorePatterns':
      case 'transformIgnorePatterns':
      case 'watchPathIgnorePatterns':
      case 'unmockedModulePathPatterns':
        value = normalizeUnmockedModulePathPatterns(options, key);
        break;
      case 'haste':
        value = Object.assign({}, options[key]);
        if (value.hasteImplModulePath != null) {
          value.hasteImplModulePath = (0, (_utils || _load_utils()).resolve)(
            newOptions.resolver,
            {
              filePath: (0, (_utils || _load_utils()).replaceRootDirInPath)(
                options.rootDir,
                value.hasteImplModulePath
              ),
              key: 'haste.hasteImplModulePath',
              rootDir: options.rootDir
            }
          );
        }
        break;
      case 'projects':
        value = (options[key] || [])
          .map(
            project =>
              typeof project === 'string'
                ? (0, (_utils || _load_utils())._replaceRootDirTags)(
                    options.rootDir,
                    project
                  )
                : project
          )
          .reduce((projects, project) => {
            // Project can be specified as globs. If a glob matches any files,
            // We expand it to these paths. If not, we keep the original path
            // for the future resolution.
            const globMatches =
              typeof project === 'string'
                ? (_glob || _load_glob()).default.sync(project)
                : [];
            return projects.concat(globMatches.length ? globMatches : project);
          }, []);
        break;
      case 'moduleDirectories':
      case 'testMatch':
        value = (0, (_utils || _load_utils())._replaceRootDirTags)(
          (0, (_utils || _load_utils()).escapeGlobCharacters)(options.rootDir),
          options[key]
        );
        break;
      case 'testRegex':
        value =
          options[key] &&
          (0, (_jestRegexUtil || _load_jestRegexUtil()).replacePathSepForRegex)(
            options[key]
          );
        break;
      case 'automock':
      case 'bail':
      case 'browser':
      case 'cache':
      case 'changedSince':
      case 'changedFilesWithAncestor':
      case 'clearMocks':
      case 'collectCoverage':
      case 'coverageReporters':
      case 'coverageThreshold':
      case 'detectLeaks':
      case 'detectOpenHandles':
      case 'displayName':
      case 'errorOnDeprecated':
      case 'expand':
      case 'globals':
      case 'findRelatedTests':
      case 'forceCoverageMatch':
      case 'forceExit':
      case 'lastCommit':
      case 'listTests':
      case 'logHeapUsage':
      case 'mapCoverage':
      case 'moduleFileExtensions':
      case 'name':
      case 'noStackTrace':
      case 'notify':
      case 'notifyMode':
      case 'onlyChanged':
      case 'outputFile':
      case 'passWithNoTests':
      case 'replname':
      case 'reporters':
      case 'resetMocks':
      case 'resetModules':
      case 'restoreMocks':
      case 'rootDir':
      case 'runTestsByPath':
      case 'silent':
      case 'skipFilter':
      case 'skipNodeResolution':
      case 'testEnvironment':
      case 'testEnvironmentOptions':
      case 'testFailureExitCode':
      case 'testLocationInResults':
      case 'testNamePattern':
      case 'testURL':
      case 'timers':
      case 'useStderr':
      case 'verbose':
      case 'watch':
      case 'watchAll':
      case 'watchman':
        value = options[key];
        break;
      case 'watchPlugins':
        value = (options[key] || []).map(watchPlugin => {
          if (typeof watchPlugin === 'string') {
            return {
              config: {},
              path: (0, (_utils || _load_utils()).resolve)(
                newOptions.resolver,
                {
                  filePath: watchPlugin,
                  key: key,
                  rootDir: options.rootDir
                }
              )
            };
          } else {
            return {
              config: watchPlugin[1] || {},
              path: (0, (_utils || _load_utils()).resolve)(
                newOptions.resolver,
                {
                  filePath: watchPlugin[0],
                  key: key,
                  rootDir: options.rootDir
                }
              )
            };
          }
        });
        break;
    }
    newOptions[key] = value;
    return newOptions;
  }, newOptions);

  newOptions.nonFlagArgs = argv._;
  newOptions.testPathPattern = buildTestPathPattern(argv);
  newOptions.json = argv.json;

  newOptions.testFailureExitCode = parseInt(newOptions.testFailureExitCode, 10);

  for (const key of [
    'lastCommit',
    'changedFilesWithAncestor',
    'changedSince'
  ]) {
    if (newOptions[key]) {
      newOptions.onlyChanged = true;
    }
  }

  if (argv.all) {
    newOptions.onlyChanged = false;
  } else if (newOptions.testPathPattern) {
    // When passing a test path pattern we don't want to only monitor changed
    // files unless `--watch` is also passed.
    newOptions.onlyChanged = newOptions.watch;
  }

  newOptions.updateSnapshot =
    argv.ci && !argv.updateSnapshot
      ? 'none'
      : argv.updateSnapshot
        ? 'all'
        : 'new';

  newOptions.maxWorkers = (0,
  (_getMaxWorkers || _load_getMaxWorkers()).default)(argv);

  if (babelJest) {
    const regeneratorRuntimePath = (
      _jestResolve || _load_jestResolve()
    ).default.findNodeModule('regenerator-runtime/runtime', {
      basedir: options.rootDir,
      resolver: newOptions.resolver
    });

    if (regeneratorRuntimePath) {
      newOptions.setupFiles.unshift(regeneratorRuntimePath);
    }
  }

  if (options.testRegex && options.testMatch) {
    throw createConfigError(
      `  Configuration options ${(_chalk || _load_chalk()).default.bold(
        'testMatch'
      )} and` +
        ` ${(_chalk || _load_chalk()).default.bold(
          'testRegex'
        )} cannot be used together.`
    );
  }

  if (options.testRegex && !options.testMatch) {
    // Prevent the default testMatch conflicting with any explicitly
    // configured `testRegex` value
    newOptions.testMatch = [];
  }

  // If argv.json is set, coverageReporters shouldn't print a text report.
  if (argv.json) {
    newOptions.coverageReporters = (newOptions.coverageReporters || []).filter(
      reporter => reporter !== 'text'
    );
  }

  // If collectCoverage is enabled while using --findRelatedTests we need to
  // avoid having false negatives in the generated coverage report.
  // The following: `--findRelatedTests '/rootDir/file1.js' --coverage`
  // Is transformed to: `--findRelatedTests '/rootDir/file1.js' --coverage --collectCoverageFrom 'file1.js'`
  // where arguments to `--collectCoverageFrom` should be globs (or relative
  // paths to the rootDir)
  if (newOptions.collectCoverage && argv.findRelatedTests) {
    let collectCoverageFrom = argv._.map(filename => {
      filename = (0, (_utils || _load_utils()).replaceRootDirInPath)(
        options.rootDir,
        filename
      );
      return (_path || _load_path()).default.isAbsolute(filename)
        ? (_path || _load_path()).default.relative(options.rootDir, filename)
        : filename;
    });

    // Don't override existing collectCoverageFrom options
    if (newOptions.collectCoverageFrom) {
      collectCoverageFrom = collectCoverageFrom.reduce((patterns, filename) => {
        if (
          !(0, (_micromatch || _load_micromatch()).default)(
            [
              (_path || _load_path()).default.relative(
                options.rootDir,
                filename
              )
            ],
            newOptions.collectCoverageFrom
          ).length
        ) {
          return patterns;
        }
        return [].concat(_toConsumableArray(patterns), [filename]);
      }, newOptions.collectCoverageFrom);
    }

    newOptions.collectCoverageFrom = collectCoverageFrom;
  }

  return {
    hasDeprecationWarnings: hasDeprecationWarnings,
    options: newOptions
  };
}
