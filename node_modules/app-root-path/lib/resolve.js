'use strict';

// Dependencies
var path = require('path');

// Load global paths
var globalPaths = require('module').globalPaths;

// Guess at NPM's global install dir
var npmGlobalPrefix;
if ('win32' === process.platform) {
	npmGlobalPrefix = path.dirname(process.execPath);
} else {
	npmGlobalPrefix = path.dirname(path.dirname(process.execPath));
}
var npmGlobalModuleDir = path.resolve(npmGlobalPrefix, 'lib', 'node_modules');

// Save OS-specific path separator
var sep = path.sep;

// Resolver
module.exports = function resolve(dirname) {
	// Check for environmental variable
	if (process.env.APP_ROOT_PATH) {
		return path.resolve(process.env.APP_ROOT_PATH);
	}

	// Defer to main process in electron renderer
	if ('undefined' !== typeof window && window.process && 'renderer' === window.process.type) {
		var electron = 'electron';
		var remote = require(electron).remote;
		return remote.require('app-root-path').path;
	}

	var resolved = path.resolve(dirname);
	var alternateMethod = false;
	var appRootPath = null;

	// Make sure that we're not loaded from a global include path
	// Eg. $HOME/.node_modules
	//     $HOME/.node_libraries
	//     $PREFIX/lib/node
	globalPaths.forEach(function(globalPath) {
		if (!alternateMethod && 0 === resolved.indexOf(globalPath)) {
			alternateMethod = true;
		}
	});

	// If the app-root-path library isn't loaded globally, 
	// and node_modules exists in the path, just split __dirname
	var nodeModulesDir = sep + 'node_modules';
	if (!alternateMethod && -1 !== resolved.indexOf(nodeModulesDir)) {
		var parts = resolved.split(nodeModulesDir);
		if (parts.length) {
			appRootPath = parts[0];
			parts = null;
		}
	}

	// If the above didn't work, or this module is loaded globally, then
	// resort to require.main.filename (See http://nodejs.org/api/modules.html)
	if (alternateMethod || null == appRootPath) {
		appRootPath = path.dirname(require.main.filename);
	}

	// Handle global bin/ directory edge-case
	if (alternateMethod && -1 !== appRootPath.indexOf(npmGlobalModuleDir) && (appRootPath.length - 4) === appRootPath.indexOf(sep + 'bin')) {
		appRootPath = appRootPath.slice(0, -4);
	}

	// Return
	return appRootPath;
};
