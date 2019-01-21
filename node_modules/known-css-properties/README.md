<p align="center"><img src="logo.png" width="200" height="200" alt="logo" /></p>

# Known CSS properties

List of standard and browser specific CSS properties.

[![License](https://img.shields.io/github/license/known-css/known-css-properties.svg)](https://github.com/known-css/known-css-properties/blob/master/LICENSE)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovateapp.com/)
[![Npm downloads](https://img.shields.io/npm/dm/known-css-properties.svg)](https://www.npmjs.com/package/known-css-properties)

## Source

1. Standard properties (only 'REC', 'CR', 'LC', 'WD', 'FPWD', 'ED' statuses): http://www.w3.org/Style/CSS/all-properties.en.json
2. Browser supported properties from `window.getComputedStyle` / `document.body.style`

### Windows
|                   | XP     | 7      | 8      | 10     |
| ----------------- | ------ | ------ | ------ | ------ |
| Chrome            | 18-49  | 18-50  | 22-50  | 37-56  |
| Firefox           | 6-45   | 6-45   | 16-45  | 32-52  |
| Internet Explorer |        | 8-11   | 10-11  | 11     |
| Edge              |        |        |        | 13-17  |

### OSX
|                   | 10.6  | 10.11  | 10.12  | 10.13  |
| ----------------- | ----- | ------ | ------ | ------ |
| Chrome            | 14-49 | 14-58  | 59-64  | 65-69  |
| Firefox           | 6-42  | 6-52   | 53-58  | 59-62  |

### Others:

- Safari: 6, 6.2, 7, 8, 9, 9.1, 10.0, 11.0, 11.1
- Mobile Safari: 6, 7, 8, 8.3, 9.0, 9.3, 10.0, 10.2, 10.3, 11.0, 11.2, 11.3, 11.4, 12.0
- Chrome Android: 30, 35, 37, 44, 46, 51, 55, 56, 57, 58, 59, 60, 61, 62, 64, 66, 68
- Firefox mobile: 47, 52, 53, 54, 57, 58, 62
- IE mobile: 11
- Opera Win XP: 12.10, 12.14, 12.15, 12.16
- Opera Win 8: 36-38
- Opera OSX: 36-40, 45
- Opera Mobile: 42.7, 43, 47.1
- Samsung internet: 4.0
- UC browser: 11.2

## JavaScript API

```js
const properties = require('known-css-properties').all;
```

## Thanks

We use [SauceLabs](https://saucelabs.com) testing solution for getting most of the data.
