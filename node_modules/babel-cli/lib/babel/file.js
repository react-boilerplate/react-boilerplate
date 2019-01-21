"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convertSourceMap = require("convert-source-map");
var sourceMap = require("source-map");
var slash = require("slash");
var path = require("path");
var util = require("./util");
var fs = require("fs");

module.exports = function (commander, filenames, opts) {
  if (commander.sourceMaps === "inline") {
    opts.sourceMaps = true;
  }

  var results = [];

  var buildResult = function buildResult() {
    var map = new sourceMap.SourceMapGenerator({
      file: path.basename(commander.outFile || "") || "stdout",
      sourceRoot: opts.sourceRoot
    });

    var code = "";
    var offset = 0;

    results.forEach(function (result) {
      code += result.code + "\n";

      if (result.map) {
        var consumer = new sourceMap.SourceMapConsumer(result.map);
        var sources = new _set2.default();

        consumer.eachMapping(function (mapping) {
          if (mapping.source != null) sources.add(mapping.source);

          map.addMapping({
            generated: {
              line: mapping.generatedLine + offset,
              column: mapping.generatedColumn
            },
            source: mapping.source,
            original: mapping.source == null ? null : {
              line: mapping.originalLine,
              column: mapping.originalColumn
            }
          });
        });

        sources.forEach(function (source) {
          var content = consumer.sourceContentFor(source, true);
          if (content !== null) {
            map.setSourceContent(source, content);
          }
        });

        offset = code.split("\n").length - 1;
      }
    });

    if (commander.sourceMaps === "inline" || !commander.outFile && commander.sourceMaps) {
      code += "\n" + convertSourceMap.fromObject(map).toComment();
    }

    return {
      map: map,
      code: code
    };
  };

  var output = function output() {
    var result = buildResult();

    if (commander.outFile) {
      if (commander.sourceMaps && commander.sourceMaps !== "inline") {
        var mapLoc = commander.outFile + ".map";
        result.code = util.addSourceMappingUrl(result.code, mapLoc);
        fs.writeFileSync(mapLoc, (0, _stringify2.default)(result.map));
      }

      fs.writeFileSync(commander.outFile, result.code);
    } else {
      process.stdout.write(result.code + "\n");
    }
  };

  var stdin = function stdin() {
    var code = "";

    process.stdin.setEncoding("utf8");

    process.stdin.on("readable", function () {
      var chunk = process.stdin.read();
      if (chunk !== null) code += chunk;
    });

    process.stdin.on("end", function () {
      results.push(util.transform(commander.filename, code, {
        sourceFileName: "stdin"
      }));
      output();
    });
  };

  var walk = function walk() {
    var _filenames = [];
    results = [];

    filenames.forEach(function (filename) {
      if (!fs.existsSync(filename)) return;

      var stat = fs.statSync(filename);
      if (stat.isDirectory()) {
        var dirname = filename;

        util.readdirFilter(filename).forEach(function (filename) {
          _filenames.push(path.join(dirname, filename));
        });
      } else {
        _filenames.push(filename);
      }
    });

    _filenames.forEach(function (filename) {
      if (util.shouldIgnore(filename)) return;

      var sourceFilename = filename;
      if (commander.outFile) {
        sourceFilename = path.relative(path.dirname(commander.outFile), sourceFilename);
      }
      sourceFilename = slash(sourceFilename);

      var data = util.compile(filename, {
        sourceFileName: sourceFilename
      });

      if (data.ignored) return;
      results.push(data);
    });

    output();
  };

  var files = function files() {

    if (!commander.skipInitialBuild) {
      walk();
    }

    if (commander.watch) {
      var chokidar = util.requireChokidar();
      chokidar.watch(filenames, {
        persistent: true,
        ignoreInitial: true,
        awaitWriteFinish: {
          stabilityThreshold: 50,
          pollInterval: 10
        }
      }).on("all", function (type, filename) {
        if (util.shouldIgnore(filename) || !util.canCompile(filename, commander.extensions)) return;

        if (type === "add" || type === "change") {
          util.log(type + " " + filename);
          try {
            walk();
          } catch (err) {
            console.error(err.stack);
          }
        }
      });
    }
  };

  if (filenames.length) {
    files();
  } else {
    stdin();
  }
};