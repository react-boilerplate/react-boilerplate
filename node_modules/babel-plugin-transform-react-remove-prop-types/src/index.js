// @flow weak
/* eslint-disable global-require, import/no-dynamic-require */

// import generate from 'babel-generator';
// console.log(generate(node).code);
import isAnnotatedForRemoval from './isAnnotatedForRemoval'
import isStatelessComponent from './isStatelessComponent'
import remove from './remove'

function isPathReactClass(path, globalOptions) {
  const node = path.node
  const matchers = globalOptions.classNameMatchers

  if (path.matchesPattern('React.Component') || path.matchesPattern('React.PureComponent')) {
    return true
  }

  if (node && (node.name === 'Component' || node.name === 'PureComponent')) {
    return true
  }

  if (node && matchers && node.name.match(matchers)) {
    return true
  }

  return false
}

function isReactClass(superClass, scope, globalOptions) {
  if (!superClass.node) {
    return false
  }

  let answer = false

  if (isPathReactClass(superClass, globalOptions)) {
    answer = true
  } else if (superClass.node.name) {
    // Check for inheritance
    const className = superClass.node.name
    const binding = scope.getBinding(className)
    if (!binding) {
      answer = false
    } else {
      const bindingSuperClass = binding.path.get('superClass')

      if (isPathReactClass(bindingSuperClass, globalOptions)) {
        answer = true
      }
    }
  }

  return answer
}

export default function({ template, types, traverse }) {
  return {
    visitor: {
      Program(programPath, state) {
        let ignoreFilenames
        let classNameMatchers

        if (state.opts.ignoreFilenames) {
          ignoreFilenames = new RegExp(state.opts.ignoreFilenames.join('|'), 'gi')
        } else {
          ignoreFilenames = undefined
        }

        if (state.opts.classNameMatchers) {
          classNameMatchers = new RegExp(state.opts.classNameMatchers.join('|'), 'g')
        } else {
          classNameMatchers = undefined
        }

        const globalOptions = {
          visitedKey: `transform-react-remove-prop-types${Date.now()}`,
          unsafeWrapTemplate: template(
            `
              if (process.env.NODE_ENV !== "production") {
                NODE;
              }
            `,
            { placeholderPattern: /^NODE$/ }
          ),
          wrapTemplate: template(
            `
              LEFT = process.env.NODE_ENV !== "production" ? RIGHT : {}
            `,
            { placeholderPattern: /^(LEFT|RIGHT)$/ }
          ),
          mode: state.opts.mode || 'remove',
          ignoreFilenames,
          types,
          removeImport: state.opts.removeImport || false,
          libraries: (state.opts.additionalLibraries || []).concat('prop-types'),
          classNameMatchers,
        }

        if (state.opts.plugins) {
          const pluginsState = state
          const pluginsVisitors = state.opts.plugins.map(pluginOpts => {
            const pluginName = typeof pluginOpts === 'string' ? pluginOpts : pluginOpts[0]

            if (typeof pluginOpts !== 'string') {
              pluginsState.opts = {
                ...pluginsState.opts,
                ...pluginOpts[1],
              }
            }

            let plugin = require(pluginName)
            if (typeof plugin !== 'function') {
              plugin = plugin.default
            }

            return plugin({ template, types }).visitor
          })

          traverse(
            programPath.parent,
            traverse.visitors.merge(pluginsVisitors),
            programPath.scope,
            pluginsState,
            programPath.parentPath
          )
        }

        // On program start, do an explicit traversal up front for this plugin.
        programPath.traverse({
          ObjectProperty: {
            exit(path) {
              const node = path.node

              if (node.computed || node.key.name !== 'propTypes') {
                return
              }

              const parent = path.findParent(currentNode => {
                if (currentNode.type !== 'CallExpression') {
                  return false
                }

                return currentNode.get('callee').node.name === 'createReactClass'
              })

              if (parent) {
                remove(path, globalOptions, {
                  type: 'createClass',
                })
              }
            },
          },
          // Here to support stage-1 transform-class-properties.
          ClassProperty(path) {
            const { node, scope } = path

            if (node.key.name === 'propTypes') {
              const pathClassDeclaration = scope.path

              if (isReactClass(pathClassDeclaration.get('superClass'), scope, globalOptions)) {
                remove(path, globalOptions, {
                  type: 'class static',
                  pathClassDeclaration,
                })
              }
            }
          },
          AssignmentExpression(path) {
            const { node, scope } = path

            if (
              node.left.computed ||
              !node.left.property ||
              node.left.property.name !== 'propTypes'
            ) {
              return
            }

            const forceRemoval = isAnnotatedForRemoval(path.node.left)

            if (forceRemoval) {
              remove(path, globalOptions, { type: 'assign' })
              return
            }

            const className = node.left.object.name
            const binding = scope.getBinding(className)

            if (!binding) {
              return
            }

            if (binding.path.isClassDeclaration()) {
              const superClass = binding.path.get('superClass')

              if (isReactClass(superClass, scope, globalOptions)) {
                remove(path, globalOptions, { type: 'assign' })
              }
            } else if (isStatelessComponent(binding.path)) {
              remove(path, globalOptions, { type: 'assign' })
            }
          },
        })

        if (globalOptions.removeImport) {
          if (globalOptions.mode === 'remove') {
            programPath.scope.crawl()

            programPath.traverse({
              ImportDeclaration(path) {
                const { source, specifiers } = path.node
                if (globalOptions.libraries.indexOf(source.value) === -1) {
                  return
                }
                const haveUsedSpecifiers = specifiers.some(specifier => {
                  const importedIdentifierName = specifier.local.name
                  const { referencePaths } = path.scope.getBinding(importedIdentifierName)
                  return referencePaths.length > 0
                })

                if (!haveUsedSpecifiers) {
                  path.remove()
                }
              },
            })
          } else {
            throw new Error(
              'react-remove-prop-types: removeImport and mode=remove can not be used at the same time.'
            )
          }
        }
      },
    },
  }
}
