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

// Cleanup components folder
rm('-rf', 'app/components/*');

// Save LanguageProvider tests
mv('app/containers/LanguageProvider/tests', 'internals/templates/languageProvider/');

// Cleanup containers folder
rm('-rf', 'app/containers/*');
mkdir('-p', 'app/containers/App/tests');
mkdir('-p', 'app/containers/NotFoundPage/tests');
mkdir('-p', 'app/containers/HomePage/tests');

cp('internals/templates/appContainer/index.js', 'app/containers/App/index.js');
cp('internals/templates/appContainer/tests/index.test.js', 'app/containers/App/tests/index.test.js');
cp('internals/templates/appContainer/constants.js', 'app/containers/App/constants.js');
cp('internals/templates/appContainer/selectors.js', 'app/containers/App/selectors.js');
cp('internals/templates/appContainer/tests/selectors.test.js', 'app/containers/App/tests/selectors.test.js');

cp('internals/templates/notFoundPage/index.js', 'app/containers/NotFoundPage/index.js');
cp('internals/templates/notFoundPage/messages.js', 'app/containers/NotFoundPage/messages.js');
cp('internals/templates/notFoundPage/tests/index.test.js', 'app/containers/NotFoundPage/tests/index.test.js');

cp('internals/templates/homePage/index.js', 'app/containers/HomePage/index.js');
cp('internals/templates/homePage/messages.js', 'app/containers/HomePage/messages.js');
cp('internals/templates/homePage/tests/index.test.js', 'app/containers/HomePage/tests/index.test.js');

// Handle Translations
rm('-rf', 'app/translations/*')
mkdir('-p', 'app/translations');
cp('internals/templates/translations/en.json',
  'app/translations/en.json');

// move i18n file
cp('internals/templates/i18n.js',
  'app/i18n.js');

// Copy LanguageProvider
mkdir('-p', 'app/containers/LanguageProvider');
mv('internals/templates/languageProvider/tests', 'app/containers/LanguageProvider');
cp('internals/templates/languageProvider/actions.js',
  'app/containers/LanguageProvider/actions.js');
cp('internals/templates/languageProvider/constants.js',
  'app/containers/LanguageProvider/constants.js');
cp('internals/templates/languageProvider/languageProvider.js',
  'app/containers/LanguageProvider/index.js');
cp('internals/templates/languageProvider/reducer.js',
  'app/containers/LanguageProvider/reducer.js');
cp('internals/templates/languageProvider/selectors.js',
  'app/containers/LanguageProvider/selectors.js');

// Utils
rm('-rf', 'app/utils');
mv('internals/templates/utils', 'app')

// Replace the files in the root app/ folder
cp('internals/templates/app.js', 'app/app.js');
cp('internals/templates/index.html', 'app/index.html');
cp('internals/templates/reducers.js', 'app/reducers.js');
cp('internals/templates/routes.js', 'app/routes.js');
cp('internals/templates/store.js', 'app/store.js');
cp('internals/templates/appTests/store.test.js', 'app/tests/store.test.js');

// Remove the templates folder
rm('-rf', 'internals/templates');

addCheckMark();

// Commit the changes
if (exec('git add . --all && git commit -qm "Remove default example"').code !== 0) {
  echo('\nError: Git commit failed');
  exit(1);
}

echo('\nCleanup done. Happy Coding!!!');
