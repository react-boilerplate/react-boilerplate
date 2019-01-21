'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  uglify: require('uglify-es/package.json').version, // eslint-disable-line global-require
  plugin: require('../../package.json').version // eslint-disable-line global-require
};