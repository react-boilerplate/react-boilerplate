#!/usr/bin/env node

/* eslint-disable */

var exec = require('child_process').exec;
var path = require('path');
var fs   = require('fs');
var animateProgress = require('./helpers/progress');
var addCheckMark = require('./helpers/checkmark');

process.stdin.resume();
process.stdin.setEncoding('utf8');

var dir = process.cwd();

process.stdout.write('\n');
var interval = animateProgress('Cleaning old repository');
process.stdout.write('Cleaning old repository');
cleanRepo(dir, function () {
  clearInterval(interval);
  process.stdout.write('\nInstalling dependencies... (This might take a while)');
  setTimeout(function () {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    interval = animateProgress('Installing dependencies');
  }, 500);

  process.stdout.write('Installing dependencies');
  installDeps(function (error) {
    clearInterval(interval);
    if (error) {
      process.stdout.write(error);
    }

    deleteFileInCurrentDir('setup.js', function () {
      process.stdout.write('\n');
      interval = animateProgress('Initialising new repository');
      process.stdout.write('Initialising new repository');
      initGit(dir, function () {
        clearInterval(interval);
        process.stdout.write('\nDone!');
        process.exit(0);
      });
    });
  });
});

/**
 * Deletes the .git folder in dir
 */
function cleanRepo(dir, callback) {
  exec('rm -Rf .git/', addCheckMark.bind(null, callback));
}

/**
 * Initializes git again
 */
function initGit(dir, callback) {
  exec('git init && git add . && git commit -m "Initial commit"', addCheckMark.bind(null, callback));
}

/**
 * Deletes a file in the current directory
 */
function deleteFileInCurrentDir(file, callback) {
  fs.unlink(path.join(__dirname, file), callback);
}

/**
 * Installs dependencies
 */
function installDeps(callback) {
  exec('npm install', addCheckMark.bind(null, callback));
}
