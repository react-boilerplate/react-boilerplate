"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PresetError = function (_Error) {
  _inherits(PresetError, _Error);

  function PresetError(key, value) {
    _classCallCheck(this, PresetError);

    var _this = _possibleConstructorReturn(this, (PresetError.__proto__ || Object.getPrototypeOf(PresetError)).call(this, "Unknown value of \"" + key + "\": " + value));

    _this.name = _this.constructor.name;
    return _this;
  }

  return PresetError;
}(Error);

exports.default = PresetError;