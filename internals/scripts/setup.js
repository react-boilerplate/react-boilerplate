#!/usr/bin/env node

'use strict';

const shell = require('shelljs');
const exec = require('child_process').exec;
const path = require('path');
const fs   = require('fs');
const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark');
const readline = require('readline');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('\n');
let interval = animateProgress('Cleaning old repository');
process.stdout.write('Cleaning old repository');

cleanRepo(function () {
  clearInterval(interval);
  process.stdout.write('\nInstalling dependencies... (This might take a while)');
  setTimeout(function () {
    readline.cursorTo(process.stdout, 0);
    interval = animateProgress('Installing dependencies');
  }, 500);

  process.stdout.write('Installing dependencies');
  installDeps();
});

/**
 * Deletes the .git folder in dir
 */
function cleanRepo(callback) {
  shell.rm('-rf', '.git/');
  addCheckMark(callback);
}

/**
 * Initializes git again
 */
function initGit(callback) {
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
function installDeps() {
  exec('yarn --version', function (err, stdout, stderr) {
    if (parseFloat(stdout) < 0.15 || err || process.env.USE_YARN === 'false') {
      exec('npm install', addCheckMark.bind(null, installDepsCallback));
    } else {
      exec('yarn install', addCheckMark.bind(null, installDepsCallback));
    }
  });
}

/**
 * Callback function after installing dependencies
 */
function installDepsCallback(error) {
  clearInterval(interval);
  if (error) {
    process.stdout.write(error);
  }

  deleteFileInCurrentDir('setup.js', function () {
    process.stdout.write('\n');
    interval = animateProgress('Initialising new repository');
    process.stdout.write('Initialising new repository');
    initGit(function () {
      clearInterval(interval);
      process.stdout.write('\nDone!');
      process.exit(0);
    });
  });
}
