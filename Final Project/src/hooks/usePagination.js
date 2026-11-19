import { useState, useMemo, useEffect } from 'react';

/**
 * Slices `items` into pages of `itemsPerPage`. Resets to page 1 whenever
 * `items` itself changes (a new filtered/sorted result) — otherwise
 * changing a filter while sitting on page 3 could leave you on a page that
 * no longer exists for the new result set.
 */
export function usePagination(items, itemsPerPage = 8) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [items]);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const currentItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, page, itemsPerPage]);

  const goToPage = (nextPage) => {
    setPage(Math.min(Math.max(1, nextPage), totalPages));
  };

  return { page, totalPages, currentItems, goToPage };
}
