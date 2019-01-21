### 1.3.1
* FIX: Interpolations following multiline comments no longer incorrectly error
* README UPDATE: Recommend the recommended instead of standard syntax and no longer recommend the syntax config option for stylelint

### 1.3.0
* FIX: Moved to using babylon's new parser that handles typescript, this will fix the problems we had with interpolation tags not being useable in Typescript
* FIX: We now properly handle applying sourcemaps to CSS syntax errors and displaying correct line numbers for errors, Stylelint v9+ is required for this fix though as the biggest part of the fix was on their end
* Stylelint v9+ was added as a peerdependency due to above reasons, no promises are made with this version if you do not update your Stylelint version

### 1.2.2
* FIX: Correctly remove base indentation from injectGlobal when using tabs

### 1.2.1
* FIX: Don't throw errors on using processor without filename (with Node.js API / CLI)

### 1.2.0
* Substitute multiline interpolations with relevant multiline substitutions so line information about errors should now be correctly displayed

### 1.1.1
* FIX: Also catch errors regarding resolving absolute path of file and avoid them bubbling up to Stylelint

### 1.1.0
* Add support for Node v4
* Catch errors to avoid them bubbling up to Stylelint (which broke the Stylelint plugin for VSCode)
* upgrade typescript-eslint-parser to 9.0.0

### 1.0.0
* added support for interpolation tagging to take care of all interpolation edge cases
* added moduleName option for better support for alternative libraries using a similar API
* moved documentation to https://styled-components.com/docs/tooling#stylelint

### 0.4.0
* move typescript to devDependencies
* upgrade typescript-eslint-parser to 7.0.0
* support .extend and .attrs Styled Components attributes
* added shared stylelint config to configure a couple of rules to fit with styled-components’ style of writing CSS

### 0.3.0
* fix interpolation following a comment edge case
* rewrote our indentation handling fixing a lot of indentation rule problems

### 0.2.2
* upgrade typescript-eslint-parser to 5.0.0

### 0.2.1
* fix edge case in interpolations inside a declaration block

### 0.2.0
* parse consecutive template literals for a single property
* upgrade devDependencies
* add interpolation linting section to README
* make styled-mixin interpolation substitutes unique
* added support for multiple interpolations in a property
* handles interpolations in one-line css
* support using stylelint-disable outside of tagged template literals
* upgrade stylelint to 8.0.0
* upgrade typescript-eslint-parser to 4.0.0

### 0.1.2
* fix: move typescript from dependencies to devdependencies

### 0.1.1
* add typescript support
* add newline between components' styles
* use unique name for each wrapped selector
* fix: set stylelint result `errored` to `false` if `warning` does not contain errors

### 0.1.0

* initial release

### 0.0.1 - 0.0.4

* working draft
