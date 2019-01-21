'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const rules = exports.rules = {
  'no-unresolved': require('./rules/no-unresolved'),
  'named': require('./rules/named'),
  'default': require('./rules/default'),
  'namespace': require('./rules/namespace'),
  'no-namespace': require('./rules/no-namespace'),
  'export': require('./rules/export'),
  'no-mutable-exports': require('./rules/no-mutable-exports'),
  'extensions': require('./rules/extensions'),
  'no-restricted-paths': require('./rules/no-restricted-paths'),
  'no-internal-modules': require('./rules/no-internal-modules'),
  'group-exports': require('./rules/group-exports'),

  'no-self-import': require('./rules/no-self-import'),
  'no-cycle': require('./rules/no-cycle'),
  'no-named-default': require('./rules/no-named-default'),
  'no-named-as-default': require('./rules/no-named-as-default'),
  'no-named-as-default-member': require('./rules/no-named-as-default-member'),
  'no-anonymous-default-export': require('./rules/no-anonymous-default-export'),

  'no-commonjs': require('./rules/no-commonjs'),
  'no-amd': require('./rules/no-amd'),
  'no-duplicates': require('./rules/no-duplicates'),
  'first': require('./rules/first'),
  'max-dependencies': require('./rules/max-dependencies'),
  'no-extraneous-dependencies': require('./rules/no-extraneous-dependencies'),
  'no-absolute-path': require('./rules/no-absolute-path'),
  'no-nodejs-modules': require('./rules/no-nodejs-modules'),
  'no-webpack-loader-syntax': require('./rules/no-webpack-loader-syntax'),
  'order': require('./rules/order'),
  'newline-after-import': require('./rules/newline-after-import'),
  'prefer-default-export': require('./rules/prefer-default-export'),
  'no-default-export': require('./rules/no-default-export'),
  'no-dynamic-require': require('./rules/no-dynamic-require'),
  'unambiguous': require('./rules/unambiguous'),
  'no-unassigned-import': require('./rules/no-unassigned-import'),
  'no-useless-path-segments': require('./rules/no-useless-path-segments'),
  'dynamic-import-chunkname': require('./rules/dynamic-import-chunkname'),

  // export
  'exports-last': require('./rules/exports-last'),

  // metadata-based
  'no-deprecated': require('./rules/no-deprecated'),

  // deprecated aliases to rules
  'imports-first': require('./rules/imports-first')
};

