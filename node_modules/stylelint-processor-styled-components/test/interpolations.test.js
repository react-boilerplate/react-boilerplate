const stylelint = require('stylelint')
const path = require('path')

const processor = path.join(__dirname, '../lib/index.js')
const rules = {
  'block-no-empty': true,
  'comment-empty-line-before': 'always',
  'declaration-block-no-duplicate-properties': true,
  'value-list-max-empty-lines': 0,
  'max-empty-lines': 1,
  indentation: 2
}

describe('interpolations', () => {
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
      fixture = path.join(__dirname, './fixtures/interpolations/valid.js')
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

  describe('invalid interpolations', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/interpolations/invalid.js')
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

    it('should have warnings', () => {
      expect(data.results[0].warnings.length).toEqual(1)
    })

    it('should have an indentation as the first warning', () => {
      expect(data.results[0].warnings[0].rule).toEqual('indentation')
    })

    it('should have the indentation warning in the right line', () => {
      expect(data.results[0].warnings[0].line).toEqual(16)
    })
  })

  describe('complex interpolations', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/interpolations/complex.js')
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

    it('should not result in a CssSyntaxError', () => {
      const warning = data.results[0].warnings[0] && data.results[0].warnings[0].rule

      expect(warning).not.toEqual('CssSyntaxError')
    })
  })
})
