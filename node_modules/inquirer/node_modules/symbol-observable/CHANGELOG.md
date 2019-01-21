<a name="1.0.1"></a>
## [1.0.1](https://github.com/blesh/symbol-observable/compare/1.0.0...v1.0.1) (2016-06-15)


### Bug Fixes

* **bundlers:** fix issue that caused some bundlers not to be able to locate `/lib` (#19) ([dd8fdfe](https://github.com/blesh/symbol-observable/commit/dd8fdfe)), closes [(#19](https://github.com/(/issues/19) [#17](https://github.com/blesh/symbol-observable/issues/17)



<a name="1.0.0"></a>
# [1.0.0](https://github.com/blesh/symbol-observable/compare/0.2.4...v1.0.0) (2016-06-13)


### Bug Fixes

* **index.js:** use typeof to check for global or window definitions (#8) ([5f4c2c6](https://github.com/blesh/symbol-observable/commit/5f4c2c6))
* **types:** use default syntax for typedef ([240e3a6](https://github.com/blesh/symbol-observable/commit/240e3a6))
* **TypeScript:** exported ponyfill now works with TypeScript ([c0b894e](https://github.com/blesh/symbol-observable/commit/c0b894e))

### Features

* **es2015:** add es2015 implementation to support rollup (#10) ([7a41de9](https://github.com/blesh/symbol-observable/commit/7a41de9))


### BREAKING CHANGES

* TypeScript: CJS users will now have to `require('symbol-observable').default` rather than just `require('symbol-observable')` this was done to better support ES6 module bundlers.



<a name="0.2.4"></a>
## [0.2.4](https://github.com/blesh/symbol-observable/compare/0.2.2...v0.2.4) (2016-04-25)


### Bug Fixes

* **IE8 support:** Ensure ES3 support so IE8 is happy ([9aaa7c3](https://github.com/blesh/symbol-observable/commit/9aaa7c3))
* **Symbol.observable:** should NOT equal `Symbol.for('observable')`. ([3b0fdee](https://github.com/blesh/symbol-observable/commit/3b0fdee)), closes [#7](https://github.com/blesh/symbol-observable/issues/7)



<a name="0.2.3"></a>
## [0.2.3](https://github.com/blesh/symbol-observable/compare/0.2.3...v0.2.3) (2016-04-24)

### Bug Fixes

- **IE8/ECMAScript 3**: Make sure legacy browsers don't choke on a property named `for`. ([9aaa7c](https://github.com/blesh/symbol-observable/9aaa7c))


<a name="0.2.2"></a>
## [0.2.2](https://github.com/sindresorhus/symbol-observable/compare/0.2.1...v0.2.2) (2016-04-19)

### Features

* **TypeScript:** add TypeScript typings file ([befd7a](https://github.com/sindresorhus/symbol-observable/commit/befd7a))


<a name="0.2.1"></a>
## [0.2.1](https://github.com/sindresorhus/symbol-observable/compare/0.2.0...v0.2.1) (2016-04-19)


### Bug Fixes

* **publish:** publish all required files ([5f26c3a](https://github.com/sindresorhus/symbol-observable/commit/5f26c3a))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/sindresorhus/symbol-observable/compare/v0.1.0...v0.2.0) (2016-04-19)


### Bug Fixes

* **Symbol.observable:** ensure Symbol.for(\'observable\') matches Symbol.observable ([ada343f](https://github.com/sindresorhus/symbol-observable/commit/ada343f)), closes [#1](https://github.com/sindresorhus/symbol-observable/issues/1) [#2](https://github.com/sindresorhus/symbol-observable/issues/2)
