/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

var Source = require("./Source");
var SourceNode = require("source-map").SourceNode;
var SourceListMap = require("source-list-map").SourceListMap;
var fromStringWithSourceMap = require("source-list-map").fromStringWithSourceMap;
var SourceMapConsumer = require("source-map").SourceMapConsumer;

class ReplaceSource extends Source {
	constructor(source, name) {
		super();
		this._source = source;
		this._name = name;
		this.replacements = [];
	}

	replace(start, end, newValue) {
		if(typeof newValue !== "string")
			throw new Error("insertion must be a string, but is a " + typeof newValue);
		this.replacements.push([start, end, newValue, this.replacements.length]);
	}

	insert(pos, newValue) {
		if(typeof newValue !== "string")
			throw new Error("insertion must be a string, but is a " + typeof newValue + ": " + newValue);
		this.replacements.push([pos, pos - 1, newValue, this.replacements.length]);
	}

	source(options) {
		return this._replaceString(this._source.source());
	}

	original() {
		return this._source;
	}

	_sortReplacements() {
		this.replacements.sort(function(a, b) {
			var diff = b[1] - a[1];
			if(diff !== 0)
				return diff;
			diff = b[0] - a[0];
			if(diff !== 0)
				return diff;
			return b[3] - a[3];
		});
	}

	_replaceString(str) {
		if(typeof str !== "string")
			throw new Error("str must be a string, but is a " + typeof str + ": " + str);
		this._sortReplacements();
		var result = [str];
		this.replacements.forEach(function(repl) {
			var remSource = result.pop();
			var splitted1 = this._splitString(remSource, Math.floor(repl[1] + 1));
			var splitted2 = this._splitString(splitted1[0], Math.floor(repl[0]));
			result.push(splitted1[1], repl[2], splitted2[0]);
		}, this);

		// write out result array in reverse order
		let resultStr = "";
		for(let i = result.length - 1; i >= 0; --i) {
			resultStr += result[i];
		}
		return resultStr;
	}

	node(options) {
		this._sortReplacements();
		var result = [this._source.node(options)];
		this.replacements.forEach(function(repl) {
			var remSource = result.pop();
			var splitted1 = this._splitSourceNode(remSource, Math.floor(repl[1] + 1));
			var splitted2;
			if(Array.isArray(splitted1)) {
				splitted2 = this._splitSourceNode(splitted1[0], Math.floor(repl[0]));
				if(Array.isArray(splitted2)) {
					result.push(splitted1[1], this._replacementToSourceNode(splitted2[1], repl[2]), splitted2[0]);
				} else {
					result.push(splitted1[1], this._replacementToSourceNode(splitted1[1], repl[2]), splitted1[0]);
				}
			} else {
				splitted2 = this._splitSourceNode(remSource, Math.floor(repl[0]));
				if(Array.isArray(splitted2)) {
					result.push(this._replacementToSourceNode(splitted2[1], repl[2]), splitted2[0]);
				} else {
					result.push(repl[2], remSource);
				}
			}
		}, this);
		result = result.reverse();
		return new SourceNode(null, null, null, result);
	}

	listMap(options) {
		this._sortReplacements();
		var map = this._source.listMap(options);
		var currentIndex = 0;
		var replacements = this.replacements;
		var idxReplacement = replacements.length - 1;
		var removeChars = 0;
		map = map.mapGeneratedCode(function(str) {
			var newCurrentIndex = currentIndex + str.length;
			if(removeChars > str.length) {
				removeChars -= str.length;
				str = "";
			} else {
				if(removeChars > 0) {
					str = str.substr(removeChars);
					currentIndex += removeChars;
					removeChars = 0;
				}
				var finalStr = "";
				while(idxReplacement >= 0 && replacements[idxReplacement][0] < newCurrentIndex) {
					var repl = replacements[idxReplacement];
					var start = Math.floor(repl[0]);
					var end = Math.floor(repl[1] + 1);
					var before = str.substr(0, Math.max(0, start - currentIndex));
					if(end <= newCurrentIndex) {
						var after = str.substr(Math.max(0, end - currentIndex));
						finalStr += before + repl[2];
						str = after;
						currentIndex = Math.max(currentIndex, end);
					} else {
						finalStr += before + repl[2];
						str = "";
						removeChars = end - newCurrentIndex;
					}
					idxReplacement--;
				}
				str = finalStr + str;
			}
			currentIndex = newCurrentIndex;
			return str;
		});
		var extraCode = "";
		while(idxReplacement >= 0) {
			extraCode += replacements[idxReplacement][2];
			idxReplacement--;
		}
		if(extraCode) {
			map.add(extraCode);
		}
		return map;
	}

	_replacementToSourceNode(oldNode, newString) {
		var map = oldNode.toStringWithSourceMap({
			file: "?"
		}).map;
		var original = new SourceMapConsumer(map.toJSON()).originalPositionFor({
			line: 1,
			column: 0
		});
		if(original) {
			return new SourceNode(original.line, original.column, original.source, newString);
		} else {
			return newString;
		}
	}

	_splitSourceNode(node, position) {
		if(typeof node === "string") {
			if(node.length <= position) return position - node.length;
			return position <= 0 ? ["", node] : [node.substr(0, position), node.substr(position)];
		} else {
			for(var i = 0; i < node.children.length; i++) {
				position = this._splitSourceNode(node.children[i], position);
				if(Array.isArray(position)) {
					var leftNode = new SourceNode(
						node.line,
						node.column,
						node.source,
						node.children.slice(0, i).concat([position[0]]),
						node.name
					);
					var rightNode = new SourceNode(
						node.line,
						node.column,
						node.source, [position[1]].concat(node.children.slice(i + 1)),
						node.name
					);
					leftNode.sourceContents = node.sourceContents;
					return [leftNode, rightNode];
				}
			}
			return position;
		}
	}

	_splitString(str, position) {
		return position <= 0 ? ["", str] : [str.substr(0, position), str.substr(position)];
	}
}

require("./SourceAndMapMixin")(ReplaceSource.prototype);

module.exports = ReplaceSource;
