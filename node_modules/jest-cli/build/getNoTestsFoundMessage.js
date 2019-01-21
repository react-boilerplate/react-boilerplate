'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = getNoTestsFoundMessage;

var _getNoTestFound;

function _load_getNoTestFound() {
  return (_getNoTestFound = _interopRequireDefault(
    require('./getNoTestFound')
  ));
}

var _getNoTestFoundRelatedToChangedFiles;

function _load_getNoTestFoundRelatedToChangedFiles() {
  return (_getNoTestFoundRelatedToChangedFiles = _interopRequireDefault(
    require('./getNoTestFoundRelatedToChangedFiles')
  ));
}

var _getNoTestFoundVerbose;

function _load_getNoTestFoundVerbose() {
  return (_getNoTestFoundVerbose = _interopRequireDefault(
    require('./getNoTestFoundVerbose')
  ));
}

var _getNoTestFoundFailed;

function _load_getNoTestFoundFailed() {
  return (_getNoTestFoundFailed = _interopRequireDefault(
    require('./getNoTestFoundFailed')
  ));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function getNoTestsFoundMessage(testRunData, globalConfig) {
  if (globalConfig.onlyFailures) {
    return (0,
    (_getNoTestFoundFailed || _load_getNoTestFoundFailed()).default)();
  }
  if (globalConfig.onlyChanged) {
    return (0,
    (
      _getNoTestFoundRelatedToChangedFiles ||
      _load_getNoTestFoundRelatedToChangedFiles()
    ).default)(globalConfig);
  }
  return testRunData.length === 1 || globalConfig.verbose
    ? (0, (_getNoTestFoundVerbose || _load_getNoTestFoundVerbose()).default)(
        testRunData,
        globalConfig
      )
    : (0, (_getNoTestFound || _load_getNoTestFound()).default)(
        testRunData,
        globalConfig
      );
}
