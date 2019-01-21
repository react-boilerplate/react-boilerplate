const fs = require('fs')
const path = require('path')
const assign = require('object-assign')
const expect = require('expect.js')
const webpack = require('webpack')

describe('svg-url-loader', function() {
    'use strict'

    this.timeout(10000)

    const outputDir = path.resolve(__dirname, './output'),
        bundleFileName = 'bundle.js',
        getBundleFile = function() {
            return path.join(outputDir, bundleFileName)
        }
    const svgUrlLoader = path.resolve(__dirname, '../')
    const globalConfig = {
        context: path.resolve(__dirname, '../'),
        mode: 'development',
		output: {
            path: outputDir,
            filename: bundleFileName
        },
        module: {
            rules: [
                {
                    test: /\.svg/,
                    exclude: /node_modules/,
                    use: [
                        {
							loader: svgUrlLoader,
							options: {}
                        }
                    ]
                }
            ]
        }
    }

    // Clean generated cache files before each test so that we can call each test with an empty state.
    afterEach(function(done) {
        fs.unlink(getBundleFile(), done)
        globalConfig.module.rules[0].use[0].options = {}
    })


    describe('"noquotes" option', function () {
        it('should convert SVG file to utf-8 encoded data-uri string, enclosed in quotes', function(done) {
            const config = assign({}, globalConfig, {
                entry: './test/input/icon.js'
            })
            config.module.rules[0].use[0].options.noquotes = false
            webpack(config, function(err) {
                expect(err).to.be(null)
                fs.readFile(getBundleFile(), function(err, data) {
                    expect(err).to.be(null)
                    const encoded = eval(data.toString())
                    expect(encoded.indexOf('"')).to.be(0)
                    expect(encoded.lastIndexOf('"')).to.be(encoded.length - 1)
                    expect(encoded.indexOf('data:image/svg+xml,%3Csvg')).to.be(1)
                    return done()
                })
            })
        })


        it('should not enclose output in quotes if \'noquotes\' option is specified', function(done) {
            const config = assign({}, globalConfig, {
                entry: './test/input/icon.js'
            })
            config.module.rules[0].use[0].options.noquotes = true

            webpack(config, function(err) {
                expect(err).to.be(null)
                fs.readFile(getBundleFile(), function(err, data) {
                    expect(err).to.be(null)
                    const encoded = eval(data.toString())
                    expect(encoded.indexOf('data:image/svg+xml,%3Csvg')).to.be(0)
                    expect(encoded.lastIndexOf('svg%3E')).to.be(encoded.length - 'svg%3E'.length)
                    return done()
                })
            })
        })
    })


    describe('"stripdeclarations" option', function () {
        it('if turned off - should do nothing to an SVG that has an XML declaration', function(done) {
            const config = assign({}, globalConfig, {
                entry: './test/input/icon-with-declaration.js'
            })
            config.module.rules[0].use[0].options.stripdeclarations = false

            webpack(config, function(err) {
                expect(err).to.be(null)
                fs.readFile(getBundleFile(), function(err, data) {
                    expect(err).to.be(null)
                    const encoded = eval(data.toString())
                    expect(encoded.indexOf("%3C?xml version='1.0' encoding='UTF-8'?%3E")).to.be.greaterThan(-1)
                    return done()
                })
            })
        })

        it('if turned on - should do nothing to an SVG that doesn\'t have an XML declaration', function(done) {
            const config = assign({}, globalConfig, {
                entry: './test/input/icon.js'
            })
            config.module.rules[0].use[0].options.stripdeclarations = true

            webpack(config, function(err) {
                expect(err).to.be(null)
                fs.readFile(getBundleFile(), function(err, data) {
                    expect(err).to.be(null)
                    const encoded = eval(data.toString())
                    expect(encoded.indexOf('"')).to.be(0)
                    expect(encoded.lastIndexOf('"')).to.be(encoded.length - 1)
                    expect(encoded.indexOf('data:image/svg+xml,%3Csvg')).to.be(1)
                    return done()
                })
            })
        })


        it('if turned on - should remove XML declaration from a file that has one', function(done) {
            const config = assign({}, globalConfig, {
                entry: './test/input/icon-with-declaration.js'
            })
            config.module.rules[0].use[0].options.stripdeclarations = true

            webpack(config, function(err) {
                expect(err).to.be(null)
                fs.readFile(getBundleFile(), function(err, data) {
                    expect(err).to.be(null)
                    const encoded = eval(data.toString())
                    expect(encoded.indexOf('%3C?xml version="1.0" encoding="UTF-8"?%3E')).to.be(-1)
                    expect(encoded.indexOf('data:image/svg+xml,%3Csvg')).to.be(1)
                    return done()
                })
            })
        })
    })



    describe('"limit" option and "url.dataUrlLimit" configuration', function () {
        it('should fall back to file-loader if the content of SVG file is longer than "limit" query parameter', function(done) {
            const config = assign({}, globalConfig, {
                entry: './test/input/icon.js'
            })
            config.module.rules[0].use[0].options.limit = 10
            config.module.rules[0].use[0].options.name = 'foo.svg'

            webpack(config, function(err) {
                expect(err).to.be(null)
                fs.readFile(getBundleFile(), function(err, data) {
                    expect(err).to.be(null)
                    const encoded = eval(data.toString())
                    expect(encoded).to.be('foo.svg')
                    return done()
                })
            })
        })
    })


    describe('combining with other loaders', function () {
        it('should convert SVG file to utf-8 encoded data-uri string, when embedded in LESS file', function(done) {
            const config = assign({}, globalConfig, {
                entry: './test/input/less.js'
            })
            config.module.rules[0].use[0].options.noquotes = false
            config.module.rules.push({
                test: /\.less$/,
                use: [
                    'css-loader',
                    'less-loader'
	             ]
            })

            webpack(config, function(err) {
                expect(err).to.be(null)
                fs.readFile(getBundleFile(), function(err, data) {
                    expect(err).to.be(null)
                    const encoded = eval(data.toString())
                    let found = false
                    for(let i=0; i<encoded[0].length; ++i) {
                        const v = encoded[0][i]
                        if (typeof v === 'string' && v.indexOf('background-image: url("data:image/svg+xml,%3Csvg') !== -1) {
                            found = true
                        }
                    }
                    expect(found).to.be(true)
                    return done()
                })
            })
        })


        it('should convert SVG file to utf-8 encoded data-uri string, when embedded in SCSS file', function(done) {
            const config = assign({}, globalConfig, {
                entry: './test/input/scss.js'
            })
            config.module.rules[0].use[0].options.noquotes = false
            config.module.rules.push({
                test: /\.scss$/,
                use: [
                    'css-loader',
                    'sass-loader'
                ]
            })

            webpack(config, function(err) {
                expect(err).to.be(null)
                fs.readFile(getBundleFile(), function(err, data) {
                    expect(err).to.be(null)
                    const encoded = eval(data.toString())
                    let found = false
                    for(let i=0; i<encoded[0].length; ++i) {
                        const v = encoded[0][i]
                        if (typeof v === 'string' && v.indexOf('background-image: url("data:image/svg+xml,%3Csvg') !== -1) {
                            found = true
                        }
                    }
                    expect(found).to.be(true)
                    return done()
                })
            })
        })


        it('should convert SVG file to utf-8 encoded data-uri string, when embedded in CSS file', function(done) {
            const config = assign({}, globalConfig, {
                entry: './test/input/css.js'
            })
            config.module.rules[0].use[0].options.noquotes = false
            config.module.rules.push({
                test: /\.css$/,
                use: [
                    'css-loader'
                ]
            })

            webpack(config, function(err) {
                expect(err).to.be(null)
                fs.readFile(getBundleFile(), function(err, data) {
                    expect(err).to.be(null)
                    const encoded = eval(data.toString())
                    let found = false
                    for(let i=0; i<encoded[0].length; ++i) {
                        const v = encoded[0][i]
                        if (typeof v === 'string' && v.indexOf('background-image: url("data:image/svg+xml,%3Csvg') !== -1) {
                            found = true
                        }
                    }
                    expect(found).to.be(true)
                    return done()
                })
            })
        })
    })

    describe('"iesafe" option skips styled files encoded to more than 4kB', function () {
        it('should encode file below limit', function(done) {
            const config = assign({}, globalConfig, {
                entry: './test/input/4047B-encoded-styled.js'
            })
            config.module.rules[0].use[0].options.iesafe = true
            config.module.rules[0].use[0].options.noquotes = true

            webpack(config, function(err) {
                expect(err).to.be(null)
                fs.readFile(getBundleFile(), function(err, data) {
                    expect(err).to.be(null)
                    const encoded = eval(data.toString())
                    expect(encoded.indexOf('data:image/svg+xml,%3Csvg')).to.be(0)
                    expect(encoded.length).to.be.below(4096)
                    return done()
                })
            })
        })

        it('should encode file above limit without style-element', function(done) {
            const config = assign({}, globalConfig, {
                entry: './test/input/4104B-encoded-unstyled.js'
            })
            config.module.rules[0].use[0].options.iesafe = true
            config.module.rules[0].use[0].options.noquotes = true

            webpack(config, function(err) {
                expect(err).to.be(null)
                fs.readFile(getBundleFile(), function(err, data) {
                    expect(err).to.be(null)
                    const encoded = eval(data.toString())
                    expect(encoded.indexOf('data:image/svg+xml,%3Csvg')).to.be(0)
                    expect(encoded.length).to.be.above(4096)
                    return done()
                })
            })
        })

        it('should fall back on file above limit with style-element', function(done) {
            const config = assign({}, globalConfig, {
                entry: './test/input/4099B-encoded-styled.js'
            })
            config.module.rules[0].use[0].options.iesafe = true
            config.module.rules[0].use[0].options.name = 'foo.svg'

            webpack(config, function(err) {
                expect(err).to.be(null)
                fs.readFile(getBundleFile(), function(err, data) {
                    expect(err).to.be(null)
                    const encoded = eval(data.toString())
                    expect(encoded).to.be('foo.svg')
                    return done()
                })
            })
        })

        it('should fall back on file above limit with style-element even when base64 encoding', function(done) {
            const config = assign({}, globalConfig, {
                entry: './test/input/4099B-encoded-styled.js'
            })
            config.module.rules[0].use[0].options.iesafe = true
            config.module.rules[0].use[0].options.name = 'foo.svg'
            config.module.rules[0].use[0].options.encoding = "base64"

            webpack(config, function(err) {
                expect(err).to.be(null)
                fs.readFile(getBundleFile(), function(err, data) {
                    expect(err).to.be(null)
                    const encoded = eval(data.toString())
                    expect(encoded).to.be('foo.svg')
                    return done()
                })
            })
        })
    })

    describe("encoding is base64", function() {
        it('should convert SVG file to base64 encoded data-uri string', function(done) {
            const config = assign({}, globalConfig, {
                entry: './test/input/icon.js'
            })
            config.module.rules[0].use[0].options.encoding = "base64"

            webpack(config, function(err) {
                expect(err).to.be(null)
                fs.readFile(getBundleFile(), function(err, data) {
                    expect(err).to.be(null)
                    const encoded = eval(data.toString())
                    expect(encoded.indexOf('"')).to.be(-1)
                    expect(encoded.lastIndexOf('"')).to.be(-1)
                    expect(encoded.indexOf('data:image/svg+xml;base64')).to.be(0)
                    return done()
                })
            })
        })
    })
})
