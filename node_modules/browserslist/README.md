# Browserslist

Library to share supported browsers list between different front-end tools.
It is used in [Autoprefixer], [Stylelint], [eslint-plugin-compat]
and [babel-env-preset].

All tools that rely on Browserslist will find its config automatically,
when you add the following to `package.json`:

```json
{
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
}
```

Or in `browserslist` config:

```yaml
# Browsers that we support

> 1%
Last 2 versions
IE 10 # sorry
```

Developers set browsers list in queries like `last 2 version`
to be free from updating browser versions manually.
Browserslist will use [Can i Use] data for this queries.

Browserslist will take browsers queries from tool option,
`browserslist` config, `browserslist` section in `package.json`
or environment variables.

You can test Browserslist queries in [online demo].

<a href="https://evilmartians.com/?utm_source=browserslist">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
    alt="Sponsored by Evil Martians"
    width="236"
    height="54"
  \>
</a>

[eslint-plugin-compat]: https://github.com/amilajack/eslint-plugin-compat
[babel-env-preset]:     https://github.com/babel/babel-preset-env
[Autoprefixer]:         https://github.com/postcss/autoprefixer
[online demo]:          http://browserl.ist/
[Stylelint]:            http://stylelint.io/
[Can I Use]:            http://caniuse.com/

## Queries

Browserslist will use browsers query from one of this sources:

1. Tool options. For example `browsers` option in Autoprefixer.
2. `BROWSERSLIST` environment variable.
3. `browserslist` config file in current or parent directories.
4. `browserslist` key in `package.json` file in current or parent directories.
5. If the above methods did not produce a valid result
   Browserslist will use defaults: `> 1%, last 2 versions, Firefox ESR`.

We recommend to write queries in `browserslist` config or `package.json`.

You can specify the versions by queries (case insensitive):

* `last 2 versions`: the last 2 versions for each major browser.
* `last 2 Chrome versions`: the last 2 versions of Chrome browser.
* `> 5%`: versions selected by global usage statistics.
* `> 5% in US`: uses USA usage statistics. It accepts [two-letter country code].
* `> 5% in my stats`: uses [custom usage data].
* `ie 6-8`: selects an inclusive range of versions.
* `Firefox > 20`: versions of Firefox newer than 20.
* `Firefox >= 20`: versions of Firefox newer than or equal to 20.
* `Firefox < 20`: versions of Firefox less than 20.
* `Firefox <= 20`: versions of Firefox less than or equal to 20.
* `Firefox ESR`: the latest [Firefox ESR] version.
* `iOS 7`: the iOS browser version 7 directly.
* `not ie <= 8`: exclude browsers selected before by previous queries.
  You can add `not ` to any query.

Browserslist works with separated versions of browsers.
You should avoid queries like `Firefox > 0`.

Multiple criteria are combined as a boolean `OR`. A browser version must match
at least one of the criteria to be selected.

All queries are based on the [Can I Use] support table,
e.g. `last 3 iOS versions` might select `8.4, 9.2, 9.3` (mixed major and minor),
whereas `last 3 Chrome versions` might select `50, 49, 48` (major only).

[two-letter country code]: http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements
[custom usage data]:        #custom-usage-data
[Can I Use]:                http://caniuse.com/

## Browsers

Names are case insensitive:

### Major Browsers

* `Chrome` for Google Chrome.
* `Firefox` or `ff` for Mozilla Firefox.
* `Explorer` or `ie` for Internet Explorer.
* `Edge` for Microsoft Edge.
* `iOS` or `ios_saf` for iOS Safari.
* `Opera` for Opera.
* `Safari` for desktop Safari.
* `ExplorerMobile` or `ie_mob` for Internet Explorer Mobile.

### Others

* `Android` for Android WebView.
* `BlackBerry` or `bb` for Blackberry browser.
* `ChromeAndroid` or `and_chr` for Chrome for Android
  (in Other section, because mostly same as common `Chrome`).
* `FirefoxAndroid` or `and_ff` for Firefox for Android.
* `OperaMobile` or `op_mob` for Opera Mobile.
* `OperaMini` or `op_mini` for Opera Mini.
* `Samsung` for Samsung Internet.
* `UCAndroid` or `and_uc` for UC Browser for Android.
* `Electron` for Electron framework. It will be converted to Chrome version.

### Electron

