(function() {
  var OldValue, Stretch, Value,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  OldValue = require('../old-value');

  Value = require('../value');

  Stretch = (function(superClass) {
    extend(Stretch, superClass);

    function Stretch() {
      return Stretch.__super__.constructor.apply(this, arguments);
    }

    Stretch.names = ['stretch', 'fill', 'fill-available'];

    Stretch.prototype.replace = function(string, prefix) {
      if (prefix === '-moz-') {
        return string.replace(this.regexp(), '$1-moz-available$3');
      } else if (prefix === '-webkit-') {
        return string.replace(this.regexp(), '$1-webkit-fill-available$3');
      } else {
        return Stretch.__super__.replace.apply(this, arguments);
      }
    };

    Stretch.prototype.old = function(prefix) {
      if (prefix === '-moz-') {
        return new OldValue(this.name, '-moz-available');
      } else if (prefix === '-webkit-') {
        return new OldValue(this.name, '-webkit-fill-available');
      } else {
        return Stretch.__super__.old.apply(this, arguments);
      }
    };

    return Stretch;

  })(Value);

  module.exports = Stretch;

}).call(this);
