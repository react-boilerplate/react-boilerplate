"use strict";
function getTemplate (node, source) {
	const result = [];
	node.quasis.forEach((node, i) => {
		result[i << 1] = node.value.cooked;
	});
	const quasis = node.quasis;
	node.expressions.forEach((node, i) => {
		const index = (i << 1) + 1;
		result[index] = source.slice(quasis[i].end, quasis[i + 1].start);
	});

	return result;
}
module.exports = getTemplate;
