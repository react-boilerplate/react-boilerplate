'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @fileOverview Ensures that no imported module imports the linted module.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @author Ben Mosher
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _moduleVisitor = require('eslint-module-utils/moduleVisitor');

var _moduleVisitor2 = _interopRequireDefault(_moduleVisitor);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// todo: cache cycles / deep relationships for faster repeat evaluation
module.exports = {
  meta: {
    docs: { url: (0, _docsUrl2.default)('no-cycle') },
    schema: [(0, _moduleVisitor.makeOptionsSchema)({
      maxDepth: {
        description: 'maximum dependency depth to traverse',
        type: 'integer',
        minimum: 1
      }
    })]
  },

  create: function (context) {
    const myPath = context.getFilename();
    if (myPath === '<text>') return {}; // can't cycle-check a non-file

    const options = context.options[0] || {};
    const maxDepth = options.maxDepth || Infinity;

    function checkSourceValue(sourceNode, importer) {
      const imported = _ExportMap2.default.get(sourceNode.value, context);

      if (imported == null) {
        return; // no-unresolved territory
      }

      if (imported.path === myPath) {
        return; // no-self-import territory
      }

      const untraversed = [{ mget: () => imported, route: [] }];
      const traversed = new Set();
      function detectCycle(_ref) {
        let mget = _ref.mget,
            route = _ref.route;

        const m = mget();
        if (m == null) return;
        if (traversed.has(m.path)) return;
        traversed.add(m.path);

        for (let _ref2 of m.imports) {
          var _ref3 = _slicedToArray(_ref2, 2);

          let path = _ref3[0];
          var _ref3$ = _ref3[1];
          let getter = _ref3$.getter;
          let source = _ref3$.source;

          if (path === myPath) return true;
          if (traversed.has(path)) continue;
          if (route.length + 1 < maxDepth) {
            untraversed.push({
              mget: getter,
              route: route.concat(source)
            });
          }
        }
      }

      while (untraversed.length > 0) {
        const next = untraversed.shift(); // bfs!
        if (detectCycle(next)) {
          const message = next.route.length > 0 ? `Dependency cycle via ${routeString(next.route)}` : 'Dependency cycle detected.';
          context.report(importer, message);
          return;
        }
      }
    }

    return (0, _moduleVisitor2.default)(checkSourceValue, context.options[0]);
  }
};

