'use strict';

var _declaredScope = require('eslint-module-utils/declaredScope');

var _declaredScope2 = _interopRequireDefault(_declaredScope);

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _importDeclaration = require('../importDeclaration');

var _importDeclaration2 = _interopRequireDefault(_importDeclaration);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  meta: {
    docs: {
      url: (0, _docsUrl2.default)('namespace')
    },

    schema: [{
      'type': 'object',
      'properties': {
        'allowComputed': {
          'description': 'If `false`, will report computed (and thus, un-lintable) references ' + 'to namespace members.',
          'type': 'boolean',
          'default': false
        }
      },
      'additionalProperties': false
    }]
  },

  create: function namespaceRule(context) {

    // read options
    var _ref = context.options[0] || {},
        _ref$allowComputed = _ref.allowComputed;

    const allowComputed = _ref$allowComputed === undefined ? false : _ref$allowComputed;


    const namespaces = new Map();

    function makeMessage(last, namepath) {
      return `'${last.name}' not found in` + (namepath.length > 1 ? ' deeply ' : ' ') + `imported namespace '${namepath.join('.')}'.`;
    }

    return {

      // pick up all imports at body entry time, to properly respect hoisting
      'Program': function (_ref2) {
        let body = _ref2.body;

        function processBodyStatement(declaration) {
          if (declaration.type !== 'ImportDeclaration') return;

          if (declaration.specifiers.length === 0) return;

          const imports = _ExportMap2.default.get(declaration.source.value, context);
          if (imports == null) return null;

          if (imports.errors.length) {
            imports.reportErrors(context, declaration);
            return;
          }

          for (let specifier of declaration.specifiers) {
            switch (specifier.type) {
              case 'ImportNamespaceSpecifier':
                if (!imports.size) {
                  context.report(specifier, `No exported names found in module '${declaration.source.value}'.`);
                }
                namespaces.set(specifier.local.name, imports);
                break;
              case 'ImportDefaultSpecifier':
              case 'ImportSpecifier':
                {
                  const meta = imports.get(
                  // default to 'default' for default http://i.imgur.com/nj6qAWy.jpg
                  specifier.imported ? specifier.imported.name : 'default');
                  if (!meta || !meta.namespace) break;
                  namespaces.set(specifier.local.name, meta.namespace);
                  break;
                }
            }
          }
        }
        body.forEach(processBodyStatement);
      },

      // same as above, but does not add names to local map
      'ExportNamespaceSpecifier': function (namespace) {
        var declaration = (0, _importDeclaration2.default)(context);

        var imports = _ExportMap2.default.get(declaration.source.value, context);
        if (imports == null) return null;

        if (imports.errors.length) {
          imports.reportErrors(context, declaration);
          return;
        }

        if (!imports.size) {
          context.report(namespace, `No exported names found in module '${declaration.source.value}'.`);
        }
      },

      // todo: check for possible redefinition

      'MemberExpression': function (dereference) {
        if (dereference.object.type !== 'Identifier') return;
        if (!namespaces.has(dereference.object.name)) return;

        if (dereference.parent.type === 'AssignmentExpression' && dereference.parent.left === dereference) {
          context.report(dereference.parent, `Assignment to member of namespace '${dereference.object.name}'.`);
        }

        // go deep
        var namespace = namespaces.get(dereference.object.name);
        var namepath = [dereference.object.name];
        // while property is namespace and parent is member expression, keep validating
        while (namespace instanceof _ExportMap2.default && dereference.type === 'MemberExpression') {

          if (dereference.computed) {
            if (!allowComputed) {
              context.report(dereference.property, 'Unable to validate computed reference to imported namespace \'' + dereference.object.name + '\'.');
            }
            return;
          }

          if (!namespace.has(dereference.property.name)) {
            context.report(dereference.property, makeMessage(dereference.property, namepath));
            break;
          }

          const exported = namespace.get(dereference.property.name);
          if (exported == null) return;

          // stash and pop
          namepath.push(dereference.property.name);
          namespace = exported.namespace;
          dereference = dereference.parent;
        }
      },

      'VariableDeclarator': function (_ref3) {
        let id = _ref3.id,
            init = _ref3.init;

        if (init == null) return;
        if (init.type !== 'Identifier') return;
        if (!namespaces.has(init.name)) return;

        // check for redefinition in intermediate scopes
        if ((0, _declaredScope2.default)(context, init.name) !== 'module') return;

        // DFS traverse child namespaces
        function testKey(pattern, namespace) {
          let path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [init.name];

          if (!(namespace instanceof _ExportMap2.default)) return;

          if (pattern.type !== 'ObjectPattern') return;

          for (let property of pattern.properties) {
            if (property.type === 'ExperimentalRestProperty') {
              continue;
            }

            if (property.key.type !== 'Identifier') {
              context.report({
                node: property,
                message: 'Only destructure top-level names.'
              });
              continue;
            }

            if (!namespace.has(property.key.name)) {
              context.report({
                node: property,
                message: makeMessage(property.key, path)
              });
              continue;
            }

            path.push(property.key.name);
            testKey(property.value, namespace.get(property.key.name).namespace, path);
            path.pop();
          }
        }

        testKey(id, namespaces.get(init.name));
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25hbWVzcGFjZS5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJ1cmwiLCJzY2hlbWEiLCJjcmVhdGUiLCJuYW1lc3BhY2VSdWxlIiwiY29udGV4dCIsIm9wdGlvbnMiLCJhbGxvd0NvbXB1dGVkIiwibmFtZXNwYWNlcyIsIk1hcCIsIm1ha2VNZXNzYWdlIiwibGFzdCIsIm5hbWVwYXRoIiwibmFtZSIsImxlbmd0aCIsImpvaW4iLCJib2R5IiwicHJvY2Vzc0JvZHlTdGF0ZW1lbnQiLCJkZWNsYXJhdGlvbiIsInR5cGUiLCJzcGVjaWZpZXJzIiwiaW1wb3J0cyIsIkV4cG9ydHMiLCJnZXQiLCJzb3VyY2UiLCJ2YWx1ZSIsImVycm9ycyIsInJlcG9ydEVycm9ycyIsInNwZWNpZmllciIsInNpemUiLCJyZXBvcnQiLCJzZXQiLCJsb2NhbCIsImltcG9ydGVkIiwibmFtZXNwYWNlIiwiZm9yRWFjaCIsImRlcmVmZXJlbmNlIiwib2JqZWN0IiwiaGFzIiwicGFyZW50IiwibGVmdCIsImNvbXB1dGVkIiwicHJvcGVydHkiLCJleHBvcnRlZCIsInB1c2giLCJpZCIsImluaXQiLCJ0ZXN0S2V5IiwicGF0dGVybiIsInBhdGgiLCJwcm9wZXJ0aWVzIiwia2V5Iiwibm9kZSIsIm1lc3NhZ2UiLCJwb3AiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkMsVUFBTTtBQUNKQyxXQUFLLHVCQUFRLFdBQVI7QUFERCxLQURGOztBQUtKQyxZQUFRLENBQ047QUFDRSxjQUFRLFFBRFY7QUFFRSxvQkFBYztBQUNaLHlCQUFpQjtBQUNmLHlCQUNFLHlFQUNBLHVCQUhhO0FBSWYsa0JBQVEsU0FKTztBQUtmLHFCQUFXO0FBTEk7QUFETCxPQUZoQjtBQVdFLDhCQUF3QjtBQVgxQixLQURNO0FBTEosR0FEUzs7QUF1QmZDLFVB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QUVELGdCQUFJLENBQUNuQixVQUFVSSxHQUFWLENBQWNJLFNBQVNTLEdBQVQsQ0FBYXRDLElBQTNCLENBQUwsRUFBdUM7QUFDckNSLHNCQUFReUIsTUFBUixDQUFlO0FBQ2JzQixzQkFBTVYsUUFETztBQUViVyx5QkFBUzNDLFlBQVlnQyxTQUFTUyxHQUFyQixFQUEwQkYsSUFBMUI7QUFGSSxlQUFmO0FBSUE7QUFDRDs7QUFFREEsaUJBQUtMLElBQUwsQ0FBVUYsU0FBU1MsR0FBVCxDQUFhdEMsSUFBdkI7QUFDQWtDLG9CQUFRTCxTQUFTakIsS0FBakIsRUFBd0JTLFVBQVVYLEdBQVYsQ0FBY21CLFNBQVNTLEdBQVQsQ0FBYXRDLElBQTNCLEVBQWlDcUIsU0FBekQsRUFBb0VlLElBQXBFO0FBQ0FBLGlCQUFLSyxHQUFMO0FBQ0Q7QUFDRjs7QUFFRFAsZ0JBQVFGLEVBQVIsRUFBWXJDLFdBQVdlLEdBQVgsQ0FBZXVCLEtBQUtqQyxJQUFwQixDQUFaO0FBQ0Q7QUFuSkksS0FBUDtBQXFKRDtBQTNMYyxDQUFqQiIsImZpbGUiOiJydWxlcy9uYW1lc3BhY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVjbGFyZWRTY29wZSBmcm9tICdlc2xpbnQtbW9kdWxlLXV0aWxzL2RlY2xhcmVkU2NvcGUnXG5pbXBvcnQgRXhwb3J0cyBmcm9tICcuLi9FeHBvcnRNYXAnXG5pbXBvcnQgaW1wb3J0RGVjbGFyYXRpb24gZnJvbSAnLi4vaW1wb3J0RGVjbGFyYXRpb24nXG5pbXBvcnQgZG9jc1VybCBmcm9tICcuLi9kb2NzVXJsJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHtcbiAgICAgIHVybDogZG9jc1VybCgnbmFtZXNwYWNlJyksXG4gICAgfSxcblxuICAgIHNjaGVtYTogW1xuICAgICAge1xuICAgICAgICAndHlwZSc6ICdvYmplY3QnLFxuICAgICAgICAncHJvcGVydGllcyc6IHtcbiAgICAgICAgICAnYWxsb3dDb21wdXRlZCc6IHtcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6XG4gICAgICAgICAgICAgICdJZiBgZmFsc2VgLCB3aWxsIHJlcG9ydCBjb21wdXRlZCAoYW5kIHRodXMsIHVuLWxpbnRhYmxlKSByZWZlcmVuY2VzICcgK1xuICAgICAgICAgICAgICAndG8gbmFtZXNwYWNlIG1lbWJlcnMuJyxcbiAgICAgICAgICAgICd0eXBlJzogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICAnYWRkaXRpb25hbFByb3BlcnRpZXMnOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uIG5hbWVzcGFjZVJ1bGUoY29udGV4dCkge1xuXG4gICAgLy8gcmVhZCBvcHRpb25zXG4gICAgY29uc3Qge1xuICAgICAgYWxsb3dDb21wdXRlZCA9IGZhbHNlLFxuICAgIH0gPSBjb250ZXh0Lm9wdGlvbnNbMF0gfHwge31cblxuICAgIGNvbnN0IG5hbWVzcGFjZXMgPSBuZXcgTWFwKClcblxuICAgIGZ1bmN0aW9uIG1ha2VNZXNzYWdlKGxhc3QsIG5hbWVwYXRoKSB7XG4gICAgICAgcmV0dXJuIGAnJHtsYXN0Lm5hbWV9JyBub3QgZm91bmQgaW5gICtcbiAgICAgICAgICAgICAgKG5hbWVwYXRoLmxlbmd0aCA+IDEgPyAnIGRlZXBseSAnIDogJyAnKSArXG4gICAgICAgICAgICAgIGBpbXBvcnRlZCBuYW1lc3BhY2UgJyR7bmFtZXBhdGguam9pbignLicpfScuYFxuICAgIH1cblxuICAgIHJldHVybiB7XG5cbiAgICAgIC8vIHBpY2sgdXAgYWxsIGltcG9ydHMgYXQgYm9keSBlbnRyeSB0aW1lLCB0byBwcm9wZXJseSByZXNwZWN0IGhvaXN0aW5nXG4gICAgICAnUHJvZ3JhbSc6IGZ1bmN0aW9uICh7IGJvZHkgfSkge1xuICAgICAgICBmdW5jdGlvbiBwcm9jZXNzQm9keVN0YXRlbWVudChkZWNsYXJhdGlvbikge1xuICAgICAgICAgIGlmIChkZWNsYXJhdGlvbi50eXBlICE9PSAnSW1wb3J0RGVjbGFyYXRpb24nKSByZXR1cm5cblxuICAgICAgICAgIGlmIChkZWNsYXJhdGlvbi5zcGVjaWZpZXJzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgICAgICAgICBjb25zdCBpbXBvcnRzID0gRXhwb3J0cy5nZXQoZGVjbGFyYXRpb24uc291cmNlLnZhbHVlLCBjb250ZXh0KVxuICAgICAgICAgIGlmIChpbXBvcnRzID09IG51bGwpIHJldHVybiBudWxsXG5cbiAgICAgICAgICBpZiAoaW1wb3J0cy5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpbXBvcnRzLnJlcG9ydEVycm9ycyhjb250ZXh0LCBkZWNsYXJhdGlvbilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAobGV0IHNwZWNpZmllciBvZiBkZWNsYXJhdGlvbi5zcGVjaWZpZXJzKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNwZWNpZmllci50eXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ0ltcG9ydE5hbWVzcGFjZVNwZWNpZmllcic6XG4gICAgICAgICAgICAgICAgaWYgKCFpbXBvcnRzLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnRleHQucmVwb3J0KHNwZWNpZmllcixcbiAgICAgICAgICAgICAgICAgICAgYE5vIGV4cG9ydGVkIG5hbWVzIGZvdW5kIGluIG1vZHVsZSAnJHtkZWNsYXJhdGlvbi5zb3VyY2UudmFsdWV9Jy5gKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuYW1lc3BhY2VzLnNldChzcGVjaWZpZXIubG9jYWwubmFtZSwgaW1wb3J0cylcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICBjYXNlICdJbXBvcnREZWZhdWx0U3BlY2lmaWVyJzpcbiAgICAgICAgICAgICAgY2FzZSAnSW1wb3J0U3BlY2lmaWVyJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1ldGEgPSBpbXBvcnRzLmdldChcbiAgICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgdG8gJ2RlZmF1bHQnIGZvciBkZWZhdWx0IGh0dHA6Ly9pLmltZ3VyLmNvbS9uajZxQVd5LmpwZ1xuICAgICAgICAgICAgICAgICAgc3BlY2lmaWVyLmltcG9ydGVkID8gc3BlY2lmaWVyLmltcG9ydGVkLm5hbWUgOiAnZGVmYXVsdCcpXG4gICAgICAgICAgICAgICAgaWYgKCFtZXRhIHx8ICFtZXRhLm5hbWVzcGFjZSkgYnJlYWtcbiAgICAgICAgICAgICAgICBuYW1lc3BhY2VzLnNldChzcGVjaWZpZXIubG9jYWwubmFtZSwgbWV0YS5uYW1lc3BhY2UpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBib2R5LmZvckVhY2gocHJvY2Vzc0JvZHlTdGF0ZW1lbnQpXG4gICAgICB9LFxuXG4gICAgICAvLyBzYW1lIGFzIGFib3ZlLCBidXQgZG9lcyBub3QgYWRkIG5hbWVzIHRvIGxvY2FsIG1hcFxuICAgICAgJ0V4cG9ydE5hbWVzcGFjZVNwZWNpZmllcic6IGZ1bmN0aW9uIChuYW1lc3BhY2UpIHtcbiAgICAgICAgdmFyIGRlY2xhcmF0aW9uID0gaW1wb3J0RGVjbGFyYXRpb24oY29udGV4dClcblxuICAgICAgICB2YXIgaW1wb3J0cyA9IEV4cG9ydHMuZ2V0KGRlY2xhcmF0aW9uLnNvdXJjZS52YWx1ZSwgY29udGV4dClcbiAgICAgICAgaWYgKGltcG9ydHMgPT0gbnVsbCkgcmV0dXJuIG51bGxcblxuICAgICAgICBpZiAoaW1wb3J0cy5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgaW1wb3J0cy5yZXBvcnRFcnJvcnMoY29udGV4dCwgZGVjbGFyYXRpb24pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWltcG9ydHMuc2l6ZSkge1xuICAgICAgICAgIGNvbnRleHQucmVwb3J0KG5hbWVzcGFjZSxcbiAgICAgICAgICAgIGBObyBleHBvcnRlZCBuYW1lcyBmb3VuZCBpbiBtb2R1bGUgJyR7ZGVjbGFyYXRpb24uc291cmNlLnZhbHVlfScuYClcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLy8gdG9kbzogY2hlY2sgZm9yIHBvc3NpYmxlIHJlZGVmaW5pdGlvblxuXG4gICAgICAnTWVtYmVyRXhwcmVzc2lvbic6IGZ1bmN0aW9uIChkZXJlZmVyZW5jZSkge1xuICAgICAgICBpZiAoZGVyZWZlcmVuY2Uub2JqZWN0LnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuXG4gICAgICAgIGlmICghbmFtZXNwYWNlcy5oYXMoZGVyZWZlcmVuY2Uub2JqZWN0Lm5hbWUpKSByZXR1cm5cblxuICAgICAgICBpZiAoZGVyZWZlcmVuY2UucGFyZW50LnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicgJiZcbiAgICAgICAgICAgIGRlcmVmZXJlbmNlLnBhcmVudC5sZWZ0ID09PSBkZXJlZmVyZW5jZSkge1xuICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoZGVyZWZlcmVuY2UucGFyZW50LFxuICAgICAgICAgICAgICAgIGBBc3NpZ25tZW50IHRvIG1lbWJlciBvZiBuYW1lc3BhY2UgJyR7ZGVyZWZlcmVuY2Uub2JqZWN0Lm5hbWV9Jy5gKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ28gZGVlcFxuICAgICAgICB2YXIgbmFtZXNwYWNlID0gbmFtZXNwYWNlcy5nZXQoZGVyZWZlcmVuY2Uub2JqZWN0Lm5hbWUpXG4gICAgICAgIHZhciBuYW1lcGF0aCA9IFtkZXJlZmVyZW5jZS5vYmplY3QubmFtZV1cbiAgICAgICAgLy8gd2hpbGUgcHJvcGVydHkgaXMgbmFtZXNwYWNlIGFuZCBwYXJlbnQgaXMgbWVtYmVyIGV4cHJlc3Npb24sIGtlZXAgdmFsaWRhdGluZ1xuICAgICAgICB3aGlsZSAobmFtZXNwYWNlIGluc3RhbmNlb2YgRXhwb3J0cyAmJlxuICAgICAgICAgICAgICAgZGVyZWZlcmVuY2UudHlwZSA9PT0gJ01lbWJlckV4cHJlc3Npb24nKSB7XG5cbiAgICAgICAgICBpZiAoZGVyZWZlcmVuY2UuY29tcHV0ZWQpIHtcbiAgICAgICAgICAgIGlmICghYWxsb3dDb21wdXRlZCkge1xuICAgICAgICAgICAgICBjb250ZXh0LnJlcG9ydChkZXJlZmVyZW5jZS5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAnVW5hYmxlIHRvIHZhbGlkYXRlIGNvbXB1dGVkIHJlZmVyZW5jZSB0byBpbXBvcnRlZCBuYW1lc3BhY2UgXFwnJyArXG4gICAgICAgICAgICAgICAgZGVyZWZlcmVuY2Uub2JqZWN0Lm5hbWUgKyAnXFwnLicpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIW5hbWVzcGFjZS5oYXMoZGVyZWZlcmVuY2UucHJvcGVydHkubmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVwb3J0KFxuICAgICAgICAgICAgICBkZXJlZmVyZW5jZS5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgbWFrZU1lc3NhZ2UoZGVyZWZlcmVuY2UucHJvcGVydHksIG5hbWVwYXRoKSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZXhwb3J0ZWQgPSBuYW1lc3BhY2UuZ2V0KGRlcmVmZXJlbmNlLnByb3BlcnR5Lm5hbWUpXG4gICAgICAgICAgaWYgKGV4cG9ydGVkID09IG51bGwpIHJldHVyblxuXG4gICAgICAgICAgLy8gc3Rhc2ggYW5kIHBvcFxuICAgICAgICAgIG5hbWVwYXRoLnB1c2goZGVyZWZlcmVuY2UucHJvcGVydHkubmFtZSlcbiAgICAgICAgICBuYW1lc3BhY2UgPSBleHBvcnRlZC5uYW1lc3BhY2VcbiAgICAgICAgICBkZXJlZmVyZW5jZSA9IGRlcmVmZXJlbmNlLnBhcmVudFxuICAgICAgICB9XG5cbiAgICAgIH0sXG5cbiAgICAgICdWYXJpYWJsZURlY2xhcmF0b3InOiBmdW5jdGlvbiAoeyBpZCwgaW5pdCB9KSB7XG4gICAgICAgIGlmIChpbml0ID09IG51bGwpIHJldHVyblxuICAgICAgICBpZiAoaW5pdC50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVyblxuICAgICAgICBpZiAoIW5hbWVzcGFjZXMuaGFzKGluaXQubmFtZSkpIHJldHVyblxuXG4gICAgICAgIC8vIGNoZWNrIGZvciByZWRlZmluaXRpb24gaW4gaW50ZXJtZWRpYXRlIHNjb3Blc1xuICAgICAgICBpZiAoZGVjbGFyZWRTY29wZShjb250ZXh0LCBpbml0Lm5hbWUpICE9PSAnbW9kdWxlJykgcmV0dXJuXG5cbiAgICAgICAgLy8gREZTIHRyYXZlcnNlIGNoaWxkIG5hbWVzcGFjZXNcbiAgICAgICAgZnVuY3Rpb24gdGVzdEtleShwYXR0ZXJuLCBuYW1lc3BhY2UsIHBhdGggPSBbaW5pdC5uYW1lXSkge1xuICAgICAgICAgIGlmICghKG5hbWVzcGFjZSBpbnN0YW5jZW9mIEV4cG9ydHMpKSByZXR1cm5cblxuICAgICAgICAgIGlmIChwYXR0ZXJuLnR5cGUgIT09ICdPYmplY3RQYXR0ZXJuJykgcmV0dXJuXG5cbiAgICAgICAgICBmb3IgKGxldCBwcm9wZXJ0eSBvZiBwYXR0ZXJuLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eS50eXBlID09PSAnRXhwZXJpbWVudGFsUmVzdFByb3BlcnR5Jykge1xuICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcGVydHkua2V5LnR5cGUgIT09ICdJZGVudGlmaWVyJykge1xuICAgICAgICAgICAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICAgICAgICAgICAgbm9kZTogcHJvcGVydHksXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ09ubHkgZGVzdHJ1Y3R1cmUgdG9wLWxldmVsIG5hbWVzLicsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghbmFtZXNwYWNlLmhhcyhwcm9wZXJ0eS5rZXkubmFtZSkpIHtcbiAgICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgICAgICAgIG5vZGU6IHByb3BlcnR5LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1ha2VNZXNzYWdlKHByb3BlcnR5LmtleSwgcGF0aCksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBhdGgucHVzaChwcm9wZXJ0eS5rZXkubmFtZSlcbiAgICAgICAgICAgIHRlc3RLZXkocHJvcGVydHkudmFsdWUsIG5hbWVzcGFjZS5nZXQocHJvcGVydHkua2V5Lm5hbWUpLm5hbWVzcGFjZSwgcGF0aClcbiAgICAgICAgICAgIHBhdGgucG9wKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0ZXN0S2V5KGlkLCBuYW1lc3BhY2VzLmdldChpbml0Lm5hbWUpKVxuICAgICAgfSxcbiAgICB9XG4gIH0sXG59XG4iXX0=