'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = watch;

var _ansiEscapes;

function _load_ansiEscapes() {
  return (_ansiEscapes = _interopRequireDefault(require('ansi-escapes')));
}

var _chalk;

function _load_chalk() {
  return (_chalk = _interopRequireDefault(require('chalk')));
}

var _getChangedFilesPromise;

function _load_getChangedFilesPromise() {
  return (_getChangedFilesPromise = _interopRequireDefault(
    require('./getChangedFilesPromise')
  ));
}

var _exit;

function _load_exit() {
  return (_exit = _interopRequireDefault(require('exit')));
}

var _jestHasteMap;

function _load_jestHasteMap() {
  return (_jestHasteMap = _interopRequireDefault(require('jest-haste-map')));
}

var _is_valid_path;

function _load_is_valid_path() {
  return (_is_valid_path = _interopRequireDefault(
    require('./lib/is_valid_path')
  ));
}

var _jestUtil;

function _load_jestUtil() {
  return (_jestUtil = require('jest-util'));
}

var _preRunMessage;

function _load_preRunMessage() {
  return (_preRunMessage = require('./preRunMessage'));
}

var _create_context;

function _load_create_context() {
  return (_create_context = _interopRequireDefault(
    require('./lib/create_context')
  ));
}

var _runJest;

function _load_runJest() {
  return (_runJest = _interopRequireDefault(require('./runJest')));
}

var _update_global_config;

function _load_update_global_config() {
  return (_update_global_config = _interopRequireDefault(
    require('./lib/update_global_config')
  ));
}

var _SearchSource;

function _load_SearchSource() {
  return (_SearchSource = _interopRequireDefault(require('./SearchSource')));
}

var _TestWatcher;

function _load_TestWatcher() {
  return (_TestWatcher = _interopRequireDefault(require('./TestWatcher')));
}

var _FailedTestsCache;

function _load_FailedTestsCache() {
  return (_FailedTestsCache = _interopRequireDefault(
    require('./FailedTestsCache')
  ));
}

var _constants;

function _load_constants() {
  return (_constants = require('./constants'));
}

var _jestWatcher;

function _load_jestWatcher() {
  return (_jestWatcher = require('jest-watcher'));
}

var _test_path_pattern;

function _load_test_path_pattern() {
  return (_test_path_pattern = _interopRequireDefault(
    require('./plugins/test_path_pattern')
  ));
}

var _test_name_pattern;

function _load_test_name_pattern() {
  return (_test_name_pattern = _interopRequireDefault(
    require('./plugins/test_name_pattern')
  ));
}

var _update_snapshots;

function _load_update_snapshots() {
  return (_update_snapshots = _interopRequireDefault(
    require('./plugins/update_snapshots')
  ));
}

var _update_snapshots_interactive;

function _load_update_snapshots_interactive() {
  return (_update_snapshots_interactive = _interopRequireDefault(
    require('./plugins/update_snapshots_interactive')
  ));
}

var _quit;

function _load_quit() {
  return (_quit = _interopRequireDefault(require('./plugins/quit')));
}

var _watch_plugins_helpers;

function _load_watch_plugins_helpers() {
  return (_watch_plugins_helpers = require('./lib/watch_plugins_helpers'));
}

var _jestValidate;

function _load_jestValidate() {
  return (_jestValidate = require('jest-validate'));
}

var _active_filters_message;

