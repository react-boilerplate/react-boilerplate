import EventSet from './EventSet'

let set: EventSet

describe('EventSet', () => {
  beforeEach(() => {
    set = new EventSet([])
  })

  describe('addHandlers', () => {
    it('adds a single handler', () => {
      const event = document.createEvent('Event')
      const handler = jasmine.createSpy()

      set = set.addHandlers([handler])
      set.dispatchEvent(event, true)

      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledWith(event)
    })

    it('adds multiple handlers', () => {
      const handler1 = jasmine.createSpy('handler1')
      const handler2 = jasmine.createSpy('handler2')

      set = set.addHandlers([handler1, handler2])
      set.dispatchEvent(document.createEvent('Event'), true)

      expect(handler1).toHaveBeenCalledTimes(1)
      expect(handler2).toHaveBeenCalledTimes(1)
    })

    it('adds only unique handlers', () => {
      const handler1 = jasmine.createSpy('handler1')
      const handler2 = jasmine.createSpy('handler2')
      set = set.addHandlers([handler1, handler1, handler2, handler2])
      set.dispatchEvent(document.createEvent('Event'), true)

      expect(handler1).toHaveBeenCalledTimes(1)
      expect(handler2).toHaveBeenCalledTimes(1)
    })

    it('always returns a new object', () => {
      const another = set.addHandlers([])

      expect(typeof another).toBe('object')
      expect(another).not.toBe(set)
    })
  })

  describe('dispatchEvent', () => {
    it('dispatches an event to all handlers', () => {
      const handler1 = jasmine.createSpy('handler1')
      const handler2 = jasmine.createSpy('handler2')

      set = set.addHandlers([handler1, handler2])
      set.dispatchEvent(document.createEvent('Event'), true)

      expect(handler1).toHaveBeenCalledTimes(1)
      expect(handler2).toHaveBeenCalledTimes(1)
    })

    it('dispatches an event to only recent event', () => {
      const handler1 = jasmine.createSpy('handler1')
      const handler2 = jasmine.createSpy('handler2')

      set = set.addHandlers([handler1, handler2, handler1])
      set.dispatchEvent(document.createEvent('Event'), false)

      expect(handler1).toHaveBeenCalledTimes(1)
      expect(handler2).not.toHaveBeenCalled()
    })

    it('dispatches with matching (reverse) order', () => {
      const handler1 = jasmine.createSpy('handler1')
      const handler2 = jasmine.createSpy('handler2')
      const handler3 = jasmine.createSpy('handler3')

      set = set.addHandlers([handler1, handler2, handler3, handler1])
      set.dispatchEvent(document.createEvent('Event'), true)

      expect(handler1).toHaveBeenCalledTimes(1)
      expect(handler2).toHaveBeenCalledTimes(1)
      expect(handler3).toHaveBeenCalledTimes(1)

      expect(handler1).toHaveBeenCalledBefore(handler3)
      expect(handler3).toHaveBeenCalledBefore(handler2)
    })
  })

  describe('hasHandlers', () => {
    it('returns "false" when is empty', () => {
      expect(set.hasHandlers()).toBeFalsy()
    })

    it('returns "false" when is empty', () => {
      const another = set.addHandlers([jasmine.createSpy()])

      expect(another.hasHandlers()).toBeTruthy()
    })
  })

  describe('removeHandlers', () => {
    it('remove a single handler', () => {
      const handler1 = jasmine.createSpy('handler1')
      const handler2 = jasmine.createSpy('handler2')

      set = set.addHandlers([handler1, handler2])
      set.dispatchEvent(document.createEvent('Event'), true)

      set = set.removeHandlers([handler2])
      set.dispatchEvent(document.createEvent('Event'), true)

      expect(handler1).toHaveBeenCalledTimes(2)
      expect(handler2).toHaveBeenCalledTimes(1)
    })

    it('removes multiple handlers', () => {
      const handler1 = jasmine.createSpy('handler1')
      const handler2 = jasmine.createSpy('handler2')

      set = set.addHandlers([handler1, handler2])
      set.dispatchEvent(document.createEvent('Event'), true)

      set = set.removeHandlers([handler1, handler2])
      set.dispatchEvent(document.createEvent('Event'), true)

      expect(handler1).toHaveBeenCalledTimes(1)
      expect(handler2).toHaveBeenCalledTimes(1)
    })

    it('always returns a new object', () => {
      const another = set.removeHandlers([])

      expect(typeof another).toBe('object')
      expect(another).not.toBe(set)
    })
  })
})
