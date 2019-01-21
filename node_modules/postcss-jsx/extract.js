"use strict";
const {
	parse,
	types,
	traverse,
	loadOptions,
} = require("@babel/core");
const getTemplate = require("./get-template");
const loadSyntax = require("postcss-syntax/load-syntax");

const partSport = {
	// https://github.com/Khan/aphrodite
	aphrodite: [
		"StyleSheet",
		"create",
	],

	// https://github.com/necolas/react-native-web
	"react-native": [
		"StyleSheet",
		"create",
	],
};

const supports = {

	// https://github.com/emotion-js/emotion
	emotion: true,
	"react-emotion": true,
	"preact-emotion": true,

	// https://github.com/threepointone/glamor
	glamor: true,

	// https://github.com/paypal/glamorous
	glamorous: true,

	// https://github.com/js-next/react-style
	"react-style": true,

	// https://github.com/casesandberg/reactcss
	reactcss: true,

	// https://github.com/styled-components/styled-components
	"styled-components": true,

	// https://github.com/rtsao/styletron
	"styletron-react": true,

	// https://github.com/typestyle/typestyle
	typestyle: true,
};

const plugins = [
	"jsx",
	"typescript",
	"objectRestSpread",
	["decorators", { "decoratorsBeforeExport": false }],
	"classProperties",
	"exportExtensions",
	"asyncGenerators",
	"functionBind",
	"functionSent",
	"dynamicImport",
	"optionalCatchBinding",
];

function getSourceType (filename) {
	if (filename && /\.m[tj]sx?$/.test(filename)) {
		return "module";
	}
	try {
		return loadOptions({
			filename,
		}).sourceType;
	} catch (ex) {
		//
	}
}

function getOptions (opts) {
	const filename = opts.from && opts.from.replace(/\?.*$/, "");

	return {
		sourceFilename: filename,
		sourceType: getSourceType(filename) || "unambiguous",
		plugins,
		allowImportExportEverywhere: true,
		allowAwaitOutsideFunction: true,
		allowReturnOutsideFunction: true,
		allowSuperOutsideMethod: true,
	};
}

