import _ from 'lodash'

const fitsMaxWidth = (width, maxWidth) => (_.isNil(maxWidth) ? true : width <= maxWidth)

const fitsMinWidth = (width, minWidth) => (_.isNil(minWidth) ? true : width >= minWidth)

const isVisible = (width, { maxWidth, minWidth }) =>
  fitsMinWidth(width, minWidth) && fitsMaxWidth(width, maxWidth)

export default isVisible
