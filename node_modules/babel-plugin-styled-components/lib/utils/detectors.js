'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHelper = exports.isKeyframesHelper = exports.isInjectGlobalHelper = exports.isCSSHelper = exports.isStyled = undefined;

var _babelTypes = require('babel-types');

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var importLocalName = function importLocalName(name, state) {
  var localName = name === 'default' ? 'styled' : name;

  state.file.path.traverse({
    ImportDeclaration: {
      exit(path) {
        var node = path.node;


        if (node.source.value === 'styled-components') {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = path.get('specifiers')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var specifier = _step.value;

              if (specifier.isImportDefaultSpecifier()) {
                localName = specifier.node.local.name;
              }

              if (specifier.isImportSpecifier() && specifier.node.imported.name === name) {
                localName = specifier.node.local.name;
              }

              if (specifier.isImportNamespaceSpecifier()) {
                localName = specifier.node.local.name;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }
    }
  });

  return localName;
};

var isStyled = exports.isStyled = function isStyled(tag, state) {
  if (t.isCallExpression(tag) && t.isMemberExpression(tag.callee) && tag.callee.property.name !== 'default' /** ignore default for #93 below */) {
      // styled.something()
      return isStyled(tag.callee.object, state);
    } else {
    return t.isMemberExpression(tag) && tag.object.name === importLocalName('default', state) || t.isCallExpression(tag) && tag.callee.name === importLocalName('default', state) ||

    /**
     * #93 Support require()
     * styled-components might be imported using a require()
     * call and assigned to a variable of any name.
     * - styled.default.div``
     * - styled.default.something()
     */
    state.styledRequired && t.isMemberExpression(tag) && t.isMemberExpression(tag.object) && tag.object.property.name === 'default' && tag.object.object.name === state.styledRequired || state.styledRequired && t.isCallExpression(tag) && t.isMemberExpression(tag.callee) && tag.callee.property.name === 'default' && tag.callee.object.name === state.styledRequired;
  }
};

var isCSSHelper = exports.isCSSHelper = function isCSSHelper(tag, state) {
  return t.isIdentifier(tag) && tag.name === importLocalName('css', state);
};

var isInjectGlobalHelper = exports.isInjectGlobalHelper = function isInjectGlobalHelper(tag, state) {
  return t.isIdentifier(tag) && tag.name === importLocalName('injectGlobal', state);
};

var isKeyframesHelper = exports.isKeyframesHelper = function isKeyframesHelper(tag, state) {
  return t.isIdentifier(tag) && tag.name === importLocalName('keyframes', state);
};

var isHelper = exports.isHelper = function isHelper(tag, state) {
  return isCSSHelper(tag, state) || isKeyframesHelper(tag, state);
};