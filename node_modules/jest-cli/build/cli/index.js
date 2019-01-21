'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.runCLI = exports.run = undefined;

let run = (exports.run = (() => {
  var _ref = _asyncToGenerator(function*(maybeArgv, project) {
    try {
      const argv = buildArgv(maybeArgv, project);

      if (argv.init) {
        yield (0, (_init || _load_init()).default)();
        return;
      }

      const projects = getProjectListFromCLIArgs(argv, project);

      var _ref2 = yield runCLI(argv, projects);

      const results = _ref2.results,
        globalConfig = _ref2.globalConfig;

      readResultsAndExit(results, globalConfig);
    } catch (error) {
      (0, (_jestUtil || _load_jestUtil()).clearLine)(process.stderr);
      (0, (_jestUtil || _load_jestUtil()).clearLine)(process.stdout);
      console.error((_chalk || _load_chalk()).default.red(error.stack));
      (0, (_exit || _load_exit()).default)(1);
      throw error;
    }
  });

  return function run(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

var _jestUtil;

function _load_jestUtil() {
  return (_jestUtil = require('jest-util'));
}

var _jestValidate;

function _load_jestValidate() {
  return (_jestValidate = require('jest-validate'));
}

var _jestConfig;

function _load_jestConfig() {
  return (_jestConfig = require('jest-config'));
}

var _args;

function _load_args() {
  return (_args = _interopRequireWildcard(require('./args')));
}

var _chalk;

function _load_chalk() {
  return (_chalk = _interopRequireDefault(require('chalk')));
}

var _create_context;

function _load_create_context() {
  return (_create_context = _interopRequireDefault(
    require('../lib/create_context')
  ));
}

var _exit;

function _load_exit() {
  return (_exit = _interopRequireDefault(require('exit')));
}

var _getChangedFilesPromise;

function _load_getChangedFilesPromise() {
  return (_getChangedFilesPromise = _interopRequireDefault(
    require('../getChangedFilesPromise')
  ));
}

var _collectHandles;

function _load_collectHandles() {
  return (_collectHandles = require('../collectHandles'));
}

var _fs;

function _load_fs() {
  return (_fs = _interopRequireDefault(require('fs')));
}

var _handle_deprecation_warnings;

function _load_handle_deprecation_warnings() {
  return (_handle_deprecation_warnings = _interopRequireDefault(
    require('../lib/handle_deprecation_warnings')
  ));
}

var _log_debug_messages;

function _load_log_debug_messages() {
  return (_log_debug_messages = _interopRequireDefault(
    require('../lib/log_debug_messages')
  ));
}

var _preRunMessage;

function _load_preRunMessage() {
  return (_preRunMessage = require('../preRunMessage'));
}

var _runJest;

function _load_runJest() {
  return (_runJest = _interopRequireDefault(require('../runJest')));
}

var _jestRuntime;

function _load_jestRuntime() {
  return (_jestRuntime = _interopRequireDefault(require('jest-runtime')));
}

var _TestWatcher;

function _load_TestWatcher() {
  return (_TestWatcher = _interopRequireDefault(require('../TestWatcher')));
}

var _watch;

function _load_watch() {
  return (_watch = _interopRequireDefault(require('../watch')));
}

var _pluralize;

function _load_pluralize() {
  return (_pluralize = _interopRequireDefault(require('../pluralize')));
}

var _yargs;

function _load_yargs() {
  return (_yargs = _interopRequireDefault(require('yargs')));
}

var _rimraf;

function _load_rimraf() {
  return (_rimraf = _interopRequireDefault(require('rimraf')));
}

var _realpathNative;

function _load_realpathNative() {
  return (_realpathNative = require('realpath-native'));
}

var _init;

function _load_init() {
  return (_init = _interopRequireDefault(require('../lib/init')));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
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

const runCLI = (exports.runCLI = (() => {
  var _ref3 = _asyncToGenerator(function*(argv, projects) {
    const realFs = require('fs');
    const fs = require('graceful-fs');
    fs.gracefulify(realFs);

    let results;

    // If we output a JSON object, we can't write anything to stdout, since
    // it'll break the JSON structure and it won't be valid.
    const outputStream =
      argv.json || argv.useStderr ? process.stderr : process.stdout;

    var _getConfigs = getConfigs(projects, argv, outputStream);

    const globalConfig = _getConfigs.globalConfig,
      configs = _getConfigs.configs,
      hasDeprecationWarnings = _getConfigs.hasDeprecationWarnings;

    if (argv.clearCache) {
      configs.forEach(function(config) {
        (_rimraf || _load_rimraf()).default.sync(config.cacheDirectory);
        process.stdout.write(`Cleared ${config.cacheDirectory}\n`);
      });

      (0, (_exit || _load_exit()).default)(0);
    }

    yield _run(
      globalConfig,
      configs,
      hasDeprecationWarnings,
      outputStream,
      function(r) {
        return (results = r);
      }
    );

    if (argv.watch || argv.watchAll) {
      // If in watch mode, return the promise that will never resolve.
      // If the watch mode is interrupted, watch should handle the process
      // shutdown.
      return new Promise(function() {});
    }

    if (!results) {
      throw new Error(
        'AggregatedResult must be present after test run is complete'
      );
    }

    var _results = results;
    const openHandles = _results.openHandles;

    if (openHandles && openHandles.length) {
      const formatted = (0,
      (_collectHandles || _load_collectHandles()).formatHandleErrors)(
        openHandles,
        configs[0]
      );

      const openHandlesString = (0, (_pluralize || _load_pluralize()).default)(
        'open handle',
        formatted.length,
        's'
      );

      const message =
        (_chalk || _load_chalk()).default.red(
          `\nJest has detected the following ${openHandlesString} potentially keeping Jest from exiting:\n\n`
        ) + formatted.join('\n\n');

      console.error(message);
    }

    return Promise.resolve({globalConfig: globalConfig, results: results});
  });

  return function runCLI(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
})());

const readResultsAndExit = (result, globalConfig) => {
  const code = !result || result.success ? 0 : globalConfig.testFailureExitCode;

  process.on('exit', () => (process.exitCode = code));

  if (globalConfig.forceExit) {
    if (!globalConfig.detectOpenHandles) {
      console.error(
        (_chalk || _load_chalk()).default.red.bold('Force exiting Jest\n\n') +
          (_chalk || _load_chalk()).default.red(
            'Have you considered using `--detectOpenHandles` to detect ' +
              'async operations that kept running after all tests finished?'
          )
      );
    }

    (0, (_exit || _load_exit()).default)(code);
  } else if (!globalConfig.detectOpenHandles) {
    setTimeout(() => {
      console.error(
        (_chalk || _load_chalk()).default.red.bold(
          'Jest did not exit one second after the test run has completed.\n\n'
        ) +
          (_chalk || _load_chalk()).default.red(
            'This usually means that there are asynchronous operations that ' +
              "weren't stopped in your tests. Consider running Jest with " +
              '`--detectOpenHandles` to troubleshoot this issue.'
          )
      );
      // $FlowFixMe: `unref` exists in Node
    }, 1000).unref();
  }
};

const buildArgv = (maybeArgv, project) => {
  const argv = (0, (_yargs || _load_yargs()).default)(
    maybeArgv || process.argv.slice(2)
  )
    .usage((_args || _load_args()).usage)
    .alias('help', 'h')
    .options((_args || _load_args()).options)
    .epilogue((_args || _load_args()).docs)
    .check((_args || _load_args()).check).argv;

  (0, (_jestValidate || _load_jestValidate()).validateCLIOptions)(
    argv,
    Object.assign({}, (_args || _load_args()).options, {
      deprecationEntries: (_jestConfig || _load_jestConfig()).deprecationEntries
    })
  );

  return argv;
};

const getProjectListFromCLIArgs = (argv, project) => {
  const projects = argv.projects ? argv.projects : [];

  if (project) {
    projects.push(project);
  }

  if (!projects.length && process.platform === 'win32') {
    try {
      projects.push(
        (0, (_realpathNative || _load_realpathNative()).sync)(process.cwd())
      );
    } catch (err) {
      // do nothing, just catch error
      // process.binding('fs').realpath can throw, e.g. on mapped drives
    }
  }

  if (!projects.length) {
    projects.push(process.cwd());
  }

  return projects;
};

const printDebugInfoAndExitIfNeeded = (
  argv,
  globalConfig,
  configs,
  outputStream
) => {
  if (argv.debug) {
    (0, (_log_debug_messages || _load_log_debug_messages()).default)(
      globalConfig,
      configs,
      outputStream
    );
    return;
  }

  if (argv.showConfig) {
    (0, (_log_debug_messages || _load_log_debug_messages()).default)(
      globalConfig,
      configs,
      process.stdout
    );
    (0, (_exit || _load_exit()).default)(0);
  }
};

const ensureNoDuplicateConfigs = (parsedConfigs, projects, rootConfigPath) => {
  const configPathMap = new Map();

  for (const config of parsedConfigs) {
    const configPath = config.configPath;

    if (configPathMap.has(configPath)) {
      const message = `Whoops! Two projects resolved to the same config path: ${(
        _chalk || _load_chalk()
      ).default.bold(String(configPath))}:

  Project 1: ${(_chalk || _load_chalk()).default.bold(
    projects[parsedConfigs.findIndex(x => x === config)]
  )}
  Project 2: ${(_chalk || _load_chalk()).default.bold(
    projects[parsedConfigs.findIndex(x => x === configPathMap.get(configPath))]
  )}

This usually means that your ${(_chalk || _load_chalk()).default.bold(
        '"projects"'
      )} config includes a directory that doesn't have any configuration recognizable by Jest. Please fix it.
`;

      throw new Error(message);
    }
    if (configPath !== null) {
      configPathMap.set(configPath, config);
    }
  }
};

// Possible scenarios:
//  1. jest --config config.json
//  2. jest --projects p1 p2
//  3. jest --projects p1 p2 --config config.json
//  4. jest --projects p1
//  5. jest
//
// If no projects are specified, process.cwd() will be used as the default
// (and only) project.
const getConfigs = (projectsFromCLIArgs, argv, outputStream) => {
  let globalConfig;
  let hasDeprecationWarnings;
  let configs = [];
  let projects = projectsFromCLIArgs;
  let configPath;

  if (projectsFromCLIArgs.length === 1) {
    const parsedConfig = (0, (_jestConfig || _load_jestConfig()).readConfig)(
      argv,
      projects[0]
    );
    configPath = parsedConfig.configPath;

    if (parsedConfig.globalConfig.projects) {
      // If this was a single project, and its config has `projects`
      // settings, use that value instead.
      projects = parsedConfig.globalConfig.projects;
    }

    hasDeprecationWarnings = parsedConfig.hasDeprecationWarnings;
    globalConfig = parsedConfig.globalConfig;
    configs = [parsedConfig.projectConfig];
    if (globalConfig.projects && globalConfig.projects.length) {
      // Even though we had one project in CLI args, there might be more
      // projects defined in the config.
      projects = globalConfig.projects;
    }
  }

  if (projects.length > 1) {
    const parsedConfigs = projects
      .filter(root => {
        // Ignore globbed files that cannot be `require`d.
        if (
          (_fs || _load_fs()).default.existsSync(root) &&
          !(_fs || _load_fs()).default.lstatSync(root).isDirectory() &&
          !root.endsWith('.js') &&
          !root.endsWith('.json')
        ) {
          return false;
        }

        return true;
      })
      .map(root =>
        (0, (_jestConfig || _load_jestConfig()).readConfig)(
          argv,
          root,
          true,
          configPath
        )
      );

    ensureNoDuplicateConfigs(parsedConfigs, projects, configPath);
    configs = parsedConfigs.map(_ref4 => {
      let projectConfig = _ref4.projectConfig;
      return projectConfig;
    });
    if (!hasDeprecationWarnings) {
      hasDeprecationWarnings = parsedConfigs.some(_ref5 => {
        let hasDeprecationWarnings = _ref5.hasDeprecationWarnings;
        return !!hasDeprecationWarnings;
      });
    }
    // If no config was passed initially, use the one from the first project
    if (!globalConfig) {
      globalConfig = parsedConfigs[0].globalConfig;
    }
  }

  if (!globalConfig || !configs.length) {
    throw new Error('jest: No configuration found for any project.');
  }

  printDebugInfoAndExitIfNeeded(argv, globalConfig, configs, outputStream);

  return {
    configs: configs,
    globalConfig: globalConfig,
    hasDeprecationWarnings: !!hasDeprecationWarnings
  };
};

const buildContextsAndHasteMaps = (() => {
  var _ref6 = _asyncToGenerator(function*(configs, globalConfig, outputStream) {
    const hasteMapInstances = Array(configs.length);
    const contexts = yield Promise.all(
      configs.map(
        (() => {
          var _ref7 = _asyncToGenerator(function*(config, index) {
            (0,
            (_jestUtil || _load_jestUtil())
              .createDirectory)(config.cacheDirectory);
            const hasteMapInstance = (
              _jestRuntime || _load_jestRuntime()
            ).default.createHasteMap(config, {
              console: new (_jestUtil || _load_jestUtil()).Console(
                outputStream,
                outputStream
              ),
              maxWorkers: globalConfig.maxWorkers,
              resetCache: !config.cache,
              watch: globalConfig.watch || globalConfig.watchAll,
              watchman: globalConfig.watchman
            });
            hasteMapInstances[index] = hasteMapInstance;
            return (0,
            (_create_context || _load_create_context())
              .default)(config, yield hasteMapInstance.build());
          });

          return function(_x8, _x9) {
            return _ref7.apply(this, arguments);
          };
        })()
      )
    );

    return {contexts: contexts, hasteMapInstances: hasteMapInstances};
  });

  return function buildContextsAndHasteMaps(_x5, _x6, _x7) {
    return _ref6.apply(this, arguments);
  };
})();

const _run = (() => {
  var _ref8 = _asyncToGenerator(function*(
    globalConfig,
    configs,
    hasDeprecationWarnings,
    outputStream,
    onComplete
  ) {
    // Queries to hg/git can take a while, so we need to start the process
    // as soon as possible, so by the time we need the result it's already there.
    const changedFilesPromise = (0,
    (_getChangedFilesPromise || _load_getChangedFilesPromise()).default)(
      globalConfig,
      configs
    );

    var _ref9 = yield buildContextsAndHasteMaps(
      configs,
      globalConfig,
      outputStream
    );

    const contexts = _ref9.contexts,
      hasteMapInstances = _ref9.hasteMapInstances;

    globalConfig.watch || globalConfig.watchAll
      ? yield runWatch(
          contexts,
          configs,
          hasDeprecationWarnings,
          globalConfig,
          outputStream,
          hasteMapInstances,
          changedFilesPromise
        )
      : yield runWithoutWatch(
          globalConfig,
          contexts,
          outputStream,
          onComplete,
          changedFilesPromise
        );
  });

  return function _run(_x10, _x11, _x12, _x13, _x14) {
    return _ref8.apply(this, arguments);
  };
})();

const runWatch = (() => {
  var _ref10 = _asyncToGenerator(function*(
    contexts,
    configs,
    hasDeprecationWarnings,
    globalConfig,
    outputStream,
    hasteMapInstances,
    changedFilesPromise
  ) {
    if (hasDeprecationWarnings) {
      try {
        yield (0,
        (_handle_deprecation_warnings || _load_handle_deprecation_warnings())
          .default)(outputStream, process.stdin);
        return (0, (_watch || _load_watch()).default)(
          globalConfig,
          contexts,
          outputStream,
          hasteMapInstances
        );
      } catch (e) {
        (0, (_exit || _load_exit()).default)(0);
      }
    }

    return (0, (_watch || _load_watch()).default)(
      globalConfig,
      contexts,
      outputStream,
      hasteMapInstances
    );
  });

  return function runWatch(_x15, _x16, _x17, _x18, _x19, _x20, _x21) {
    return _ref10.apply(this, arguments);
  };
})();

const runWithoutWatch = (() => {
  var _ref11 = _asyncToGenerator(function*(
    globalConfig,
    contexts,
    outputStream,
    onComplete,
    changedFilesPromise
  ) {
    const startRun = (() => {
      var _ref12 = _asyncToGenerator(function*() {
        if (!globalConfig.listTests) {
          (0, (_preRunMessage || _load_preRunMessage()).print)(outputStream);
        }
        return yield (0, (_runJest || _load_runJest()).default)({
          changedFilesPromise: changedFilesPromise,
          contexts: contexts,
          failedTestsCache: null,
          globalConfig: globalConfig,
          onComplete: onComplete,
          outputStream: outputStream,
          startRun: startRun,
          testWatcher: new (_TestWatcher || _load_TestWatcher()).default({
            isWatchMode: false
          })
        });
      });

      return function startRun() {
        return _ref12.apply(this, arguments);
      };
    })();
    return yield startRun();
  });

  return function runWithoutWatch(_x22, _x23, _x24, _x25, _x26) {
    return _ref11.apply(this, arguments);
  };
})();
