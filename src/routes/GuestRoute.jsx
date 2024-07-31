import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../contexts/authcontext';

const GuestRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (user != null) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet/>;
};

export default GuestRoute;