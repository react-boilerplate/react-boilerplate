# ora [![Build Status](https://travis-ci.org/sindresorhus/ora.svg?branch=master)](https://travis-ci.org/sindresorhus/ora)

> Elegant terminal spinner

<img src="screenshot.gif" width="629">


## Install

```
$ npm install --save ora
```


## Usage

```js
const ora = require('ora');

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = 'Loading rainbows';
}, 1000);
```


## API

It will gracefully not do anything when there's no TTY or when in a CI.

### ora([options|text])

If a string is provided, it is treated as a shortcut for [`options.text`](#text).

#### options

Type: `object`

##### text

Type: `string`

Text to display after the spinner.

##### spinner

Type: `string` `object`<br>
Default: `dots` <img src="screenshot-spinner.gif" width="14">

Name of one of the [provided spinners](https://github.com/sindresorhus/cli-spinners/blob/master/spinners.json). See `example.js` in this repo if you want to test out different spinners.

Or an object like:

```js
{
	interval: 80, // optional
	frames: ['-', '+', '-']
}
```

##### color

Type: `string`<br>
Default: `cyan`<br>
Values: `black` `red` `green` `yellow` `blue` `magenta` `cyan` `white` `gray`

Color of the spinner.

##### interval

Type: `number`<br>
Default: Provided by the spinner or `100`

Interval between each frame.

Spinners provide their own recommended interval, so you don't really need to specify this.

##### stream

Type: `WritableStream`<br>
Default: `process.stderr`

Stream to write the output.

You could for example set this to `process.stdout` instead.

##### enabled

Type: `boolean`<br>
Default: `false`

Force enabling of the spinner regardless of the `stream` not being run inside a TTY context and/or in a CI environment.

### Instance

#### .start()

Start the spinner. Returns the instance.

#### .stop()

Stop and clear the spinner. Returns the instance.

#### .clear()

Clear the spinner. Returns the instance.

#### .render()

Manually render a new frame. Returns the instance.

#### .frame()

Get a new frame.

#### .text

Change the text.

#### .color

Change the spinner color.


## Related

- [cli-spinners](https://github.com/sindresorhus/cli-spinners) - Spinners for use in the terminal


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
