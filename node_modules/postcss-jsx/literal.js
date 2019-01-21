
"use strict";
const Node = require("postcss/lib/node");

/**
 * Represents a JS obj
 *
 * @extends Container
 *
 * @example
 * const root = postcss.parse('{}');
 * const obj = root.first;
 * obj.type       //=> 'obj'
 * obj.toString() //=> 'a{}'
 */
class Literal extends Node {
	constructor (defaults) {
		super(defaults);
		this.type = "literal";
	}
}

module.exports = Literal;
