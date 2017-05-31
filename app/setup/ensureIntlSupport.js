export default function ensureIntlSupport() {
  if (window.Intl) return Promise.resolve();
  return new Promise((resolve) => {
    resolve(import('intl'));
  })
  .then(() => Promise.all([
    import('intl/locale-data/jsonp/en.js'),
    import('intl/locale-data/jsonp/de.js'),
  ]));
}
