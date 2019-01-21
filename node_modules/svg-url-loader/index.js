/*
 * @license MIT http://www.opensource.org/licenses/mit-license.php
 * @author  Hovhannes Babayan <bhovhannes at gmail dot com>
 */
var loaderUtils = require('loader-utils');

module.exports = function(content) {
	this.cacheable && this.cacheable();

	var query = loaderUtils.getOptions(this) || {};
	query.encoding = query.encoding || "none";

	var limit = query.limit ? parseInt(query.limit, 10) : 0;

	if (limit <= 0 || content.length < limit) {
		var newContent = content.toString('utf8');

		var hasStyleElement = /<style[\s\S]*?>[\s\S]*?<\/style>/i.test(newContent)

		if (query.stripdeclarations) {
			newContent = newContent.replace(/^\s*<\?xml [^>]*>\s*/i, "");
		}

		var data;
		if (query.encoding === "base64") {
			if (typeof newContent === "string") {
				newContent = new Buffer(newContent);
			}
			data = "data:image/svg+xml;base64," + newContent.toString("base64");
		} else {
			newContent = newContent.replace(/"/g, "'");
			newContent = newContent.replace(/\s+/g, " ");
			newContent = newContent.replace(/[{}\|\\\^~\[\]`"<>#%]/g, function(match) {
				return '%'+match[0].charCodeAt(0).toString(16).toUpperCase();
			});

			data = 'data:image/svg+xml,' + newContent.trim();

		}

		if (!(query.iesafe && hasStyleElement && data.length > 4096)) {
			if (query.encoding === "none" && !query.noquotes) {
				data = '"'+data+'"';
			}

			return 'module.exports = ' + JSON.stringify(data);
		}
	}

	var fileLoader = require('file-loader');
	return fileLoader.call(this, content);
};

module.exports.raw = true;
