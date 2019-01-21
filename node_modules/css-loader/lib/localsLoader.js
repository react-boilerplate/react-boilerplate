/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");
var processCss = require("./processCss");
var getImportPrefix = require("./getImportPrefix");
var compileExports = require("./compile-exports");
var createResolver = require("./createResolver");


module.exports = function(content) {
	if(this.cacheable) this.cacheable();
	var callback = this.async();
	var query = loaderUtils.getOptions(this) || {};
	var moduleMode = query.modules || query.module;
	var camelCaseKeys = query.camelCase || query.camelcase;
	var resolve = createResolver(query.alias);

	processCss(content, null, {
		mode: moduleMode ? "local" : "global",
		query: query,
		minimize: this.minimize,
		loaderContext: this,
		resolve: resolve
	}, function(err, result) {
		if(err) return callback(err);

		// for importing CSS
		var importUrlPrefix = getImportPrefix(this, query);

		function importItemMatcher(item) {
			var match = result.importItemRegExp.exec(item);
			var idx = +match[1];
			var importItem = result.importItems[idx];
			var importUrl = importUrlPrefix + importItem.url;
			return "\" + require(" + loaderUtils.stringifyRequest(this, importUrl) + ")" +
				"[" + JSON.stringify(importItem.export) + "] + \"";
		}

		var exportJs = compileExports(result, importItemMatcher.bind(this), camelCaseKeys);
		if (exportJs) {
			exportJs = "module.exports = " + exportJs + ";";
		}


		callback(null, exportJs);
	}.bind(this));
};