const configs = exports.configs = {
  'recommended': require('../config/recommended'),

  'errors': require('../config/errors'),
  'warnings': require('../config/warnings'),

  // shhhh... work in progress "secret" rules
  'stage-0': require('../config/stage-0'),

  // useful stuff for folks using various environments
  'react': require('../config/react'),
  'react-native': require('../config/react-native'),
  'electron': require('../config/electron')
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJ1bGVzIiwicmVxdWlyZSIsImNvbmZpZ3MiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQU8sTUFBTUEsd0JBQVE7QUFDbkIsbUJBQWlCQyxRQUFRLHVCQUFSLENBREU7QUFFbkIsV0FBU0EsUUFBUSxlQUFSLENBRlU7QUFHbkIsYUFBV0EsUUFBUSxpQkFBUixDQUhRO0FBSW5CLGVBQWFBLFFBQVEsbUJBQVIsQ0FKTTtBQUtuQixrQkFBZ0JBLFFBQVEsc0JBQVIsQ0FMRztBQU1uQixZQUFVQSxRQUFRLGdCQUFSLENBTlM7QUFPbkIsd0JBQXNCQSxRQUFRLDRCQUFSLENBUEg7QUFRbkIsZ0JBQWNBLFFBQVEsb0JBQVIsQ0FSSztBQVNuQix5QkFBdUJBLFFBQVEsNkJBQVIsQ0FUSjtBQVVuQix5QkFBdUJBLFFBQVEsNkJBQVIsQ0FWSjtBQVduQixtQkFBaUJBLFFBQVEsdUJBQVIsQ0FYRTs7QUFhbkIsb0JBQWtCQSxRQUFRLHdCQUFSLENBYkM7QUFjbkIsY0FBWUEsUUFBUSxrQkFBUixDQWRPO0FBZW5CLHNCQUFvQkEsUUFBUSwwQkFBUixDQWZEO0FBZ0JuQix5QkFBdUJBLFFBQVEsNkJBQVIsQ0FoQko7QUFpQm5CLGdDQUE4QkEsUUFBUSxvQ0FBUixDQWpCWDtBQWtCbkIsaUNBQStCQSxRQUFRLHFDQUFSLENBbEJaOztBQW9CbkIsaUJBQWVBLFFBQVEscUJBQVIsQ0FwQkk7QUFxQm5CLFlBQVVBLFFBQVEsZ0JBQVIsQ0FyQlM7QUFzQm5CLG1CQUFpQkEsUUFBUSx1QkFBUixDQXRCRTtBQXVCbkIsV0FBU0EsUUFBUSxlQUFSLENBdkJVO0FBd0JuQixzQkFBb0JBLFFBQVEsMEJBQVIsQ0F4QkQ7QUF5Qm5CLGdDQUE4QkEsUUFBUSxvQ0FBUixDQXpCWDtBQTBCbkIsc0JBQW9CQSxRQUFRLDBCQUFSLENBMUJEO0FBMkJuQix1QkFBcUJBLFFBQVEsMkJBQVIsQ0EzQkY7QUE0Qm5CLDhCQUE0QkEsUUFBUSxrQ0FBUixDQTVCVDtBQTZCbkIsV0FBU0EsUUFBUSxlQUFSLENBN0JVO0FBOEJuQiwwQkFBd0JBLFFBQVEsOEJBQVIsQ0E5Qkw7QUErQm5CLDJCQUF5QkEsUUFBUSwrQkFBUixDQS9CTjtBQWdDbkIsdUJBQXFCQSxRQUFRLDJCQUFSLENBaENGO0FBaUNuQix3QkFBc0JBLFFBQVEsNEJBQVIsQ0FqQ0g7QUFrQ25CLGlCQUFlQSxRQUFRLHFCQUFSLENBbENJO0FBbUNuQiwwQkFBd0JBLFFBQVEsOEJBQVIsQ0FuQ0w7QUFvQ25CLDhCQUE0QkEsUUFBUSxrQ0FBUixDQXBDVDtBQXFDbkIsOEJBQTRCQSxRQUFRLGtDQUFSLENBckNUOztBQXVDbkI7QUFDQSxrQkFBZ0JBLFFBQVEsc0JBQVIsQ0F4Q0c7O0FBMENuQjtBQUNBLG1CQUFpQkEsUUFBUSx1QkFBUixDQTNDRTs7QUE2Q25CO0FBQ0EsbUJBQWlCQSxRQUFRLHVCQUFSO0FBOUNFLENBQWQ7O0FBaURBLE1BQU1DLDRCQUFVO0FBQ3JCLGlCQUFlRCxRQUFRLHVCQUFSLENBRE07O0FBR3JCLFlBQVVBLFFBQVEsa0JBQVIsQ0FIVztBQUlyQixjQUFZQSxRQUFRLG9CQUFSLENBSlM7O0FBTXJCO0FBQ0EsYUFBV0EsUUFBUSxtQkFBUixDQVBVOztBQVNyQjtBQUNBLFdBQVNBLFFBQVEsaUJBQVIsQ0FWWTtBQVdyQixrQkFBZ0JBLFFBQVEsd0JBQVIsQ0FYSztBQVlyQixjQUFZQSxRQUFRLG9CQUFSO0FBWlMsQ0FBaEIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgcnVsZXMgPSB7XG4gICduby11bnJlc29sdmVkJzogcmVxdWlyZSgnLi9ydWxlcy9uby11bnJlc29sdmVkJyksXG4gICduYW1lZCc6IHJlcXVpcmUoJy4vcnVsZXMvbmFtZWQnKSxcbiAgJ2RlZmF1bHQnOiByZXF1aXJlKCcuL3J1bGVzL2RlZmF1bHQnKSxcbiAgJ25hbWVzcGFjZSc6IHJlcXVpcmUoJy4vcnVsZXMvbmFtZXNwYWNlJyksXG4gICduby1uYW1lc3BhY2UnOiByZXF1aXJlKCcuL3J1bGVzL25vLW5hbWVzcGFjZScpLFxuICAnZXhwb3J0JzogcmVxdWlyZSgnLi9ydWxlcy9leHBvcnQnKSxcbiAgJ25vLW11dGFibGUtZXhwb3J0cyc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tbXV0YWJsZS1leHBvcnRzJyksXG4gICdleHRlbnNpb25zJzogcmVxdWlyZSgnLi9ydWxlcy9leHRlbnNpb25zJyksXG4gICduby1yZXN0cmljdGVkLXBhdGhzJzogcmVxdWlyZSgnLi9ydWxlcy9uby1yZXN0cmljdGVkLXBhdGhzJyksXG4gICduby1pbnRlcm5hbC1tb2R1bGVzJzogcmVxdWlyZSgnLi9ydWxlcy9uby1pbnRlcm5hbC1tb2R1bGVzJyksXG4gICdncm91cC1leHBvcnRzJzogcmVxdWlyZSgnLi9ydWxlcy9ncm91cC1leHBvcnRzJyksXG5cbiAgJ25vLXNlbGYtaW1wb3J0JzogcmVxdWlyZSgnLi9ydWxlcy9uby1zZWxmLWltcG9ydCcpLFxuICAnbm8tY3ljbGUnOiByZXF1aXJlKCcuL3J1bGVzL25vLWN5Y2xlJyksXG4gICduby1uYW1lZC1kZWZhdWx0JzogcmVxdWlyZSgnLi9ydWxlcy9uby1uYW1lZC1kZWZhdWx0JyksXG4gICduby1uYW1lZC1hcy1kZWZhdWx0JzogcmVxdWlyZSgnLi9ydWxlcy9uby1uYW1lZC1hcy1kZWZhdWx0JyksXG4gICduby1uYW1lZC1hcy1kZWZhdWx0LW1lbWJlcic6IHJlcXVpcmUoJy4vcnVsZXMvbm8tbmFtZWQtYXMtZGVmYXVsdC1tZW1iZXInKSxcbiAgJ25vLWFub255bW91cy1kZWZhdWx0LWV4cG9ydCc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tYW5vbnltb3VzLWRlZmF1bHQtZXhwb3J0JyksXG5cbiAgJ25vLWNvbW1vbmpzJzogcmVxdWlyZSgnLi9ydWxlcy9uby1jb21tb25qcycpLFxuICAnbm8tYW1kJzogcmVxdWlyZSgnLi9ydWxlcy9uby1hbWQnKSxcbiAgJ25vLWR1cGxpY2F0ZXMnOiByZXF1aXJlKCcuL3J1bGVzL25vLWR1cGxpY2F0ZXMnKSxcbiAgJ2ZpcnN0JzogcmVxdWlyZSgnLi9ydWxlcy9maXJzdCcpLFxuICAnbWF4LWRlcGVuZGVuY2llcyc6IHJlcXVpcmUoJy4vcnVsZXMvbWF4LWRlcGVuZGVuY2llcycpLFxuICAnbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXMnOiByZXF1aXJlKCcuL3J1bGVzL25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzJyksXG4gICduby1hYnNvbHV0ZS1wYXRoJzogcmVxdWlyZSgnLi9ydWxlcy9uby1hYnNvbHV0ZS1wYXRoJyksXG4gICduby1ub2RlanMtbW9kdWxlcyc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tbm9kZWpzLW1vZHVsZXMnKSxcbiAgJ25vLXdlYnBhY2stbG9hZGVyLXN5bnRheCc6IHJlcXVpcmUoJy4vcnVsZXMvbm8td2VicGFjay1sb2FkZXItc3ludGF4JyksXG4gICdvcmRlcic6IHJlcXVpcmUoJy4vcnVsZXMvb3JkZXInKSxcbiAgJ25ld2xpbmUtYWZ0ZXItaW1wb3J0JzogcmVxdWlyZSgnLi9ydWxlcy9uZXdsaW5lLWFmdGVyLWltcG9ydCcpLFxuICAncHJlZmVyLWRlZmF1bHQtZXhwb3J0JzogcmVxdWlyZSgnLi9ydWxlcy9wcmVmZXItZGVmYXVsdC1leHBvcnQnKSxcbiAgJ25vLWRlZmF1bHQtZXhwb3J0JzogcmVxdWlyZSgnLi9ydWxlcy9uby1kZWZhdWx0LWV4cG9ydCcpLFxuICAnbm8tZHluYW1pYy1yZXF1aXJlJzogcmVxdWlyZSgnLi9ydWxlcy9uby1keW5hbWljLXJlcXVpcmUnKSxcbiAgJ3VuYW1iaWd1b3VzJzogcmVxdWlyZSgnLi9ydWxlcy91bmFtYmlndW91cycpLFxuICAnbm8tdW5hc3NpZ25lZC1pbXBvcnQnOiByZXF1aXJlKCcuL3J1bGVzL25vLXVuYXNzaWduZWQtaW1wb3J0JyksXG4gICduby11c2VsZXNzLXBhdGgtc2VnbWVudHMnOiByZXF1aXJlKCcuL3J1bGVzL25vLXVzZWxlc3MtcGF0aC1zZWdtZW50cycpLFxuICAnZHluYW1pYy1pbXBvcnQtY2h1bmtuYW1lJzogcmVxdWlyZSgnLi9ydWxlcy9keW5hbWljLWltcG9ydC1jaHVua25hbWUnKSxcblxuICAvLyBleHBvcnRcbiAgJ2V4cG9ydHMtbGFzdCc6IHJlcXVpcmUoJy4vcnVsZXMvZXhwb3J0cy1sYXN0JyksXG5cbiAgLy8gbWV0YWRhdGEtYmFzZWRcbiAgJ25vLWRlcHJlY2F0ZWQnOiByZXF1aXJlKCcuL3J1bGVzL25vLWRlcHJlY2F0ZWQnKSxcblxuICAvLyBkZXByZWNhdGVkIGFsaWFzZXMgdG8gcnVsZXNcbiAgJ2ltcG9ydHMtZmlyc3QnOiByZXF1aXJlKCcuL3J1bGVzL2ltcG9ydHMtZmlyc3QnKSxcbn1cblxuZXhwb3J0IGNvbnN0IGNvbmZpZ3MgPSB7XG4gICdyZWNvbW1lbmRlZCc6IHJlcXVpcmUoJy4uL2NvbmZpZy9yZWNvbW1lbmRlZCcpLFxuXG4gICdlcnJvcnMnOiByZXF1aXJlKCcuLi9jb25maWcvZXJyb3JzJyksXG4gICd3YXJuaW5ncyc6IHJlcXVpcmUoJy4uL2NvbmZpZy93YXJuaW5ncycpLFxuXG4gIC8vIHNoaGhoLi4uIHdvcmsgaW4gcHJvZ3Jlc3MgXCJzZWNyZXRcIiBydWxlc1xuICAnc3RhZ2UtMCc6IHJlcXVpcmUoJy4uL2NvbmZpZy9zdGFnZS0wJyksXG5cbiAgLy8gdXNlZnVsIHN0dWZmIGZvciBmb2xrcyB1c2luZyB2YXJpb3VzIGVudmlyb25tZW50c1xuICAncmVhY3QnOiByZXF1aXJlKCcuLi9jb25maWcvcmVhY3QnKSxcbiAgJ3JlYWN0LW5hdGl2ZSc6IHJlcXVpcmUoJy4uL2NvbmZpZy9yZWFjdC1uYXRpdmUnKSxcbiAgJ2VsZWN0cm9uJzogcmVxdWlyZSgnLi4vY29uZmlnL2VsZWN0cm9uJyksXG59XG4iXX0=