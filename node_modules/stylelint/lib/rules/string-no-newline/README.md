# string-no-newline

Disallow (unescaped) newlines in strings.

```css
a {
  content: "first
    second";     ↑
}                ↑
/**              ↑
 * The newline here */
```

[The spec](https://www.w3.org/TR/CSS2/syndata.html#strings) says this: "A string cannot directly contain a newline. To include a newline in a string, use an escape representing the line feed character in ISO-10646 (U+000A), such as \"\A\" or \"\00000a\"." And also: "It is possible to break strings over several lines, for aesthetic or other reasons, but in such a case the newline itself has to be escaped with a backslash (\)."

## Options

### `true`

The following patterns are considered violations:

```css
a {
  content: "first
    second";     
}  
```

```css
[title="something
is probably wrong"] {}  
```

```css
a {
  font-family: "Times
    New
    Roman";
}  
```

The following patterns are *not* considered violations:

```css
a {
  content: "first\Asecond";     
}  
```

```css
a {
  content: "first\\nsecond";     
}  
```

```css
[title="nothing\
  is wrong"] {}  
```

```css
a {
  font-family: "Times New Roman";
}  
```
