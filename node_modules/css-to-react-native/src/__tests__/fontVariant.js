import transformCss from '..'

it('transforms font variant as an array', () => {
  expect(transformCss([['font-variant', 'tabular-nums']])).toEqual({
    fontVariant: ['tabular-nums'],
  })
})
