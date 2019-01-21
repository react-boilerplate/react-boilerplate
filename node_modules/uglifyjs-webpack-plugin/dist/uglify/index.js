'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _cacache = require('cacache');

var _cacache2 = _interopRequireDefault(_cacache);

var _findCacheDir = require('find-cache-dir');

var _findCacheDir2 = _interopRequireDefault(_findCacheDir);

var _workerFarm = require('worker-farm');

var _workerFarm2 = _interopRequireDefault(_workerFarm);

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _minify = require('./minify');

var _minify2 = _interopRequireDefault(_minify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var workerFile = require.resolve('./worker');

try {
  // run test
  workerFile = require.resolve('../../dist/uglify/worker');
} catch (e) {} // eslint-disable-line no-empty

var _class = function () {
  function _class() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, _class);

    var cache = options.cache,
        parallel = options.parallel;

    this.cacheDir = cache === true ? (0, _findCacheDir2.default)({ name: 'uglifyjs-webpack-plugin' }) : cache;
    this.maxConcurrentWorkers = parallel === true ? _os2.default.cpus().length - 1 : Math.min(Number(parallel) || 0, _os2.default.cpus().length - 1);
  }

  _createClass(_class, [{
    key: 'runTasks',
    value: function runTasks(tasks, callback) {
      var _this = this;

      if (!tasks.length) {
        callback(null, []);
        return;
      }

      if (this.maxConcurrentWorkers > 0) {
        var workerOptions = process.platform === 'win32' ? { maxConcurrentWorkers: this.maxConcurrentWorkers, maxConcurrentCallsPerWorker: 1 } : { maxConcurrentWorkers: this.maxConcurrentWorkers };
        this.workers = (0, _workerFarm2.default)(workerOptions, workerFile);
        this.boundWorkers = function (options, cb) {
          return _this.workers((0, _serializeJavascript2.default)(options), cb);
        };
      } else {
        this.boundWorkers = function (options, cb) {
          try {
            cb(null, (0, _minify2.default)(options));
          } catch (errors) {
            cb(errors);
          }
        };
      }

      var toRun = tasks.length;
      var results = [];
      var step = function step(index, data) {
        toRun -= 1;
        results[index] = data;

        if (!toRun) {
          callback(null, results);
        }
      };

      tasks.forEach(function (task, index) {
        var enqueue = function enqueue() {
          _this.boundWorkers(task, function (error, data) {
            var result = error ? { error } : data;
            var done = function done() {
              return step(index, result);
            };

            if (_this.cacheDir && !result.error) {
              _cacache2.default.put(_this.cacheDir, task.cacheKey, JSON.stringify(data)).then(done, done);
            } else {
              done();
            }
          });
        };

        if (_this.cacheDir) {
          _cacache2.default.get(_this.cacheDir, task.cacheKey).then(function (_ref) {
            var data = _ref.data;
            return step(index, JSON.parse(data));
          }, enqueue);
        } else {
          enqueue();
        }
      });
    }
  }, {
    key: 'exit',
    value: function exit() {
      if (this.workers) {
        _workerFarm2.default.end(this.workers);
      }
    }
  }]);

  return _class;
}();

exports.default = _class;