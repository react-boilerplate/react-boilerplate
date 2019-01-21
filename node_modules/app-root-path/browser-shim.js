'use strict';

exports.path = require('path').dirname(require.main.filename);

exports.resolve = function(pathToModule) {
	return exports.path + pathToModule;
};

exports.require = function(pathToModule) {
	return require(exports.resolve(pathToModule));
};

exports.toString = function() {
	return exports.path;
};

exports.setPath = function(explicitlySetPath) {
	exports.path = explicitlySetPath;
};