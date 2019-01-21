const stylelint = require('stylelint')
const path = require('path')

const code = `import styled from 'styled-components';
const StyledTable = styled(StyledTableBase)\`
color: red;
\``
const processor = path.join(__dirname, '../lib/index.js')
const rules = {
  indentation: 2
}

describe('no files', () => {
  let codeFilename
  let data

  // NOTE beforeEach() runs _after_ the beforeAll() hooks of the describe() blocks
  beforeEach(done => {
    stylelint
      .lint({
        code,
        codeFilename,
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

  describe('no codeFilename', () => {
    beforeAll(() => {
      codeFilename = undefined
    })

    it('should have one result', () => {
      expect(data.results.length).toEqual(1)
    })

    it('should use the right file', () => {
      // Every new linting that occurs in beforeEach() will increase the id
      expect(data.results[0].source).toEqual('<input css 2>')
    })

    it('should have errored', () => {
      expect(data.errored).toEqual(true)
    })

    it('should have one warning', () => {
      expect(data.results[0].warnings.length).toEqual(1)
    })

    it('should have the right line number', () => {
      expect(data.results[0].warnings[0].line).toEqual(3)
    })
  })

  describe('has codeFilename', () => {
    beforeAll(() => {
      codeFilename = 'somefile.js'
    })

    it('should have one result', () => {
      expect(data.results.length).toEqual(1)
    })

    it('should use the right file', () => {
      expect(data.results[0].source).toEqual(path.resolve(process.cwd(), codeFilename))
    })

    it('should have errored', () => {
      expect(data.errored).toEqual(true)
    })

    it('should have one warning', () => {
      expect(data.results[0].warnings.length).toEqual(1)
    })

    it('should have the right line number', () => {
      expect(data.results[0].warnings[0].line).toEqual(3)
    })
  })
})
