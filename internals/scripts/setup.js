#!/usr/bin/env node

const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark');
const readline = require('readline');

process.stdin.resume();
process.stdin.setEncoding('utf8');

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

const dir = process.cwd();
process.stdout.write('\n');
let interval = animateProgress('Cleaning old repository');
process.stdout.write('Cleaning old repository');
cleanRepo(dir, () => {
  clearInterval(interval);
  process.stdout.write('\nInstalling dependencies... (This might take a while)');
  setTimeout(() => {
    readline.cursorTo(process.stdout, 0);
    interval = animateProgress('Installing dependencies');
  }, 500);

  process.stdout.write('Installing dependencies');
  installDeps((error) => {
    clearInterval(interval);
    if (error) {
      process.stdout.write(error);
    }

    deleteFileInCurrentDir('setup.js', () => {
      process.stdout.write('\n');
      interval = animateProgress('Initialising new repository');
      process.stdout.write('Initialising new repository');
      initGit(dir, () => {
        clearInterval(interval);
        process.stdout.write('\nDone!');
        process.exit(0);
      });
    });
  });
});
