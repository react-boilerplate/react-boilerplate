var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function unimplementedError(methodName, classname) {
  return new Error(String(methodName) + ' is a required method of ' + String(classname) + ', but was not implemented.');
}

var EnzymeAdapter = function () {
  function EnzymeAdapter() {
    _classCallCheck(this, EnzymeAdapter);

    this.options = {};
  }
  // Provided a bag of options, return an `EnzymeRenderer`. Some options can be implementation
  // specific, like `attach` etc. for React, but not part of this interface explicitly.
  // eslint-disable-next-line class-methods-use-this, no-unused-vars


  _createClass(EnzymeAdapter, [{
    key: 'createRenderer',
    value: function () {
      function createRenderer(options) {
        throw unimplementedError('createRenderer', 'EnzymeAdapter');
      }

      return createRenderer;
    }()

    // converts an RSTNode to the corresponding JSX Pragma Element. This will be needed
    // in order to implement the `Wrapper.mount()` and `Wrapper.shallow()` methods, but should
    // be pretty straightforward for people to implement.
    // eslint-disable-next-line class-methods-use-this, no-unused-vars

  }, {
    key: 'nodeToElement',
    value: function () {
      function nodeToElement(node) {
        throw unimplementedError('nodeToElement', 'EnzymeAdapter');
      }

      return nodeToElement;
    }()

    // eslint-disable-next-line class-methods-use-this, no-unused-vars

  }, {
    key: 'isValidElement',
    value: function () {
      function isValidElement(element) {
        throw unimplementedError('isValidElement', 'EnzymeAdapter');
      }

      return isValidElement;
    }()

    // eslint-disable-next-line class-methods-use-this, no-unused-vars

  }, {
    key: 'createElement',
    value: function () {
      function createElement(type, props) {
        throw unimplementedError('createElement', 'EnzymeAdapter');
      }

      return createElement;
    }()
  }]);

  return EnzymeAdapter;
}();

EnzymeAdapter.MODES = {
  STRING: 'string',
  MOUNT: 'mount',
  SHALLOW: 'shallow'
};

module.exports = EnzymeAdapter;