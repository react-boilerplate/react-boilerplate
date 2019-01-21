'use strict';
module.exports = function (flag) {
	var supported = true;

	try {
		new RegExp('', flag);
	} catch (err) {
		supported = false;
	}

	return supported;
};
