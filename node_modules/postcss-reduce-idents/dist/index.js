'use strict';

exports.__esModule = true;

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _encode = require('./lib/encode');

var _encode2 = _interopRequireDefault(_encode);

var _counter = require('./lib/counter');

var _counter2 = _interopRequireDefault(_counter);

var _counterStyle = require('./lib/counter-style');

var _counterStyle2 = _interopRequireDefault(_counterStyle);

var _keyframes = require('./lib/keyframes');

var _keyframes2 = _interopRequireDefault(_keyframes);

var _gridTemplate = require('./lib/grid-template');

var _gridTemplate2 = _interopRequireDefault(_gridTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _postcss2.default.plugin('postcss-reduce-idents', function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$counter = _ref.counter,
        counter = _ref$counter === undefined ? true : _ref$counter,
        _ref$counterStyle = _ref.counterStyle,
        counterStyle = _ref$counterStyle === undefined ? true : _ref$counterStyle,
        _ref$keyframes = _ref.keyframes,
        keyframes = _ref$keyframes === undefined ? true : _ref$keyframes,
        _ref$gridTemplate = _ref.gridTemplate,
        gridTemplate = _ref$gridTemplate === undefined ? true : _ref$gridTemplate,
        _ref$encoder = _ref.encoder,
        encoder = _ref$encoder === undefined ? _encode2.default : _ref$encoder;

    var reducers = [];
    counter && reducers.push(_counter2.default);
    counterStyle && reducers.push(_counterStyle2.default);
    keyframes && reducers.push(_keyframes2.default);
    gridTemplate && reducers.push(_gridTemplate2.default);

    return function (css) {
        css.walk(function (node) {
            reducers.forEach(function (reducer) {
                return reducer.collect(node, encoder);
            });
        });

        reducers.forEach(function (reducer) {
            return reducer.transform();
        });
    };
});
module.exports = exports['default'];