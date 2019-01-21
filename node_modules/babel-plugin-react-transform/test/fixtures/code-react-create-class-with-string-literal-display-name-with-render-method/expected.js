import _transformLib from 'transform-lib';
const _components = {
  'my-component': {
    displayName: 'my-component'
  }
};

const _transformLib2 = _transformLib({
  filename: '%FIXTURE_PATH%',
  components: _components,
  locals: [],
  imports: []
});

function _wrapComponent(id) {
  return function (Component) {
    return _transformLib2(Component, id);
  };
}

const MyComponent = _wrapComponent('my-component')(React.createClass({
  displayName: 'my-component',
  render: function () {}
}));
