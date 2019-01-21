<div align="center">
  <a href="https://offline-plugin.now.sh/"><img src="https://rawgit.com/NekR/offline-plugin/master/logo/logo.svg" width="120" alt="offline-plugin logo"></a>

  <h1><code>offline-plugin</code> for webpack</h1>

  <a href="#backers"><img src="https://opencollective.com/offline-plugin/backers/badge.svg" alt="backers" /></a>
  <a href="#sponsors"><img src="https://opencollective.com/offline-plugin/sponsors/badge.svg" alt="sponsors" /></a>
  <a href="https://www.npmjs.com/package/offline-plugin"><img src="https://img.shields.io/npm/v/offline-plugin.svg?maxAge=3600&v4" alt="npm"></a>
  <a href="https://www.npmjs.com/package/offline-plugin"><img src="https://img.shields.io/npm/dm/offline-plugin.svg?maxAge=3600" alt="npm"></a>
</div>
<br>

This plugin is intended to provide an offline experience for **webpack** projects. It uses **ServiceWorker**, and **AppCache** as a fallback under the hood. Simply include this plugin in your ``webpack.config``, and the accompanying runtime in your client script, and your project will become offline ready by caching all (or some) of the webpack output assets.

<div align="center">
  <h1>Sponsors</h1>
  
  <a href="https://opencollective.com/offline-plugin/sponsor/0/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/0/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/1/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/1/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/2/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/2/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/3/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/3/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/4/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/4/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/5/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/5/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/6/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/6/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/7/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/7/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/8/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/8/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/9/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/9/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/10/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/10/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/11/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/11/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/12/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/12/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/13/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/13/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/14/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/14/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/15/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/15/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/16/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/16/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/17/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/17/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/18/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/18/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/19/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/19/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/20/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/20/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/21/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/21/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/22/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/22/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/23/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/23/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/24/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/24/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/25/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/25/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/26/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/26/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/27/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/27/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/28/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/28/avatar.svg"></a>
  <a href="https://opencollective.com/offline-plugin/sponsor/29/website" target="_blank"><img src="https://opencollective.com/offline-plugin/sponsor/29/avatar.svg"></a>
  
  Become a sponsor and get your logo on our README on Github with a link to your site.<br>
  <strong><a href="https://opencollective.com/offline-plugin#sponsor">Become a sponsor</a></strong>
</div>

## Install

`npm install offline-plugin [--save-dev]`

## Setup

First, instantiate the plugin in your `webpack.config`:

```js
// webpack.config.js example

var OfflinePlugin = require('offline-plugin');

module.exports = {
  // ...

  plugins: [
    // ... other plugins
    // it's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin()
  ]
  // ...
}
```
_(and optionally configure with [options](docs/options.md))_  

Then, add the [runtime](docs/runtime.md) into your entry file (typically main entry):

```js
require('offline-plugin/runtime').install();
```

ES6/Babel/TypeScript
```js
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();
```

> For more details of usage with `TypeScript` see [here](docs/typescript.md)

### `offline-plugin` isn't working?

:information_source: **[Troubleshooting](docs/troubleshooting.md)** | **[FAQ](docs/FAQ.md)**

## Docs

* [Options](docs/options.md)
* [Caches](docs/caches.md)
* [Update process](docs/updates.md)
* [Cache Maps](docs/cache-maps.md)
* [Runtime API](docs/runtime.md)
* [Configuration options](docs/options.md)

## Examples

* [Single Page Application](docs/examples/SPA.md)

## Articles

* [Easy Offline First Apps With Webpack's Offline Plugin](https://dev.to/kayis/easy-offline-first-apps-with-webpacks-offline-plugin)
* [Handling Client Side App Updates (with Service Workers)](https://zach.codes/handling-client-side-app-updates-with-service-workers/)

## Options

All options are optional and `offline-plugin` can be used without specifying them.

#### [See all available options here.](docs/options.md)

## Who is using `offline-plugin`

<div align="center">
  <strong>Demo:<br><a href="https://offline-plugin.now.sh/"> Progressive Web App built with <code>offline-plugin</code></a></strong><br>
  <div>(<a href="https://github.com/NekR/offline-plugin-pwa"><i>source code</i></a>)</div>
</div>

### Projects

* [React Boilerplate](https://github.com/mxstbr/react-boilerplate)
* [Phenomic](https://phenomic.io)
* [React, Universally](https://github.com/ctrlplusb/react-universally)

### PWAs

* [`offline-plugin` PWA](https://offline-plugin.now.sh/)
* [Omroep West](https://m.omroepwest.nl/)
* [Preact](https://preactjs.com/) ([source](https://github.com/developit/preact-www))
* [CodePan](https://codepan.net) ([source](https://github.com/egoist/codepan))
* [Offline Kanban](https://offline-kanban.herokuapp.com) ([source](https://github.com/sarmadsangi/offline-kanban))
* [Online Board](https://onlineboard.sonnywebdesign.com/) ([source](https://github.com/andreasonny83/online-board))


_If you are using `offline-plugin`, feel free to submit a PR to add your project to this list._

## Like `offline-plugin`?

Support it by giving [feedback](https://github.com/NekR/offline-plugin/issues), [contributing](CONTIBUTING.md), becoming a [backer/sponsor](https://opencollective.com/offline-plugin) or just by 🌟 starring the project!


## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/offline-plugin#backer)]

<a href="https://opencollective.com/offline-plugin/backer/0/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/1/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/2/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/3/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/4/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/5/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/6/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/7/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/8/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/9/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/10/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/11/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/12/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/13/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/14/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/15/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/16/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/17/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/18/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/19/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/20/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/21/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/22/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/23/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/24/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/25/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/26/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/27/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/28/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/offline-plugin/backer/29/website" target="_blank"><img src="https://opencollective.com/offline-plugin/backer/29/avatar.svg"></a>

## Contribution

See [CONTRIBUTING](CONTRIBUTING.md)

## License

[MIT](LICENSE.md)  
[Logo](logo/LICENSE.md)

## CHANGELOG

[CHANGELOG](CHANGELOG.md)
