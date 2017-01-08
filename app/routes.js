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

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      onEnter(nextState, replace, callback) {
        // onEnter gets called when we visit a route
        // childRoute changes do not trigger onEnter, which is a desired behavior


        // Prevent saga reinjection if they are running
        if (this.loadedSagas) {
          callback();
          return;
        }

        // Inject sagas as usual
        const importModules = System.import('containers/HomePage/sagas');

        importModules.then((sagas) => {
          this.loadedSagas = injectSagas(sagas.default);
          callback();
        });

        importModules.catch(errorLoading);
      },
      onLeave() {
        // onLeave gets called when we leave the route
        // Cancel the sagas if they are running
        if (this.loadedSagas) {
          this.loadedSagas.forEach((saga) => saga.cancel());
          delete this.loadedSagas;
        }
      },
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage'),
          System.import('containers/HomePage/reducer'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component, reducer]) => {
          injectReducer('home', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/features',
      getComponent(nextState, cb) {
        import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
