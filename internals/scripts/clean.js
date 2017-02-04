/* global which, echo, exit, rm, mkdir, cp, exec, mv */
require('shelljs/global');
const addCheckMark = require('./helpers/checkmark.js');

if (!which('git')) {
  echo('Sorry, this script requires git');
  exit(1);
}

if (!test('-e', 'internals/templates')) {
  echo('The example is deleted already.');
  exit(1);
}

process.stdout.write('Cleanup started...');

// Reuse existing LanguageProvider and i18n tests
mv('app/containers/LanguageProvider/tests', 'internals/templates/containers/LanguageProvider');
cp('app/tests/i18n.test.js', 'internals/templates/tests/');

// Handle Translations
rm('-rf', 'app/translations');
mv('internals/templates/translations', 'app');

// Handle containers/
rm('-rf', 'app/containers');
mv('internals/templates/containers', 'app');

// Handle components/
rm('-rf', 'app/components');
mv('internals/templates/components', 'app');

// Handle tests/
mv('internals/templates/tests', 'app');

// Handle utils/
rm('-rf', 'app/utils');
mv('internals/templates/utils', 'app');

rm('-rf', 'app/setup');
mv('internals/templates/setup', 'app');

// Replace the files in the root app/ folder
cp('internals/templates/app.js', 'app/');
cp('internals/templates/global-styles.js', 'app/');
cp('internals/templates/i18n.js', 'app/');
cp('internals/templates/reducers.js', 'app/');
cp('internals/templates/renderInBrowser.js', 'app/');
cp('internals/templates/routes.js', 'app/');
cp('internals/templates/serverEntry.js', 'app/');
cp('internals/templates/store.js', 'app/');

// Remove the templates folder
rm('-rf', 'internals/templates');

addCheckMark();

// Commit the changes
if (exec('git add . --all && git commit -qm "Remove default example"').code !== 0) {
  echo('\nError: Git commit failed');
  exit(1);
}

echo('\nCleanup done. Happy Coding!!!');
