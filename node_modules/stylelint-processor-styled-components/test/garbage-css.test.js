const stylelint = require('stylelint')
const path = require('path')

const processor = path.join(__dirname, '../lib/index.js')
const rules = {
  'block-no-empty': true,
  'declaration-block-no-duplicate-properties': true,
  indentation: 2
}

describe('interpolation-tagging', () => {
  let fixture
  let data

  beforeEach(done => {
    stylelint
      .lint({
        files: [fixture],
        config: {
          processors: [processor],
          rules
        }
      })
      .then(result => {
        data = result
        done()
      })
      .catch(err => {
        data = err
        done()
      })
  })

  describe('valid', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/garbage-css/invalid-css.js')
    })

    it('should have one result', () => {
      expect(data.results.length).toEqual(1)
    })

    it('should use the right file', () => {
      expect(data.results[0].source).toEqual(fixture)
    })

    it('should have errored', () => {
      expect(data.errored).toEqual(true)
    })

    it('should not have exactly one warning', () => {
      expect(data.results[0].warnings.length).toEqual(1)
    })

    it('should be a CssSyntaxError', () => {
      const warning = data.results[0].warnings[0]
      expect(warning.severity).toBe('error')
      expect(warning.rule).toBe('CssSyntaxError')
      expect(warning.text).toMatch('Unknown word')
    })

    it('should apply sourcemaps correctly', () => {
      const warning = data.results[0].warnings[0]
      expect(warning.line).toBe(4)
      expect(warning.column).toBe(3)
    })
  })
})
