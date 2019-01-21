'use strict';

exports.__esModule = true;
exports.default = parse;

var _input = require('postcss/lib/input');

var _input2 = _interopRequireDefault(_input);

var _preprocess = require('./preprocess');

var _preprocess2 = _interopRequireDefault(_preprocess);

var _tokenize = require('./tokenize');

var _tokenize2 = _interopRequireDefault(_tokenize);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _liner = require('./liner');

var _liner2 = _interopRequireDefault(_liner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(source, opts) {
    var input = new _input2.default(source, opts);

    var parser = new _parser2.default(input);
    parser.tokens = (0, _tokenize2.default)(input);
    parser.parts = (0, _preprocess2.default)(input, (0, _liner2.default)(parser.tokens));
    parser.loop();

    return parser.root;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlLmVzNiJdLCJuYW1lcyI6WyJwYXJzZSIsInNvdXJjZSIsIm9wdHMiLCJpbnB1dCIsInBhcnNlciIsInRva2VucyIsInBhcnRzIiwibG9vcCIsInJvb3QiXSwibWFwcGluZ3MiOiI7OztrQkFPd0JBLEs7O0FBUHhCOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVlLFNBQVNBLEtBQVQsQ0FBZUMsTUFBZixFQUF1QkMsSUFBdkIsRUFBNkI7QUFDeEMsUUFBSUMsUUFBUSxvQkFBVUYsTUFBVixFQUFrQkMsSUFBbEIsQ0FBWjs7QUFFQSxRQUFJRSxTQUFTLHFCQUFXRCxLQUFYLENBQWI7QUFDQUMsV0FBT0MsTUFBUCxHQUFnQix3QkFBVUYsS0FBVixDQUFoQjtBQUNBQyxXQUFPRSxLQUFQLEdBQWdCLDBCQUFXSCxLQUFYLEVBQWtCLHFCQUFNQyxPQUFPQyxNQUFiLENBQWxCLENBQWhCO0FBQ0FELFdBQU9HLElBQVA7O0FBRUEsV0FBT0gsT0FBT0ksSUFBZDtBQUNIIiwiZmlsZSI6InBhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElucHV0IGZyb20gJ3Bvc3Rjc3MvbGliL2lucHV0JztcblxuaW1wb3J0IHByZXByb2Nlc3MgZnJvbSAnLi9wcmVwcm9jZXNzJztcbmltcG9ydCB0b2tlbml6ZXIgIGZyb20gJy4vdG9rZW5pemUnO1xuaW1wb3J0IFBhcnNlciAgICAgZnJvbSAnLi9wYXJzZXInO1xuaW1wb3J0IGxpbmVyICAgICAgZnJvbSAnLi9saW5lcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlKHNvdXJjZSwgb3B0cykge1xuICAgIGxldCBpbnB1dCA9IG5ldyBJbnB1dChzb3VyY2UsIG9wdHMpO1xuXG4gICAgbGV0IHBhcnNlciA9IG5ldyBQYXJzZXIoaW5wdXQpO1xuICAgIHBhcnNlci50b2tlbnMgPSB0b2tlbml6ZXIoaW5wdXQpO1xuICAgIHBhcnNlci5wYXJ0cyAgPSBwcmVwcm9jZXNzKGlucHV0LCBsaW5lcihwYXJzZXIudG9rZW5zKSk7XG4gICAgcGFyc2VyLmxvb3AoKTtcblxuICAgIHJldHVybiBwYXJzZXIucm9vdDtcbn1cbiJdfQ==