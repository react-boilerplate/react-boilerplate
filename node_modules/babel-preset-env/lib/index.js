"use strict";

exports.__esModule = true;
exports.transformIncludesAndExcludes = exports.isPluginRequired = undefined;
exports.default = buildPreset;

var _semver = require("semver");

var _semver2 = _interopRequireDefault(_semver);

var _builtIns = require("../data/built-ins.json");

var _builtIns2 = _interopRequireDefault(_builtIns);

var _defaultIncludes = require("./default-includes");

var _moduleTransformations = require("./module-transformations");

var _moduleTransformations2 = _interopRequireDefault(_moduleTransformations);

var _normalizeOptions = require("./normalize-options.js");

var _normalizeOptions2 = _interopRequireDefault(_normalizeOptions);

var _plugins = require("../data/plugins.json");

var _plugins2 = _interopRequireDefault(_plugins);

var _transformPolyfillRequirePlugin = require("./transform-polyfill-require-plugin");

var _transformPolyfillRequirePlugin2 = _interopRequireDefault(_transformPolyfillRequirePlugin);

var _targetsParser = require("./targets-parser");

var _targetsParser2 = _interopRequireDefault(_targetsParser);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Determine if a transformation is required
 *
 * NOTE: This assumes `supportedEnvironments` has already been parsed by `getTargets`
 *
 * @param  {Object}  supportedEnvironments  An Object containing environment keys and the lowest
 *                                          supported version as a value
 * @param  {Object}  plugin                 An Object containing environment keys and the lowest
 *                                          version the feature was implemented in as a value
 * @return {Boolean} Whether or not the transformation is required
 */
var isPluginRequired = exports.isPluginRequired = function isPluginRequired(supportedEnvironments, plugin) {
  var targetEnvironments = Object.keys(supportedEnvironments);

  if (targetEnvironments.length === 0) {
    return true;
  }

  var isRequiredForEnvironments = targetEnvironments.filter(function (environment) {
    // Feature is not implemented in that environment
    if (!plugin[environment]) {
      return true;
    }

    var lowestImplementedVersion = plugin[environment];
    var lowestTargetedVersion = supportedEnvironments[environment];

    if (!_semver2.default.valid(lowestTargetedVersion)) {
      throw new Error(
      // eslint-disable-next-line max-len
      "Invalid version passed for target \"" + environment + "\": \"" + lowestTargetedVersion + "\". Versions must be in semver format (major.minor.patch)");
    }

    return _semver2.default.gt((0, _utils.semverify)(lowestImplementedVersion), lowestTargetedVersion);
  });

  return isRequiredForEnvironments.length > 0;
};

var hasBeenLogged = false;

var logPlugin = function logPlugin(plugin, targets, list) {
  var envList = list[plugin] || {};
  var filteredList = Object.keys(targets).reduce(function (a, b) {
    if (!envList[b] || _semver2.default.lt(targets[b], (0, _utils.semverify)(envList[b]))) {
      a[b] = (0, _utils.prettifyVersion)(targets[b]);
    }
    return a;
  }, {});
  var logStr = "  " + plugin + " " + JSON.stringify(filteredList);
  console.log(logStr);
};

var filterItem = function filterItem(targets, exclusions, list, item) {
  var isDefault = _defaultIncludes.defaultWebIncludes.indexOf(item) >= 0;
  var notExcluded = exclusions.indexOf(item) === -1;

  if (isDefault) return notExcluded;
  var isRequired = isPluginRequired(targets, list[item]);
  return isRequired && notExcluded;
};

var getBuiltInTargets = function getBuiltInTargets(targets) {
  var builtInTargets = (0, _utils._extends)({}, targets);
  if (builtInTargets.uglify != null) {
    delete builtInTargets.uglify;
  }
  return builtInTargets;
};

var transformIncludesAndExcludes = exports.transformIncludesAndExcludes = function transformIncludesAndExcludes(opts) {
  return {
    all: opts,
    plugins: opts.filter(function (opt) {
      return !opt.match(/^(es\d+|web)\./);
    }),
    builtIns: opts.filter(function (opt) {
      return opt.match(/^(es\d+|web)\./);
    })
  };
};

function getPlatformSpecificDefaultFor(targets) {
  var targetNames = Object.keys(targets);
  var isAnyTarget = !targetNames.length;
  var isWebTarget = targetNames.some(function (name) {
    return name !== "node";
  });

  return isAnyTarget || isWebTarget ? _defaultIncludes.defaultWebIncludes : [];
}

function buildPreset(context) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var validatedOptions = (0, _normalizeOptions2.default)(opts);
  var debug = validatedOptions.debug,
      loose = validatedOptions.loose,
      moduleType = validatedOptions.moduleType,
      spec = validatedOptions.spec,
      useBuiltIns = validatedOptions.useBuiltIns;


  var targets = (0, _targetsParser2.default)(validatedOptions.targets);
  var include = transformIncludesAndExcludes(validatedOptions.include);
  var exclude = transformIncludesAndExcludes(validatedOptions.exclude);

  var filterPlugins = filterItem.bind(null, targets, exclude.plugins, _plugins2.default);
  var transformations = Object.keys(_plugins2.default).filter(filterPlugins).concat(include.plugins);

  var polyfills = void 0;
  var polyfillTargets = void 0;
  if (useBuiltIns) {
    polyfillTargets = getBuiltInTargets(targets);
    var filterBuiltIns = filterItem.bind(null, polyfillTargets, exclude.builtIns, _builtIns2.default);
    polyfills = Object.keys(_builtIns2.default).concat(getPlatformSpecificDefaultFor(polyfillTargets)).filter(filterBuiltIns).concat(include.builtIns);
  }

  if (debug && !hasBeenLogged) {
    hasBeenLogged = true;
    console.log("babel-preset-env: `DEBUG` option");
    console.log("\nUsing targets:");
    console.log(JSON.stringify((0, _utils.prettifyTargets)(targets), null, 2));
    console.log("\nModules transform: " + moduleType);
    console.log("\nUsing plugins:");
    transformations.forEach(function (transform) {
      logPlugin(transform, targets, _plugins2.default);
    });
    if (useBuiltIns && polyfills.length) {
      console.log("\nUsing polyfills:");
      polyfills.forEach(function (polyfill) {
        logPlugin(polyfill, polyfillTargets, _builtIns2.default);
      });
    }
  }

  var regenerator = transformations.indexOf("transform-regenerator") >= 0;
  var modulePlugin = moduleType !== false && _moduleTransformations2.default[moduleType];
  var plugins = [];

  // NOTE: not giving spec here yet to avoid compatibility issues when
  // babel-plugin-transform-es2015-modules-commonjs gets its spec mode
  modulePlugin && plugins.push([require("babel-plugin-" + modulePlugin), { loose: loose }]);

  plugins.push.apply(plugins, transformations.map(function (pluginName) {
    return [require("babel-plugin-" + pluginName), { spec: spec, loose: loose }];
  }));

  useBuiltIns && plugins.push([_transformPolyfillRequirePlugin2.default, { polyfills: polyfills, regenerator: regenerator }]);

  return {
    plugins: plugins
  };
}