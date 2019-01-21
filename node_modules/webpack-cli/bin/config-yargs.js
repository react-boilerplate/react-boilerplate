const optionsSchema = require("./optionsSchema.json");
const CONFIG_GROUP = "Config options:";
const BASIC_GROUP = "Basic options:";
const MODULE_GROUP = "Module options:";
const OUTPUT_GROUP = "Output options:";
const ADVANCED_GROUP = "Advanced options:";
const RESOLVE_GROUP = "Resolving options:";
const OPTIMIZE_GROUP = "Optimizing options:";

module.exports = function(yargs) {
	yargs
		.help("help")
		.alias("help", "h")
		.version()
		.alias("version", "v")
		.options({
			config: {
				type: "string",
				describe: "Path to the config file",
				group: CONFIG_GROUP,
				defaultDescription: "webpack.config.js or webpackfile.js",
				requiresArg: true
			},
			"config-register": {
				type: "array",
				alias: "r",
				describe:
					"Preload one or more modules before loading the webpack configuration",
				group: CONFIG_GROUP,
				defaultDescription: "module id or path",
				requiresArg: true
			},
			"config-name": {
				type: "string",
				describe: "Name of the config to use",
				group: CONFIG_GROUP,
				requiresArg: true
			},
			env: {
				describe: "Environment passed to the config, when it is a function",
				group: CONFIG_GROUP
			},
			mode: {
				type: optionsSchema.properties.mode.type,
				choices: optionsSchema.properties.mode.enum,
				describe: optionsSchema.properties.mode.description,
				group: CONFIG_GROUP,
				requiresArg: true
			},
			context: {
				type: optionsSchema.properties.context.type,
				describe: optionsSchema.properties.context.description,
				group: BASIC_GROUP,
				defaultDescription: "The current directory",
				requiresArg: true
			},
			entry: {
				type: "string",
				describe: optionsSchema.properties.entry.description,
				group: BASIC_GROUP,
				requiresArg: true
			},
			"module-bind": {
				type: "string",
				describe: "Bind an extension to a loader",
				group: MODULE_GROUP,
				requiresArg: true
			},
			"module-bind-post": {
				type: "string",
				describe: "Bind an extension to a post loader",
				group: MODULE_GROUP,
				requiresArg: true
			},
			"module-bind-pre": {
				type: "string",
				describe: "Bind an extension to a pre loader",
				group: MODULE_GROUP,
				requiresArg: true
			},
			output: {
				alias: "o",
				describe: "The output path and file for compilation assets",
				group: OUTPUT_GROUP,
				requiresArg: true
			},
			"output-path": {
				type: "string",
				describe: optionsSchema.definitions.output.properties.path.description,
				group: OUTPUT_GROUP,
				defaultDescription: "The current directory",
				requiresArg: true
			},
			"output-filename": {
				type: "string",
				describe:
					optionsSchema.definitions.output.properties.filename.description,
				group: OUTPUT_GROUP,
				defaultDescription: "[name].js",
				requiresArg: true
			},
			"output-chunk-filename": {
				type: "string",
				describe:
					optionsSchema.definitions.output.properties.chunkFilename.description,
				group: OUTPUT_GROUP,
				defaultDescription:
					"filename with [id] instead of [name] or [id] prefixed",
				requiresArg: true
			},
			"output-source-map-filename": {
				type: "string",
				describe:
					optionsSchema.definitions.output.properties.sourceMapFilename
						.description,
				group: OUTPUT_GROUP,
				requiresArg: true
			},
			"output-public-path": {
				type: "string",
				describe:
					optionsSchema.definitions.output.properties.publicPath.description,
				group: OUTPUT_GROUP,
				requiresArg: true
			},
			"output-jsonp-function": {
				type: "string",
				describe:
					optionsSchema.definitions.output.properties.jsonpFunction.description,
				group: OUTPUT_GROUP,
				requiresArg: true
			},
			"output-pathinfo": {
				type: "boolean",
				describe:
					optionsSchema.definitions.output.properties.pathinfo.description,
				group: OUTPUT_GROUP
			},
			"output-library": {
				type: "string",
				describe: "Expose the exports of the entry point as library",
				group: OUTPUT_GROUP,
				requiresArg: true
			},
			"output-library-target": {
				type: "string",
				describe:
					optionsSchema.definitions.output.properties.libraryTarget.description,
				choices: optionsSchema.definitions.output.properties.libraryTarget.enum,
				group: OUTPUT_GROUP,
				requiresArg: true
			},
			"records-input-path": {
				type: "string",
				describe: optionsSchema.properties.recordsInputPath.description,
				group: ADVANCED_GROUP,
				requiresArg: true
			},
			"records-output-path": {
				type: "string",
				describe: optionsSchema.properties.recordsOutputPath.description,
				group: ADVANCED_GROUP,
				requiresArg: true
			},
			"records-path": {
				type: "string",
				describe: optionsSchema.properties.recordsPath.description,
				group: ADVANCED_GROUP,
				requiresArg: true
			},
			define: {
				type: "string",
				describe: "Define any free var in the bundle",
				group: ADVANCED_GROUP,
				requiresArg: true
			},
			target: {
				type: "string",
				describe: optionsSchema.properties.target.description,
				group: ADVANCED_GROUP,
				requiresArg: true
			},
			cache: {
				type: "boolean",
				describe: optionsSchema.properties.cache.description,
				default: null,
				group: ADVANCED_GROUP,
				defaultDescription: "It's enabled by default when watching"
			},
			watch: {
				type: "boolean",
				alias: "w",
				describe: optionsSchema.properties.watch.description,
				group: BASIC_GROUP
			},
			"watch-stdin": {
				type: "boolean",
				alias: "stdin",
				describe:
					optionsSchema.properties.watchOptions.properties.stdin.description,
				group: ADVANCED_GROUP
			},
			"watch-aggregate-timeout": {
				describe:
					optionsSchema.properties.watchOptions.properties.aggregateTimeout
						.description,
				type:
					optionsSchema.properties.watchOptions.properties.aggregateTimeout
						.type,
				group: ADVANCED_GROUP,
				requiresArg: true
			},
			"watch-poll": {
				type: "string",
				describe:
					optionsSchema.properties.watchOptions.properties.poll.description,
				group: ADVANCED_GROUP
			},
			hot: {
				type: "boolean",
				describe: "Enables Hot Module Replacement",
				group: ADVANCED_GROUP
			},
			debug: {
				type: "boolean",
				describe: "Switch loaders to debug mode",
				group: BASIC_GROUP
			},
			devtool: {
				type: "string",
				describe: optionsSchema.properties.devtool.description,
				group: BASIC_GROUP,
				requiresArg: true
			},
			"resolve-alias": {
				type: "string",
				describe:
					optionsSchema.definitions.resolve.properties.alias.description,
				group: RESOLVE_GROUP,
				requiresArg: true
			},
			"resolve-extensions": {
				type: "array",
				describe:
					optionsSchema.definitions.resolve.properties.alias.description,
				group: RESOLVE_GROUP,
				requiresArg: true
			},
			"resolve-loader-alias": {
				type: "string",
				describe: "Setup a loader alias for resolving",
				group: RESOLVE_GROUP,
				requiresArg: true
			},
			"optimize-max-chunks": {
				describe: "Try to keep the chunk count below a limit",
				group: OPTIMIZE_GROUP,
				requiresArg: true
			},
			"optimize-min-chunk-size": {
				describe:
					optionsSchema.properties.optimization.properties.splitChunks.oneOf[1]
						.properties.minSize.description,
				group: OPTIMIZE_GROUP,
				requiresArg: true
			},
			"optimize-minimize": {
				type: "boolean",
				describe:
					optionsSchema.properties.optimization.properties.minimize.description,
				group: OPTIMIZE_GROUP
			},
			prefetch: {
				type: "string",
				describe: "Prefetch this request (Example: --prefetch ./file.js)",
				group: ADVANCED_GROUP,
				requiresArg: true
			},
			provide: {
				type: "string",
				describe:
					"Provide these modules as free vars in all modules (Example: --provide jQuery=jquery)",
				group: ADVANCED_GROUP,
				requiresArg: true
			},
			"labeled-modules": {
				type: "boolean",
				describe: "Enables labeled modules",
				group: ADVANCED_GROUP
			},
			plugin: {
				type: "string",
				describe: "Load this plugin",
				group: ADVANCED_GROUP,
				requiresArg: true
			},
			bail: {
				type: optionsSchema.properties.bail.type,
				describe: optionsSchema.properties.bail.description,
				group: ADVANCED_GROUP,
				default: null
			},
			profile: {
				type: "boolean",
				describe: optionsSchema.properties.profile.description,
				group: ADVANCED_GROUP,
				default: null
			},
			d: {
				type: "boolean",
				describe:
					"shortcut for --debug --devtool eval-cheap-module-source-map --output-pathinfo",
				group: BASIC_GROUP
			},
			p: {
				type: "boolean",
				describe:
					"shortcut for --optimize-minimize --define process.env.NODE_ENV=\"production\"",
				group: BASIC_GROUP
			}
		});
};
