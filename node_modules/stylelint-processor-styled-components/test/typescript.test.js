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
  ]
}
const doLint = (fixture, done) =>
  stylelint
    .lint({
      files: [fixture],
      config: {
        processors: [processor],
        rules
      }
    })
    .then(result => result)
    .catch(err => {
      // eslint-disable-next-line
      console.log(err)
      done()
      return err
    })

describe('Typescript files, both TS and TSX should parse and report any errors correctly', () => {
  it('should parse styled components code in TS files and report correctly the errors encountered', done => {
    const fixture = path.join(__dirname, './fixtures/typescript/ts-syntax-invalid.ts')
    doLint(fixture, done).then(data => {
      expect(data.results.length).toEqual(1)
      expect(data.results[0].warnings.length).toEqual(5)
      expect(data.results[0].warnings[0].rule).toEqual('block-no-empty')
      expect(data.results[0].warnings[1].rule).toEqual('indentation')
      expect(data.results[0].warnings[2].rule).toEqual('indentation')
      expect(data.results[0].warnings[3].rule).toEqual('indentation')
      expect(data.results[0].warnings[4].rule).toEqual('indentation')
      done()
    })
  })

  it('should not report errors when there are NOT any in a typescript files', done => {
    const fixture = path.join(__dirname, './fixtures/typescript/ts-syntax-valid.ts')
    doLint(fixture, done).then(data => {
      expect(data.results.length).toEqual(1)
      expect(data.results[0].warnings.length).toEqual(0)
      done()
    })
  })

  it('should report errors in TSX files(typescript + JSX)', done => {
    const fixture = path.join(__dirname, './fixtures/typescript/ts-syntax-jsx-invalid.tsx')
    doLint(fixture, done).then(data => {
      expect(data.results.length).toEqual(1)
      expect(data.results[0].warnings.length).toEqual(1)
      expect(data.results[0].warnings[0].rule).toEqual('indentation')
      done()
    })
  })

  it('should ignore errors raised by Stylelint in files without styled components(no-empty-source)', done => {
    const fixture = path.join(__dirname, './fixtures/typescript/ts-syntax-no-styled-components.tsx')
    doLint(fixture, done).then(data => {
      expect(data.results.length).toEqual(1)
      expect(data.results[0].warnings.length).toEqual(0)
      done()
    })
  })
})
