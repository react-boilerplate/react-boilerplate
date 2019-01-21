<div align="center">
	<a href="https://github.com/webpack/webpack-cli">
		<img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
	</a>
</div>
<br>

[![npm](https://img.shields.io/npm/v/webpack-cli.svg)](https://www.npmjs.com/package/webpack-cli)
[![Build Status](https://travis-ci.org/webpack/webpack-cli.svg)](https://travis-ci.org/webpack/webpack-cli)
[![Build status](https://ci.appveyor.com/api/projects/status/c2a37nlrfv9mg64f?svg=true)](https://ci.appveyor.com/project/ev1stensberg/webpack-cli)
[![Dependency Status](https://david-dm.org/webpack/webpack-cli.svg)](https://david-dm.org/webpack/webpack-cli)
[![Code Climate](https://codeclimate.com/github/webpack/webpack-cli/badges/gpa.svg)](https://codeclimate.com/github/webpack/webpack-cli)
[![chat on gitter](https://badges.gitter.im/webpack/webpack.svg)](https://gitter.im/webpack/webpack)
[![Greenkeeper badge](https://badges.greenkeeper.io/webpack/webpack-cli.svg)](https://greenkeeper.io/)
[![Install Size](https://packagephobia.now.sh/badge?p=webpack-cli)](https://packagephobia.now.sh/result?p=webpack-cli)

# Webpack CLI

Webpack CLI encapsulates all code related to CLI handling. It captures options and sends them to webpack compiler. You can also find functionality for initializing a project and migrating between versions.

## Migration from webpack v1 to v2

The `migrate` feature eases the transition from [version 1](http://webpack.github.io/docs/) to [version 2](https://gist.github.com/sokra/27b24881210b56bbaff7). `migrate` also allows users to switch to the new version of webpack without having to extensively [refactor](https://webpack.js.org/guides/migrating/).

`webpack-cli migrate <config>`

[Read more about migrating](MIGRATE.md)

## Creating new webpack projects

The `init` feature allows users to get started with webpack, fast. Through scaffolding, people can create their own configuration in order to faster initialize new projects for various of use cases.

`webpack-cli init webpack-scaffold-<package>`

[Read more about scaffolding](SCAFFOLDING.md)

## Contributing and Internal Documentation

The webpack family welcomes any contributor, small or big. We are happy to elaborate, guide you through the source code and find issues you might want to work on! To get started have a look at our [documentation on contributing](CONTRIBUTING.md), or our [Internal Documentation](https://webpack.github.io/webpack-cli/)

