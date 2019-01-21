'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _helperAnnotateAsPure = require('@babel/helper-annotate-as-pure');

var _helperAnnotateAsPure2 = _interopRequireDefault(_helperAnnotateAsPure);

var _options = require('../utils/options');

var _detectors = require('../utils/detectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (path, state) {
    if ((0, _options.useUglifyPure)(state)) {
        if ((0, _detectors.isStyled)(path.node, state) || (0, _detectors.isStyled)(path.node.callee, state) || (0, _detectors.isHelper)(path.node.callee, state)) {
            if (path.parent.type == 'VariableDeclarator' || path.parent.type == 'TaggedTemplateExpression') {
                (0, _helperAnnotateAsPure2.default)(path);
            }
        }
    }
};