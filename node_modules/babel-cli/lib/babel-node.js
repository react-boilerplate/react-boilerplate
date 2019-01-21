"use strict";

var getV8Flags = require("v8flags");
var path = require("path");

var args = [path.join(__dirname, "_babel-node")];

var babelArgs = process.argv.slice(2);
var userArgs = void 0;

var argSeparator = babelArgs.indexOf("--");
if (argSeparator > -1) {
  userArgs = babelArgs.slice(argSeparator);
  babelArgs = babelArgs.slice(0, argSeparator);
}

function getNormalizedV8Flag(arg) {
  var matches = arg.match(/--(.+)/);

  if (matches) {
    return "--" + matches[1].replace(/-/g, "_");
  }

  return arg;
}

getV8Flags(function (err, v8Flags) {
  babelArgs.forEach(function (arg) {
    var flag = arg.split("=")[0];

    switch (flag) {
      case "-d":
        args.unshift("--debug");
        break;

      case "debug":
      case "--debug":
      case "--debug-brk":
      case "--inspect":
      case "--inspect-brk":
        args.unshift(arg);
        break;

      case "-gc":
        args.unshift("--expose-gc");
        break;

      case "--nolazy":
        args.unshift(flag);
        break;

      default:
        if (v8Flags.indexOf(getNormalizedV8Flag(flag)) >= 0 || arg.indexOf("--trace") === 0) {
          args.unshift(arg);
        } else {
          args.push(arg);
        }
        break;
    }
  });

  if (argSeparator > -1) {
    args = args.concat(userArgs);
  }

  try {
    var kexec = require("kexec");
    kexec(process.argv[0], args);
  } catch (err) {
    if (err.code !== "MODULE_NOT_FOUND") throw err;

    var child_process = require("child_process");
    var proc = child_process.spawn(process.argv[0], args, { stdio: "inherit" });
    proc.on("exit", function (code, signal) {
      process.on("exit", function () {
        if (signal) {
          process.kill(process.pid, signal);
        } else {
          process.exit(code);
        }
      });
    });
  }
});