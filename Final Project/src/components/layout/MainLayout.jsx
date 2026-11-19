import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AsyncBoundary } from '../ui/AsyncBoundary';
import { CartDrawer } from '../cart/CartDrawer';
import { useToggle } from '../../hooks/useToggle';

// The cart-open flag lives here, not inside Navbar or CartDrawer — they're
// siblings that both need it (Navbar's button opens it, CartDrawer reads
// it to decide whether to render), so it's lifted to their closest common
// parent instead of duplicated or threaded through unrelated components.
export function MainLayout() {
  const [isCartOpen, { setTrue: openCart, setFalse: closeCart }] = useToggle(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onOpenCart={openCart} />
      <main className="flex-1">
        <AsyncBoundary>
          <Outlet />
        </AsyncBoundary>
      </main>
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </div>
  );
}
