import _ from 'lodash/fp'

const computeClassNames = _.flow(
  _.toArray,
  _.map('props.className'),
  _.flatMap(_.split(/\s+/)),
  _.filter(_.identity),
  _.uniq,
)

export default computeClassNames
