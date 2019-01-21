'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path;

function _load_path() {
  return (_path = _interopRequireDefault(require('path')));
}

var _micromatch;

function _load_micromatch() {
  return (_micromatch = _interopRequireDefault(require('micromatch')));
}

var _jestResolveDependencies;

function _load_jestResolveDependencies() {
  return (_jestResolveDependencies = _interopRequireDefault(
    require('jest-resolve-dependencies')
  ));
}

var _testPathPatternToRegexp;

function _load_testPathPatternToRegexp() {
  return (_testPathPatternToRegexp = _interopRequireDefault(
    require('./testPathPatternToRegexp')
  ));
}

var _jestRegexUtil;

function _load_jestRegexUtil() {
  return (_jestRegexUtil = require('jest-regex-util'));
}

var _jestConfig;

function _load_jestConfig() {
  return (_jestConfig = require('jest-config'));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            }
          );
        }
      }
      return step('next');
    });
  };
}
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const globsToMatcher = globs => {
  if (globs == null || globs.length === 0) {
    return () => true;
  }

  return path =>
    (0, (_micromatch || _load_micromatch()).default)([path], globs, {dot: true})
      .length > 0;
};

const regexToMatcher = testRegex => {
  if (!testRegex) {
    return () => true;
  }

  const regex = new RegExp(testRegex);
  return path => regex.test(path);
};

const toTests = (context, tests) =>
  tests.map(path => ({
    context: context,
    duration: undefined,
    path: path
  }));

class SearchSource {
  constructor(context) {
    const config = context.config;

    this._context = context;
    this._rootPattern = new RegExp(
      config.roots
        .map(dir =>
          (0, (_jestRegexUtil || _load_jestRegexUtil()).escapePathForRegex)(
            dir + (_path || _load_path()).default.sep
          )
        )
        .join('|')
    );

    const ignorePattern = config.testPathIgnorePatterns;
    this._testIgnorePattern = ignorePattern.length
      ? new RegExp(ignorePattern.join('|'))
      : null;

    this._testPathCases = {
      roots: path => this._rootPattern.test(path),
      testMatch: globsToMatcher(config.testMatch),
      testPathIgnorePatterns: path =>
        !this._testIgnorePattern || !this._testIgnorePattern.test(path),
      testRegex: regexToMatcher(config.testRegex)
    };
  }

  _filterTestPathsWithStats(allPaths, testPathPattern) {
    const data = {
      stats: {},
      tests: [],
      total: allPaths.length
    };

    const testCases = Object.assign({}, this._testPathCases);
    if (testPathPattern) {
      const regex = (0,
      (_testPathPatternToRegexp || _load_testPathPatternToRegexp()).default)(
        testPathPattern
      );
      testCases.testPathPattern = path => regex.test(path);
    }

    const testCasesKeys = Object.keys(testCases);
    data.tests = allPaths.filter(test =>
      testCasesKeys.reduce((flag, key) => {
        if (testCases[key](test.path)) {
          data.stats[key] = ++data.stats[key] || 1;
          return flag && true;
        }
        data.stats[key] = data.stats[key] || 0;
        return false;
      }, true)
    );

    return data;
  }

  _getAllTestPaths(testPathPattern) {
    return this._filterTestPathsWithStats(
      toTests(this._context, this._context.hasteFS.getAllFiles()),
      testPathPattern
    );
  }

  isTestFilePath(path) {
    return Object.keys(this._testPathCases).every(key =>
      this._testPathCases[key](path)
    );
  }

  findMatchingTests(testPathPattern) {
    return this._getAllTestPaths(testPathPattern);
  }

