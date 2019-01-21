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

describe('options', () => {
  let fixture
  let data

  // NOTE beforeEach() runs _after_ the beforeAll() hooks of the describe() blocks, so `fixture`
  // will have the right path
  beforeEach(done => {
    stylelint
      .lint({
        files: [fixture],
        config: {
          // Set moduleName option to "emotion"
          processors: [[processor, { moduleName: 'emotion' }]],
          rules
        }
      })
      .then(result => {
        data = result
        done()
      })
      .catch(err => {
        console.log(err)
        data = err
        done()
      })
  })

  describe('moduleName', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/options/module-name.js')
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

    it('should have one warning (i.e. wrong lines of code)', () => {
      expect(data.results[0].warnings.length).toEqual(1)
    })

    it('should have a block-no-empty as the first warning', () => {
      expect(data.results[0].warnings[0].rule).toEqual('block-no-empty')
    })
  })

  describe('relative moduleName', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/options/relative-module-name.js')
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

    it('should have one warning (i.e. wrong lines of code)', () => {
      expect(data.results[0].warnings.length).toEqual(1)
    })

    it('should have a block-no-empty as the first warning', () => {
      expect(data.results[0].warnings[0].rule).toEqual('block-no-empty')
    })
  })

  describe('invalid moduleName', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/options/invalid-module-name.js')
    })

    it('should have one result', () => {
      expect(data.results.length).toEqual(1)
    })

    it('should use the right file', () => {
      expect(data.results[0].source).toEqual(fixture)
    })

    it('should not have errored', () => {
      expect(data.results[0].errored).toEqual(undefined)
    })
  })
})
