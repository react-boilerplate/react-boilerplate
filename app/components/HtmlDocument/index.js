/* eslint-disable react/no-danger */

import React, { PropTypes } from 'react';
import htmlescape from 'htmlescape';

// We use this component only on the server side.
export default function HtmlDocument({ lang, head, css, appContent, state, assets, webpackDllNames }) {
  const attrs = head.htmlAttributes.toComponent();
  return (
    <html lang={lang} {...attrs}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Allow installing the app to the homescreen */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />

        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}

        {/* external css. TODO: figure out how to use hashed name */}
        <link href={assets.main.css} rel="stylesheet" />
        <style type="text/css" dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>
        {/* Display a message if JS has been disabled on the browser. */}
        <noscript>
          If you are seeing this message, that means <strong>JavaScript has been disabled on your browser</strong>
          , please <strong>enable JS</strong> to make this app work.
        </noscript>

        <div id="app">
          <div dangerouslySetInnerHTML={{ __html: appContent }} />
        </div>
        <script dangerouslySetInnerHTML={{ __html: `APP_STATE = ${htmlescape(state)}` }} />

        {/* dev only */}
        {(webpackDllNames || []).map((dllName, i) =>
          <script data-dll key={i} src={`/${dllName}.dll.js`}></script>
        )}

        {/* our app code */}
        <script type="text/javascript" src={assets.main.js}></script>

        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" />
      </body>
    </html>
  );
}

HtmlDocument.propTypes = {
  lang: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
  css: PropTypes.string.isRequired,
  appContent: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  assets: PropTypes.shape({
    main: PropTypes.shape({
      js: PropTypes.string.isRequired,
      css: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  webpackDllNames: PropTypes.arrayOf(PropTypes.string),
};
