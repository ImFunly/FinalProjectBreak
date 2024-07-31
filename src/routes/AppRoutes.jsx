import { Suspense, useId } from 'react';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';

import AppProtectedRoutes from './AppProtectedRoutes';
import GuestRoute from './GuestRoute';

import rootRoutes from './routes';

const AppRoutes = () => {
  const id = useId();

  const routeCreator = (routesList) => {
    return (
      <>
        {routesList.map(({ path, scope, Component, nestedRoutes }) => {
          return (
            <Route
              element={ scope === 'guest' ? <GuestRoute/> : (scope === 'protected' ? <AppProtectedRoutes /> : <Outlet/>) }
              key={`${id}-${path}`}>

                <Route path={path} element={<Component />}>
                  {nestedRoutes && routeCreator(nestedRoutes)}
                </Route>
            </Route>
          );
        })}
      </>
    );
  };

  return (
<Suspense
fallback={
  <div
    style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'var(--color-blue-deep)',
    }}
  >
    <h1>Cargando....</h1>
  </div>
}
>
<Routes>
    {routeCreator(rootRoutes)}
    <Route path='/*' element={<Navigate to='/dashboard' />} />
</Routes>
</Suspense>

  );
};

export default AppRoutes;
