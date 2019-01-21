'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lazyResult = require('./lazy-result');

var _lazyResult2 = _interopRequireDefault(_lazyResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Contains plugins to process CSS. Create one `Processor` instance,
 * initialize its plugins, and then use that instance on numerous CSS files.
 *
 * @example
 * const processor = postcss([autoprefixer, precss]);
 * processor.process(css1).then(result => console.log(result.css));
 * processor.process(css2).then(result => console.log(result.css));
 */
var Processor = function () {

  /**
   * @param {Array.<Plugin|pluginFunction>|Processor} plugins - PostCSS
   *        plugins. See {@link Processor#use} for plugin format.
   */
  function Processor() {
    var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Processor);

    /**
     * @member {string} - Current PostCSS version.
     *
     * @example
     * if ( result.processor.version.split('.')[0] !== '5' ) {
     *   throw new Error('This plugin works only with PostCSS 5');
     * }
     */
    this.version = '5.2.18';
    /**
     * @member {pluginFunction[]} - Plugins added to this processor.
     *
     * @example
     * const processor = postcss([autoprefixer, precss]);
     * processor.plugins.length //=> 2
     */
    this.plugins = this.normalize(plugins);
  }

  /**
   * Adds a plugin to be used as a CSS processor.
   *
   * PostCSS plugin can be in 4 formats:
   * * A plugin created by {@link postcss.plugin} method.
   * * A function. PostCSS will pass the function a @{link Root}
   *   as the first argument and current {@link Result} instance
   *   as the second.
   * * An object with a `postcss` method. PostCSS will use that method
   *   as described in #2.
   * * Another {@link Processor} instance. PostCSS will copy plugins
   *   from that instance into this one.
   *
   * Plugins can also be added by passing them as arguments when creating
   * a `postcss` instance (see [`postcss(plugins)`]).
   *
   * Asynchronous plugins should return a `Promise` instance.
   *
   * @param {Plugin|pluginFunction|Processor} plugin - PostCSS plugin
   *                                                   or {@link Processor}
   *                                                   with plugins
   *
   * @example
   * const processor = postcss()
   *   .use(autoprefixer)
   *   .use(precss);
   *
   * @return {Processes} current processor to make methods chain
   */


  Processor.prototype.use = function use(plugin) {
    this.plugins = this.plugins.concat(this.normalize([plugin]));
    return this;
  };

  /**
   * Parses source CSS and returns a {@link LazyResult} Promise proxy.
   * Because some plugins can be asynchronous it doesn’t make
   * any transformations. Transformations will be applied
   * in the {@link LazyResult} methods.
   *
   * @param {string|toString|Result} css - String with input CSS or
   *                                       any object with a `toString()`
   *                                       method, like a Buffer.
   *                                       Optionally, send a {@link Result}
   *                                       instance and the processor will
   *                                       take the {@link Root} from it.
   * @param {processOptions} [opts]      - options
   *
   * @return {LazyResult} Promise proxy
   *
   * @example
   * processor.process(css, { from: 'a.css', to: 'a.out.css' })
   *   .then(result => {
   *      console.log(result.css);
   *   });
   */


  Processor.prototype.process = function process(css) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return new _lazyResult2.default(this, css, opts);
  };

  Processor.prototype.normalize = function normalize(plugins) {
    var normalized = [];
    for (var _iterator = plugins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var i = _ref;

      if (i.postcss) i = i.postcss;

      if ((typeof i === 'undefined' ? 'undefined' : _typeof(i)) === 'object' && Array.isArray(i.plugins)) {
        normalized = normalized.concat(i.plugins);
      } else if (typeof i === 'function') {
        normalized.push(i);
      } else if ((typeof i === 'undefined' ? 'undefined' : _typeof(i)) === 'object' && (i.parse || i.stringify)) {
        throw new Error('PostCSS syntaxes cannot be used as plugins. ' + 'Instead, please use one of the ' + 'syntax/parser/stringifier options as ' + 'outlined in your PostCSS ' + 'runner documentation.');
      } else {
        throw new Error(i + ' is not a PostCSS plugin');
      }
    }
    return normalized;
  };

  return Processor;
}();

