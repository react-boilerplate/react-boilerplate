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
shell.mv(
  'app/containers/LanguageProvider/tests',
  'internals/templates/app/containers/LanguageProvider',
);
shell.cp('app/tests/i18n.test.js', 'internals/templates/app/tests/i18n.test.js');

// Cleanup components/
shell.rm('-rf', 'app/components/*');

// Handle containers/
shell.rm('-rf', 'app/containers');
shell.mv('internals/templates/app/containers', 'app');

// Handle tests/
shell.mv('internals/templates/app/tests', 'app');

// Handle translations/
shell.rm('-rf', 'app/translations');
shell.mv('internals/templates/app/translations', 'app');

// Handle utils/
shell.rm('-rf', 'app/utils');
shell.mv('internals/templates/app/utils', 'app');

// Replace the files in the root app/ folder
shell.cp('internals/templates/app/app.js', 'app/app.js');
shell.cp('internals/templates/app/global-styles.js', 'app/global-styles.js');
shell.cp('internals/templates/app/i18n.js', 'app/i18n.js');
shell.cp('internals/templates/public/index.html', 'public/index.html');
shell.cp('internals/templates/app/reducers.js', 'app/reducers.js');
shell.cp('internals/templates/app/configureStore.js', 'app/configureStore.js');

// Remove the templates folder
shell.rm('-rf', 'internals/templates/app');

addCheckMark();

// Commit the changes
if (
  shell.exec('git add . --all && git commit -qm "Remove default example"')
    .code !== 0
) {
  shell.echo('\nError: Git commit failed');
  shell.exit(1);
}

shell.echo('\nCleanup done. Happy Coding!!!');