function literalParser (source, opts, styles) {
	let ast;
	try {
		ast = parse(source, {
			parserOpts: getOptions(opts),
		});
	} catch (ex) {
		// console.error(ex);
		return styles || [];
	}

	const specifiers = new Map();
	const variableDeclarator = new Map();
	let objLiteral = new Set();
	let tplLiteral = new Set();
	const jobs = [];

	function addObjectJob (path) {
		jobs.push(() => {
			addObjectValue(path);
		});
	}

	function addObjectValue (path) {
		if (path.isIdentifier()) {
			const identifier = path.scope.getBindingIdentifier(path.node.name);
			if (identifier) {
				path = variableDeclarator.get(identifier);
				if (path) {
					variableDeclarator.delete(identifier);
					path.forEach(addObjectExpression);
				}
			}
		} else {
			addObjectExpression(path);
		}
	}

	function addObjectExpression (path) {
		if (path.isObjectExpression()) {
			path.get("properties").forEach(prop => {
				if (prop.isSpreadElement()) {
					addObjectValue(prop.get("argument"));
				}
			});
			objLiteral.add(path.node);
			return path;
		}
	}

	function setSpecifier (id, nameSpace) {
		if (types.isIdentifier(id)) {
			specifiers.set(id.name, nameSpace);
			specifiers.set(id, nameSpace);
		} else if (types.isObjectPattern(id)) {
			id.properties.forEach(property => {
				if (types.isObjectProperty(property)) {
					const key = property.key;
					nameSpace = nameSpace.concat(key.name || key.value);
					id = property.value;
				} else {
					id = property.argument;
				}
				setSpecifier(id, nameSpace);
			});
		} else if (types.isArrayPattern(id)) {
			id.elements.forEach((element, i) => {
				setSpecifier(element, nameSpace.concat(String(i)));
			});
		}
	}

	function getNameSpace (path, nameSpace) {
		let node = path.node;
		if (path.isIdentifier() || path.isJSXIdentifier()) {
			node = path.scope.getBindingIdentifier(node.name) || node;
			const specifier = specifiers.get(node) || specifiers.get(node.name);
			if (specifier) {
				nameSpace.unshift.apply(nameSpace, specifier);
			} else {
				nameSpace.unshift(node.name);
			}
		} else {
			if (node.name) {
				getNameSpace(path.get("name"), nameSpace);
			} else if (node.property) {
				getNameSpace(path.get("property"), nameSpace);
			}
			if (node.object) {
				getNameSpace(path.get("object"), nameSpace);
			} else if (node.callee) {
				getNameSpace(path.get("callee"), nameSpace);
			}
		}

		return nameSpace;
	}

	function isStylePath (path) {
		const nameSpace = getNameSpace(path, []).filter(Boolean);
		if (nameSpace.length) {
			if (/^(?:styled|StyleSheet)$/.test(nameSpace[0]) || supports[nameSpace[0]]) {
				return nameSpace;
			}

			const prefix = partSport[nameSpace.shift()];

			if (prefix && nameSpace.length >= prefix.length && prefix.every((name, i) => name === nameSpace[i])) {
				return nameSpace;
			}
		}

		return false;
	}

	const visitor = {
		ImportDeclaration: (path) => {
			const moduleId = path.node.source.value;
			path.node.specifiers.forEach(specifier => {
				const nameSpace = [moduleId];
				if (specifier.imported) {
					nameSpace.push(specifier.imported.name);
				}
				setSpecifier(specifier.local, nameSpace);
			});
		},
		JSXAttribute: (path) => {
			const attrName = path.node.name.name;
			if (attrName === "css") {
				const elePath = path.findParent(p => p.isJSXOpeningElement());
				if (!isStylePath(elePath)) {
					return;
				}
			} else if (attrName !== "style") {
				return;
			}

			addObjectJob(path.get("value.expression"));
		},
		VariableDeclarator: (path) => {
			variableDeclarator.set(path.node.id, path.node.init ? [path.get("init")] : []);
		},
		AssignmentExpression: (path) => {
			if (types.isIdentifier(path.node.left) && types.isObjectExpression(path.node.right)) {
				const identifier = path.scope.getBindingIdentifier(path.node.left.name);
				const variable = variableDeclarator.get(identifier);
				const valuePath = path.get("right");
				if (variable) {
					variable.push(valuePath);
				} else {
					variableDeclarator.set(identifier, [valuePath]);
				}
			}
		},
		CallExpression: (path) => {
			const callee = path.node.callee;
			if (types.isIdentifier(callee, { name: "require" }) && !path.scope.getBindingIdentifier(callee.name)) {
				path.node.arguments.filter(types.isStringLiteral).forEach(arg => {
					const moduleId = arg.value;
					const nameSpace = [moduleId];
					let currPath = path;
					do {
						let id = currPath.parent.id;
						if (!id) {
							id = currPath.parent.left;
							if (id) {
								id = path.scope.getBindingIdentifier(id.name) || id;
							} else {
								if (types.isIdentifier(currPath.parent.property)) {
									nameSpace.push(currPath.parent.property.name);
								}
								currPath = currPath.parentPath;
								continue;
							}
						};
						setSpecifier(id, nameSpace);
						break;
					} while (currPath);
				});
			} else if (isStylePath(path.get("callee"))) {
				path.get("arguments").forEach((arg) => {
					addObjectJob(arg.isFunction() ? arg.get("body") : arg);
				});
			}
		},
		TaggedTemplateExpression: (path) => {
			if (isStylePath(path.get("tag"))) {
				tplLiteral.add(path.node.quasi);
			}
		},
	};

	traverse(ast, visitor);
	jobs.forEach(job => job());

	objLiteral = Array.from(objLiteral).map(endNode => {
		const objectSyntax = require("./object-syntax");
		let startNode = endNode;
		if (startNode.leadingComments && startNode.leadingComments.length) {
			startNode = startNode.leadingComments[0];
		}
		let startIndex = startNode.start;
		const before = source.slice(startNode.start - startNode.loc.start.column, startNode.start);
		if (/^\s+$/.test(before)) {
			startIndex -= before.length;
		}
		return {
			startIndex,
			endIndex: endNode.end,
			skipConvert: true,
			content: source,
			syntax: objectSyntax(endNode),
			lang: "object-literal",
		};
	});

	tplLiteral = Array.from(tplLiteral).filter(node => (
		objLiteral.every(style => (
			node.start > style.endIndex || node.end < style.startIndex
		))
	)).map(node => {
		const quasis = node.quasis;
		const value = getTemplate(node, source);

		if (value.length === 1 && !value[0].trim()) {
			return;
		}

		const style = {
			startIndex: quasis[0].start,
			endIndex: quasis[quasis.length - 1].end,
			content: value.join(""),
		};
		if (value.length > 1) {
			style.syntax = loadSyntax(opts, "postcss-styled");
			style.lang = "template-literal";
		} else {
			style.lang = "css";
		}
		return style;
	}).filter(Boolean);

	return (styles || []).concat(objLiteral).concat(tplLiteral);
};

module.exports = literalParser;
