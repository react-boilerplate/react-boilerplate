/* eslint-disable */
/**
 * This script will extract the internationalization messages from all components and package them in the transalation json files in the translations file.
 */
const fs = require('fs');
const nodeGlob = require('glob');
const chalk = require('chalk');
const transform = require('babel-core').transform;
const pkg = require('../../package.json');
const i18n = require('../../app/i18n');

require('shelljs/global');

const FILES_TO_PARSE = 'app/**/!(*.test).js';
const locales = i18n.appLocales;

const glob = (pattern) => new Promise((resolve, reject) => {
  nodeGlob(pattern, (error, value) => (error ? reject(error) : resolve(value)));
});

const readFile = (fileName) => new Promise((resolve, reject) => {
  fs.readFile(fileName, (error, value) => (error ? reject(error) : resolve(value)));
});

const writeFile = (fileName, data) => new Promise((resolve, reject) => {
  fs.writeFile(fileName, data, (error, value) => (error ? reject(error) : resolve(value)));
});

const logDivider = () => {
  console.log(
    chalk.gray('------------------------------------------------------------------------')
  );
};

const logError = (error, ...args) => {
  console.error(
    chalk.bold.red(error),
    ...args
  );
};

const logSuccess = (success, ...args) => {
  console.log(
    chalk.green(success),
    ...args
  );
};

// Store existing translations into memory
const oldLocaleMappings = [];
const localeMappings = [];
for (const locale of locales) {
  oldLocaleMappings[locale] = {};
  localeMappings[locale] = {};
  const translationFileName = `app/translations/${locale}.json`;
  try {
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

// Use babel plugin to extract instances where react-intl is called and merge it with the
// existing translation
const extractFromFile = async (fileName) => {
  try {
    const code = await readFile(fileName);
    const { metadata: result } = await transform(code, {
      presets: pkg.babel.presets,
      plugins: [
        ['react-intl'],
      ],
    });
    for (const message of result['react-intl'].messages) {
      for (const locale of locales) {
        const oldLocaleMapping = oldLocaleMappings[locale][message.id];
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

  await Promise.all(
    files.map((fileName) => extractFromFile(fileName))
  );

  // Make the directory if it doesn't exist, especially for first run
  mkdir('-p', 'app/translations');
  logDivider();
  for (const locale of locales) {
    const translationFileName = `app/translations/${locale}.json`;
    try {
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
      await writeFile(
        translationFileName,
        JSON.stringify(
          messages,
          null,
          2
        )
      );

      logSuccess(`Translation file for ${locale} successfully saved to: ${translationFileName}`);
    } catch (error) {
      logError(`There was an error saving this translation file: ${translationFileName}\n${error}`);
    }
  }

  logDivider();
}());
