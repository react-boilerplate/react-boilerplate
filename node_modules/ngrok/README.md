ngrok [![Build Status](https://img.shields.io/travis/bubenshchykov/ngrok/master.svg)](https://travis-ci.org/bubenshchykov/ngrok) ![TypeScript compatible](https://img.shields.io/badge/typescript-compatible-brightgreen.svg) [![npm](https://img.shields.io/npm/v/ngrok.svg)](https://www.npmjs.com/package/ngrok) [![npm](https://img.shields.io/npm/dm/ngrok.svg)](https://www.npmjs.com/package/ngrok)
=====

![alt ngrok.com](https://ngrok.com/static/img/overview.png)

usage
===

```javascript
npm install ngrok
const ngrok = require('ngrok');
(async function() {
  const url = await ngrok.connect();
})();
```
or
```bash
npm install ngrok -g
ngrok http 8080
```

This module uses node>=8.3.0 with async-await. For callback-based version use [2.3.0](https://github.com/bubenshchykov/ngrok/blob/330674233e3ec77688bb692bf1eb007810c4e30d/README.md)

For global install on Linux, you might need to run ```sudo npm install --unsafe-perm -g ngrok``` due to the [nature](https://github.com/bubenshchykov/ngrok/issues/115#issuecomment-380927124) of npm postinstall script.

## authtoken
You can create basic http-https-tcp tunnel without [authtoken](https://ngrok.com/docs#authtoken). For custom subdomains and more you should  obtain authtoken by signing up at [ngrok.com](https://ngrok.com). Once you set it, it's stored in ngrok config and used for all tunnels. Few ways:

```javascript
await ngrok.authtoken(token);
await ngrok.connect({authtoken: token, ...});
```

## connect
```javascript
const url = await ngrok.connect(); // https://757c1652.ngrok.io -> http://localhost:80
const url = await ngrok.connect(9090); // https://757c1652.ngrok.io -> http://localhost:9090
const url = await ngrok.connect({proto: 'tcp', addr: 22}); // tcp://0.tcp.ngrok.io:48590
const url = await ngrok.connect(opts);
```

## options
```javascript
const url = await ngrok.connect({
	proto: 'http', // http|tcp|tls, defaults to http
	addr: 8080, // port or network address, defaultst to 80
	auth: 'user:pwd', // http basic authentication for tunnel
	subdomain: 'alex', // reserved tunnel name https://alex.ngrok.io
	authtoken: '12345', // your authtoken from ngrok.com
	region: 'us', // one of ngrok regions (us, eu, au, ap), defaults to us
	configPath: '~/git/project/ngrok.yml' // custom path for ngrok config file
	binPath: default => default.replace('/bin', '.unpacked/bin'); // custom binary path, eg for prod in electron
});
```

Other options: `name, inspect, host_header, bind_tls, hostname, crt, key, client_cas, remote_addr` - read [here](https://ngrok.com/docs)

Note on regions: region used in first tunnel will be used for all next tunnels too.

## disconnect
The ngrok and all tunnels will be killed when node process is done. To stop the tunnels use
```javascript
await ngrok.disconnect(url); // stops one
await ngrok.disconnect(); // stops all
await ngrok.kill(); // kills ngrok process
```

Note on http tunnels: by default bind_tls is true, so whenever you use http proto two tunnels are created - http and https. If you disconnect https tunnel, http tunnel remains open. You might want to close them both by passing http-version url, or simply by disconnecting all in one go ```ngrok.disconnect()```.

## configs
You can use ngrok's [configurations files](https://ngrok.com/docs#config), and just pass `name` option when making a tunnel. Configuration files allow to store tunnel options. Ngrok looks for them here:
```
OS X	/Users/example/.ngrok2/ngrok.yml
Linux	/home/example/.ngrok2/ngrok.yml
Windows	C:\Users\example\.ngrok2\ngrok.yml
```
You can specify a custom `configPath` when making a tunnel.

## inspector
When tunnel is established you can use the ngrok interface http://127.0.0.1:4040 to inspect the webhooks done via ngrok.
Same url hosts internal [client api](https://ngrok.com/docs#client-api). You can get it as wrapped request and manage tunnels yourself.
```javascript
const url = await ngrok.connect();
const api = ngrok.getApi();
const tunnels = await api.get('api/tunnels');
```

## proxy
If you are behind a corporate proxy an have issues installing ngrok, you can set ```HTTP_PROXY``` or ```HTTPS_PROXY``` env var to fix it. Ngrok's posinstall uses request module to fetch the binary, [and request supports these env vars](https://github.com/request/request#controlling-proxy-behaviour-using-environment-variables)

## how it works
```npm install``` downloads ngrok binary for your platform from official ngrok hosting. To host binaries yourself set NGROK_CDN_URL env var before installing ngrok. To force specific platform set NGROK_ARCH, eg NGROK_ARCH=freebsdia32

First time you create tunnel ngrok process is spawned and runs until you disconnect or when parent process killed. All further tunnels are created or stopped by using internal ngrok api which usually runs on http://127.0.0.1:4040

## contributors
Please run ```git update-index --assume-unchanged bin/ngrok``` to not override [ngrok stub](https://github.com/bubenshchykov/ngrok/blob/master/bin/ngrok) in your pr. Unfortunately it can't be gitignored.

Test suite covers basics usage without authtoken, as well as features available for free and paid authtokens. You can supply your own tokens into env vars, otherwise warning given and some specs are ignored (locally and in PR builds). Travis supplies real tokens to master branch and runs all specs always.
