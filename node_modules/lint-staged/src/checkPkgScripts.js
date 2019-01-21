'use strict'

const chalk = require('chalk')
const dedent = require('dedent')
const has = require('lodash/has')

const warn = msg => {
  console.warn(chalk.yellowBright.bold(msg))
}

/**
 * Checks if the given command or binary name is present in the package.json scripts. This would be
 * called if and when resolving a binary fails in `findBin`.
 *
 * @param {Object} pkg package.json
 * @param {string} cmd
 * @param {string} binName
 * @param {Array<string>} args
 * @throws {Error} If a script is found in the pkg for the given `cmd` or `binName`.
 */
module.exports = function checkPkgScripts(pkg, cmd, binName, args) {
  if (pkg && pkg.scripts) {
    const { scripts } = pkg
    let scriptName
    let script
    if (has(scripts, cmd)) {
      scriptName = cmd
      script = scripts[cmd]
    } else if (has(scripts, binName)) {
      scriptName = binName
      script = scripts[binName]
    } else {
      return
    }

    const argsStr = args && args.length ? args.join(' ') : ''
    warn(dedent`
      \`lint-staged\` no longer supports running scripts defined in package.json.

      The same behavior can be achieved by changing the command to any of the following:
        - \`npm run ${scriptName} -- ${argsStr}\`
        - \`${script} ${argsStr}\`
    `)
    throw new Error(`Could not resolve binary for \`${cmd}\``)
  }
}
