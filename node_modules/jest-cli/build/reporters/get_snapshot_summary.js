'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _chalk;

function _load_chalk() {
  return (_chalk = _interopRequireDefault(require('chalk')));
}

var _utils;

function _load_utils() {
  return (_utils = require('./utils'));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const ARROW = ' \u203A ';
const DOWN_ARROW = ' \u21B3 ';
const DOT = ' \u2022 ';
const FAIL_COLOR = (_chalk || _load_chalk()).default.bold.red;
const OBSOLETE_COLOR = (_chalk || _load_chalk()).default.bold.yellow;
const SNAPSHOT_ADDED = (_chalk || _load_chalk()).default.bold.green;
const SNAPSHOT_NOTE = (_chalk || _load_chalk()).default.dim;
const SNAPSHOT_REMOVED = (_chalk || _load_chalk()).default.bold.green;
const SNAPSHOT_SUMMARY = (_chalk || _load_chalk()).default.bold;
const SNAPSHOT_UPDATED = (_chalk || _load_chalk()).default.bold.green;

exports.default = (snapshots, globalConfig, updateCommand) => {
  const summary = [];
  summary.push(SNAPSHOT_SUMMARY('Snapshot Summary'));
  if (snapshots.added) {
    summary.push(
      SNAPSHOT_ADDED(
        ARROW +
          (0, (_utils || _load_utils()).pluralize)(
            'snapshot',
            snapshots.added
          ) +
          ' written '
      ) +
        `from ${(0, (_utils || _load_utils()).pluralize)(
          'test suite',
          snapshots.filesAdded
        )}.`
    );
  }

  if (snapshots.unmatched) {
    summary.push(
      FAIL_COLOR(
        `${ARROW}${(0, (_utils || _load_utils()).pluralize)(
          'snapshot',
          snapshots.unmatched
        )} failed`
      ) +
        ` from ${(0, (_utils || _load_utils()).pluralize)(
          'test suite',
          snapshots.filesUnmatched
        )}. ` +
        SNAPSHOT_NOTE(
          'Inspect your code changes or ' + updateCommand + ' to update them.'
        )
    );
  }

  if (snapshots.updated) {
    summary.push(
      SNAPSHOT_UPDATED(
        ARROW +
          (0, (_utils || _load_utils()).pluralize)(
            'snapshot',
            snapshots.updated
          ) +
          ' updated '
      ) +
        `from ${(0, (_utils || _load_utils()).pluralize)(
          'test suite',
          snapshots.filesUpdated
        )}.`
    );
  }

  if (snapshots.filesRemoved) {
    if (snapshots.didUpdate) {
      summary.push(
        SNAPSHOT_REMOVED(
          `${ARROW}${(0, (_utils || _load_utils()).pluralize)(
            'snapshot file',
            snapshots.filesRemoved
          )} removed `
        ) +
          `from ${(0, (_utils || _load_utils()).pluralize)(
            'test suite',
            snapshots.filesRemoved
          )}.`
      );
    } else {
      summary.push(
        OBSOLETE_COLOR(
          `${ARROW}${(0, (_utils || _load_utils()).pluralize)(
            'snapshot file',
            snapshots.filesRemoved
          )} obsolete `
        ) +
          `from ${(0, (_utils || _load_utils()).pluralize)(
            'test suite',
            snapshots.filesRemoved
          )}. ` +
          SNAPSHOT_NOTE(
            `To remove ${
              snapshots.filesRemoved === 1 ? 'it' : 'them all'
            }, ${updateCommand}.`
          )
      );
    }
  }

  if (snapshots.unchecked) {
    if (snapshots.didUpdate) {
      summary.push(
        SNAPSHOT_REMOVED(
          `${ARROW}${(0, (_utils || _load_utils()).pluralize)(
            'snapshot',
            snapshots.unchecked
          )} removed `
        ) +
          `from ${(0, (_utils || _load_utils()).pluralize)(
            'test suite',
            snapshots.uncheckedKeysByFile.length
          )}.`
      );
    } else {
      summary.push(
        OBSOLETE_COLOR(
          `${ARROW}${(0, (_utils || _load_utils()).pluralize)(
            'snapshot',
            snapshots.unchecked
          )} obsolete `
        ) +
          `from ${(0, (_utils || _load_utils()).pluralize)(
            'test suite',
            snapshots.uncheckedKeysByFile.length
          )}. ` +
          SNAPSHOT_NOTE(
            `To remove ${
              snapshots.unchecked === 1 ? 'it' : 'them all'
            }, ${updateCommand}.`
          )
      );
    }

    snapshots.uncheckedKeysByFile.forEach(uncheckedFile => {
      summary.push(
        `  ${DOWN_ARROW}${(0, (_utils || _load_utils()).formatTestPath)(
          globalConfig,
          uncheckedFile.filePath
        )}`
      );

      uncheckedFile.keys.forEach(key => {
        summary.push(`      ${DOT}${key}`);
      });
    });
  }

  return summary;
};
