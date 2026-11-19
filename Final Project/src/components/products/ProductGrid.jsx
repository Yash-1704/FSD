import { ProductCard } from './ProductCard';
import { EmptyState } from '../common/EmptyState';

export function ProductGrid({ products }) {
  if (products.length === 0) {
    return <EmptyState title="No products found" description="Try adjusting your search or filters." />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        // key uses the API's stable product id, never the array index —
        // sorting/filtering reorders this list constantly, and an
        // index-based key would make React mismatch cards to the wrong data.
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
