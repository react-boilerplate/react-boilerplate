## 4.1.0 (2016-07-01)

- Updated: The focus removal on `:hover` now targets `a:hover`.

## 4.0.0 (2016-06-20)

- Added: All improvements from normalize.css v4.1.1
- Added: Documentation for each opinionated feature
- Added: Universal `background-repeat: no-repeat`
- Removed: Reset of universal `margin` and `padding`
- Removed: Inheritance of `font-size` on elements
           (form control elements still have it)
- Removed: Pre-compiled files that used variables
- Updated: `abbr[title]` styled using `border-bottom` over `text-decoration`
- Updated: Tests and linting

### Why are variables removed in v4?

Variables were there for developers to override styles in sanitize.css without
editing the original file or overriding the rule. However, you *should* override
the rule so that your change is explicit, and so that your source maps
accurately indicate your changes coming from your files.

## 3.3.0 (2016-03-03)

- Added: `b` and `strong` normalization
- Added: `::-moz-focus-inner` normalization
- Added: `hr` normalization
- Added: `svg` fill as the current color
- Updated: Organized rules into normalization, universal inheritance,
           opinionated defaults, and configurable defaults
- Updated: Moved source and compiled libraries

## 3.2.0 (2016-02-03)

- Added: `selection.less`
- Updated: Use `root`-prefixed values across all formats
- Updated: Documentation

## 3.1.1 (2016-02-01)

- Updated: `box-sizing` variable corrected to `border-box` in sass, scss, styl

## 3.1.0 (2016-02-01)

- Added: Project configuration (.editorconfig)
- Added: Style linting rules and tests
- Added: `touch-action: manipulation` to remove delays during mobile tapping
- Removed: `text-rendering` due to performance issues
- Updated: `::selection` color variable corrected to `--selection-color`
- Updated: Use direct nesting

## 3.0.0 (2015-10-23)

- Added: Normalization for **iOS 8+**
- Added: `background-repeat` for all elements
- Added: CONTRIBUTING.md
- Updated: background color and color for `:root` previously `html`
- Updated: `::selection` color to `#ffffff`
- Updated: dist from CSS source using PostCSS, cssnext, and cssnano
- Updated: Documentation

## 2.1.1 (2015-10-05)

- Updated: bower.json

## 2.1.1 (2015-10-05)

- Added: CSS version
- Updated: Use percentage `font-size` on `:root`
- Updated: Documentation
- Removed: `background-color` inheritance

## 2.0.0 (2015-09-03)

- Added: Visually hidden element style `[hidden][aria-hidden="false"]`
- Added: Currently updating element style `[aria-busy="true"]`
- Added: Trigger element style `[aria-controls]`
- Added: Color style for `html`
- Added: CHANGELOG.md
- Removed: Standards-breaking visually hidden style `[hidden~="screen"]`
- Removed: Standards-breaking IE-proprietary style `[unselectable="on"]`
- Removed: Prefix-less properties and the use of Autoprefixer
- Updated: Form styling
- Updated: Support for the latest **Chrome**, **Edge**, **Firefox**,
           and **Safari**
- Updated: Licensing reference in package.json
- Updated: Development dependencies
- Updated: README.md and code documentation

## 1.2.0 (2015-06-16)

- Added: Control over options via Sass variables
- Added: Overflow normalization on :root
- Added: `font-style` inheritance
- Updated: Support for the latest **Firefox**
- Removed: Redundant inheritance in ::before and ::after
- Removed: redundant cursor inheritance in anchor and form elements

## 1.1.0 (2015-03-20)

- Added: Form support
- Updated: Normalization
- Updated: Border assignment

## 1.0.0 (2012-11-06)

- Updated: Moved from normalize.css to sanitize.css

> Normalize.css had and still has opinionated, developer-centric styles. For
example, `sub` and `sup` elements are styled to not impact the line height of
text, and `table`, `th`, and `td` omit all spacing. As Nicolas pushed
Normalize.css into maturity, future preferences like these no longer had a
place in the project. Almost a year later, Sanitize was officially branded.
Where Normalize.css conservatively follows user agent consensus and results
in more pre-styled elements, Sanitize.css liberally follows developer
consensus and results in more unstyled elements.

## 0.0.0 (2011-04-21)

- Added: Normalize.css
