"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _helperPluginUtils() {
  const data = require("@babel/helper-plugin-utils");

  _helperPluginUtils = function () {
    return data;
  };

  return data;
}

function _helperFunctionName() {
  const data = _interopRequireDefault(require("@babel/helper-function-name"));

  _helperFunctionName = function () {
    return data;
  };

  return data;
}

function _pluginSyntaxClassProperties() {
  const data = _interopRequireDefault(require("@babel/plugin-syntax-class-properties"));

  _pluginSyntaxClassProperties = function () {
    return data;
  };

  return data;
}

function _core() {
  const data = require("@babel/core");

  _core = function () {
    return data;
  };

  return data;
}

function _helperReplaceSupers() {
  const data = require("@babel/helper-replace-supers");

  _helperReplaceSupers = function () {
    return data;
  };

  return data;
}

function _helperMemberExpressionToFunctions() {
  const data = _interopRequireDefault(require("@babel/helper-member-expression-to-functions"));

  _helperMemberExpressionToFunctions = function () {
    return data;
  };

  return data;
}

function _helperOptimiseCallExpression() {
  const data = _interopRequireDefault(require("@babel/helper-optimise-call-expression"));

  _helperOptimiseCallExpression = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _helperPluginUtils().declare)((api, options) => {
  api.assertVersion(7);
  const {
    loose
  } = options;

  const findBareSupers = _core().traverse.visitors.merge([{
    Super(path) {
      const {
        node,
        parentPath
      } = path;

      if (parentPath.isCallExpression({
        callee: node
      })) {
        this.push(parentPath);
      }
    }

  }, _helperReplaceSupers().environmentVisitor]);

  const referenceVisitor = {
    "TSTypeAnnotation|TypeAnnotation"(path) {
      path.skip();
    },

    ReferencedIdentifier(path) {
      if (this.scope.hasOwnBinding(path.node.name)) {
        this.scope.rename(path.node.name);
        path.skip();
      }
    }

  };

  const classFieldDefinitionEvaluationTDZVisitor = _core().traverse.visitors.merge([{
    ReferencedIdentifier(path) {
      if (this.classBinding && this.classBinding === path.scope.getBinding(path.node.name)) {
        const classNameTDZError = this.file.addHelper("classNameTDZError");

        const throwNode = _core().types.callExpression(classNameTDZError, [_core().types.stringLiteral(path.node.name)]);

        path.replaceWith(_core().types.sequenceExpression([throwNode, path.node]));
        path.skip();
      }
    }

  }, _helperReplaceSupers().environmentVisitor]);

  const privateNameVisitor = {
    PrivateName(path) {
      const {
        name
      } = this;
      const {
        node,
        parentPath
      } = path;
      if (!parentPath.isMemberExpression({
        property: node
      })) return;
      if (node.id.name !== name) return;
      this.handle(parentPath);
    },

    Class(path) {
      const {
        name
      } = this;
      const body = path.get("body.body");

      for (const prop of body) {
        if (!prop.isClassPrivateProperty()) continue;
        if (prop.node.key.id.name !== name) continue;
        path.traverse(privateNameInnerVisitor, this);
        path.skip();
        break;
      }
    }

  };

  const privateNameInnerVisitor = _core().traverse.visitors.merge([{
    PrivateName: privateNameVisitor.PrivateName
  }, _helperReplaceSupers().environmentVisitor]);

  const privateNameHandlerSpec = {
    memoise(member, count) {
      const {
        scope
      } = member;
      const {
        object
      } = member.node;
      const memo = scope.maybeGenerateMemoised(object);

      if (!memo) {
        return;
      }

      this.memoiser.set(object, memo, count);
    },

    receiver(member) {
      const {
        object
      } = member.node;

      if (this.memoiser.has(object)) {
        return _core().types.cloneNode(this.memoiser.get(object));
      }

      return _core().types.cloneNode(object);
    },

    get(member) {
      const {
        map,
        file
      } = this;
      return _core().types.callExpression(file.addHelper("classPrivateFieldGet"), [this.receiver(member), _core().types.cloneNode(map)]);
    },

    set(member, value) {
      const {
        map,
        file
      } = this;
      return _core().types.callExpression(file.addHelper("classPrivateFieldSet"), [this.receiver(member), _core().types.cloneNode(map), value]);
    },

    call(member, args) {
      this.memoise(member, 1);
      return (0, _helperOptimiseCallExpression().default)(this.get(member), this.receiver(member), args);
    }

  };
  const privateNameHandlerLoose = {
    handle(member) {
      const {
        prop,
        file
      } = this;
      const {
        object
      } = member.node;
      member.replaceWith(_core().template.expression`BASE(REF, PROP)[PROP]`({
        BASE: file.addHelper("classPrivateFieldLooseBase"),
        REF: object,
        PROP: prop
      }));
    }

  };
  const staticPrivatePropertyHandlerSpec = Object.assign({}, privateNameHandlerSpec, {
    get(member) {
      const {
        file,
        privateId,
        classRef
      } = this;
      return _core().types.callExpression(file.addHelper("classStaticPrivateFieldSpecGet"), [this.receiver(member), _core().types.cloneNode(classRef), _core().types.cloneNode(privateId)]);
    },

    set(member, value) {
      const {
        file,
        privateId,
        classRef
      } = this;
      return _core().types.callExpression(file.addHelper("classStaticPrivateFieldSpecSet"), [this.receiver(member), _core().types.cloneNode(classRef), _core().types.cloneNode(privateId), value]);
    }

  });

  function buildClassPropertySpec(ref, path, state) {
    const {
      scope
    } = path;
    const {
      key,
      value,
      computed
    } = path.node;
    return _core().types.expressionStatement(_core().types.callExpression(state.addHelper("defineProperty"), [ref, computed || _core().types.isLiteral(key) ? key : _core().types.stringLiteral(key.name), value || scope.buildUndefinedNode()]));
  }

  function buildClassPropertyLoose(ref, path) {
    const {
      scope
    } = path;
    const {
      key,
      value,
      computed
    } = path.node;
    return _core().types.expressionStatement(_core().types.assignmentExpression("=", _core().types.memberExpression(ref, key, computed || _core().types.isLiteral(key)), value || scope.buildUndefinedNode()));
  }

  function buildClassPrivatePropertySpec(ref, path, initNodes, state) {
    const {
      parentPath,
      scope
    } = path;
    const {
      name
    } = path.node.key.id;
    const map = scope.generateUidIdentifier(name);
    (0, _helperMemberExpressionToFunctions().default)(parentPath, privateNameVisitor, Object.assign({
      name,
      map,
      file: state
    }, privateNameHandlerSpec));
    initNodes.push(_core().template.statement`var MAP = new WeakMap();`({
      MAP: map
    }));
    return () => _core().template.statement`
        MAP.set(REF, {
          // configurable is always false for private elements
          // enumerable is always false for private elements
          writable: true,
          value: VALUE
        });
      `({
      MAP: map,
      REF: ref,
      VALUE: path.node.value || scope.buildUndefinedNode()
    });
  }

  function buildClassPrivatePropertyLooseHelper(ref, path, state) {
    const {
      parentPath,
      scope
    } = path;
    const {
      name
    } = path.node.key.id;
    const prop = scope.generateUidIdentifier(name);
    parentPath.traverse(privateNameVisitor, Object.assign({
      name,
      prop,
      file: state
    }, privateNameHandlerLoose));
    return {
      keyDecl: _core().template.statement`var PROP = HELPER(NAME);`({
        PROP: prop,
        HELPER: state.addHelper("classPrivateFieldLooseKey"),
        NAME: _core().types.stringLiteral(name)
      }),
      buildInit: () => _core().template.statement.ast`
          Object.defineProperty(${ref}, ${prop}, {
            // configurable is false by default
            // enumerable is false by default
            writable: true,
            value: ${path.node.value || scope.buildUndefinedNode()}
          });
        `
    };
  }

  function buildClassInstancePrivatePropertyLoose(ref, path, initNodes, state) {
    const {
      keyDecl,
      buildInit
    } = buildClassPrivatePropertyLooseHelper(ref, path, state);
    initNodes.push(keyDecl);
    return buildInit;
  }

  function buildClassStaticPrivatePropertyLoose(ref, path, state) {
    const {
      keyDecl,
      buildInit
    } = buildClassPrivatePropertyLooseHelper(ref, path, state);
    return [keyDecl, buildInit()];
  }

  function buildClassStaticPrivatePropertySpec(ref, path, state) {
    const {
      parentPath,
      scope
    } = path;
    const {
      name
    } = path.node.key.id;
    const privateId = scope.generateUidIdentifier(name);
    (0, _helperMemberExpressionToFunctions().default)(parentPath, privateNameVisitor, Object.assign({
      name,
      privateId,
      classRef: ref,
      file: state
    }, staticPrivatePropertyHandlerSpec));
    return [_core().template.statement.ast`
        var ${privateId} = {
          // configurable is always false for private elements
          // enumerable is always false for private elements
          writable: true,
          value: ${path.node.value || scope.buildUndefinedNode()}
        }
      `];
  }

  const buildClassProperty = loose ? buildClassPropertyLoose : buildClassPropertySpec;
  const buildClassPrivateProperty = loose ? buildClassInstancePrivatePropertyLoose : buildClassPrivatePropertySpec;
  const buildClassStaticPrivateProperty = loose ? buildClassStaticPrivatePropertyLoose : buildClassStaticPrivatePropertySpec;
  return {
    inherits: _pluginSyntaxClassProperties().default,
    visitor: {
      Class(path, state) {
        const isDerived = !!path.node.superClass;
        let constructor;
        const props = [];
        const computedPaths = [];
        const privateNames = new Set();
        const body = path.get("body");

        for (const path of body.get("body")) {
          const {
            computed,
            decorators
          } = path.node;

          if (computed) {
            computedPaths.push(path);
          }

          if (decorators && decorators.length > 0) {
            throw path.buildCodeFrameError("Decorators transform is necessary.");
          }

          if (path.isClassPrivateProperty()) {
            const {
              key: {
                id: {
                  name
                }
              }
            } = path.node;

            if (privateNames.has(name)) {
              throw path.buildCodeFrameError("Duplicate private field");
            }

            privateNames.add(name);
          }

          if (path.isProperty()) {
            props.push(path);
          } else if (path.isClassMethod({
            kind: "constructor"
          })) {
            constructor = path;
          }
        }

        if (!props.length) return;
        let ref;

        if (path.isClassExpression() || !path.node.id) {
          (0, _helperFunctionName().default)(path);
          ref = path.scope.generateUidIdentifier("class");
        } else {
          ref = path.node.id;
        }

        const computedNodes = [];
        const staticNodes = [];
        const instanceBody = [];

        for (const computedPath of computedPaths) {
          computedPath.traverse(classFieldDefinitionEvaluationTDZVisitor, {
            classBinding: path.node.id && path.scope.getBinding(path.node.id.name),
            file: this.file
          });
          const computedNode = computedPath.node;

          if (!computedPath.get("key").isConstantExpression()) {
            const ident = path.scope.generateUidIdentifierBasedOnNode(computedNode.key);
            computedNodes.push(_core().types.variableDeclaration("var", [_core().types.variableDeclarator(ident, computedNode.key)]));
            computedNode.key = _core().types.cloneNode(ident);
          }
        }

        const privateMaps = [];
        const privateMapInits = [];

        for (const prop of props) {
          if (prop.isPrivate() && !prop.node.static) {
            const inits = [];
            privateMapInits.push(inits);
            privateMaps.push(buildClassPrivateProperty(_core().types.thisExpression(), prop, inits, state));
          }
        }

        let p = 0;

        for (const prop of props) {
          if (prop.node.static) {
            if (prop.isPrivate()) {
              staticNodes.push(...buildClassStaticPrivateProperty(_core().types.cloneNode(ref), prop, state));
            } else {
              staticNodes.push(buildClassProperty(_core().types.cloneNode(ref), prop, state));
            }
          } else if (prop.isPrivate()) {
            instanceBody.push(privateMaps[p]());
            staticNodes.push(...privateMapInits[p]);
            p++;
          } else {
            instanceBody.push(buildClassProperty(_core().types.thisExpression(), prop, state));
          }
        }

        if (instanceBody.length) {
          if (!constructor) {
            const newConstructor = _core().types.classMethod("constructor", _core().types.identifier("constructor"), [], _core().types.blockStatement([]));

            if (isDerived) {
              newConstructor.params = [_core().types.restElement(_core().types.identifier("args"))];
              newConstructor.body.body.push(_core().types.expressionStatement(_core().types.callExpression(_core().types.super(), [_core().types.spreadElement(_core().types.identifier("args"))])));
            }

            [constructor] = body.unshiftContainer("body", newConstructor);
          }

          const state = {
            scope: constructor.scope
          };

          for (const prop of props) {
            if (prop.node.static) continue;
            prop.traverse(referenceVisitor, state);
          }

          if (isDerived) {
            const bareSupers = [];
            constructor.traverse(findBareSupers, bareSupers);

            for (const bareSuper of bareSupers) {
              bareSuper.insertAfter(instanceBody);
            }
          } else {
            constructor.get("body").unshiftContainer("body", instanceBody);
          }
        }

        for (const prop of props) {
          prop.remove();
        }

        if (computedNodes.length === 0 && staticNodes.length === 0) return;

        if (path.isClassExpression()) {
          path.scope.push({
            id: ref
          });
          path.replaceWith(_core().types.assignmentExpression("=", _core().types.cloneNode(ref), path.node));
        } else if (!path.node.id) {
          path.node.id = ref;
        }

        path.insertBefore(computedNodes);
        path.insertAfter(staticNodes);
      },

      PrivateName(path) {
        throw path.buildCodeFrameError(`Unknown PrivateName "${path}"`);
      }

    }
  };
});

exports.default = _default;