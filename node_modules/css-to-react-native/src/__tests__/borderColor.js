import transformCss from '..'

it('transforms border color with multiple values', () => {
  expect(transformCss([['border-color', 'red yellow green blue']])).toEqual({
    borderTopColor: 'red',
    borderRightColor: 'yellow',
    borderBottomColor: 'green',
    borderLeftColor: 'blue',
  })
})
