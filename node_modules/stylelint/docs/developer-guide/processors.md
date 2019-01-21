# Writing processors

Processors are functions that hook into stylelint's pipeline, modifying code on its way into stylelint and modifying results on their way out.

*Processors can only be used with the CLI and the Node API, not with the PostCSS plugin.*

Processor modules are functions that accept an options object and return an object with the following the functions, which hook into the processing of each file:

-   **code**: A function that accepts two arguments, the file's code and the file's path, and returns a string for stylelint to lint.
-   **result**: A function that accepts two arguments, the file's stylelint result object and the file's path, and either mutates the result object (returning nothing) or returns a new one.

```js
// my-processor.js
module.exports = function(options) {
  return {
    code: function(input, filepath) {
      // ...
      return transformedCode;
    },
    result: function(stylelintResult, filepath) {
      // ...
      return transformedResult;
    }
  };
}
```

Processors can enable stylelint to lint the CSS within non-stylesheet files.

*Processor options must be JSON-friendly*, because users will need to include them in `.stylelintrc` files.

## Sharing processors

-   Use the `stylelint-processor` keyword within your `package.json`.
-   Once your processor is published, please send us a Pull Request to add your processor to [the list](../user-guide/processors.md).
