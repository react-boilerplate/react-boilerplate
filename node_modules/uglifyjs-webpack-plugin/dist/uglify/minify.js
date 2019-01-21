'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uglifyEs = require('uglify-es');

var _uglifyEs2 = _interopRequireDefault(_uglifyEs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildUglifyOptions = function buildUglifyOptions() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      ecma = _ref.ecma,
      warnings = _ref.warnings,
      _ref$parse = _ref.parse,
      parse = _ref$parse === undefined ? {} : _ref$parse,
      _ref$compress = _ref.compress,
      compress = _ref$compress === undefined ? {} : _ref$compress,
      mangle = _ref.mangle,
      output = _ref.output,
      toplevel = _ref.toplevel,
      nameCache = _ref.nameCache,
      ie8 = _ref.ie8,
      keep_classnames = _ref.keep_classnames,
      keep_fnames = _ref.keep_fnames,
      safari10 = _ref.safari10;

  return {
    ecma,
    warnings,
    parse,
    compress,
    mangle: mangle == null ? true : mangle,
    output: Object.assign({
      shebang: true,
      comments: false,
      beautify: false,
      semicolons: true
    }, output),
    // Ignoring sourcemap from options
    sourceMap: null,
    toplevel,
    nameCache,
    ie8,
    keep_classnames,
    keep_fnames,
    safari10
  };
}; /* eslint-disable
     arrow-body-style
   */


var buildComments = function buildComments(options, uglifyOptions, extractedComments) {
  var condition = {};
  var commentsOpts = uglifyOptions.output.comments;

  // /^\**!|@preserve|@license|@cc_on/
  if (typeof options.extractComments === 'boolean') {
    condition.preserve = commentsOpts;
    condition.extract = /^\**!|@preserve|@license|@cc_on/;
  } else if (typeof options.extractComments === 'string' || options.extractComments instanceof RegExp) {
    // extractComments specifies the extract condition and commentsOpts specifies the preserve condition
    condition.preserve = commentsOpts;
    condition.extract = options.extractComments;
  } else if (typeof options.extractComments === 'function') {
    condition.preserve = false;
    condition.extract = options.extractComments;
  } else if (Object.prototype.hasOwnProperty.call(options.extractComments, 'condition')) {
    // Extract condition is given in extractComments.condition
    condition.preserve = commentsOpts;
    condition.extract = options.extractComments.condition;
  } else {
    // No extract condition is given. Extract comments that match commentsOpts instead of preserving them
    condition.preserve = false;
    condition.extract = commentsOpts;
  }

  // Ensure that both conditions are functions
  ['preserve', 'extract'].forEach(function (key) {
    var regexStr = void 0;
    var regex = void 0;

    switch (typeof condition[key]) {
      case 'boolean':
        condition[key] = condition[key] ? function () {
          return true;
        } : function () {
          return false;
        };

        break;
      case 'function':
        break;
      case 'string':
        if (condition[key] === 'all') {
          condition[key] = function () {
            return true;
          };

          break;
        }

        if (condition[key] === 'some') {
          condition[key] = function (astNode, comment) {
            return comment.type === 'comment2' && /@preserve|@license|@cc_on/i.test(comment.value);
          };

          break;
        }

        regexStr = condition[key];

        condition[key] = function (astNode, comment) {
          return new RegExp(regexStr).test(comment.value);
        };

        break;
      default:
        regex = condition[key];

        condition[key] = function (astNode, comment) {
          return regex.test(comment.value);
        };
    }
  });

  // Redefine the comments function to extract and preserve
  // comments according to the two conditions
  return function (astNode, comment) {
    if (condition.extract(astNode, comment)) {
      extractedComments.push(comment.type === 'comment2' ? `/*${comment.value}*/` : `//${comment.value}`);
    }

    return condition.preserve(astNode, comment);
  };
};

var minify = function minify(options) {
  var file = options.file,
      input = options.input,
      inputSourceMap = options.inputSourceMap,
      extractComments = options.extractComments;
  // Copy uglify options

  var uglifyOptions = buildUglifyOptions(options.uglifyOptions);

  // Add source map data
  if (inputSourceMap) {
    uglifyOptions.sourceMap = {
      content: inputSourceMap
    };
  }

  var extractedComments = [];

  if (extractComments) {
    uglifyOptions.output.comments = buildComments(options, uglifyOptions, extractedComments);
  }

  var _uglify$minify = _uglifyEs2.default.minify({ [file]: input }, uglifyOptions),
      error = _uglify$minify.error,
      map = _uglify$minify.map,
      code = _uglify$minify.code,
      warnings = _uglify$minify.warnings;

  return { error, map, code, warnings, extractedComments };
};

exports.default = minify;