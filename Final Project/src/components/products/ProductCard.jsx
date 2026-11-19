import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { RatingStars } from '../common/RatingStars';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/formatters';
import { cn } from '../../utils/cn';

// Wrapped in React.memo because a grid renders many of these at once — an
// unrelated state change on the page (search text, sort order, quantity on
// a different card) would otherwise re-render every card, not just the one
// that actually changed. memo only helps because the `product` prop for a
// given card is the same object reference across those unrelated renders.
export const ProductCard = memo(function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (event) => {
    event.preventDefault(); // the whole card is a <Link> — stop it navigating on this click
    addItem(product);
    showToast(`${product.title} added to cart`, 'success');
  };

  const handleToggleWishlist = (event) => {
    event.preventDefault();
    toggleWishlist(product);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square bg-white p-6">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform group-hover:scale-105"
        />
        <button
          onClick={handleToggleWishlist}
          aria-label="Toggle wishlist"
          className="absolute right-2 top-2 rounded-full bg-surface/90 p-1.5 shadow-sm"
        >
          <Heart size={16} className={cn(wishlisted ? 'fill-danger text-danger' : 'text-ink-muted')} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Badge variant="neutral" className="w-fit capitalize">
          {product.category}
        </Badge>
        <h3 className="line-clamp-2 text-sm font-medium text-ink">{product.title}</h3>
        <RatingStars rating={product.rating?.rate ?? 0} count={product.rating?.count} />
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-base font-semibold text-ink">
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="rounded-md bg-accent p-2 text-white transition-colors hover:bg-accent-dark"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
});
