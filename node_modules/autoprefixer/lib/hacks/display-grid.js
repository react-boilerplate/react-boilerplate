'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Value = require('../value');

var DisplayGrid = function (_Value) {
    _inherits(DisplayGrid, _Value);

    function DisplayGrid(name, prefixes) {
        _classCallCheck(this, DisplayGrid);

        var _this = _possibleConstructorReturn(this, _Value.call(this, name, prefixes));

        if (name === 'display-grid') {
            _this.name = 'grid';
        }
        return _this;
    }

    /**
     * Faster check for flex value
     */


    DisplayGrid.prototype.check = function check(decl) {
        return decl.prop === 'display' && decl.value === this.name;
    };

    return DisplayGrid;
}(Value);

Object.defineProperty(DisplayGrid, 'names', {
    enumerable: true,
    writable: true,
    value: ['display-grid', 'inline-grid']
});


module.exports = DisplayGrid;