[`electron-to-chromium`](https://www.npmjs.com/package/electron-to-chromium)
could return a compatible Browserslist query
for your (major) Electron version:

```js
const e2c = require('electron-to-chromium')
autoprefixer({
    browsers: e2c.electronToBrowserList('1.4') //=> "Chrome >= 53"
})
```

## Config File

Browserslist config should be named `browserslist` and have browsers queries
split by a new line. Comments starts with `#` symbol:

```yaml
# Browsers that we support

> 1%
Last 2 versions
IE 8 # sorry
```

Browserslist will check config in every directory in `path`.
So, if tool process `app/styles/main.css`, you can put config to root,
`app/` or `app/styles`.

You can specify direct path in `BROWSERSLIST_CONFIG` environment variables.

## `package.json`

If you want to reduce config files in project root, you can specify
browsers in `package.json` with `browserslist` key:

```js
{
  "private": true,
  "dependencies": {
    "autoprefixer": "^6.5.4"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
}
```

## Environments

You can also specify different browser queries for various environments.
Browserslist will choose query according to `BROWSERSLIST_ENV` or `NODE_ENV`
variables. If none of them is declared, Browserslist will firstly look
for `development` queries and then use defaults.

In `package.json`:

```js
{
  …
  "browserslist": {
    "production": [
      "last 2 version",
      "ie 9"
    ],
    "development": [
      "last 1 version"
    ]
  }
}
```

In `browserslist` config:

```ini
[production]
last 2 version
ie 9

[development]
last 1 version
```

## Environment Variables

If some tool use Browserslist inside, you can change browsers settings
by [environment variables]:

* `BROWSERSLIST` with browsers queries.

   ```sh
  BROWSERSLIST="> 5%" gulp css
   ```

* `BROWSERSLIST_CONFIG` with path to config file.

   ```sh
  BROWSERSLIST_CONFIG=./config/browserslist gulp css
   ```

* `BROWSERSLIST_ENV` with environments string.

   ```sh
  BROWSERSLIST_ENV="development" gulp css
   ```

* `BROWSERSLIST_STATS` with path to the custom usage data
  for `> 1% in my stats` query.

   ```sh
  BROWSERSLIST_STATS=./config/usage_data.json gulp css
   ```

[environment variables]: https://en.wikipedia.org/wiki/Environment_variable

## Custom Usage Data

If you have a website, you can query against the usage statistics of your site:

1. Import your Google Analytics data into [Can I Use].
   Press `Import…` button in Settings page.
2. Open browser DevTools on [Can I Use] and paste this snippet
   into the browser console:

    ```js
   var e=document.createElement('a');e.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(JSON.stringify(JSON.parse(localStorage['usage-data-by-id'])[localStorage['config-primary_usage']])));e.setAttribute('download','stats.json');document.body.appendChild(e);e.click();document.body.removeChild(e);
    ```
3. Save the data to a `browserslist-stats.json` file in your project.

Of course, you can generate usage statistics file by any other method.
File format should be like:

```js
{
  "ie": {
    "6": 0.01,
    "7": 0.4,
    "8": 1.5
  },
  "chrome": {
    …
  },
  …
}
```

Note that you can query against your custom usage data
while also querying against global or regional data.
For example, the query `> 1% in my stats, > 5% in US, 10%` is permitted.

[Can I Use]: http://caniuse.com/

## JS API

```js
var browserslist = require('browserslist');

// Your CSS/JS build tool code
var process = function (source, opts) {
    var browsers = browserslist(opts.browsers, {
        stats: opts.stats,
        path:  opts.file,
        env:   opts.env
    });
    // Your code to add features for selected browsers
}
```

Queries can be a string `"> 5%, last 1 version"`
or an array `['> 5%', 'last 1 version']`.

If a query is missing, Browserslist will look for a config file.
You can provide a `path` option (that can be a file) to find the config file
relatively to it.

For non-JS environment and debug purpose you can use CLI tool:

```sh
browserslist "> 1%, last 2 versions"
```

## Coverage

You can get total users coverage for selected browsers by JS API:

```js
browserslist.coverage(browserslist('> 1%')) //=> 81.4
```

```js
browserslist.coverage(browserslist('> 1% in US'), 'US') //=> 83.1
```

Or by CLI:

```sh
$ browserslist --coverage "> 1%"
These browsers account for 81.4% of all users globally
```

```sh
$ browserslist --coverage=US "> 1% in US"
These browsers account for 83.1% of all users in the US
```
