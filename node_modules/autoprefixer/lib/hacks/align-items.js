'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var Declaration = require('../declaration');

var AlignItems = function (_Declaration) {
    _inherits(AlignItems, _Declaration);

    function AlignItems() {
        _classCallCheck(this, AlignItems);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Change property name for 2009 and 2012 specs
     */
    AlignItems.prototype.prefixed = function prefixed(prop, prefix) {
        var spec = void 0;

        var _flexSpec = flexSpec(prefix);

        spec = _flexSpec[0];
        prefix = _flexSpec[1];

        if (spec === 2009) {
            return prefix + 'box-align';
        } else if (spec === 2012) {
            return prefix + 'flex-align';
        } else {
            return _Declaration.prototype.prefixed.call(this, prop, prefix);
        }
    };

    /**
     * Return property name by final spec
     */


    AlignItems.prototype.normalize = function normalize() {
        return 'align-items';
    };

    /**
     * Change value for 2009 and 2012 specs
     */


    AlignItems.prototype.set = function set(decl, prefix) {
        var spec = flexSpec(prefix)[0];
        if (spec === 2009 || spec === 2012) {
            decl.value = AlignItems.oldValues[decl.value] || decl.value;
        }
        return _Declaration.prototype.set.call(this, decl, prefix);
    };

    return AlignItems;
}(Declaration);

Object.defineProperty(AlignItems, 'names', {
    enumerable: true,
    writable: true,
    value: ['align-items', 'flex-align', 'box-align']
});
Object.defineProperty(AlignItems, 'oldValues', {
    enumerable: true,
    writable: true,
    value: {
        'flex-end': 'end',
        'flex-start': 'start'
    }
});


module.exports = AlignItems;