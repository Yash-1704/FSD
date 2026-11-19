// Purely controlled: this component owns no state of its own. ProductsPage
// passes down the current category/sort values and gets notified via the
// on*Change callbacks — the URL search params are the actual source of
// truth (see ProductsPage).
export function ProductFilters({ categories, category, onCategoryChange, sort, onSortChange }) {
  return (
    <div className="flex gap-3">
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink capitalize outline-none focus:border-accent"
      >
        <option value="all">All categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat} className="capitalize">
            {cat}
          </option>
        ))}
      </select>
      <select
        value={sort}
        onChange={(event) => onSortChange(event.target.value)}
        className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent"
      >
        <option value="default">Sort: Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
      </select>
    </div>
  );
}
