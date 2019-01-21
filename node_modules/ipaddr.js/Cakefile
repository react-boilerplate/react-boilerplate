fs           = require 'fs'
CoffeeScript = require 'coffee-script'
nodeunit     = require 'nodeunit'
UglifyJS     = require 'uglify-js'

task 'build', 'build javascript files from sources', (cb) ->
  source = fs.readFileSync 'src/ipaddr.coffee', 'utf-8'
  fs.writeFileSync 'lib/ipaddr.js', CoffeeScript.compile source.toString()

  source = fs.readFileSync 'lib/ipaddr.js', 'utf-8'
  fs.writeFileSync('ipaddr.min.js', UglifyJS.minify(source).code)

task 'test', 'run the bundled tests', (cb) ->
  nodeunit.reporters.default.run ['test']
