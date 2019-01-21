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
      fixture = path.join(__dirname, './fixtures/interpolation-tagging/valid.js')
    })

    it('should have one result', () => {
      expect(data.results.length).toEqual(1)
    })

    it('should use the right file', () => {
      expect(data.results[0].source).toEqual(fixture)
    })

    it('should not have errored', () => {
      expect(data.errored).toEqual(false)
    })

    it('should not have any warnings', () => {
      expect(data.results[0].warnings.length).toEqual(0)
    })
  })

  describe('invalid tag', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/interpolation-tagging/invalid-tag.js')
    })

    it('should return error', () => {
      expect(data.errored).toEqual(true)
    })

    it('should have exactly one warning', () => {
      expect(data.results[0].warnings.length).toBe(1)
    })

    it('should throw correct error', () => {
      const warning = data.results[0].warnings[0]
      expect(warning.line).toBe(5)
      expect(warning.column).toBe(4)
      expect(warning.severity).toBe('error')
      expect(warning.text).toMatch(/Styled Components.*invalid sc- tag/)
    })
  })

  describe('invalid custom tag', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/interpolation-tagging/invalid-custom.js')
    })

    it('should return error', () => {
      expect(data.errored).toEqual(true)
    })

    it('should have exactly one warning', () => {
      expect(data.results[0].warnings.length).toBe(1)
    })

    it('should throw correct error', () => {
      const warning = data.results[0].warnings[0]
      expect(warning.line).toBe(5)
      expect(warning.column).toBe(4)
      expect(warning.severity).toBe('error')
      expect(warning.text).toMatch(/We were unable to parse.*Styled Components/)
    })
  })
})
