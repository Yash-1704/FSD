import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { ProductGrid } from '../components/products/ProductGrid';
import { EmptyState } from '../components/common/EmptyState';

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">Wishlist</h1>
      <div className="mt-6">
        {items.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Tap the heart on any product to save it here."
          />
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </div>
  );
}
