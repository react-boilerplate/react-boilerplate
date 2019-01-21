'use strict';

exports.__esModule = true;
exports.StyleSheetManager = exports.ServerStyleSheet = exports.withTheme = exports.ThemeProvider = exports.injectGlobal = exports.keyframes = exports.css = undefined;

var _flatten = require('./flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _stringifyRules = require('./stringifyRules');

var _stringifyRules2 = _interopRequireDefault(_stringifyRules);

var _css = require('./css');

var _css2 = _interopRequireDefault(_css);

var _generateAlphabeticName = require('../utils/generateAlphabeticName');

var _generateAlphabeticName2 = _interopRequireDefault(_generateAlphabeticName);

var _ServerStyleSheet = require('../models/ServerStyleSheet');

var _ServerStyleSheet2 = _interopRequireDefault(_ServerStyleSheet);

var _StyleSheetManager = require('../models/StyleSheetManager');

var _StyleSheetManager2 = _interopRequireDefault(_StyleSheetManager);

var _StyledComponent2 = require('../models/StyledComponent');

var _StyledComponent3 = _interopRequireDefault(_StyledComponent2);

var _ComponentStyle2 = require('../models/ComponentStyle');

var _ComponentStyle3 = _interopRequireDefault(_ComponentStyle2);

var _styled2 = require('../constructors/styled');

var _styled3 = _interopRequireDefault(_styled2);

var _keyframes2 = require('../constructors/keyframes');

var _keyframes3 = _interopRequireDefault(_keyframes2);

var _injectGlobal2 = require('../constructors/injectGlobal');

var _injectGlobal3 = _interopRequireDefault(_injectGlobal2);

var _constructWithOptions2 = require('../constructors/constructWithOptions');

var _constructWithOptions3 = _interopRequireDefault(_constructWithOptions2);

var _ThemeProvider = require('../models/ThemeProvider');

var _ThemeProvider2 = _interopRequireDefault(_ThemeProvider);

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Instantiate singletons */


/* Import components */


/* Import singleton constructors */


/* Import no-parser singleton variants */
var ComponentStyle = (0, _ComponentStyle3.default)(_generateAlphabeticName2.default, _flatten2.default, _stringifyRules2.default);

/* Import Higher Order Components */


/* Import singletons */

var constructWithOptions = (0, _constructWithOptions3.default)(_css2.default);
var StyledComponent = (0, _StyledComponent3.default)(ComponentStyle, constructWithOptions);

/* Instantiate exported singletons */
var keyframes = (0, _keyframes3.default)(_generateAlphabeticName2.default, _stringifyRules2.default, _css2.default);
var injectGlobal = (0, _injectGlobal3.default)(_stringifyRules2.default, _css2.default);
var styled = (0, _styled3.default)(StyledComponent, constructWithOptions);

/* Export everything */
exports.default = styled;
exports.css = _css2.default;
exports.keyframes = keyframes;
exports.injectGlobal = injectGlobal;
exports.ThemeProvider = _ThemeProvider2.default;
exports.withTheme = _withTheme2.default;
exports.ServerStyleSheet = _ServerStyleSheet2.default;
exports.StyleSheetManager = _StyleSheetManager2.default;