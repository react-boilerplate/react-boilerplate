import _transformTwo from "transform-two";
import _transformOne from "transform-one";
const _components = {
  Foo: {
    displayName: "Foo"
  }
};

const _transformOne2 = _transformOne({
  filename: "%FIXTURE_PATH%",
  components: _components,
  locals: [],
  imports: []
});

const _transformTwo2 = _transformTwo({
  filename: "%FIXTURE_PATH%",
  components: _components,
  locals: [],
  imports: []
});

function _wrapComponent(id) {
  return function (Component) {
    return _transformOne2(_transformTwo2(Component, id), id);
  };
}

const Foo = _wrapComponent("Foo")(class Foo extends React.Component {
  render() {}
});
