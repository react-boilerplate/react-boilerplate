# babel-plugin-react-intl

Extracts string messages for translation from modules that use [React Intl][].

_**Note:** This Babel plugin works with React Intl v2.x, and **1.x of this plugin works with Babel 5, 2.x works with Babel 6**._

## Installation

```sh
$ npm install babel-plugin-react-intl
```

## Usage

**This Babel plugin only visits ES6 modules which `import` React Intl.**

The default message descriptors for the app's default language will be extracted from: `defineMessages()`, `<FormattedMessage>`, and `<FormattedHTMLMessage>`; all of which are named exports of the React Intl package.

If a message descriptor has a `description`, it'll be removed from the source after it's extracted to save bytes since it isn't used at runtime.

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": [
    ["react-intl", {
        "messagesDir": "./build/messages/"
    }]
  ]
}
```

#### Options

- **`messagesDir`**: The target location where the plugin will output a `.json` file corresponding to each component from which React Intl messages were extracted. If not provided, the extracted message descriptors will only be accessible via Babel's API.

- **`enforceDescriptions`**: Whether message declarations _must_ contain a `description` to provide context to translators. Defaults to: `false`.

- **`extractSourceLocation`**: Whether the metadata about the location of the message in the source file should be extracted. If `true`, then `file`, `start`, and `end` fields will exist for each extracted message descriptors. Defaults to `false`.

- **`moduleSourceName`**: The ES6 module source name of the React Intl package. Defaults to: `"react-intl"`, but can be changed to another name/path to React Intl.

### Via Node API

The extract message descriptors are available via the `metadata` property on the object returned from Babel's `transform()` API:

```javascript
require('babel-core').transform('code', {
  plugins: ['react-intl']
}) // => { code, map, ast, metadata['react-intl'].messages };
```


[React Intl]: http://formatjs.io/react/
