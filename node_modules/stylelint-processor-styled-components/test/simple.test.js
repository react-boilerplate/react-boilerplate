const stylelint = require('stylelint')
const path = require('path')

const processor = path.join(__dirname, '../lib/index.js')
const rules = {
  'block-no-empty': true,
  indentation: 2,
  'rule-empty-line-before': [
    'always-multi-line',
    {
      except: ['first-nested'],
      ignore: ['after-comment']
    }
  ],
  'selector-type-no-unknown': true
}

describe('simple', () => {
  let fixture
  let data

  // NOTE beforeEach() runs _after_ the beforeAll() hooks of the describe() blocks, so `fixture`
  // will have the right path
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
        // eslint-disable-next-line
        console.log(err)
        data = err
        done()
      })
  })

  describe('valid fixtures', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/simple/valid.js')
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

  describe('invalid fixtures', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/simple/invalid.js')
    })

    it('should have one result', () => {
      expect(data.results.length).toEqual(1)
    })

    it('should use the right file', () => {
      expect(data.results[0].source).toEqual(fixture)
    })

    it('should have errored', () => {
      expect(data.results[0].errored).toEqual(true)
    })

    it('should have two warnings (i.e. wrong lines of code)', () => {
      expect(data.results[0].warnings.length).toEqual(2)
    })

    it('should have a block-no-empty as the first warning', () => {
      expect(data.results[0].warnings[0].rule).toEqual('block-no-empty')
    })

    it('should have an indentation as the first warning', () => {
      expect(data.results[0].warnings[1].rule).toEqual('indentation')
    })
  })

  describe('helpers', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/simple/helpers.js')
    })

    it('should have one result', () => {
      expect(data.results.length).toEqual(1)
    })

    it('should use the right file', () => {
      expect(data.results[0].source).toEqual(fixture)
    })

    it('should have errored', () => {
      expect(data.results[0].errored).toEqual(true)
    })

    it('should have 11 warnings (i.e. wrong lines of code)', () => {
      expect(data.results[0].warnings.length).toEqual(11)
    })

    it('should be indentation and "empty line before" warnings', () => {
      const warnings = data.results[0].warnings.reduce(
        (all, { rule }) => (all.indexOf(rule) >= 0 ? all : all.concat(rule)),
        []
      )

      expect(warnings).toEqual(['indentation', 'rule-empty-line-before'])
    })
  })

  describe('import names', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/simple/imports.js')
    })

    it('should have one result', () => {
      expect(data.results.length).toEqual(1)
    })

    it('should use the right file', () => {
      expect(data.results[0].source).toEqual(fixture)
    })

    it('should have errored, even with a different name', () => {
      expect(data.results[0].errored).toEqual(true)
    })

    it('should have 9 warnings, even with a different name (i.e. wrong lines of code)', () => {
      expect(data.results[0].warnings.length).toEqual(9)
    })

    it('should all be indentation warnings, even with a different name', () => {
      data.results[0].warnings.forEach(warning => {
        expect(warning.rule).toEqual('indentation')
      })
    })
  })

  describe('nesting', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/simple/nesting.js')
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

  describe('global variables', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/simple/global.js')
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

    it('should have 5 warnings', () => {
      expect(data.results[0].warnings.length).toEqual(5)
    })
  })

  describe('other library', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/simple/other-library.js')
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

    it('should have 1 warning', () => {
      expect(data.results[0].warnings.length).toEqual(1)
    })
  })

  describe('identify styled', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/simple/identify-styled.js')
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

    it('should have 5 warnings', () => {
      expect(data.results[0].warnings.length).toEqual(5)
    })

    it('should have correct warnings', () => {
      const warnings = data.results[0].warnings
      expect(warnings[0].line).toBe(4)
      expect(warnings[0].rule).toBe('selector-type-no-unknown')

      expect(warnings[1].line).toBe(10)
      expect(warnings[1].rule).toBe('selector-type-no-unknown')

      expect(warnings[2].line).toBe(16)
      expect(warnings[2].rule).toBe('selector-type-no-unknown')

      expect(warnings[3].line).toBe(22)
      expect(warnings[3].rule).toBe('selector-type-no-unknown')

      expect(warnings[4].line).toBe(28)
      expect(warnings[4].rule).toBe('selector-type-no-unknown')
    })
  })
})
