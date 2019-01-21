'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.saveInlineSnapshots = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _babelTypes = require('babel-types');

var _utils = require('./utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

const saveInlineSnapshots = (exports.saveInlineSnapshots = (
  snapshots,
  prettier,
  babelTraverse
) => {
  if (!prettier) {
    throw new Error(
      `Jest: Inline Snapshots requires Prettier.\n` +
        `Please ensure "prettier" is installed in your project.`
    );
  }

  // Custom parser API was added in 1.5.0
  if (_semver2.default.lt(prettier.version, '1.5.0')) {
    throw new Error(
      `Jest: Inline Snapshots require prettier>=1.5.0.\n` +
        `Please upgrade "prettier".`
    );
  }

  const snapshotsByFile = groupSnapshotsByFile(snapshots);

  for (const sourceFilePath of Object.keys(snapshotsByFile)) {
    saveSnapshotsForFile(
      snapshotsByFile[sourceFilePath],
      sourceFilePath,
      prettier,
      babelTraverse
    );
  }
});
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const saveSnapshotsForFile = (
  snapshots,
  sourceFilePath,
  prettier,
  babelTraverse
) => {
  const sourceFile = _fs2.default.readFileSync(sourceFilePath, 'utf8');

  // Resolve project configuration.
  // For older versions of Prettier, do not load configuration.
  const config = prettier.resolveConfig
    ? prettier.resolveConfig.sync(sourceFilePath, {
        editorconfig: true
      })
    : null;

  // Detect the parser for the test file.
  // For older versions of Prettier, fallback to a simple parser detection.
  const inferredParser = prettier.getFileInfo
    ? prettier.getFileInfo.sync(sourceFilePath).inferredParser
    : (config && config.parser) || simpleDetectParser(sourceFilePath);

  // Format the source code using the custom parser API.
  const newSourceFile = prettier.format(
    sourceFile,
    Object.assign({}, config, {
      filepath: sourceFilePath,
      parser: createParser(snapshots, inferredParser, babelTraverse)
    })
  );

  if (newSourceFile !== sourceFile) {
    _fs2.default.writeFileSync(sourceFilePath, newSourceFile);
  }
};

const groupSnapshotsBy = createKey => snapshots =>
  snapshots.reduce((object, inlineSnapshot) => {
    const key = createKey(inlineSnapshot);
    return Object.assign(object, {
      [key]: (object[key] || []).concat(inlineSnapshot)
    });
  }, {});

const groupSnapshotsByFrame = groupSnapshotsBy(_ref => {
  var _ref$frame = _ref.frame;
  let line = _ref$frame.line,
    column = _ref$frame.column;
  return `${line}:${column - 1}`;
});
const groupSnapshotsByFile = groupSnapshotsBy(_ref2 => {
  let file = _ref2.frame.file;
  return file;
});

const createParser = (snapshots, inferredParser, babelTraverse) => (
  text,
  parsers,
  options
) => {
  // Workaround for https://github.com/prettier/prettier/issues/3150
  options.parser = inferredParser;

  const groupedSnapshots = groupSnapshotsByFrame(snapshots);
  const remainingSnapshots = new Set(
    snapshots.map(_ref3 => {
      let snapshot = _ref3.snapshot;
      return snapshot;
    })
  );
  let ast = parsers[inferredParser](text);

  // Flow uses a 'Program' parent node, babel expects a 'File'.
  if (ast.type !== 'File') {
    ast = (0, _babelTypes.file)(ast, ast.comments, ast.tokens);
    delete ast.program.comments;
  }

  babelTraverse(ast, {
    CallExpression: function(_ref4) {
      var _ref4$node = _ref4.node;
      let args = _ref4$node.arguments,
        callee = _ref4$node.callee;

      if (
        callee.type !== 'MemberExpression' ||
        callee.property.type !== 'Identifier'
      ) {
        return;
      }
      var _callee$property$loc$ = callee.property.loc.start;
      const line = _callee$property$loc$.line,
        column = _callee$property$loc$.column;

      const snapshotsForFrame = groupedSnapshots[`${line}:${column}`];
      if (!snapshotsForFrame) {
        return;
      }
      if (snapshotsForFrame.length > 1) {
        throw new Error(
          'Jest: Multiple inline snapshots for the same call are not supported.'
        );
      }
      const snapshotIndex = args.findIndex(_ref5 => {
        let type = _ref5.type;
        return type === 'TemplateLiteral';
      });
      const values = snapshotsForFrame.map(_ref6 => {
        let snapshot = _ref6.snapshot;

        remainingSnapshots.delete(snapshot);

        return (0, _babelTypes.templateLiteral)(
          [
            (0, _babelTypes.templateElement)({
              raw: (0, _utils.escapeBacktickString)(snapshot)
            })
          ],
          []
        );
      });
      const replacementNode = values[0];

      if (snapshotIndex > -1) {
        args[snapshotIndex] = replacementNode;
      } else {
        args.push(replacementNode);
      }
    }
  });

  if (remainingSnapshots.size) {
    throw new Error(`Jest: Couldn't locate all inline snapshots.`);
  }

  return ast;
};

const simpleDetectParser = filePath => {
  const extname = _path2.default.extname(filePath);
  if (/tsx?$/.test(extname)) {
    return 'typescript';
  }
  return 'babylon';
};
