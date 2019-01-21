const keyboardKey = require('../src/keyboardKey')

const _wrongReturn = (method, arg, ret) =>
  `keyboardKey.${method}(${arg}) should return key name "${ret}"\n`

const wrongCode = (...args) => _wrongReturn('getCode', ...args)
const wrongName = (...args) => _wrongReturn('getKey', ...args)

const missingPair = (key, val) => `keyboardKey is missing property "${key}" with value ${val}\n`

describe('keyboardKey', () => {
  test('has a key/value for every value/key in codes', () => {
    Object.keys(keyboardKey.codes).forEach(code => {
      const name = keyboardKey.codes[code]
      if (Array.isArray(name)) {
        expect(String(keyboardKey[name[0]])).toEqual(code, missingPair(name[0], code))
        expect(String(keyboardKey[name[1]])).toEqual(code, missingPair(name[1], code))
      } else {
        expect(String(keyboardKey[name])).toEqual(code, missingPair(name, code))
      }
    })
  })

  describe('getCode', () => {
    test('is a function', () => {
      expect(keyboardKey.getCode).toBeInstanceOf(Function)
    })
    test('returns the code for a given key name', () => {
      expect(keyboardKey.getCode('Enter')).toEqual(13, wrongCode('Enter', 13))
    })
    test('handles all key names in codes', () => {
      Object.keys(keyboardKey.codes).forEach(code => {
        const name = keyboardKey.codes[code]
        const _code = Number(code)

        if (Array.isArray(name)) {
          expect(keyboardKey.getCode(name[0])).toEqual(_code, wrongCode(name[0], code))
          expect(keyboardKey.getCode(name[1])).toEqual(_code, wrongCode(name[1], code))
        } else {
          expect(keyboardKey.getCode(name)).toEqual(_code, wrongCode(name, code))
        }
      })
    })
    test('handles event like objects with `key` prop', () => {
      Object.keys(keyboardKey.codes).forEach(code => {
        const name = keyboardKey.codes[code]
        const _code = Number(code)

        if (Array.isArray(name)) {
          const key0 = { key: name[0] }
          const key1 = { key: name[1] }
          expect(keyboardKey.getCode(key0)).toEqual(_code, wrongCode(key0, code))
          expect(keyboardKey.getCode(key1)).toEqual(_code, wrongCode(key1, code))
        } else {
          const key = { key: name }
          expect(keyboardKey.getCode(key)).toEqual(_code, wrongCode(key, code))
        }
      })
    })
  })

  describe('getKey', () => {
    test('is a function', () => {
      expect(keyboardKey.getKey).toBeInstanceOf(Function)
    })
    test('returns the code for a given key name', () => {
      expect(keyboardKey.getKey(13)).toEqual('Enter', wrongName(13, 'Enter'))
    })
    test('handles all codes', () => {
      Object.keys(keyboardKey.codes).forEach(code => {
        const name = keyboardKey.codes[code]
        const keyName = keyboardKey.getKey(code)
        if (Array.isArray(name)) {
          expect(keyName).toEqual(name[0], wrongName(code, name[0]))
        } else {
          expect(keyName).toEqual(name, wrongName(code, name))
        }
      })
    })
    test('handles event like object: { keyCode: code, shiftKey: false }`', () => {
      Object.keys(keyboardKey.codes).forEach(code => {
        const name = keyboardKey.codes[code]
        const keyName = keyboardKey.getKey({ keyCode: code, shiftKey: false })

        if (Array.isArray(name)) {
          expect(keyName).toEqual(name[0], wrongName(code, name[0]))
        } else {
          expect(keyName).toEqual(name, wrongName(code, name))
        }
      })
    })
    test('handles event like object: { keyCode: code, shiftKey: true }`', () => {
      Object.keys(keyboardKey.codes).forEach(code => {
        const name = keyboardKey.codes[code]
        const keyName = keyboardKey.getKey({ keyCode: code, shiftKey: true })

        if (Array.isArray(name)) {
          expect(keyName).toEqual(name[1], wrongName(code, name[1]))
        } else {
          expect(keyName).toEqual(name, wrongName(code, name))
        }
      })
    })
    test('handles event like object: { which: code, shiftKey: false }', () => {
      Object.keys(keyboardKey.codes).forEach(code => {
        const name = keyboardKey.codes[code]
        const keyName = keyboardKey.getKey({ which: code, shiftKey: false })

        if (Array.isArray(name)) {
          expect(keyName).toEqual(name[0], wrongName(code, name[0]))
        } else {
          expect(keyName).toEqual(name, wrongName(code, name))
        }
      })
    })
    test('handles event like object: { which: code, shiftKey: true }', () => {
      Object.keys(keyboardKey.codes).forEach(code => {
        const name = keyboardKey.codes[code]
        const keyName = keyboardKey.getKey({ which: code, shiftKey: true })

        if (Array.isArray(name)) {
          expect(keyName).toEqual(name[1], wrongName(code, name[1]))
        } else {
          expect(keyName).toEqual(name, wrongName(code, name))
        }
      })
    })
  })
})
