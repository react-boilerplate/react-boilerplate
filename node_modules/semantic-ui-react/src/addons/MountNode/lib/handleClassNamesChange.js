import _ from 'lodash'

import computeClassNames from './computeClassNames'
import computeClassNamesDifference from './computeClassNamesDifference'

const prevClassNames = new Map()

const handleClassNamesChange = (node, components) => {
  const currentClassNames = computeClassNames(components)
  const [forAdd, forRemoval] = computeClassNamesDifference(
    prevClassNames.get(node),
    currentClassNames,
  )

  _.forEach(forAdd, className => node.classList.add(className))
  _.forEach(forRemoval, className => node.classList.remove(className))

  prevClassNames.set(node, currentClassNames)
}

export default handleClassNamesChange
