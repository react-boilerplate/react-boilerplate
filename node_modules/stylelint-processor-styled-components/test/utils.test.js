const interleave = require('../lib/utils/tagged-template-literal').interleave
const hasInterpolationTag = require('../lib/utils/tagged-template-literal').hasInterpolationTag
const parseInterpolationTag = require('../lib/utils/tagged-template-literal').parseInterpolationTag
const extractScTagInformation = require('../lib/utils/tagged-template-literal')
  .extractScTagInformation
const isLastDeclarationCompleted = require('../lib/utils/general').isLastDeclarationCompleted
const nextNonWhitespaceChar = require('../lib/utils/general').nextNonWhitespaceChar
const reverseString = require('../lib/utils/general').reverseString
const isStylelintComment = require('../lib/utils/general').isStylelintComment
const fixIndentation = require('../lib/utils/general').fixIndentation
const extrapolateShortenedCommand = require('../lib/utils/general').extrapolateShortenedCommand
const removeBaseIndentation = require('../lib/utils/general').removeBaseIndentation

const mockLoc = (startLine, endLine) => ({
  start: {
    line: startLine
  },
  end: {
    line: endLine
  }
})

describe('utils', () => {
  describe('interleave', () => {
    it('should return the value of the node if no interpolation exists', () => {
      const raw = 'color: blue;'
      const quasis = [
        {
          value: {
            raw
          }
        }
      ]
      expect(interleave(quasis, [])).toEqual(raw)
    })

    it('should variabelize an interpolation', () => {
      const quasis = [
        {
          loc: mockLoc(1, 3),
          value: {
            raw: '\n  display: block;\n  color: '
          }
        },
        {
          loc: mockLoc(3, 5),
          value: {
            raw: ';\n  background: blue;\n'
          }
        }
      ]
      const expressions = [
        {
          loc: mockLoc(3, 3),
          name: 'color'
        }
      ]
      expect(interleave(quasis, expressions)).toEqual(
        '\n  display: block;\n  color: $dummyValue;\n  background: blue;\n'
      )
    })

    it('converts interpolated expressions to dummy mixins', () => {
      const quasis = [
        {
          loc: mockLoc(1, 3),
          value: {
            raw: '\n  display: block;\n  '
          }
        },
        {
          loc: mockLoc(3, 5),
          value: {
            raw: '\n  background: blue;\n'
          }
        }
      ]
      const expressions = [
        {
          loc: mockLoc(3, 3),
          name: undefined
        }
      ]
      expect(interleave(quasis, expressions)).toEqual(
        '\n  display: block;\n  -styled-mixin0: dummyValue;\n  background: blue;\n'
      )
    })

    it('correctly converts several interpolations within a single property', () => {
      const quasis = [
        {
          loc: mockLoc(1, 3),
          value: {
            raw: '\n  display: block;\n  border: '
          }
        },
        {
          loc: mockLoc(3, 3),
          value: {
            raw: ' '
          }
        },
        {
          loc: mockLoc(3, 3),
          value: {
            raw: ' '
          }
        },
        {
          loc: mockLoc(3, 5),
          value: {
            raw: ';\n  background: blue;\n'
          }
        }
      ]
      const expressions = [
        {
          loc: mockLoc(3, 3),
          name: 'borderWidth'
        },
        {
          loc: mockLoc(3, 3),
          name: 'borderStyle'
        },
        {
          loc: mockLoc(3, 3),
          name: 'color'
        }
      ]
      expect(interleave(quasis, expressions)).toEqual(
        '\n  display: block;\n  border: $dummyValue $dummyValue $dummyValue;\n  background: blue;\n'
      )
    })

    it('correctly handles several interpolations in single line of css', () => {
      const quasis1 = [
        {
          loc: mockLoc(1, 2),
          value: {
            raw: '\n  display: '
          }
        },
        {
          loc: mockLoc(2, 2),
          value: {
            raw: '; background: '
          }
        },
        {
          loc: mockLoc(2, 3),
          value: {
            raw: ';\n'
          }
        }
      ]
      const expressions1 = [
        {
          loc: mockLoc(2, 2),
          name: 'display'
        },
        {
          loc: mockLoc(2, 2),
          name: 'background'
        }
      ]
      expect(interleave(quasis1, expressions1)).toEqual(
        '\n  display: $dummyValue; background: $dummyValue;\n'
      )

      const quasis2 = [
        {
          loc: mockLoc(1, 2),
          value: {
            raw: '\n  display: '
          }
        },
        {
          loc: mockLoc(2, 2),
          value: {
            raw: '; '
          }
        },
        {
          loc: mockLoc(2, 3),
          value: {
            raw: '\n'
          }
        }
      ]
      const expressions2 = [
        {
          loc: mockLoc(2, 2),
          name: 'display'
        },
        {
          loc: mockLoc(3, 3),
          name: undefined
        }
      ]
      expect(interleave(quasis2, expressions2)).toEqual(
        '\n  display: $dummyValue; -styled-mixin0: dummyValue;\n'
      )

      /**
       * It is important to also have this one as interleave would fail this if it simply
       * checked the previous quasi and not the previous processed text.
       * Here we also check the whole expression with and without a semi-colon in the quasi
       */
      const quasis3 = [
        {
          loc: mockLoc(1, 2),
          value: {
            raw: '\n  display: '
          }
        },
        {
          loc: mockLoc(2, 2),
          value: {
            raw: '; '
          }
        },
        {
          loc: mockLoc(2, 2),
          value: {
            raw: ' '
          }
        },
        {
          loc: mockLoc(2, 3),
          value: {
            raw: '\n'
          }
        }
      ]
      const expressions3 = [
        {
          loc: mockLoc(2, 2),
          name: 'display'
        },
        {
          loc: mockLoc(2, 2),
          name: undefined
        },
        {
          loc: mockLoc(2, 2),
          name: undefined
        }
      ]
      expect(interleave(quasis3, expressions3)).toEqual(
        '\n  display: $dummyValue; -styled-mixin0: dummyValue; -styled-mixin1: dummyValue;\n'
      )
    })
  })

  describe('reverseString', () => {
    const fn = reverseString

    it('reverses a string', () => {
      expect(fn('abcd')).toEqual('dcba')
    })

    it('handles empty string', () => {
      expect(fn('')).toEqual('')
    })
  })

  describe('nextNonWhitespaceChar', () => {
    const fn = nextNonWhitespaceChar

    it('handles empty string', () => {
      expect(fn('')).toBe(null)
    })

    it('handles all whitespace', () => {
      expect(fn('  \t \n  \t')).toBe(null)
    })

    it('handles no leading whitespace', () => {
      expect(fn('abc')).toBe('a')
    })

    it('handles spaces', () => {
      expect(fn('  b')).toBe('b')
    })

    it('handles tabs', () => {
      expect(fn('\tc')).toBe('c')
    })

    it('handles newlines', () => {
      expect(fn('\nd')).toBe('d')
    })

    it('handles a mix', () => {
      expect(fn(' \n\t\ra \t\r\nb')).toBe('a')
    })
  })

  describe('isLastDeclarationCompleted', () => {
    const fn = isLastDeclarationCompleted

    it('handles all whitespace', () => {
      expect(fn('   \n \n \t \r')).toBe(true)
    })

    it('handles empty string', () => {
      expect(fn('')).toBe(true)
    })

    it('handles one-line css', () => {
      const prevCSS = 'display: block; color: red '
      expect(fn(prevCSS)).toBe(false)

      expect(fn(`${prevCSS};`)).toBe(true)
    })

    it('handles multi-line css', () => {
      const prevCSS = `
        display: block;
        color: red`
      expect(fn(prevCSS)).toBe(false)

      expect(fn(`${prevCSS};\n`)).toBe(true)
    })

    it('handles irregular css', () => {
      const prevCSS = `display   :  block
           ;      color:
             red   `
      expect(fn(prevCSS)).toBe(false)

      expect(
        fn(`${prevCSS}

                ;

          `)
      ).toBe(true)
    })

    it('handles declaration blocks', () => {
      const prevCSS = `
        @media screen and (max-width: 600px) {
          display: block;
          color: red;
        }
      `
      expect(fn(prevCSS)).toBe(true)
    })

    it('handles being inside a declaration block', () => {
      const prevCSS = `
        span {
          `
      expect(fn(prevCSS)).toBe(true)
    })

    it('handles being preceded by a comment', () => {
      const prevCSS1 = `
        display: block; /* stylelint-disable */
        `
      expect(fn(prevCSS1)).toBe(true)

      const prevCSS2 = `
      display: block;
      /* stylelint-disable */
        `
      expect(fn(prevCSS2)).toBe(true)

      const prevCSS3 = `
      display: block;
      /*
        multiline comment with "*" and "/"
      */
        `
      expect(fn(prevCSS3)).toBe(true)

      const prevCSS4 = `
      display: block;
      /*
       * JSDoc style comment
       */
        `
      expect(fn(prevCSS4)).toBe(true)

      const prevCSS5 = `
        display: /* stylelint-disable */
        `
      expect(fn(prevCSS5)).toBe(false)

      const prevCSS6 = `
      display:
      /* stylelint-disable */
        `
      expect(fn(prevCSS6)).toBe(false)

      const prevCSS7 = `
      display:
      /*
        multiline comment with "*" and "/"
      */
        `
      expect(fn(prevCSS7)).toBe(false)

      const prevCSS8 = `
      display:
      /*
       * JSDoc style comment
       */
        `
      expect(fn(prevCSS8)).toBe(false)
    })
  })

  describe('isStylelintComment', () => {
    const fn = isStylelintComment

    it('should match general block ignores', () => {
      expect(fn('stylelint-disable')).toBe(true)

      expect(fn('stylelint-enable')).toBe(true)
    })

    it('should match block ignores with any arguments', () => {
      expect(fn('stylelint-enable some-rule')).toBe(true)

      expect(fn('stylelint-disable asdfsafdsa-fdsafd9a0fd9sa0f asfd8af afdsa7f')).toBe(true)
    })

    it("shouldn't match line specific ignores", () => {
      expect(fn('stylelint-disable-line')).toBe(false)

      expect(fn('stylelint-disable-next-line')).toBe(false)
    })

    it('should handle whitespace in start and end', () => {
      expect(fn('   \tstylelint-disable   \t')).toBe(true)
    })
  })

  describe('fixIndentation', () => {
    // We only check the one-line case for now as the rest is be covered thoroughly in hard.test.js
    it('leaves one-line css alone', () => {
      const test1 = 'display: block;'
      expect(fixIndentation(test1).text).toBe(test1)

      const test2 = '       display: block;'
      expect(fixIndentation(test2).text).toBe(test2)

      const test3 = '\t\tdisplay:block;'
      expect(fixIndentation(test3).text).toBe(test3)
    })
  })

  describe('hasInterpolationTag', () => {
    const fn = hasInterpolationTag
    it('works for starting comment', () => {
      const expression = {
        leadingComments: [{ value: ' sc-block ' }],
        trailingComments: []
      }
      expect(fn(expression)).toBe(true)
    })

    it('correctly identifies lack of tag', () => {
      const expression = {
        leadingComments: [{ value: 'some test value' }],
        trailingComments: [{ value: 'second test value' }]
      }
      expect(fn(expression)).toBe(false)
    })

    it('handles tag not being first comment', () => {
      const expression = {
        leadingComments: [{ value: 'some test value' }, { value: 'second test value' }],
        trailingComments: [{ value: '  sc-s' }]
      }
      expect(fn(expression)).toBe(true)
    })
  })

  describe('parseInterpolationTag', () => {
    const fn = parseInterpolationTag
    const prepExpression = command => ({
      leadingComments: [
        { value: 'some test comment' },
        {
          value: `sc-${command}`,
          loc: {
            start: {
              line: 1,
              column: 3
            }
          }
        }
      ],
      trailingComments: []
    })
    it('handles the API', () => {
      const selectorExpression = prepExpression('selector')
      expect(fn(selectorExpression, 1, 'path/to/file')).toBe('div')

      const blockExpression = prepExpression('block')
      expect(fn(blockExpression, 1, 'path/to/file')).toBe('-styled-mixin1: dummyValue;')

      const declarationExpression = prepExpression('declaration')
      expect(fn(declarationExpression, 1, 'path/to/file')).toBe('-styled-mixin1: dummyValue;')

      const propertyExpression = prepExpression('property')
      expect(fn(propertyExpression, 1, 'path/to/file')).toBe('-styled-mixin1')

      const valueExpression = prepExpression('value')
      expect(fn(valueExpression, 1, 'path/to/file')).toBe('$dummyValue')

      const customExpression = prepExpression('custom " my test placeholder"')
      expect(fn(customExpression, 1, 'path/to/file')).toBe(' my test placeholder')
    })

    it('throws on invalid tag', () => {
      const invalidExpression = prepExpression('invalid')
      expect(fn.bind(null, invalidExpression, 1, 'path/to/file')).toThrow(
        /path\/to\/file:1:3:.*invalid sc- tag/
      )
    })
  })

  describe('extrapolateShortenedCommand', () => {
    const fn = extrapolateShortenedCommand
    const commands = ['hello', 'heaven', 'command']

    it('handles correctly shortened commands', () => {
      expect(fn(commands, 'hel')).toBe('hello')
      expect(fn(commands, 'hea')).toBe('heaven')
      expect(fn(commands, 'c')).toBe('command')
      expect(fn(commands, 'comm')).toBe('command')
    })

    it('handles full commands', () => {
      expect(fn(commands, 'hello')).toBe('hello')
      expect(fn(commands, 'heaven')).toBe('heaven')
      expect(fn(commands, 'command')).toBe('command')
    })

    it('rejects ambigously shortened commands', () => {
      expect(fn.bind(this, commands, 'h')).toThrow()
      expect(fn.bind(this, commands, 'he', '/path/to/file', { line: 4, column: 6 })).toThrow(
        /path\/to\/file:4:6:/
      )
    })

    it('rejects nonsense', () => {
      expect(fn(commands, 'nonsense')).toBeNull()
      expect(fn(commands, 'asdfasfd')).toBeNull()
      expect(fn(commands, 'x')).toBeNull()
    })
  })

  describe('extractScTagInformation', () => {
    const fn = extractScTagInformation
    it('handles normal Sc Tag', () => {
      expect(fn(' sc-block ')).toEqual({
        command: 'block',
        customPlaceholder: undefined
      })

      expect(fn('sc-selector')).toEqual({
        command: 'selector',
        customPlaceholder: undefined
      })

      expect(fn('sc-block   ')).toEqual({
        command: 'block',
        customPlaceholder: undefined
      })

      expect(fn('sc-block    ')).toEqual({
        command: 'block',
        customPlaceholder: undefined
      })
    })

    it('handles custom placeholder', () => {
      expect(fn(' sc-custom "placeholder test"  ')).toEqual({
        command: 'custom',
        customPlaceholder: 'placeholder test'
      })

      expect(fn(" sc-custom 'placeholder test'  ")).toEqual({
        command: 'custom',
        customPlaceholder: 'placeholder test'
      })
    })
  })

  describe('removeBaseIndentation', () => {
    const fn = removeBaseIndentation
    it('removes indentation correctly', () => {
      const inputCss = `
        html {
          color: red;
        }
      `
      const expectedOutput = `
html {
  color: red;
}
`
      expect(fn(inputCss)).toBe(expectedOutput)
    })

    it('handles oneline css', () => {
      const inputCss = '   display: block;   '
      const expectedOutput = 'display: block;'
      expect(fn(inputCss)).toBe(expectedOutput)
    })

    it('handles no indentation edge case', () => {
      const inputCss = '\ndisplay: block;\ncolor: red;'
      const expectedOutput = inputCss
      expect(fn(inputCss)).toBe(expectedOutput)
    })
  })
})
