const stylelint = require('stylelint')
const path = require('path')

const processor = path.join(__dirname, '../lib/index.js')
const rules = {
  'no-empty-source': true
}

describe('empty source', () => {
  let data

  beforeAll(done => {
    stylelint
      .lint({
        code: '',
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

  it('should have one result', () => {
    expect(data.results.length).toEqual(1)
  })

  it('should have errored', () => {
    expect(data.errored).toEqual(true)
  })

  it('should have one warning', () => {
    expect(data.results[0].warnings.length).toEqual(1)
  })

  it('should have the right line number', () => {
    expect(data.results[0].warnings[0].line).toEqual(1)
  })
})
