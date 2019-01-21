"use strict";

const stringify = require("./stringify");
const parse = require("./parse");
const defaultConfig = {
	rules: [
		{
			test: /\.less$/i,
			lang: "less",
		},
		{
			test: /\.sass$/i,
			lang: "sass",
		},
		{
			test: /\.scss$/i,
			lang: "scss",
		},
		{
			test: /\.s(?:ugar)?ss$/i,
			lang: "sugarss",
		},
		{
			test: /\.styl(?:us)?$/i,
			lang: "stylus",
		},
		{
			// WXSS(WeiXin Style Sheets) See: https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html
			// acss(AntFinancial Style Sheet) See: https://docs.alipay.com/mini/framework/acss
			// `*.pcss`, `*.postcss`
			test: /\.(?:wx|\w*c)ss$/i,
			lang: "css",
		},
		{
			// *.xslt?	https://msdn.microsoft.com/en-us/library/ms764661(v=vs.85).aspx
			// *.vue	https://vue-loader.vuejs.org/spec.html
			// *.ux		https://doc.quickapp.cn/framework/source-file.html
			// `*.xml`	Just for fault tolerance, XML is not supported except XSLT
			// `*.htm`, `*.*htm`
			// `*.html`, `*.*html`
			test: /\.(?:\w*html?|x(?:ht|ml|slt?)|markdown|md|php|vue|ux)$/i,
			extract: "html",
		},
		{
			test: /\.(?:markdown|md)$/i,
			extract: "markdown",
		},
		{
			test: /\.(?:m?[jt]sx?|es\d*|pac)$/i,
			extract: "jsx",
		},
	],
	postcss: "css",
	stylus: "css",
};

function initSyntax (syntax) {
	syntax.stringify = stringify.bind(syntax);
	syntax.parse = parse.bind(syntax);
	return syntax;
}

function syntax (config) {
	return initSyntax({
		config: Object.assign({}, defaultConfig, config),
	});
}

initSyntax(syntax);
syntax.config = defaultConfig;
module.exports = syntax;