function _load_active_filters_message() {
  return (_active_filters_message = _interopRequireDefault(
    require('./lib/active_filters_message')
  ));
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

let hasExitListener = false;

const INTERNAL_PLUGINS = [
  (_test_path_pattern || _load_test_path_pattern()).default,
  (_test_name_pattern || _load_test_name_pattern()).default,
  (_update_snapshots || _load_update_snapshots()).default,
  (_update_snapshots_interactive || _load_update_snapshots_interactive())
    .default,
  (_quit || _load_quit()).default
];

const RESERVED_KEY_PLUGINS = new Map([
  [
    (_update_snapshots || _load_update_snapshots()).default,
    {forbiddenOverwriteMessage: 'updating snapshots', key: 'u'}
  ],
  [
    (_update_snapshots_interactive || _load_update_snapshots_interactive())
      .default,
    {forbiddenOverwriteMessage: 'updating snapshots interactively', key: 'i'}
  ],
  [
    (_quit || _load_quit()).default,
    {forbiddenOverwriteMessage: 'quitting watch mode'}
  ]
]);

function watch(initialGlobalConfig, contexts, outputStream, hasteMapInstances) {
  let stdin =
    arguments.length > 4 && arguments[4] !== undefined
      ? arguments[4]
      : process.stdin;
  let hooks =
    arguments.length > 5 && arguments[5] !== undefined
      ? arguments[5]
      : new (_jestWatcher || _load_jestWatcher()).JestHook();

  // `globalConfig` will be constantly updated and reassigned as a result of
  // watch mode interactions.
  let globalConfig = initialGlobalConfig;
  let activePlugin;

  globalConfig = (0,
  (_update_global_config || _load_update_global_config()).default)(
    globalConfig,
    {
      mode: globalConfig.watch ? 'watch' : 'watchAll',
      passWithNoTests: true
    }
  );

  const updateConfigAndRun = function() {
    var _ref =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    let bail = _ref.bail,
      changedSince = _ref.changedSince,
      collectCoverage = _ref.collectCoverage,
      collectCoverageFrom = _ref.collectCoverageFrom,
      collectCoverageOnlyFrom = _ref.collectCoverageOnlyFrom,
      coverageDirectory = _ref.coverageDirectory,
      coverageReporters = _ref.coverageReporters,
      mode = _ref.mode,
      notify = _ref.notify,
      notifyMode = _ref.notifyMode,
      onlyFailures = _ref.onlyFailures,
      reporters = _ref.reporters,
      testNamePattern = _ref.testNamePattern,
      testPathPattern = _ref.testPathPattern,
      updateSnapshot = _ref.updateSnapshot,
      verbose = _ref.verbose;

    const previousUpdateSnapshot = globalConfig.updateSnapshot;
    globalConfig = (0,
    (_update_global_config || _load_update_global_config()).default)(
      globalConfig,
      {
        bail: bail,
        changedSince: changedSince,
        collectCoverage: collectCoverage,
        collectCoverageFrom: collectCoverageFrom,
        collectCoverageOnlyFrom: collectCoverageOnlyFrom,
        coverageDirectory: coverageDirectory,
        coverageReporters: coverageReporters,
        mode: mode,
        notify: notify,
        notifyMode: notifyMode,
        onlyFailures: onlyFailures,
        reporters: reporters,
        testNamePattern: testNamePattern,
        testPathPattern: testPathPattern,
        updateSnapshot: updateSnapshot,
        verbose: verbose
      }
    );

    startRun(globalConfig);
    globalConfig = (0,
    (_update_global_config || _load_update_global_config()).default)(
      globalConfig,
      {
        // updateSnapshot is not sticky after a run.
        updateSnapshot:
          previousUpdateSnapshot === 'all' ? 'none' : previousUpdateSnapshot
      }
    );
  };

  const watchPlugins = INTERNAL_PLUGINS.map(
    InternalPlugin => new InternalPlugin({stdin: stdin, stdout: outputStream})
  );
  watchPlugins.forEach(plugin => {
    const hookSubscriber = hooks.getSubscriber();
    if (plugin.apply) {
      plugin.apply(hookSubscriber);
    }
  });

  if (globalConfig.watchPlugins != null) {
    const watchPluginKeys = new Map();
    for (const plugin of watchPlugins) {
      const reservedInfo = RESERVED_KEY_PLUGINS.get(plugin.constructor) || {};
      const key = reservedInfo.key || getPluginKey(plugin, globalConfig);
      if (!key) {
        continue;
      }
      const forbiddenOverwriteMessage = reservedInfo.forbiddenOverwriteMessage;

      watchPluginKeys.set(key, {
        forbiddenOverwriteMessage: forbiddenOverwriteMessage,
        overwritable: forbiddenOverwriteMessage == null,
        plugin: plugin
      });
    }

    for (const pluginWithConfig of globalConfig.watchPlugins) {
      // $FlowFixMe dynamic require
      const ThirdPartyPlugin = require(pluginWithConfig.path);
      const plugin = new ThirdPartyPlugin({
        config: pluginWithConfig.config,
        stdin: stdin,
        stdout: outputStream
      });
      checkForConflicts(watchPluginKeys, plugin, globalConfig);

      const hookSubscriber = hooks.getSubscriber();
      if (plugin.apply) {
        plugin.apply(hookSubscriber);
      }
      watchPlugins.push(plugin);
    }
  }

  const failedTestsCache = new (
    _FailedTestsCache || _load_FailedTestsCache()
  ).default();
  let searchSources = contexts.map(context => ({
    context: context,
    searchSource: new (_SearchSource || _load_SearchSource()).default(context)
  }));
  let isRunning = false;
  let testWatcher;
  let shouldDisplayWatchUsage = true;
  let isWatchUsageDisplayed = false;

  const emitFileChange = () => {
    if (hooks.isUsed('onFileChange')) {
      const projects = searchSources.map(_ref2 => {
        let context = _ref2.context,
          searchSource = _ref2.searchSource;
        return {
          config: context.config,
          testPaths: searchSource.findMatchingTests('').tests.map(t => t.path)
        };
      });
      hooks.getEmitter().onFileChange({projects: projects});
    }
  };

  emitFileChange();

  hasteMapInstances.forEach((hasteMapInstance, index) => {
    hasteMapInstance.on('change', _ref3 => {
      let eventsQueue = _ref3.eventsQueue,
        hasteFS = _ref3.hasteFS,
        moduleMap = _ref3.moduleMap;

      const validPaths = eventsQueue.filter(_ref4 => {
        let filePath = _ref4.filePath;
        return (0, (_is_valid_path || _load_is_valid_path()).default)(
          globalConfig,
          contexts[index].config,
          filePath
        );
      });

      if (validPaths.length) {
        const context = (contexts[index] = (0,
        (_create_context || _load_create_context()).default)(
          contexts[index].config,
          {
            hasteFS: hasteFS,
            moduleMap: moduleMap
          }
        ));

        activePlugin = null;

        searchSources = searchSources.slice();
        searchSources[index] = {
          context: context,
          searchSource: new (_SearchSource || _load_SearchSource()).default(
            context
          )
        };
        emitFileChange();
        startRun(globalConfig);
      }
    });
  });

  if (!hasExitListener) {
    hasExitListener = true;
    process.on('exit', () => {
      if (activePlugin) {
        outputStream.write(
          (_ansiEscapes || _load_ansiEscapes()).default.cursorDown()
        );
        outputStream.write(
          (_ansiEscapes || _load_ansiEscapes()).default.eraseDown
        );
      }
    });
  }

  const startRun = globalConfig => {
    if (isRunning) {
      return null;
    }

    testWatcher = new (_TestWatcher || _load_TestWatcher()).default({
      isWatchMode: true
    });
    (_jestUtil || _load_jestUtil()).isInteractive &&
      outputStream.write((_constants || _load_constants()).CLEAR);
    (0, (_preRunMessage || _load_preRunMessage()).print)(outputStream);
    isRunning = true;
    const configs = contexts.map(context => context.config);
    const changedFilesPromise = (0,
    (_getChangedFilesPromise || _load_getChangedFilesPromise()).default)(
      globalConfig,
      configs
    );
    return (0, (_runJest || _load_runJest()).default)({
      changedFilesPromise: changedFilesPromise,
      contexts: contexts,
      failedTestsCache: failedTestsCache,
      globalConfig: globalConfig,
      jestHooks: hooks.getEmitter(),
      onComplete: results => {
        isRunning = false;
        hooks.getEmitter().onTestRunComplete(results);

        // Create a new testWatcher instance so that re-runs won't be blocked.
        // The old instance that was passed to Jest will still be interrupted
        // and prevent test runs from the previous run.
        testWatcher = new (_TestWatcher || _load_TestWatcher()).default({
          isWatchMode: true
        });

        // Do not show any Watch Usage related stuff when running in a
        // non-interactive environment
        if ((_jestUtil || _load_jestUtil()).isInteractive) {
          if (shouldDisplayWatchUsage) {
            outputStream.write(usage(globalConfig, watchPlugins));
            shouldDisplayWatchUsage = false; // hide Watch Usage after first run
            isWatchUsageDisplayed = true;
          } else {
            outputStream.write(showToggleUsagePrompt());
            shouldDisplayWatchUsage = false;
            isWatchUsageDisplayed = false;
          }
        } else {
          outputStream.write('\n');
        }
        failedTestsCache.setTestResults(results.testResults);
      },
      outputStream: outputStream,
      startRun: startRun,
      testWatcher: testWatcher
    }).catch(error =>
      // Errors thrown inside `runJest`, e.g. by resolvers, are caught here for
      // continuous watch mode execution. We need to reprint them to the
      // terminal and give just a little bit of extra space so they fit below
      // `preRunMessagePrint` message nicely.
      console.error('\n\n' + (_chalk || _load_chalk()).default.red(error))
    );
  };

  const onKeypress = key => {
    if (
      key === (_jestWatcher || _load_jestWatcher()).KEYS.CONTROL_C ||
      key === (_jestWatcher || _load_jestWatcher()).KEYS.CONTROL_D
    ) {
      if (typeof stdin.setRawMode === 'function') {
        stdin.setRawMode(false);
      }
      outputStream.write('\n');
      (0, (_exit || _load_exit()).default)(0);
      return;
    }

    if (activePlugin != null && activePlugin.onKey) {
      // if a plugin is activate, Jest should let it handle keystrokes, so ignore
      // them here
      activePlugin.onKey(key);
      return;
    }

    // Abort test run
    const pluginKeys = (0,
    (_watch_plugins_helpers || _load_watch_plugins_helpers())
      .getSortedUsageRows)(watchPlugins, globalConfig).map(usage =>
      Number(usage.key).toString(16)
    );
    if (
      isRunning &&
      testWatcher &&
      ['q', (_jestWatcher || _load_jestWatcher()).KEYS.ENTER, 'a', 'o', 'f']
        .concat(pluginKeys)
        .includes(key)
    ) {
      testWatcher.setState({interrupted: true});
      return;
    }

    const matchingWatchPlugin = (0,
    (_watch_plugins_helpers || _load_watch_plugins_helpers())
      .filterInteractivePlugins)(watchPlugins, globalConfig).find(
      plugin => getPluginKey(plugin, globalConfig) === key
    );

    if (matchingWatchPlugin != null) {
      // "activate" the plugin, which has jest ignore keystrokes so the plugin
      // can handle them
      activePlugin = matchingWatchPlugin;
      if (activePlugin.run) {
        activePlugin.run(globalConfig, updateConfigAndRun).then(
          shouldRerun => {
            activePlugin = null;
            if (shouldRerun) {
              updateConfigAndRun();
            }
          },
          () => {
            activePlugin = null;
            onCancelPatternPrompt();
          }
        );
      } else {
        activePlugin = null;
      }
    }

    switch (key) {
      case (_jestWatcher || _load_jestWatcher()).KEYS.ENTER:
        startRun(globalConfig);
        break;
      case 'a':
        globalConfig = (0,
        (_update_global_config || _load_update_global_config()).default)(
          globalConfig,
          {
            mode: 'watchAll',
            testNamePattern: '',
            testPathPattern: ''
          }
        );
        startRun(globalConfig);
        break;
      case 'c':
        updateConfigAndRun({
          mode: 'watch',
          testNamePattern: '',
          testPathPattern: ''
        });
        break;
      case 'f':
        globalConfig = (0,
        (_update_global_config || _load_update_global_config()).default)(
          globalConfig,
          {
            onlyFailures: !globalConfig.onlyFailures
          }
        );
        startRun(globalConfig);
        break;
      case 'o':
        globalConfig = (0,
        (_update_global_config || _load_update_global_config()).default)(
          globalConfig,
          {
            mode: 'watch',
            testNamePattern: '',
            testPathPattern: ''
          }
        );
        startRun(globalConfig);
        break;
      case '?':
        break;
      case 'w':
        if (!shouldDisplayWatchUsage && !isWatchUsageDisplayed) {
          outputStream.write(
            (_ansiEscapes || _load_ansiEscapes()).default.cursorUp()
          );
          outputStream.write(
            (_ansiEscapes || _load_ansiEscapes()).default.eraseDown
          );
          outputStream.write(usage(globalConfig, watchPlugins));
          isWatchUsageDisplayed = true;
          shouldDisplayWatchUsage = false;
        }
        break;
    }
  };

  const onCancelPatternPrompt = () => {
    outputStream.write(
      (_ansiEscapes || _load_ansiEscapes()).default.cursorHide
    );
    outputStream.write(
      (_ansiEscapes || _load_ansiEscapes()).default.clearScreen
    );
    outputStream.write(usage(globalConfig, watchPlugins));
    outputStream.write(
      (_ansiEscapes || _load_ansiEscapes()).default.cursorShow
    );
  };

  if (typeof stdin.setRawMode === 'function') {
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', onKeypress);
  }

  startRun(globalConfig);
  return Promise.resolve();
}

const checkForConflicts = (watchPluginKeys, plugin, globalConfig) => {
  const key = getPluginKey(plugin, globalConfig);
  if (!key) {
    return;
  }

  const conflictor = watchPluginKeys.get(key);
  if (!conflictor || conflictor.overwritable) {
    watchPluginKeys.set(key, {
      overwritable: false,
      plugin: plugin
    });
    return;
  }

  let error;
  if (conflictor.forbiddenOverwriteMessage) {
    error = `
  Watch plugin ${(_chalk || _load_chalk()).default.bold.red(
    getPluginIdentifier(plugin)
  )} attempted to register key ${(_chalk || _load_chalk()).default.bold.red(
      `<${key}>`
    )},
  that is reserved internally for ${(_chalk || _load_chalk()).default.bold.red(
    conflictor.forbiddenOverwriteMessage
  )}.
  Please change the configuration key for this plugin.`.trim();
  } else {
    const plugins = [conflictor.plugin, plugin]
      .map(p =>
        (_chalk || _load_chalk()).default.bold.red(getPluginIdentifier(p))
      )
      .join(' and ');
    error = `
  Watch plugins ${plugins} both attempted to register key ${(
      _chalk || _load_chalk()
    ).default.bold.red(`<${key}>`)}.
  Please change the key configuration for one of the conflicting plugins to avoid overlap.`.trim();
  }

  throw new (_jestValidate || _load_jestValidate()).ValidationError(
    'Watch plugin configuration error',
    error
  );
};

const getPluginIdentifier = plugin =>
  // This breaks as `displayName` is not defined as a static, but since
  // WatchPlugin is an interface, and it is my understanding interface
  // static fields are not definable anymore, no idea how to circumvent
  // this :-(
  // $FlowFixMe: leave `displayName` be.
  plugin.constructor.displayName || plugin.constructor.name;

const getPluginKey = (plugin, globalConfig) => {
  if (typeof plugin.getUsageInfo === 'function') {
    return (plugin.getUsageInfo(globalConfig) || {}).key;
  }

  return null;
};

const usage = function(globalConfig, watchPlugins) {
  let delimiter =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '\n';

  const messages = [
    (0, (_active_filters_message || _load_active_filters_message()).default)(
      globalConfig
    ),
    globalConfig.testPathPattern || globalConfig.testNamePattern
      ? (_chalk || _load_chalk()).default.dim(' \u203A Press ') +
        'c' +
        (_chalk || _load_chalk()).default.dim(' to clear filters.')
      : null,
    '\n' + (_chalk || _load_chalk()).default.bold('Watch Usage'),
    globalConfig.watch
      ? (_chalk || _load_chalk()).default.dim(' \u203A Press ') +
        'a' +
        (_chalk || _load_chalk()).default.dim(' to run all tests.')
      : null,
    globalConfig.onlyFailures
      ? (_chalk || _load_chalk()).default.dim(' \u203A Press ') +
        'f' +
        (_chalk || _load_chalk()).default.dim(
          ' to quit "only failed tests" mode.'
        )
      : (_chalk || _load_chalk()).default.dim(' \u203A Press ') +
        'f' +
        (_chalk || _load_chalk()).default.dim(' to run only failed tests.'),
    (globalConfig.watchAll ||
      globalConfig.testPathPattern ||
      globalConfig.testNamePattern) &&
    !globalConfig.noSCM
      ? (_chalk || _load_chalk()).default.dim(' \u203A Press ') +
        'o' +
        (_chalk || _load_chalk()).default.dim(
          ' to only run tests related to changed files.'
        )
      : null
  ].concat(
    _toConsumableArray(
      (0,
      (_watch_plugins_helpers || _load_watch_plugins_helpers())
        .getSortedUsageRows)(watchPlugins, globalConfig).map(
        plugin =>
          (_chalk || _load_chalk()).default.dim(' \u203A Press') +
          ' ' +
          plugin.key +
          ' ' +
          (_chalk || _load_chalk()).default.dim(`to ${plugin.prompt}.`)
      )
    ),
    [
      (_chalk || _load_chalk()).default.dim(' \u203A Press ') +
        'Enter' +
        (_chalk || _load_chalk()).default.dim(' to trigger a test run.')
    ]
  );

  return messages.filter(message => !!message).join(delimiter) + '\n';
};

const showToggleUsagePrompt = () =>
  '\n' +
  (_chalk || _load_chalk()).default.bold('Watch Usage: ') +
  (_chalk || _load_chalk()).default.dim('Press ') +
  'w' +
  (_chalk || _load_chalk()).default.dim(' to show more.');
