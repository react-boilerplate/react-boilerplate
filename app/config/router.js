import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export const routerData = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    showInNav: true,
    messageKey: 'home',
  },
  {
    path: '/features',
    component: FeaturePage,
    showInNav: true,
    messageKey: 'features',
  },
  {
    path: '',
    component: NotFoundPage,
  },
];
