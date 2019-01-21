"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;

  function createImportDeclaration(polyfill) {
    var declar = t.importDeclaration([], t.stringLiteral(polyfill));
    declar._blockHoist = 3;
    return declar;
  }

  function createRequireStatement(polyfill) {
    return t.expressionStatement(t.callExpression(t.identifier("require"), [t.stringLiteral(polyfill)]));
  }

  function isRequire(path) {
    return t.isExpressionStatement(path.node) && t.isCallExpression(path.node.expression) && t.isIdentifier(path.node.expression.callee) && path.node.expression.callee.name === "require" && path.node.expression.arguments.length === 1 && t.isStringLiteral(path.node.expression.arguments[0]) && isPolyfillSource(path.node.expression.arguments[0].value);
  }

  function createImport(polyfill, requireType, core) {
    if (core) {
      polyfill = "core-js/modules/" + polyfill;
    }

    if (requireType === "import") {
      return createImportDeclaration(polyfill);
    } else {
      return createRequireStatement(polyfill);
    }
  }

  function createImports(polyfills, requireType, regenerator) {
    var imports = polyfills.filter(function (el, i, arr) {
      return arr.indexOf(el) === i;
    }).map(function (polyfill) {
      return createImport(polyfill, requireType, true);
    });

    return [].concat(imports, [regenerator && createImport("regenerator-runtime/runtime", requireType)]).filter(Boolean);
  }

  var isPolyfillImport = {
    ImportDeclaration: function ImportDeclaration(path, state) {
      if (path.node.specifiers.length === 0 && isPolyfillSource(path.node.source.value)) {
        this.numPolyfillImports++;
        if (this.numPolyfillImports > 1) {
          path.remove();
          return;
        }

        path.replaceWithMultiple(createImports(state.opts.polyfills, "import", state.opts.regenerator));
      }
    },
    Program: function Program(path, state) {
      var _this = this;

      if (!state.opts.polyfills) {
        throw path.buildCodeFrameError("\nThere was an issue in \"babel-preset-env\" such that\nthe \"polyfills\" option was not correctly passed\nto the \"transform-polyfill-require\" plugin\n");
      }
      path.get("body").forEach(function (bodyPath) {
        if (isRequire(bodyPath)) {
          _this.numPolyfillImports++;
          if (_this.numPolyfillImports > 1) {
            path.remove();
            return;
          }

          bodyPath.replaceWithMultiple(createImports(state.opts.polyfills, "require", state.opts.regenerator));
        }
      });
    }
  };

  return {
    name: "transform-polyfill-require",
    visitor: isPolyfillImport,
    pre: function pre() {
      this.numPolyfillImports = 0;
    }
  };
};

function isPolyfillSource(value) {
  return value === "babel-polyfill" || value === "core-js";
}