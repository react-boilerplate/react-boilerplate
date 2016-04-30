// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { injectAsyncReducer, injectAsyncSaga } from './store';

function errorLoading(err) {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
}

function loadModule(cb) {
  return (module) => cb(null, module.default);
}

function loadReducer(store, name) {
  return (module) => injectAsyncReducer(store, name, module.default);
}

function loadSaga(store) {
  return (module) => injectAsyncSaga(store, module.default);
}

export default function createRoutes(store) {
  return [
    {
      name: 'home',
      path: '/',
      getComponent(location, cb) {
        Promise.all([
          System.import('sagas/getGithubData.saga'),
          System.import('containers/HomePage/reducer'),
          System.import('containers/HomePage'),
        ]).then(([saga, reducer, component]) => {
          loadSaga(store)(saga);
          loadReducer(store, 'home')(reducer);
          loadModule(cb)(component);
        }).catch(errorLoading);
      },
    }, {
      name: 'features',
      path: '/features',
      getComponent(location, cb) {
        System.import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      name: 'catchall',
      path: '*',
      getComponent(location, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
