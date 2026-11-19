import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Heart, ShoppingCart } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { RatingStars } from '../components/common/RatingStars';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Spinner } from '../components/common/Spinner';
import { ProductGrid } from '../components/products/ProductGrid';
import { formatCurrency } from '../utils/formatters';
import { cn } from '../utils/cn';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  // Re-runs whenever `id` changes — navigating from one product to another
  // via a related-product card doesn't remount this page (same route, new
  // param), so the fetch has to be tied to `id` explicitly rather than
  // firing once on mount.
  const { data: product, isLoading, error } = useFetch(`/products/${id}`);

  // Stays disabled until `product` has actually loaded, since the URL it
  // needs depends on product.category — firing it early would mean
  // fetching `/products/category/undefined`.
  const { data: categoryProducts } = useFetch(
    product ? `/products/category/${encodeURIComponent(product.category)}` : null,
    { enabled: Boolean(product) }
  );

  const relatedProducts = useMemo(
    () => (categoryProducts || []).filter((item) => item.id !== product?.id).slice(0, 4),
    [categoryProducts, product]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size={32} />
      </div>
    );
  }

  if (error || !product) {
    return <p className="py-24 text-center text-danger">Product not found.</p>;
  }

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    showToast(`${quantity} × ${product.title} added to cart`, 'success');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <button
        onClick={() => navigate('/products')}
        className="mb-6 flex items-center gap-1 text-sm text-ink-muted hover:text-ink"
      >
        <ArrowLeft size={14} /> Back to products
      </button>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square rounded-lg border border-border bg-white p-10">
          <img src={product.image} alt={product.title} className="h-full w-full object-contain" />
        </div>

        <div>
          <Badge variant="neutral" className="capitalize">
            {product.category}
          </Badge>
          <h1 className="mt-3 font-display text-2xl font-semibold text-ink">{product.title}</h1>
          <div className="mt-2">
            <RatingStars rating={product.rating?.rate ?? 0} count={product.rating?.count} />
          </div>
          <p className="mt-4 font-display text-3xl font-semibold text-ink">{formatCurrency(product.price)}</p>
          <p className="mt-4 text-sm text-ink-muted">{product.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-md border border-border">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="p-2 text-ink-muted hover:text-ink"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="p-2 text-ink-muted hover:text-ink"
              >
                <Plus size={14} />
              </button>
            </div>
            <Button onClick={handleAddToCart} className="flex-1">
              <ShoppingCart size={16} /> Add to cart
            </Button>
            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              className="rounded-md border border-border p-2.5"
            >
              <Heart size={18} className={cn(wishlisted ? 'fill-danger text-danger' : 'text-ink-muted')} />
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 font-display text-xl font-semibold text-ink">You might also like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
