import _transformLib from "transform-lib";
const _components = {
  Foo: {
    displayName: "Foo"
  },
  _component: {}
};

const _transformLib2 = _transformLib({
  filename: "%FIXTURE_PATH%",
  components: _components,
  locals: [],
  imports: []
});

function _wrapComponent(id) {
  return function (Component) {
    return _transformLib2(Component, id);
  };
}

foo(_wrapComponent("Foo")(class Foo extends React.Component {
  render() {}
}));
foo(_wrapComponent("_component")(class extends React.Component {
  render() {}
}));
