/* istanbul ignore next */

// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the require.ensure code splitting business
import { injectAsyncReducer } from './store';

export default function createRoutes(store) {
  return [
    {
      path: '/',
      getComponent: function get(location, cb) {
        require.ensure([], (require) => {
          // only run this once;
          // as the store and history sync will get into infinite loop
          if (!store.asyncReducers.home) {
            const homeReducer = require('HomePage/reducer').default;
            injectAsyncReducer(store, 'home', homeReducer);
          }
          cb(null, require('HomePage').default);
        }, 'HomePage');
      },
    }, {
      path: '/features',
      getComponent: function get(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('FeaturePage').default);
        }, 'FeaturePage');
      },
    }, {
      path: '*',
      getComponent: function get(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('NotFoundPage').default);
        }, 'NotFoundPage');
      },
    },
  ];
}
