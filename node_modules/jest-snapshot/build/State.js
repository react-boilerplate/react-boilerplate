'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jestMessageUtil = require('jest-message-util');

var _utils = require('./utils');

var _inline_snapshots = require('./inline_snapshots');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

class SnapshotState {
  constructor(testPath, options) {
    this._snapshotPath =
      options.snapshotPath || (0, _utils.getSnapshotPath)(testPath);

    var _getSnapshotData = (0, _utils.getSnapshotData)(
      this._snapshotPath,
      options.updateSnapshot
    );

    const data = _getSnapshotData.data,
      dirty = _getSnapshotData.dirty;

    this._snapshotData = data;
    this._dirty = dirty;
    this._getBabelTraverse = options.getBabelTraverse;
    this._getPrettier = options.getPrettier;
    this._inlineSnapshots = [];
    this._uncheckedKeys = new Set(Object.keys(this._snapshotData));
    this._counters = new Map();
    this._index = 0;
    this.expand = options.expand || false;
    this.added = 0;
    this.matched = 0;
    this.unmatched = 0;
    this._updateSnapshot = options.updateSnapshot;
    this.updated = 0;
  }

  markSnapshotsAsCheckedForTest(testName) {
    this._uncheckedKeys.forEach(uncheckedKey => {
      if ((0, _utils.keyToTestName)(uncheckedKey) === testName) {
        this._uncheckedKeys.delete(uncheckedKey);
      }
    });
  }

  _addSnapshot(key, receivedSerialized, options) {
    this._dirty = true;
    if (options.isInline) {
      const error = options.error || new Error();
      const lines = (0, _jestMessageUtil.getStackTraceLines)(error.stack);
      const frame = (0, _jestMessageUtil.getTopFrame)(lines);
      if (!frame) {
        throw new Error(
          "Jest: Couldn't infer stack frame for inline snapshot."
        );
      }
      this._inlineSnapshots.push({
        frame: frame,
        snapshot: receivedSerialized
      });
    } else {
      this._snapshotData[key] = receivedSerialized;
    }
  }

  save() {
    const hasExternalSnapshots = Object.keys(this._snapshotData).length;
    const hasInlineSnapshots = this._inlineSnapshots.length;
    const isEmpty = !hasExternalSnapshots && !hasInlineSnapshots;

    const status = {
      deleted: false,
      saved: false
    };

    if ((this._dirty || this._uncheckedKeys.size) && !isEmpty) {
      if (hasExternalSnapshots) {
        (0, _utils.saveSnapshotFile)(this._snapshotData, this._snapshotPath);
      }
      if (hasInlineSnapshots) {
        const prettier = this._getPrettier(); // Load lazily
        const babelTraverse = this._getBabelTraverse(); // Load lazily
        (0, _inline_snapshots.saveInlineSnapshots)(
          this._inlineSnapshots,
          prettier,
          babelTraverse
        );
      }
      status.saved = true;
    } else if (
      !hasExternalSnapshots &&
      _fs2.default.existsSync(this._snapshotPath)
    ) {
      if (this._updateSnapshot === 'all') {
        _fs2.default.unlinkSync(this._snapshotPath);
      }
      status.deleted = true;
    }

    return status;
  }

  getUncheckedCount() {
    return this._uncheckedKeys.size || 0;
  }

  getUncheckedKeys() {
    return Array.from(this._uncheckedKeys);
  }

  removeUncheckedKeys() {
    if (this._updateSnapshot === 'all' && this._uncheckedKeys.size) {
      this._dirty = true;
      this._uncheckedKeys.forEach(key => delete this._snapshotData[key]);
      this._uncheckedKeys.clear();
    }
  }

  match(_ref) {
    let testName = _ref.testName,
      received = _ref.received,
      key = _ref.key,
      inlineSnapshot = _ref.inlineSnapshot,
      error = _ref.error;

    this._counters.set(testName, (this._counters.get(testName) || 0) + 1);
    const count = Number(this._counters.get(testName));
    const isInline = inlineSnapshot !== undefined;

    if (!key) {
      key = (0, _utils.testNameToKey)(testName, count);
    }

    // Do not mark the snapshot as "checked" if the snapshot is inline and
    // there's an external snapshot. This way the external snapshot can be
    // removed with `--updateSnapshot`.
    if (!(isInline && this._snapshotData[key])) {
      this._uncheckedKeys.delete(key);
    }

    const receivedSerialized = (0, _utils.serialize)(received);
    const expected = isInline ? inlineSnapshot : this._snapshotData[key];
    const pass = expected === receivedSerialized;
    const hasSnapshot = isInline
      ? inlineSnapshot !== ''
      : this._snapshotData[key] !== undefined;
    const snapshotIsPersisted =
      isInline || _fs2.default.existsSync(this._snapshotPath);

    if (pass && !isInline) {
      // Executing a snapshot file as JavaScript and writing the strings back
      // when other snapshots have changed loses the proper escaping for some
      // characters. Since we check every snapshot in every test, use the newly
      // generated formatted string.
      // Note that this is only relevant when a snapshot is added and the dirty
      // flag is set.
      this._snapshotData[key] = receivedSerialized;
    }

    // These are the conditions on when to write snapshots:
    //  * There's no snapshot file in a non-CI environment.
    //  * There is a snapshot file and we decided to update the snapshot.
    //  * There is a snapshot file, but it doesn't have this snaphsot.
    // These are the conditions on when not to write snapshots:
    //  * The update flag is set to 'none'.
    //  * There's no snapshot file or a file without this snapshot on a CI environment.
    if (
      (hasSnapshot && this._updateSnapshot === 'all') ||
      ((!hasSnapshot || !snapshotIsPersisted) &&
        (this._updateSnapshot === 'new' || this._updateSnapshot === 'all'))
    ) {
      if (this._updateSnapshot === 'all') {
        if (!pass) {
          if (hasSnapshot) {
            this.updated++;
          } else {
            this.added++;
          }
          this._addSnapshot(key, receivedSerialized, {
            error: error,
            isInline: isInline
          });
        } else {
          this.matched++;
        }
      } else {
        this._addSnapshot(key, receivedSerialized, {
          error: error,
          isInline: isInline
        });
        this.added++;
      }

      return {
        actual: '',
        count: count,
        expected: '',
        key: key,
        pass: true
      };
    } else {
      if (!pass) {
        this.unmatched++;
        return {
          actual: (0, _utils.unescape)(receivedSerialized),
          count: count,
          expected: expected ? (0, _utils.unescape)(expected) : null,
          key: key,
          pass: false
        };
      } else {
        this.matched++;
        return {
          actual: '',
          count: count,
          expected: '',
          key: key,
          pass: true
        };
      }
    }
  }

  fail(testName, received, key) {
    this._counters.set(testName, (this._counters.get(testName) || 0) + 1);
    const count = Number(this._counters.get(testName));

    if (!key) {
      key = (0, _utils.testNameToKey)(testName, count);
    }

    this._uncheckedKeys.delete(key);
    this.unmatched++;
    return key;
  }
}
exports.default = SnapshotState;
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
