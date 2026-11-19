import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { EmptyState } from '../common/EmptyState';

// A second portal-based overlay, separate from the generic Modal — a
// side-drawer has different positioning/animation needs (full height,
// edge-anchored) than a centered dialog, so it gets its own small
// implementation rather than forcing Modal to handle both shapes.
export function CartDrawer({ isOpen, onClose }) {
  const { items, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="relative flex h-full w-full max-w-sm flex-col bg-surface shadow-xl">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-display text-lg font-semibold text-ink">Your Cart</h2>
          <button onClick={onClose} aria-label="Close cart">
            <X size={20} className="text-ink-muted" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <EmptyState icon={ShoppingBag} title="Your cart is empty" description="Add products to see them here." />
          ) : (
            items.map((item) => (
              <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
            ))
          )}
        </div>
        {items.length > 0 && <CartSummary onCheckoutComplete={onClose} />}
      </div>
    </div>,
    document.body
  );
}
