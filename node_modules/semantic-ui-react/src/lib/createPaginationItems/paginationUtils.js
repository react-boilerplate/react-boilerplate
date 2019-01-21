/**
 * Checks the possibility of using simple range generation, if number of generated pages is equal
 * or greater than total pages to show.
 *
 * @param {object} options
 * @param {number} options.boundaryRange Number of always visible pages at the beginning and end.
 * @param {number} options.siblingRange Number of always visible pages before and after the current one.
 * @param {number} options.totalPages Total number of pages.
 * @return {boolean}
 */
export const isSimplePagination = ({ boundaryRange, siblingRange, totalPages }) => {
  const boundaryRangeSize = 2 * boundaryRange
  const ellipsisSize = 2
  const siblingRangeSize = 2 * siblingRange

  return 1 + ellipsisSize + siblingRangeSize + boundaryRangeSize >= totalPages
}

export const typifyOptions = ({
  activePage,
  boundaryRange,
  siblingRange,
  totalPages,
}) => ({
  activePage: +activePage,
  boundaryRange: +boundaryRange,
  siblingRange: +siblingRange,
  totalPages: +totalPages,
})
