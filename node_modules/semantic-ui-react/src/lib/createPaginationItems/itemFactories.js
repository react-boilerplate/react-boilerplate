/**
 * @param {number} pageNumber
 * @return {Object}
 */
export const createEllipsisItem = pageNumber => ({
  active: false,
  type: 'ellipsisItem',
  value: pageNumber,
})

/**
 * @return {Object}
 */
export const createFirstPage = () => ({
  active: false,
  type: 'firstItem',
  value: 1,
})

/**
 * @param {number} activePage
 * @return {Object}
 */
export const createPrevItem = activePage => ({
  active: false,
  type: 'prevItem',
  value: Math.max(1, activePage - 1),
})

/**
 * @param {number} activePage
 * @return {function}
 */
export const createPageFactory = activePage => pageNumber => ({
  active: activePage === pageNumber,
  type: 'pageItem',
  value: pageNumber,
})

/**
 * @param {number} activePage
 * @param {number} totalPages
 * @return {Object}
 */
export const createNextItem = (activePage, totalPages) => ({
  active: false,
  type: 'nextItem',
  value: Math.min(activePage + 1, totalPages),
})

/**
 * @param {number} totalPages
 * @return {Object}
 */
export const createLastItem = totalPages => ({
  active: false,
  type: 'lastItem',
  value: totalPages,
})
