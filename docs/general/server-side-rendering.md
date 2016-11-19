# Server Side Rendering

Servers side rendering should work out of the box.

Here is how we do it.

In order to be able to use our client code on server it has to be transpiled into node.js compatible code.
Webpack takes care of that with `target` option set to `"node"`.

The entry point for the server webpack build is `app/serverEntry.js`.
Webpack will generate a couple of files and place them in `server/middleware`. The names of these files will
start with `"generated."`. They shouldn't be checked into git.

In production mode the web server will use the generated files directly to create a pre-rendered version of
the requested page.

## development mode

During development we want to be able to see the changes in our code as soon as possible.
Webpack with hot reloading takes care of this in the browser.
On the server side, however, we need to handle it ourselves.
We create a separate process (Rendering Service) that restarts automatically whenever the
generated files change. Our main server uses the Rendering Server as a proxy to render the requested page.
