/* istanbul ignore next */

// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the require.ensure code splitting business

function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

function loadModule(cb) {
  return (module) => cb(null, module.default);
}

export default function createRoutes(store) { // eslint-disable-line
  return [
    {
      path: '/',
      getComponent(location, cb) {
        System.import('HomePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      getComponent(location, cb) {
        System.import('NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
