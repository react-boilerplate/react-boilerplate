'use strict'

var isObject = function isObject(val) {
  return val !== null && !Array.isArray(val) && typeof val === 'object'
}

var codes = {
  // ----------------------------------------
  // By Code
  // ----------------------------------------
  3: 'Cancel',
  6: 'Help',
  8: 'Backspace',
  9: 'Tab',
  12: 'Clear',
  13: 'Enter',
  16: 'Shift',
  17: 'Control',
  18: 'Alt',
  19: 'Pause',
  20: 'CapsLock',
  27: 'Escape',
  28: 'Convert',
  29: 'NonConvert',
  30: 'Accept',
  31: 'ModeChange',
  32: ' ',
  33: 'PageUp',
  34: 'PageDown',
  35: 'End',
  36: 'Home',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
  41: 'Select',
  42: 'Print',
  43: 'Execute',
  44: 'PrintScreen',
  45: 'Insert',
  46: 'Delete',
  48: ['0', ')'],
  49: ['1', '!'],
  50: ['2', '@'],
  51: ['3', '#'],
  52: ['4', '$'],
  53: ['5', '%'],
  54: ['6', '^'],
  55: ['7', '&'],
  56: ['8', '*'],
  57: ['9', '('],
  91: 'OS',
  93: 'ContextMenu',
  144: 'NumLock',
  145: 'ScrollLock',
  181: 'VolumeMute',
  182: 'VolumeDown',
  183: 'VolumeUp',
  186: [';', ':'],
  187: ['=', '+'],
  188: [',', '<'],
  189: ['-', '_'],
  190: ['.', '>'],
  191: ['/', '?'],
  192: ['`', '~'],
  219: ['[', '{'],
  220: ['\\', '|'],
  221: [']', '}'],
  222: ["'", '"'],
  224: 'Meta',
  225: 'AltGraph',
  246: 'Attn',
  247: 'CrSel',
  248: 'ExSel',
  249: 'EraseEof',
  250: 'Play',
  251: 'ZoomOut',
}

// Function Keys (F1-24)
for (var i = 0; i < 24; i += 1) {
  codes[112 + i] = 'F' + (i + 1)
}

// Alphabet (a-Z)
for (var j = 0; j < 26; j += 1) {
  var n = j + 65
  codes[n] = [String.fromCharCode(n + 32), String.fromCharCode(n)]
}

var keyboardKey = {
  codes: codes,

  /**
   * Get the `keyCode` or `which` value from a keyboard event or `key` name.
   * @param {string|object} name A keyboard event like object or `key` name.
   * @param {string} [name.key] If object, it must have one of these keys.
   * @param {string} [name.keyCode] If object, it must have one of these keys.
   * @param {string} [name.which] If object, it must have one of these keys.
   * @returns {*}
   */
  getCode: function getCode(name) {
    if (isObject(name)) {
      return name.keyCode || name.which || this[name.key]
    }
    return this[name]
  },

  /**
   * Get the key name from a keyboard event, `keyCode`, or `which` value.
   * @param {number|object} code A keyboard event like object or key name.
   * @param {number} [code.keyCode] If object, it must have one of these keys.
   * @param {number} [code.which] If object, it must have one of these keys.
   * @param {number} [code.shiftKey] If object, it must have one of these keys.
   * @returns {*}
   */
  getKey: function getKey(code) {
    var isEvent = isObject(code)
    var name = codes[isEvent ? code.keyCode || code.which : code]

    if (Array.isArray(name)) {
      if (isEvent) {
        name = name[code.shiftKey ? 1 : 0]
      } else {
        name = name[0]
      }
    }

    return name
  },

  // ----------------------------------------
  // By Name
  // ----------------------------------------
  // declare these manually for static analysis
  Cancel: 3,
  Help: 6,
  Backspace: 8,
  Tab: 9,
  Clear: 12,
  Enter: 13,
  Shift: 16,
  Control: 17,
  Alt: 18,
  Pause: 19,
  CapsLock: 20,
  Escape: 27,
  Convert: 28,
  NonConvert: 29,
  Accept: 30,
  ModeChange: 31,
  ' ': 32,
  PageUp: 33,
  PageDown: 34,
  End: 35,
  Home: 36,
  ArrowLeft: 37,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40,
  Select: 41,
  Print: 42,
  Execute: 43,
  PrintScreen: 44,
  Insert: 45,
  Delete: 46,
  0: 48,
  ')': 48,
  1: 49,
  '!': 49,
  2: 50,
  '@': 50,
  3: 51,
  '#': 51,
  4: 52,
  $: 52,
  5: 53,
  '%': 53,
  6: 54,
  '^': 54,
  7: 55,
  '&': 55,
  8: 56,
  '*': 56,
  9: 57,
  '(': 57,
  a: 65,
  A: 65,
  b: 66,
  B: 66,
  c: 67,
  C: 67,
  d: 68,
  D: 68,
  e: 69,
  E: 69,
  f: 70,
  F: 70,
  g: 71,
  G: 71,
  h: 72,
  H: 72,
  i: 73,
  I: 73,
  j: 74,
  J: 74,
  k: 75,
  K: 75,
  l: 76,
  L: 76,
  m: 77,
  M: 77,
  n: 78,
  N: 78,
  o: 79,
  O: 79,
  p: 80,
  P: 80,
  q: 81,
  Q: 81,
  r: 82,
  R: 82,
  s: 83,
  S: 83,
  t: 84,
  T: 84,
  u: 85,
  U: 85,
  v: 86,
  V: 86,
  w: 87,
  W: 87,
  x: 88,
  X: 88,
  y: 89,
  Y: 89,
  z: 90,
  Z: 90,
  OS: 91,
  ContextMenu: 93,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  F13: 124,
  F14: 125,
  F15: 126,
  F16: 127,
  F17: 128,
  F18: 129,
  F19: 130,
  F20: 131,
  F21: 132,
  F22: 133,
  F23: 134,
  F24: 135,
  NumLock: 144,
  ScrollLock: 145,
  VolumeMute: 181,
  VolumeDown: 182,
  VolumeUp: 183,
  ';': 186,
  ':': 186,
  '=': 187,
  '+': 187,
  ',': 188,
  '<': 188,
  '-': 189,
  _: 189,
  '.': 190,
  '>': 190,
  '/': 191,
  '?': 191,
  '`': 192,
  '~': 192,
  '[': 219,
  '{': 219,
  '\\': 220,
  '|': 220,
  ']': 221,
  '}': 221,
  "'": 222,
  '"': 222,
  Meta: 224,
  AltGraph: 225,
  Attn: 246,
  CrSel: 247,
  ExSel: 248,
  EraseEof: 249,
  Play: 250,
  ZoomOut: 251,
}

