import simulant from 'simulant'
import EventTarget from './EventTarget'

let eventTarget: EventTarget

describe('EventTarget', () => {
  beforeEach(() => {
    eventTarget = new EventTarget(document)
  })

  describe('addHandlers', () => {
    it('adds handlers', () => {
      const handler1 = jasmine.createSpy()
      const handler2 = jasmine.createSpy()

      eventTarget.addHandlers('default', 'click', [handler1])
      eventTarget.addHandlers('default', 'click', [handler2])
      simulant.fire(document, 'click')

      expect(handler1).toHaveBeenCalledTimes(1)
      expect(handler2).toHaveBeenCalledTimes(1)
    })

    it('handles multiple pools', () => {
      const handler1 = jasmine.createSpy()
      const handler2 = jasmine.createSpy()

      eventTarget.addHandlers('default', 'click', [handler1])
      eventTarget.addHandlers('another', 'click', [handler2])
      simulant.fire(document, 'click')

      expect(handler1).toHaveBeenCalledTimes(1)
      expect(handler2).toHaveBeenCalledTimes(1)
    })
  })

  describe('hasHandlers', () => {
    it('is "false" when has not handlers', () => {
      expect(eventTarget.hasHandlers()).toBeFalsy()
    })

    it('is "true" when has handlers', () => {
      eventTarget.addHandlers('default', 'click', [jasmine.createSpy()])
      expect(eventTarget.hasHandlers()).toBeTruthy()
    })
  })

  describe('removeHandlers', () => {
    it('removes handlers', () => {
      const handler1 = jasmine.createSpy()
      const handler2 = jasmine.createSpy()

      eventTarget.addHandlers('default', 'click', [handler1, handler2])
      simulant.fire(document, 'click')

      eventTarget.removeHandlers('default', 'click', [handler2])
      simulant.fire(document, 'click')

      expect(handler1).toHaveBeenCalledTimes(2)
      expect(handler2).toHaveBeenCalledTimes(1)
    })

    it('removes handlers with multiple pools', () => {
      const handler1 = jasmine.createSpy()
      const handler2 = jasmine.createSpy()

      eventTarget.addHandlers('default', 'click', [handler1])
      eventTarget.addHandlers('another', 'click', [handler2])
      simulant.fire(document, 'click')

      eventTarget.removeHandlers('another', 'click', [handler2])
      simulant.fire(document, 'click')

      expect(handler1).toHaveBeenCalledTimes(2)
      expect(handler2).toHaveBeenCalledTimes(1)
    })

    it('removes unexisting handler', () => {
      const handler = jasmine.createSpy()

      eventTarget.addHandlers('default', 'click', [handler])
      simulant.fire(document, 'click')

      eventTarget.removeHandlers('default', 'click', [handler])
      eventTarget.removeHandlers('default', 'click', [handler])
      simulant.fire(document, 'click')

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })
})
