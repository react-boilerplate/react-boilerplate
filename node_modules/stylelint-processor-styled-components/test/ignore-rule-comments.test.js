const stylelint = require('stylelint')
const path = require('path')

const processor = path.join(__dirname, '../lib/index.js')
const rules = {
  'color-named': 'never'
}

describe('ignore rule comments', () => {
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

  describe('disable-whole-file', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/ignore-rule-comments/disable-whole-file.js')
    })

    it('should have one result', () => {
      expect(data.results.length).toBe(1)
    })

    it('should use the right file', () => {
      expect(data.results[0].source).toBe(fixture)
    })

    it('should not have errored', () => {
      expect(data.errored).toBe(false)
    })

    it('should not have any warnings', () => {
      expect(data.results[0].warnings.length).toBe(0)
    })
  })

  describe('alternating-disable-enable', () => {
    beforeAll(() => {
      fixture = path.join(
        __dirname,
        './fixtures/ignore-rule-comments/alternating-disable-enable.js'
      )
    })

    it('should have one result', () => {
      expect(data.results.length).toBe(1)
    })

    it('should use the right file', () => {
      expect(data.results[0].source).toBe(fixture)
    })

    it('should have exactly 2 warnings', () => {
      expect(data.results[0].warnings.length).toBe(2)
    })

    it('should error at exactly the correct places', () => {
      const warnings = data.results[0].warnings

      expect(warnings[0].line).toBe(4)
      expect(warnings[0].rule).toBe('color-named')
      expect(warnings[0].severity).toBe('error')

      expect(warnings[1].line).toBe(14)
      expect(warnings[1].rule).toBe('color-named')
      expect(warnings[1].severity).toBe('error')
    })
  })

  describe('use-single-line-comments', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/ignore-rule-comments/use-single-line-comments.js')
    })

    it('should have one result', () => {
      expect(data.results.length).toBe(1)
    })

    it('should use the right file', () => {
      expect(data.results[0].source).toBe(fixture)
    })

    it('should have exactly 2 warnings', () => {
      expect(data.results[0].warnings.length).toBe(2)
    })

    it('should error at exactly the correct places', () => {
      const warnings = data.results[0].warnings

      expect(warnings[0].line).toBe(4)
      expect(warnings[0].rule).toBe('color-named')
      expect(warnings[0].severity).toBe('error')

      expect(warnings[1].line).toBe(14)
      expect(warnings[1].rule).toBe('color-named')
      expect(warnings[1].severity).toBe('error')
    })
  })

  describe('use-single-line-disables', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/ignore-rule-comments/use-single-line-disables.js')
    })

    it('should have one result', () => {
      expect(data.results.length).toBe(1)
    })

    it('should use the right file', () => {
      expect(data.results[0].source).toBe(fixture)
    })

    it('should have exactly 2 warnings', () => {
      expect(data.results[0].warnings.length).toBe(2)
    })

    it('should error at exactly the correct places', () => {
      const warnings = data.results[0].warnings

      expect(warnings[0].line).toBe(5)
      expect(warnings[0].rule).toBe('color-named')
      expect(warnings[0].severity).toBe('error')

      expect(warnings[1].line).toBe(17)
      expect(warnings[1].rule).toBe('color-named')
      expect(warnings[1].severity).toBe('error')
    })

    it('should match css exactly', () => {
      // This is mostly to check that the disable comments are inserted as expected
      const regex = new RegExp(
        '^\\.selector\\d+ {\\n' +
          '  color: red;\\n' +
          '}\\n' +
          '\\n' +
          '/\\* stylelint-disable \\*/\\n' +
          '\\.selector\\d+ {\\n' +
          '  color: red;\\n' +
          '}\\n' +
          '\\n' +
          '/\\* stylelint-enable \\*/\\n' +
          '\\.selector\\d+ {\\n' +
          '  color: red;\\n' +
          '}\\n' +
          '$'
      )
      // eslint-disable-next-line
      const cssOutput = data.results[0]._postcssResult.css
      expect(regex.test(cssOutput)).toBe(true)
    })
  })

  describe('mix-in-css-disables', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/ignore-rule-comments/mix-in-css-disables.js')
    })

    it('should have one result', () => {
      expect(data.results.length).toBe(1)
    })

    it('should use the right file', () => {
      expect(data.results[0].source).toBe(fixture)
    })

    it('should not have errored', () => {
      expect(data.errored).toBe(false)
    })

    it('should not have any warnings', () => {
      expect(data.results[0].warnings.length).toBe(0)
    })
  })
})
