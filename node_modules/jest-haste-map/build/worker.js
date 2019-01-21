'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getSha1 = exports.worker = undefined;

let worker = (exports.worker = (() => {
  var _ref = _asyncToGenerator(function*(data) {
    if (
      data.hasteImplModulePath &&
      data.hasteImplModulePath !== hasteImplModulePath
    ) {
      if (hasteImpl) {
        throw new Error('jest-haste-map: hasteImplModulePath changed');
      }
      hasteImplModulePath = data.hasteImplModulePath;
      // $FlowFixMe: dynamic require
      hasteImpl = require(hasteImplModulePath);
    }

    let content;
    let dependencies;
    let id;
    let module;
    let sha1;

    const computeDependencies = data.computeDependencies,
      computeSha1 = data.computeSha1,
      filePath = data.filePath;

    const getContent = function() {
      if (content === undefined) {
        content = (_gracefulFs || _load_gracefulFs()).default.readFileSync(
          filePath,
          'utf8'
        );
      }

      return content;
    };

    if (filePath.endsWith(PACKAGE_JSON)) {
      // Process a package.json that is returned as a PACKAGE type with its name.
      try {
        const fileData = JSON.parse(getContent());

        if (fileData.name) {
          id = fileData.name;
          module = [
            filePath,
            (_constants || _load_constants()).default.PACKAGE
          ];
        }
      } catch (err) {
        throw new Error(`Cannot parse ${filePath} as JSON: ${err.message}`);
      }
    } else if (
      !(_blacklist || _load_blacklist()).default.has(
        filePath.substr(filePath.lastIndexOf('.'))
      )
    ) {
      // Process a random file that is returned as a MODULE.
      if (hasteImpl) {
        id = hasteImpl.getHasteName(filePath);
      } else {
        const doc = (_jestDocblock || _load_jestDocblock()).parse(
          (_jestDocblock || _load_jestDocblock()).extract(getContent())
        );
        id = [].concat(doc.providesModule || doc.provides)[0];
      }

      if (computeDependencies) {
        dependencies = (0,
        (_extract_requires || _load_extract_requires()).default)(getContent());
      }

      if (id) {
        module = [filePath, (_constants || _load_constants()).default.MODULE];
      }
    }

    // If a SHA-1 is requested on update, compute it.
    if (computeSha1) {
      sha1 = sha1hex(
        getContent() ||
          (_gracefulFs || _load_gracefulFs()).default.readFileSync(filePath)
      );
    }

    return {dependencies: dependencies, id: id, module: module, sha1: sha1};
  });

  return function worker(_x) {
    return _ref.apply(this, arguments);
  };
})());

let getSha1 = (exports.getSha1 = (() => {
  var _ref2 = _asyncToGenerator(function*(data) {
    const sha1 = data.computeSha1
      ? sha1hex(
          (_gracefulFs || _load_gracefulFs()).default.readFileSync(
            data.filePath
          )
        )
      : null;

    return {
      dependencies: undefined,
      id: undefined,
      module: undefined,
      sha1: sha1
    };
  });

  return function getSha1(_x2) {
    return _ref2.apply(this, arguments);
  };
})());

var _crypto;

function _load_crypto() {
  return (_crypto = _interopRequireDefault(require('crypto')));
}

var _path;

function _load_path() {
  return (_path = _interopRequireDefault(require('path')));
}

var _jestDocblock;

function _load_jestDocblock() {
  return (_jestDocblock = _interopRequireWildcard(require('jest-docblock')));
}

var _gracefulFs;

function _load_gracefulFs() {
  return (_gracefulFs = _interopRequireDefault(require('graceful-fs')));
}

var _blacklist;

function _load_blacklist() {
  return (_blacklist = _interopRequireDefault(require('./blacklist')));
}

var _constants;

function _load_constants() {
  return (_constants = _interopRequireDefault(require('./constants')));
}

var _extract_requires;

function _load_extract_requires() {
  return (_extract_requires = _interopRequireDefault(
    require('./lib/extract_requires')
  ));
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            }
          );
        }
      }
      return step('next');
    });
  };
}
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const PACKAGE_JSON = (_path || _load_path()).default.sep + 'package.json';

let hasteImpl = null;
let hasteImplModulePath = null;

function sha1hex(content) {
  return (_crypto || _load_crypto()).default
    .createHash('sha1')
    .update(content)
    .digest('hex');
}
