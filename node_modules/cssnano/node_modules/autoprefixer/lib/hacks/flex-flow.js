(function() {
  var Declaration, FlexFlow, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  FlexFlow = (function(superClass) {
    extend(FlexFlow, superClass);

    function FlexFlow() {
      return FlexFlow.__super__.constructor.apply(this, arguments);
    }

    FlexFlow.names = ['flex-flow', 'box-direction', 'box-orient'];

    FlexFlow.prototype.insert = function(decl, prefix, prefixes) {
      var already, cloned, dir, orient, ref, spec, value, values;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec !== 2009) {
        return FlexFlow.__super__.insert.apply(this, arguments);
      } else {
        values = decl.value.split(/\s+/).filter(function(i) {
          return i !== 'wrap' && i !== 'nowrap' && 'wrap-reverse';
        });
        if (values.length === 0) {
          return;
        }
        already = decl.parent.some(function(i) {
          return i.prop === prefix + 'box-orient' || i.prop === prefix + 'box-direction';
        });
        if (already) {
          return;
        }
        value = values[0];
        orient = value.indexOf('row') !== -1 ? 'horizontal' : 'vertical';
        dir = value.indexOf('reverse') !== -1 ? 'reverse' : 'normal';
        cloned = this.clone(decl);
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

  })(Declaration);

  module.exports = FlexFlow;

}).call(this);