function routeString(route) {
  return route.map(s => `${s.value}:${s.loc.start.line}`).join('=>');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLWN5Y2xlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJtZXRhIiwiZG9jcyIsInVybCIsInNjaGVtYSIsIm1heERlcHRoIiwiZGVzY3JpcHRpb24iLCJ0eXBlIiwibWluaW11bSIsImNyZWF0ZSIsImNvbnRleHQiLCJteVBhdGgiLCJnZXRGaWxlbmFtZSIsIm9wdGlvbnMiLCJJbmZpbml0eSIsImNoZWNrU291cmNlVmFsdWUiLCJzb3VyY2VOb2RlIiwiaW1wb3J0ZXIiLCJpbXBvcnRlZCIsIkV4cG9ydHMiLCJnZXQiLCJ2YWx1ZSIsInBhdGgiLCJ1bnRyYXZlcnNlZCIsIm1nZXQiLCJyb3V0ZSIsInRyYXZlcnNlZCIsIlNldCIsImRldGVjdEN5Y2xlIiwibSIsImhhcyIsImFkZCIsImltcG9ydHMiLCJnZXR0ZXIiLCJzb3VyY2UiLCJsZW5ndGgiLCJwdXNoIiwiY29uY2F0IiwibmV4dCIsInNoaWZ0IiwibWVzc2FnZSIsInJvdXRlU3RyaW5nIiwicmVwb3J0IiwibWFwIiwicyIsImxvYyIsInN0YXJ0IiwibGluZSIsImpvaW4iXSwibWFwcGluZ3MiOiI7O3lwQkFBQTs7Ozs7QUFLQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ0FBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsUUFBTTtBQUNKQyxVQUFNLEVBQUVDLEtBQUssdUJBQVEsVUFBUixDQUFQLEVBREY7QUFFSkMsWUFBUSxDQUFDLHNDQUFrQjtBQUN6QkMsZ0JBQVM7QUFDUEMscUJBQWEsc0NBRE47QUFFUEMsY0FBTSxTQUZDO0FBR1BDLGlCQUFTO0FBSEY7QUFEZ0IsS0FBbEIsQ0FBRDtBQUZKLEdBRFM7O0FBWWZDLFVBQVEsVUFBVUMsT0FBVixFQUFtQjtBQUN6QixVQUFNQyxTQUFTRCxRQUFRRSxXQUFSLEVBQWY7QUFDQSxRQUFJRCxXQUFXLFFBQWYsRUFBeUIsT0FBTyxFQUFQLENBRkEsQ0FFVTs7QUFFbkMsVUFBTUUsVUFBVUgsUUFBUUcsT0FBUixDQUFnQixDQUFoQixLQUFzQixFQUF0QztBQUNBLFVBQU1SLFdBQVdRLFFBQVFSLFFBQVIsSUFBb0JTLFFBQXJDOztBQUVBLGFBQVNDLGdCQUFULENBQTBCQyxVQUExQixFQUFzQ0MsUUFBdEMsRUFBZ0Q7QUFDOUMsWUFBTUMsV0FBV0Msb0JBQVFDLEdBQVIsQ0FBWUosV0FBV0ssS0FBdkIsRUFBOEJYLE9BQTlCLENBQWpCOztBQUVBLFVBQUlRLFlBQVksSUFBaEIsRUFBc0I7QUFDcEIsZUFEb0IsQ0FDWjtBQUNUOztBQUVELFVBQUlBLFNBQVNJLElBQVQsS0FBa0JYLE1BQXRCLEVBQThCO0FBQzVCLGVBRDRCLENBQ3BCO0FBQ1Q7O0FBRUQsWUFBTVksY0FBYyxDQUFDLEVBQUNDLE1BQU0sTUFBTU4sUUFBYixFQUF1Qk8sT0FBTSxFQUE3QixFQUFELENBQXBCO0FBQ0EsWUFBTUMsWUFBWSxJQUFJQyxHQUFKLEVBQWxCO0FBQ0EsZUFBU0MsV0FBVCxPQUFvQztBQUFBLFlBQWRKLElBQWMsUUFBZEEsSUFBYztBQUFBLFlBQVJDLEtBQVEsUUFBUkEsS0FBUTs7QUFDbEMsY0FBTUksSUFBSUwsTUFBVjtBQUNBLFlBQUlLLEtBQUssSUFBVCxFQUFlO0FBQ2YsWUFBSUgsVUFBVUksR0FBVixDQUFjRCxFQUFFUCxJQUFoQixDQUFKLEVBQTJCO0FBQzNCSSxrQkFBVUssR0FBVixDQUFjRixFQUFFUCxJQUFoQjs7QUFFQSwwQkFBdUNPLEVBQUVHLE9BQXpDLEVBQWtEO0FBQUE7O0FBQUEsY0FBeENWLElBQXdDO0FBQUE7QUFBQSxjQUFoQ1csTUFBZ0MsVUFBaENBLE1BQWdDO0FBQUEsY0FBeEJDLE1BQXdCLFVBQXhCQSxNQUF3Qjs7QUFDaEQsY0FBSVosU0FBU1gsTUFBYixFQUFxQixPQUFPLElBQVA7QUFDckIsY0FBSWUsVUFBVUksR0FBVixDQUFjUixJQUFkLENBQUosRUFBeUI7QUFDekIsY0FBSUcsTUFBTVUsTUFBTixHQUFlLENBQWYsR0FBbUI5QixRQUF2QixFQUFpQztBQUMvQmtCLHdCQUFZYSxJQUFaLENBQWlCO0FBQ2ZaLG9CQUFNUyxNQURTO0FBRWZSLHFCQUFPQSxNQUFNWSxNQUFOLENBQWFILE1BQWI7QUFGUSxhQUFqQjtBQUlEO0FBQ0Y7QUFDRjs7QUFFRCxhQUFPWCxZQUFZWSxNQUFaLEdBQXFCLENBQTVCLEVBQStCO0FBQzdCLGNBQU1HLE9BQU9mLFlBQVlnQixLQUFaLEVBQWIsQ0FENkIsQ0FDSTtBQUNqQyxZQUFJWCxZQUFZVSxJQUFaLENBQUosRUFBdUI7QUFDckIsZ0JBQU1FLFVBQVdGLEtBQUtiLEtBQUwsQ0FBV1UsTUFBWCxHQUFvQixDQUFwQixHQUNaLHdCQUF1Qk0sWUFBWUgsS0FBS2IsS0FBakIsQ0FBd0IsRUFEbkMsR0FFYiw0QkFGSjtBQUdBZixrQkFBUWdDLE1BQVIsQ0FBZXpCLFFBQWYsRUFBeUJ1QixPQUF6QjtBQUNBO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFdBQU8sNkJBQWN6QixnQkFBZCxFQUFnQ0wsUUFBUUcsT0FBUixDQUFnQixDQUFoQixDQUFoQyxDQUFQO0FBQ0Q7QUEvRGMsQ0FBakI7O0FBa0VBLFNBQVM0QixXQUFULENBQXFCaEIsS0FBckIsRUFBNEI7QUFDMUIsU0FBT0EsTUFBTWtCLEdBQU4sQ0FBVUMsS0FBTSxHQUFFQSxFQUFFdkIsS0FBTSxJQUFHdUIsRUFBRUMsR0FBRixDQUFNQyxLQUFOLENBQVlDLElBQUssRUFBOUMsRUFBaURDLElBQWpELENBQXNELElBQXRELENBQVA7QUFDRCIsImZpbGUiOiJydWxlcy9uby1jeWNsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVPdmVydmlldyBFbnN1cmVzIHRoYXQgbm8gaW1wb3J0ZWQgbW9kdWxlIGltcG9ydHMgdGhlIGxpbnRlZCBtb2R1bGUuXG4gKiBAYXV0aG9yIEJlbiBNb3NoZXJcbiAqL1xuXG5pbXBvcnQgRXhwb3J0cyBmcm9tICcuLi9FeHBvcnRNYXAnXG5pbXBvcnQgbW9kdWxlVmlzaXRvciwgeyBtYWtlT3B0aW9uc1NjaGVtYSB9IGZyb20gJ2VzbGludC1tb2R1bGUtdXRpbHMvbW9kdWxlVmlzaXRvcidcbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5cbi8vIHRvZG86IGNhY2hlIGN5Y2xlcyAvIGRlZXAgcmVsYXRpb25zaGlwcyBmb3IgZmFzdGVyIHJlcGVhdCBldmFsdWF0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHsgdXJsOiBkb2NzVXJsKCduby1jeWNsZScpIH0sXG4gICAgc2NoZW1hOiBbbWFrZU9wdGlvbnNTY2hlbWEoe1xuICAgICAgbWF4RGVwdGg6e1xuICAgICAgICBkZXNjcmlwdGlvbjogJ21heGltdW0gZGVwZW5kZW5jeSBkZXB0aCB0byB0cmF2ZXJzZScsXG4gICAgICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgbWluaW11bTogMSxcbiAgICAgIH0sXG4gICAgfSldLFxuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBjb25zdCBteVBhdGggPSBjb250ZXh0LmdldEZpbGVuYW1lKClcbiAgICBpZiAobXlQYXRoID09PSAnPHRleHQ+JykgcmV0dXJuIHt9IC8vIGNhbid0IGN5Y2xlLWNoZWNrIGEgbm9uLWZpbGVcblxuICAgIGNvbnN0IG9wdGlvbnMgPSBjb250ZXh0Lm9wdGlvbnNbMF0gfHwge31cbiAgICBjb25zdCBtYXhEZXB0aCA9IG9wdGlvbnMubWF4RGVwdGggfHwgSW5maW5pdHlcblxuICAgIGZ1bmN0aW9uIGNoZWNrU291cmNlVmFsdWUoc291cmNlTm9kZSwgaW1wb3J0ZXIpIHtcbiAgICAgIGNvbnN0IGltcG9ydGVkID0gRXhwb3J0cy5nZXQoc291cmNlTm9kZS52YWx1ZSwgY29udGV4dClcblxuICAgICAgaWYgKGltcG9ydGVkID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICAvLyBuby11bnJlc29sdmVkIHRlcnJpdG9yeVxuICAgICAgfVxuXG4gICAgICBpZiAoaW1wb3J0ZWQucGF0aCA9PT0gbXlQYXRoKSB7XG4gICAgICAgIHJldHVybiAgLy8gbm8tc2VsZi1pbXBvcnQgdGVycml0b3J5XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVudHJhdmVyc2VkID0gW3ttZ2V0OiAoKSA9PiBpbXBvcnRlZCwgcm91dGU6W119XVxuICAgICAgY29uc3QgdHJhdmVyc2VkID0gbmV3IFNldCgpXG4gICAgICBmdW5jdGlvbiBkZXRlY3RDeWNsZSh7bWdldCwgcm91dGV9KSB7XG4gICAgICAgIGNvbnN0IG0gPSBtZ2V0KClcbiAgICAgICAgaWYgKG0gPT0gbnVsbCkgcmV0dXJuXG4gICAgICAgIGlmICh0cmF2ZXJzZWQuaGFzKG0ucGF0aCkpIHJldHVyblxuICAgICAgICB0cmF2ZXJzZWQuYWRkKG0ucGF0aClcblxuICAgICAgICBmb3IgKGxldCBbcGF0aCwgeyBnZXR0ZXIsIHNvdXJjZSB9XSBvZiBtLmltcG9ydHMpIHtcbiAgICAgICAgICBpZiAocGF0aCA9PT0gbXlQYXRoKSByZXR1cm4gdHJ1ZVxuICAgICAgICAgIGlmICh0cmF2ZXJzZWQuaGFzKHBhdGgpKSBjb250aW51ZVxuICAgICAgICAgIGlmIChyb3V0ZS5sZW5ndGggKyAxIDwgbWF4RGVwdGgpIHtcbiAgICAgICAgICAgIHVudHJhdmVyc2VkLnB1c2goe1xuICAgICAgICAgICAgICBtZ2V0OiBnZXR0ZXIsXG4gICAgICAgICAgICAgIHJvdXRlOiByb3V0ZS5jb25jYXQoc291cmNlKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICh1bnRyYXZlcnNlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IG5leHQgPSB1bnRyYXZlcnNlZC5zaGlmdCgpIC8vIGJmcyFcbiAgICAgICAgaWYgKGRldGVjdEN5Y2xlKG5leHQpKSB7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IChuZXh0LnJvdXRlLmxlbmd0aCA+IDBcbiAgICAgICAgICAgID8gYERlcGVuZGVuY3kgY3ljbGUgdmlhICR7cm91dGVTdHJpbmcobmV4dC5yb3V0ZSl9YFxuICAgICAgICAgICAgOiAnRGVwZW5kZW5jeSBjeWNsZSBkZXRlY3RlZC4nKVxuICAgICAgICAgIGNvbnRleHQucmVwb3J0KGltcG9ydGVyLCBtZXNzYWdlKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZHVsZVZpc2l0b3IoY2hlY2tTb3VyY2VWYWx1ZSwgY29udGV4dC5vcHRpb25zWzBdKVxuICB9LFxufVxuXG5mdW5jdGlvbiByb3V0ZVN0cmluZyhyb3V0ZSkge1xuICByZXR1cm4gcm91dGUubWFwKHMgPT4gYCR7cy52YWx1ZX06JHtzLmxvYy5zdGFydC5saW5lfWApLmpvaW4oJz0+Jylcbn1cbiJdfQ==