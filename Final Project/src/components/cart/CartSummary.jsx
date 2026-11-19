import { Button } from '../common/Button';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils/formatters';

export function CartSummary({ onCheckoutComplete }) {
  const { items, totalPrice, clearCart } = useCart();
  const { showToast } = useToast();

  // No backend, so "checkout" is simulated: confirm, clear the cart, close
  // the drawer. Wired up the same way a real checkout call would be, so
  // swapping this for an actual API call later is a one-function change.
  const handleCheckout = () => {
    showToast('Order placed — thanks for shopping!', 'success');
    clearCart();
    onCheckoutComplete?.();
  };

  return (
    <div className="border-t border-border p-4">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="text-ink-muted">Subtotal ({items.length} items)</span>
        <span className="font-display font-semibold text-ink">{formatCurrency(totalPrice)}</span>
      </div>
      <Button className="w-full" onClick={handleCheckout}>
        Checkout
      </Button>
    </div>
  );
}
