import EventPool from './EventPool'

describe('EventPool', () => {
  describe('addHandlers', () => {
    it('adds handlers', () => {
      const handler = jasmine.createSpy()
      let pool = new EventPool('default', new Map())

      pool = pool.addHandlers('click', [handler])
      pool.dispatchEvent('click', document.createEvent('Event'))

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('adds handlers for multiple event types', () => {
      const clickHandler = jasmine.createSpy('click')
      const mouseDown = jasmine.createSpy('mouseDown')

      let pool = new EventPool('default', new Map())
      pool = pool.addHandlers('click', [clickHandler])
      pool = pool.addHandlers('mousedown', [mouseDown])

      pool.dispatchEvent('click', document.createEvent('Event'))
      pool.dispatchEvent('mousedown', document.createEvent('Event'))

      expect(clickHandler).toHaveBeenCalledTimes(1)
      expect(mouseDown).toHaveBeenCalledTimes(1)
    })

    it('always returns a new object', () => {
      const pool = EventPool.createByType('default', 'click', [])
      const anotherPool = pool.addHandlers('click', [])

      expect(typeof anotherPool).toBe('object')
      expect(anotherPool).not.toBe(pool)
    })

    it('handler sets are immutable', () => {
      const handler1 = jasmine.createSpy('handler1')
      const handler2 = jasmine.createSpy('handler2')

      const pool = EventPool.createByType('default', 'click', [handler1])
      const another = pool.addHandlers('click', [handler2])

      pool.dispatchEvent('click', document.createEvent('Event'))
      another.dispatchEvent('click', document.createEvent('Event'))

      expect(handler1).toHaveBeenCalledTimes(2)
      expect(handler2).toHaveBeenCalledTimes(1)
    })
  })

  describe('hasHandlers', () => {
    it('returns "true" if has handlers', () => {
      const pool = EventPool.createByType('default', 'click', [() => {}])

      expect(pool.hasHandlers()).toBeTruthy()
    })

    it('returns "false" if has not handlers', () => {
      const pool = new EventPool('default', new Map())

      expect(pool.hasHandlers()).toBeFalsy()
    })
  })

  describe('removeHandlers', () => {
    it('removes handlers', () => {
      const handler = jasmine.createSpy()
      let pool = EventPool.createByType('default', 'click', [handler])

      pool.dispatchEvent('click', document.createEvent('Event'))
      pool = pool.removeHandlers('click', [handler])
      pool.dispatchEvent('click', document.createEvent('Event'))

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('removes handlers for non-existent eventType', () => {
      const handler = jasmine.createSpy()
      let pool = EventPool.createByType('default', 'click', [handler])

      pool.dispatchEvent('click', document.createEvent('Event'))
      pool = pool.removeHandlers('mousedown', [handler])
      pool.dispatchEvent('click', document.createEvent('Event'))

      expect(handler).toHaveBeenCalledTimes(2)
    })

    it('always returns a new object', () => {
      const pool = EventPool.createByType('default', 'click', [])
      const anotherPool = pool.removeHandlers('click', [])

      expect(typeof anotherPool).toBe('object')
      expect(anotherPool).not.toBe(pool)
    })

    it('handlers are immutable', () => {
      const handler1 = jasmine.createSpy('handler1')
      const handler2 = jasmine.createSpy('handler2')

      const pool = EventPool.createByType('default', 'click', [handler1, handler2])
      const another = pool.removeHandlers('click', [handler2])

      pool.dispatchEvent('click', document.createEvent('Event'))
      another.dispatchEvent('click', document.createEvent('Event'))

      expect(handler1).toHaveBeenCalledTimes(2)
      expect(handler2).toHaveBeenCalledTimes(1)
    })
  })
})
