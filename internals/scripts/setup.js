#!/usr/bin/env node

'use strict';

const shell = require('shelljs');
const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark');
const readline = require('readline');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('\n');
let interval;
let clearRepo = true;

cleanRepo(() => {
  process.stdout.write(
    '\nInstalling dependencies... (This might take a while)',
  );
  setTimeout(function() {
    readline.cursorTo(process.stdout, 0);
    interval = animateProgress('Installing dependencies');
  }, 500);

  installDeps();
});

/**
 * Deletes the .git folder in dir only if cloned from our repo
 */
function cleanRepo(callback) {
  fs.readFile('.git/config', 'utf8', (err, data) => {
    if (!err) {
      let isClonedRepo =
        typeof data === 'string' &&
        (data.match(/url\s*=/g) || []).length === 1 &&
        /react-boilerplate\/react-boilerplate\.git/.test(data);
      if (isClonedRepo) {
        process.stdout.write('\nDo you want to clear old repository? [Y/n] ');
        process.stdin.resume();
        process.stdin.on('data', data => {
          let val = data.toString().trim();
          if (val === 'y' || val === 'Y' || val === '') {
            process.stdout.write('Removing old repository');
            shell.rm('-rf', '.git/');
            addCheckMark(callback);
          } else {
            dontClearRepo('', callback);
          }
        });
      } else {
        dontClearRepo('\n', callback);
      }
    } else {
      callback();
    }
  });
}

/**
 * Function which indicates that we are not cleaning git repo
 */
function dontClearRepo(nl, callback) {
  clearRepo = false;
  process.stdout.write(nl + 'Leaving your repository untouched');
  addCheckMark(callback);
}

/**
 * Initializes git again
 */
function initGit(callback) {
  exec(
    'git init && git add . && git commit -m "Initial commit"',
    addCheckMark.bind(null, callback),
  );
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
  exec('node --version', function(err, stdout, stderr) {
    const nodeVersion = stdout && parseFloat(stdout.substring(1));
    if (nodeVersion < 5 || err) {
      installDepsCallback(
        err ||
          'Unsupported node.js version, make sure you have the latest version installed.',
      );
    } else {
      exec('yarn --version', function(err, stdout, stderr) {
        if (
          parseFloat(stdout) < 0.15 ||
          err ||
          process.env.USE_YARN === 'false'
        ) {
          exec('npm install', addCheckMark.bind(null, installDepsCallback));
        } else {
          exec('yarn install', addCheckMark.bind(null, installDepsCallback));
        }
      });
    }
  });
}

/**
 * Callback function after installing dependencies
 */
function installDepsCallback(error) {
  clearInterval(interval);
  process.stdout.write('\n\n');
  if (error) {
    process.stderr.write(error);
    process.stdout.write('\n');
    process.exit(1);
  }

  deleteFileInCurrentDir('setup.js', function() {
    if (clearRepo) {
      interval = animateProgress('Initialising new repository');
      process.stdout.write('Initialising new repository');
      initGit(function() {
        clearInterval(interval);
        endProcess();
      });
    }

    endProcess();
  });
}
/**
 * Function which ends setup process
 */
function endProcess() {
  process.stdout.write('\nDone!');
  process.exit(0);
}
