/**
 * Asynchronously loads the components for HomePage
 */
import Loadable from 'routing/Loadable';

export default Loadable({
  loader: ({ injectReducer, injectSagas }) =>
    Promise.all([
      import('./reducer'),
      import('./sagas'),
      import('./index'),
    ])
      .then(([reducer, sagas, component]) => {
        injectReducer('home', reducer.default);
        injectSagas(sagas.default);
        return component;
      }),
});
