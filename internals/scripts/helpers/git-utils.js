const { exec } = require('child_process');
const shell = require('shelljs');

/**
 * Initialize a new Git repository
 * @returns {Promise<any>}
 */
function initGitRepository() {
  return new Promise((resolve, reject) => {
    exec('git init', (err, stdout) => {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(stdout);
      }
    });
  });
}

/**
 * Add all files to the new repository
 * @returns {Promise<any>}
 */
function addToGitRepository() {
  return new Promise((resolve, reject) => {
    exec('git add .', (err, stdout) => {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(stdout);
      }
    });
  });
}

/**
 * Initial Git commit
 * @returns {Promise<any>}
 */
function commitToGitRepository() {
  return new Promise((resolve, reject) => {
    exec('git commit -m "Initial commit"', (err, stdout) => {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(stdout);
      }
    });
  });
}

/**
 * Checks if we are under Git version control
 * @returns {Promise<boolean>}
 */
function hasGitRepository() {
  return new Promise((resolve, reject) => {
    exec('git status', (err, stdout) => {
      if (err) {
        reject(new Error(err));
      }

      const regex = new RegExp(/fatal:\s+Not\s+a\s+git\s+repository/, 'i');

      /* eslint-disable-next-line no-unused-expressions */
      regex.test(stdout) ? resolve(false) : resolve(true);
    });
  });
}

/**
 * Checks if this is a clone from our repo
 * @returns {Promise<any>}
 */
function checkIfRepositoryIsAClone() {
  return new Promise((resolve, reject) => {
    exec('git remote -v', (err, stdout) => {
      if (err) {
        reject(new Error(err));
      }

      const isClonedRepo = stdout
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line.startsWith('origin'))
        .filter(line => /react-boilerplate\/react-boilerplate\.git/.test(line))
        .length;

      resolve(!!isClonedRepo);
    });
  });
}

/**
 * Remove the current Git repository
 * @returns {Promise<any>}
 */
function removeGitRepository() {
  return new Promise((resolve, reject) => {
    try {
      shell.rm('-rf', '.git/');
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  initGitRepository,
  addToGitRepository,
  commitToGitRepository,
  hasGitRepository,
  checkIfRepositoryIsAClone,
  removeGitRepository,
};
