'use strict'

/**
 * Calculates and returns the chunk size for given file paths and `chunkSize`
 * option.
 *
 * It returns the minimum of the following:
 *
 *  - Total number of files
 *  - Max allowed chunk size so that command length does not exceed the system
 *    limitation on windows
 *  - User specified chunk size or the default
 *
 * Worked example:
 * **Assumption** - Our max file path length is 100, Hence max allowed chunk
 * size is 80
 *
 *  - Case 1: Only 10 files are there, chunk size should be 10 only
 *  - Case 2: There are 100 files and user has overridden the option with
 *    chunk size 40. So chunk size should be 40
 *  - Case 3: There are 100 files and user has overridden the option with
 *    chunk size 100. So chunk size should be 80
 *
 * @param {Array<string>} paths The array of file paths
 * @param {number} idealChunkSize User specified / default chunk size
 * @returns {number} The chunk size
 */
module.exports = function calcChunkSize(paths, idealChunkSize) {
  /* What is the longest file path? */
  const maxPathLen = paths.reduce(
    (maxLen, filePath) => Math.max(maxLen, filePath.length),
    20 // safe initial value
  )

  /* In the worst case scenario, */
  /* how many files can we process in a single command? */
  /* For windows systems, command length is limited to 8192 */
  const maxAllowedChunkSize = Math.floor(8000 / maxPathLen)

  /* Configured chunk size / default - idealChunkSize */
  return Math.min(paths.length, maxAllowedChunkSize, idealChunkSize)
}
