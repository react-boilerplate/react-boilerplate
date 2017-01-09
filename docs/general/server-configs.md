# Server Configurations

## Apache

This boilerplate includes an `app/.htaccess` file that does three things:

1. Redirect all traffic to HTTPS because ServiceWorker only works for encrypted
   traffic.
1. Rewrite all pages (e.g. `yourdomain.com/subpage`) to `yourdomain.com/index.html`
   to let `react-router` take care of presenting the correct page.
1. Ensure that sw.js is not cached. This is required for updates to be downloaded in offline-first mode.

> Note: For performance reasons you should probably adapt it to run as a static
  `.conf` file (typically under `/etc/apache2/sites-enabled` or similar) so that
  your server doesn't have to apply its rules dynamically per request)

## Nginx

Also an `app/.nginx.conf` file is included that does the same on an Nginx server.
