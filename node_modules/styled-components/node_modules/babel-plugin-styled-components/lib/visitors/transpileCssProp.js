"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperModuleImports = require("@babel/helper-module-imports");

var _options = require("../utils/options");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getName = function getName(node, t) {
  if (typeof node.name === 'string') return node.name;

  if (t.isJSXMemberExpression(node)) {
    return `${getName(node.object, t)}.${node.property.name}`;
  }

  throw path.buildCodeFrameError(`Cannot infer name from node with type "${node.type}". Please submit an issue at github.com/styled-components/babel-plugin-styled-components with your code so we can take a look at your use case!`);
};

var _default = function _default(t) {
  return function (path, state) {
    if (!(0, _options.useCssProp)(state)) return;
    if (path.node.name.name !== 'css') return;
    var program = state.file.path; // state.customImportName is passed through from styled-components/macro if it's used
    // since the macro also inserts the import

    var importName = state.customImportName; // Insert import if it doesn't exist yet

    var bindings = program.scope.bindings;

    if (!importName || !bindings[importName.name]) {
      importName = (0, _helperModuleImports.addDefault)(path, 'styled-components', {
        nameHint: importName ? importName.name : 'styled'
      });
    }

    if (!state.customImportName) state.customImportName = importName;
    var elem = path.parentPath;
    var name = getName(elem.node.name, t);
    var id = path.scope.generateUidIdentifier('Styled' + name.replace(/^([a-z])/, function (match, p1) {
      return p1.toUpperCase();
    }));
    var styled = t.callExpression(importName, [/^[a-z]/.test(name) ? t.stringLiteral(name) : t.identifier(name)]);
    var css;

    if (t.isStringLiteral(path.node.value)) {
      css = t.templateLiteral([t.templateElement({
        raw: path.node.value.value,
        cooked: path.node.value.value
      }, true)], []);
    } else if (t.isJSXExpressionContainer(path.node.value)) {
      if (t.isTemplateLiteral(path.node.value.expression)) {
        css = path.node.value.expression;
      } else if (t.isTaggedTemplateExpression(path.node.value.expression) && path.node.value.expression.tag.name === 'css') {
        css = path.node.value.expression.quasi;
      } else {
        css = t.templateLiteral([t.templateElement({
          raw: '',
          cooked: ''
        }, false), t.templateElement({
          raw: '',
          cooked: ''
        }, true)], [path.node.value.expression]);
      }
    }

    if (!css) return;
    elem.node.attributes = elem.node.attributes.filter(function (attr) {
      return attr !== path.node;
    });
    elem.node.name = t.jSXIdentifier(id.name);

    if (elem.parentPath.node.closingElement) {
      elem.parentPath.node.closingElement.name = t.jSXIdentifier(id.name);
    }

    css.expressions = css.expressions.reduce(function (acc, ex) {
      if (Object.entries(bindings).some(function (_ref
      /*: any */
      ) {
        var _ref2 = _slicedToArray(_ref, 2),
            b = _ref2[1];

        return b.referencePaths.find(function (p) {
          return p.node === ex;
        });
      }) || t.isFunctionExpression(ex) || t.isArrowFunctionExpression(ex)) {
        acc.push(ex);
      } else {
        var _name = path.scope.generateUidIdentifier('css');

        var p = t.identifier('p');
        elem.node.attributes.push(t.jSXAttribute(t.jSXIdentifier(_name.name), t.jSXExpressionContainer(ex)));
        acc.push(t.arrowFunctionExpression([p], t.memberExpression(p, _name)));
      }

      return acc;
    }, []); // Add the tagged template expression and then requeue the newly added node
    // so Babel runs over it again

    var length = program.node.body.push(t.variableDeclaration('var', [t.variableDeclarator(id, t.taggedTemplateExpression(styled, css))]));
    program.requeue(program.get('body')[length - 1]);
  };
};

exports.default = _default;