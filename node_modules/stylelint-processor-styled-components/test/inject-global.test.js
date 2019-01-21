const stylelint = require('stylelint')
const path = require('path')

const processor = path.join(__dirname, '../lib/index.js')
const rules = {
  indentation: 2,
  'selector-max-compound-selectors': 1
}

describe('inject-global', () => {
  describe('using spaces', () => {
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
        fixture = path.join(__dirname, './fixtures/inject-global/valid-spaces.js')
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
  })

  describe('using tabs', () => {
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
            rules: Object.assign({}, rules, { indentation: 'tab' })
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
        fixture = path.join(__dirname, './fixtures/inject-global/valid-tabs.js')
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
  })
})