  findRelatedTests(allPaths, collectCoverage) {
    const dependencyResolver = new (
      _jestResolveDependencies || _load_jestResolveDependencies()
    ).default(this._context.resolver, this._context.hasteFS);

    const tests = toTests(
      this._context,
      dependencyResolver.resolveInverse(
        allPaths,
        this.isTestFilePath.bind(this),
        {
          skipNodeResolution: this._context.config.skipNodeResolution
        }
      )
    );
    let collectCoverageFrom;

    // If we are collecting coverage, also return collectCoverageFrom patterns
    if (collectCoverage) {
      collectCoverageFrom = Array.from(allPaths).map(filename => {
        filename = (0,
        (_jestConfig || _load_jestConfig()).replaceRootDirInPath)(
          this._context.config.rootDir,
          filename
        );
        return (_path || _load_path()).default.isAbsolute(filename)
          ? (_path || _load_path()).default.relative(
              this._context.config.rootDir,
              filename
            )
          : filename;
      });
    }

    return {collectCoverageFrom: collectCoverageFrom, tests: tests};
  }

  findTestsByPaths(paths) {
    return {
      tests: toTests(
        this._context,
        paths
          .map(p => (_path || _load_path()).default.resolve(process.cwd(), p))
          .filter(this.isTestFilePath.bind(this))
      )
    };
  }

  findRelatedTestsFromPattern(paths, collectCoverage) {
    if (Array.isArray(paths) && paths.length) {
      const resolvedPaths = paths.map(p =>
        (_path || _load_path()).default.resolve(process.cwd(), p)
      );
      return this.findRelatedTests(new Set(resolvedPaths), collectCoverage);
    }
    return {tests: []};
  }

  findTestRelatedToChangedFiles(changedFilesPromise, collectCoverage) {
    var _this = this;

    return _asyncToGenerator(function*() {
      var _ref = yield changedFilesPromise;

      const repos = _ref.repos,
        changedFiles = _ref.changedFiles;
      // no SCM (git/hg/...) is found in any of the roots.

      const noSCM = Object.keys(repos).every(function(scm) {
        return repos[scm].size === 0;
      });
      return noSCM
        ? {noSCM: true, tests: []}
        : _this.findRelatedTests(changedFiles, collectCoverage);
    })();
  }

  _getTestPaths(globalConfig, changedFilesPromise) {
    const paths = globalConfig.nonFlagArgs;

    if (globalConfig.onlyChanged) {
      if (!changedFilesPromise) {
        throw new Error('This promise must be present when running with -o.');
      }

      return this.findTestRelatedToChangedFiles(
        changedFilesPromise,
        globalConfig.collectCoverage
      );
    } else if (globalConfig.runTestsByPath && paths && paths.length) {
      return Promise.resolve(this.findTestsByPaths(paths));
    } else if (globalConfig.findRelatedTests && paths && paths.length) {
      return Promise.resolve(
        this.findRelatedTestsFromPattern(paths, globalConfig.collectCoverage)
      );
    } else if (globalConfig.testPathPattern != null) {
      return Promise.resolve(
        this.findMatchingTests(globalConfig.testPathPattern)
      );
    } else {
      return Promise.resolve({tests: []});
    }
  }

  getTestPaths(globalConfig, changedFilesPromise) {
    var _this2 = this;

    return _asyncToGenerator(function*() {
      const searchResult = yield _this2._getTestPaths(
        globalConfig,
        changedFilesPromise
      );

      const filterPath = globalConfig.filter;

      if (filterPath && !globalConfig.skipFilter) {
        const tests = searchResult.tests;

        // $FlowFixMe: dynamic require.
        const filter = require(filterPath);
        const filterResult = yield filter(
          tests.map(function(test) {
            return test.path;
          })
        );

        if (!Array.isArray(filterResult.filtered)) {
          throw new Error(
            `Filter ${filterPath} did not return a valid test list`
          );
        }

        const filteredSet = new Set(
          filterResult.filtered.map(function(result) {
            return result.test;
          })
        );

        // $FlowFixMe: Object.assign with empty object causes troubles to Flow.
        return Object.assign({}, searchResult, {
          tests: tests.filter(function(test) {
            return filteredSet.has(test.path);
          })
        });
      }

      return searchResult;
    })();
  }
}
exports.default = SearchSource;
