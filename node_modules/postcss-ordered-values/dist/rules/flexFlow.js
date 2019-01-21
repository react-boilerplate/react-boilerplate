'use strict';

exports.__esModule = true;
exports.default = normalizeFlexFlow;
// flex-flow: <flex-direction> || <flex-wrap>

var flexDirection = ['row', 'row-reverse', 'column', 'column-reverse'];

var flexWrap = ['nowrap', 'wrap', 'wrap-reverse'];

function normalizeFlexFlow(decl, flexFlow) {
    var order = {
        direction: '',
        wrap: ''
    };
    flexFlow.walk(function (node) {
        if (~flexDirection.indexOf(node.value)) {
            order.direction = node.value;
            return;
        }
        if (~flexWrap.indexOf(node.value)) {
            order.wrap = node.value;
            return;
        }
    });
    decl.value = (order.direction + ' ' + order.wrap).trim();
};
module.exports = exports['default'];