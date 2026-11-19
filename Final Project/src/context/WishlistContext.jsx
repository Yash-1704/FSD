import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';

const WishlistContext = createContext(null);

/**
 * Deliberately a separate context from Cart, even though both are
 * "shopping" concerns — they change independently, so combining them into
 * one context would re-render wishlist-only consumers every time the cart
 * changes, and vice versa. Unrelated state stays in separate contexts.
 *
 * Also deliberately useState + plain array logic, not useReducer — there's
 * really only one transition here (toggle), so a reducer would add
 * structure without adding clarity.
 */
export function WishlistProvider({ children }) {
  const [items, setItems] = useLocalStorage(STORAGE_KEYS.WISHLIST, []);

  const toggleWishlist = useCallback(
    (product) => {
      setItems((prev) =>
        prev.some((item) => item.id === product.id)
          ? prev.filter((item) => item.id !== product.id)
          : [...prev, product]
      );
    },
    [setItems]
  );

  const isWishlisted = useCallback((id) => items.some((item) => item.id === id), [items]);

  const value = useMemo(
    () => ({ items, toggleWishlist, isWishlisted }),
    [items, toggleWishlist, isWishlisted]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
}
