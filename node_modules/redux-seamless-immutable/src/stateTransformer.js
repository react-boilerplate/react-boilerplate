export default function stateTransformer(state) {
  return state.asMutable({deep: true});
}