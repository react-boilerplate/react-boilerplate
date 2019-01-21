"use strict";

exports.__esModule = true;
exports.chmod = chmod;
exports.readdirFilter = readdirFilter;
exports.shouldIgnore = shouldIgnore;
exports.addSourceMappingUrl = addSourceMappingUrl;
exports.log = log;
exports.transform = transform;
exports.compile = compile;
exports.requireChokidar = requireChokidar;
var commander = require("commander");
var defaults = require("lodash/defaults");
var readdir = require("fs-readdir-recursive");
var index = require("./index");
var babel = require("babel-core");
var util = require("babel-core").util;
var path = require("path");
var fs = require("fs");

function chmod(src, dest) {
  fs.chmodSync(dest, fs.statSync(src).mode);
}

function readdirFilter(filename) {
  return readdir(filename).filter(function (filename) {
    return util.canCompile(filename);
  });
}

exports.readdir = readdir;
var canCompile = exports.canCompile = util.canCompile;

function shouldIgnore(loc) {
  return util.shouldIgnore(loc, index.opts.ignore, index.opts.only);
}

function addSourceMappingUrl(code, loc) {
  return code + "\n//# sourceMappingURL=" + path.basename(loc);
}

function log(msg) {
  if (!commander.quiet) console.log(msg);
}

function transform(filename, code, opts) {
  opts = defaults(opts || {}, index.opts);
  opts.filename = filename;

  var result = babel.transform(code, opts);
  result.filename = filename;
  result.actual = code;
  return result;
}

function compile(filename, opts) {
  try {
    var code = fs.readFileSync(filename, "utf8");
    return transform(filename, code, opts);
  } catch (err) {
    if (commander.watch) {
      console.error(toErrorStack(err));
      return { ignored: true };
    } else {
      throw err;
    }
  }
}

function toErrorStack(err) {
  if (err._babel && err instanceof SyntaxError) {
    return err.name + ": " + err.message + "\n" + err.codeFrame;
  } else {
    return err.stack;
  }
}

process.on("uncaughtException", function (err) {
  console.error(toErrorStack(err));
  process.exit(1);
});

function requireChokidar() {
  try {
    return require("chokidar");
  } catch (err) {
    console.error("The optional dependency chokidar failed to install and is required for " + "--watch. Chokidar is likely not supported on your platform.");
    throw err;
  }
}