import simulant from 'simulant'
import EventStack from './EventStack'

let eventStack: EventStack

describe('EventStack', () => {
  beforeEach(() => {
    eventStack = new EventStack()
  })

  describe('sub', () => {
    it('subscribes for single target', () => {
      const handler = jasmine.createSpy()

      eventStack.sub('click', handler)
      simulant.fire(document, 'click')

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('subscribes for custom target', () => {
      const handler = jasmine.createSpy()
      const target = document.createElement('div')
      document.body.appendChild(target)

      eventStack.sub('click', handler, { target })
      simulant.fire(target, 'click')

      document.body.removeChild(target)
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('subscribes for multiple targets', () => {
      const documentHandler = jasmine.createSpy()
      const windowHandler = jasmine.createSpy()

      eventStack.sub('click', documentHandler)
      eventStack.sub('scroll', windowHandler, { target: window })
      simulant.fire(document, 'click')
      simulant.fire(window, 'scroll')

      expect(documentHandler).toHaveBeenCalledTimes(1)
      expect(windowHandler).toHaveBeenCalledTimes(1)
    })
  })

  describe('unsub', () => {
    it('unsubscribes from unexisting target', () => {
      eventStack.unsub('click', () => {}, { target: document.body })
      simulant.fire(document, 'click')
    })

    it('unsubscribes and destroys eventTarget if it is empty', () => {
      const handler = jasmine.createSpy()

      eventStack.sub('click', handler)
      simulant.fire(document, 'click')

      eventStack.unsub('click', handler)
      simulant.fire(document, 'click')

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('unsubscribes and leaves eventTarget if it contains handlers', () => {
      const clickHandler = jasmine.createSpy()
      const keyHandler = jasmine.createSpy()

      eventStack.sub('click', clickHandler)
      eventStack.sub('keyDown', keyHandler)
      simulant.fire(document, 'click')

      eventStack.unsub('click', clickHandler)
      simulant.fire(document, 'click')

      expect(clickHandler).toHaveBeenCalledTimes(1)
      expect(keyHandler).not.toHaveBeenCalled()
    })

    it('unsubscribes and leaves an eventPool if contains handlers', () => {
      const firstHandler = jasmine.createSpy()
      const secondHandler = jasmine.createSpy()

      eventStack.sub('click', firstHandler)
      eventStack.unsub('mouseup', firstHandler)
      eventStack.sub('click', secondHandler)

      simulant.fire(document, 'click')

      expect(firstHandler).toHaveBeenCalledTimes(1)
      expect(secondHandler).toHaveBeenCalledTimes(1)
    })

    it('unsubscribes from same event multiple times', () => {
      const handler = jasmine.createSpy()

      eventStack.sub('click', handler)
      simulant.fire(document, 'click')

      eventStack.unsub('click', handler)
      eventStack.unsub('click', handler)
      simulant.fire(document, 'click')

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })
})