exports.default = Processor;

/**
 * @callback builder
 * @param {string} part          - part of generated CSS connected to this node
 * @param {Node}   node          - AST node
 * @param {"start"|"end"} [type] - node’s part type
 */

/**
 * @callback parser
 *
 * @param {string|toString} css   - string with input CSS or any object
 *                                  with toString() method, like a Buffer
 * @param {processOptions} [opts] - options with only `from` and `map` keys
 *
 * @return {Root} PostCSS AST
 */

/**
 * @callback stringifier
 *
 * @param {Node} node       - start node for stringifing. Usually {@link Root}.
 * @param {builder} builder - function to concatenate CSS from node’s parts
 *                            or generate string and source map
 *
 * @return {void}
 */

/**
 * @typedef {object} syntax
 * @property {parser} parse          - function to generate AST by string
 * @property {stringifier} stringify - function to generate string by AST
 */

/**
 * @typedef {object} toString
 * @property {function} toString
 */

/**
 * @callback pluginFunction
 * @param {Root} root     - parsed input CSS
 * @param {Result} result - result to set warnings or check other plugins
 */

/**
 * @typedef {object} Plugin
 * @property {function} postcss - PostCSS plugin function
 */

/**
 * @typedef {object} processOptions
 * @property {string} from             - the path of the CSS source file.
 *                                       You should always set `from`,
 *                                       because it is used in source map
 *                                       generation and syntax error messages.
 * @property {string} to               - the path where you’ll put the output
 *                                       CSS file. You should always set `to`
 *                                       to generate correct source maps.
 * @property {parser} parser           - function to generate AST by string
 * @property {stringifier} stringifier - class to generate string by AST
 * @property {syntax} syntax           - object with `parse` and `stringify`
 * @property {object} map              - source map options
 * @property {boolean} map.inline                    - does source map should
 *                                                     be embedded in the output
 *                                                     CSS as a base64-encoded
 *                                                     comment
 * @property {string|object|false|function} map.prev - source map content
 *                                                     from a previous
 *                                                     processing step
 *                                                     (for example, Sass).
 *                                                     PostCSS will try to find
 *                                                     previous map
 *                                                     automatically, so you
 *                                                     could disable it by
 *                                                     `false` value.
 * @property {boolean} map.sourcesContent            - does PostCSS should set
 *                                                     the origin content to map
 * @property {string|false} map.annotation           - does PostCSS should set
 *                                                     annotation comment to map
 * @property {string} map.from                       - override `from` in map’s
 *                                                     `sources`
 */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5lczYiXSwibmFtZXMiOlsiUHJvY2Vzc29yIiwicGx1Z2lucyIsInZlcnNpb24iLCJub3JtYWxpemUiLCJ1c2UiLCJwbHVnaW4iLCJjb25jYXQiLCJwcm9jZXNzIiwiY3NzIiwib3B0cyIsIm5vcm1hbGl6ZWQiLCJpIiwicG9zdGNzcyIsIkFycmF5IiwiaXNBcnJheSIsInB1c2giLCJwYXJzZSIsInN0cmluZ2lmeSIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7O0lBU01BLFM7O0FBRUY7Ozs7QUFJQSx1QkFBMEI7QUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3RCOzs7Ozs7OztBQVFBLFNBQUtDLE9BQUwsR0FBZSxRQUFmO0FBQ0E7Ozs7Ozs7QUFPQSxTQUFLRCxPQUFMLEdBQWUsS0FBS0UsU0FBTCxDQUFlRixPQUFmLENBQWY7QUFDSDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkE2QkFHLEcsZ0JBQUlDLE0sRUFBUTtBQUNSLFNBQUtKLE9BQUwsR0FBZSxLQUFLQSxPQUFMLENBQWFLLE1BQWIsQ0FBb0IsS0FBS0gsU0FBTCxDQUFlLENBQUNFLE1BQUQsQ0FBZixDQUFwQixDQUFmO0FBQ0EsV0FBTyxJQUFQO0FBQ0gsRzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQXNCQUUsTyxvQkFBUUMsRyxFQUFpQjtBQUFBLFFBQVpDLElBQVksdUVBQUwsRUFBSzs7QUFDckIsV0FBTyx5QkFBZSxJQUFmLEVBQXFCRCxHQUFyQixFQUEwQkMsSUFBMUIsQ0FBUDtBQUNILEc7O3NCQUVETixTLHNCQUFVRixPLEVBQVM7QUFDZixRQUFJUyxhQUFhLEVBQWpCO0FBQ0EseUJBQWVULE9BQWYsa0hBQXlCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxVQUFmVSxDQUFlOztBQUNyQixVQUFLQSxFQUFFQyxPQUFQLEVBQWlCRCxJQUFJQSxFQUFFQyxPQUFOOztBQUVqQixVQUFLLFFBQU9ELENBQVAseUNBQU9BLENBQVAsT0FBYSxRQUFiLElBQXlCRSxNQUFNQyxPQUFOLENBQWNILEVBQUVWLE9BQWhCLENBQTlCLEVBQXlEO0FBQ3JEUyxxQkFBYUEsV0FBV0osTUFBWCxDQUFrQkssRUFBRVYsT0FBcEIsQ0FBYjtBQUNILE9BRkQsTUFFTyxJQUFLLE9BQU9VLENBQVAsS0FBYSxVQUFsQixFQUErQjtBQUNsQ0QsbUJBQVdLLElBQVgsQ0FBZ0JKLENBQWhCO0FBQ0gsT0FGTSxNQUVBLElBQUssUUFBT0EsQ0FBUCx5Q0FBT0EsQ0FBUCxPQUFhLFFBQWIsS0FBMEJBLEVBQUVLLEtBQUYsSUFBV0wsRUFBRU0sU0FBdkMsQ0FBTCxFQUF5RDtBQUM1RCxjQUFNLElBQUlDLEtBQUosQ0FBVSxpREFDQSxpQ0FEQSxHQUVBLHVDQUZBLEdBR0EsMkJBSEEsR0FJQSx1QkFKVixDQUFOO0FBS0gsT0FOTSxNQU1BO0FBQ0gsY0FBTSxJQUFJQSxLQUFKLENBQVVQLElBQUksMEJBQWQsQ0FBTjtBQUNIO0FBQ0o7QUFDRCxXQUFPRCxVQUFQO0FBQ0gsRzs7Ozs7a0JBSVVWLFM7O0FBRWY7Ozs7Ozs7QUFPQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7O0FBVUE7Ozs7OztBQU1BOzs7OztBQUtBOzs7Ozs7QUFNQTs7Ozs7QUFLQSIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGF6eVJlc3VsdCAgZnJvbSAnLi9sYXp5LXJlc3VsdCc7XG5cbi8qKlxuICogQ29udGFpbnMgcGx1Z2lucyB0byBwcm9jZXNzIENTUy4gQ3JlYXRlIG9uZSBgUHJvY2Vzc29yYCBpbnN0YW5jZSxcbiAqIGluaXRpYWxpemUgaXRzIHBsdWdpbnMsIGFuZCB0aGVuIHVzZSB0aGF0IGluc3RhbmNlIG9uIG51bWVyb3VzIENTUyBmaWxlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgcHJvY2Vzc29yID0gcG9zdGNzcyhbYXV0b3ByZWZpeGVyLCBwcmVjc3NdKTtcbiAqIHByb2Nlc3Nvci5wcm9jZXNzKGNzczEpLnRoZW4ocmVzdWx0ID0+IGNvbnNvbGUubG9nKHJlc3VsdC5jc3MpKTtcbiAqIHByb2Nlc3Nvci5wcm9jZXNzKGNzczIpLnRoZW4ocmVzdWx0ID0+IGNvbnNvbGUubG9nKHJlc3VsdC5jc3MpKTtcbiAqL1xuY2xhc3MgUHJvY2Vzc29yIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QXJyYXkuPFBsdWdpbnxwbHVnaW5GdW5jdGlvbj58UHJvY2Vzc29yfSBwbHVnaW5zIC0gUG9zdENTU1xuICAgICAqICAgICAgICBwbHVnaW5zLiBTZWUge0BsaW5rIFByb2Nlc3NvciN1c2V9IGZvciBwbHVnaW4gZm9ybWF0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBsdWdpbnMgPSBbXSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSAtIEN1cnJlbnQgUG9zdENTUyB2ZXJzaW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBpZiAoIHJlc3VsdC5wcm9jZXNzb3IudmVyc2lvbi5zcGxpdCgnLicpWzBdICE9PSAnNScgKSB7XG4gICAgICAgICAqICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHBsdWdpbiB3b3JrcyBvbmx5IHdpdGggUG9zdENTUyA1Jyk7XG4gICAgICAgICAqIH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudmVyc2lvbiA9ICc1LjIuMTgnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7cGx1Z2luRnVuY3Rpb25bXX0gLSBQbHVnaW5zIGFkZGVkIHRvIHRoaXMgcHJvY2Vzc29yLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBjb25zdCBwcm9jZXNzb3IgPSBwb3N0Y3NzKFthdXRvcHJlZml4ZXIsIHByZWNzc10pO1xuICAgICAgICAgKiBwcm9jZXNzb3IucGx1Z2lucy5sZW5ndGggLy89PiAyXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBsdWdpbnMgPSB0aGlzLm5vcm1hbGl6ZShwbHVnaW5zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgcGx1Z2luIHRvIGJlIHVzZWQgYXMgYSBDU1MgcHJvY2Vzc29yLlxuICAgICAqXG4gICAgICogUG9zdENTUyBwbHVnaW4gY2FuIGJlIGluIDQgZm9ybWF0czpcbiAgICAgKiAqIEEgcGx1Z2luIGNyZWF0ZWQgYnkge0BsaW5rIHBvc3Rjc3MucGx1Z2lufSBtZXRob2QuXG4gICAgICogKiBBIGZ1bmN0aW9uLiBQb3N0Q1NTIHdpbGwgcGFzcyB0aGUgZnVuY3Rpb24gYSBAe2xpbmsgUm9vdH1cbiAgICAgKiAgIGFzIHRoZSBmaXJzdCBhcmd1bWVudCBhbmQgY3VycmVudCB7QGxpbmsgUmVzdWx0fSBpbnN0YW5jZVxuICAgICAqICAgYXMgdGhlIHNlY29uZC5cbiAgICAgKiAqIEFuIG9iamVjdCB3aXRoIGEgYHBvc3Rjc3NgIG1ldGhvZC4gUG9zdENTUyB3aWxsIHVzZSB0aGF0IG1ldGhvZFxuICAgICAqICAgYXMgZGVzY3JpYmVkIGluICMyLlxuICAgICAqICogQW5vdGhlciB7QGxpbmsgUHJvY2Vzc29yfSBpbnN0YW5jZS4gUG9zdENTUyB3aWxsIGNvcHkgcGx1Z2luc1xuICAgICAqICAgZnJvbSB0aGF0IGluc3RhbmNlIGludG8gdGhpcyBvbmUuXG4gICAgICpcbiAgICAgKiBQbHVnaW5zIGNhbiBhbHNvIGJlIGFkZGVkIGJ5IHBhc3NpbmcgdGhlbSBhcyBhcmd1bWVudHMgd2hlbiBjcmVhdGluZ1xuICAgICAqIGEgYHBvc3Rjc3NgIGluc3RhbmNlIChzZWUgW2Bwb3N0Y3NzKHBsdWdpbnMpYF0pLlxuICAgICAqXG4gICAgICogQXN5bmNocm9ub3VzIHBsdWdpbnMgc2hvdWxkIHJldHVybiBhIGBQcm9taXNlYCBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UGx1Z2lufHBsdWdpbkZ1bmN0aW9ufFByb2Nlc3Nvcn0gcGx1Z2luIC0gUG9zdENTUyBwbHVnaW5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIHtAbGluayBQcm9jZXNzb3J9XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIHBsdWdpbnNcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3QgcHJvY2Vzc29yID0gcG9zdGNzcygpXG4gICAgICogICAudXNlKGF1dG9wcmVmaXhlcilcbiAgICAgKiAgIC51c2UocHJlY3NzKTtcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Byb2Nlc3Nlc30gY3VycmVudCBwcm9jZXNzb3IgdG8gbWFrZSBtZXRob2RzIGNoYWluXG4gICAgICovXG4gICAgdXNlKHBsdWdpbikge1xuICAgICAgICB0aGlzLnBsdWdpbnMgPSB0aGlzLnBsdWdpbnMuY29uY2F0KHRoaXMubm9ybWFsaXplKFtwbHVnaW5dKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBzb3VyY2UgQ1NTIGFuZCByZXR1cm5zIGEge0BsaW5rIExhenlSZXN1bHR9IFByb21pc2UgcHJveHkuXG4gICAgICogQmVjYXVzZSBzb21lIHBsdWdpbnMgY2FuIGJlIGFzeW5jaHJvbm91cyBpdCBkb2VzbuKAmXQgbWFrZVxuICAgICAqIGFueSB0cmFuc2Zvcm1hdGlvbnMuIFRyYW5zZm9ybWF0aW9ucyB3aWxsIGJlIGFwcGxpZWRcbiAgICAgKiBpbiB0aGUge0BsaW5rIExhenlSZXN1bHR9IG1ldGhvZHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3x0b1N0cmluZ3xSZXN1bHR9IGNzcyAtIFN0cmluZyB3aXRoIGlucHV0IENTUyBvclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW55IG9iamVjdCB3aXRoIGEgYHRvU3RyaW5nKClgXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2QsIGxpa2UgYSBCdWZmZXIuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcHRpb25hbGx5LCBzZW5kIGEge0BsaW5rIFJlc3VsdH1cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlIGFuZCB0aGUgcHJvY2Vzc29yIHdpbGxcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2UgdGhlIHtAbGluayBSb290fSBmcm9tIGl0LlxuICAgICAqIEBwYXJhbSB7cHJvY2Vzc09wdGlvbnN9IFtvcHRzXSAgICAgIC0gb3B0aW9uc1xuICAgICAqXG4gICAgICogQHJldHVybiB7TGF6eVJlc3VsdH0gUHJvbWlzZSBwcm94eVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBwcm9jZXNzb3IucHJvY2Vzcyhjc3MsIHsgZnJvbTogJ2EuY3NzJywgdG86ICdhLm91dC5jc3MnIH0pXG4gICAgICogICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAqICAgICAgY29uc29sZS5sb2cocmVzdWx0LmNzcyk7XG4gICAgICogICB9KTtcbiAgICAgKi9cbiAgICBwcm9jZXNzKGNzcywgb3B0cyA9IHsgfSkge1xuICAgICAgICByZXR1cm4gbmV3IExhenlSZXN1bHQodGhpcywgY3NzLCBvcHRzKTtcbiAgICB9XG5cbiAgICBub3JtYWxpemUocGx1Z2lucykge1xuICAgICAgICBsZXQgbm9ybWFsaXplZCA9IFtdO1xuICAgICAgICBmb3IgKCBsZXQgaSBvZiBwbHVnaW5zICkge1xuICAgICAgICAgICAgaWYgKCBpLnBvc3Rjc3MgKSBpID0gaS5wb3N0Y3NzO1xuXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBpID09PSAnb2JqZWN0JyAmJiBBcnJheS5pc0FycmF5KGkucGx1Z2lucykgKSB7XG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZWQuY29uY2F0KGkucGx1Z2lucyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2YgaSA9PT0gJ2Z1bmN0aW9uJyApIHtcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkLnB1c2goaSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2YgaSA9PT0gJ29iamVjdCcgJiYgKGkucGFyc2UgfHwgaS5zdHJpbmdpZnkpICkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUG9zdENTUyBzeW50YXhlcyBjYW5ub3QgYmUgdXNlZCBhcyBwbHVnaW5zLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0luc3RlYWQsIHBsZWFzZSB1c2Ugb25lIG9mIHRoZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N5bnRheC9wYXJzZXIvc3RyaW5naWZpZXIgb3B0aW9ucyBhcyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ291dGxpbmVkIGluIHlvdXIgUG9zdENTUyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3J1bm5lciBkb2N1bWVudGF0aW9uLicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoaSArICcgaXMgbm90IGEgUG9zdENTUyBwbHVnaW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9ybWFsaXplZDtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvY2Vzc29yO1xuXG4vKipcbiAqIEBjYWxsYmFjayBidWlsZGVyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFydCAgICAgICAgICAtIHBhcnQgb2YgZ2VuZXJhdGVkIENTUyBjb25uZWN0ZWQgdG8gdGhpcyBub2RlXG4gKiBAcGFyYW0ge05vZGV9ICAgbm9kZSAgICAgICAgICAtIEFTVCBub2RlXG4gKiBAcGFyYW0ge1wic3RhcnRcInxcImVuZFwifSBbdHlwZV0gLSBub2Rl4oCZcyBwYXJ0IHR5cGVcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayBwYXJzZXJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3x0b1N0cmluZ30gY3NzICAgLSBzdHJpbmcgd2l0aCBpbnB1dCBDU1Mgb3IgYW55IG9iamVjdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCB0b1N0cmluZygpIG1ldGhvZCwgbGlrZSBhIEJ1ZmZlclxuICogQHBhcmFtIHtwcm9jZXNzT3B0aW9uc30gW29wdHNdIC0gb3B0aW9ucyB3aXRoIG9ubHkgYGZyb21gIGFuZCBgbWFwYCBrZXlzXG4gKlxuICogQHJldHVybiB7Um9vdH0gUG9zdENTUyBBU1RcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayBzdHJpbmdpZmllclxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAgICAgICAtIHN0YXJ0IG5vZGUgZm9yIHN0cmluZ2lmaW5nLiBVc3VhbGx5IHtAbGluayBSb290fS5cbiAqIEBwYXJhbSB7YnVpbGRlcn0gYnVpbGRlciAtIGZ1bmN0aW9uIHRvIGNvbmNhdGVuYXRlIENTUyBmcm9tIG5vZGXigJlzIHBhcnRzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvciBnZW5lcmF0ZSBzdHJpbmcgYW5kIHNvdXJjZSBtYXBcbiAqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gc3ludGF4XG4gKiBAcHJvcGVydHkge3BhcnNlcn0gcGFyc2UgICAgICAgICAgLSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBBU1QgYnkgc3RyaW5nXG4gKiBAcHJvcGVydHkge3N0cmluZ2lmaWVyfSBzdHJpbmdpZnkgLSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBzdHJpbmcgYnkgQVNUXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSB0b1N0cmluZ1xuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gdG9TdHJpbmdcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayBwbHVnaW5GdW5jdGlvblxuICogQHBhcmFtIHtSb290fSByb290ICAgICAtIHBhcnNlZCBpbnB1dCBDU1NcbiAqIEBwYXJhbSB7UmVzdWx0fSByZXN1bHQgLSByZXN1bHQgdG8gc2V0IHdhcm5pbmdzIG9yIGNoZWNrIG90aGVyIHBsdWdpbnNcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IFBsdWdpblxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gcG9zdGNzcyAtIFBvc3RDU1MgcGx1Z2luIGZ1bmN0aW9uXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBwcm9jZXNzT3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGZyb20gICAgICAgICAgICAgLSB0aGUgcGF0aCBvZiB0aGUgQ1NTIHNvdXJjZSBmaWxlLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3Ugc2hvdWxkIGFsd2F5cyBzZXQgYGZyb21gLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWNhdXNlIGl0IGlzIHVzZWQgaW4gc291cmNlIG1hcFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0aW9uIGFuZCBzeW50YXggZXJyb3IgbWVzc2FnZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdG8gICAgICAgICAgICAgICAtIHRoZSBwYXRoIHdoZXJlIHlvdeKAmWxsIHB1dCB0aGUgb3V0cHV0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENTUyBmaWxlLiBZb3Ugc2hvdWxkIGFsd2F5cyBzZXQgYHRvYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byBnZW5lcmF0ZSBjb3JyZWN0IHNvdXJjZSBtYXBzLlxuICogQHByb3BlcnR5IHtwYXJzZXJ9IHBhcnNlciAgICAgICAgICAgLSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBBU1QgYnkgc3RyaW5nXG4gKiBAcHJvcGVydHkge3N0cmluZ2lmaWVyfSBzdHJpbmdpZmllciAtIGNsYXNzIHRvIGdlbmVyYXRlIHN0cmluZyBieSBBU1RcbiAqIEBwcm9wZXJ0eSB7c3ludGF4fSBzeW50YXggICAgICAgICAgIC0gb2JqZWN0IHdpdGggYHBhcnNlYCBhbmQgYHN0cmluZ2lmeWBcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBtYXAgICAgICAgICAgICAgIC0gc291cmNlIG1hcCBvcHRpb25zXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IG1hcC5pbmxpbmUgICAgICAgICAgICAgICAgICAgIC0gZG9lcyBzb3VyY2UgbWFwIHNob3VsZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGVtYmVkZGVkIGluIHRoZSBvdXRwdXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDU1MgYXMgYSBiYXNlNjQtZW5jb2RlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfG9iamVjdHxmYWxzZXxmdW5jdGlvbn0gbWFwLnByZXYgLSBzb3VyY2UgbWFwIGNvbnRlbnRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIGEgcHJldmlvdXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzaW5nIHN0ZXBcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZm9yIGV4YW1wbGUsIFNhc3MpLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBvc3RDU1Mgd2lsbCB0cnkgdG8gZmluZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzIG1hcFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9tYXRpY2FsbHksIHNvIHlvdVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdWxkIGRpc2FibGUgaXQgYnlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgZmFsc2VgIHZhbHVlLlxuICogQHByb3BlcnR5IHtib29sZWFufSBtYXAuc291cmNlc0NvbnRlbnQgICAgICAgICAgICAtIGRvZXMgUG9zdENTUyBzaG91bGQgc2V0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG9yaWdpbiBjb250ZW50IHRvIG1hcFxuICogQHByb3BlcnR5IHtzdHJpbmd8ZmFsc2V9IG1hcC5hbm5vdGF0aW9uICAgICAgICAgICAtIGRvZXMgUG9zdENTUyBzaG91bGQgc2V0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbiBjb21tZW50IHRvIG1hcFxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1hcC5mcm9tICAgICAgICAgICAgICAgICAgICAgICAtIG92ZXJyaWRlIGBmcm9tYCBpbiBtYXDigJlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYHNvdXJjZXNgXG4gKi9cbiJdfQ==
