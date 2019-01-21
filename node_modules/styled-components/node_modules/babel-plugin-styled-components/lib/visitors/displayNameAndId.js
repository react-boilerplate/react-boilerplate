"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _options = require("../utils/options");

var _getName = _interopRequireDefault(require("../utils/getName"));

var _prefixDigit = _interopRequireDefault(require("../utils/prefixDigit"));

var _hash = _interopRequireDefault(require("../utils/hash"));

var _detectors = require("../utils/detectors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addConfig = function addConfig(t) {
  return function (path, displayName, componentId) {
    if (!displayName && !componentId) {
      return;
    }

    var withConfigProps = [];

    if (displayName) {
      withConfigProps.push(t.objectProperty(t.identifier('displayName'), t.stringLiteral(displayName)));
    }

    if (componentId) {
      withConfigProps.push(t.objectProperty(t.identifier('componentId'), t.stringLiteral(componentId)));
    }

    if (path.node.tag) {
      // Replace x`...` with x.withConfig({ })`...`
      path.node.tag = t.callExpression(t.memberExpression(path.node.tag, t.identifier('withConfig')), [t.objectExpression(withConfigProps)]);
    } else {
      path.replaceWith(t.callExpression(t.callExpression(t.memberExpression(path.node.callee, t.identifier('withConfig')), [t.objectExpression(withConfigProps)]), path.node.arguments));
    }
  };
};

var getBlockName = function getBlockName(file) {
  var name = _path.default.basename(file.opts.filename, _path.default.extname(file.opts.filename));

  return name !== 'index' ? name : _path.default.basename(_path.default.dirname(file.opts.filename));
};

var getDisplayName = function getDisplayName(t) {
  return function (path, state) {
    var file = state.file;
    var componentName = (0, _getName.default)(t)(path);

    if (file) {
      var blockName = getBlockName(file);

      if (blockName === componentName) {
        return componentName;
      }

      return componentName ? `${(0, _prefixDigit.default)(blockName)}__${componentName}` : (0, _prefixDigit.default)(blockName);
    } else {
      return componentName;
    }
  };
};

var findModuleRoot = function findModuleRoot(filename) {
  if (!filename) {
    return null;
  }

  var dir = _path.default.dirname(filename);

  if (_fs.default.existsSync(_path.default.join(dir, 'package.json'))) {
    return dir;
  } else if (dir !== filename) {
    return findModuleRoot(dir);
  } else {
    return null;
  }
};

var FILE_HASH = 'styled-components-file-hash';
var COMPONENT_POSITION = 'styled-components-component-position';
var separatorRegExp = new RegExp(`\\${_path.default.sep}`, 'g');

var getFileHash = function getFileHash(state) {
  var file = state.file; // hash calculation is costly due to fs operations, so we'll cache it per file.

  if (file.get(FILE_HASH)) {
    return file.get(FILE_HASH);
  }

  var filename = file.opts.filename; // find module root directory

  var moduleRoot = findModuleRoot(filename);

  var filePath = moduleRoot && _path.default.relative(moduleRoot, filename).replace(separatorRegExp, '/');

  var moduleName = moduleRoot && JSON.parse(_fs.default.readFileSync(_path.default.join(moduleRoot, 'package.json'))).name;
  var code = file.code;
  var stuffToHash = [moduleName];

  if (filePath) {
    stuffToHash.push(filePath);
  } else {
    stuffToHash.push(code);
  }

  var fileHash = (0, _hash.default)(stuffToHash.join(''));
  file.set(FILE_HASH, fileHash);
  return fileHash;
};

var getNextId = function getNextId(state) {
  var id = state.file.get(COMPONENT_POSITION) || 0;
  state.file.set(COMPONENT_POSITION, id + 1);
  return id;
};

var getComponentId = function getComponentId(state) {
  // Prefix the identifier with a character because CSS classes cannot start with a number
  return `${(0, _prefixDigit.default)(getFileHash(state))}-${getNextId(state)}`;
};

var _default = function _default(t) {
  return function (path, state) {
    if (path.node.tag ? (0, _detectors.isStyled)(t)(path.node.tag, state) : (0, _detectors.isStyled)(t)(path.node.callee, state) && path.node.callee.property && path.node.callee.property.name !== 'withConfig') {
      var displayName = (0, _options.useDisplayName)(state) && getDisplayName(t)(path, (0, _options.useFileName)(state) && state);
      addConfig(t)(path, displayName && displayName.replace(/[^_a-zA-Z0-9-]/g, ''), (0, _options.useSSR)(state) && getComponentId(state));
    }
  };
};

exports.default = _default;