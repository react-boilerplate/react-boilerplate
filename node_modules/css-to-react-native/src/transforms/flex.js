import { tokens } from '../tokenTypes'

const { NONE, AUTO, NUMBER, LENGTH, SPACE } = tokens

const defaultFlexGrow = 1
const defaultFlexShrink = 1
const defaultFlexBasis = 0

const FLEX_BASIS_AUTO = {} // Used for reference equality

export default tokenStream => {
  let flexGrow
  let flexShrink
  let flexBasis

  if (tokenStream.matches(NONE)) {
    tokenStream.expectEmpty()
    return { $merge: { flexGrow: 0, flexShrink: 0 } }
  }

  tokenStream.saveRewindPoint()
  if (tokenStream.matches(AUTO) && !tokenStream.hasTokens()) {
    return { $merge: { flexGrow: 1, flexShrink: 1 } }
  }
  tokenStream.rewind()

  let partsParsed = 0
  while (partsParsed < 2 && tokenStream.hasTokens()) {
    if (partsParsed !== 0) tokenStream.expect(SPACE)

    if (flexGrow === undefined && tokenStream.matches(NUMBER)) {
      flexGrow = tokenStream.lastValue

      tokenStream.saveRewindPoint()
      if (tokenStream.matches(SPACE) && tokenStream.matches(NUMBER)) {
        flexShrink = tokenStream.lastValue
      } else {
        tokenStream.rewind()
      }
    } else if (flexBasis === undefined && tokenStream.matches(LENGTH)) {
      flexBasis = tokenStream.lastValue
    } else if (flexBasis === undefined && tokenStream.matches(AUTO)) {
      flexBasis = FLEX_BASIS_AUTO
    } else {
      tokenStream.throw()
    }

    partsParsed += 1
  }

  tokenStream.expectEmpty()

  if (flexGrow === undefined) flexGrow = defaultFlexGrow
  if (flexShrink === undefined) flexShrink = defaultFlexShrink
  if (flexBasis === undefined) flexBasis = defaultFlexBasis

  return flexBasis !== FLEX_BASIS_AUTO
    ? { $merge: { flexGrow, flexShrink, flexBasis } }
    : { $merge: { flexGrow, flexShrink } }
}
