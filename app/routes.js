/* istanbul ignore next */

// These are the pages you can go to.
// They are all wrapped in the App component, which contains the navigation etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the require.ensure code splitting business

const routes = [
  {
    path: '/',
    getComponent: function get(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('HomePage').default);
      }, 'HomePage');
    }
  }, {
    path: '/features',
    getComponent: function get(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('FeaturePage').default);
      }, 'FeaturePage');
    }
  }, {
    path: '*',
    getComponent: function get(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('NotFoundPage').default);
      }, 'NotFoundPage');
    }
  }
];

export default routes;
