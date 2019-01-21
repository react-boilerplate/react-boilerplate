'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sumBy = require('lodash/sumBy');

var _sumBy2 = _interopRequireDefault(_sumBy);

var _resolve = require('eslint-module-utils/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _moduleVisitor = require('eslint-module-utils/moduleVisitor');

var _moduleVisitor2 = _interopRequireDefault(_moduleVisitor);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * convert a potentially relative path from node utils into a true
 * relative path.
 *
 * ../ -> ..
 * ./ -> .
 * .foo/bar -> ./.foo/bar
 * ..foo/bar -> ./..foo/bar
 * foo/bar -> ./foo/bar
 *
 * @param rel {string} relative posix path potentially missing leading './'
 * @returns {string} relative posix path that always starts with a ./
 **/
function toRel(rel) {
  const stripped = rel.replace(/\/$/g, '');
  return (/^((\.\.)|(\.))($|\/)/.test(stripped) ? stripped : `./${stripped}`
  );
} /**
   * @fileOverview Ensures that there are no useless path segments
   * @author Thomas Grainger
   */

function normalize(fn) {
  return toRel(_path2.default.posix.normalize(fn));
}

const countRelParent = x => (0, _sumBy2.default)(x, v => v === '..');

module.exports = {
  meta: {
    docs: {
      url: (0, _docsUrl2.default)('no-useless-path-segments')
    },

    fixable: 'code'
  },

  create: function (context) {
    const currentDir = _path2.default.dirname(context.getFilename());

    function checkSourceValue(source) {
      const value = source.value;


      function report(proposed) {
        context.report({
          node: source,
          message: `Useless path segments for "${value}", should be "${proposed}"`,
          fix: fixer => fixer.replaceText(source, JSON.stringify(proposed))
        });
      }

      if (!value.startsWith('.')) {
        return;
      }

      const resolvedPath = (0, _resolve2.default)(value, context);
      const normed = normalize(value);
      if (normed !== value && resolvedPath === (0, _resolve2.default)(normed, context)) {
        return report(normed);
      }

      if (value.startsWith('./')) {
        return;
      }

      if (resolvedPath === undefined) {
        return;
      }

      const expected = _path2.default.relative(currentDir, resolvedPath);
      const expectedSplit = expected.split(_path2.default.sep);
      const valueSplit = value.replace(/^\.\//, '').split('/');
      const valueNRelParents = countRelParent(valueSplit);
      const expectedNRelParents = countRelParent(expectedSplit);
      const diff = valueNRelParents - expectedNRelParents;

      if (diff <= 0) {
        return;
      }

      return report(toRel(valueSplit.slice(0, expectedNRelParents).concat(valueSplit.slice(valueNRelParents + diff)).join('/')));
    }

    return (0, _moduleVisitor2.default)(checkSourceValue, context.options[0]);
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLXVzZWxlc3MtcGF0aC1zZWdtZW50cy5qcyJdLCJuYW1lcyI6WyJ0b1JlbCIsInJlbCIsInN0cmlwcGVkIiwicmVwbGFjZSIsInRlc3QiLCJub3JtYWxpemUiLCJmbiIsInBhdGgiLCJwb3NpeCIsImNvdW50UmVsUGFyZW50IiwieCIsInYiLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJ1cmwiLCJmaXhhYmxlIiwiY3JlYXRlIiwiY29udGV4dCIsImN1cnJlbnREaXIiLCJkaXJuYW1lIiwiZ2V0RmlsZW5hbWUiLCJjaGVja1NvdXJjZVZhbHVlIiwic291cmNlIiwidmFsdWUiLCJyZXBvcnQiLCJwcm9wb3NlZCIsIm5vZGUiLCJtZXNzYWdlIiwiZml4IiwiZml4ZXIiLCJyZXBsYWNlVGV4dCIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdGFydHNXaXRoIiwicmVzb2x2ZWRQYXRoIiwibm9ybWVkIiwidW5kZWZpbmVkIiwiZXhwZWN0ZWQiLCJyZWxhdGl2ZSIsImV4cGVjdGVkU3BsaXQiLCJzcGxpdCIsInNlcCIsInZhbHVlU3BsaXQiLCJ2YWx1ZU5SZWxQYXJlbnRzIiwiZXhwZWN0ZWROUmVsUGFyZW50cyIsImRpZmYiLCJzbGljZSIsImNvbmNhdCIsImpvaW4iLCJvcHRpb25zIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7O0FBYUEsU0FBU0EsS0FBVCxDQUFlQyxHQUFmLEVBQW9CO0FBQ2xCLFFBQU1DLFdBQVdELElBQUlFLE9BQUosQ0FBWSxNQUFaLEVBQW9CLEVBQXBCLENBQWpCO0FBQ0EsU0FBTyx3QkFBdUJDLElBQXZCLENBQTRCRixRQUE1QixJQUF3Q0EsUUFBeEMsR0FBb0QsS0FBSUEsUUFBUztBQUF4RTtBQUNELEMsQ0EzQkQ7Ozs7O0FBNkJBLFNBQVNHLFNBQVQsQ0FBbUJDLEVBQW5CLEVBQXVCO0FBQ3JCLFNBQU9OLE1BQU1PLGVBQUtDLEtBQUwsQ0FBV0gsU0FBWCxDQUFxQkMsRUFBckIsQ0FBTixDQUFQO0FBQ0Q7O0FBRUQsTUFBTUcsaUJBQWlCQyxLQUFLLHFCQUFNQSxDQUFOLEVBQVNDLEtBQUtBLE1BQU0sSUFBcEIsQ0FBNUI7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsUUFBTTtBQUNKQyxVQUFNO0FBQ0pDLFdBQUssdUJBQVEsMEJBQVI7QUFERCxLQURGOztBQUtKQyxhQUFTO0FBTEwsR0FEUzs7QUFTZkMsVUFBUSxVQUFVQyxPQUFWLEVBQW1CO0FBQ3pCLFVBQU1DLGFBQWFiLGVBQUtjLE9BQUwsQ0FBYUYsUUFBUUcsV0FBUixFQUFiLENBQW5COztBQUVBLGFBQVNDLGdCQUFULENBQTBCQyxNQUExQixFQUFrQztBQUFBLFlBQ3hCQyxLQUR3QixHQUNkRCxNQURjLENBQ3hCQyxLQUR3Qjs7O0FBR2hDLGVBQVNDLE1BQVQsQ0FBZ0JDLFFBQWhCLEVBQTBCO0FBQ3hCUixnQkFBUU8sTUFBUixDQUFlO0FBQ2JFLGdCQUFNSixNQURPO0FBRWJLLG1CQUFVLDhCQUE2QkosS0FBTSxpQkFBZ0JFLFFBQVMsR0FGekQ7QUFHYkcsZUFBS0MsU0FBU0EsTUFBTUMsV0FBTixDQUFrQlIsTUFBbEIsRUFBMEJTLEtBQUtDLFNBQUwsQ0FBZVAsUUFBZixDQUExQjtBQUhELFNBQWY7QUFLRDs7QUFFRCxVQUFJLENBQUNGLE1BQU1VLFVBQU4sQ0FBaUIsR0FBakIsQ0FBTCxFQUE0QjtBQUMxQjtBQUNEOztBQUVELFlBQU1DLGVBQWUsdUJBQVFYLEtBQVIsRUFBZU4sT0FBZixDQUFyQjtBQUNBLFlBQU1rQixTQUFTaEMsVUFBVW9CLEtBQVYsQ0FBZjtBQUNBLFVBQUlZLFdBQVdaLEtBQVgsSUFBb0JXLGlCQUFpQix1QkFBUUMsTUFBUixFQUFnQmxCLE9BQWhCLENBQXpDLEVBQW1FO0FBQ2pFLGVBQU9PLE9BQU9XLE1BQVAsQ0FBUDtBQUNEOztBQUVELFVBQUlaLE1BQU1VLFVBQU4sQ0FBaUIsSUFBakIsQ0FBSixFQUE0QjtBQUMxQjtBQUNEOztBQUVELFVBQUlDLGlCQUFpQkUsU0FBckIsRUFBZ0M7QUFDOUI7QUFDRDs7QUFFRCxZQUFNQyxXQUFXaEMsZUFBS2lDLFFBQUwsQ0FBY3BCLFVBQWQsRUFBMEJnQixZQUExQixDQUFqQjtBQUNBLFlBQU1LLGdCQUFnQkYsU0FBU0csS0FBVCxDQUFlbkMsZUFBS29DLEdBQXBCLENBQXRCO0FBQ0EsWUFBTUMsYUFBYW5CLE1BQU10QixPQUFOLENBQWMsT0FBZCxFQUF1QixFQUF2QixFQUEyQnVDLEtBQTNCLENBQWlDLEdBQWpDLENBQW5CO0FBQ0EsWUFBTUcsbUJBQW1CcEMsZUFBZW1DLFVBQWYsQ0FBekI7QUFDQSxZQUFNRSxzQkFBc0JyQyxlQUFlZ0MsYUFBZixDQUE1QjtBQUNBLFlBQU1NLE9BQU9GLG1CQUFtQkMsbUJBQWhDOztBQUVBLFVBQUlDLFFBQVEsQ0FBWixFQUFlO0FBQ2I7QUFDRDs7QUFFRCxhQUFPckIsT0FDTDFCLE1BQU00QyxXQUNISSxLQURHLENBQ0csQ0FESCxFQUNNRixtQkFETixFQUVIRyxNQUZHLENBRUlMLFdBQVdJLEtBQVgsQ0FBaUJILG1CQUFtQkUsSUFBcEMsQ0FGSixFQUdIRyxJQUhHLENBR0UsR0FIRixDQUFOLENBREssQ0FBUDtBQU1EOztBQUVELFdBQU8sNkJBQWMzQixnQkFBZCxFQUFnQ0osUUFBUWdDLE9BQVIsQ0FBZ0IsQ0FBaEIsQ0FBaEMsQ0FBUDtBQUNEO0FBN0RjLENBQWpCIiwiZmlsZSI6InJ1bGVzL25vLXVzZWxlc3MtcGF0aC1zZWdtZW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVPdmVydmlldyBFbnN1cmVzIHRoYXQgdGhlcmUgYXJlIG5vIHVzZWxlc3MgcGF0aCBzZWdtZW50c1xuICogQGF1dGhvciBUaG9tYXMgR3JhaW5nZXJcbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHN1bUJ5IGZyb20gJ2xvZGFzaC9zdW1CeSdcbmltcG9ydCByZXNvbHZlIGZyb20gJ2VzbGludC1tb2R1bGUtdXRpbHMvcmVzb2x2ZSdcbmltcG9ydCBtb2R1bGVWaXNpdG9yIGZyb20gJ2VzbGludC1tb2R1bGUtdXRpbHMvbW9kdWxlVmlzaXRvcidcbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5cbi8qKlxuICogY29udmVydCBhIHBvdGVudGlhbGx5IHJlbGF0aXZlIHBhdGggZnJvbSBub2RlIHV0aWxzIGludG8gYSB0cnVlXG4gKiByZWxhdGl2ZSBwYXRoLlxuICpcbiAqIC4uLyAtPiAuLlxuICogLi8gLT4gLlxuICogLmZvby9iYXIgLT4gLi8uZm9vL2JhclxuICogLi5mb28vYmFyIC0+IC4vLi5mb28vYmFyXG4gKiBmb28vYmFyIC0+IC4vZm9vL2JhclxuICpcbiAqIEBwYXJhbSByZWwge3N0cmluZ30gcmVsYXRpdmUgcG9zaXggcGF0aCBwb3RlbnRpYWxseSBtaXNzaW5nIGxlYWRpbmcgJy4vJ1xuICogQHJldHVybnMge3N0cmluZ30gcmVsYXRpdmUgcG9zaXggcGF0aCB0aGF0IGFsd2F5cyBzdGFydHMgd2l0aCBhIC4vXG4gKiovXG5mdW5jdGlvbiB0b1JlbChyZWwpIHtcbiAgY29uc3Qgc3RyaXBwZWQgPSByZWwucmVwbGFjZSgvXFwvJC9nLCAnJylcbiAgcmV0dXJuIC9eKChcXC5cXC4pfChcXC4pKSgkfFxcLykvLnRlc3Qoc3RyaXBwZWQpID8gc3RyaXBwZWQgOiBgLi8ke3N0cmlwcGVkfWBcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplKGZuKSB7XG4gIHJldHVybiB0b1JlbChwYXRoLnBvc2l4Lm5vcm1hbGl6ZShmbikpXG59XG5cbmNvbnN0IGNvdW50UmVsUGFyZW50ID0geCA9PiBzdW1CeSh4LCB2ID0+IHYgPT09ICcuLicpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgZG9jczoge1xuICAgICAgdXJsOiBkb2NzVXJsKCduby11c2VsZXNzLXBhdGgtc2VnbWVudHMnKSxcbiAgICB9LFxuXG4gICAgZml4YWJsZTogJ2NvZGUnLFxuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBjb25zdCBjdXJyZW50RGlyID0gcGF0aC5kaXJuYW1lKGNvbnRleHQuZ2V0RmlsZW5hbWUoKSlcblxuICAgIGZ1bmN0aW9uIGNoZWNrU291cmNlVmFsdWUoc291cmNlKSB7XG4gICAgICBjb25zdCB7IHZhbHVlIH0gPSBzb3VyY2VcblxuICAgICAgZnVuY3Rpb24gcmVwb3J0KHByb3Bvc2VkKSB7XG4gICAgICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgICAgICBub2RlOiBzb3VyY2UsXG4gICAgICAgICAgbWVzc2FnZTogYFVzZWxlc3MgcGF0aCBzZWdtZW50cyBmb3IgXCIke3ZhbHVlfVwiLCBzaG91bGQgYmUgXCIke3Byb3Bvc2VkfVwiYCxcbiAgICAgICAgICBmaXg6IGZpeGVyID0+IGZpeGVyLnJlcGxhY2VUZXh0KHNvdXJjZSwgSlNPTi5zdHJpbmdpZnkocHJvcG9zZWQpKSxcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKCF2YWx1ZS5zdGFydHNXaXRoKCcuJykpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc29sdmVkUGF0aCA9IHJlc29sdmUodmFsdWUsIGNvbnRleHQpXG4gICAgICBjb25zdCBub3JtZWQgPSBub3JtYWxpemUodmFsdWUpXG4gICAgICBpZiAobm9ybWVkICE9PSB2YWx1ZSAmJiByZXNvbHZlZFBhdGggPT09IHJlc29sdmUobm9ybWVkLCBjb250ZXh0KSkge1xuICAgICAgICByZXR1cm4gcmVwb3J0KG5vcm1lZClcbiAgICAgIH1cblxuICAgICAgaWYgKHZhbHVlLnN0YXJ0c1dpdGgoJy4vJykpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChyZXNvbHZlZFBhdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBwYXRoLnJlbGF0aXZlKGN1cnJlbnREaXIsIHJlc29sdmVkUGF0aClcbiAgICAgIGNvbnN0IGV4cGVjdGVkU3BsaXQgPSBleHBlY3RlZC5zcGxpdChwYXRoLnNlcClcbiAgICAgIGNvbnN0IHZhbHVlU3BsaXQgPSB2YWx1ZS5yZXBsYWNlKC9eXFwuXFwvLywgJycpLnNwbGl0KCcvJylcbiAgICAgIGNvbnN0IHZhbHVlTlJlbFBhcmVudHMgPSBjb3VudFJlbFBhcmVudCh2YWx1ZVNwbGl0KVxuICAgICAgY29uc3QgZXhwZWN0ZWROUmVsUGFyZW50cyA9IGNvdW50UmVsUGFyZW50KGV4cGVjdGVkU3BsaXQpXG4gICAgICBjb25zdCBkaWZmID0gdmFsdWVOUmVsUGFyZW50cyAtIGV4cGVjdGVkTlJlbFBhcmVudHNcblxuICAgICAgaWYgKGRpZmYgPD0gMCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlcG9ydChcbiAgICAgICAgdG9SZWwodmFsdWVTcGxpdFxuICAgICAgICAgIC5zbGljZSgwLCBleHBlY3RlZE5SZWxQYXJlbnRzKVxuICAgICAgICAgIC5jb25jYXQodmFsdWVTcGxpdC5zbGljZSh2YWx1ZU5SZWxQYXJlbnRzICsgZGlmZikpXG4gICAgICAgICAgLmpvaW4oJy8nKSlcbiAgICAgIClcbiAgICB9XG5cbiAgICByZXR1cm4gbW9kdWxlVmlzaXRvcihjaGVja1NvdXJjZVZhbHVlLCBjb250ZXh0Lm9wdGlvbnNbMF0pXG4gIH0sXG59XG4iXX0=