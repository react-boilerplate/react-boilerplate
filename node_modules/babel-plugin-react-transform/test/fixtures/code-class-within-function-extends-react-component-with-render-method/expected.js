import _transformLib from "transform-lib";
const _components = {
  Foo: {
    displayName: "Foo",
    isInFunction: true
  }
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

function factory() {
  return _wrapComponent("Foo")(class Foo extends React.Component {
    render() {}
  });
}
