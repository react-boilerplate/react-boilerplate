/* eslint-disable */
/**
 * This script will extract the internationalization messages from all components
   and package them in the transalation json files in the translations file.
 */
const fs = require('fs');
const nodeGlob = require('glob');
const chalk = require('chalk');
const transform = require('babel-core').transform;
const pkg = require('../../package.json');
const i18n = require('../../app/i18n');

require('shelljs/global');

// Glob to match all js files except test files
const FILES_TO_PARSE = 'app/**/!(*.test).js';
const locales = i18n.appLocales;

// Wrap async functions below into a promise
const glob = (pattern) => new Promise((resolve, reject) => {
  nodeGlob(pattern, (error, value) => (error ? reject(error) : resolve(value)));
});

const readFile = (fileName) => new Promise((resolve, reject) => {
  fs.readFile(fileName, (error, value) => (error ? reject(error) : resolve(value)));
});

const writeFile = (fileName, data) => new Promise((resolve, reject) => {
  fs.writeFile(fileName, data, (error, value) => (error ? reject(error) : resolve(value)));
});

// Helper function to log a gray dividing line
const logDivider = () => {
  console.log(
    chalk.gray('------------------------------------------------------------------------')
  );
};

// Helper function to log an error in bold red
const logError = (error, ...args) => {
  console.error(
    chalk.bold.red(error),
    ...args
  );
};

// Helper function to log a success message in bold green
const logSuccess = (success, ...args) => {
  console.log(
    chalk.green(success),
    ...args
  );
};

// Store existing translations into memory
const oldLocaleMappings = [];
const localeMappings = [];
// Loop to run once per locale
for (const locale of locales) {
  oldLocaleMappings[locale] = {};
  localeMappings[locale] = {};
  // File to store translation messages into
  const translationFileName = `app/translations/${locale}.json`;
  try {
    // Parse the old translation message JSON files
    const messages = JSON.parse(fs.readFileSync(translationFileName));
    for (const message of messages) {
      oldLocaleMappings[locale][message.id] = message;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      logError(`There was an error loading this translation file: ${translationFileName}\n${error}`);
    }
  }
}


const extractFromFile = async (fileName) => {
  try {
    const code = await readFile(fileName);
    // Use babel plugin to extract instances where react-intl is used
    const { metadata: result } = await transform(code, {
      presets: pkg.babel.presets,
      plugins: [
        ['react-intl'],
      ],
    });
    for (const message of result['react-intl'].messages) {
      for (const locale of locales) {
        const oldLocaleMapping = oldLocaleMappings[locale][message.id];
        // Merge old translations into the babel extracted instances where react-intl is used
        localeMappings[locale][message.id] = {
          id: message.id,
          description: message.description,
          defaultMessage: message.defaultMessage,
          message: (oldLocaleMapping && oldLocaleMapping.message) ? oldLocaleMapping.message : '',
        };
      }
    }
  } catch (error) {
    logError(`There was an error transforming this file: ${fileName}\n${error}`);
  }
};

(async function main() {
  const files = await glob(FILES_TO_PARSE);

  // Run extraction on all files that match the glob on line 16
  await Promise.all(
    files.map((fileName) => extractFromFile(fileName))
  );

  // Make the directory if it doesn't exist, especially for first run
  mkdir('-p', 'app/translations');
  logDivider();
  for (const locale of locales) {
    const translationFileName = `app/translations/${locale}.json`;
    try {
      // Sort the translation JSON file so that git diffing is easier
      // Otherwise the translation messages will jump around every time we extract
      let messages = Object.values(localeMappings[locale]).sort((a, b) => {
        a = a.id.toUpperCase();
        b = b.id.toUpperCase();
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      });
      // Write to file the JSON representation of the translation messages
      await writeFile(
        translationFileName,
        JSON.stringify(
          messages,
          null,
          2
        ) + "\n"
      );

      logSuccess(`Translation file for ${locale} successfully saved to: ${translationFileName}`);
    } catch (error) {
      logError(`There was an error saving this translation file: ${translationFileName}\n${error}`);
    }
  }

  logDivider();
}());
