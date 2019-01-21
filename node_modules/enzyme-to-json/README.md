# enzyme-to-json
[![Build Status](https://img.shields.io/travis/adriantoine/enzyme-to-json.svg?branch=master&style=flat-square)](https://travis-ci.org/adriantoine/enzyme-to-json)
[![codecov](https://img.shields.io/codecov/c/github/adriantoine/enzyme-to-json.svg?style=flat-square)](https://codecov.io/gh/adriantoine/enzyme-to-json)
[![Dependency Status](https://img.shields.io/gemnasium/adriantoine/enzyme-to-json.svg?style=flat-square)](https://gemnasium.com/github.com/adriantoine/enzyme-to-json)

[![npm Version](https://img.shields.io/npm/v/enzyme-to-json.svg?style=flat-square)](https://www.npmjs.com/package/enzyme-to-json)
[![License](https://img.shields.io/npm/l/enzyme-to-json.svg?style=flat-square)](https://www.npmjs.com/package/enzyme-to-json)
[![Downloads](https://img.shields.io/npm/dm/enzyme-to-json.svg?style=flat-square)](https://npm-stat.com/charts.html?package=enzyme-to-json)

Convert [Enzyme](http://airbnb.io/enzyme/) wrappers to a format compatible with [Jest snapshot testing](https://facebook.github.io/jest/docs/tutorial-react.html#snapshot-testing).

# Install
```console
$ npm install --save-dev enzyme-to-json
```

# Usage

The serializer is the recommended way to use `enzyme-to-json`, the installation and usage of it is very easy and allows you to write clean and simple snapshot tests.

In order to use the serializer, just add this line to your [Jest configuration](https://facebook.github.io/jest/docs/en/configuration.html):

```js
"snapshotSerializers": ["enzyme-to-json/serializer"]
```

[Example](https://github.com/adriantoine/enzyme-to-json-v3-testing/blob/master/package.json#L25-L29)

For most projects, that is all you need to start using snapshot tests on Enzyme wrappers. The rest of this readme is only showing advanced usages of this library.

In case you are still confused, [here is a minimal example project](https://github.com/adriantoine/enzyme-to-json-v3-testing) demonstrating this configuration.

# Advanced usage

## Serializer in unit tests

You can add the serializer for only one Jest test file by adding these lines at the beginning of your Jest unit test file:

```js
import {createSerializer} from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
```

You can also add the serializer for all tests using the [`setupTestFrameworkScriptFile`](https://facebook.github.io/jest/docs/en/configuration.html#setuptestframeworkscriptfile-string) configuration option from Jest.

## Helper

At the beginning, `enzyme-to-json` was just a helper because serializers weren't supported by Jest. Even though it is now recommended to use the serializer to keep your tests simple, you can still use the helper as it gives you access to the option objects.

The helper is just a function you can import from `enzyme-to-json` and just pass your Enzyme wrapper as the first parameter and snapshot test the returned value, you'll get the same results as if you used the serializer. Note that you don't have to disable the serializer if you had configured it for the rest of your project. Here is a usage example:

```js
import React, {Component} from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

it('renders correctly', () => {
  const wrapper = shallow(
    <MyComponent className="my-component">
      <strong>Hello World!</strong>
    </MyComponent>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});
```

The main purpose of using the helper is to use the option object. The option object is just the second argument of the helper, here is an example:

```js
toJson(wrapper, {
  noKey: false,
  mode: 'deep'
});
```

And here are all the possible options:

| Key | Value | Description |
| --- | ----- | ----------- |
| `noKey` | `bool` | Since `v2.0.0`, the `key` prop is included in the snapshot, you can turn it off if you don't want your key to be in your snapshot by settting this option to `true`. Only works for the `mount` and `shallow` wrappers. |
| `mode` | `'deep'`, `'shallow'` | The `deep` option will return a test object rendered to **maximum** depth while the `shallow` option will return a test object rendered to **minimum** depth. Only works for the `mount` wrappers. See `mode` documentation for examples. |
| `map` | `function` | You can change each nested node of your component output by providing the map option. See `map` documentation for examples. |

# Docs

- [Helper functions](/docs/helper-functions.md)
- [Modes](/docs/modes.md)
- [Map](/docs/map.md)
