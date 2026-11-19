import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/ui/ToastContainer';
import { ErrorBoundary } from './components/ErrorBoundary';

// Provider order: none of these strictly depend on each other, but Theme
// and Toast are kept outermost as general "app shell" concerns, with the
// more domain-specific providers (auth, cart, wishlist) nested inside.
//
// The ErrorBoundary here is the outermost safety net for the whole app —
// separate from the per-layout AsyncBoundary (route-level) and the
// dashboard's BuggyWidget demo (widget-level). Real apps commonly layer
// error boundaries like this: one broad catch-all, plus narrower ones
// around sections that can reasonably fail independently.
export default function App() {
  return (
    <ErrorBoundary message="The app hit an unexpected error.">
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <AppRoutes />
                <ToastContainer />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
