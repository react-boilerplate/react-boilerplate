// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the require.ensure code splitting business
import { injectAsyncReducer } from './store';

function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

function loadModule(cb) {
  return (module) => cb(null, module.default);
}

function loadReducer(store, name) {
  return (module) => injectAsyncReducer(store, name, module.default);
}

export default function createRoutes(store) {
  return [
    {
      path: '/',
      getComponent(location, cb) {
        Promise.all([
          System.import('containers/HomePage/reducer'),
          System.import('containers/HomePage'),
        ]).then(modules => {
          loadReducer(store, 'home')(modules[0]);
          loadModule(cb)(modules[1]);
        }).catch(errorLoading);
      },
    }, {
      path: '/features',
      getComponent(location, cb) {
        System.import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      getComponent(location, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
