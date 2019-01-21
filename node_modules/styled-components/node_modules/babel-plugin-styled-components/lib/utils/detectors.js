"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPureHelper = exports.isHelper = exports.isKeyframesHelper = exports.isInjectGlobalHelper = exports.isCreateGlobalStyleHelper = exports.isCSSHelper = exports.isStyled = exports.isValidTopLevelImport = void 0;
var VALID_TOP_LEVEL_IMPORT_PATHS = ['styled-components', 'styled-components/no-tags', 'styled-components/native', 'styled-components/primitives'];

var isValidTopLevelImport = function isValidTopLevelImport(x) {
  return VALID_TOP_LEVEL_IMPORT_PATHS.includes(x);
};

exports.isValidTopLevelImport = isValidTopLevelImport;
var localNameCache = {};

var importLocalName = function importLocalName(name, state) {
  var cacheKey = name + state.file.opts.filename;

  if (localNameCache[cacheKey]) {
    return localNameCache[cacheKey];
  }

  var localName = name === 'default' ? 'styled' : name;
  state.file.path.traverse({
    ImportDeclaration: {
      exit(path) {
        var node = path.node;

        if (isValidTopLevelImport(node.source.value)) {
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
              if (!_iteratorNormalCompletion && _iterator.return != null) {
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
  localNameCache[cacheKey] = localName;
  return localName;
};

var isStyled = function isStyled(t) {
  return function (tag, state) {
    if (t.isCallExpression(tag) && t.isMemberExpression(tag.callee) && tag.callee.property.name !== 'default'
    /** ignore default for #93 below */
    ) {
        // styled.something()
        return isStyled(t)(tag.callee.object, state);
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
};

exports.isStyled = isStyled;

var isCSSHelper = function isCSSHelper(t) {
  return function (tag, state) {
    return t.isIdentifier(tag) && tag.name === importLocalName('css', state);
  };
};

exports.isCSSHelper = isCSSHelper;

var isCreateGlobalStyleHelper = function isCreateGlobalStyleHelper(t) {
  return function (tag, state) {
    return t.isIdentifier(tag) && tag.name === importLocalName('createGlobalStyle', state);
  };
};

exports.isCreateGlobalStyleHelper = isCreateGlobalStyleHelper;

var isInjectGlobalHelper = function isInjectGlobalHelper(t) {
  return function (tag, state) {
    return t.isIdentifier(tag) && tag.name === importLocalName('injectGlobal', state);
  };
};

exports.isInjectGlobalHelper = isInjectGlobalHelper;

var isKeyframesHelper = function isKeyframesHelper(t) {
  return function (tag, state) {
    return t.isIdentifier(tag) && tag.name === importLocalName('keyframes', state);
  };
};

exports.isKeyframesHelper = isKeyframesHelper;

var isHelper = function isHelper(t) {
  return function (tag, state) {
    return isCSSHelper(t)(tag, state) || isKeyframesHelper(t)(tag, state);
  };
};

exports.isHelper = isHelper;

var isPureHelper = function isPureHelper(t) {
  return function (tag, state) {
    return isCSSHelper(t)(tag, state) || isKeyframesHelper(t)(tag, state) || isCreateGlobalStyleHelper(t)(tag, state);
  };
};

exports.isPureHelper = isPureHelper;