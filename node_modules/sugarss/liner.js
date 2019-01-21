'use strict';

exports.__esModule = true;
exports.default = liner;
function liner(tokens) {
    var line = [];
    var result = [line];
    var brackets = 0;
    for (var _iterator = tokens, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var token = _ref;

        line.push(token);
        if (token[0] === '(') {
            brackets += 1;
        } else if (token[0] === ')') {
            brackets -= 1;
        } else if (token[0] === 'newline' && brackets === 0) {
            line = [];
            result.push(line);
        }
    }
    return result;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmVyLmVzNiJdLCJuYW1lcyI6WyJsaW5lciIsInRva2VucyIsImxpbmUiLCJyZXN1bHQiLCJicmFja2V0cyIsInRva2VuIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7O2tCQUF3QkEsSztBQUFULFNBQVNBLEtBQVQsQ0FBZUMsTUFBZixFQUF1QjtBQUNsQyxRQUFJQyxPQUFXLEVBQWY7QUFDQSxRQUFJQyxTQUFXLENBQUNELElBQUQsQ0FBZjtBQUNBLFFBQUlFLFdBQVcsQ0FBZjtBQUNBLHlCQUFtQkgsTUFBbkIsa0hBQTRCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxZQUFsQkksS0FBa0I7O0FBQ3hCSCxhQUFLSSxJQUFMLENBQVVELEtBQVY7QUFDQSxZQUFLQSxNQUFNLENBQU4sTUFBYSxHQUFsQixFQUF3QjtBQUNwQkQsd0JBQVksQ0FBWjtBQUNILFNBRkQsTUFFTyxJQUFLQyxNQUFNLENBQU4sTUFBYSxHQUFsQixFQUF3QjtBQUMzQkQsd0JBQVksQ0FBWjtBQUNILFNBRk0sTUFFQSxJQUFLQyxNQUFNLENBQU4sTUFBYSxTQUFiLElBQTBCRCxhQUFhLENBQTVDLEVBQWdEO0FBQ25ERixtQkFBTyxFQUFQO0FBQ0FDLG1CQUFPRyxJQUFQLENBQVlKLElBQVo7QUFDSDtBQUNKO0FBQ0QsV0FBT0MsTUFBUDtBQUNIIiwiZmlsZSI6ImxpbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGluZXIodG9rZW5zKSB7XG4gICAgbGV0IGxpbmUgICAgID0gW107XG4gICAgbGV0IHJlc3VsdCAgID0gW2xpbmVdO1xuICAgIGxldCBicmFja2V0cyA9IDA7XG4gICAgZm9yICggbGV0IHRva2VuIG9mIHRva2VucyApIHtcbiAgICAgICAgbGluZS5wdXNoKHRva2VuKTtcbiAgICAgICAgaWYgKCB0b2tlblswXSA9PT0gJygnICkge1xuICAgICAgICAgICAgYnJhY2tldHMgKz0gMTtcbiAgICAgICAgfSBlbHNlIGlmICggdG9rZW5bMF0gPT09ICcpJyApIHtcbiAgICAgICAgICAgIGJyYWNrZXRzIC09IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoIHRva2VuWzBdID09PSAnbmV3bGluZScgJiYgYnJhY2tldHMgPT09IDAgKSB7XG4gICAgICAgICAgICBsaW5lID0gW107XG4gICAgICAgICAgICByZXN1bHQucHVzaChsaW5lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIl19