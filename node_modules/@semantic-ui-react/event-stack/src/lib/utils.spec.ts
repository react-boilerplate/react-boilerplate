import { normalizeHandlers, normalizeTarget } from './utils'

describe('normalizeHandlers', () => {
  it('will create an array if it is not passed', () => {
    const handler = jasmine.createSpy()
    const handlers = normalizeHandlers(handler)

    expect(Array.isArray(handlers)).toBeTruthy()
    expect(handlers).toContain(handler)
  })

  it('will return the same array', () => {
    const handler1 = jasmine.createSpy('handler1')
    const handler2 = jasmine.createSpy('handler2')

    expect(normalizeHandlers([handler1, handler2])).toContain(handler1, handler2)
  })
})

describe('normalizeTarget', () => {
  describe('document', () => {
    it('returns `document` when it passed as string', () => {
      expect(normalizeTarget('document')).toBe(document)
    })

    it('returns `document` when `false` passed', () => {
      expect(normalizeTarget('document')).toBe(document)
    })

    it('returns `document` when it passed', () => {
      expect(normalizeTarget('document')).toBe(document)
    })
  })

  describe('element', () => {
    it('returns `element` when it passed', () => {
      const element = document.createElement('div')

      expect(normalizeTarget(element)).toBe(element)
    })
  })

  describe('window', () => {
    it('returns `document` when it passed as string', () => {
      expect(normalizeTarget('window')).toBe(window)
    })

    it('returns document when it passed', () => {
      expect(normalizeTarget(window)).toBe(window)
    })
  })
})
