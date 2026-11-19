import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { AuthLayout } from '../components/layout/AuthLayout';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';

// Route-level code splitting: everything below gets its own JS chunk,
// downloaded only when the user actually navigates there. HomePage and
// NotFoundPage stay as regular imports since one is the likely landing
// page and the other is tiny — splitting them out wouldn't save much.
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const ProductDetailsPage = lazy(() => import('../pages/ProductDetailsPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const WishlistPage = lazy(() => import('../pages/WishlistPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const NotesPage = lazy(() => import('../pages/NotesPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));

const router = createBrowserRouter([
  {
    // A "pathless" route: it contributes no URL segment of its own, it
    // only wraps its children in the PublicRoute guard.
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterPage /> },
        ],
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: <ProductsPage /> },
      { path: '/products/:id', element: <ProductDetailsPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/wishlist', element: <WishlistPage /> },
          {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
              { index: true, element: <DashboardPage /> },
              { path: 'notes', element: <NotesPage /> },
              { path: 'profile', element: <ProfilePage /> },
            ],
          },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
