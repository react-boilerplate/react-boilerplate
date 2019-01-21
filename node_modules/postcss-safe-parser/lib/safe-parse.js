'use strict';

exports.__esModule = true;
exports.default = safeParse;

var _input = require('postcss/lib/input');

var _input2 = _interopRequireDefault(_input);

var _safeParser = require('./safe-parser');

var _safeParser2 = _interopRequireDefault(_safeParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function safeParse(css, opts) {
    var input = new _input2.default(css, opts);

    var parser = new _safeParser2.default(input);
    parser.parse();

    return parser.root;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhZmUtcGFyc2UuZXM2Il0sIm5hbWVzIjpbInNhZmVQYXJzZSIsImNzcyIsIm9wdHMiLCJpbnB1dCIsInBhcnNlciIsInBhcnNlIiwicm9vdCJdLCJtYXBwaW5ncyI6Ijs7O2tCQUl3QkEsUzs7QUFKeEI7Ozs7QUFFQTs7Ozs7O0FBRWUsU0FBU0EsU0FBVCxDQUFtQkMsR0FBbkIsRUFBd0JDLElBQXhCLEVBQThCO0FBQ3pDLFFBQUlDLFFBQVEsb0JBQVVGLEdBQVYsRUFBZUMsSUFBZixDQUFaOztBQUVBLFFBQUlFLFNBQVMseUJBQWVELEtBQWYsQ0FBYjtBQUNBQyxXQUFPQyxLQUFQOztBQUVBLFdBQU9ELE9BQU9FLElBQWQ7QUFDSCIsImZpbGUiOiJzYWZlLXBhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElucHV0IGZyb20gJ3Bvc3Rjc3MvbGliL2lucHV0JztcblxuaW1wb3J0IFNhZmVQYXJzZXIgZnJvbSAnLi9zYWZlLXBhcnNlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNhZmVQYXJzZShjc3MsIG9wdHMpIHtcbiAgICBsZXQgaW5wdXQgPSBuZXcgSW5wdXQoY3NzLCBvcHRzKTtcblxuICAgIGxldCBwYXJzZXIgPSBuZXcgU2FmZVBhcnNlcihpbnB1dCk7XG4gICAgcGFyc2VyLnBhcnNlKCk7XG5cbiAgICByZXR1cm4gcGFyc2VyLnJvb3Q7XG59XG4iXX0=
