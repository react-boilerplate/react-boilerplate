// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export const memoizeComponent = (loadComponent) => {
  let savedComponent;
  return (nextState, cb) => {
    const renderRoute = loadModule(cb);
    if (savedComponent) {
      renderRoute(savedComponent);
    } else {
      loadComponent((loadedComponent) => {
        savedComponent = loadedComponent;
        renderRoute(savedComponent);
      });
    }
  };
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      getComponent: memoizeComponent((renderRoute) => {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage'),
        ]);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }),
    }, {
      path: '/features',
      getComponent: memoizeComponent((renderRoute) => {
        import('containers/FeaturePage')
          .then(renderRoute)
          .catch(errorLoading);
      }),
    }, {
      path: '*',
      getComponent: memoizeComponent((renderRoute) => {
        import('containers/NotFoundPage')
          .then(renderRoute)
          .catch(errorLoading);
      }),
    },
  ];
}
