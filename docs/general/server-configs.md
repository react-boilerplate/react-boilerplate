# Server Configurations

## Apache

This boilerplate includes an `.htaccess` file that does two things:

1. Redirect all traffic to HTTPS because ServiceWorker only works for encrypted
   traffic.
1. Rewrite all pages (e.g. `yourdomain.com/subpage`) to `yourdomain.com/index.html`
   to let `react-router` take care of presenting the correct page.

> Note: For performance reasons you should probably adapt this to run as a static
  `.conf` file (typically under `/etc/apache2/sites-enabled` or similar) so that
  your server doesn't have to apply these rules dynamically per request)

### security
`.htaccess` can only provide security by redirecting HTTP to HTTPS

> Note: For a detailled security configuration in apache httpd, a `.conf` file is necessary. You can use [Mozillas TLS Configurator](https://mozilla.github.io/server-side-tls/ssl-config-generator/) to get some examples.

## Nginx

This boilerplate also includes an `.nginx.conf` file that does the same on Nginx server.

### security

Additionally, the `.nginx.conf` provides TLS security configuration settings based on [Mozillas TLS Guidelines](https://wiki.mozilla.org/Security/Server_Side_TLS), including:

- HSTS Header
- TLS 1.2 only
- Prefer server-side ciphersuites
- Strong ciphersuites
- Own DH Key (optional)
- OCSP & SSL Stapling (optional)
