# AST format

CSSTree's AST is an object tree. Each node is object with `type` property that indicates its type. Other property set depends on node type.

Each node have a `loc` property, but not included in descriptions to avoid noise. Its value contains an object with node content positions in source string or null depending on parsing settings.

> Details on each node to be done

Other node types are stable enough.

Node types:

<!-- MarkdownTOC -->

- [AnPlusB](#anplusb)
- [Atrule](#atrule)
- [AtrulePrelude](#atruleprelude)
- [AttributeSelector](#attributeselector)
- [Block](#block)
- [Brackets](#brackets)
- [CDC](#cdc)
- [CDO](#cdo)
- [ClassSelector](#classselector)
- [Combinator](#combinator)
- [Comment](#comment)
- [Declaration](#declaration)
- [DeclarationList](#declarationlist)
- [Dimension](#dimension)
- [Function](#function)
- [HexColor](#hexcolor)
- [IdSelector](#idselector)
- [Identifier](#identifier)
- [MediaFeature](#mediafeature)
- [MediaQuery](#mediaquery)
- [MediaQueryList](#mediaquerylist)
- [Nth](#nth)
- [Number](#number)
- [Operator](#operator)
- [Parentheses](#parentheses)
- [Percentage](#percentage)
- [PseudoClassSelector](#pseudoclassselector)
- [PseudoElementSelector](#pseudoelementselector)
- [Ratio](#ratio)
- [Raw](#raw)
- [Rule](#rule)
- [Selector](#selector)
- [SelectorList](#selectorlist)
- [String](#string)
- [StyleSheet](#stylesheet)
- [TypeSelector](#typeselector)
- [UnicodeRange](#unicoderange)
- [Url](#url)
- [Value](#value)
- [WhiteSpace](#whitespace)

<!-- /MarkdownTOC -->

## AnPlusB

Used to represent [the An+B microsyntax](https://drafts.csswg.org/css-syntax/#anb-microsyntax).

```
{
    "type": "AnPlusB",
    "a": String | null,
    "b": String | null
}
```

`a` and `b` may have no value (to be equals to `null`) but not both at the same time. Parser normalizes `a` value to store a valid interger, i.e. for `-n` it will contains `-1` and for `n` it will contains `1`.

## Atrule

```
{
    "type": "Atrule",
    "name": String,
    "prelude": <AtrulePrelude> | <Raw> | null,
    "block": <Block> | null
}
```

## AtrulePrelude

```
{
    "type": "AtrulePrelude",
    "children": List
}
```

## AttributeSelector

```
{
    "type": "AttributeSelector",
    "name": <Identifier>,
    "matcher": String | null,
    "value": <String> | <Identifier> | null,
    "flags": String | null
}
```

## Block

```
{
    "type": "Block",
    "children": List
}
```

## Brackets

```
{
    "type": "Brackets",
    "children": List
}
```

## CDC

```
{
    "type": "CDC"
}
```

## CDO

```
{
    "type": "CDO"
}
```

## ClassSelector

```
{
    "type": "ClassSelector",
    "name": String
}
```

## Combinator

```
{
    "type": "Combinator",
    "name": String
}
```

## Comment

```
{
    "type": "Comment",
    "value": String
}
```

## Declaration

```
{
    "type": "Declaration",
    "important": Boolean | String,
    "property": String,
    "value": <Value> | <Raw>
}
```

## DeclarationList

```
{
    "type": "DeclarationList",
    "children": List
}
```

## Dimension

```
{
    "type": "Dimension",
    "value": String,
    "unit": String
}
```

## Function

```
{
    "type": "Function",
    "name": String,
    "children": List
}
```

## HexColor

```
{
    "type": "HexColor",
    "value": String
}
```

## IdSelector

```
{
    "type": "IdSelector",
    "name": String
}
```

## Identifier

```
{
    "type": "Identifier",
    "name": String
}
```

## MediaFeature

```
{
    "type": "MediaFeature",
    "name": String,
    "value": <Identifier> | <Number> | <Dimension> | <Ratio> | null
}
```

## MediaQuery

```
{
    "type": "MediaQuery",
    "children": List
}
```

## MediaQueryList

```
{
    "type": "MediaQueryList",
    "children": List
}
```

## Nth

```
{
    "type": "Nth",
    "nth": <AnPlusB> | <Identifier>,
    "selector": <SelectorList> | null
}
```

## Number

```
{
    "type": "Number",
    "value": String
}
```

## Operator

```
{
    "type": "Operator",
    "value": String
}
```

## Parentheses

```
{
    "type": "Parentheses",
    "children": List
}
```

## Percentage

```
{
    "type": "Percentage",
    "value": String
}
```

## PseudoClassSelector

```
{
    "type": "PseudoClassSelector",
    "name": String,
    "children": List | null
}
```

## PseudoElementSelector

```
{
    "type": "PseudoElementSelector",
    "name": String,
    "children": List | null
}
```

## Ratio

```
{
    "type": "Ratio",
    "left": String,
    "right": String
}
```

## Raw

```
{
    "type": "Raw",
    "value": String
}
```

## Rule

```
{
    "type": "Rule",
    "prelude": <SelectorList> | <Raw>,
    "block": <Block>
}
```

## Selector

```
{
    "type": "Selector",
    "children": List
}
```

## SelectorList

```
{
    "type": "SelectorList",
    "children": List
}
```

## String

```
{
    "type": "String",
    "value": String
}
```

## StyleSheet

```
{
    "type": "StyleSheet",
    "children": List
}
```

## TypeSelector

```
{
    "type": "TypeSelector",
    "name": String
}
```

## UnicodeRange

```
{
    "type": "UnicodeRange",
    "value": String
}
```

## Url

```
{
    "type": "Url",
    "value": <String> | <Raw>
}
```

## Value

```
{
    "type": "Value",
    "children": List
}
```

## WhiteSpace

```
{
    "type": "WhiteSpace",
    "value": String
}
```
