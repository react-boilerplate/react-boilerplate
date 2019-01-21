/**
 * Real world failures
 */

const stylelint = require('stylelint')
const path = require('path')

const processor = path.join(__dirname, '../lib/index.js')
const rules = {
  'rule-empty-line-before': [
    'always-multi-line',
    {
      except: ['first-nested'],
      ignore: ['after-comment']
    }
  ],
  'block-no-empty': true,
  indentation: 2
}

describe('real world failures', () => {
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
        data = err
        done()
      })
  })

  describe('Circle', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/real-world/Circle.js')
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
      expect(data.results[0].warnings).toEqual([])
    })
  })

  describe('Line Numbers Report Correctly', () => {
    beforeAll(() => {
      fixture = path.join(__dirname, './fixtures/real-world/LineNumbersReportedAccurate.js')
    })

    it('should have one result', () => {
      expect(data.results.length).toEqual(1)
    })

    it('should use the right file', () => {
      expect(data.results[0].source).toEqual(fixture)
    })

    it('should not have errored', () => {
      expect(data.errored).toEqual(true)
    })

    it('should identify the line number correctly', () => {
      const errorLine = 20
      expect(data.results[0].warnings[0].line).toEqual(errorLine)
    })
  })
})
