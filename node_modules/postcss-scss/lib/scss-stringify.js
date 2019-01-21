'use strict';

exports.__esModule = true;
exports.default = scssStringify;

var _scssStringifier = require('./scss-stringifier');

var _scssStringifier2 = _interopRequireDefault(_scssStringifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scssStringify(node, builder) {
    var str = new _scssStringifier2.default(builder);
    str.stringify(node);
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjc3Mtc3RyaW5naWZ5LmVzNiJdLCJuYW1lcyI6WyJzY3NzU3RyaW5naWZ5Iiwibm9kZSIsImJ1aWxkZXIiLCJzdHIiLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7OztrQkFFd0JBLGE7O0FBRnhCOzs7Ozs7QUFFZSxTQUFTQSxhQUFULENBQXVCQyxJQUF2QixFQUE2QkMsT0FBN0IsRUFBc0M7QUFDakQsUUFBSUMsTUFBTSw4QkFBb0JELE9BQXBCLENBQVY7QUFDQUMsUUFBSUMsU0FBSixDQUFjSCxJQUFkO0FBQ0giLCJmaWxlIjoic2Nzcy1zdHJpbmdpZnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2Nzc1N0cmluZ2lmaWVyIGZyb20gJy4vc2Nzcy1zdHJpbmdpZmllcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNjc3NTdHJpbmdpZnkobm9kZSwgYnVpbGRlcikge1xuICAgIGxldCBzdHIgPSBuZXcgU2Nzc1N0cmluZ2lmaWVyKGJ1aWxkZXIpO1xuICAgIHN0ci5zdHJpbmdpZnkobm9kZSk7XG59XG4iXX0=
