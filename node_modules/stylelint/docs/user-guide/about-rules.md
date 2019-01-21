# About rules

We have taken great care to consistently name rules.

The rules have been designed to work in conjunction with one another so that strict conventions can be enforced.

<!-- TOC -->

## About rule names

-   Made of lowercase words separated by hyphens.
-   Split into two parts:
    -   The first describes what [*thing*](http://apps.workflower.fi/vocabs/css/en) the rule applies to.
    -   The second describes what the rule is checking.

```js
"number-leading-zero"
// ↑          ↑
// the thing  what the rule is checking
```

-   Except when the rule applies to the whole stylesheet:

```js
"no-eol-whitespace"
"indentation"
//    ↑
// what the rules are checking
```

### No rules

Most rules allow you to choose whether you want to require *or* disallow something.

For example, whether numbers *must* or *must not* have a leading zero:

-   `number-leading-zero`: `string -   "always"|"never"`
    -   `"always"` -   there *must always* be a leading zero.
    -   `"never"` -   there *must never* be a leading zero.

```css
a { line-height: 0.5; }
/**              ↑
 * This leading zero */
```

However, some rules *just disallow* something. `*-no-*` is used to identify these rules.

For example, whether empty blocks should be disallowed:

-   `block-no-empty` -   blocks *must not* be empty.

```css
a {   }
/** ↑
 * Blocks like this */
```

Notice how, for a rule like this, it does not make sense to have an option to enforce the opposite i.e. that every block *must* be empty.

### Max and min rules

`*-max-*` and `*-min-*` rules are used when a rule is *setting a limit* to something.

For example, specifying the maximum number of digits after the "." in a number:

-   `number-max-precision`: `int`

```css
a { font-size: 1.333em; }
/**             ↑
 * The maximum number of digits after this "." */
```

### Whitespace rules

Whitespace rules allow you to specify whether an empty line, a single space, a newline or no space must be used in some specific part of the stylesheet.

The whitespace rules combine two sets of keywords:

1.  `before`, `after` and `inside` are used to specify where the whitespace (if any) is expected.
2.  `empty-line`, `space` and `newline` are used to specify whether a single empty line, a single space, a single newline or no space is expected there.

For example, specifying if a single empty line or no space must come before all the comments in a stylesheet:

-   `comment-empty-line-before`: `string` -   `"always"|"never"`

```css
a {}
              ←
/* comment */ ↑
              ↑
/**           ↑
 * This empty line  */
```

Additionally, some whitespace rule make use of another set of keywords:

1.  `comma`, `colon`, `semicolon`, `opening-brace`, `closing-brace`, `opening-parenthesis`, `closing-parenthesis`, `operator` or `range-operator` are used if a specific piece of punctuation in the *thing* is being targetted.

For example, specifying if a single space or no space must come after a comma in a function:

-   `function-comma-space-after`: `string` -   `"always"|"never"`

```css
a { transform: translate(1, 1) }
/**                       ↑
 * The space after this commas */
```

The plural of the punctuation is used for `inside` rules. For example, specifying if a single space or no space must be inside the parentheses of a function:

-   `function-parentheses-space-inside`: `string` -   `"always"|"never"`

```css
a { transform: translate( 1, 1 ); }
/**                     ↑      ↑
 * The space inside these two parentheses */
```

## Rules work together

The rules can be used together to enforce strict conventions.

### `*-newline/space-before` and `*-newline/space-after` rules

Say you want to enforce no space before and a single space after the colon in every declaration:

```css
a { color: pink; }
/**      ↑
 * No space before and a single space after this colon */
```

You can enforce that with:

```js
"declaration-colon-space-after": "always",
"declaration-colon-space-before": "never"
```

Some *things* (e.g. declaration blocks and value lists) can span more than one line. In these cases `newline` rules and extra options can be used to provide flexibility.

For example, this is the complete set of `value-list-comma-*` rules and their options:

-   `value-list-comma-space-after`: `"always"|"never"|"always-single-line"|"never-single-line"`
-   `value-list-comma-space-before`: `"always"|"never"|"always-single-line"|"never-single-line"`
-   `value-list-comma-newline-after`: `"always"|"always-multi-line|"never-multi-line"`
-   `value-list-comma-newline-before`: `"always"|"always-multi-line"|"never-multi-line"`

Where `*-multi-line` and `*-single-line` are in reference to the value list (the *thing*). For example, given:

```css
a,
b {
  color: red;
  font-family: sans, serif, monospace; /* single line value list */
}              ↑                    ↑
/**            ↑                    ↑
 *  The value list start here and ends here */
```

There is only a single-line value list in this example. The selector is multi-line, as is the declaration block and, as such, also the rule. But the value list isn't and that is what the `*-multi-line` and `*-single-line` refer to in the context of this rule.

#### Example A

Say you only want to allow single-line value lists. And you want to enforce no space before and a single space after the commas:

```css
a {
  font-family: sans, serif, monospace;
  box-shadow: 1px 1px 1px red, 2px 2px 1px 1px blue inset, 2px 2px 1px 2px blue inset;
}
```

You can enforce that with:

```js
"value-list-comma-space-after": "always",
"value-list-comma-space-before": "never"
```

#### Example B

Say you want to allow both single-line and multi-line value lists. You want there to be a single space after the commas in the single-line lists and no space before the commas in both the single-line and multi-line lists:

```css
a {
  font-family: sans, serif, monospace; /* single-line value list with space after, but no space before */
  box-shadow: 1px 1px 1px red, /* multi-line value list ... */
    2px 2px 1px 1px blue inset, /* ... with newline after, ...  */
    2px 2px 1px 2px blue inset; /* ... but no space before */
}
```

You can enforce that with:

```js
"value-list-comma-newline-after": "always-multi-line",
"value-list-comma-space-after": "always-single-line",
"value-list-comma-space-before": "never"
```

#### Example C

Say you want to allow both single-line and multi-line value lists. You want there to be no space before the commas in the single-line lists and always a space after the commas in both lists:

```css
a {
  font-family: sans, serif, monospace;
  box-shadow: 1px 1px 1px red
    , 2px 2px 1px 1px blue inset
    , 2px 2px 1px 2px blue inset;
}
```

You can enforce that with:

```js
"value-list-comma-newline-before": "always-multi-line",
"value-list-comma-space-after": "always",
"value-list-comma-space-before": "never-single-line"
```

#### Example D

Lastly, the rules are flexible enough to enforce entirely different conventions for single-line and multi-line lists. Say you want to allow both single-line and multi-line value lists. You want the single-line lists to have a single space before and after the colons. Whereas you want the multi-line lists to have a single newline before the commas, but no space after:

```css
a {
  font-family: sans , serif , monospace; /* single-line list with a single space before and after the comma */
  box-shadow: 1px 1px 1px red /* multi-line list ... */
    ,2px 2px 1px 1px blue inset /* ... with newline before, ...  */
    ,2px 2px 1px 2px blue inset; /* ... but no space after the comma */
}
```

You can enforce that with:

```js
"value-list-comma-newline-after": "never-multi-line",
"value-list-comma-newline-before": "always-multi-line",
"value-list-comma-space-after": "always-single-line",
"value-list-comma-space-before": "always-single-line"
```

### `*-empty-line-before` and `*-max-empty-lines` rules

These rules work together to control where empty lines are allowed.

Each *thing* is responsible for pushing itself away from the *preceding thing*, rather than pushing the *subsequent thing* away. This consistency is to avoid conflicts, and is why there aren't any `*-empty-line-after` rules in stylelint.

Say you want to enforce the following:

```css
a {
  background: green;
  color: red;

  @media (min-width: 30em) {
    color: blue;
  }
}

b {
  --custom-property: green;

  background: pink;
  color: red;
}
```

You can do that with:

```js
"at-rule-empty-line-before": ["always", {
  "except": ["first-nested"]
}],
"custom-property-empty-line-before": [ "always", {
  "except": [
    "after-custom-property",
    "first-nested"
  ]
}],
"declaration-empty-line-before": ["always", {
  "except": [
    "after-declaration",
    "first-nested"
  ]
}],
"block-closing-brace-empty-line-before": "never",
"rule-empty-line-before": ["always-multi-line"]
```

We recommend that you set your primary option (e.g. `"always"` or `"never"`) to whatever is your most common occurrence and define your exceptions with the `except` optional secondary options. There are many values for the `except` option e.g. `first-nested`, `after-comment` etc.

The `*-empty-line-before` rules control whether there must never be an empty line or whether there must be *one or more* empty lines before a *thing*. The `*-max-empty-lines` rules complement this by controlling *the number* of empty lines within *things*. The `max-empty-lines` rule is used to set a limit across the entire source. A *stricter* limit can then be set within *things* using the likes of `function-max-empty-lines`, `selector-max-empty-lines` and `value-list-max-empty-lines`.

For example, say you want to enforce the following:

```css
a,
b {
  box-shadow:
    inset 0 2px 0 #dcffa6,
    0 2px 5px #000;
}

c {
  transform:
    translate(
      1,
      1
    );
}
```

i.e. a maximum of 1 empty line within the whole source, but no empty lines within functions, selector lists and value lists.

You can do that with:

```js
"function-max-empty-lines": 0,
"max-empty-lines": 1,
"selector-list-max-empty-lines": 0,
"value-list-max-empty-lines": 0
```

### `*-whitelist`, `*-blacklist`, `color-named` and applicable `*-no-*` rules

These rules work together to (dis)allow language features and constructs.

There are `*-whitelist` and `*-blacklist` rules that target the main constructs of the CSS language: at-rules, functions, declarations (i.e. property-value pairs), properties and units. These rules can be used to (dis)allow any language features that makes use of these constructs (e.g. `@media`, `rgb()`). However, there are features not caught by these `*-whitelist` and `*-blacklist` rules (or are, but would require complex regex to configure). There are individual rules, usually a `*-no-*` rule (e.g. `color-no-hex` and `selector-no-id`), to disallow each of these features.

Say you want to disallow the `@debug` language extension. You can do that using either the `at-rule-blacklist` or `at-rule-whitelist` rules because the `@debug` language extension uses the at-rule construct e.g.

```js
"at-rule-blacklist": ["debug"]
```

Say you want to, for whatever reason, disallow the whole at-rule construct. You can do that using:

```js
"at-rule-whitelist": []
```

Say you want to disallow the value `none` for the `border` properties. You can do that using either the `declaration-property-value-blacklist` or `declaration-property-value-whitelist` e.g.

```js
"declaration-property-value-blacklist": [{
  "/^border/": ["none"]
}]
```

#### color

Most `<color>` values are *functions*. As such, they can be (dis)allowed using either the `function-blacklist` or `function-whitelist` rules. There are two other color representations that aren't functions: named colors and hex colors. There are two specific rules that (dis)allow these: `color-named` and `color-no-hex`, respectively.

Say you want to enforce using a named color *if one exists for your chosen color* and use `hwb` color if one does not, e.g.:

```css
a {
  background: hwb(235, 0%, 0%); /* there is no named color equivalent for this color */
  color: black;
}
```

If you're taking a whitelisting approach, you can do that with:

```js
"color-named": "always-where-possible",
"color-no-hex": true,
"function-whitelist": ["hwb"]
```

Or, if you're taking a blacklisting approach:

```js
"color-named": "always-where-possible",
"color-no-hex": true,
"function-blacklist": ["/^rgb/", "/^hsl/", "gray"]
```

This approach scales to when language extensions (that use the two built-in extendable syntactic constructs of at-rules and functions) are used. For example, say you want to disallow all standard color presentations in favour of using a custom color representation function, e.g. `my-color(red with a dash of green / 5%)`. You can do that with:

```js
"color-named": "never",
"color-no-hex": true,
"function-whitelist": ["my-color"]
```
