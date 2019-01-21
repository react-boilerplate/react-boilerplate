import _transformLib from "transform-lib";
const _components = {
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

const Foo = _wrapComponent("_component")(class extends React.Component {
  render() {}
});
