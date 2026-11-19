import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // `state.from` lets LoginPage send the user back to whatever page they
    // were actually trying to reach (e.g. /wishlist), instead of always
    // landing on the dashboard after logging in.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
