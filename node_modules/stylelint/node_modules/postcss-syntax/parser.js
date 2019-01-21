"use strict";

const getSyntax = require("./get-syntax");
const patch = require("./patch-postcss");

const extToLang = {
	"sugarss": /^s(?:ugar)?ss$/i,
	"stylus": /^styl(?:us)?$/i,
	// WXSS(WeiXin Style Sheets) See: https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html
	// acss(AntFinancial Style Sheet) See: https://docs.alipay.com/mini/framework/acss
	// `*.pcss`, `*.postcss`
	"css": /^(?:wx|\w*c)ss$/i,
	"html": /^(?:[sx]?html?|[sx]ht|vue|ux|php)$/i,
	"markdown": /^(?:markdown|md)$/i,
	"jsx": /^(?:m?[jt]sx?|es\d*|pac)$/i,
};

function parser (source, rules, opts) {
	patch();
	let lang = rules.find(rule => rule.lang);
	if (lang) {
		lang = lang.lang;
	} else if (opts.from && /\.(\w+)$/.test(opts.from)) {
		lang = RegExp.$1.toLowerCase();
		if (!/^(?:css|less|sass|scss)$/i.test(lang)) {
			for (const langName in extToLang) {
				if (extToLang[langName].test(lang)) {
					lang = langName;
					break;
				}
			}
		}
	} else {
		lang = "css";
	}

	const syntax = getSyntax(lang, opts);
	const root = syntax.parse(source, opts);

	root.source.syntax = syntax;
	root.source.lang = lang;

	return root;
}

module.exports = parser;
