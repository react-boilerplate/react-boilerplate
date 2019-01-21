"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePureAnnotation = exports.useTranspileTemplateLiterals = exports.useMinify = exports.useFileName = exports.useSSR = exports.useDisplayName = void 0;

function getOption(_ref, name) {
  var opts = _ref.opts;
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return opts[name] === undefined || opts[name] === null ? defaultValue : opts[name];
}

var useDisplayName = function useDisplayName(state) {
  return getOption(state, 'displayName');
};

exports.useDisplayName = useDisplayName;

var useSSR = function useSSR(state) {
  return getOption(state, 'ssr', true);
};

exports.useSSR = useSSR;

var useFileName = function useFileName(state) {
  return getOption(state, 'fileName');
};

exports.useFileName = useFileName;

var useMinify = function useMinify(state) {
  return getOption(state, 'minify');
};

exports.useMinify = useMinify;

var useTranspileTemplateLiterals = function useTranspileTemplateLiterals(state) {
  return getOption(state, 'transpileTemplateLiterals');
};

exports.useTranspileTemplateLiterals = useTranspileTemplateLiterals;

var usePureAnnotation = function usePureAnnotation(state) {
  return getOption(state, 'pure', false);
};

exports.usePureAnnotation = usePureAnnotation;