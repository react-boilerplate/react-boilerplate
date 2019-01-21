# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [6.2.1](https://github.com/styled-components/jest-styled-components/compare/v6.2.0...v6.2.1) - 2018-09-22
### Fixed
- [toHaveStyleRule] Do not fail when components have empty string as children (see [#189](https://github.com/styled-components/jest-styled-components/pull/189)).


## [6.2.0](https://github.com/styled-components/jest-styled-components/compare/v6.1.1...v6.2.0) - 2018-09-08
### Added
- Ability to export serializer (see [#173](https://github.com/styled-components/jest-styled-components/pull/173)).
- Support for v4 data attribute (see [#181](https://github.com/styled-components/jest-styled-components/pull/181)).

### Fixed
- [toHaveStyleRule] Fix media regex to allow dots (see [#182](https://github.com/styled-components/jest-styled-components/pull/182)).

## [6.1.1](https://github.com/styled-components/jest-styled-components/compare/v6.1.0...v6.1.1) - 2018-08-22
### Fixed
- [toHaveStyleRule] Fix regression with nested components.
- [toHaveStyleRule] Avoid throwing on non existing Enzyme components.

## [6.1.0](https://github.com/styled-components/jest-styled-components/compare/v6.0.1...v6.1.0) - 2018-08-19
### Added
- Support [react-testing-library](https://github.com/kentcdodds/react-testing-library).

## [6.0.1](https://github.com/styled-components/jest-styled-components/compare/v6.0.0...v6.0.1) - 2018-08-11
### Fixed
- Fix `AsymmetricMatcher` TS definition.

## [6.0.0](https://github.com/styled-components/jest-styled-components/compare/v5.0.1...v6.0.0) - 2018-08-11
### Changed
- [toHaveStyleRule] Added support for Jest asymmetric matchers and more (see [#148](https://github.com/styled-components/jest-styled-components/pull/148)).

### Fixed
- [toHaveStyleRule] Support `&&` (see [#126](https://github.com/styled-components/jest-styled-components/pull/126)).
- [toHaveStyleRule] Nested component classNames are serialized too(see [#162](https://github.com/styled-components/jest-styled-components/pull/162)).

## [5.0.1](https://github.com/styled-components/jest-styled-components/compare/v5.0.0...v5.0.1) - 2018-04-01
### Fixed
- [toHaveStyleRule] Allow spaces or no spaces in media queries (see
  [#128](https://github.com/styled-components/jest-styled-components/pull/128)).

### Changed
- Improve README (see
  [#127](https://github.com/styled-components/jest-styled-components/pull/127)
  [#131](https://github.com/styled-components/jest-styled-components/pull/131)
  [#132](https://github.com/styled-components/jest-styled-components/pull/132)).

## [5.0.0](https://github.com/styled-components/jest-styled-components/compare/v4.10.0...v5.0.0) - 2018-02-24
### Changed
- [toHaveStyleRule] Improve support for complex modifiers.

### Removed
- Drop support for Styled Components v1.

## [4.10.0](https://github.com/styled-components/jest-styled-components/compare/v4.9.0...v4.10.0) - 2018-01-14
### Added
- [toHaveStyleRule] Support Preact.

## [4.9.0](https://github.com/styled-components/jest-styled-components/compare/v4.8.0...v4.9.0) - 2017-10-22
### Changed
- [toHaveStyleRule (Native)] Full rewrite to support Styled Components v2.
- Update dependencies.
- Improve README.

### Fixed
- [toHaveStyleRule (React)] Support styled components wrapped with `styled`.

## [4.8.0](https://github.com/styled-components/jest-styled-components/compare/v4.7.1...v4.8.0) - 2017-10-21
### Changed
- [toMatchSnapshot] Support Preact.

## [4.7.1](https://github.com/styled-components/jest-styled-components/compare/v4.7.0...v4.7.1) - 2017-10-18
### Fixed
- [toMatchSnapshot] Add the optional `options` parameter to the matcher type definition.

## [4.7.0](https://github.com/styled-components/jest-styled-components/compare/v4.6.0...v4.7.0) - 2017-09-30
### Changed
- Support React 16.
- Update dependencies.

## [4.6.0](https://github.com/styled-components/jest-styled-components/compare/v4.5.0...v4.6.0) - 2017-09-09
### Changed
- [toMatchSnapshot] Make the matcher compatible with Jest v21.

## [4.5.0](https://github.com/styled-components/jest-styled-components/compare/v4.4.1...v4.5.0) - 2017-09-05
### Changed
- [toHaveStyleRule (React)] Make the matcher compatible with Jest v21 (see https://github.com/facebook/jest/pull/3972).

## [4.4.1](https://github.com/styled-components/jest-styled-components/compare/v4.4.0...v4.4.1) - 2017-08-19
### Fixed
- [toMatchSnapshot] Avoid using non-hashes class names when generating snapshots.

## [4.4.0](https://github.com/styled-components/jest-styled-components/compare/v4.3.0...v4.4.0) - 2017-08-11
### Added
- [toMatchSnapshot] Add `modifier` option to search for pseudo classes and attributes.

## [4.3.0](https://github.com/styled-components/jest-styled-components/compare/v4.2.2...v4.3.0) - 2017-07-31
### Added
- [toMatchSnapshot] Accept a third options parameter to search for rules nested within At-rules.

## [4.2.2](https://github.com/styled-components/jest-styled-components/compare/v4.2.1...v4.2.2) - 2017-07-24
### Fixed
- [toMatchSnapshot] Handle non Styled Components class names with leading white spaces.

## [4.2.1](https://github.com/styled-components/jest-styled-components/compare/v4.2.0...v4.2.1) - 2017-07-23
### Fixed
- [toMatchSnapshot] Handle class names with trailing white spaces.

## [4.2.0](https://github.com/styled-components/jest-styled-components/compare/v4.1.2...v4.2.0) - 2017-07-20
### Changed
- [toHaveStyleRule (React)] Accept regular expressions as a second parameter.

## [4.1.2](https://github.com/styled-components/jest-styled-components/compare/v4.1.1...v4.1.2) - 2017-07-20
### Fixed
- [toHaveStyleRule (React)] Avoid showing Enzyme errors when class names are not present in the tree.

## [4.1.1](https://github.com/styled-components/jest-styled-components/compare/v4.1.0...v4.1.1) - 2017-07-20
### Fixed
- [toMatchSnapshot] Fix regression introduced in 4.1.0 which broke the support for Styled Components < 2.

## [4.1.0](https://github.com/styled-components/jest-styled-components/compare/v4.0.3...v4.1.0) - 2017-07-20
### Changed
- [toMatchSnapshot] Preserve custom (i.e. not generated by Styled Components) class names.

## [4.0.3](https://github.com/styled-components/jest-styled-components/compare/v4.0.2...v4.0.3) - 2017-07-18
### Fixed
- [toMatchSnapshot] Collect unique class names and avoid skipping indexes in placeholders.
- [toHaveStyleRule (React)] Support `null` components.

## [4.0.2](https://github.com/styled-components/jest-styled-components/compare/v4.0.1...v4.0.2) - 2017-07-17
### Fixed
- [toMatchSnapshot] Make the replace regular expression less greedy (i.e. stop at the first match).

## [4.0.1](https://github.com/styled-components/jest-styled-components/compare/v4.0.0...v4.0.1) - 2017-07-16
### Fixed
- [toMatchSnapshot] Replace class names inside the `className` attribute only.

## [4.0.0](https://github.com/styled-components/jest-styled-components/compare/v3.3.2...v4.0.0) - 2017-07-15
### Added
- [toMatchSnapshot] Replace class names generated by Styled Components with placeholders.

### Changed
- Update dependencies.
- Improve README.
- Format code with Prettier.
- Refactor folders and tests.

### Removed
- Remove `toMatchStyledComponentsSnapshot` matcher.
