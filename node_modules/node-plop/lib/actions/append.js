'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _fsPromiseProxy = require('../fs-promise-proxy');

var fspp = _interopRequireWildcard(_fsPromiseProxy);

var _commonActionUtils = require('./_common-action-utils');

var _commonActionInterfaceCheck = require('./_common-action-interface-check');

var _commonActionInterfaceCheck2 = _interopRequireDefault(_commonActionInterfaceCheck);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const doAppend = function* (data, cfg, plop, fileData) {
	const stringToAppend = yield (0, _commonActionUtils.getRenderedTemplate)(data, cfg, plop);
	// if the appended string should be unique (default),
	// remove any occurence of it (but only if pattern would match)

	if (cfg.unique !== false && new RegExp(cfg.pattern).test(fileData)) {
		// only remove after "pattern", so that we remove not too much accidentally
		const parts = fileData.split(cfg.pattern);
		const lastPart = parts[parts.length - 1];
		const lastPartWithoutDuplicates = lastPart.replace(new RegExp(stringToAppend, 'g'), '');
		fileData = fileData.replace(lastPart, lastPartWithoutDuplicates);
	}

	const { separator = '\n' } = cfg;

	// add the appended string to the end of the "fileData" if "pattern"
	// was not provided, i.e. null or false
	if (!cfg.pattern) {
		// make sure to add a "separator" if "fileData" is not empty
		if (fileData.length > 0) {
			fileData += separator;
		}
		return fileData + stringToAppend;
	}

	return fileData.replace(cfg.pattern, '$&' + separator + stringToAppend);
};

exports.default = _co2.default.wrap(function* (data, cfg, plop) {
	const interfaceTestResult = (0, _commonActionInterfaceCheck2.default)(cfg);
	if (interfaceTestResult !== true) {
		throw interfaceTestResult;
	}
	const fileDestPath = (0, _commonActionUtils.makeDestPath)(data, cfg, plop);
	try {
		// check path
		const pathExists = yield fspp.fileExists(fileDestPath);
		if (!pathExists) {
			throw 'File does not exists';
		} else {
			let fileData = yield fspp.readFile(fileDestPath);
			fileData = yield doAppend(data, cfg, plop, fileData);
			yield fspp.writeFile(fileDestPath, fileData);
		}
		return (0, _commonActionUtils.getRelativeToBasePath)(fileDestPath, plop);
	} catch (err) {
		(0, _commonActionUtils.throwStringifiedError)(err);
	}
});