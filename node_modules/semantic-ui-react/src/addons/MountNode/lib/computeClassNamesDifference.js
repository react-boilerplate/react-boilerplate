import _ from 'lodash'

const computeClassNamesDifference = (prevClassNames, currentClassNames) => [
  _.difference(currentClassNames, prevClassNames),
  _.difference(prevClassNames, currentClassNames),
]

export default computeClassNamesDifference
