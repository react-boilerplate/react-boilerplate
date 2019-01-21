seamless-immutable
==================

Immutable JS data structures which are backwards-compatible with normal Arrays and Objects.

Use them in `for` loops, pass them to functions expecting vanilla JavaScript data structures, etc.

```javascript
var array = Immutable(["totally", "immutable", {hammer: "Can’t Touch This"}]);

array[1] = "I'm going to mutate you!"
array[1] // "immutable"

array[2].hammer = "hm, surely I can mutate this nested object..."
array[2].hammer // "Can’t Touch This"

for (var index in array) { console.log(array[index]); }
// "totally"
// "immutable"
// { hammer: 'Can’t Touch This' }

JSON.stringify(array) // '["totally","immutable",{"hammer":"Can’t Touch This"}]'
```

This level of backwards compatibility requires [ECMAScript 5](http://kangax.github.io/compat-table/es5/) features like [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) and [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) to exist and work correctly, which limits the browsers that can use this library to the ones shown in the test results below. (tl;dr [IE9+](https://saucelabs.com/u/seamless-immutable))

[![build status][1]][2] [![NPM version][3]][4] [![coverage status][5]][6]

## Performance

Whenever you deeply clone large nested objects, it should typically go much faster with `Immutable` data structures. This is because the library reuses the existing nested objects rather than instantiating new ones.

In the development build, objects are [frozen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze). (Note that [Safari is relatively slow to iterate over frozen objects](http://jsperf.com/performance-frozen-object/20).) The development build also overrides unsupported methods (methods that ordinarily mutate the underlying data structure) to throw helpful exceptions.

The production (minified) build does neither of these, which significantly improves performance.

We generally recommend to use the "development" build that enforces immutability (and this is the default in Node.js). Only switch to the production build when you encounter performance problems. (See #50 for how to do that in Node or using a build tool - essentially do explicitely refer to the production build.)

## Intentional Abstraction Leaks

By popular demand, functions, errors, dates, and [React](https://facebook.github.io/react/)
components are treated as immutable even though technically they can be mutated.
(It turns out that trying to make these immutable leads to more bad things
than good.) If you call `Immutable()` on any of these, be forewarned: they will
not actually be immutable!

## Add-ons

seamless-immutable is tightly focused on the mechanics of turning existing JavaScript data structures into immutable variants.
Additional packages are available to build on this capability and enable additional programming models:

|Library|Description|
|--------|------------|
|[Cursor](https://github.com/MartinSnyder/seamless-immutable-cursor)|Compact Cursor Library built on top of the excellent seamless-immutable. Cursors can be used to manage transitions and manipulations of immutable structures in an application.|
|[Mergers](https://github.com/crudh/seamless-immutable-mergers)|A collection of mergers for use with seamless-immutable. Also includes documentation about custom mergers, with examples, for writing your own.|

## API Overview

`Immutable()` returns a backwards-compatible immutable representation of whatever you pass it, so feel free to pass it absolutely anything that can be serialized as JSON. (As is the case with JSON, objects containing circular references are not allowed. Functions are allowed, unlike in JSON, but they will not be touched.)

Since numbers, strings, `undefined`, and `null` are all immutable to begin with, the only unusual things it returns are Immutable Arrays and Immutable Objects. These have the same [ES5 methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) you’re used to seeing on them, but with these important differences:

1. All the methods that would normally mutate the data structures instead throw `ImmutableError`.
2. All the methods that return a relevant value now return an immutable equivalent of that value.
3. Attempting to reassign values to their elements (e.g. `foo[5] = bar`) will not work. Browsers other than Internet Explorer will throw a `TypeError` if [use strict](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) is enabled, and in all other cases it will fail silently.
4. A few additional methods have been added for convenience.

For example:

```javascript
Immutable([3, 1, 4]).sort()
// This will throw an ImmutableError, because sort() is a mutating method.

Immutable([1, 2, 3]).concat([10, 9, 8]).sort()
// This will also throw ImmutableError, because an Immutable Array's methods
// (including concat()) are guaranteed to return other immutable values.

[1, 2, 3].concat(Immutable([6, 5, 4])).sort()
// This will succeed, and will yield a sorted mutable array containing
// [1, 2, 3, 4, 5, 6], because a vanilla array's concat() method has
// no knowledge of Immutable.

var obj = Immutable({all: "your base", are: {belong: "to them"}});
Immutable.merge(obj, {are: {belong: "to us"}})
// This will return the following:
// Immutable({all: "your base", are: {belong: "to us"}})
```

## Static or instance syntax

Seamless-immutable supports both static and instance syntaxes:

```javascript
var Immutable = require("seamless-immutable").static;
var obj = {};

Immutable.setIn(obj, ['key'], data)
```

```javascript
var Immutable = require("seamless-immutable");
var obj = {};

obj.setIn(['key'], data)
```

Although the later is shorter and is the current default, it can lead to
collisions and some users may dislike polluting object properties when it comes
to debugging. As such the first syntax is recommended, but both are supported.

## Immutable.from

If your linter cringes with the use of `Immutable` without a preceding `new`
(e.g. ESLint's [new-cap](http://eslint.org/docs/rules/new-cap) rule),
use `Immutable.from`:

```javascript
Immutable.from([1, 2, 3]);
// is functionally the same as calling:
Immutable([1, 2, 3])
```

## Immutable Array

Like a regular Array, but immutable! You can construct these by passing
an array to `Immutable()`:

```javascript
Immutable([1, 2, 3])
// An immutable array containing 1, 2, and 3.
```

Beyond [the usual Array fare](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Accessor_methods), the following methods have been added.

### flatMap

```javascript
var array = Immutable(["here", "we", "go"]);
Immutable.flatMap(array, function(str) {
  return [str, str, str];
});
// returns Immutable(["here", "here", "here", "we", "we", "we", "go", "go", "go"])

var array = Immutable(["drop the numbers!", 3, 2, 1, 0, null, undefined]);
Immutable.flatMap(array, function(value) {
  if (typeof value === "number") {
    return [];
  } else {
    return value;
  }
});
// returns Immutable(["drop the numbers!", null, undefined])
```

Effectively performs a [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) over the elements in the array, except that whenever the provided
iterator function returns an Array, that Array's elements are each added to the final result.

### asObject

```javascript
var array = Immutable(["hey", "you"]);
Immutable.asObject(array, function(str) {
  return [str, str.toUpperCase()];
});
// returns Immutable({hey: "HEY", you: "YOU"})
```

Effectively performs a [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) over the elements in the array, expecting that the iterator function
will return an array of two elements - the first representing a key, the other
a value. Then returns an Immutable Object constructed of those keys and values.

You can also call `.asObject` without passing an iterator, in which case it will proceed assuming the Array
is already organized as desired.

### asMutable

```javascript
var array = Immutable(["hello", "world"]);
var mutableArray = Immutable.asMutable(array);

mutableArray.push("!!!");

mutableArray // ["hello", "world", "!!!"]
```

Returns a mutable copy of the array. For a deeply mutable copy, in which any instances of `Immutable` contained in nested data structures within the array have been converted back to mutable data structures, call `Immutable.asMutable(obj, {deep: true})` instead.

### isImmutable
```javascript
var array = Immutable(["hello", "world"]);
var mutableArray = ["hello", "world"];

Immutable.isImmutable(array)
// returns true

Immutable.isImmutable(mutableArray)
// returns false
```

Returns whether an object is immutable or not.

## Immutable Object

Like a regular Object, but immutable! You can construct these by passing an
object to `Immutable()`.

```javascript
Immutable({foo: "bar"})
// An immutable object containing the key "foo" and the value "bar".
```

To construct an Immutable Object with a custom prototype, simply specify the
prototype in `options` (while useful for preserving prototypes, please note
that custom mutator methods will not work as the object will be immutable):

```javascript
function Square(length) { this.length = length };
Square.prototype.area = function() { return Math.pow(this.length, 2) };

Immutable(new Square(2), {prototype: Square.prototype}).area();
// An immutable object, with prototype Square,
// containing the key "length" and method `area()` returning 4
```

Beyond [the usual Object fare](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#Methods_of_Object_instances), the following methods have been added.

### Stack overflow protection

Currently you can't construct Immutable from an object with circular references. To protect from ugly stack overflows, we provide a simple protection during development. We stop at a suspiciously deep stack level and [show an error message][deep].

If your objects are deep, but not circular, you can increase this level from default `64`. For example:

```javascript
Immutable(deepObject, null, 256);
```

This check is not performed in the production build.

[deep]: https://github.com/rtfeldman/seamless-immutable/wiki/Deeply-nested-object-was-detected

### merge

```javascript
var obj = Immutable({status: "good", hypothesis: "plausible", errors: 0});
Immutable.merge(obj, {status: "funky", hypothesis: "confirmed"});
// returns Immutable({status: "funky", hypothesis: "confirmed", errors: 0})

var obj = Immutable({status: "bad", errors: 37});
Immutable.merge(obj, [
  {status: "funky", errors: 1}, {status: "groovy", errors: 2}, {status: "sweet"}]);
// returns Immutable({status: "sweet", errors: 2})
// because passing an Array is shorthand for
// invoking a separate merge for each object in turn.
```
Returns an Immutable Object containing the properties and values of both
this object and the provided object, prioritizing the provided object's
values whenever the same key is present in both objects.

Multiple objects can be provided in an Array in which case more `merge`
invocations will be performed using each provided object in turn.

A third argument can be provided to configure the merge. It should be an object with any of the following fields:

```javascript
{
  deep: true, // perform a deep merge
  merger: yourCustomMerger // supply a custom merger
}
```

You can find examples and documentation about custom mergers [here](https://github.com/crudh/seamless-immutable-mergers).

### replace

```javascript
var obj1 = Immutable({a: {b: 'test'}, c: 'test'});
var obj2 = Immutable.replace(obj1, {a: {b: 'test'}}, {deep: true});
// returns Immutable({a: {b: 'test'}});
obj1 === obj2
// returns false
obj1.a === obj2.a
// returns true because child .a objects were identical
```

Returns an Immutable Object containing the properties and values of the
second object only. With deep merge, all child objects are checked for
equality and the original immutable object is returned when possible.

A second argument can be provided to perform a deep merge: `{deep: true}`.

### set

```javascript
var obj = Immutable({type: "parrot", subtype: "Norwegian Blue", status: "alive"});
Immutable.set(obj, "status", "dead");
// returns Immutable({type: "parrot", subtype: "Norwegian Blue", status: "dead"})
```

Returns an Immutable Object with a single property set to the provided value.
Basically a more straightforward way of saying
```javascript
var obj = Immutable({type: "parrot", subtype: "Norwegian Blue", status: "alive"});
Immutable.merge(obj, {status: "dead"});
```
(and more convenient with non-literal keys unless you have ES6 ```[computed_property_names]```).

A second argument can be provided to perform a deep compare: `{deep: true}`.

### setIn

Like [set](#set), but accepts a nested path to the property.

```javascript
var obj = Immutable({type: {main: "parrot", sub: "Norwegian Blue"}, status: "alive"});
Immutable.setIn(obj, ["type", "sub"], "Norwegian Ridgeback");
// returns Immutable({type: {main: "parrot", sub: "Norwegian Ridgeback"}, status: "alive"})
```

A second argument can be provided to perform a deep compare: `{deep: true}`.

### getIn

Returns the value at the given path. A default value can be provided as a second argument.

```javascript
var obj = Immutable({type: {main: "parrot", subtype: "Norwegian Blue"}, status: "alive"});
Immutable.getIn(obj, ["type", "subtype"]);
// returns "Norwegian Blue"
Immutable.getIn(obj, ["type", "class"], "Aves");
// returns "Aves"
```

### update

Returns an Immutable Object with a single property updated using the provided updater function.

```javascript
function inc (x) { return x + 1 }
var obj = Immutable({foo: 1});
Immutable.update(obj, "foo", inc);
// returns Immutable({foo: 2})
```

All additional arguments will be passed to the updater function.

```javascript
function add (x, y) { return x + y }
var obj = Immutable({foo: 1});
Immutable.update(obj, "foo", add, 10);
// returns Immutable({foo: 11})
```

### updateIn

Like [update](#update), but accepts a nested path to the property.

```javascript
function add (x, y) { return x + y }
var obj = Immutable({foo: {bar: 1}});
Immutable.updateIn(obj, ["foo", "bar"], add, 10);
// returns Immutable({foo: {bar: 11}})
```

### without

```javascript
var obj = Immutable({the: "forests", will: "echo", with: "laughter"});
Immutable.without(obj, "with");
// returns Immutable({the: "forests", will: "echo"})

var obj = Immutable({the: "forests", will: "echo", with: "laughter"});
Immutable.without(obj, ["will", "with"]);
// returns Immutable({the: "forests"})

var obj = Immutable({the: "forests", will: "echo", with: "laughter"});
Immutable.without(obj, "will", "with");
// returns Immutable({the: "forests"})

var obj = Immutable({the: "forests", will: "echo", with: "laughter"});
Immutable.without(obj, (value, key) => key === "the" || value === "echo");
// returns Immutable({with: "laughter"})
```

Returns an Immutable Object excluding the given keys or keys/values satisfying
the given predicate from the existing object.

Multiple keys can be provided, either in an Array or as extra arguments.

### asMutable

```javascript
var obj = Immutable({when: "the", levee: "breaks"});
var mutableObject = Immutable.asMutable(obj);

mutableObject.have = "no place to go";

mutableObject // {when: "the", levee: "breaks", have: "no place to go"}
```

Returns a mutable copy of the object. For a deeply mutable copy, in which any instances of `Immutable` contained in nested data structures within the object have been converted back to mutable data structures, call `Immutable.asMutable(obj, {deep: true})` instead.

### Releases

#### 7.1.4

Fixed bug with custom mergers treating all non-truthy values as undefined ([#244](https://github.com/rtfeldman/seamless-immutable/issues/244)).

#### 7.1.3

Treat `Blob` instances as immutable. Use `Array.isArray` over `instanceof`.

#### 7.1.2

Treat `Error` instances as immutable.

#### 7.1.1

Fix .npmignore

#### 7.1.0

Add `getIn` and assumption that Promises are immutable.

#### 7.0.0

Add `Immutable.static` as the preferred API. Default to development build in webpack.

#### 6.3.0

Adds optional deep compare for `.set`, `.setIn` and `.replace`

#### 6.2.0

Adds static alternatives to methods, e.g. `Immutable.setIn`

#### 6.1.4

Fixes [bug with deep merge() on an array argument](https://github.com/rtfeldman/seamless-immutable/pull/140).

#### 6.1.3

Fixes bug with setting a new object on an existing leaf array.

#### 6.1.2

Fixes bug where on some systems arrays are treated as plain objects.

#### 6.1.1

`without` now handles numeric keys the same way as string keys.

#### 6.1.0

Alias `Immutable.from()` to `Immutable()` for linters.

#### 6.0.1

React components are now considered immutable.

#### 6.0.0

Add cycle detection.

#### 5.2.0

Add `update` and `updateIn`.

#### 5.1.1

`Immutable(Object.create(null))` now works as expected.

#### 5.1.0

Add predicate support to `without()`

#### 5.0.1

Fix missing dev/prod builds for 5.0.0

#### 5.0.0

In development build, freeze Dates and ban mutating methods. (Note: dev and prod builds were mistakenly
not generated for this, so to get this functionality in those builds, use 5.0.1)

#### 4.1.1

Make `setIn` more null safe.

#### 4.1.0

Adds `set` and `setIn`

#### 4.0.1

Now when you `require("seamless-immutable")`, you get the development build by default.

#### 4.0.0

`main` now points to `src/seamless-immutable.js` so you can more easily build with `envify` yourself.

#### 3.0.0

Add support for optional prototyping.

#### 2.4.2

Calling .asMutable({deep: true}) on an Immutable data structure with a nested Date no longer throws an exception.

#### 2.4.1

Arrays with nonstandard prototypes no longer throw exceptions when passed to `Immutable`.

#### 2.4.0

Custom mergers now check for reference equality and abort early if there is no more work needed, allowing improved performance.

#### 2.3.2

Fixes a bug where indices passed into iterators for flatMap and asObject were strings instead of numbers.

#### 2.3.1

Fixes an IE and Firefox bug related to cloning Dates while preserving their prototypes.

#### 2.3.0

Dates now retain their prototypes, the same way Arrays do.

#### 2.2.0

Adds a minified production build with no freezing or defensive unsupported methods, for a ~2x performance boost.

#### 2.1.0

Adds optional `merger` function to `#merge`.

#### 2.0.2

Bugfix: `#merge` with `{deep: true}` no longer attempts (unsuccessfully) to deeply merge arrays as though they were regular objects.

#### 2.0.1

Minor documentation typo fix.

#### 2.0.0

Breaking API change: `#merge` now takes exactly one or exactly two arguments. The second is optional and allows specifying `deep: true`.

#### 1.3.0

Don't bother returning a new value from `#merge` if no changes would result.

#### 1.2.0

Make error message for invalid `#asObject` less fancy, resulting in a performance improvement.

#### 1.1.0

Adds `#asMutable`

#### 1.0.0

Initial stable release

## Development

Run `npm install -g grunt-cli`, `npm install` and then `grunt` to build and test it.

[1]: https://travis-ci.org/rtfeldman/seamless-immutable.svg?branch=master
[2]: https://travis-ci.org/rtfeldman/seamless-immutable
[3]: https://badge.fury.io/js/seamless-immutable.svg
[4]: https://badge.fury.io/js/seamless-immutable
[5]: http://img.shields.io/coveralls/rtfeldman/seamless-immutable.svg
[6]: https://coveralls.io/r/rtfeldman/seamless-immutable
