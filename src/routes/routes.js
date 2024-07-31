import { lazy } from 'react';
import Index from '../pages/index';

const rootRoutes = [
  {
    path: '/login',
    scope: 'guest',
    Component: lazy(
      () =>
        import('../pages/login')
    ),
  },
  {
    path: '/register',
    scope: 'guest',
    Component: lazy(
      () =>
        import('../pages/register')
    ),
  },
  {
    path: '/',
    scope: 'guest',
    Component: Index,
  },
  {
    path: '/dashboard',
    scope: 'protected',
    Component: lazy(
      () =>
        import('../pages/dashboard')
    ),
  },
  {
    path: '/pet/create',
    scope: 'protected',
    Component: lazy(
      () =>
        import('../pages/registerPet')
    ),
  },
  {
    path: '/order/create',
    scope: 'protected',
    Component: lazy(
      () =>
        import('../pages/registerOrder')
    ),
  },
];


export default rootRoutes;
