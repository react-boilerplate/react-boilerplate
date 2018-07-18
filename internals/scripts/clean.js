const shell = require('shelljs');
const addCheckMark = require('./helpers/checkmark.js');

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

if (!shell.test('-e', 'internals/templates')) {
  shell.echo('The example is deleted already.');
  shell.exit(1);
}

process.stdout.write('Cleanup started...');

// Reuse existing LanguageProvider and i18n tests
shell.mv('app/containers/LanguageProvider/tests', 'internals/templates/containers/LanguageProvider');
shell.cp('app/tests/i18n.test.js', 'internals/templates/tests/i18n.test.js');

// Cleanup components/
shell.rm('-rf', 'app/components/*');

// Handle containers/
shell.rm('-rf', 'app/containers');
shell.mv('internals/templates/containers', 'app');

// Handle tests/
shell.mv('internals/templates/tests', 'app');

// Handle translations/
shell.rm('-rf', 'app/translations')
shell.mv('internals/templates/translations', 'app');

// Handle utils/
shell.rm('-rf', 'app/utils');
shell.mv('internals/templates/utils', 'app')

// Replace the files in the root app/ folder
shell.cp('internals/templates/app.js', 'app/app.js');
shell.cp('internals/templates/global-styles.js', 'app/global-styles.js');
shell.cp('internals/templates/i18n.js', 'app/i18n.js');
shell.cp('internals/templates/index.html', 'app/index.html');
shell.cp('internals/templates/reducers.js', 'app/reducers.js');
shell.cp('internals/templates/configureStore.js', 'app/configureStore.js');

// Remove the templates folder
shell.rm('-rf', 'internals/templates');

addCheckMark();

// Commit the changes
if (shell.exec('git add . --all && git commit -qm "Remove default example"').code !== 0) {
  shell.echo('\nError: Git commit failed');
  shell.exit(1);
}

shell.echo('\nCleanup done. Happy Coding!!!');
