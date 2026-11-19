import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useDebounce } from '../hooks/useDebounce';
import { usePagination } from '../hooks/usePagination';
import { SearchBar } from '../components/products/SearchBar';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductGrid } from '../components/products/ProductGrid';
import { Pagination } from '../components/products/Pagination';
import { Spinner } from '../components/common/Spinner';

export default function ProductsPage() {
  const { data: products, isLoading, error } = useFetch('/products');
  const { data: categories } = useFetch('/products/categories');
  const [searchParams, setSearchParams] = useSearchParams();

  // The URL is the source of truth for category/sort — read directly from
  // searchParams rather than mirroring them into separate useState, so
  // there's only one place either value can drift out of sync.
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'default';

  // The search text is different: it needs a *debounced* trip to the URL,
  // not an immediate one, so a local useState holds what's actually being
  // typed and the URL only catches up once typing settles.
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
  const debouncedSearch = useDebounce(searchInput, 400);

  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (debouncedSearch) next.set('q', debouncedSearch);
    else next.delete('q');
    setSearchParams(next, { replace: true });
    // Deliberately reacting only to the debounced value. Including
    // `searchParams`/`setSearchParams` here would create a loop — this
    // effect itself changes searchParams every time it runs, so treating
    // that change as a reason to run again would never settle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === 'default') next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  // Recomputed only when something that actually affects the result
  // changes — not on every render of this page (e.g. from the cart drawer
  // opening, which lives in a parent layout and re-renders this too).
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = products;

    if (category !== 'all') {
      result = result.filter((product) => product.category === category);
    }
    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      result = result.filter((product) => product.title.toLowerCase().includes(term));
    }
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating.rate - a.rating.rate);

    return result;
  }, [products, category, debouncedSearch, sort]);

  const { page, totalPages, currentItems, goToPage } = usePagination(filteredProducts, 8);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">Products</h1>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <SearchBar value={searchInput} onChange={setSearchInput} />
        <ProductFilters
          categories={categories || []}
          category={category}
          onCategoryChange={(value) => updateParam('category', value)}
          sort={sort}
          onSortChange={(value) => updateParam('sort', value)}
        />
      </div>

      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center py-24">
            <Spinner size={32} />
          </div>
        ) : error ? (
          <p className="py-24 text-center text-danger">{error}</p>
        ) : (
          <>
            <ProductGrid products={currentItems} />
            <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
          </>
        )}
      </div>
    </div>
  );
}
