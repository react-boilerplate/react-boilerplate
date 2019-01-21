import _ from 'lodash'

export const htmlInputAttrs = [
  // REACT
  'selected',
  'defaultValue',
  'defaultChecked',

  // LIMITED HTML PROPS
  'accept',
  'autoCapitalize',
  'autoComplete',
  'autoCorrect',
  'autoFocus',
  'checked',
  'disabled',
  'form',
  'id',
  'lang',
  'list',
  'max',
  'maxLength',
  'min',
  'minLength',
  'multiple',
  'name',
  'pattern',
  'placeholder',
  'readOnly',
  'required',
  'step',
  'title',
  'type',
  'value',
]

export const htmlInputEvents = [
  // EVENTS
  // keyboard
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',

  // focus
  'onFocus',
  'onBlur',

  // form
  'onChange',
  'onInput',

  // mouse
  'onClick',
  'onContextMenu',
  'onDrag',
  'onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',

  // selection
  'onSelect',

  // touch
  'onTouchCancel',
  'onTouchEnd',
  'onTouchMove',
  'onTouchStart',
]

export const htmlInputProps = [...htmlInputAttrs, ...htmlInputEvents]

/**
 * Returns an array of objects consisting of: props of html input element and rest.
 * @param {object} props A ReactElement props object
 * @param {Object} [options={}]
 * @param {Array} [options.htmlProps] An array of html input props
 * @param {boolean} [options.includeAria] Includes all input props that starts with "aria-"
 * @returns {[{}, {}]} An array of objects
 */
export const partitionHTMLProps = (props, options = {}) => {
  const { htmlProps = htmlInputProps, includeAria = true } = options
  const inputProps = {}
  const rest = {}

  _.forEach(props, (val, prop) => {
    const possibleAria = includeAria && (/^aria-.*$/.test(prop) || prop === 'role')
    const target = _.includes(htmlProps, prop) || possibleAria ? inputProps : rest
    target[prop] = val
  })

  return [inputProps, rest]
}
