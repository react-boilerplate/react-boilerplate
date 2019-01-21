import * as React from 'react'
import * as TestRenderer from 'react-test-renderer'

import EventStack from './EventStack'
import { instance } from './lib/index'

const requiredProps = {
  name: 'click',
  on: () => {},
}

describe('EventStack', () => {
  describe('children', () => {
    it('renders nothing', () => {
      const wrapper = TestRenderer.create(<EventStack {...requiredProps} />)

      expect(wrapper.toJSON()).toBe(null)
    })
  })

  describe('componentDidUpdate', () => {
    it('calls sub() and unsub()', () => {
      const sub = spyOn(instance, 'sub')
      const unsub = spyOn(instance, 'unsub')
      const wrapper = TestRenderer.create(<EventStack {...requiredProps} />)

      // Check calls on componentDidMount()
      expect(sub).toHaveBeenCalledTimes(1)
      expect(unsub).not.toHaveBeenCalled()

      sub.calls.reset()
      unsub.calls.reset()

      // Check calls on componentDidUpdate()
      wrapper.update(<EventStack {...requiredProps} name="resize" />)

      expect(unsub).toHaveBeenCalledBefore(sub)
      expect(unsub).toHaveBeenCalledTimes(1)
      expect(unsub).toHaveBeenCalledWith('click', jasmine.any(Function), jasmine.any(Object))

      expect(sub).toHaveBeenCalledTimes(1)
      expect(sub).toHaveBeenCalledWith('resize', jasmine.any(Function), jasmine.any(Object))
    })
  })

  describe('componentWillUnmount', () => {
    it('calls unsub()', () => {
      const unsub = spyOn(instance, 'unsub')
      const wrapper = TestRenderer.create(<EventStack {...requiredProps} />)

      wrapper.unmount()
      expect(unsub).toHaveBeenCalledTimes(1)
      expect(unsub).toHaveBeenCalledWith('click', jasmine.any(Function), jasmine.any(Object))
    })
  })

  describe('name', () => {
    it('passes "name" to eventStack', () => {
      const sub = spyOn(instance, 'sub')
      TestRenderer.create(<EventStack {...requiredProps} name="resize" />)

      expect(sub).toHaveBeenCalledTimes(1)
      expect(sub).toHaveBeenCalledWith('resize', jasmine.any(Function), jasmine.any(Object))
    })
  })

  describe('on', () => {
    it('passes "on" to eventStack', () => {
      const sub = spyOn(instance, 'sub')
      const on = jasmine.createSpy('on')
      TestRenderer.create(<EventStack {...requiredProps} on={on} />)

      expect(sub).toHaveBeenCalledTimes(1)
      expect(sub).toHaveBeenCalledWith('click', on, jasmine.any(Object))
    })
  })

  describe('pool', () => {
    it('defaults to "default"', () => {
      const sub = spyOn(instance, 'sub')
      TestRenderer.create(<EventStack {...requiredProps} />)

      expect(sub).toHaveBeenCalledTimes(1)
      expect(sub).toHaveBeenCalledWith(
        'click',
        jasmine.any(Function),
        jasmine.objectContaining({ pool: 'default' }),
      )
    })

    it('passes "on" to eventStack', () => {
      const sub = spyOn(instance, 'sub')
      TestRenderer.create(<EventStack {...requiredProps} pool="foo" />)

      expect(sub).toHaveBeenCalledTimes(1)
      expect(sub).toHaveBeenCalledWith(
        'click',
        jasmine.any(Function),
        jasmine.objectContaining({ pool: 'foo' }),
      )
    })

    describe('target', () => {
      it('defaults to "document"', () => {
        const sub = spyOn(instance, 'sub')
        TestRenderer.create(<EventStack {...requiredProps} />)

        expect(sub).toHaveBeenCalledTimes(1)
        expect(sub).toHaveBeenCalledWith(
          'click',
          jasmine.any(Function),
          jasmine.objectContaining({ target: 'document' }),
        )
      })

      it('passes "on" to eventStack', () => {
        const sub = spyOn(instance, 'sub')
        TestRenderer.create(<EventStack {...requiredProps} target="window" />)

        expect(sub).toHaveBeenCalledTimes(1)
        expect(sub).toHaveBeenCalledWith(
          'click',
          jasmine.any(Function),
          jasmine.objectContaining({ target: 'window' }),
        )
      })
    })
  })
})
