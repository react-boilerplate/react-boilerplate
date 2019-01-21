# stylelint-config-recommended

[![NPM version](http://img.shields.io/npm/v/stylelint-config-recommended.svg)](https://www.npmjs.org/package/stylelint-config-recommended) [![Build Status](https://travis-ci.org/stylelint/stylelint-config-recommended.svg?branch=master)](https://travis-ci.org/stylelint/stylelint-config-recommended) [![Build status](https://ci.appveyor.com/api/projects/status/o8rfhyax6n7bjnlt/branch/master?svg=true)](https://ci.appveyor.com/project/stylelint/stylelint-config-recommended/branch/master)

> The recommended shareable config for stylelint.

It turns on all the [_possible errors_](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md#possible-errors) rules within stylelint.

Use it as is or as a foundation for your own config.

## Installation

```bash
npm install stylelint-config-recommended --save-dev
```

## Usage

If you've installed `stylelint-config-recommended` locally within your project, just set your `stylelint` config to:

```json
{
  "extends": "stylelint-config-recommended"
}
```

If you've globally installed `stylelint-config-recommended` using the `-g` flag, then you'll need to use the absolute path to `stylelint-config-recommended` in your config e.g.

```json
{
  "extends": "/absolute/path/to/stylelint-config-recommended"
}
```

### Extending the config

Simply add a `"rules"` key to your config, then add your overrides and additions there.

For example, to change the `at-rule-no-unknown` rule to use its `ignoreAtRules` option, turn off the `block-no-empty` rule, and add the `unit-whitelist` rule:

```json
{
  "extends": "stylelint-config-recommended",
  "rules": {
    "at-rule-no-unknown": [ true, {
      "ignoreAtRules": [
        "extends"
      ]
    }],
    "block-no-empty": null,
    "unit-whitelist": ["em", "rem", "s"]
  }
}
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
