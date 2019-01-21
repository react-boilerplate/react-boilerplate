'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.throwStringifiedError = exports.getRelativeToBasePath = exports.makeDestPath = undefined;
exports.getTemplate = getTemplate;
exports.getRenderedTemplate = getRenderedTemplate;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsPromiseProxy = require('../fs-promise-proxy');

var fspp = _interopRequireWildcard(_fsPromiseProxy);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getFullData = (data, cfg) => Object.assign({}, cfg.data, data);
const makeDestPath = exports.makeDestPath = (data, cfg, plop) => _path2.default.resolve(plop.getDestBasePath(), plop.renderString(cfg.path || '', getFullData(data, cfg)));

function* getTemplate(data, cfg, plop) {
	const makeTmplPath = p => _path2.default.resolve(plop.getPlopfilePath(), p);

	let { template } = cfg;

	if (cfg.templateFile) {
		const templateFile = plop.renderString(cfg.templateFile, getFullData(data, cfg));
		template = yield fspp.readFile(makeTmplPath(templateFile));
	}
	if (template == null) {
		template = '';
	}

	return template;
}

function* getRenderedTemplate(data, cfg, plop) {
	const template = yield getTemplate(data, cfg, plop);

	return plop.renderString(template, getFullData(data, cfg));
}

const getRelativeToBasePath = exports.getRelativeToBasePath = (filePath, plop) => filePath.replace(_path2.default.resolve(plop.getDestBasePath()), '');

const throwStringifiedError = exports.throwStringifiedError = err => {
	if (typeof err === 'string') {
		throw err;
	} else {
		throw err.message || JSON.stringify(err);
	}
};