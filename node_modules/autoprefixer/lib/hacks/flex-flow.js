'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var Declaration = require('../declaration');

var FlexFlow = function (_Declaration) {
    _inherits(FlexFlow, _Declaration);

    function FlexFlow() {
        _classCallCheck(this, FlexFlow);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Use two properties for 2009 spec
     */
    FlexFlow.prototype.insert = function insert(decl, prefix, prefixes) {
        var spec = void 0;

        var _flexSpec = flexSpec(prefix);

        spec = _flexSpec[0];
        prefix = _flexSpec[1];

        if (spec !== 2009) {
            return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
        } else {
            var values = decl.value.split(/\s+/).filter(function (i) {
                return i !== 'wrap' && i !== 'nowrap' && 'wrap-reverse';
            });
            if (values.length === 0) {
                return undefined;
            }

            var already = decl.parent.some(function (i) {
                return i.prop === prefix + 'box-orient' || i.prop === prefix + 'box-direction';
            });
            if (already) {
                return undefined;
            }

            var value = values[0];
            var orient = value.indexOf('row') !== -1 ? 'horizontal' : 'vertical';
            var dir = value.indexOf('reverse') !== -1 ? 'reverse' : 'normal';

            var cloned = this.clone(decl);
            cloned.prop = prefix + 'box-orient';
            cloned.value = orient;
            if (this.needCascade(decl)) {
                cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
            }
            decl.parent.insertBefore(decl, cloned);

            cloned = this.clone(decl);
            cloned.prop = prefix + 'box-direction';
            cloned.value = dir;
            if (this.needCascade(decl)) {
                cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
            }
            return decl.parent.insertBefore(decl, cloned);
        }
    };

    return FlexFlow;
}(Declaration);

Object.defineProperty(FlexFlow, 'names', {
    enumerable: true,
    writable: true,
    value: ['flex-flow', 'box-direction', 'box-orient']
});


module.exports = FlexFlow;