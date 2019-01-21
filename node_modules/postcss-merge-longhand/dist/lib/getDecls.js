"use strict";

exports.__esModule = true;
exports.default = getDecls;
function getDecls(rule, properties) {
    return rule.nodes.filter(function (_ref) {
        var prop = _ref.prop;
        return prop && ~properties.indexOf(prop);
    });
}
module.exports = exports["default"];