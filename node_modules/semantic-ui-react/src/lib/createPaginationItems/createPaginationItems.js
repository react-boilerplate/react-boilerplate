import {
  createFirstPage,
  createLastItem,
  createNextItem,
  createPageFactory,
  createPrevItem,
} from './itemFactories'
import { createComplexRange, createSimpleRange } from './rangeFactories'
import { isSimplePagination, typifyOptions } from './paginationUtils'

/**
 * @param {object} rawOptions
 * @param {number} rawOptions.activePage
 * @param {number} rawOptions.boundaryRange Number of always visible pages at the beginning and end.
 * @param {number} rawOptions.siblingRange Number of always visible pages before and after the current one.
 * @param {number} rawOptions.totalPages Total number of pages.
 */
const createPaginationItems = (rawOptions) => {
  const options = typifyOptions(rawOptions)
  const { activePage, totalPages } = options

  const pageFactory = createPageFactory(activePage)
  const innerRange = isSimplePagination(options)
    ? createSimpleRange(1, totalPages, pageFactory)
    : createComplexRange(options, pageFactory)

  return [
    createFirstPage(),
    createPrevItem(activePage),
    ...innerRange,
    createNextItem(activePage, totalPages),
    createLastItem(totalPages),
  ]
}

export default createPaginationItems