// ----------------------------------------
// By Alias
// ----------------------------------------
// provide dot-notation accessible keys for all key names
keyboardKey.Spacebar = keyboardKey[' ']
keyboardKey.Digit0 = keyboardKey['0']
keyboardKey.Digit1 = keyboardKey['1']
keyboardKey.Digit2 = keyboardKey['2']
keyboardKey.Digit3 = keyboardKey['3']
keyboardKey.Digit4 = keyboardKey['4']
keyboardKey.Digit5 = keyboardKey['5']
keyboardKey.Digit6 = keyboardKey['6']
keyboardKey.Digit7 = keyboardKey['7']
keyboardKey.Digit8 = keyboardKey['8']
keyboardKey.Digit9 = keyboardKey['9']
keyboardKey.Tilde = keyboardKey['~']
keyboardKey.GraveAccent = keyboardKey['`']
keyboardKey.ExclamationPoint = keyboardKey['!']
keyboardKey.AtSign = keyboardKey['@']
keyboardKey.PoundSign = keyboardKey['#']
keyboardKey.PercentSign = keyboardKey['%']
keyboardKey.Caret = keyboardKey['^']
keyboardKey.Ampersand = keyboardKey['&']
keyboardKey.PlusSign = keyboardKey['+']
keyboardKey.MinusSign = keyboardKey['-']
keyboardKey.EqualsSign = keyboardKey['=']
keyboardKey.DivisionSign = keyboardKey['/']
keyboardKey.MultiplicationSign = keyboardKey['*']
keyboardKey.Comma = keyboardKey[',']
keyboardKey.Decimal = keyboardKey['.']
keyboardKey.Colon = keyboardKey[':']
keyboardKey.Semicolon = keyboardKey[';']
keyboardKey.Pipe = keyboardKey['|']
keyboardKey.BackSlash = keyboardKey['\\']
keyboardKey.QuestionMark = keyboardKey['?']
keyboardKey.SingleQuote = keyboardKey["'"]
keyboardKey.DoubleQuote = keyboardKey['"']
keyboardKey.LeftCurlyBrace = keyboardKey['{']
keyboardKey.RightCurlyBrace = keyboardKey['}']
keyboardKey.LeftParenthesis = keyboardKey['(']
keyboardKey.RightParenthesis = keyboardKey[')']
keyboardKey.LeftAngleBracket = keyboardKey['<']
keyboardKey.RightAngleBracket = keyboardKey['>']
keyboardKey.LeftSquareBracket = keyboardKey['[']
keyboardKey.RightSquareBracket = keyboardKey[']']

module.exports = keyboardKey
