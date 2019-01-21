'use strict';

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = {
  meta: {
    docs: {
      url: (0, _docsUrl2.default)('named')
    }
  },

  create: function (context) {
    function checkSpecifiers(key, type, node) {
      // ignore local exports and type imports
      if (node.source == null || node.importKind === 'type') return;

      if (!node.specifiers.some(function (im) {
        return im.type === type;
      })) {
        return; // no named imports/exports
      }

      const imports = _ExportMap2.default.get(node.source.value, context);
      if (imports == null) return;

      if (imports.errors.length) {
        imports.reportErrors(context, node);
        return;
      }

      node.specifiers.forEach(function (im) {
        if (im.type !== type) return;

        const deepLookup = imports.hasDeep(im[key].name);

        if (!deepLookup.found) {
          if (deepLookup.path.length > 1) {
            const deepPath = deepLookup.path.map(i => path.relative(path.dirname(context.getFilename()), i.path)).join(' -> ');

            context.report(im[key], `${im[key].name} not found via ${deepPath}`);
          } else {
            context.report(im[key], im[key].name + ' not found in \'' + node.source.value + '\'');
          }
        }
      });
    }

    return {
      'ImportDeclaration': checkSpecifiers.bind(null, 'imported', 'ImportSpecifier'),

      'ExportNamedDeclaration': checkSpecifiers.bind(null, 'local', 'ExportSpecifier')
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25hbWVkLmpzIl0sIm5hbWVzIjpbInBhdGgiLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJ1cmwiLCJjcmVhdGUiLCJjb250ZXh0IiwiY2hlY2tTcGVjaWZpZXJzIiwia2V5IiwidHlwZSIsIm5vZGUiLCJzb3VyY2UiLCJpbXBvcnRLaW5kIiwic3BlY2lmaWVycyIsInNvbWUiLCJpbSIsImltcG9ydHMiLCJFeHBvcnRzIiwiZ2V0IiwidmFsdWUiLCJlcnJvcnMiLCJsZW5ndGgiLCJyZXBvcnRFcnJvcnMiLCJmb3JFYWNoIiwiZGVlcExvb2t1cCIsImhhc0RlZXAiLCJuYW1lIiwiZm91bmQiLCJkZWVwUGF0aCIsIm1hcCIsImkiLCJyZWxhdGl2ZSIsImRpcm5hbWUiLCJnZXRGaWxlbmFtZSIsImpvaW4iLCJyZXBvcnQiLCJiaW5kIl0sIm1hcHBpbmdzIjoiOztBQUFBOztJQUFZQSxJOztBQUNaOzs7O0FBQ0E7Ozs7Ozs7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsUUFBTTtBQUNKQyxVQUFNO0FBQ0pDLFdBQUssdUJBQVEsT0FBUjtBQUREO0FBREYsR0FEUzs7QUFPZkMsVUFBUSxVQUFVQyxPQUFWLEVBQW1CO0FBQ3pCLGFBQVNDLGVBQVQsQ0FBeUJDLEdBQXpCLEVBQThCQyxJQUE5QixFQUFvQ0MsSUFBcEMsRUFBMEM7QUFDeEM7QUFDQSxVQUFJQSxLQUFLQyxNQUFMLElBQWUsSUFBZixJQUF1QkQsS0FBS0UsVUFBTCxLQUFvQixNQUEvQyxFQUF1RDs7QUFFdkQsVUFBSSxDQUFDRixLQUFLRyxVQUFMLENBQ0VDLElBREYsQ0FDTyxVQUFVQyxFQUFWLEVBQWM7QUFBRSxlQUFPQSxHQUFHTixJQUFILEtBQVlBLElBQW5CO0FBQXlCLE9BRGhELENBQUwsRUFDd0Q7QUFDdEQsZUFEc0QsQ0FDL0M7QUFDUjs7QUFFRCxZQUFNTyxVQUFVQyxvQkFBUUMsR0FBUixDQUFZUixLQUFLQyxNQUFMLENBQVlRLEtBQXhCLEVBQStCYixPQUEvQixDQUFoQjtBQUNBLFVBQUlVLFdBQVcsSUFBZixFQUFxQjs7QUFFckIsVUFBSUEsUUFBUUksTUFBUixDQUFlQyxNQUFuQixFQUEyQjtBQUN6QkwsZ0JBQVFNLFlBQVIsQ0FBcUJoQixPQUFyQixFQUE4QkksSUFBOUI7QUFDQTtBQUNEOztBQUVEQSxXQUFLRyxVQUFMLENBQWdCVSxPQUFoQixDQUF3QixVQUFVUixFQUFWLEVBQWM7QUFDcEMsWUFBSUEsR0FBR04sSUFBSCxLQUFZQSxJQUFoQixFQUFzQjs7QUFFdEIsY0FBTWUsYUFBYVIsUUFBUVMsT0FBUixDQUFnQlYsR0FBR1AsR0FBSCxFQUFRa0IsSUFBeEIsQ0FBbkI7O0FBRUEsWUFBSSxDQUFDRixXQUFXRyxLQUFoQixFQUF1QjtBQUNyQixjQUFJSCxXQUFXekIsSUFBWCxDQUFnQnNCLE1BQWhCLEdBQXlCLENBQTdCLEVBQWdDO0FBQzlCLGtCQUFNTyxXQUFXSixXQUFXekIsSUFBWCxDQUNkOEIsR0FEYyxDQUNWQyxLQUFLL0IsS0FBS2dDLFFBQUwsQ0FBY2hDLEtBQUtpQyxPQUFMLENBQWExQixRQUFRMkIsV0FBUixFQUFiLENBQWQsRUFBbURILEVBQUUvQixJQUFyRCxDQURLLEVBRWRtQyxJQUZjLENBRVQsTUFGUyxDQUFqQjs7QUFJQTVCLG9CQUFRNkIsTUFBUixDQUFlcEIsR0FBR1AsR0FBSCxDQUFmLEVBQ0csR0FBRU8sR0FBR1AsR0FBSCxFQUFRa0IsSUFBSyxrQkFBaUJFLFFBQVMsRUFENUM7QUFFRCxXQVBELE1BT087QUFDTHRCLG9CQUFRNkIsTUFBUixDQUFlcEIsR0FBR1AsR0FBSCxDQUFmLEVBQ0VPLEdBQUdQLEdBQUgsRUFBUWtCLElBQVIsR0FBZSxrQkFBZixHQUFvQ2hCLEtBQUtDLE1BQUwsQ0FBWVEsS0FBaEQsR0FBd0QsSUFEMUQ7QUFFRDtBQUNGO0FBQ0YsT0FsQkQ7QUFtQkQ7O0FBRUQsV0FBTztBQUNMLDJCQUFxQlosZ0JBQWdCNkIsSUFBaEIsQ0FBc0IsSUFBdEIsRUFDc0IsVUFEdEIsRUFFc0IsaUJBRnRCLENBRGhCOztBQU1MLGdDQUEwQjdCLGdCQUFnQjZCLElBQWhCLENBQXNCLElBQXRCLEVBQ3NCLE9BRHRCLEVBRXNCLGlCQUZ0QjtBQU5yQixLQUFQO0FBWUQ7QUExRGMsQ0FBakIiLCJmaWxlIjoicnVsZXMvbmFtZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgRXhwb3J0cyBmcm9tICcuLi9FeHBvcnRNYXAnXG5pbXBvcnQgZG9jc1VybCBmcm9tICcuLi9kb2NzVXJsJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHtcbiAgICAgIHVybDogZG9jc1VybCgnbmFtZWQnKSxcbiAgICB9LFxuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBmdW5jdGlvbiBjaGVja1NwZWNpZmllcnMoa2V5LCB0eXBlLCBub2RlKSB7XG4gICAgICAvLyBpZ25vcmUgbG9jYWwgZXhwb3J0cyBhbmQgdHlwZSBpbXBvcnRzXG4gICAgICBpZiAobm9kZS5zb3VyY2UgPT0gbnVsbCB8fCBub2RlLmltcG9ydEtpbmQgPT09ICd0eXBlJykgcmV0dXJuXG5cbiAgICAgIGlmICghbm9kZS5zcGVjaWZpZXJzXG4gICAgICAgICAgICAuc29tZShmdW5jdGlvbiAoaW0pIHsgcmV0dXJuIGltLnR5cGUgPT09IHR5cGUgfSkpIHtcbiAgICAgICAgcmV0dXJuIC8vIG5vIG5hbWVkIGltcG9ydHMvZXhwb3J0c1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbXBvcnRzID0gRXhwb3J0cy5nZXQobm9kZS5zb3VyY2UudmFsdWUsIGNvbnRleHQpXG4gICAgICBpZiAoaW1wb3J0cyA9PSBudWxsKSByZXR1cm5cblxuICAgICAgaWYgKGltcG9ydHMuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICBpbXBvcnRzLnJlcG9ydEVycm9ycyhjb250ZXh0LCBub2RlKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbm9kZS5zcGVjaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKGltKSB7XG4gICAgICAgIGlmIChpbS50eXBlICE9PSB0eXBlKSByZXR1cm5cblxuICAgICAgICBjb25zdCBkZWVwTG9va3VwID0gaW1wb3J0cy5oYXNEZWVwKGltW2tleV0ubmFtZSlcblxuICAgICAgICBpZiAoIWRlZXBMb29rdXAuZm91bmQpIHtcbiAgICAgICAgICBpZiAoZGVlcExvb2t1cC5wYXRoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlZXBQYXRoID0gZGVlcExvb2t1cC5wYXRoXG4gICAgICAgICAgICAgIC5tYXAoaSA9PiBwYXRoLnJlbGF0aXZlKHBhdGguZGlybmFtZShjb250ZXh0LmdldEZpbGVuYW1lKCkpLCBpLnBhdGgpKVxuICAgICAgICAgICAgICAuam9pbignIC0+ICcpXG5cbiAgICAgICAgICAgIGNvbnRleHQucmVwb3J0KGltW2tleV0sXG4gICAgICAgICAgICAgIGAke2ltW2tleV0ubmFtZX0gbm90IGZvdW5kIHZpYSAke2RlZXBQYXRofWApXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVwb3J0KGltW2tleV0sXG4gICAgICAgICAgICAgIGltW2tleV0ubmFtZSArICcgbm90IGZvdW5kIGluIFxcJycgKyBub2RlLnNvdXJjZS52YWx1ZSArICdcXCcnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgJ0ltcG9ydERlY2xhcmF0aW9uJzogY2hlY2tTcGVjaWZpZXJzLmJpbmQoIG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAnaW1wb3J0ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgJ0ltcG9ydFNwZWNpZmllcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcblxuICAgICAgJ0V4cG9ydE5hbWVkRGVjbGFyYXRpb24nOiBjaGVja1NwZWNpZmllcnMuYmluZCggbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgJ2xvY2FsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgJ0V4cG9ydFNwZWNpZmllcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgIH1cblxuICB9LFxufVxuIl19