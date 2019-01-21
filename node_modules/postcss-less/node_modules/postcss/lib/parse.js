'use strict';

exports.__esModule = true;
exports.default = parse;

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(css, opts) {
    if (opts && opts.safe) {
        throw new Error('Option safe was removed. ' + 'Use parser: require("postcss-safe-parser")');
    }

    var input = new _input2.default(css, opts);

    var parser = new _parser2.default(input);
    try {
        parser.tokenize();
        parser.loop();
    } catch (e) {
        if (e.name === 'CssSyntaxError' && opts && opts.from) {
            if (/\.scss$/i.test(opts.from)) {
                e.message += '\nYou tried to parse SCSS with ' + 'the standard CSS parser; ' + 'try again with the postcss-scss parser';
            } else if (/\.sass/i.test(opts.from)) {
                e.message += '\nYou tried to parse Sass with ' + 'the standard CSS parser; ' + 'try again with the postcss-sass parser';
            } else if (/\.less$/i.test(opts.from)) {
                e.message += '\nYou tried to parse Less with ' + 'the standard CSS parser; ' + 'try again with the postcss-less parser';
            }
        }
        throw e;
    }

    return parser.root;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlLmVzNiJdLCJuYW1lcyI6WyJwYXJzZSIsImNzcyIsIm9wdHMiLCJzYWZlIiwiRXJyb3IiLCJpbnB1dCIsInBhcnNlciIsInRva2VuaXplIiwibG9vcCIsImUiLCJuYW1lIiwiZnJvbSIsInRlc3QiLCJtZXNzYWdlIiwicm9vdCJdLCJtYXBwaW5ncyI6Ijs7O2tCQUd3QkEsSzs7QUFIeEI7Ozs7QUFDQTs7Ozs7O0FBRWUsU0FBU0EsS0FBVCxDQUFlQyxHQUFmLEVBQW9CQyxJQUFwQixFQUEwQjtBQUNyQyxRQUFLQSxRQUFRQSxLQUFLQyxJQUFsQixFQUF5QjtBQUNyQixjQUFNLElBQUlDLEtBQUosQ0FBVSw4QkFDQSw0Q0FEVixDQUFOO0FBRUg7O0FBRUQsUUFBSUMsUUFBUSxvQkFBVUosR0FBVixFQUFlQyxJQUFmLENBQVo7O0FBRUEsUUFBSUksU0FBUyxxQkFBV0QsS0FBWCxDQUFiO0FBQ0EsUUFBSTtBQUNBQyxlQUFPQyxRQUFQO0FBQ0FELGVBQU9FLElBQVA7QUFDSCxLQUhELENBR0UsT0FBT0MsQ0FBUCxFQUFVO0FBQ1IsWUFBS0EsRUFBRUMsSUFBRixLQUFXLGdCQUFYLElBQStCUixJQUEvQixJQUF1Q0EsS0FBS1MsSUFBakQsRUFBd0Q7QUFDcEQsZ0JBQUssV0FBV0MsSUFBWCxDQUFnQlYsS0FBS1MsSUFBckIsQ0FBTCxFQUFrQztBQUM5QkYsa0JBQUVJLE9BQUYsSUFBYSxvQ0FDQSwyQkFEQSxHQUVBLHdDQUZiO0FBR0gsYUFKRCxNQUlPLElBQUssVUFBVUQsSUFBVixDQUFlVixLQUFLUyxJQUFwQixDQUFMLEVBQWlDO0FBQ3BDRixrQkFBRUksT0FBRixJQUFhLG9DQUNBLDJCQURBLEdBRUEsd0NBRmI7QUFHSCxhQUpNLE1BSUEsSUFBSyxXQUFXRCxJQUFYLENBQWdCVixLQUFLUyxJQUFyQixDQUFMLEVBQWtDO0FBQ3JDRixrQkFBRUksT0FBRixJQUFhLG9DQUNBLDJCQURBLEdBRUEsd0NBRmI7QUFHSDtBQUNKO0FBQ0QsY0FBTUosQ0FBTjtBQUNIOztBQUVELFdBQU9ILE9BQU9RLElBQWQ7QUFDSCIsImZpbGUiOiJwYXJzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJzZXIgZnJvbSAnLi9wYXJzZXInO1xuaW1wb3J0IElucHV0ICBmcm9tICcuL2lucHV0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2UoY3NzLCBvcHRzKSB7XG4gICAgaWYgKCBvcHRzICYmIG9wdHMuc2FmZSApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPcHRpb24gc2FmZSB3YXMgcmVtb3ZlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVXNlIHBhcnNlcjogcmVxdWlyZShcInBvc3Rjc3Mtc2FmZS1wYXJzZXJcIiknKTtcbiAgICB9XG5cbiAgICBsZXQgaW5wdXQgPSBuZXcgSW5wdXQoY3NzLCBvcHRzKTtcblxuICAgIGxldCBwYXJzZXIgPSBuZXcgUGFyc2VyKGlucHV0KTtcbiAgICB0cnkge1xuICAgICAgICBwYXJzZXIudG9rZW5pemUoKTtcbiAgICAgICAgcGFyc2VyLmxvb3AoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmICggZS5uYW1lID09PSAnQ3NzU3ludGF4RXJyb3InICYmIG9wdHMgJiYgb3B0cy5mcm9tICkge1xuICAgICAgICAgICAgaWYgKCAvXFwuc2NzcyQvaS50ZXN0KG9wdHMuZnJvbSkgKSB7XG4gICAgICAgICAgICAgICAgZS5tZXNzYWdlICs9ICdcXG5Zb3UgdHJpZWQgdG8gcGFyc2UgU0NTUyB3aXRoICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGhlIHN0YW5kYXJkIENTUyBwYXJzZXI7ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJ5IGFnYWluIHdpdGggdGhlIHBvc3Rjc3Mtc2NzcyBwYXJzZXInO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggL1xcLnNhc3MvaS50ZXN0KG9wdHMuZnJvbSkgKSB7XG4gICAgICAgICAgICAgICAgZS5tZXNzYWdlICs9ICdcXG5Zb3UgdHJpZWQgdG8gcGFyc2UgU2FzcyB3aXRoICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGhlIHN0YW5kYXJkIENTUyBwYXJzZXI7ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJ5IGFnYWluIHdpdGggdGhlIHBvc3Rjc3Mtc2FzcyBwYXJzZXInO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggL1xcLmxlc3MkL2kudGVzdChvcHRzLmZyb20pICkge1xuICAgICAgICAgICAgICAgIGUubWVzc2FnZSArPSAnXFxuWW91IHRyaWVkIHRvIHBhcnNlIExlc3Mgd2l0aCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RoZSBzdGFuZGFyZCBDU1MgcGFyc2VyOyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RyeSBhZ2FpbiB3aXRoIHRoZSBwb3N0Y3NzLWxlc3MgcGFyc2VyJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJzZXIucm9vdDtcbn1cbiJdfQ==
