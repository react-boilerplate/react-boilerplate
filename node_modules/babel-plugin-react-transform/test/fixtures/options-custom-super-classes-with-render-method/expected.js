import _transformLib from "transform-lib";
const _components = {
  Foo: {
    displayName: "Foo"
  },
  Bar: {
    displayName: "Bar"
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

const Foo = _wrapComponent("Foo")(class Foo extends BooComponent {
  render() {}
});

const Bar = _wrapComponent("Bar")(class Bar extends CustomComponent {
  render() {}
});
