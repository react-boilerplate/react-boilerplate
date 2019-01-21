'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var TransformDecl = function (_Declaration) {
    _inherits(TransformDecl, _Declaration);

    function TransformDecl() {
        _classCallCheck(this, TransformDecl);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Recursively check all parents for @keyframes
     */
    TransformDecl.prototype.keyframeParents = function keyframeParents(decl) {
        var parent = decl.parent;

        while (parent) {
            if (parent.type === 'atrule' && parent.name === 'keyframes') {
                return true;
            }
            var _parent = parent;
            parent = _parent.parent;
        }
        return false;
    };

    /**
     * Is transform contain 3D commands
     */


    TransformDecl.prototype.contain3d = function contain3d(decl) {
        if (decl.prop === 'transform-origin') {
            return false;
        }

        for (var _iterator = TransformDecl.functions3d, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var func = _ref;

            if (decl.value.indexOf(func + '(') !== -1) {
                return true;
            }
        }

        return false;
    };

    /**
     * Replace rotateZ to rotate for IE 9
     */


    TransformDecl.prototype.set = function set(decl, prefix) {
        decl = _Declaration.prototype.set.call(this, decl, prefix);
        if (prefix === '-ms-') {
            decl.value = decl.value.replace(/rotateZ/gi, 'rotate');
        }
        return decl;
    };

    /**
     * Don't add prefix for IE in keyframes
     */


    TransformDecl.prototype.insert = function insert(decl, prefix, prefixes) {
        if (prefix === '-ms-') {
            if (!this.contain3d(decl) && !this.keyframeParents(decl)) {
                return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
            }
        } else if (prefix === '-o-') {
            if (!this.contain3d(decl)) {
                return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
            }
        } else {
            return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
        }
        return undefined;
    };

    return TransformDecl;
}(Declaration);

Object.defineProperty(TransformDecl, 'names', {
    enumerable: true,
    writable: true,
    value: ['transform', 'transform-origin']
});
Object.defineProperty(TransformDecl, 'functions3d', {
    enumerable: true,
    writable: true,
    value: ['matrix3d', 'translate3d', 'translateZ', 'scale3d', 'scaleZ', 'rotate3d', 'rotateX', 'rotateY', 'perspective']
});


module.exports = TransformDecl;