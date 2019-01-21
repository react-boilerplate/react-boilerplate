'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = addFile;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _commonActionUtils = require('./_common-action-utils');

var _isbinaryfile = require('isbinaryfile');

var _isbinaryfile2 = _interopRequireDefault(_isbinaryfile);

var _fsPromiseProxy = require('../fs-promise-proxy');

var fspp = _interopRequireWildcard(_fsPromiseProxy);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function* addFile(data, cfg, plop) {
	const fileDestPath = (0, _commonActionUtils.makeDestPath)(data, cfg, plop);
	const { force, skipIfExists = false } = cfg;
	try {
		// check path
		let destExists = yield fspp.fileExists(fileDestPath);

		// if we are forcing and the file already exists, delete the file
		if (force === true && destExists) {
			yield (0, _del2.default)([fileDestPath]);
			destExists = false;
		}

		// we can't create files where one already exists
		if (destExists) {
			if (skipIfExists) {
				return `[SKIPPED] ${fileDestPath} (exists)`;
			}
			throw `File already exists\n -> ${fileDestPath}`;
		} else {
			yield fspp.makeDir(_path2.default.dirname(fileDestPath));

			const absTemplatePath = cfg.templateFile && _path2.default.resolve(plop.getPlopfilePath(), cfg.templateFile) || null;

			if (absTemplatePath != null && _isbinaryfile2.default.sync(absTemplatePath)) {
				const rawTemplate = yield fspp.readFileRaw(cfg.templateFile);
				yield fspp.writeFileRaw(fileDestPath, rawTemplate);
			} else {
				const renderedTemplate = yield (0, _commonActionUtils.getRenderedTemplate)(data, cfg, plop);
				yield fspp.writeFile(fileDestPath, renderedTemplate);
			}
		}

		// return the added file path (relative to the destination path)
		return (0, _commonActionUtils.getRelativeToBasePath)(fileDestPath, plop);
	} catch (err) {
		(0, _commonActionUtils.throwStringifiedError)(err);
	}
}