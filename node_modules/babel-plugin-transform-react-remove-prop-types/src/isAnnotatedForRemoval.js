// @flow weak

export default function(node) {
  const comments = node.trailingComments || []

  return !!comments.find(({ value }) => value.trim() === 'remove-proptypes')
}
