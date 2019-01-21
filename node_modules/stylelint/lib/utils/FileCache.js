/* @flow */
"use strict";

const debug = require("debug")("stylelint:file-cache");
const fileEntryCache = require("file-entry-cache");
const getCacheFile = require("./getCacheFile");
const path = require("path");

const DEFAULT_CACHE_LOCATION = "./.stylelintcache";
const DEFAULT_HASH = "";

function FileCache(cacheLocation /*: ?string */, hashOfConfig /*: ?string */) {
  const cacheFile = path.resolve(
    getCacheFile(cacheLocation || DEFAULT_CACHE_LOCATION, process.cwd())
  );
  debug(`Cache file is created at ${cacheFile}`);
  this._fileCache = fileEntryCache.create(cacheFile);
  this._hashOfConfig = hashOfConfig || DEFAULT_HASH;
}

FileCache.prototype.hasFileChanged = function(absoluteFilepath) {
  // Get file descriptor compares current metadata against cached
  // one and stores the result to "changed" prop.w
  const descriptor = this._fileCache.getFileDescriptor(absoluteFilepath);
  const meta = descriptor.meta || {};
  const changed =
    descriptor.changed || meta.hashOfConfig !== this._hashOfConfig;
  if (!changed) {
    debug(`Skip linting ${absoluteFilepath}. File hasn't changed.`);
  }
  // Mutate file descriptor object and store config hash to each file.
  // Running lint with different config should invalidate the cache.
  if (meta.hashOfConfig !== this._hashOfConfig) {
    meta.hashOfConfig = this._hashOfConfig;
  }
  return changed;
};

FileCache.prototype.reconcile = function() {
  this._fileCache.reconcile();
};

FileCache.prototype.destroy = function() {
  this._fileCache.destroy();
};

FileCache.prototype.removeEntry = function(absoluteFilepath) {
  this._fileCache.removeEntry(absoluteFilepath);
};

module.exports = FileCache;
